import {z} from 'zod';

export const postSchema = z.object({
  title: z.string().optional().or(z.literal("")),
  content: z.string().min(1, "内容不能为空").max(5000, "内容不能超过5000个字符"),
  nickname: z.string().min(1, "昵称不能为空").max(50, "昵称不能超过50个字符"),
  country: z.string().min(1, "国家/地区不能为空").max(100, "国家/地区不能超过100个字符"),
});

export const userSchema = z.object({
  username: z.string().trim().toLowerCase().min(3, "用户名至少需要3个字符").max(30, "用户名不能超过30个字符"),
  password: z.string().min(6, "密码至少需要6个字符").max(100, "密码不能超过100个字符"),
});