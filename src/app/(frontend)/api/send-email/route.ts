import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  const { email, name, message } = await req.json()

  if (!email || !name || !message) {
    return NextResponse.json({ error: 'Missing required fields' })
  }

  const mailOptions = {
    from: 'Website Inquiry <no-reply@johnquery.com>',
    to: 'edwardlomat1503@gmail.com',
    replyTo: email,
    subject: `New inquiry from ${name}`,
    text: message,
    html: `<p>${message}</p>`,
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  try {
    // Send email notification first
    const info = await transporter.sendMail(mailOptions)

    // Save submission to database only after email succeeds
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-form-submissions',
      data: {
        name,
        email,
        message,
      },
    })

    return NextResponse.json(
      {
        success: `Message delivered to ${info.accepted}`,
      },
      { status: 200 },
    )
  } catch (err) {
    const errorMessage = (err as Error).message || 'Unknown error occurred'
    return NextResponse.json(
      {
        error: `Error sending email: ${errorMessage}`,
      },
      { status: 500 },
    )
  }
}
