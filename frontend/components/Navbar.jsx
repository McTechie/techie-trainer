import { LogoutIcon, MoonIcon, SunIcon, UserRemoveIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';
import { useDarkMode } from '../hooks/useDarkMode';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuth();

  const { darkMode, dispatch } = useDarkMode();

  const handleLogout = () => {
    logout();
  }

  const handleDeleteAccount = () => {
    const userResponse = prompt(`\nAre you sure you want to delete your account?\nPlease confirm by entering \"${user.username}\" below:\n`, 'Your Username');

    if (userResponse === user.username) {
      console.log('User confirmed');
    }
  }

  const handleToggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  }

  return (
    <header className='bg-white dark:bg-neutral-800 shadow-sm'>
      <div className='max-w-screen-2xl px-10 py-8 lg:px-32 lg:py-12 flex items-center justify-between'>
        <Link href='/'>
          <h1 className='navbar-brand'>
            Techie Trainer
          </h1>
        </Link>

        {user && (
          <div className='flex space-x-6 items-center'>
            <span className='text-lg text-gray-500 dark:text-gray-200 font-light hidden md:inline-block'>
              {user.username}
            </span>
            <div>
              <button
                onClick={handleLogout}
                className='logout-btn'
              >
                Logout
              </button>
              
              <LogoutIcon
                onClick={handleLogout}
                className='logout-icon'
              />
              
              <button
                onClick={handleDeleteAccount}
                className='delete-acc-btn'
                >
                Delete Account
              </button>
              
              <UserRemoveIcon
                onClick={handleDeleteAccount}
                className='delete-acc-icon'
              />
              
              {!darkMode ? (
                <MoonIcon
                  onClick={handleToggleDarkMode}
                  className='moon-icon'
                />
              ) : (
                <SunIcon
                  onClick={handleToggleDarkMode}
                  className='sun-icon'
                />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
 
export default Navbar;