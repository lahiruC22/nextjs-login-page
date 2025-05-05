"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Mock user database - in a real app, this would be a database
const users = [
    {
        id: "1",
        email: "test@visionexdigital.com.au",
        // In a real app, this would be hashed
        password: "password123",
        name: "Visionex Test User",
    },
]

// Type for the form state
type State = {
    error: string | null
    success: boolean
}

export async function login(prevState: State, formData: FormData): Promise<State> {
    // Add a small delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get form data
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const remember = formData.get("remember") === "on" || formData.get("remember") === "true"

    // Validate form data
    if (!email || !password) {
        return {
            error: "Email and password are required",
            success: false,
        }
    }

    // Find user
    const user = users.find((user) => user.email === email && user.password === password)

    // If user not found, return error
    if (!user) {
        return {
            error: "Invalid email or password",
            success: false,
        }
    }

    // Create session
    const session = {
        id: user.id,
        email: user.email,
        name: user.name,
    }

    // Set cookie
    const expires = remember
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        : new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    const cookiesStore = await cookies();
    cookiesStore.set({
        name: "session",
        value: JSON.stringify(session),
        httpOnly: true,
        expires,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    })

    // Redirect to dashboard
    redirect("/dashboard")
}

export async function logout() {
    // Delete session cookie
    const cookieStore = await cookies();
    cookieStore.delete("session")

    // Redirect to login page
    redirect("/")
}

export async function getSession() {

    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value

    if (!session) {
        return null
    }

    return JSON.parse(session)
}
