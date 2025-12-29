import "server-only"
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { prisma } from '@/app/lib/prisma';

const COOKIE_NAME = "wmt_session";

export async function createSession(userId: string) {
  const cookieStore = await cookies();
  const token = crypto.randomBytes(16).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await prisma.session.create({
    data: {
      id: token,
      userId,
      expiresAt,
    },
  });

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
    sameSite: "lax",
  });
}

export async function getUserFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { id: token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: token } }).catch(() => {});
    cookieStore.delete(COOKIE_NAME);
    return null;
  }

  return session.user;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.session.delete({ where: { id: token } }).catch(() => {});
    cookieStore.delete(COOKIE_NAME);
  }
} 