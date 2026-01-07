"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useActionState, useState, useEffect } from "react"
import { handleCommentSubmit } from "@/app/lib/handleCommentSubmit"
import { COUNTRY_MAP } from "@/app/lib/countries"
import type { Post } from "@prisma/client"
import type { CommentWithAuthor } from "@/app/lib/types"

type State = {
  error?: string;
  success?: boolean;
}

type Props = {
  post: Post;
  comments: CommentWithAuthor[];
  userId?: string;
};

const initialState : State = { };

const ParchmentRead = ({ post, comments, userId }: Props) => {
  const router = useRouter();
  const postId = post.id;
  const commentsPreview = comments.slice(0, 3);

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
          <div>
            <article className='flex flex-col justify-between h-96 overflow-y-auto gap-4'>
              <span className='text-[#4a3318] text-2xl font-bold'>{post?.title || "(无标题)"}</span>
              <p className='text-[#4a3318] text-base whitespace-pre-wrap wrap-break-word'>{post.content}</p>
              <span className=" flex text-[#4a3318] text-lg font-bold justify-end">{post.nickname} - {COUNTRY_MAP[post.country] || post.country}</span>
            </article>
          </div>
          <div>
            <div className="flex flex-col gap-2 input-area">
              {commentsPreview.length === 0 ? (<div className="h-30 flex justify-center items-center"><span className="parchment-label m-0">暂无评论</span></div>) : (<div className="parchment-label m-0">评论</div>)}
              {commentsPreview.map((comment) => (
                <div key={comment.id} className="input-area flex flex-col">
                  <div className="flex">
                    <span className="parchment-label m-0 text-base">{comment.author.username} - {comment.author.country ? COUNTRY_MAP[comment.author.country] || comment.author.country : ""}</span>
                  </div>
                  <span className="text-sm text-gray-500 w-full truncate">{comment.content}</span>
                </div>
              ))}
            </div>
            <div className='flex justify-around align-middle'>
              <button type='submit' className='parchment-button mt-4' onClick={() => setStage("comment")}>评论区</button>
            </div>
          </div>
        </> ) : (
        <>
          <input type="hidden" name="postId" value={postId} />
          <div className="flex flex-col gap-2 h-120">
            <span className="parchment-label m-0 text-2xl">评论区</span>
            <div className="space-y-4 overflow-y-auto">
              {comments.length === 0 && <div className="flex justify-center items-center input-area"><span className="parchment-label m-0">暂无评论</span></div>}
              {comments.map((comment) => (
                <div key={comment.id} className="input-area flex flex-col">
                  <div className="flex">
                    <span className="parchment-label m-0 text-base">{comment.author.username} - {comment.author.country ? COUNTRY_MAP[comment.author.country] || comment.author.country : ""}</span>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-pre-wrap wrap-break-word">{comment.content}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            {userId ? (
              <>
                <div className='flex flex-col'>
                  <label htmlFor="comment" className='parchment-label'>评论:</label>
                  <textarea id="comment" name="comment" placeholder='请输入评论' required className='input-area h-30 resize-none'onChange={(e) => {setComment(e.target.value)}} value={comment || ""}/>
                </div>

                <div className='flex justify-around align-middle mt-8'>
                  <button type="button" className='parchment-button text-[#a2773d]' onClick={() => setStage("view")}>返回</button>
                  <button type='submit' className='parchment-button'>{isPending ? "提交中...": "评论"}</button>
                </div>
              </>) : (
                <>
                 <div>请先登录</div>
                </>
              )

            }

          </div>
        </>)}
      </div>
      {(state.success || state.error) && (<p className = {`${state.success ? "text-green-500" : "text-red-500"} z-20 mt-16 h-6 font-bold`}>{message}</p>)}
    </form>
  )
}

export default ParchmentRead