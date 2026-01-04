import Modal from "@/components/Modal";
import ParchmentRead from "@/components/ParchmentRead";
import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostModalPage({
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
  return (
    <Modal>
      <ParchmentRead post={post}/>
    </Modal>
  );
}