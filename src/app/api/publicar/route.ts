import { NextRequest, NextResponse } from 'next/server';
import { updateNoticia } from '@/lib/firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, estado } = body;

    await updateNoticia(id, { estado });

    return NextResponse.json({ success: true, id, estado });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
