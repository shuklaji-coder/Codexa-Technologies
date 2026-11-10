import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      service,
      budget,
      message,
      source = "Contact Form",
      quoteId,
      features = [],
      timeline,
      notes,
    } = body;

    // Read Brevo credentials strictly from server environment variables
    const apiKey = process.env.BREVO_API_KEY;
    const receiverEmail = process.env.BREVO_RECEIVER_EMAIL || "shuklarohan388@gmail.com";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "shuklarohan388@gmail.com";

    if (!apiKey) {
      console.warn("BREVO_API_KEY environment variable is not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Email service temporarily unconfigured on server. Please use WhatsApp.",
        },
        { status: 200 }
      );
    }

    // Format clean phone for WhatsApp link (strip non-digits)
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
    const waLink = cleanPhone
      ? `https://wa.me/${cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone}?text=${encodeURIComponent(
          `Hi ${name || "there"}, thank you for reaching out to Techlifa Technologies! We received your project brief.`
        )}`
      : "";

    const clientName = name || "Anonymous Client";
    const clientEmail = email || "Not provided";
    const clientPhone = phone || "Not provided";
    const projectService = service || "Website Development";
    const projectBudget = budget || "Standard Scope";
    const featuresList = Array.isArray(features) && features.length > 0 ? features.join(", ") : "Standard Requirements";

    const subject = quoteId
      ? `🚀 [Quote #${quoteId}] New Client Lead: ${clientName} (${projectService})`
      : `🔥 [Techlifa Lead] ${clientName} wants to build: ${projectService}`;

    // Luxury Cyber Dark Mode Email Template for Gmail/Apple Mail
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #06060c; color: #e2e8f0; margin: 0; padding: 20px; }
    .card { max-width: 620px; margin: 0 auto; background: #0c0c18; border: 1px solid #7c3aed40; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.8); }
    .header { background: linear-gradient(135deg, #4c1d95, #6d28d9, #1e1b4b); padding: 28px 24px; text-align: center; border-bottom: 1px solid #8b5cf640; }
    .header h1 { margin: 0; font-size: 24px; color: #ffffff; letter-spacing: 1px; font-weight: 800; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #c4b5fd; font-family: monospace; }
    .content { padding: 28px 24px; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.4); color: #c4b5fd; border-radius: 9999px; font-size: 11px; font-family: monospace; text-transform: uppercase; margin-bottom: 20px; }
    .lead-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .lead-table td { padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 14px; }
    .lead-table td.label { width: 35%; color: #94a3b8; font-weight: 600; font-size: 12px; text-transform: uppercase; font-family: monospace; }
    .lead-table td.value { color: #ffffff; font-weight: 500; }
    .highlight { color: #a78bfa; font-weight: 700; }
    .notes-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; margin-bottom: 24px; }
    .notes-box h4 { margin: 0 0 8px; font-size: 12px; text-transform: uppercase; color: #a78bfa; font-family: monospace; }
    .notes-box p { margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .cta-container { text-align: center; margin: 28px 0 10px; }
    .btn-wa { display: inline-block; background: #25d366; color: #000000; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 20px rgba(37,211,102,0.3); }
    .btn-reply { display: inline-block; background: rgba(255,255,255,0.08); color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 12px; font-weight: 600; font-size: 13px; margin-left: 10px; border: 1px solid rgba(255,255,255,0.15); }
    .footer { padding: 20px; text-align: center; font-size: 11px; color: #64748b; font-family: monospace; border-top: 1px solid rgba(255,255,255,0.05); }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>TECHLIFA TECHNOLOGIES</h1>
      <p>⚡ INBOUND CLIENT LEAD NOTIFICATION</p>
    </div>

    <div class="content">
      <div class="badge">Source: ${source}</div>

      <table class="lead-table">
        <tr>
          <td class="label">Client Name</td>
          <td class="value">${clientName}</td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp</td>
          <td class="value highlight">${clientPhone}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${clientEmail}" style="color: #60a5fa; text-decoration: none;">${clientEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Requested Service</td>
          <td class="value highlight">${projectService}</td>
        </tr>
        <tr>
          <td class="label">Budget / Scope</td>
          <td class="value">${projectBudget}</td>
        </tr>
        ${timeline ? `<tr><td class="label">Target Timeline</td><td class="value">${timeline}</td></tr>` : ""}
        ${features.length > 0 ? `<tr><td class="label">Selected Features</td><td class="value">${featuresList}</td></tr>` : ""}
        ${quoteId ? `<tr><td class="label">Quote Reference</td><td class="value font-mono highlight">#${quoteId}</td></tr>` : ""}
      </table>

      ${
        message || notes
          ? `
      <div class="notes-box">
        <h4>Client Project Brief & Notes:</h4>
        <p>${message || notes}</p>
      </div>`
          : ""
      }

      <div class="cta-container">
        ${
          waLink
            ? `<a href="${waLink}" class="btn-wa" target="_blank">💬 Open WhatsApp Chat</a>`
            : ""
        }
        ${
          email && email.includes("@")
            ? `<a href="mailto:${email}?subject=${encodeURIComponent("Kickoff Discussion - Techlifa Technologies")}" class="btn-reply">✉️ Reply via Email</a>`
            : ""
        }
      </div>
    </div>

    <div class="footer">
      Automated dispatch from techlifa.in • Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
    </div>
  </div>
</body>
</html>
`;

    // Dispatch directly to Brevo SMTP API
    const brevoPayload = {
      sender: {
        name: "Techlifa Lead System",
        email: senderEmail,
      },
      to: [
        {
          email: receiverEmail,
          name: "Rohan Shukla",
        },
      ],
      replyTo:
        email && email.includes("@")
          ? {
              email: email,
              name: clientName,
            }
          : undefined,
      subject: subject,
      htmlContent: htmlContent,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(brevoPayload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Brevo API Error:", responseData);
      return NextResponse.json(
        { success: false, error: responseData },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: responseData.messageId,
      message: "Lead successfully dispatched to Rohan Shukla via Brevo",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

