import { getUserLibrary } from "@/actions/library";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getUserLibrary()
  return NextResponse.json(data)
}