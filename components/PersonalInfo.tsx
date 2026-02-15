"use client"

import { useState, useActionState, useEffect } from "react";
import handleLogout from "@/app/lib/handleLogout"
import handleModify from "@/app/lib/handleModify"
import { useRouter } from "next/navigation"
import { COUNTRIES } from "@/app/lib/countries"

type Props = {
  username?: string;
  userNickname?: string | null;
  userCountry?: string | null;
  onToast: (t: { message: string; success?: boolean } | null) => void;
}

type State = {
  error?: string;
  success?: boolean;
}

const initialState : State = { };

const PersonalInfo = ({ username, userNickname, userCountry, onToast } : Props) => {
  const router = useRouter();

  const [btnMode, setBtnMode] = useState<"modify" | "logout">("modify");

  const [country, setCountry] = useState(userCountry);
  const [nickname, setNickname] = useState(userNickname);

  const [logoutState, logoutAction, isPendingLogout] = useActionState<State, FormData>(handleLogout, initialState)
  const [modifyState, modifyAction, isPendingModify] = useActionState<State, FormData>(handleModify, initialState)

  const activeState = btnMode === 'modify' ? modifyState : logoutState;

  useEffect(() => {
    if (activeState.error) {
      onToast({ message: activeState.error, success: false });
    } else if (activeState.success) {
      onToast({ message: btnMode === "modify" ? "修改成功！" : "退出成功！", success: true });
      const t1 = setTimeout(() => router.back(), 1500);
      return () => clearTimeout(t1);
    }

    if (activeState.error || activeState.success) {
      const t2 = setTimeout(() => {
        onToast(null);
      }, 3000);
      
      return () => clearTimeout(t2);
    }
  }, [activeState.error, activeState.success, router, btnMode, onToast]);

  return (
    <>
      <div className="flex flex-col justify-around h-60">
        <span className="parchment-label">用户名: {username}</span>
        <div className='flex'>
          <label htmlFor="nickname" className='parchment-label mt-2'>昵称: </label>
          <input type="text" id="nickname" name="nickname" placeholder='请输入昵称' required className='input-area ml-4 w-80' onChange={(e) => {setNickname(e.target.value)}} value={nickname || ""}/>
        </div>
        <div className="flex">
          <label htmlFor="country" className="parchment-label mt-2">国家/地区: </label>
          <select id="country" name="country" required className='input-area ml-4 w-80' onChange={(e) => {setCountry(e.target.value)}} value={country || ""}>
            <option value="">请选择国家/地区</option>
            {COUNTRIES.map(c => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex justify-around'>
        <button className="parchment-button text-lg" formAction={modifyAction} onClick={() => {setBtnMode('modify')}}>{isPendingModify ? "修改中..." : "提交修改"}</button>
        <button className="parchment-button text-lg text-[#a2773d]" formAction={logoutAction} onClick={() => {setBtnMode('logout')}}>{isPendingLogout ? "退出中..." : "退出登录"}</button>
      </div>
    </>
  )
}

export default PersonalInfo