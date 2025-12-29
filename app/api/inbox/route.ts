import { getUserFromSession } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserFromSession();
  if (!user) {
    return NextResponse.json({user: null}, { status: 401 });
  }
  return NextResponse.json({ user: { id: user.id, username: user.username } }, { status: 200 });
}