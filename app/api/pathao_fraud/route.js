import { NextResponse } from "next/server";

let cachedToken = null;
let tokenExpiry = 0;

async function getPathaoToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const res = await fetch("https://merchant.pathao.com/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: process.env.PATHAO_USERNAME,
      password: process.env.PATHAO_PASSWORD,
    }),
  });

  const data = await res.json();
  if (!data?.access_token) {
    throw new Error("Pathao login failed. Check .env credentials.");
  }

  cachedToken = data.access_token;
  tokenExpiry = now + 23 * 60 * 60 * 1000; // ২৩ ঘণ্টা ক্যাশ থাকবে
  return cachedToken;
}

export async function POST(req) {
  try {
    const { phone } = await req.json();
    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const cleanPhone = phone.replace(/^\+?88/, "").trim();
    let token = await getPathaoToken();

    let checkRes = await fetch("https://merchant.pathao.com/api/v1/user/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ phone: cleanPhone }),
    });

    // টোকেন এক্সপায়ার হলে অটো রিফ্রেশ
    if (checkRes.status === 401) {
      cachedToken = null;
      token = await getPathaoToken();
      checkRes = await fetch("https://merchant.pathao.com/api/v1/user/success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: cleanPhone }),
      });
    }

    const raw = await checkRes.json();
    const customerData = raw?.data?.customer || {};
    const total = customerData.total_delivery || 0;
    const delivered = customerData.successful_delivery || 0;
    const cancelled = total - delivered;
    const successRate = total > 0 ? Math.round((delivered / total) * 100) : 0;

    return NextResponse.json({
      success: true,
      rating: raw?.data?.customer_rating || "unknown",
      total,
      delivered,
      cancelled,
      successRate,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}