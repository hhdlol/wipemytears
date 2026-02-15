"use server"

import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import ParchmentRead from "@/components/ParchmentRead";
import Modal from "@/components/Modal";
import BeachScene from "@/components/BeachScene";
import { getUserFromSession } from "@/app/lib/auth";

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
      authorId: true
    },
  });

  if (!post) notFound();

  const comments = await prisma.comment.findMany({
    where: { postId : id },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { username: true, country: true } } }
  })

  const user = await getUserFromSession();

  return (
    <>
      <BeachScene />
      <Modal>
        <ParchmentRead post={post} comments={comments} userId={user?.id}/>
      </Modal>
    </>
  )
}