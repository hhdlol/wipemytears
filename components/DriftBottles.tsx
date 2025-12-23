"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const DriftBottles = () => {
  const router = useRouter();

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
    <div id="drift-bottles">

      {containers.map((container) => (

        <div key={container.id} className="relative" style={{
          height: `${container.height}px`, 
          width: `${container.width}px`, 
          marginTop: `${container.mt}px`, 
          marginLeft: `${container.ml}px`,
          }}>
          <button className="absolute border-none bg-transparent scale-x-[-1] -rotate-45" onClick={() => {router.push("/message")}}>
            <Image src="/drift-bottle.png" alt={`drift-bottle-${container.id}`} height={container.imgh} width={container.imgh}/>
          </button>
        </div>

      ))}

    </div>
  )
}

export default DriftBottles