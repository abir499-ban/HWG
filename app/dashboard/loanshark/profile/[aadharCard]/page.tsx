"use client"
import React, { useEffect, useState, use } from "react";
import { useSession,signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LenderStats } from "@/components/shared/LenderStats";
import { LenderMetrics, LenderRatesPieChart } from "@/components/shared/LenderMetrics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { defaultLenderProfile, lenderProfileType } from "@/utils/LenderProfile.schema";
import LoadingSpinner from "@/components/shared/Loader";
import Link from 'next/link'
//import { lender, loanApprovalRate, loanDefaultRate, portfolioYield, operationalEfficiency } from '@/constants/demodata'


export default function LenderDashboard({ params }: { params: Promise<{ aadharCard: string }> }) {
    const { aadharCard } = use(params)
    const { data, status } = useSession()
    const router = useRouter()
    const [lender, setlender] = useState<lenderProfileType>(defaultLenderProfile)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/loanshark/signin')
        }
        else {
            console.log(status, " ", data?.role)
            const fetchLenderDetails = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/lender/profile/${aadharCard}`, {
                        method: 'GET',
                        headers: {
                            'authorization': `Bearer ${data?.accessToken}`
                        }
                    })
                    const result = await res.json()
                    if (res?.ok && result) {
                        console.log('All ok')
                        setlender(result)
                    } else {
                        console.log("failed to fetch lender details")
                    }
                } catch (error) {
                    console.error("Error " + error)
                }
            }
            fetchLenderDetails()

        }
    }, [status, router, aadharCard, data?.accessToken])

    if (status === 'loading') {
        return <LoadingSpinner />
    }


    return (
        <>
            <header className="h-14 flex items-center justify-between border-b bg-gradient-to-l from-orange-50 to-white/80 sticky top-0 z-20">
                <h1 className="ml-4 text-2xl font-bold tracking-tight text-orange-500 animate-fade-in">
                    <span className="inline-block align-middle">💵</span>
                    <span className="ml-2">Loan Shark Dashboard</span>
                </h1>
                <div className="flex flex-row gap-2">
                {aadharCard === data?.aadharCard && (
                    <Button variant='outline' className="text-black font-light text-xl">
                        <Link href={`/dashboard/loanshark/loans`}>View Your Loan Requests</Link></Button>
                )}
                {aadharCard === data?.aadharCard && (
                    <Button variant='ghost' className="text-black font-light text-xl hover:cursor-pointer"
                    onClick={()=> signOut()}>
                        Sign Out
                    </Button>
                )}
                </div>
            </header>

            <main className="flex-1 px-6 py-3 animate-fade-in">
                <div className="max-w-5xl mx-auto px-4 py-10">
                    <Card className="mb-8 shadow-xl">
                        <CardHeader>
                            <p className="text-4xl font-semibold text-orange-500">{lender.name}
                                <Button
                                    onClick={() => {
                                        router.push(`/dashboard/loan?farmerID=${data?.digitalID}&aadhaarID=${aadharCard}`);
                                    }}
                                    className="rounded-3xl ml-6 hover:cursor-pointer border-1 border-black bg-gradient-to-t from-orange-50 to-white/80"
                                    variant='secondary'
                                    disabled={data?.role !== 'farmer'}>
                                    Request a Loan</Button></p>
                        </CardHeader>
                        <CardContent>
                            <LenderStats
                                totalCapital={lender.totalCapital}
                                avgLoanSize={lender.avgLoanSize}
                                interestRate={lender.interestRate}
                                repaymentTermMonths={lender.repaymentTermMonths}
                                acceptedCollateral={lender.acceptedCollateral}
                                customerBaseSize={lender.customerBaseSize}
                            />
                        </CardContent>
                    </Card>

                    <LenderMetrics
                        loanApprovalRate={lender.loanApprovalRate}
                        loanDefaultRate={lender.loanDefaultRate}
                        portfolioYield={lender.portfolioYield}
                        operationalEfficiency={lender.operationalEfficiency}
                    />

                    <div className="my-3 flex flex-col justify-center items-center gap-4">
                        <h4 className=" tex-xl md:text-2xl font-semibold text-orange-500 ">Default Loans and Repayed Loans</h4>
                        <LenderRatesPieChart loansIssued={lender.loansIssued} loansDefaulted={lender.loansDefaulted} />
                        {/* Add more charts/visualizations here if desired */}
                    </div>
                </div>
            </main>
        </>
    );
}
