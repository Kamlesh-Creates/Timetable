import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Admin from "../../../../../models/Admin";
import { verifyPassword, signJwt } from "../../../../../lib/auth";

export async function POST(request) {
  await connectToDatabase();

  const body = await request.json();
  const { email, password } = body || {};

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = signJwt({
    id: admin._id.toString(),
    role: "admin",
    email: admin.email,
  });

  const response = NextResponse.json(
    {
      message: "Logged in successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    },
    { status: 200 }
  );

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}

