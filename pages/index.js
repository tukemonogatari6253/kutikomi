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
<title>ホーム - こんにちは。</title>
<meta name="description" content="Auth0認証を使ったNext.jsアプリ" />
</Head>
      {!user ? (
        <h1>こんにちは。まずはログインしよう</h1>
        <Link href="/api/auth/login">ログイン</Link>
      ) : (
        <>
          <h1>ログインできました。こんにちは, {user.name}</h1>
          <Link href="/api/auth/logout">ログアウト</Link>
          <br />
          <Link href="/protected">会員ページにいく</Link>
         <Link href="/reviews">口コミページへ</Link>
        </>
      )}
    </div>
  );
}
export const getServerSideProps = async () => {
  return { props: {} };
};
