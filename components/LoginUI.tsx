"use client"

import { useActionState, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import handleLoginSubmit from '@/app/lib/handleLoginSubmit';
import handleRegisterSubmit from '@/app/lib/handleRegisterSubmit';

type State = {
  error?: string;
  success?: boolean;
}

const initialState : State = { };

const LoginUI = () => {

  const router = useRouter()

  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState("");

  const [loginState, loginAction, isPendingLogin] = useActionState<State, FormData>(handleLoginSubmit, initialState);

  const [registerState, registerAction, isPendingRegister] = useActionState<State, FormData>(handleRegisterSubmit, initialState);

  const activeState = mode === "login" ? loginState : registerState;

  useEffect(() => {
    if (activeState.error) {
      setMessage(activeState.error);
    } else if (activeState.success) {
      setMessage(`${mode === "login" ? "登录成功！" : "注册成功！"}`);
      const t1 = setTimeout(() => router.back(), 1500);
      return () => clearTimeout(t1);
    }

    if (activeState.error || activeState.success) {
      const t2 = setTimeout(() => {
        setMessage("");
      }, 3000);
      
      return () => clearTimeout(t2);
    }
  }, [activeState.error, activeState.success, router, mode]);

  return (
    <form className='relative flex h-[600] w-[900] align-middle justify-center' >
      <button className='absolute top-3 right-2 z-10' type='button' onClick={() => router.back()}>
        <Image src="/cancel.png" alt="cancel-btn" width={35} height={35}/>
      </button>
      <Image src='/parchment-x.png' alt='parchment' className='object-contain' fill/>
      <div className='absolute flex flex-col justify-between h-full w-full p-20'>
        <span className='font-bold text-[#4a3318] text-5xl'>登录/注册</span>
        <div className='flex justify-between'>
          <label htmlFor="username" className='parchment-label text-3xl mr-6'>用户名:</label>
          <input type="text" id="username" name='username' className='input-area w-150' required/>
        </div>
        <div className='flex justify-between'>
          <label htmlFor="password" className='parchment-label text-3xl mr-6'>密码:</label>
          <input type="password" id="password" name='password' className='input-area w-150' required/>
        </div>
        <div className='flex justify-around'>
          <button type="submit" className='parchment-button text-[32px] text-[#a2773d]' formAction={registerAction} onClick={() => {setMode("register")}}>{isPendingRegister ? "注册中..." : "注册"}</button>
          <button type="submit" className='parchment-button text-[32px]' formAction={loginAction} onClick={() => {setMode("login")}}>{isPendingLogin ? "登录中..." : "登录"}</button>
        </div>
      </div>
      {(activeState.error || activeState.success) && (
        <p className={`${activeState.success ? "text-green-500" : "text-red-500"} z-20 mt-12 h-6 font-bold`}>{message}</p>
      )}
    </form>
  )
}

export default LoginUI