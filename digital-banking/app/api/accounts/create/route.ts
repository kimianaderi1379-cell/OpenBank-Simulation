import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { accountType, currency, initialDeposit } = body;

  const fakeAccountId = "11234567890";

  return NextResponse.json({
    accountId: fakeAccountId,
    accountType,
    balance: initialDeposit
  });
}
