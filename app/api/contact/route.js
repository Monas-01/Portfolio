import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { error: dbError } = await supabase.from('contact_messages').insert([
      { name: name.trim(), email: email.trim(), message: message.trim() },
    ]);

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json(
        { error: dbError.message || 'Failed to save message' },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: 'Monas Waqar <hello@monaswaqar.me>',
      to: email,
      subject: 'Thanks for reaching out!',
      html: `<p>Hi ${name},</p><p>Thanks for your message — I'll get back to you soon.</p><p>— Mona</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}