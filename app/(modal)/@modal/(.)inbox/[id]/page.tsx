"use server"

import { prisma } from "@/app/lib/prisma"
import Modal from "@/components/Modal";
import ParchmentInbox from "@/components/ParchmentInbox";
import { getUnreadCount } from "@/app/lib/getUnreadCount";
import { notFound } from "next/navigation";

export default async function InboxModalPage({
  params,
}: {
  params: { id: string };
}) {
  const {id} = await params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) notFound();
  const unreadCount = user ? await getUnreadCount(user.id) : 0;

  const posts = await prisma.post.findMany({
    where: { authorId: id },
    orderBy: { createdAt: "desc" },
  });

  const notifications = await prisma.comment.findMany({
    where: {
      post: {
        authorId: user.id,
      },
    },
    include: {
      author: {
        select: { country: true, username: true },
      },
      post: {
        select: { id: true, title: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Modal>
      <ParchmentInbox userId={user.id} username={user?.username} userNickname={user?.nickname} userCountry={user?.country} posts={posts} notifications={notifications} unreadCount={unreadCount}/>
    </Modal>
  );
}