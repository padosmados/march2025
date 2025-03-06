import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const attachments: any[] = [];

    // Process uploaded files
    for (let i = 0; i < 8; i++) {
      const file = formData.get(`photo${i + 1}`) as File | null;
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    }

    // Configure Nodemailer transport using SSL for Hostinger
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // SSL enabled (Port 465)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare the email details
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "Register Property Submission",
      text: `
        First Name: ${formData.get("firstName")}
        Surname: ${formData.get("surname")}
        Email: ${formData.get("email")}
        Name of Property: ${formData.get("propertyName")}
        Address: ${formData.get("propertyAddress")}
        Landline: ${formData.get("landline")}
        Mobile: ${formData.get("mobile")}
        WhatsApp Available: ${formData.get("whatsapp")}
        Comments: ${formData.get("comments")}
      `,
      attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error sending email:", error);

    // Ensure error message is safely extracted
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: "Failed to send email", error: errorMessage }, { status: 500 });
  }
}
