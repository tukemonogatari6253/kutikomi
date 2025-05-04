import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Head from 'next/head'; // 追加

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
    <Head>
<title>ホーム - こんにちは。まずはログインしよう</title>
<meta name="description" content="Auth0認証を使ったNext.jsアプリ" />
</Head>
      <h1>こんにちは。まずはログインしよう</h1>
      {!user ? (
        <a href="/api/auth/login">ログイン</a>
      ) : (
        <>
          <p>ログインできました。こんにちは, {user.name}</p>
          <a href="/api/auth/logout">ログアウト</a>
          <br />
          <Link href="/protected">会員ページにいく</Link>
        </>
      )}
    </div>
  );
}
export const getServerSideProps = async () => {
  return { props: {} };
};
