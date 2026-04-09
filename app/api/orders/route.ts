import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(request: Request) {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { customerName, motherName, customerEmail, customerPhone, customerAddress, paymentMethod, transactionId, paymentReference, postTitle, postPrice } = body;

    if (!customerName || !motherName || !customerPhone || !customerAddress || !postTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (paymentMethod && paymentMethod !== "COD" && (!transactionId || !paymentReference)) {
      return NextResponse.json(
        { error: "Transaction ID and screenshot/reference link are required for online payment." },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      customerName,
      motherName,
      customerEmail,
      customerPhone,
      customerAddress,
      paymentMethod: paymentMethod || "COD",
      transactionId,
      paymentReference,
      postTitle,
      postPrice,
    });

    return NextResponse.json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("POST Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully!" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body ?? {};

    const allowed = new Set(["Pending", "Completed"]);
    if (!status || typeof status !== "string" || !allowed.has(status)) {
      return NextResponse.json(
        { error: "Invalid status. Allowed: Pending, Completed" },
        { status: 400 }
      );
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order updated successfully!", order: updated });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
