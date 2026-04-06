"use client"

import { useEffect, useState } from "react"
import { redirect, useSearchParams } from "next/navigation"
import axios from "axios";

import { Suspense } from "react"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token");
  if(!token?.trim()){
    redirect("/auth");
  }
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerifyEmail = async () => {
    setIsVerifying(true)
    const res = await axios.post("/api/v1/users/verify-email", {
        "token": token
    }).catch(err => console.log(err));
    if(res?.status != 201){
        redirect("/auth");
    } else {
        setIsVerified(true)
        setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-gray-100 rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center">
          {!isVerified ? (
            <>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Verify Email</h1>

              <p className="text-gray-600 text-base sm:text-lg mb-12 leading-relaxed max-w-sm">
                Click the button below to verify your email address and activate your account.
              </p>

              <button
                onClick={handleVerifyEmail}
                disabled={isVerifying}
                className="px-12 py-4 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-500 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg italic mb-8"
              >
                {isVerifying ? "Verifying..." : "Verify Email"}
              </button>
            </>
          ) : (
            <>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Email Verified!</h1>
              <p className="text-gray-600 text-base sm:text-lg mb-12 leading-relaxed max-w-sm">
                Your email has been successfully verified. You can now access your account.
              </p>
              <a
                href="/auth"
                className="px-12 py-4 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg inline-block"
              >
                Back to Login
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}