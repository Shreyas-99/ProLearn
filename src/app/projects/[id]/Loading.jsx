export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Loader */}
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500 mb-4"></div>

      {/* Text below loader */}
      <p className="text-gray-400 text-lg">Loading project...</p>
    </div>
  );
}


  
     