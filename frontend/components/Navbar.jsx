import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-screen-2xl px-10 py-8 lg:px-32 lg:py-12 flex items-center justify-between'>
        <Link href='/'>
          <h1 className='text-gray-600 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold cursor-pointer'>Techie Trainer</h1>
        </Link>

        {user && (
          <div className='flex space-x-6 items-center'>
            <span className='text-lg text-gray-500 font-light'>
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className='bg-white rounded-full font-bold text-primary border-primary border-2 text-sm lg:text-base w-32 py-2 hover:shadow-md'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
 
export default Navbar;