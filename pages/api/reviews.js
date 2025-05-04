import { supabase } from '../../lib/supabaseClient';
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;
    const session = await getSession(req, res);
    if (!session || !session.user) return res.status(401).end();

    const { sub, name } = session.user;

    const { error } = await supabase
      .from('reviews')
      .insert([{ content, user_id: sub, user_name: name }]);

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}
