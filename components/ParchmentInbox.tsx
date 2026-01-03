"use client"

import handleLogout from "@/app/lib/handleLogout"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import handleModify from "@/app/lib/handleModify"

type State = {
  error?: string;
  success?: boolean;
}

const initialState : State = { };

const ParchmentInbox = () => {
  const router = useRouter();

  const [mode, setMode] = useState<"modify" | "logout">("modify");
  const [message, setMessage] = useState("");

  const [logoutState, logoutAction, isPendingLogout] = useActionState<State, FormData>(handleLogout, initialState)
  const [modifyState, modifyAction, isPendingModify] = useActionState<State, FormData>(handleModify, initialState)

  const activeState = mode === 'modify' ? modifyState : logoutState;

  useEffect(() => {
    if (activeState.error) {
      setMessage(activeState.error);
    } else if (activeState.success) {
      setMessage(`${mode === "modify" ? "修改成功！" : "退出成功！"}`);
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
      <div>
        <button className="parchment-button" formAction={logoutAction} onClick={() => {setMode('logout')}}>{isPendingLogout ? "退出中..." : "退出登录"}</button>
      </div>
      {(activeState.error || activeState.success) && (
        <p className={`${activeState.success ? "text-green-500" : "text-red-500"} z-20 mt-12 h-6 font-bold`}>{message}</p>
      )}
    </form>
  )
}

export default ParchmentInbox