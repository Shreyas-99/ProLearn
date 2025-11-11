"use client";
import {SignInButton,SignUpButton,SignedIn,SignedOut,UserButton, useUser} from '@clerk/nextjs'
import { useEffect } from 'react';


const Navbar =  () => {


  const { user,isSignedIn } = useUser();
  // console.log("User in Navbar:::", user); 

 
 
  return (
    <div>
     
        
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
         
          <div className="text-2xl font-bold">
           ProLearn
          </div>
         {!isSignedIn?<div className="flex gap-8 items-center">
            <a href="#features" className="hover:text-gray-300 transition">Features</a>
            <a href="#how" className="hover:text-gray-300 transition <SignedOut>">How it Works</a>
            
          </div>:<></>}
          <div className='flex gap-1.5'>
            <SignedOut>
              <SignInButton className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer " />
             {user||<SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>}
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn></div>
           
        </div>
      </nav>
    </div>
  )
}

export default Navbar
