import { deleteSession } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await deleteSession();
  return NextResponse.json({ success: true });
}