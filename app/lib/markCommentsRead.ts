"use server";

import { prisma } from "@/app/lib/prisma";

export async function markCommentsRead(userId: string) {
  await prisma.comment.updateMany({
    where: {
      isRead: false,
      post: { authorId: userId },
      NOT: { authorId: userId },
    },
    data: { isRead: true },
  });
}