import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }
    const externalResponse = await fetch("https://randomassapiforencryption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!externalResponse.ok) {
      throw new Error(`Encryption API error: ${externalResponse.status}`);
    }

    const data = await externalResponse.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: `Encryption failed: ${error}` },
      { status: 500 }
    );
  }
}
