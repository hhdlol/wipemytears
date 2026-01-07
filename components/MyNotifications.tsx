"use client"

import { COUNTRY_MAP } from "@/app/lib/countries"
import type { Notification } from "@/app/lib/types"

type Props = {
  username?: string;
  notifications: Notification[];
}

const MyNotifications = ({ username, notifications } : Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 h-90">
        <span className="parchment-label text-2xl m-0">{username} 的消息</span>

        {notifications.length === 0 && <p className="parchment-label m-0">还没有收到任何消息</p>}

        <ul className="space-y-4 overflow-y-auto">
          {notifications.map((notification) => (
            <li key={notification.id} className="input-area relative">
              <a href={`/post/${notification.post.id}`}>
                <div className="w-full h-full">
                  <span className="parchment-label m-0 text-base">{notification.author.username} - {notification.author.country ? COUNTRY_MAP[notification.author.country] || notification.author.country : ""}</span>
                  <p className="text-sm text-gray-500 w-full truncate">
                    {notification.content}
                  </p>
                </div>
              </a>
              {!notification.isRead && <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MyNotifications