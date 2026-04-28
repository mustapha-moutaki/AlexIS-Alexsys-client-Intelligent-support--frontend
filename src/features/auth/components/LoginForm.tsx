"use client"

export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  loading,
  error,
}: {
  email: string
  password: string
  setEmail: (v: string) => void
  setPassword: (v: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
  error: string
}) {
  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#0f0f1a] via-[#111827] to-[#0a0a0a]
      dark:from-black dark:via-gray-900 dark:to-black">

      <div className="absolute w-[400px] h-[400px] bg-purple-600 blur-[140px] opacity-30 rounded-full" />

      <form
        onSubmit={onSubmit}
        className="relative w-[380px] p-8 rounded-2xl
        bg-white/10 dark:bg-white/5
        backdrop-blur-xl border border-white/10 shadow-2xl space-y-5"
      >

        <h1 className="text-3xl font-bold text-white">
          Welcome Back
        </h1>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-black/30 text-white"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-black/30 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  )
}