import Head from 'next/head'
import { Navbar, Main } from '../components'

export default function Home() {
  return (
    <div className='bg-neutral-200 h-full text-gray-800'>
      <Head>
        <title>Techie Trainer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Main />

      {/* Footer */}
    </div>
  )
}