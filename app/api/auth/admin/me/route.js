import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../../../../lib/authMiddleware";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    {
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    },
    { status: 200 }
  );
}


