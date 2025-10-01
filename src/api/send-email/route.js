// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     const { email } = await req.json();

//     // Gmail SMTP config
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, // aapki gmail
//         pass: process.env.EMAIL_PASS, // app password
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER, // apne inbox me hi milega
//       subject: "New Subscriber on Stowave",
//       text: `New Email: ${email}`,
//     });

//     return new Response(
//       JSON.stringify({ success: true, message: "Email sent successfully" }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ success: false, message: "Failed to send email" }),
//       { status: 500 }
//     );
//   }
// }












import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ success: false, msg: "Message required" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Message from Stowave Website",
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
