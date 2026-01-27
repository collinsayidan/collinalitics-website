// app/api/contact/route.js
export const dynamic = "force-dynamic"; // prevents static analysis

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Import nodemailer ONLY at runtime on the server
    const nodemailer = (await import("nodemailer")).default;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Email failed" }, { status: 500 });
  }
}
