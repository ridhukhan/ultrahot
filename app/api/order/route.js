import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/order"
import { NextResponse } from "next/server";

export async function POST(req){

    await dbConnect()
    const body= await req.json()

    const{
        name,area,phone
    }= body

    const newOrder = await Order.create({
        name,area,phone
    })
  return  NextResponse.json(
        { success: true, message: "Order placed successfully!", order: newOrder },
      { status: 201 }
    )
}

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, orders },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("GET Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching orders." },
      { status: 500 }
    );
  }
}