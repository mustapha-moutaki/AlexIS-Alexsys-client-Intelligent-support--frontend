"use client";

export default function UnauthorizedPage({ error = "" }: { error?: any }) {
    return (
        /* Main Container: 90% Width, clean white background, no card borders */
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white py-20 px-6">
            <div className="w-[90%] max-w-7xl">
                
                {/* 1. Professional Header */}
                <div className="flex items-center gap-4 mb-12 border-b border-slate-100 pb-8">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                        AlexIS
                    </h1>
                    <div className="h-5 w-px bg-slate-300" />
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                        Smart Support Platform
                    </p>
                </div>

                {/* 2. Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <span className="text-sky-600 font-bold text-sm uppercase tracking-widest">
                            Error 403
                        </span>
                        
                        <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mt-4 mb-6 tracking-tighter">
                            Access Denied
                        </h2>

                        <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                            You do not have the required permissions to access this resource. 
                            If you believe this is an error, please contact your administrator 
                            or try logging in with a different account.
                        </p>

                        {/* 3. Actions */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => (window.location.href = "/")}
                                className="px-8 h-12 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition shadow-sm"
                            >
                                Back to Home
                            </button>
                            
                            <button
                                onClick={() => window.history.back()}
                                className="px-8 h-12 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition"
                            >
                                Previous Page
                            </button>
                        </div>
                    </div>

                    {/* 4. System Diagnostics */}
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                            Security Diagnostics
                        </h3>
                        <div className="font-mono text-sm text-slate-600 leading-6">
                            {error ? (
                                typeof error === 'object' ? JSON.stringify(error) : error
                            ) : (
                                "Access restricted: Insufficient scope or role permissions for this endpoint."
                            )}
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-200/60 text-[10px] text-slate-400 font-mono">
                            TIMESTAMP: {new Date().toISOString()} <br />
                            STATUS: 403_FORBIDDEN
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}