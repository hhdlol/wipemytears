"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Notification } from "@/app/lib/types"
import type { Post } from "@prisma/client"
import { markCommentsRead } from "@/app/lib/markCommentsRead"
import PersonalInfo from "./PersonalInfo"
import MyPosts from "./MyPosts"
import MyNotifications from "./MyNotifications"

type Props = {
  userId: string;
  username?: string;
  userNickname?: string | null;
  userCountry?: string | null;
  posts: Post[];
  notifications: Notification[];
  unreadCount: number;
}

type ToastState = { message: string; success?: boolean } | null;

const ParchmentInbox = ({userId, username, userNickname, userCountry, posts, notifications, unreadCount} : Props) => {
  const router = useRouter();

  const [mode, setMode] = useState<"driftBottles" | "notifications" | "personalInfo">("driftBottles");
  const [toast, setToast] = useState<ToastState>(null);

  return (
    <form className='relative flex h-[600] w-[900] align-middle justify-center'>
      <button className='absolute top-3 right-2 z-10' type='button' onClick={() => router.back()}>
        <Image src="/cancel.png" alt="cancel-btn" width={35} height={35}/>
      </button>
      <Image src='/parchment-x.png' alt='parchment' className='object-contain' fill/>
      <div className='absolute flex flex-col justify-between h-full w-full p-20'>
        <div className='flex justify-around align-middle'>
          <button className="parchment-button text-lg" onClick={() => {setMode('driftBottles')}} type="button">我的漂流瓶</button> 
          <button className="parchment-button text-lg relative" onClick={async() => {setMode('notifications');await markCommentsRead(userId)}} type="button">
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
            )}
            我的消息
          </button> 
          <button className="parchment-button text-lg" onClick={() => {setMode('personalInfo')}} type="button">个人信息</button> 
        </div>
        {mode === "personalInfo" && <PersonalInfo username={username} userNickname={userNickname} userCountry={userCountry} onToast={setToast}/>}

        {mode === "driftBottles" && <MyPosts username={username} posts={posts} onToast={setToast}/>}

        {mode === "notifications" && <MyNotifications username={username} notifications={notifications}/>}
      </div>
      {toast && (<p className={`${toast.success ? "text-green-500" : "text-red-500"} z-20 mt-12 h-6 font-bold`}>{toast.message}</p>)}
    </form>
  )
}

export default ParchmentInbox