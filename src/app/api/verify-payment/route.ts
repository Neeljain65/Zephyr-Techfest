import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase"; // We need our server-side db instance
import { doc, updateDoc } from "firebase/firestore";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registrationId, // The ID of the document we saved in Firestore
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // 1. VERIFY THE SIGNATURE
    // This is a "secret handshake" between your server and Razorpay.
    // It proves that the payment notification is authentic.
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // 2. PAYMENT IS AUTHENTIC - UPDATE THE DATABASE
      // Get a reference to the specific document in Firestore
      const registrationRef = doc(db, "registrations", registrationId);

      // Update the document with the successful payment details
      await updateDoc(registrationRef, {
        paymentStatus: "paid",
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
      });

      // 3. SEND SUCCESS RESPONSE
      return NextResponse.json(
        { message: "Payment verified successfully" },
        { status: 200 }
      );
    } else {
      // 4. SIGNATURE MISMATCH - SEND FAILURE RESPONSE
      return NextResponse.json(
        { message: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
