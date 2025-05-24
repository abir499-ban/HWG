'use client'
import FarmerSignUpForm from '@/components/shared/FarmerSignUpForm'


const Signup = () => (
  <div className="min-h-screen bg-gradient-to-r from-[#F2FCE2] via-[#FEF7CD] to-green-200 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-green-700">
        Farmer Sign Up
      </h1>
      <FarmerSignUpForm />
    </div>
  </div>
);

export default Signup;
