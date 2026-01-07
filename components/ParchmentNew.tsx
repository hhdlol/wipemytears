"use client"

import { useActionState , useEffect, useState} from 'react'
import Image from 'next/image'
import {useRouter} from "next/navigation"
import handlePostSubmit from '@/app/lib/handlePostSubmit';
import { COUNTRIES, COUNTRY_MAP } from '@/app/lib/countries';

type State = {
  error?: string;
  success?: boolean;
}

type Props = {
  userNickname?: string | null;
  userCountry?: string | null;
};

const initialState : State = { };

const ParchmentNew = ({ userNickname, userCountry }: Props) => {
  const [stage, setStage] = useState("edit")

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [nickname, setNickname] = useState(() => userNickname ?? "")
  const [country, setCountry] = useState(() => userCountry ?? "")
  
  const [state, formAction, isPending] = useActionState<State, FormData>(handlePostSubmit, initialState);

  const [message, setMessage] = useState("")

  useEffect(() => {
    if (state.error) {
      setMessage(state.error);
    } else if (state.success) {
      setMessage("提交成功！");
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
      <div className='absolute flex flex-col justify-between h-full w-full p-16'>
        {stage === "edit" ? (
          <>
            <div className='flex flex-col'>
              <label htmlFor="title" className='parchment-label'>标题:（选填）</label>
              <input type="text" id="title" name="title" placeholder='请输入标题' className='w-full h-10 input-area' onChange={(e) => {setTitle(e.target.value)}} value={title || ""}/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="content" className='parchment-label'>内容:</label>
              <textarea id="content" name="content" placeholder='请输入内容' required className='input-area h-110 resize-none'onChange={(e) => {setContent(e.target.value)}} value={content || ""}/>
            </div>

            <div className='flex justify-around align-center'>
              <div className='flex flex-col'>
                <label htmlFor="nickname" className='parchment-label'>来自（昵称）：</label>
                <input type="text" id="nickname" name="nickname" placeholder='请输入昵称' required className='input-area w-44' onChange={(e) => {setNickname(e.target.value)}} value={nickname || ""}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="country" className='parchment-label'>国家/地区:</label>
                <select id="country" name="country" required className='input-area' onChange={(e) => {setCountry(e.target.value)}} value={country || ""}>
                  <option value="">请选择国家/地区</option>
                  {COUNTRIES.map(c => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex justify-center'>
              <button className='parchment-button' onClick={() => setStage("confirm")} type='button'>继续</button>
            </div>
          </>
        ) : (
          <>
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="content" value={content} />
            <input type="hidden" name="nickname" value={nickname} />
            <input type="hidden" name="country" value={country} />
            <div>
              <article className='flex flex-col justify-between h-130 overflow-y-auto gap-4'>
                <span className='text-[#4a3318] text-2xl font-bold'>{title || "(无标题)"}</span>
                <p className='text-[#4a3318] text-base whitespace-pre-wrap wrap-break-word'>{content}</p>
                <span className=" flex text-[#4a3318] text-lg font-bold justify-end">{nickname} - {COUNTRY_MAP[country] || country}</span>
              </article>
            </div>
            <div>
              <div className="flex flex-col gap-2 input-area">
                <div className="h-30 flex justify-center items-center">
                  <span className="parchment-label m-0">暂无评论</span>
                </div>
              </div>
              <div className='flex justify-around align-middle mt-8'>
                <button type='button' className='parchment-button text-[#a2773d]' onClick={() => setStage("edit")}>修改</button>
                <button type='submit' className='parchment-button'>{isPending ? "提交中..." : "提交"}</button>
              </div>
            </div>
          </>
        )}
      </div>
      {(state.success || state.error) && (<p className = {`${state.success ? "text-green-500" : "text-red-500"} z-20 mt-16 h-6 font-bold`}>{message}</p>)}
    </form>
  )
}

export default ParchmentNew