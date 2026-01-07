"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation' 

type Props = {
  userId: string;
  unreadCount: number;
}

const InboxBtn = ({userId, unreadCount} : Props) => {
  const router = useRouter();

  return (
  <div className="fixed top-[10px] right-[30px]">

      <button className='bg-transparent border-0 rounded-full p-0 m-0 scale-x-[-1] relative' onClick={() => {router.push(`/inbox/${userId}`)}}>
        <Image src="/meteor.png" alt='inbox-btn-img' height={120} width={120}/>
        {unreadCount > 0 && (
          <span className="absolute top-0 left-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

    </div>
  )
}

export default InboxBtn