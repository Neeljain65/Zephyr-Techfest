import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { nanoid } from "nanoid";

// Initialize the Razorpay instance with your secret keys.
// These are read securely from your .env.local file and are never exposed to the client.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/**
 * This function handles POST requests to the /api/create-order endpoint.
 * It receives the transaction amount from the frontend, creates a Razorpay order,
 * and sends the order details back to the client to initiate the payment popup.
 */
export async function POST(request: Request) {
  // Parse the request body to get the amount for the payment.
  const { amount } = await request.json();

  // Define the options for the Razorpay order.
  const options = {
    amount: amount * 100, // Razorpay requires the amount in the smallest currency unit (e.g., paisa for INR).
    currency: "INR",
    receipt: `receipt_order_${nanoid(10)}`, // A unique receipt ID for this order.
  };

  try {
    // Use the Razorpay SDK to create a new order with the specified options.
    const order = await razorpay.orders.create(options);

    // If the order is created successfully, send it back to the frontend as a JSON response.
    return NextResponse.json(order);
  } catch (error) {
    // If there's an error during order creation, log it to the server console.
    console.error("Error creating Razorpay order:", error);

    // Send back a JSON response with an error message and a 500 Internal Server Error status code.
    return NextResponse.json(
      { error: "Could not create payment order." },
      { status: 500 }
    );
  }
}
