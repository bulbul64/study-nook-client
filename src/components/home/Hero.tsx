import { ArrowUpRight, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GradientText from '../gradient-text';
import Stats from '../stats';

export default function Hero() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center px-6 pt-24 pb-12 overflow-hidden min-h-[90vh] bg-gray-50/50 dark:bg-[#0b0f19]">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero.png"
          alt="Modern library interior with people studying"
          fill
          priority
          className="object-cover object-center opacity-30 dark:opacity-10 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-gray-50/50 dark:from-[#0b0f19]/60 dark:via-[#0b0f19]/80 dark:to-[#0b0f19] backdrop-blur-[1px]" />
      </div>

      {/* Ambient Glow Graphic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-60 dark:opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[15%] w-[40%] aspect-square rounded-full bg-gradient-to-br from-[#ee6923]/30 to-transparent blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[35%] aspect-square rounded-full bg-gradient-to-bl from-[#ee6923]/20 to-transparent blur-[100px]" />
      </div>

      {/* Interactive Top Badge */}
      <Badge
        asChild
        className="rounded-full bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-200 px-5 py-2 border border-gray-200/60 dark:border-gray-800/60 hover:border-[#ee6923]/40 dark:hover:border-[#ee6923]/40 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        variant="secondary"
      >
        <Link href="/rooms" className="flex items-center gap-1 text-xs font-bold tracking-wide uppercase">
          Book Study Rooms in Seconds{' '}
          <ArrowUpRight className="ml-1 size-4 text-[#ee6923] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Badge>

      {/* Main Hero Content */}
      <div className="mt-10 max-w-4xl text-center relative z-10 flex flex-col items-center">
        <h1 className="mx-auto max-w-3xl font-black text-4xl sm:text-5xl md:text-7xl tracking-[-0.04em] text-gray-900 dark:text-white leading-[1.1] uppercase">
          Find Your Perfect{' '}
          <span className="block mt-1">
            Study Room{' '}
            <GradientText
              animationSpeed={3}
              className="gradient-diagonal inline-block"
              colors={['#ee6923', '#ffb347', '#ffd08a']}
              direction="diagonal"
            >
              smarmer booking
            </GradientText>
          </span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium antialiased">
          Browse available study rooms, check real-time availability, and book your preferred time
          slot instantly. You can also list your own room and manage bookings without any hassle.
        </p>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
          <Button 
            asChild 
            className="w-full sm:w-auto rounded-full bg-[#ee6923] hover:bg-[#d85f1f] text-white px-8 py-6 text-sm font-black uppercase tracking-widest shadow-xl shadow-[#ee6923]/20 hover:shadow-2xl hover:shadow-[#ee6923]/30 transition-all duration-300 group"
          >
            <Link href="/rooms" className="flex items-center justify-center gap-2">
              Explore Rooms{' '}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto rounded-full px-8 py-6 text-sm font-black uppercase tracking-widest border-2 border-gray-300 dark:border-gray-800 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-[#ee6923] transition-all duration-300 bg-white/50 dark:bg-transparent text-gray-800 dark:text-gray-200"
          >
            <Link href="/add-room" className="flex items-center justify-center">
              Add Your Room
            </Link>
          </Button>
        </div>

        {/* Trust/Feature Indicators */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-800/30 pt-8 w-full max-w-xl">
          <span className="flex items-center gap-2">
            <Star className="size-4 fill-[#ee6923] text-[#ee6923]" /> 
            <span>5.0 Star Rating</span>
          </span>
          <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-800" />
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-green-500" /> 
            <span>Secure Booking</span>
          </span>
        </div>
      </div>
    </div>
  );
}