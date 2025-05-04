// pages/reviews.js
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReviewsPage() {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const res = await fetch('/api/get-reviews');
      const data = await res.json();
      setReviews(data);
    };
    loadReviews();
  }, []);

  const handleSubmit = async () => {
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    setContent('');
    location.reload(); // シンプルな再読み込み
  };

  return (
    <div>
      <h1>口コミページ</h1>
      {user && (
        <>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleSubmit}>投稿</button>
        </>
      )}
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>
            <strong>{r.user_name}</strong>: {r.content}
          </li>
        ))}
      </ul>
          <br />
      <Link href="/api/auth/logout">ログアウト</Link>
      <br />
      <Link href="/">会員ホームにいく</Link>
    </div>
  );
}
