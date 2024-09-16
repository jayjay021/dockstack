'use server';

import { randomBytes } from 'crypto';
import argon2 from '@node-rs/argon2';
import { ActionResult } from '@/lib/form';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

let resetKey: string | null = null;

export async function reset(key: string): Promise<ActionResult> {
  if (resetKey && (await argon2.verify(resetKey, key))) {
    db.prepare('DELETE FROM session').run();
    db.prepare('DELETE FROM user').run();
    redirect('signup');
  }

  return {
    error: 'Invalid reset key',
  };
}

export async function generateResetKey() {
  const key = randomBytes(32).toString('hex'); // Generates a 64-character hexadecimal string
  resetKey = await argon2.hash(key);
  console.log(key);
}
