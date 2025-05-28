'use client'

import React,{useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import { demolenders } from '@/constants/demodata'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { LenderViewType } from '@/utils/LenderView.schema'

export default function page() {
  const {data} = useSession()
  const [lenders, setlenders] = useState<LenderViewType[]>(demolenders)

  useEffect(()=>{
    const fetchLenders = async() => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/lenders`, {
          method: 'GET',
          headers:{
            'Content-Type' : 'application/json',
            'authorization' : `Bearer ${data?.digitalID}`
          }
        })

        const response = await res.json()

        if(res.ok && response){
          setlenders(response)
        }else{
          console.log("Server Error")
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchLenders()
  }, [])

  return (
    <>
      <header className="h-14 flex items-center justify-between border-b bg-gradient-to-l from-orange-50 to-white/80 sticky top-0 z-20">
        <h1 className="ml-4 text-2xl font-bold tracking-tight text-orange-500 animate-fade-in">
          <span className="inline-block align-middle">💵</span>
          <span className="ml-2">View Lender's Profiles</span>
        </h1>
      </header>

      <div className='grid gap-4 md:px-5 px-6 py-4 bg-gradient-to-r from-green-200 to-white'>
        {lenders.map((lender) => (
          <Card key={lender.id} className="overflow-hidden bg-gradient-to-r from-white to-orange-200">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Left: Logo and Name */}
                <div className="flex items-center gap-4">
                  <img
                    src={lender.lenderLogo || "/placeholder.svg"}
                    alt={lender.name}
                    className="h-12 w-12 rounded-lg border bg-white p-2"
                  />
                  <div>
                      <h3 className="font-semibold text-2xl">{lender.name}</h3>
                    
                  </div>
                </div>

                {/* Right: Badges */}
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Badge variant="secondary">Capital: ₹{lender.totalCapital.toLocaleString()}</Badge>
                  <Badge variant="secondary">Approved: {lender.applicationsApproved}</Badge>
                  <Link href={`/dashboard/loanshark/profile/${lender.aadharCard}`} target='_blank'>
                  <Button className='bg-black'><ExternalLink className="mr-2 h-4 w-4" />Visit</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
