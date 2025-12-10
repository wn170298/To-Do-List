import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
	if (typeof window === 'undefined') {
		throw new Error('Supabase client must be created on the client side only.');
	}

	if (_supabase) return _supabase;

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl) {
		throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable.');
	}

	_supabase = createClient(supabaseUrl, supabaseKey ?? '');
	return _supabase;
}

// For convenience, export a nullable value that may be used where a check is possible.
export const supabaseBrowser = () => (typeof window !== 'undefined' && _supabase) || null;
