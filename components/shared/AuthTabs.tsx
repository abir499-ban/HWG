"use client";
import React from 'react'
import Link from 'next/link'

export default function AuthTabs() {
    return (
        <div className='flex flex-col gap-2 md:gap-4 items-center justify-center'>
            <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 rounded-lg shadow-md bg-green-700 text-white font-semibold hover:bg-green-800 transition duration-300"
            >
                Farmer Sign Up
            </Link>
            <Link
                href="/auth/signin"
                className="inline-flex items-center px-6 py-3 rounded-lg shadow-md bg-green-700 text-white font-semibold hover:bg-green-800 transition duration-300"
            >
                Farmer Sign In
            </Link>
            <Link
                href="/auth/loanshark/signup"
                className="inline-flex items-center px-6 py-3 rounded-lg shadow-md bg-orange-500 text-white font-semibold hover:bg-orange-800 transition duration-300"
            >
                Loan Shark Sign Up
            </Link>
        </div>
    )
}