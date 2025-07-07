'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

type FormData = {
  email: string;
  password: string;
  displayName?: string;
};

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword(formData);

  if (data.user) {
    revalidatePath('/', 'layout');
    redirect('/chat');
  }

  return { error, data };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const { email, password, displayName } = formData;

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) {
  console.error(error);
  }

  if (data.user) {
  console.log(data.user);
  revalidatePath('/', 'layout');
  redirect('/chat');
  }

  return { error, data };
}
