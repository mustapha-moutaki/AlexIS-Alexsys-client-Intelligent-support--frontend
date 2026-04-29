"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/src/shared/components/layout/Navbar"
import Sidebar from "@/src/shared/components/layout/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
    }
  }, [])

  // return (
  //   <div className="min-h-screen flex">
  //     {/* Sidebar */}
  //     <div className="w-64 bg-black text-white p-4">
  //       Dashboard
  //     </div>

  //     {/* Content */}
  //     <div className="flex-1 p-6">
  //       {children}
  //     </div>
  //   </div>
  // )
  return (
    <div className="flex min-h-screen bg-black-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>

        {/* Footer (optional) */}
        {/* <Footer /> */}

      </div>
    </div>
  )
}