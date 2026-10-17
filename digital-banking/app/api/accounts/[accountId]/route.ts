import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ accountId: string }> }
) {
  const { accountId } = await params;
  return NextResponse.json({
    accountId,
    accountType: "checking",
    balance: 1000,
    transactions: [],
  });
}