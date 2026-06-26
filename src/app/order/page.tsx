import { prisma } from "@/lib/db";
import MenuBoard from "@/components/MenuBoard";

export default async function OrderPage() {
  const items = await prisma.menuItem.findMany({
    where: { available: true },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, nameVi: true, description: true, priceCents: true },
  });

  return (
    <main className="wrap" style={{ paddingTop: 24, paddingBottom: 80 }}>
      <div className="eyebrow">Thực đơn · Order</div>
      <h1 className="page-title">What we whisk</h1>
      {items.length === 0 ? (
        <p className="muted">The menu is empty. Run <code>npm run db:seed</code> to load drinks.</p>
      ) : (
        <MenuBoard items={items} />
      )}
    </main>
  );
}
