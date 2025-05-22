import React from 'react';
import Link from 'next/link';
import './globals.css';

const Index = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-no-repeat bg-[url('/assets/catch-crop-4133941.jpg')] flex flex-col items-center justify-center"
    >
      <div className="relative z-10 text-center px-6 md:px-4">
        <h1 className="text-4xl md:text-8xl font-bold mb-4 text-white drop-shadow-lg">
          Welcome to the AgriFund
        </h1>
        {/* <p className="text-xl md:text-2xl font-mono font-bold text-[#f0cbb6] drop-shadow-lg mb-6 text-stroke">
          Funding the agriculture of Gujarat.
        </p> */}
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
        </div>
      </div>
    </div>
  );
};

export default Index;