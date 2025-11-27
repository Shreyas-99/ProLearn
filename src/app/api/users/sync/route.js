import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db.js";
import User from "@/app/models/User.js";

export async function POST() {
  try {
    // Get the currently logged-in user’s info from Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    // Fetch user details from Clerk API
    const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then((res) => res.json());

    // console.log(user);

    // Check if already exists
    const existingUser = await User.findOne({ clerkId: user.id });


    if (existingUser&&(existingUser.email===user.email_addresses[0].email_address)) {
      console.log("ℹ️ User already exists:", existingUser.email);
      return NextResponse.json({ success: true });
    }

    if (!existingUser) {
      // Create new user
      
      const newUser = await User.create({
        clerkId: user.id,
        email: user.email_addresses[0].email_address,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        imageUrl: user.image_url,
      });

      console.log("✅ New user created:", newUser.email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error syncing user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
