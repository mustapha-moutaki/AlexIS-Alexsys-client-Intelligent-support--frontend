import React from "react";

export const Icon = ({ d, className = "" }: { d: string | string[]; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`stroke-current ${className}`} style={{ strokeWidth: 2 }}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

export const PATHS = {
  plus:  ["M12 5v14","M5 12h14"],
  edit:  ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  trash: ["M3 6h18","M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6","M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"],
  close: ["M18 6 6 18","M6 6l12 12"],
};

export function Modal({ title, icon, iconClass, iconBgClass, confirmLabel, confirmClass, onConfirm, onCancel, children }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-[440px] p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBgClass}`}>
              <Icon d={icon} className={`w-4 h-4 ${iconClass}`} />
            </div>
            <h2 className="text-sm font-bold text-gray-900">{title}</h2>
          </div>
          <button onClick={onCancel} className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <Icon d={PATHS.close} className="w-3.5 h-3.5" />
          </button>
        </div>
        {children}
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onCancel} className="px-4 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors ${confirmClass}`}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, value, onChange, placeholder, multiline }: any) {
  const base = "w-full px-3 py-2 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-[inherit] resize-none";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</label>
      {multiline 
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={base} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={base} />
      }
    </div>
  );
}