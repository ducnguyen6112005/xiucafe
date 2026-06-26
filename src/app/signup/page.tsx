"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setError(""); setBusy(true);
    const res = await fetch("/api/auth/register", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) { setError(data.error ?? "Could not sign up."); return; }
    window.location.href = "/account";
  }

  return (
    <main className="auth-wrap">
      <div className="eyebrow">Xin chào</div>
      <h1>Join Xíu.</h1>
      <p className="muted" style={{ marginBottom: 22 }}>Sign up and get 50 points to start.</p>
      <div className="field">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="field">
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
      </div>
      {error && <p className="error">{error}</p>}
      <button className="btn" style={{ width: "100%" }} onClick={submit} disabled={busy}>
        {busy ? "…" : "Create account"}
      </button>
      <p className="switch">Already have one? <Link href="/login">Log in</Link></p>
    </main>
  );
}
