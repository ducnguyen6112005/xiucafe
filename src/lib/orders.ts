// Order logic. Turning a cart into a saved order + awarded points.
// SECURITY NOTE: we never trust prices sent by the browser. We look up
// the real price from the database for every item. The client only tells
// us *which* item and *how many*.

import { prisma } from "./db";
import { pointsForOrder } from "./points";

export type CartLine = { menuItemId: string; quantity: number };

export async function createOrder(userId: string, cart: CartLine[]) {
  // 1. Clean the incoming cart.
  const wanted = cart
    .filter((l) => l.quantity > 0)
    .map((l) => ({ menuItemId: l.menuItemId, quantity: Math.floor(l.quantity) }));

  if (wanted.length === 0) {
    throw new Error("Your cart is empty.");
  }

  // 2. Load the real menu items from the DB (this is where prices come from).
  const ids = wanted.map((l) => l.menuItemId);
  const items = await prisma.menuItem.findMany({
    where: { id: { in: ids }, available: true },
  });
  const byId = new Map(items.map((i) => [i.id, i]));

  // 3. Build the order lines from trusted data.
  let totalCents = 0;
  const lines = wanted.map((l) => {
    const item = byId.get(l.menuItemId);
    if (!item) throw new Error("One of those drinks isn't available right now.");
    totalCents += item.priceCents * l.quantity;
    return { menuItemId: item.id, quantity: l.quantity, priceCents: item.priceCents };
  });

  const pointsEarned = pointsForOrder(totalCents);

  // 4. Write everything in ONE transaction so points and the order can
  //    never get out of sync.
  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId,
        totalCents,
        pointsEarned,
        items: { create: lines },
      },
      include: { items: { include: { menuItem: true } } },
    });

    await tx.user.update({
      where: { id: userId },
      data: { points: { increment: pointsEarned } },
    });

    await tx.pointsTransaction.create({
      data: { userId, delta: pointsEarned, reason: "order", orderId: created.id },
    });

    return created;
  });

  return order;
}

// All of a user's past orders, newest first.
export async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { menuItem: true } } },
  });
}
