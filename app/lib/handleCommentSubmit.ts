"use server"

import { prisma } from "@/app/lib/prisma"
import { commentSchema } from "@/app/lib/validations"
import { getUserFromSession } from '@/app/lib/auth';

type State = {
  error?: string;
  success?: boolean;
}

export async function handleCommentSubmit(prevState: State, formData: FormData): Promise<State> {
  const user = await getUserFromSession();

  if (!user) {
    return {error: "请先登录", success: false}
  }

  const formValues = {
    postId: String(formData.get("postId") ?? ""),
    comment: String(formData.get("comment") ?? ""),
    nickname: String(formData.get("nickname") ?? ""),
    country: String(formData.get("country") ?? ""),
  }

  const result = await commentSchema.safeParseAsync(formValues);

  if (!result.success) {
    return {
      ...prevState,
      error: "验证失败，请检查输入内容",
      success: false,
    };
  }

  await prisma.comment.create({
    data: {
      content: formValues.comment,
      postId: formValues.postId,
      authorId: user.id
    }
  });

  return { success: true };
}