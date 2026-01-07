"use server";

import { prisma } from "@/app/lib/prisma";
import { getUserFromSession } from "@/app/lib/auth";

type State = { error?: string; success?: boolean };

export async function handledeletePost(
  prev: State,
  formData: FormData
): Promise<State> {
  const user = await getUserFromSession();
  if (!user) return { error: "未登录", success: false };

  const postId = String(formData.get("postId") ?? "");
  if (!postId) return { error: "缺少 postId", success: false };

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { id: true, authorId: true },
  });

  if (!post) return { error: "帖子不存在", success: false };
  if (post.authorId !== user.id) return { error: "无权限删除", success: false };

  await prisma.post.delete({ where: { id: postId } });

  return { success: true };
}