'use client'
import {useSession} from 'next-auth/react'


export default function Homr(){
   const {data , status} = useSession()
    return(
        <div>
            <h1>This is a farmer's Dashboard</h1>
            <h2>{data?.user?.username}</h2>
        </div>
    )
}