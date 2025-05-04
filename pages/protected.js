import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getMicroCMSData } from '../lib/microcms';
import Link from 'next/link';

export default function Protected({ data }) {
  return (
    <div>
      <h1>Protected Page</h1>
    　<p>こちらは会員しか閲覧することができません。</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
  <Link href="/reviews">口コミを追加する</Link>
      <a href="/api/auth/logout">ログアウト</a>
      <br />
      <Link href="/">会員ホームにいく</Link>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired(async (ctx) => {
  const data = await getMicroCMSData();
  return { props: { data } };
});
