import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const formspreeUrl =
  process.env.FORMSPREE_ENDPOINT ||
  (process.env.FORMSPREE_ID ? `https://formspree.io/f/${process.env.FORMSPREE_ID}` : null);

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactRequestBody;
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, message)' },
        { status: 400 }
      );
    }

    const trimmedData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    // 1. Formspree delivery if configured
    if (formspreeUrl) {
      try {
        const formspreeRes = await fetch(formspreeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(trimmedData),
        });
        if (!formspreeRes.ok) {
          console.warn('Formspree response warning:', await formspreeRes.text());
        }
      } catch (err) {
        console.warn('Failed to post to Formspree:', err);
      }
    }

    // 2. Supabase storage if configured
    if (supabase) {
      const { error: dbError } = await supabase.from('contact_messages').insert([trimmedData]);
      if (dbError) {
        console.warn('Supabase insert warning:', dbError);
      }
    }

    // 3. Resend email delivery if configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Monas Waqar <hello@monaswaqar.me>',
          to: trimmedData.email,
          subject: 'Thanks for reaching out!',
          html: `<p>Hi ${trimmedData.name},</p><p>Thanks for your message — I'll get back to you soon.</p><p>— Monas Waqar</p>`,
        });
      } catch (err) {
        console.warn('Resend email delivery warning:', err);
      }
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (err: unknown) {
    console.error('Contact form error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
