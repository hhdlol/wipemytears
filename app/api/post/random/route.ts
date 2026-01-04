import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const count = await prisma.post.count();

  if (count === 0) {
    return NextResponse.json({ error: "暂无漂流瓶" }, { status: 404 });
  }

  const skip = Math.floor(Math.random() * count);

  const [post] = await prisma.post.findMany({
    take: 1,
    skip,
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });

  return NextResponse.json({ id: post.id }, { status: 200 });
}
