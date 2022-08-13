import Link from 'next/link';

const Navbar = () => {
  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-screen-xl px-10 py-8 lg:px-32 lg:py-12 flex items-center justify-between'>
        <Link href='/'>
          <h1 className='text-gray-600 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold cursor-pointer'>Techie Trainer</h1>
        </Link>
      </div>
    </header>
  );
}
 
export default Navbar;