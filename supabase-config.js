// Shared Supabase client — loaded by every page that needs auth/database access.
// Uses the public "anon" key, which is safe to expose in frontend code as long
// as Row Level Security policies are in place on your tables (they are).

const SUPABASE_URL = "https://dqekyrtibpnvaghogwsa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxZWt5cnRpYnBudmFnaG9nd3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NjcwMzUsImV4cCI6MjEwNDA0MzAzNX0.ggdaEHSheJZWfMpUYQN6I_HgB0qwvmnryKFKfMTvVhA";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
