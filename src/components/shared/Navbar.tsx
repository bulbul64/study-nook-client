import { Button } from "@/components/ui/button";
import Logo from "../logo";
import { NavMenu } from "../nav-menu";
import { NavigationSheet } from "../navigation-sheet";
import { ModeToggle } from "../ModeToggle";

const Navbar = () => {
  return (
  
    <div className="fixed top-4 z-50 w-full px-4">
      <nav className="mx-auto h-16 max-w-5xl rounded-full border border-border/85 bg-background/80 backdrop-blur-md shadow-md transition-all">
        <div className="mx-auto flex h-full items-center justify-between px-6">
          
       
          <Logo />

       
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Button
              className="hidden rounded-full sm:inline-flex"
              variant="outline"
            >
              Sign In
            </Button>
            <Button className="rounded-full bg-purple-600 hover:bg-purple-700 text-white">
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