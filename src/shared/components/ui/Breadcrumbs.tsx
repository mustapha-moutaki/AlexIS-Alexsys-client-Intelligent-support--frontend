interface BreadcrumbItem {
  name?: string;     
  label?: string;     
  route?: string;
}


export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-black/45">
      {items.map((item, index) => {
        const displayText = item.name || item.label || ""; 

        return (
          <div key={index} className="flex items-center gap-1.5">
            {item.route ? (
              <a href={item.route} className="hover:text-black/70 transition-colors">
                {displayText}
              </a>
            ) : (
              <span className="text-black/70 font-medium">{displayText}</span>
            )}
            {index < items.length - 1 && (
              <span className="text-black/25">/</span>
            )}
          </div>
        );
      })}
    </div>
  );
}