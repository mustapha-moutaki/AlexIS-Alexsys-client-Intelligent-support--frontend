type Props = {
  count?: number;
};

export default function CardSkeleton({ count = 1 }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1rem",
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            background: "#f0f2f5",
            border: `1px solid #f0f2f5`,
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            height: "320px",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Title Placeholder */}
            <div
              className="skeleton-item"
              style={{ width: "40%", height: "12px" }}
            />

            {/* Graph Placeholder */}
            <div
              className="skeleton-item"
              style={{ width: "100%", flex: 1, borderRadius: "8px" }}
            />
          </div>

          {/* Footer Placeholder */}
          <div
            style={{
              background: "#f0f2f5",
              borderTop: `1px solid #f0f2f5`,
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              className="skeleton-item"
              style={{ width: "20%", height: "8px" }}
            />
            <div
              className="skeleton-item"
              style={{ width: "100%", height: "10px" }}
            />
            <div
              className="skeleton-item"
              style={{ width: "80%", height: "10px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}