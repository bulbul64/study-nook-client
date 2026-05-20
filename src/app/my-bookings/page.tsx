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
    
   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/bookings/me`, { 
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

  
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No rooms found!</h2>
        <Link href="/rooms" className="mt-5 text-sm text-purple-600 font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft className="size-4" /> Back to Rooms
        </Link>
      </div>
    );
  }


  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] dark:bg-[#050505] relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-[#FA9500]/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FA9500] transition-colors mb-6 group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] text-gray-900 dark:text-white mb-4">
            My <span className="text-[#FA9500]">Bookings</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Keep track of your study sessions and manage your space.
          </p>
        </div>

        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-24 bg-white/50 dark:bg-[#0f1117]/50 backdrop-blur-xl border border-gray-200/50 dark:border-white/5 rounded-[2rem]">
              <div className="size-20 bg-gray-100 dark:bg-[#1a1c23] flex items-center justify-center rounded-3xl mb-6">
                <Calendar className="size-10 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                No Bookings Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                You haven't reserved any study spaces. Let's find you the perfect spot!
              </p>
              <Link href="/rooms">
                <Button className="bg-[#FA9500] hover:bg-[#E08600] text-white rounded-2xl px-10 h-14 text-sm font-black uppercase tracking-wider shadow-xl shadow-[#FA9500]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Explore Rooms
                </Button>
              </Link>
            </div>
          ) : (
            bookings.map((booking: any) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}