import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { SIGNUP_BONUS } from "@/lib/points";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: { email, name, passwordHash: await hashPassword(password), points: SIGNUP_BONUS },
  });
  await prisma.pointsTransaction.create({
    data: { userId: user.id, delta: SIGNUP_BONUS, reason: "signup-bonus" },
  });

  await createSession(user.id);
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, points: user.points });
}
