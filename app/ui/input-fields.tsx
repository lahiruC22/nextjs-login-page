"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface InputFieldProps {
  id: string
  name: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  className?: string
}

export function InputField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  className = "",
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"
  const inputType = isPassword ? (showPassword ? "text" : "password") : type

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-white">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          required={required}
          className="w-full rounded bg-[#1d1d21] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b61d2]"
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  )
}
