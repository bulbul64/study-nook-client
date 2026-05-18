import { Button } from '@/components/ui/button';
import Logo from '../logo';
import { NavMenu } from '../nav-menu';
import { NavigationSheet } from '../navigation-sheet';
import { ModeToggle } from '../rooms/ModeToggle';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="fixed top-4 z-50 w-full px-4">
      <nav className="mx-auto h-16 max-w-5xl rounded-full border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-lg">
        <div className="mx-auto flex h-full items-center justify-between px-6">
          <Logo  />

          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                className="hidden rounded-full sm:inline-flex border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                variant="outline"
              >
                Sign In
              </Button>
            </Link>

            <Button className="rounded-full bg-[#FA9500] hover:bg-[#e08600] text-white shadow-lg shadow-[#FA9500]/20">
              Get Started
            </Button>

            <ModeToggle />

            <div className="md:hidden flex items-center">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;