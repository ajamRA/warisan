import { db } from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { UserRow } from '../db/types.js';

export async function register(name: string, email: string, password: string) {
  const existing = await db('users').where({ email }).first();
  if (existing) {
    throw new Error('Email already registered');
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db('users')
    .insert({ name, email, password_hash: passwordHash })
    .returning(['id', 'name', 'email', 'role']);

  const payload = { userId: user.id, email: user.email, role: user.role };
  return {
    user,
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
}

export async function login(email: string, password: string) {
  const user = await db('users').where({ email }).first() as UserRow | undefined;
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const valid = await comparePassword(password, user.password_hash);
  if (!valid) {
    throw new Error('Invalid credentials');
  }

  const payload = { userId: user.id, email: user.email, role: user.role };
  const { password_hash, ...safeUser } = user;
  return {
    user: safeUser,
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
}

export async function refreshToken(token: string) {
  const payload = verifyRefreshToken(token);
  const user = await db('users').where({ id: payload.userId }).first();
  if (!user) {
    throw new Error('User not found');
  }

  const newPayload = { userId: user.id, email: user.email, role: user.role };
  return {
    accessToken: signAccessToken(newPayload),
    refreshToken: signRefreshToken(newPayload),
  };
}

export async function getProfile(userId: string) {
  const user = await db('users').where({ id: userId }).select(
    'id', 'name', 'email', 'bio', 'avatar_url', 'role',
    'country', 'language', 'skills_count', 'created_at'
  ).first();
  return user;
}
