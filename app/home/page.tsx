'use client'
import {useSession} from 'next-auth/react'
import React , { useEffect } from 'react'
import {useRouter} from 'next/navigation'
import {Loader} from 'lucide-react'


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
        return <Loader className='size-56'/>
    }

    return(
        <div>
            <h1>This is a farmer's Dashboard</h1>
            <h2>{data?.user?.username}</h2>
        </div>
    )
}