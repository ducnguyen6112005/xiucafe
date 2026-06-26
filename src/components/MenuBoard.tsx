"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  id: string;
  name: string;
  nameVi: string | null;
  description: string;
  priceCents: number;
};

function money(cents: number) {
  return "$" + (cents / 100).toFixed(2).replace(/\.00$/, "");
}

export default function MenuBoard({ items }: { items: Item[] }) {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<{ total: number; points: number } | null>(null);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setCart((c) => {
      const n = (c[id] ?? 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });

  const lines = Object.entries(cart).map(([id, qty]) => {
    const item = items.find((i) => i.id === id)!;
    return { item, qty };
  });
  const totalCents = lines.reduce((s, l) => s + l.item.priceCents * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  async function placeOrder() {
    setError("");
    setPlacing(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart: Object.entries(cart).map(([menuItemId, quantity]) => ({ menuItemId, quantity })),
      }),
    });
    const data = await res.json();
    setPlacing(false);

    if (!res.ok) {
      // 401 means not logged in — send them to log in.
      if (res.status === 401) { router.push("/login?next=/"); return; }
      setError(data.error ?? "Could not place order.");
      return;
    }
    setConfirmed({ total: data.order.totalCents, points: data.order.pointsEarned });
    setCart({});
  }

  if (confirmed) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "40px 24px" }}>
        <div className="eyebrow">Cảm ơn</div>
        <h2 className="serif" style={{ fontWeight: 300, fontSize: "2rem", margin: "10px 0" }}>
          Order received.
        </h2>
        <p className="muted">
          {money(confirmed.total)} · you earned <strong>{confirmed.points} points</strong>.
        </p>
        <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="btn-quiet" style={{ padding: "11px 20px", borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }} onClick={() => setConfirmed(null)}>
            Order again
          </button>
          <a className="btn" href="/account">See my points</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 28 }}>
      <div style={{ display: "grid", gap: 2 }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--line)" }}>
            <div>
              <div className="serif" style={{ fontSize: "1.25rem" }}>
                {item.name}{" "}
                {item.nameVi && <span style={{ fontStyle: "italic", color: "var(--terracotta)", fontSize: "0.9rem" }}>· {item.nameVi}</span>}
              </div>
              <div className="muted" style={{ fontSize: "0.88rem", marginTop: 3 }}>{item.description}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="serif" style={{ color: "var(--terracotta)" }}>{money(item.priceCents)}</span>
              {cart[item.id] ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => remove(item.id)} className="btn-quiet" style={{ width: 32, height: 32, borderRadius: "50%", padding: 0, cursor: "pointer", fontFamily: "inherit" }}>–</button>
                  <span style={{ minWidth: 16, textAlign: "center", fontWeight: 600 }}>{cart[item.id]}</span>
                  <button onClick={() => add(item.id)} className="btn" style={{ width: 32, height: 32, borderRadius: "50%", padding: 0 }}>+</button>
                </div>
              ) : (
                <button onClick={() => add(item.id)} className="btn-quiet" style={{ padding: "8px 16px", borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }}>Add</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {count > 0 && (
        <div className="card" style={{ position: "sticky", bottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <strong>{count}</strong> {count === 1 ? "drink" : "drinks"} · <strong>{money(totalCents)}</strong>
            <div className="muted" style={{ fontSize: "0.8rem" }}>You'll earn {Math.floor(totalCents / 100)} points</div>
          </div>
          <button className="btn" onClick={placeOrder} disabled={placing}>
            {placing ? "Placing…" : "Place order"}
          </button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
