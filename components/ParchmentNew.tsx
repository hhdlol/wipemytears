"use client"

import React, { useActionState , useState} from 'react'
import Image from 'next/image'
import {useRouter} from "next/navigation"

const ParchmentNew = () => {
  const [stage, setStage] = useState("edit")

  const router = useRouter()

  

  return (
    <form action={() => {}} className='relative flex h-[900] w-[600] align-middle justify-center' >
      <button className='absolute top-3 right-2 z-10' onClick={() => router.back()}>
        <Image src="/cancel.png" alt="cancel-btn" width={35} height={35}/>
      </button>
      <Image src='/parchment.png' alt='parchment' fill className='object-contain' />
      <div className='absolute flex flex-col justify-between h-full w-full p-16'>
        {stage === "edit" ? (
          <>
            <div className='flex flex-col'>
              <label htmlFor="title" className='parchment-label'>标题:</label>
              <input type="text" id="title" name="title" placeholder='请输入标题' required className='w-full h-10 input-area'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="content" className='parchment-label'>内容:</label>
              <textarea id="content" name="content" placeholder='请输入内容' required className='input-area h-110 resize-none'/>
            </div>

            <div className='flex justify-around align-center'>
              <div className='flex flex-col'>
                <label htmlFor="nickname" className='parchment-label'>来自（昵称）：</label>
                <input type="text" id="nickname" name="nickname" placeholder='请输入昵称' required className='input-area w-44'/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="country" className='parchment-label'>国家/地区:</label>
                <select id="country" name="country" required className='input-area'>
                  <option value="">请选择国家/地区</option>
                  <option value="China">中国</option>
                </select>
              </div>
            </div>

            <div className='flex justify-center'>
              <button className='parchment-button' onClick={() => setStage("continue")}>继续</button>
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col justify-between'>
              <div>标题</div>
              <div>内容</div>
              <div>昵称 - 国家/地区</div>
            </div>
            <div className='flex justify-around align-middle'>
              <button className='parchment-button' onClick={() => setStage("edit")}>修改</button>
              <button className='parchment-button' onClick={() => {/* 提交逻辑 */}}>提交</button>
            </div>
          </>
        )}
      </div>
    </form>
  )
}

export default ParchmentNew