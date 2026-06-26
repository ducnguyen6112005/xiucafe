import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getUserOrders } from "@/lib/orders";
import { REDEEM_POINTS_PER_DOLLAR } from "@/lib/points";

function money(cents: number) {
  return "$" + (cents / 100).toFixed(2);
}

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="auth-wrap" style={{ textAlign: "center" }}>
        <h1>You're logged out.</h1>
        <p className="muted" style={{ margin: "12px 0 20px" }}>Log in to see your points and orders.</p>
        <Link className="btn" href="/login">Log in</Link>
      </main>
    );
  }

  const orders = await getUserOrders(user.id);
  const dollarsOff = (user.points / REDEEM_POINTS_PER_DOLLAR).toFixed(2);

  return (
    <main className="wrap" style={{ paddingTop: 24, paddingBottom: 80 }}>
      <div className="eyebrow">Tài khoản · Account</div>
      <h1 className="page-title">Hi, {user.name.split(" ")[0]}.</h1>

      <div className="card" style={{ background: "var(--hero)", color: "var(--cream)", border: "none", marginBottom: 32 }}>
        <div style={{ fontSize: "0.8rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.8 }}>Points balance</div>
        <div className="serif" style={{ fontSize: "3rem", fontWeight: 300, lineHeight: 1.1 }}>{user.points}</div>
        <div style={{ opacity: 0.85, fontSize: "0.9rem" }}>worth about ${dollarsOff} off a future order</div>
      </div>

      <h2 className="serif" style={{ fontWeight: 400, fontSize: "1.4rem", marginBottom: 14 }}>Your orders</h2>
      {orders.length === 0 ? (
        <p className="muted">No orders yet. <Link href="/" style={{ color: "var(--terracotta)", fontWeight: 600 }}>Grab a matcha →</Link></p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {orders.map((o) => (
            <div key={o.id} className="card" style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong>{money(o.totalCents)}</strong>
                <span className="muted" style={{ fontSize: "0.82rem" }}>
                  {new Date(o.createdAt).toLocaleDateString()} · +{o.pointsEarned} pts
                </span>
              </div>
              <div className="muted" style={{ fontSize: "0.88rem", marginTop: 6 }}>
                {o.items.map((it) => `${it.quantity}× ${it.menuItem.name}`).join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
