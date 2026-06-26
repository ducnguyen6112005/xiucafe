import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { createOrder, getUserOrders } from "@/lib/orders";

// List my orders
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  const orders = await getUserOrders(user.id);
  return NextResponse.json({ orders });
}

// Place an order
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Please log in to order." }, { status: 401 });

  try {
    const { cart } = await req.json();
    const order = await createOrder(user.id, cart ?? []);
    return NextResponse.json({ order });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
