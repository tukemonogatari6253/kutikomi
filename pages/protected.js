import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getMicroCMSData } from '../lib/microcms';
import Link from 'next/link';

export default function Protected({ data }) {
  return (
    <div>
      <h1>Protected Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <a href="/api/auth/logout">ログアウト</a>
      <br />
      <Link href="/">会員ページにいく</Link>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired(async (ctx) => {
  const data = await getMicroCMSData();
  return { props: { data } };
});
