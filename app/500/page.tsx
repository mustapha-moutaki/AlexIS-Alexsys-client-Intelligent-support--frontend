"use client";
export default function ServerErrorPage() {
    return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-10 text-center">

        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">A</span>
          </div>

          <div className="ml-3 text-left">
            <h1 className="text-2xl font-bold text-slate-800">
              AlexIS
            </h1>

            <p className="text-sm text-slate-500">
              Smart Support Platform
            </p>
          </div>
        </div>

        {/* Error */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-slate-700">
              500
            </span>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Internal Server Error
        </h2>

        <p className="text-slate-500 leading-relaxed mb-8">
          Oops! Something went wrong on our side. Please try again later.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* <button
            onClick={() => window.history.back()}
            className="flex-1 h-12 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
          >
            Go Back
          </button> */}

          {/* <button
            onClick={() => (window.location.href = "/")}
            className="flex-1 h-12 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-600 transition"
          >
            Go Home
          </button> */}
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Error 500 • Internal Server Error
        </p>
      </div>
    </div>
  );
}