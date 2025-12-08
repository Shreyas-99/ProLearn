"use client";
import { useRouter } from "next/navigation";

const BackButton = ({classname}) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className= {`  flex items-center gap-2 px-4 ml-3 mt-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 active:scale-95  ${classname} `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>
  );
};

export default BackButton;
