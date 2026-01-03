"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation' 

type Props = {
  userId?: string,
}

const CreateBottleBtn = ({userId} : Props) => {
  const router = useRouter();

  return (
    <div className="fixed bottom-[30px] right-[30px]">

      <button className="bg-transparent border-0 rounded-full p-0 m-0" onClick={() => userId ? router.push("/new") : router.push("/login")}>
        <Image src="/empty-drift-bottle.png" alt='create-btn-img' height={120} width={120}/>
      </button>

    </div>
  )
}

export default CreateBottleBtn