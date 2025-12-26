"use client"

import React, { useActionState , useEffect, useState} from 'react'
import Image from 'next/image'
import {useRouter} from "next/navigation"
import { formSchema } from '@/app/lib/formValidation'

const ParchmentNew = () => {
  const [stage, setStage] = useState("edit")

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [nickname, setNickname] = useState("")
  const [country, setCountry] = useState("")

  type State = {
    error?: string;
    success?: boolean;
  }

  const initialState : State = { };

  const handelFormSubmit = async (prevState: State, formData: FormData): Promise<State> => {
    const formValues = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      nickname: formData.get("nickname") as string,
      country: formData.get("country") as string,
    };

    const result = await formSchema.safeParseAsync(formValues);

    if (!result.success) {
      return {
        ...prevState,
        error: "验证失败，请检查输入内容",
        success: false,
      };
    }
    return { success: true };
  }
  
  const [state, formAction, isPending] = useActionState<State, FormData>(handelFormSubmit, initialState);

  const [message, setMessage] = useState("")

  useEffect(() => {
    if (state.error) {
      setMessage(state.error);
    } else if (state.success) {
      setMessage("提交成功！");
      setTimeout(() => router.back(), 1500);
    } else {
      setMessage("未知错误，请稍后重试");
    }

    if (state.error || state.success) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <form action={formAction} className='relative flex h-[900] w-[600] align-middle justify-center' >
      <button className='absolute top-3 right-2 z-10' type='button' onClick={() => router.back()}>
        <Image src="/cancel.png" alt="cancel-btn" width={35} height={35}/>
      </button>
      <Image src='/parchment.png' alt='parchment' fill className='object-contain' />
      <div className='absolute flex flex-col justify-between h-full w-full p-16'>
        {stage === "edit" ? (
          <>
            <div className='flex flex-col'>
              <label htmlFor="title" className='parchment-label'>主题:（选填）</label>
              <input type="text" id="title" name="title" placeholder='请输入标题' required className='w-full h-10 input-area' onChange={(e) => {setTitle(e.target.value)}} value={title || ""}/>
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
                  <option value="中国">中国</option>
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
            <div className='flex flex-col justify-between'>
              <div>{title || "(无标题)"}</div>
              <div>{content}</div>
              <div>{nickname} - {country}</div>
            </div>
            <div className='flex justify-around align-middle'>
              <button type='button' className='parchment-button' onClick={() => setStage("edit")}>修改</button>
              <button type='submit' className='parchment-button'>{isPending ? "提交中..." : "提交"}</button>
            </div>
          </>
        )}
      </div>
      {!state.success && <p className="text-red-500 z-20 mt-12 h-6 font-bold">{message}</p>}
      {state.success && <p className="text-green-500 z-20 mt-12 h-6 font-bold">{message}</p>}
    </form>
  )
}

export default ParchmentNew