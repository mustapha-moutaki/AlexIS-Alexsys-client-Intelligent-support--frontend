export default function GlassComponent(){
    return(
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#51c2de] to-[#371450] px-4">
  <div
    className="w-full max-w-md rounded-3xl p-8 text-white border border-white/20 shadow-2xl backdrop-blur-md"
    style={{ backgroundColor: "rgba(200, 200, 200, 0.17)" }}
  >
    <h2 className="text-sm tracking-[0.2em] uppercase text-white/70 mb-2">
      Fake Company, Inc.
    </h2>

    <h1 className="text-3xl font-semibold mb-6">Login</h1>

    <div className="space-y-5">
      <div>
        <label className="block text-sm mb-2 text-white/80">Email</label>
        <input
          type="text"
          placeholder="johndoe@gmail.com"
          autoComplete="off"
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-white/45 focus:bg-white/15"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 text-white/80">Password</label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-white/45 focus:bg-white/15"
        />
      </div>
    </div>

    <div className="mt-3 text-right">
      <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
        Forgot password?
      </a>
    </div>

    <button className="w-full mt-6 rounded-2xl py-3 font-medium bg-white text-slate-900 hover:scale-[1.01] transition-transform">
      Sign in
    </button>

    <div className="text-center text-sm text-white/65 my-6">or continue with</div>

    <div className="grid grid-cols-3 gap-3">
      {['G', 'GH', 'f'].map((item) => (
        <button
          key={item}
          className="rounded-2xl border border-white/15 bg-white/10 py-3 hover:bg-white/15 transition-colors"
        >
          {item}
        </button>
      ))}
    </div>

    <div className="text-center text-sm text-white/70 mt-6">
      Don&apos;t have an account?{' '}
      <a href="#" className="text-white underline underline-offset-4">
        Register for free
      </a>
    </div>
  </div>
</div>
    )
}