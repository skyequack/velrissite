import { NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  inquiryType?: 'project' | 'call';
  name?: string;
  email?: string;
  company?: string;
  timeline?: string;
  scope?: string;
  message?: string;
};

const trimString = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
};

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload.' },
      { status: 400 }
    );
  }

  const inquiryType = payload.inquiryType === 'call' ? 'call' : 'project';
  const name = trimString(payload.name);
  const email = trimString(payload.email);
  const company = trimString(payload.company);
  const timeline = trimString(payload.timeline);
  const scope = trimString(payload.scope);
  const message = trimString(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 }
    );
  }

  // Replace this with persistent storage or external CRM integration.
  console.info('Contact inquiry received', {
    inquiryType,
    name,
    email,
    company,
    timeline,
    scope,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        inquiryType === 'call'
          ? 'Call request received. We will reach out shortly.'
          : 'Project inquiry received. We will reply with next steps soon.',
    },
    { status: 200 }
  );
}
