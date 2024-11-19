const Spinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }
  return <div className={`animate-spin border-t-2 border-gray-700 border-solid rounded-full ${sizes[size]}`} />
}

export { Spinner }
