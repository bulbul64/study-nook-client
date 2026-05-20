import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import BookingCard from '@/components/rooms/BookingCard';

export default async function MyBookingPage() {
  const currentHeaders = await headers();
  const session = await auth.api.getSession({
    headers: currentHeaders 
  });
  const user = session?.user;
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You are not logged in!</h2>
        <Link href="/login" className="mt-5 text-sm text-purple-600 font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft className="size-4" /> Back to Login
        </Link>
      </div>
    );
  }

  let bookings = [];

  try {
    
    const res = await fetch(`http://localhost:5000/api/rooms/bookings/me`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': currentHeaders.get('cookie') || '',
      },
      cache: 'no-store'
    });

    if (res.ok) {
      bookings = await res.json();
    } else {
      console.error(`API Error: Received status ${res.status} from backend.`);
      bookings = [];
    }
  } catch (error) {
    console.error("Network or parsing error:", error);
    bookings = [];
  }

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] relative overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-6 group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-3">
            My Bookings
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">
            Manage your scheduled study sessions and spaces.
          </p>
        </div>

        <div className="space-y-6">
          {bookings?.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-24 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/80 rounded-[2rem] shadow-sm">
              <div className="size-20 bg-gray-50 dark:bg-gray-800 flex items-center justify-center rounded-3xl mb-6">
                <Calendar className="size-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                You have no bookings yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                Looks like you haven&apos;t booked any study space. Find the perfect room and start studying!
              </p>
              <Link href="/rooms">
                <Button className="bg-[#FA9500] hover:bg-[#E08600] text-white rounded-xl px-8 h-12 text-base font-bold shadow-lg shadow-[#FA9500]/20 transition-all hover:scale-105 active:scale-95">
                  Explore Rooms
                </Button>
              </Link>
            </div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            bookings.map((booking: any) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}