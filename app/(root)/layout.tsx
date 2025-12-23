import BeachScene from '@/components/BeachScene'
import React from 'react'

const SiteLayout = ({children, modal}: {children: React.ReactNode, modal: React.ReactNode}) => {
  return (
    <main>
      <BeachScene />
      {children}
      {modal}
    </main>
  )
}

export default SiteLayout