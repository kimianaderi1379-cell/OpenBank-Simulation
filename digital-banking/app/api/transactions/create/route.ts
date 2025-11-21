import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { fromAccountId, toAccountId, amount, transactionType } = body;

  return NextResponse.json({
    transactionId: "trx123",
    status: "success",
    timestamp: new Date().toISOString(),
  });
}
