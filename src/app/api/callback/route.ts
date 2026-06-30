import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyYBVj_cl-HVaoI7YpO5Ef_oHU7gW0A4Rt01JUMF7dVqDu42k26hzQn3wesfIkb9LERzg/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();

    return NextResponse.json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit",
      },
      { status: 500 }
    );
  }
}