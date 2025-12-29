"use server";

import { prisma } from "@/app/lib/prisma";
import bcrypt from 'bcryptjs';
import { createSession } from "@/app/lib/auth";
import { userSchema } from '@/app/lib/formValidation';

type State = {
  error?: string;
  success?: boolean;
}

const handleLoginSubmit = async (prevState: State, formData: FormData): Promise<State> => {
  const formValues = {
    username: String(formData.get("username") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const result = await userSchema.safeParseAsync(formValues);

  if (!result.success) {
    return {
      ...prevState,
      error: "账号或密码格式错误",
      success: false,
    };
  }

  const user = await prisma.user.findUnique({where: {username: result.data.username}});

  if (!user) {
    return {error: "用户名或密码错误", success: false};
  }

  const isPasswordValid = await bcrypt.compare(result.data.password, user.passwordHash);

  if (!isPasswordValid) {
    return {error: "用户名或密码错误", success: false};
  }

  await createSession(user.id);

  return {success: true};
}

export default handleLoginSubmit;