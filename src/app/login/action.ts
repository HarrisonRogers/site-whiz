'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

type FormData = {
  email: string;
  password: string;
};

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signUp(formData);

  if (error) {
    redirect('/error');
  }

  if (data.user) {
    console.log(data.user);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
