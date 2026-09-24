import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://pjozbyqllacpzqnxhptn.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_p3GXFPXe2qbZA_6KBtTHbw_Ioi3TTZl";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
