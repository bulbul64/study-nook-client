'use client';

import { Button } from '@/components/ui/button';
import Logo from '../logo';
import { NavMenu } from '../nav-menu';
import { NavigationSheet } from '../navigation-sheet';
import { ModeToggle } from '../rooms/ModeToggle';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import ProfileDropdown from '../home/ui/Profile';

const Navbar = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="fixed top-5 z-50 w-full px-4 sm:px-6 transition-all duration-300">
      <nav className="mx-auto h-18 max-w-6xl rounded-full border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-[#1a1c23]/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
        <div className="mx-auto flex h-full items-center justify-between px-6 lg:px-8">
          
          <Logo />

          <div className="hidden md:flex flex-1 justify-center">
            <NavMenu />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <>
                
                <ProfileDropdown handleSignOut={handleSignOut}  />
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block">
                  <Button
                    className="rounded-full font-bold text-sm text-gray-600 dark:text-gray-300 hover:text-[#ee6923] dark:hover:text-[#ee6923] hover:bg-[#ee6923]/10 dark:hover:bg-[#ee6923]/10 transition-colors border-none"
                    variant="outline"
                  >
                    Sign In
                  </Button>
                </Link>

                <Link href="/register">
                  <Button className="rounded-full bg-[#ee6923] hover:bg-[#d85f1f] text-white font-bold text-sm px-7 h-10 shadow-lg shadow-[#ee6923]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    Sign up
                  </Button>
                </Link>
              </>
            )}

            <ModeToggle />

            <div className="md:hidden flex items-center pl-1">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;