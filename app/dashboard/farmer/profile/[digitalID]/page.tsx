"use client"
import DashboardStats from "@/components/shared/DashboardStats";
import DashboardMetrics from "@/components/shared/DashboardMetric";
import ProductivityChart from "@/components/shared/ProductivityChart";
import { useSession } from 'next-auth/react'
import {Button} from '@/components/ui/button'
//import { farmer } from '@/constants/demodata'
import { useEffect, useState, use } from "react";
import { useRouter } from 'next/navigation'
import LoadingSpinner from "@/components/shared/Loader";
import { defaultFarmerProfile, FarmerProfileSchema } from '@/utils/FarmerProfile.schema'

const Index = ({ params }: { params: Promise<{ digitalID: string }> }) => {
    const { digitalID } = use(params)
    const [farmer, setfarmer] = useState<FarmerProfileSchema>(defaultFarmerProfile)
    const { status, data } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin')
        } else {
            //console.log(status, " ", data?.role, " ", data?.accessToken)
            const fetchFarmerDetails = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/farmer/profile/${digitalID}`, {
                        method: 'GET',
                        headers: {
                            'authorization': `Bearer ${data?.accessToken}`
                        }
                    })
                    const farmerDetails: FarmerProfileSchema = await res.json();
                    if (res?.ok && farmerDetails) {
                        console.log('All ok')
                        setfarmer(farmerDetails)
                    }
                    else console.error("failed to fetch farmer details")
                } catch (error) {
                    console.log(error)
                }
            }
            fetchFarmerDetails()
        }
    }, [status, router, digitalID, data?.accessToken])



    if (status === 'loading') {
        return <LoadingSpinner />
    }

    return (
        <>
            <header className="h-14 flex items-center justify-between border-b bg-gradient-to-l from-green-200/50 to-white/80 sticky top-0 z-20 px-4">
                <h1 className="text-2xl font-bold tracking-tight text-green-700 animate-fade-in flex items-center">
                    <span className="inline-block align-middle">🌾</span>
                    <span className="ml-2">Farmer Dashboard</span>
                </h1>
                {digitalID === data?.digitalID && (
                    <Button variant='outline' className="text-black font-light text-xl">View Your Loan Requests</Button>
                )}
            </header>
            <div className="flex min-h-screen w-full bg-gradient-to-r from-[#f1faee] via-[#e0fde3] to-[#f6fef9]">
                <main className="flex-1 px-6 py-6 animate-fade-in">
                    <section className="mb-4">
                        <p className="text-xl font-semibold text-gray-800">
                            Hello, <span className="text-green-700">{farmer.name}</span>
                        </p>
                    </section>
                    <DashboardStats
                        transactions={farmer.transactions}
                        loans={farmer.loans}
                        loansRepaid={farmer.loansRepaid}
                    />
                    <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <DashboardMetrics
                            creditUtilization={farmer.creditUtilization}
                            repaymentReliability={farmer.repaymentReliability}
                            landProductivity={farmer.landProductivity}
                        />
                    </section>
                    <section className="mt-8 rounded-xl bg-white px-4 py-6 shadow-md">
                        <h2 className="text-lg md:text-xl font-semibold mb-4 text-green-700 flex items-center">
                            <span>Farm Productivity &amp; Yield Records</span>
                        </h2>
                        <ProductivityChart data={farmer.productivityRecords} />
                    </section>
                </main>
            </div>
        </>
    );
};

export default Index;