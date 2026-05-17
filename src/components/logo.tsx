import Image from "next/image";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image 
        src="/logo.png" // Ensure you've saved the generated image in your /public folder
        alt="StudyNook Logo" 
        width={50} 
        height={50} 
        className="object-contain"
        priority 
      />
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">
        StudyNook
      </h2>
    </div>
  );
};

export default Logo;