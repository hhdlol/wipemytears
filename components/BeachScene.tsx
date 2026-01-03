"use server"

import Image from 'next/image'
import DriftBottles from './DriftBottles'
import CreateBottleBtn from './CreateBottleBtn'
import InboxBtn from './InboxBtn'
import LoginBtn from './LoginBtn'
import { getUserFromSession } from '@/app/lib/auth'

const BeachScene = async () => {
  const user = await getUserFromSession();

  return (
    <>
      <Image src="/background.png" alt="background" fill className='-z-10 relative' priority />

      <div className="flex items-center flex-col mt-60 opacity-0 animate-[fadeIn_1s_ease-in_forwards] bg-transparent">
        <span className='block text-[80px] text-[#F9F9F9] font-bold mb-0'>开场白开场白开场白</span>
        <span className="block text-[18px] text-[#F9F9F9] font-normal mt-[-6px]">热知识热知识热知识</span>
      </div>

      <DriftBottles />

      <CreateBottleBtn userId={user?.id}/>

      {user ? <InboxBtn />: <LoginBtn />}
    </>
  )
}

export default BeachScene