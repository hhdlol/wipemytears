"use server"

import { getUserFromSession } from "./auth";
import { modifySchema } from "./validations";
import { prisma } from "@/app/lib/prisma"

type State = {
  error?: string;
  success?: boolean;
}

const handleModify = async (prevState: State, formData: FormData): Promise<State> => {
  const user = await getUserFromSession();

  if (!user) {
    return {error: "请先登录", success: false}
  }

  const formValues = {
    nickname: String(formData.get("nickname") ?? ""),
    country: String(formData.get("country") ?? ""),
  }


  const result = await modifySchema.safeParseAsync(formValues);

  if (!result.success) {
    return {
      ...prevState,
      error: "验证失败，请检查输入内容",
      success: false,
    };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      nickname: result.data?.nickname || null,
      country: result.data?.country || null,
    },
  });

  return {success: true}
}

export default handleModify