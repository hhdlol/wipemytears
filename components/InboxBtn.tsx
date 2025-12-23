"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation' 

const InboxBtn = () => {
  const router = useRouter();

  return (
  <div className="fixed top-[10px] right-[30px]">

      <button className='bg-transparent border-0 rounded-full p-0 m-0 scale-x-[-1]' onClick={() => {router.push("/inbox")}}>
        <Image src="/meteor.png" alt='inbox-btn-img' height={120} width={120}/>
      </button>

    </div>
  )
}

export default InboxBtn