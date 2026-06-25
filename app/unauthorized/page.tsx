"use client"

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-10 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
            <span className="text-white text-2xl font-bold">A</span>
          </div>

          <div className="ml-3 text-left">
            <h1 className="text-2xl font-bold text-slate-900">AlexIS</h1>
            <p className="text-sm text-slate-500">
              Smart Support Platform
            </p>
          </div>
        </div>

        {/* Error code */}
        <div className="mb-6">
          <span className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 text-red-600 text-4xl font-bold border border-red-100">
            403
          </span>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Access Denied
        </h2>

        <p className="text-slate-600 leading-relaxed mb-8">
          You do not have permission to access this page.
          Please contact your administrator or sign in with a different account.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex-1 h-12 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
          >
            Go Back
          </button>

          <Link
  href="/login"
  className="flex-1 h-12 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md"
>
  Login Again
</Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-slate-400">
          Error code: 403 Unauthorized
        </p>
      </div>
    </div>
  );
}
