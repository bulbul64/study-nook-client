import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-2.5 group select-none transition-transform duration-300 active:scale-95 ${className}`}
    >
      {/* Logo Image Wrapper with subtle hover animation */}
      <div className="relative transition-transform duration-500 group-hover:rotate-[6px]">
        <Image
          src="/logo.png"
          alt="StudyNook Logo"
          width={44}
          height={44}
          className="object-contain sm:w-[48px] sm:h-[48px]"
          priority
        />
      </div>

      {/* Typography matched with header styles */}
      <h2 className="text-xl sm:text-2xl font-black tracking-[-0.03em] uppercase text-gray-900 dark:text-white transition-colors duration-300">
        <span className="text-[#FA9500] transition-colors duration-300 group-hover:text-[#e08600]">
          Study
        </span>
        <span className="text-gray-900 dark:text-white">
          Nook
        </span>
      </h2>
    </Link>
  );
};

export default Logo;