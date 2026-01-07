"use server";

import { prisma } from "@/app/lib/prisma";

export async function getUnreadCount(userId: string) {
  const count = await prisma.comment.count({
    where: {
      isRead: false,
      post: { authorId: userId },
      NOT: { authorId: userId },
    },
  });
  return count;
}