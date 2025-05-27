"use client"
import React from "react";
import { useSearchParams } from 'next/navigation'
import LoanRequestForm from "@/components/shared/LoanRequestForm";

export default function LoanRequestFromContext() {

    const searchParams = useSearchParams();
    const farmerId = searchParams.get('farmerID');
    const aadhaarID = searchParams.get('aadhaarID')

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F2FCE2] via-[#FEF7CD] to-green-200 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
                <h2 className="text-4xl font-semibold text-green-700 mb-5">
                    Loan Request Form
                </h2>
                <LoanRequestForm  farmerId={farmerId!} aadharID={aadhaarID!}/>
            </div>
        </div>
    );
}
