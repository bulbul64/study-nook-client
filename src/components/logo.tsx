import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.png"
        alt="StudyNook Logo"
        width={50}
        height={50}
        className="object-contain"
        priority
      />

      <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-50">
        <span className="text-[#FA9500]">Study</span>
        Nook
      </h2>
    </div>
  );
};

export default Logo;