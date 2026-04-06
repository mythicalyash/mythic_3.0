"use client"

import { useState, useEffect } from "react"

import type React from "react"
import { Mail, Lock, Eye, EyeOff, User, CheckCircle, X, AlertCircle } from "lucide-react"
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [colleges, setColleges] = useState([
    { _id: "", name: "Select a college" },
    { _id: "651f1a1a1a1a1a1a1a1a1a10", name: "Massachusetts Institute of Technology (MIT)" },
    { _id: "651f1a1a1a1a1a1a1a1a1a11", name: "Stanford University" },
    { _id: "651f1a1a1a1a1a1a1a1a1a12", name: "Harvard University" },
    { _id: "651f1a1a1a1a1a1a1a1a1a13", name: "California Institute of Technology (Caltech)" },
    { _id: "651f1a1a1a1a1a1a1a1a1a14", name: "University of Oxford" },
    { _id: "651f1a1a1a1a1a1a1a1a1a15", name: "University of Cambridge" },
    { _id: "651f1a1a1a1a1a1a1a1a1a16", name: "Princeton University" },
    { _id: "651f1a1a1a1a1a1a1a1a1a17", name: "Yale University" },
    { _id: "651f1a1a1a1a1a1a1a1a1a18", name: "New York University (NYU)" },
    { _id: "651f1a1a1a1a1a1a1a1a1a19", name: "University of California, Berkeley (UCB)" },
    { _id: "651f1a1a1a1a1a1a1a1a1a1a", name: "National University of Singapore (NUS)" }
  ]);
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState("")
  const [passwordError, setPasswordError] = useState(false);
  const [collegeError, setCollegeError] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get("/api/v1/colleges/get-all-colleges");
        setColleges((prev) => [...prev, ...res.data?.data]);
      } catch (error) {
        console.error("Failed to fetch colleges", error);
      }
    }
    fetchColleges();
  }, []);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })
  const [signInErrors, setSignInErrors] = useState({
    email: "",
    password: ""
  });

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    collegeName: "Select a college",
    password: "",
    confirmPassword: "",
  })
  const [signUpError, setSignUpError] = useState("");

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setSignInErrors((prev) => ({
      ...prev,
      [name]: ""
    }))
  }

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      identifier: signInData.email,
      password: signInData.password
    });
    console.log(result);

    if (result?.error) {
      if (result.error == "Error while logging in the user: Error: No user found!") {
        setSignInErrors((prev) => ({
          ...prev,
          email: "No user found"
        }));
      } else if (result.error == "Error while logging in the user: Incorrect password!") {
        setSignInErrors((prev) => ({
          ...prev,
          password: "Incorrect password"
        }));
      }
      else {
        console.log(result.error);
      }
    }

    if (result?.ok) {
      router.push('/');
    }
  }

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (name === "password" || name === "confirmPassword") {
      setPasswordError(false)
    }
    if (name === "collegeName") {
      setCollegeError(false);
    }
    setSignUpError("");
  }

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signUpData.password !== signUpData.confirmPassword) {
      setPasswordError(true)
      return
    }
    if (signUpData.collegeName == "Select a college") {
      setCollegeError(true);
      return;
    }
    try {
      await axios.post("/api/v1/users/signup", {
        "firstName": signUpData.firstName,
        "lastName": signUpData.lastName,
        "email": signUpData.email,
        "password": signUpData.password,
        "collegeId": colleges.filter((college) => college.name == signUpData.collegeName)[0]._id
      });
      setVerificationEmail(signUpData.email)
      setShowVerificationModal(true)
      console.log("Sign up attempt:", signUpData)
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setSignUpError("User already exists. Please sign in.");
      } else {
        setSignUpError("An error occurred during sign up. Please try again.");
        console.error("Signup error:", error);
      }
    }
  }

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false)
    setSignUpData({
      firstName: "",
      lastName: "",
      email: "",
      collegeName: "",
      password: "",
      confirmPassword: "",
    })
    setIsSignUp(false)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 relative overflow-hidden flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-5xl">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
              {!isSignUp ? (
                <div>
                  <div className="mb-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Hello Learner!</h1>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 font-medium">Sign in to your account</p>

                  <form onSubmit={handleSignInSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                          <Mail size={20} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="E-mail"
                          value={signInData.email}
                          onChange={handleSignInChange}
                          className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                          required
                        />
                      </div>
                      {signInErrors.email && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <AlertCircle size={16} />
                          <p className="text-xs sm:text-sm font-medium">{signInErrors.email}</p>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={signInData.password}
                        onChange={handleSignInChange}
                        className="w-full pl-12 pr-12 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 sm:gap-0 pt-2">
                      <a
                        href="#"
                        className="text-xs sm:text-sm text-indigo-500 font-medium hover:text-indigo-700 transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 sm:mt-6 py-2.5 sm:py-3 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
                    >
                      SIGN IN
                    </button>

                    <div className="text-center mt-4 sm:mt-6">
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsSignUp(true)}
                          className="text-indigo-500 font-semibold hover:text-indigo-700 transition-colors cursor-pointer"
                        >
                          Create Account
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="mb-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Create Account</h1>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 font-medium">
                    Join us today and get started
                  </p>

                  <form onSubmit={handleSignUpSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                          <User size={20} />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={signUpData.firstName}
                          onChange={handleSignUpChange}
                          className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                          required
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                          <User size={20} />
                        </div>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={signUpData.lastName}
                          onChange={handleSignUpChange}
                          className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                        <Mail size={20} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={signUpData.email}
                        onChange={handleSignUpChange}
                        className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div>

                      <div>

                        <div className="relative">
                          <select
                            name="collegeName"
                            value={signUpData.collegeName}
                            onChange={handleSignUpChange}
                            className="w-full pl-4 pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-0 transition-colors text-gray-900 text-sm sm:text-base appearance-none cursor-pointer"
                            required
                          >
                            {colleges.map((college) => (
                              <option key={college._id} value={college.name}>
                                {college.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                              />
                            </svg>
                          </div>
                        </div>
                        {passwordError && (
                          <div className="flex items-center gap-2 mt-2 text-red-600">
                            <AlertCircle size={16} />
                            <p className="text-xs sm:text-sm font-medium">Select a college</p>
                          </div>
                        )}
                      </div>
                      {collegeError && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <AlertCircle size={16} />
                          <p className="text-xs sm:text-sm font-medium">Select a college</p>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={signUpData.password}
                        onChange={handleSignUpChange}
                        className="w-full pl-12 pr-12 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                          <Lock size={20} />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={signUpData.confirmPassword}
                          onChange={handleSignUpChange}
                          className={`w-full pl-12 pr-12 py-2.5 sm:py-3 bg-gray-50 rounded-full focus:outline-none focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-500 border-2 text-sm sm:text-base ${passwordError
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-200 focus:border-indigo-500"
                            }`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {passwordError && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <AlertCircle size={16} />
                          <p className="text-xs sm:text-sm font-medium">Passwords do not match</p>
                        </div>
                      )}
                    </div>



                    {signUpError && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 justify-center">
                        <AlertCircle size={16} />
                        <p className="text-xs sm:text-sm font-medium">{signUpError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full mt-4 sm:mt-6 py-2.5 sm:py-3 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
                    >
                      CREATE ACCOUNT
                    </button>

                    <div className="text-center mt-4 sm:mt-6">
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsSignUp(false)}
                          className="text-indigo-500 font-semibold hover:text-indigo-700 transition-colors cursor-pointer"
                        >
                          Sign In
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="hidden md:flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 bg-linear-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white rounded-r-2xl sm:rounded-r-3xl">
              <div className="relative z-10 text-center px-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">The Mythics</h2>
                <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-sm">
                  One and only Place needed to ace your College Life!!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div >

      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-fadeIn">
            <button
              onClick={handleCloseVerificationModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-linear-to-br from-green-400 to-emerald-500 p-4 rounded-full">
                <CheckCircle size={40} className="text-white" />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
              Account Created Successfully!
            </h2>

            <p className="text-center text-sm sm:text-base text-gray-600 mb-2 font-medium">
              A verification email has been sent to:
            </p>

            <p className="text-center text-indigo-600 font-semibold mb-4 sm:mb-6 wrap-break-word text-sm sm:text-base">
              {verificationEmail}
            </p>

            <p className="text-center text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
              Please check your email and click the verification link to complete your account setup.
            </p>

            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={handleCloseVerificationModal}
                className="w-full py-2.5 sm:py-3 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Back to Sign In
              </button>
              <button
                onClick={() => window.open("https://mail.google.com", "_blank")}
                className="w-full py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-full transition-all duration-300 text-sm sm:text-base"
              >
                Open Email
              </button>
            </div>
          </div>
        </div>
      )
      }

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div >
  )
}