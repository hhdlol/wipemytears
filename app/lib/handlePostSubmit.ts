"use server";

import { prisma } from '@/app/lib/prisma';
import { postSchema } from '@/app/lib/formValidation';

type State = {
  error?: string;
  success?: boolean;
}

const handelPostSubmit = async (prevState: State, formData: FormData): Promise<State> => {
  const formValues = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
    nickname: String(formData.get("nickname") ?? ""),
    country: String(formData.get("country") ?? ""),
  };

  const result = await postSchema.safeParseAsync(formValues);

  if (!result.success) {
    return {
      ...prevState,
      error: "验证失败，请检查输入内容",
      success: false,
    };
  }

  await prisma.post.create({
    data: {
      title: formValues?.title || null,
      content: formValues.content,
      nickname: formValues.nickname,
      country: formValues.country
      // user info
    }
  });

  return { success: true };
}

export default handelPostSubmit;