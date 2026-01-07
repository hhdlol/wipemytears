"use client"

import { useActionState, useEffect, useState } from "react";
import { handledeletePost } from "@/app/lib/handledeletePost"
import { useRouter } from "next/navigation";
import type { Post } from "@prisma/client"

type Props = {
  username?: string;
  posts: Post[];
  onToast: (t: { message: string; success?: boolean } | null) => void;
}

type State = {
  error?: string;
  success?: boolean;
}

const initialState : State = { };

const MyPosts = ({ username, posts, onToast } : Props) => {
  const router = useRouter();

  const [stage, setStage] = useState<"delete" | "confirm">("delete")
  const [deleteState, deleteAction, isPendingDelete] = useActionState<State, FormData>(handledeletePost, initialState)

  useEffect(() => {
    if (deleteState.error) {
      onToast({message: deleteState.error, success: false});
    } else if (deleteState.success) {
      onToast({message: "删除成功", success: true});
    }

    if (deleteState.error || deleteState.success) {
      const t = setTimeout(() => {
        onToast(null);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [deleteState.error, deleteState.success, onToast])

  return (
    <>
      <div className="flex flex-col gap-4 h-90">
        <span className="parchment-label text-2xl m-0">{username} 的漂流瓶</span>

        {posts.length === 0 && <p className="parchment-label m-0">还没有发布任何内容</p>}

        <ul className="space-y-4 overflow-y-auto">
          {posts.map((post) => (
            <li key={post.id} className="input-area">
              <div onClick={() => router.push(`/post/${post.id}`)}>
                <div className="w-full h-full">
                  <div className="flex justify-between">
                    <input type="hidden" name="postId" value={post.id} />
                    <span className="parchment-label m-0">{post.title || "（无标题）"}</span>
                    {stage === "delete" ?
                    <button className="text-xs text-red-500 px-4 py-0 -mt-2 -mr-2 border-red-500 border-2 rounded-2xl" type="button" onClick={(e) => {e.stopPropagation();setStage("confirm")}}>删除</button>
                    : (
                      <div className="flex gap-4">
                        <span className="parchment-label m-0 text-xs">是否删除?</span>
                        <button className="text-xs text-red-500 px-4 py-0 -mt-2 -mr-2 border-red-500 border-2 rounded-2xl" formAction={deleteAction} onClick={(e) => e.stopPropagation()}>{isPendingDelete ? "删除中..." : "是"}</button>
                        <button className="text-xs text-green-500 px-4 py-0 -mt-2 -mr-2 border-green-500 border-2 rounded-2xl" onClick={(e) => e.stopPropagation()}>否</button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 w-full truncate">
                    {post.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MyPosts