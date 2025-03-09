import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://randomassapiforgettingkeys");
    if (!response.ok) {
      throw new Error(`Key fetch failed: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to retrieve keys: ${error}` },
      { status: 500 }
    );
  }
}
