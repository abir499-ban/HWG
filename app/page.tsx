import React from 'react'
import {useRouter} from 'next/navigation'


const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-700">Welcome to the AgriFund</h1>
        <p className="text-xl text-gray-700 mb-8">
          Funding the agriculture of Gujarat.
        </p>
        <a
          
          className="inline-flex items-center px-6 py-3 rounded-lg shadow-md bg-green-700 text-white font-semibold hover:bg-green-800 transition"
        >
        
          Farmer Sign Up
        </a>
      </div>
    </div>
  );
};

export default Index;