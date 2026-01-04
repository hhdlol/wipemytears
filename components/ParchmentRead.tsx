"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useActionState, useState, useEffect } from "react"
import { handleCommentSubmit } from "@/app/lib/handleCommentSubmit"
import { COUNTRY_MAP } from "@/app/lib/countries"
import type { Post } from "@prisma/client"

type State = {
  error?: string;
  success?: boolean;
}

type Props = {
  post: Post;
};

const initialState : State = { };

const ParchmentRead = ({ post }: Props) => {
  const router = useRouter();
  const postId = post.id;

  const [stage, setStage] = useState("view");
  const [comment, setComment] = useState("")
  const [state, formAction, isPending] = useActionState<State, FormData>(handleCommentSubmit, initialState)

  const [message, setMessage] = useState("")

  useEffect(() => {
    if (state.error) {
      setMessage(state.error);
    } else if (state.success) {
      setMessage("评论成功！");
      const t1 = setTimeout(() => router.back(), 1500);
      return () => clearTimeout(t1);
    }

    if (state.error || state.success) {
      const t2 = setTimeout(() => {
        setMessage("");
      }, 3000);
      
      return () => clearTimeout(t2);
    }
  }, [state.error, state.success, router]);

  return (
    <form action={formAction} className='relative flex h-[900] w-[600] align-middle justify-center' >
      <button className='absolute top-3 right-2 z-10' type='button' onClick={() => router.back()}>
        <Image src="/cancel.png" alt="cancel-btn" width={35} height={35}/>
      </button>
      <Image src='/parchment-y.png' alt='parchment' fill className='object-contain' />
      <div className='absolute flex flex-col justify-between h-full w-full p-20'>
        {stage === 'view' ? ( 
        <>
          <div className='flex flex-col justify-between'>
            <div className=''>{post?.title || "(无标题)"}</div>
            <div>{post.content}</div>
            <div>{post.nickname} - {COUNTRY_MAP[post.country] || post.country}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div>评论</div>
          </div>
          <div className='flex justify-around align-middle'>
            <button type='submit' className='parchment-button' onClick={() => setStage("comment")}>评论区</button>
          </div>
        </> ) : (
        <>
          <input type="hidden" name="postId" value={postId} />
          <div className="flex flex-col gap-2">
            <div>评论</div>
          </div>
          <div>
            <div className='flex flex-col'>
              <label htmlFor="comment" className='parchment-label'>评论:</label>
              <textarea id="comment" name="comment" placeholder='请输入评论' required className='input-area h-30 resize-none'onChange={(e) => {setComment(e.target.value)}} value={comment || ""}/>
            </div>

            <div className='flex justify-around align-middle mt-8'>
              <button type='submit' className='parchment-button'>{isPending ? "提交中..." : "评论"}</button>
            </div>
          </div>
        </>)}
      </div>
      {(state.success || state.error) && (<p className = {`${state.success ? "text-green-500" : "text-red-500"} z-20 mt-12 h-6 font-bold`}>{message}</p>)}
    </form>
  )
}

export default ParchmentRead