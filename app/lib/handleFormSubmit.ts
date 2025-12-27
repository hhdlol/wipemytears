"use server";

import { prisma } from '@/app/lib/prisma';
import { formSchema } from '@/app/lib/formValidation';

type State = {
  error?: string;
  success?: boolean;
}

async function uploadFormData(formValues: {
  title?: string;
  content: string;
  nickname: string;
  country: string;
}) 
{
  await prisma.post.create({
    data: {
      title: formValues?.title || null,
      content: formValues.content,
      nickname: formValues.nickname,
      country: formValues.country
      // user info
    }
  });
}

const handelFormSubmit = async (prevState: State, formData: FormData): Promise<State> => {
  const formValues = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
    nickname: String(formData.get("nickname") ?? ""),
    country: String(formData.get("country") ?? ""),
  };

  const result = await formSchema.safeParseAsync(formValues);

  if (!result.success) {
    return {
      ...prevState,
      error: "验证失败，请检查输入内容",
      success: false,
    };
  }
  await uploadFormData(result.data);
  return { success: true };
}

export default handelFormSubmit;