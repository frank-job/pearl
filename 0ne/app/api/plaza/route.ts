import { NextResponse } from "next/server";

export async function GET() {
  const stats = {
    shopsOpen: Math.floor(120 + Math.random() * 40),
    activeBuyers: Math.floor(300 + Math.random() * 200),
    productsListed: Math.floor(1800 + Math.random() * 500),
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json(stats);
}
