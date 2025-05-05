"use client"

import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { login } from "@/app/actions/auth"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

// Initial state for the form
const initialState = {
  error: null,
  success: false,
}

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="w-full rounded bg-[#6b61d2] py-3 font-medium text-white hover:bg-[#a89fff] transition-colors disabled:opacity-70"
      disabled={pending}
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  )
}

type FormValues = {
  email: string
  password: string
  remember: boolean
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  // This function will be called when the form is valid
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("remember", data.remember.toString());
    formAction(formData);
  };

  return (
    <form action={formAction} className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {state.error && <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-400">{state.error}</div>}

      <div className="space-y-2">
        <label htmlFor="email" className="block text-white">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
          className={`w-full rounded bg-[#1d1d21] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b61d2] ${errors.email ? "border border-red-500" : ""
            }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-white">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`w-full rounded bg-[#1d1d21] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b61d2] ${errors.password ? "border border-red-500" : ""
              }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <SubmitButton />

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded bg-white py-3 font-medium text-gray-800 hover:bg-gray-100 transition-colors"
        onClick={() => {
          // In a real app, implement Google OAuth
          alert("Google authentication would be implemented here")
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
          <path
            fill="#4285F4"
            d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
          />
          <path
            fill="#34A853"
            d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
          />
          <path
            fill="#FBBC05"
            d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
          />
          <path
            fill="#EA4335"
            d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
          />
        </svg>
        Sign in with Google
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-[#1d1d21] text-[#6b61d2] focus:ring-[#6b61d2]"
            {...register("remember")}
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
            Remember for 30 days
          </label>
        </div>
        <Link href="/forgot-password" className="text-sm text-[#6b61d2] hover:underline">
          Forgot password
        </Link>
      </div>

      <div className="text-center text-sm text-gray-300">
        Doesn&apos;t have account?{" "}
        <Link href="/signup" className="text-[#6b61d2] hover:underline">
          Sign up
        </Link>
      </div>
    </form>
  )
}
