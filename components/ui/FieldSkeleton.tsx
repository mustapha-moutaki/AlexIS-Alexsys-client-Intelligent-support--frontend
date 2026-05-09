export default function FieldSkeleton() {
    return (
        <span
      style={{
        display: "inline-block",
        width: 60,
        height: 10,
        borderRadius: 4,
background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",        animation: "shimmer 1.2s infinite linear",
      }}
    />
    )
}