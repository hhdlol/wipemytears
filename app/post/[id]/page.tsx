import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { COUNTRY_MAP } from '@/app/lib/countries';


export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {

  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      content: true,
      nickname: true,
      country: true,
      createdAt: true,
    },
  });

  if (!post) notFound();

  return (
  <>
    <div className='flex flex-col justify-between'>
      <div className=''>{post?.title || "(无标题)"}</div>
      <div>{post.content}</div>
      <div>{post.nickname} - {COUNTRY_MAP[post.country] || post.country}</div>
    </div>
  </>
  )
}