"use client";

import { useRouter } from 'next/navigation';
import React from 'react'
import { useEffect } from 'react';

const Modal = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/75 flex items-center justify-center' onMouseDown={() => router.back()}>
      <div onMouseDown={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}

export default Modal