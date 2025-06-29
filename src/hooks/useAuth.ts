import { createClient } from '@/utils/supabase/client';

export default async function useAuth() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
