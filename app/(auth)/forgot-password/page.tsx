"use client"


  export default function ForgotPasswordPage() {

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Top Section: Logo */}
      <div className="flex flex-col items-center">
        <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg">
          <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09a13.916 13.916 0 002.108-4.592M3.312 18.803A7.902 7.902 0 014 14.441m10.231-3.37a2.39 2.39 0 00-4.234-1.112M13 18.98V20a2 2 0 01-2 2H8a2 2 0 01-2-2v-1.02a2 2 0 01.485-1.312l.465-.548A3 3 0 018.182 16H9m2.957-4.383a3 3 0 002.823-3.617m.012 0a3.001 3.001 0 11-5.656 0m5.656 0a3 3 0 00-5.656 0"></path>
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and we all send you a recovery link.
        </p>
      </div>

      {/* Middle Section: Reset Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 rounded-2xl sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Send reset link
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <a href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              ← Back to login
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Call Support */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">Need immediate help?</p>
        <div className="mt-2 inline-flex items-center space-x-2 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-200">
          <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.812 4.812l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="text-gray-700 font-medium italic">Call Support:</span>
          <a href="tel:+1234567890" className="text-indigo-600 font-bold hover:underline">
            +1 (234) 567-890
          </a>
        </div>
      </div>

    </div>
  );
}
 
