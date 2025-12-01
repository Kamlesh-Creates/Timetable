import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Admin from "../../../../../models/Admin";
import { hashPassword, signJwt } from "../../../../../lib/auth";

export async function POST(request) {
  await connectToDatabase();

  const body = await request.json();
  const { name, email, password } = body || {};

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email and password are required" },
      { status: 400 }
    );
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { message: "Admin with this email already exists" },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  const admin = await Admin.create({
    name,
    email,
    passwordHash,
  });

  const token = signJwt({ id: admin._id.toString(), role: "admin", email });

  const response = NextResponse.json(
    {
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    },
    { status: 201 }
  );

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}

