// Navbar.jsx
"use client";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark } from 'lucide-react';
import { LimelightNav } from "@/components/ui/limelight-nav";

const Navbar = () => {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();

  const customNavItems = [
    { id: 'home',      icon: <Home />,     label: '/home',                 onClick: () => console.log('Home Clicked!') },
    { id: 'bookmark',  icon: <Bookmark />, label: '/bookmarked-projects',  onClick: () => console.log('Bookmark Clicked!') },
  ];

  // ✅ pick active index by matching current pathname
  const activeIndexFromPath = (() => {
    const idx = customNavItems.findIndex(item => item.label === pathname);
    return idx === -1 ? 0 : idx;
  })();

  return (
    <div className="mb-7">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">ProLearn</div>

          <div className="flex gap-8 items-center">
            <LimelightNav
              className="rounded-xl"
              items={customNavItems}
              defaultActiveIndex={activeIndexFromPath}   // ✅ now driven by URL
            />
          </div>

          <div className="flex gap-1.5">
            <SignedOut>
              <SignInButton
                mode="modal"
                className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
              />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
