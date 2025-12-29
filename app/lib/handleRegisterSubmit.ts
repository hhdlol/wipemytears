"use server";

import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { createSession } from "@/app/lib/auth";
import { userSchema } from '@/app/lib/formValidation';

type State = {
  error?: string;
  success?: boolean;
}

const handleRegisterSubmit = async (prevState: State, formData: FormData): Promise<State> => {
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

  if (user) {
    return {error: "用户名已存在", success: false};
  }

  const passwordHash = await bcrypt.hash(result.data.password, 10);

  try {
    const newUser = await prisma.user.create({
      data: { username: result.data.username, passwordHash },
    });

    await createSession(newUser.id);
    return { success: true };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "用户名已存在", success: false };
    }
    return { error: "注册失败，请稍后再试", success: false };
  }
  }

export default handleRegisterSubmit;