"use client"

import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "outline"
  className?: string
  disabled?: boolean
  onClick?: () => void
  fullWidth?: boolean
}

export function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = "rounded py-3 font-medium transition-colors"
  const widthClasses = fullWidth ? "w-full" : ""

  const variantClasses = {
    primary: "bg-[#6b61d2] text-white hover:bg-[#a89fff] disabled:opacity-70",
    secondary: "bg-white text-gray-800 hover:bg-gray-100",
    outline: "bg-transparent border border-[#6b61d2] text-[#6b61d2] hover:bg-[#6b61d2]/10",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
