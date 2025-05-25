'use client'
import {useSession, signOut} from 'next-auth/react'
import React , { useEffect } from 'react'
import {useRouter} from 'next/navigation'
import {Loader} from 'lucide-react'
import { Button } from '@/components/ui/button'


export default function Homr(){
    const router = useRouter()
   const {data , status} = useSession()

   useEffect(()=>{
    if(status === 'unauthenticated'){
        console.log('unauthenticated, log in to view this page')
        router.push('/auth/signin')
    }
   }, [status])
   
    if(status === 'loading'){
        return <Loader className='flex flex-row justify-center  items-center size-56'/>
    }

    return(
        <div>
            <h1>This is a farmer's Dashboard</h1>
            <h2>{data?.user?.username}</h2>
            <h2>{data?.role}</h2>
            <Button onClick={()=>signOut()}>Sign Out</Button>
        </div>
    )
}