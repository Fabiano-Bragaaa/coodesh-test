import { authAdapter } from "./auth-adapter";
import { authApi } from "./auth-api";
import { type AuthCredentials, type AuthFailure, type AuthUser } from "./auth-types";

async function signIn(credentials: AuthCredentials): Promise<AuthUser> {
  return authAdapter.toUser(await authApi.signIn(credentials));
}

async function signUp(credentials: AuthCredentials): Promise<AuthUser> {
  return authAdapter.toUser(await authApi.signUp(credentials));
}

async function signOut(): Promise<void> {
  await authApi.signOut();
}

async function getUser(): Promise<AuthUser | null> {
  const session = await authApi.getSession();

  return session ? authAdapter.toUser(session.user) : null;
}

function onUserChange(callback: (user: AuthUser | null) => void): () => void {
  return authApi.onAuthStateChange((session) => {
    callback(session ? authAdapter.toUser(session.user) : null);
  });
}

function toFailure(error: unknown): AuthFailure {
  return authAdapter.toFailure(error);
}

export const authService = { signIn, signUp, signOut, getUser, onUserChange, toFailure };
