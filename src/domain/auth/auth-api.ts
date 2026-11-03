import { type Session, type User } from "@supabase/supabase-js";

import { supabase } from "@infra";

import { type AuthCredentials } from "./auth-types";

async function signIn(credentials: AuthCredentials): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    throw error;
  }

  return data.user;
}

async function signUp(credentials: AuthCredentials): Promise<User> {
  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("No user returned from Supabase");
  }

  return data.user;
}

async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

function onAuthStateChange(callback: (session: Session | null) => void): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return () => data.subscription.unsubscribe();
}

export const authApi = { signIn, signUp, signOut, getSession, onAuthStateChange };
