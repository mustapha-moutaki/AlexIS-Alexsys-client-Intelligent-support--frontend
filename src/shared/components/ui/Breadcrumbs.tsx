"use client";

import { useRouter } from "next/navigation";



export default function Breadcrumbs({ items }: any) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1.5 text-[10px] text-white/45">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          {item.route ? (
            <span
              className="cursor-pointer hover:text-white/80"
              onClick={() => router.push(item.route)}
            >
              {item.name}
            </span>
          ) : (
            <span className="text-white/65">{item.name}</span>
          )}

          {index < items.length - 1 && <span className="text-white/20">›</span>}
        </div>
      ))}
    </div>
  );
}