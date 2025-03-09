import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { ciphertext } = await req.json();
    if (!ciphertext) {
      return NextResponse.json({ error: "No ciphertext provided" }, { status: 400 });
    }
    const response = await fetch("https://randomassapifordecryption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ciphertext }),
    });
    if (!response.ok) {
      throw new Error("Failed to decrypt");
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Decryption failed: ${error}` },
      { status: 500 }
    );
  }
}
