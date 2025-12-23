"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation' 

const CreateBottleBtn = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-[30px] right-[30px]">

      <button className="bg-transparent border-0 rounded-full p-0 m-0" onClick={() => router.push("/new")}>
        <Image src="/empty-drift-bottle.png" alt='create-btn-img' height={120} width={120}/>
      </button>

    </div>
  )
}

export default CreateBottleBtn