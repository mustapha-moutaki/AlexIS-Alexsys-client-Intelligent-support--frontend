"use client"

import { useState } from "react"
import LoginForm from "@/src/features/auth/components/LoginForm"
import { login } from "@/src/features/auth/services/auth.service"
import { saveToken, saveUser } from "@/src/lib/auth";
import useAuthStore from "@/src/store/uthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore((state:any)=> state.setAuth)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await login({ email, password })
      console.log("Login success:", response.data)
      saveToken(response.data.accessToken)
      saveUser(response.data.user)
     
      setAuth(response.data.user, response.data.accessToken);

    } catch (err) {
      setError("Invalid email or password");

    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  )
}