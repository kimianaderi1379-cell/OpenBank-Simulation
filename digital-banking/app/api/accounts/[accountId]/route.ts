import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { accountId: string } }
) {
  const { accountId } = params;

  return NextResponse.json({
    accountId,
    accountType: "checking",
    balance: 1000,
    transactions: [],
  });
}
