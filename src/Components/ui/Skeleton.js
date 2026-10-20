export default function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className || "h-4 w-full"}`}
    />
  );
}
