import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, surname, email, dialingCode, phoneNumber, userType, message } = body;

    if (!email || !message) {
      return NextResponse.json({ message: "Email and message are required" }, { status: 400 });
    }

    console.log("📨 Sending Email...");

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "contactus@caminotiger.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("✅ Transporter Created, Sending Email Now...");

    const emailResponse = await transporter.sendMail({
      from: "contactus@caminotiger.com",
      to: "contactus@caminotiger.com",
      subject: "New Contact Form Submission",
      text: `Name: ${firstName} ${surname}\nEmail: ${email}\nPhone: ${dialingCode} ${phoneNumber}\nUser Type: ${userType}\nMessage:\n${message}`,
    });

    console.log("✅ Email Sent Successfully!", emailResponse);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("❌ Email Sending Failed:", error);
    return NextResponse.json({ message: "Error sending email", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

// Handle GET requests correctly to avoid 405 errors
export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
