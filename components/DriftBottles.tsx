"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const DriftBottles = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const openRandomPost = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/post/random", { method: "GET" });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "获取错误")
        return;
      }

      router.push(`/post/${data.id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const containers = [
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
  ];

  return (
    <>

      {containers.map((container) => (

        <div key={container.id} className="relative" style={{
          height: `${container.height}px`, 
          width: `${container.width}px`, 
          marginTop: `${container.mt}px`, 
          marginLeft: `${container.ml}px`,
          }}>
          <button className="absolute border-none bg-transparent scale-x-[-1] -rotate-45" onClick={openRandomPost} disabled={loading}>
            <Image src="/drift-bottle.png" alt={`drift-bottle-${container.id}`} height={container.imgh} width={container.imgh}/>
          </button>
        </div>

      ))}
      {message && <p className={`text-red-500 z-20 mt-12 h-6 font-bold`}>{message}</p>}
    </>
  )
}

export default DriftBottles