import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/mongodb"; // আপনার MongoDB কানেকশন ফাইলের পাথ ঠিক করে নেবেন
import DailyView from "@/models/DailyView";

export const dynamic = "force-dynamic"; // Netlify/Next.js ক্যাশ বন্ধ করে রিয়েল-টাইম ডাটা দেবে

function getTodayBD() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
}

// ১. ওয়েবসাইটে কেউ ঢুকলে ভিউ ১ বাড়াবে
export async function POST() {
  try {
    await dbConnect();
    const today = getTodayBD();

    const record = await DailyView.findOneAndUpdate(
      { date: today },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ views: record.views }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const today = getTodayBD();

    const record = await DailyView.findOne({ date: today });
    return NextResponse.json(
      { todayViews: record ? record.views : 0 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}