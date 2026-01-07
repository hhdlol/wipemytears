"use client"

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  picks?: {id: string | null}[];
}

const DriftBottles = ({picks} : Props) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [positions, setPositions] = useState<{ top: string, left: string }[]>([]);
    const containers = useMemo(() => [
    {
      id: 1,
      height: 100,
      width: 600,
      mt: 126,
      ml: 400,
      imgh: 40,
    },
    {
      id: 2,
      height: 100,
      width: 700,
      mt: 20,
      ml: 650,
      imgh: 50,
    },
    {
      id: 3,
      height: 100,
      width: 700,
      mt: 20,
      ml: 700,
      imgh: 60,
    }
  ], [])

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [message])

  useEffect(() => {
    const randomPositions = containers.map(() => ({
      top: `${Math.floor(Math.random() * 80)}%`,
      left: `${Math.floor(Math.random() * 80)}%`
    }));
    setPositions(randomPositions);
  }, [containers]);

  return (
    <>

      {containers.map((container, i) => (

        <div key={container.id} className='relative' style={{
          height: `${container.height}px`, 
          width: `${container.width}px`, 
          marginTop: `${container.mt}px`, 
          marginLeft: `${container.ml}px`,
          }}>
          {positions[i] && (
            <button className="absolute border-none bg-transparent scale-x-[-1] -rotate-45"
            onClick={() => (picks && picks[i]) ? router.push(`post/${picks[i].id}`) : setMessage("暂无漂流瓶")} 
            style={{
                top: positions[i].top,
                left: positions[i].left,
            }}>
              <Image src="/drift-bottle.png" alt={`drift-bottle-${container.id}`} height={container.imgh} width={container.imgh}/>
            </button>)
          }
        </div>

      ))}
      {message && <div className='fixed top-36 w-full flex justify-center'><p className={`text-red-500 z-20 h-6 font-bold`}>{message}</p></div>}
    </>
  )
}

export default DriftBottles