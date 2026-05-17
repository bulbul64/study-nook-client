// components/hero.tsx
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Next.js Image কম্পোনেন্ট যুক্ত করা হয়েছে
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GradientText from './gradient-text';

export default function Hero() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center px-6 pt-16 pb-24 overflow-hidden min-h-[85vh]">
 
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero.png" 
          alt="Modern library interior with people studying"
          fill
          priority
          className="object-cover object-center"
        />
  
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-950/85 backdrop-blur-[3px]" />
      </div>

    
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-300 via-transparent to-transparent" />
      </div>

    
      <Badge
        asChild
        className="rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-4 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors cursor-pointer"
        variant="secondary"
      >
        <Link href="/rooms">
          Book Study Rooms in Seconds <ArrowUpRight className="ml-1 size-4" />
        </Link>
      </Badge>

      <div className="mt-10 max-w-3xl text-center relative z-10">
        <h1 className="mx-auto max-w-2xl font-black text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] text-gray-900 dark:text-white leading-tight">
          Find Your Perfect Study Room{' '}
          <GradientText
            animationSpeed={2}
            className="gradient-diagonal border-b-2 border-dotted"
            colors={['var(--color-purple-500)', 'var(--color-indigo-400)', 'var(--color-sky-500)']}
            direction="diagonal"
          >
            smarter booking
          </GradientText>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
          Browse available study rooms, check real-time availability, and book your preferred time
          slot instantly. You can also list your own room and manage bookings without any hassle.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-6 text-base transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Link href="/rooms">
              Explore Rooms <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button asChild variant="outline" className="rounded-full px-6 py-6 text-base border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all bg-white/50 dark:bg-transparent">
            <Link href="/add-room">Add Your Room</Link>
          </Button>
        </div>

    
        <div className="mt-12 flex items-center justify-center gap-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-2">
            <span className="text-purple-600 dark:text-purple-400">★</span> 5.0 Star Rating
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span> Secure Booking
          </span>
        </div>
      </div>
    </div>
  );
}