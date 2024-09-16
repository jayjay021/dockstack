'use server';
import { ActionResult } from '@/lib/form';
import { validateRequest, lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect('/login');
}
