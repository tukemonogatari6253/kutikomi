// pages/reviews.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
export default function Reviews() {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (!error) setReviews(data);
  }

  async function submitReview() {
    if (!content) return;

    const { error } = await supabase.from('reviews').insert([
      {
        user_id: user.sub,
        user_name: user.name,
        content,
      },
    ]);
    if (!error) {
      setContent('');
      fetchReviews();
    }
  }

  if (!user) return <p>ログインしてください</p>;

  return (
    <div>
      <h1>口コミ一覧</h1>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={submitReview}>投稿</button>

      <ul>
        {reviews.map((r) => (
          <li key={r.id}>
            <strong>{r.user_name}</strong>: {r.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
