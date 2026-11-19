import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseEnv } from './config';
export function createClient() {
  const { url, key } = getSupabaseEnv();
  if (!url || !key) throw new Error('Supabase is not configured. Add the project URL and anon key.');
  return createBrowserClient(url, key);
}
