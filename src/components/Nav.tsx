"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Me = { name: string; points: number } | null;

export default function Nav() {
  const [me, setMe] = useState<Me>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => setMe(d.user))
      .finally(() => setLoaded(true));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <nav className="nav">
      <Link href="/" className="mark" style={{ textDecoration: "none" }}>
        Xíu <span>café</span>
      </Link>
      <div className="nav-right">
        <Link href="/order">Menu</Link>
        {loaded && me ? (
          <>
            <Link href="/account" className="pill">{me.points} pts</Link>
            <button onClick={logout} className="btn-quiet" style={{ padding: "7px 14px", borderRadius: 100, fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
              Log out
            </button>
          </>
        ) : loaded ? (
          <Link href="/login">Log in</Link>
        ) : null}
      </div>
    </nav>
  );
}
