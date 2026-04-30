export default function FieldSkeleton() {
    return (
        <span
      style={{
        display: "inline-block",
        width: 60,
        height: 10,
        borderRadius: 4,
        background: "linear-gradient(90deg, #1a1a1e 25%, #2a2a30 50%, #1a1a1e 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.2s infinite linear",
      }}
    />
    )
}