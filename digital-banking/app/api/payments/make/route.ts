import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { accountId, amount, payee, paymentType } = body;

  return NextResponse.json({
    paymentId: "pay123",
    status: "success",
    paymentDate: new Date().toISOString(),
  });
}
