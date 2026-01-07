"use server"

import Image from 'next/image'
import DriftBottles from './DriftBottles'
import CreateBottleBtn from './CreateBottleBtn'
import InboxBtn from './InboxBtn'
import LoginBtn from './LoginBtn'
import { getUserFromSession } from '@/app/lib/auth'
import { getUnreadCount } from '@/app/lib/getUnreadCount'
import prisma from '@/app/lib/prisma'
import { headings, subheadings } from '@/app/lib/opening'

const BeachScene = async () => {
  const user = await getUserFromSession();
  const unreadCount = user ? await getUnreadCount(user.id) : 0;

  const picks = await prisma.$queryRaw<{ id: string | null }[]>`
    SELECT id FROM "Post"
    ORDER BY RANDOM()
    LIMIT 3;
  `;

  const heading : string = headings[Math.floor(Math.random() * headings.length)];
  const subheading : string = subheadings[Math.floor(Math.random() * subheadings.length)];

  return (
    <>
      <Image src="/background.png" alt="background" fill className='-z-10 relative' priority />

      <div className="flex items-center flex-col mt-60 opacity-0 animate-[fadeIn_1s_ease-in_forwards] bg-transparent">
        <span className='block text-[80px] text-[#F9F9F9] font-bold mb-0'>{heading}</span>
        <span className="block text-[18px] text-[#F9F9F9] font-normal mt-[-6px]">冷知识: {subheading}</span>
      </div>

      <DriftBottles picks={picks}/>

      <CreateBottleBtn userId={user?.id}/>

      {user ? <InboxBtn userId={user?.id} unreadCount={unreadCount}/>: <LoginBtn />}
    </>
  )
}

export default BeachScene