'use server';

import { ActionResult } from '@/lib/form';
import { hash } from '@node-rs/argon2';
import { generateId } from 'lucia';
import { DatabaseUser, db } from '@/lib/db';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { SqliteError } from 'better-sqlite3';
import { signupFormSchema } from './schema';

export async function signup(
  name: string,
  password: string,
  passwordConfirmation: string,
): Promise<ActionResult> {
  try {
    const validatedFormData = signupFormSchema.parse({
      name: name as string,
      password: password as string,
      passwordConfirmation: passwordConfirmation as string,
    });
    const passwordHash = await hash(validatedFormData.password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const userId = generateId(15);

    try {
      db.prepare(
        'INSERT INTO user (id, username, password_hash) VALUES(?, ?, ?)',
      ).run(userId, validatedFormData.name, passwordHash);

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    } catch (e) {
      if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return {
          error: 'Username already used',
        };
      }
      return {
        error: 'An unknown error occurred',
      };
    }
  } catch {
    return {
      error: 'Invalid form data',
    };
  }
  return redirect('/');
}

export async function checkIfUserExists(): Promise<void> {
  const existingUser = db.prepare('SELECT * FROM user').get() as
    | DatabaseUser
    | undefined;
  if (existingUser) {
    redirect('/login');
  }
}
