'use server';

import { DatabaseUser, db } from '@/lib/db';
import { ActionResult } from '@/lib/form';
import { lucia } from '@/lib/lucia';
import { verify } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(
  username: string,
  password: string,
): Promise<ActionResult> {
  //TODO - Add basic validation for username and password

  const existingUser = db
    .prepare('SELECT * FROM user WHERE username = ?')
    .get(username) as DatabaseUser | undefined;
  if (!existingUser) {
    return {
      error: 'Incorrect username or password',
    };
  }

  const validPassword = await verify(existingUser.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling, 2FA, etc.
    // If usernames are public, you can outright tell the user that the username is invalid.
    return {
      error: 'Incorrect username or password',
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect('/');
}

export async function checkIfNoUserExists(): Promise<void> {
  const existingUser = db.prepare('SELECT * FROM user').get() as
    | DatabaseUser
    | undefined;
  if (!existingUser) {
    redirect('/signup');
  }
}
