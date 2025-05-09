"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) console.error(error);
  return user;
}
