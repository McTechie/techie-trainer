import { useRouter } from 'next/router';
import Head from 'next/head';
import { Navbar, Main } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  
  return (
    <div className='bg-neutral-200 h-full text-gray-800'>
      <Head>
        <title>Techie Trainer</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />

      <Main />

      {/* Footer */}
    </div>
  )
}
