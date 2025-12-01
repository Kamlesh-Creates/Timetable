import { cookies } from "next/headers";
import { verifyJwt } from "./auth";

export async function getAuthTokenFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  return token?.value || null;
}

export async function getAuthenticatedAdmin() {
  const token = await getAuthTokenFromCookies();
  if (!token) return null;
  const payload = verifyJwt(token);
  if (!payload || payload.role !== "admin") return null;
  return payload;
}


