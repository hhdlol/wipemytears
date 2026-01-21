export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center absolute inset-0 bg-black/25">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-black border-t-blue-800" />
    </div>
  )
}
