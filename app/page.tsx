"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'
import './globals.css';
import AuthTabs from '@/components/shared/AuthTabs';
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Index = () => {
  const { status, data } = useSession()
  const [authCredential, setauthCredential] = useState("")

  useEffect(() => {
    if (data?.aadharCard) setauthCredential(data?.aadharCard!)
    else setauthCredential(data?.digitalID!)
  }, [status])


  return (
    <div
      className="relative min-h-screen bg-cover bg-no-repeat bg-[url('/assets/catch-crop-4133941.jpg')] flex flex-col items-center justify-center"
    >
      <div className="relative z-10 text-center px-6 md:px-4">
        <h1 className="text-4xl md:text-8xl font-bold mb-4 text-white drop-shadow-lg">
          Welcome to AgriFund
        </h1>
        {/* <p className="text-xl md:text-2xl font-mono font-bold text-[#f0cbb6] drop-shadow-lg mb-6 text-stroke">
          Funding the agriculture of Gujarat.
        </p> */}
        {status === 'unauthenticated' ? (
          <AuthTabs />
        ) : (
          <Button className='h-10 w-60 text-[20px] text-black  bg-amber-300 hover:bg-amber-500 hover:cursor-pointer transition-normal'
          >
            <Link href={`/dashboard/${data?.role!}/profile/${authCredential}`}>Visit Your Profile</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;