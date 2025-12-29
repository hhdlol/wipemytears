"use client"

import { useRouter } from 'next/navigation'

const LoginBtn = () => {

  const router = useRouter();

  return (
    <div className="fixed top-[30px] right-[30px]">

      <button className='bg-transparent border-3 border-[#F9F9F9] rounded-lg p-4 m-0 text-xl text-[#F9F9F9] font-semibold' onClick={() => {router.push("/login")}}>
        登录/注册
      </button>

    </div>
  )
}

export default LoginBtn