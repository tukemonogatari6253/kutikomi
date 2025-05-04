import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { data, error } = await supabase
    .from('reviews')
    .select('id, content, user_name, created_at')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}
