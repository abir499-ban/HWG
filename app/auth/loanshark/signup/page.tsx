'use client'

import LoanSharkSignUpForm from "@/components/shared/LoanSharkSignUpForm";


const Signup = () => (
  <div className="min-h-screen bg-gradient-to-r from-[#F2FCE2] via-[#FEF7CD] to-orange-200 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-orange-500">
        Loan Shark Sign Up
      </h1>
      <LoanSharkSignUpForm/>
    </div>
  </div>
);

export default Signup;
