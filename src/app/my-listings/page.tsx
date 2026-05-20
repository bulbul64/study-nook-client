import MyListCard from '@/components/rooms/MyListCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { auth } from '@/lib/auth';
import { Room } from '@/types/room';
import { ArrowLeft, Inbox } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

export default async function MyListingsPage() {
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

  let rooms: Room[] = [];
  let isError = false;

  try {
    
    const res = await fetch(`/backend/api/rooms/my-rooms`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': currentHeaders.get('cookie') || '', 
      },
  
    });

    if (res.ok) {
      rooms = await res.json();
    } else {
      isError = true;
      console.error(`Error fetching rooms: ${res.status}`);
    }
  } catch (error) {
    isError = true;
    console.error("Backend fetch failed:", error);
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
        <p className="text-gray-500 mt-2">Could not fetch your rooms. Please try again later.</p>
        <Link href="/" className="mt-5 text-sm text-purple-600 font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft className="size-4" /> Go to Home
        </Link>
      </div>
    );
  }

  if (rooms.length === 0) {
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
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#FA9500]/10 via-transparent to-transparent pointer-events-none blur-3xl dark:from-[#FA9500]/15" />
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-[#FA9500]/10 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-[#ffb347]/10 rounded-full pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-semibold text-[1.5rem] tracking-tight text-gray-900 dark:text-gray-50">
            My Study Rooms
          </h2>

          <Select defaultValue="recommended">
            <SelectTrigger className="w-45 rounded-xl border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800/80">
              <SelectItem value="recommended" className="focus:bg-[#FA9500]/10 focus:text-[#FA9500]">Recommended</SelectItem>
              <SelectItem value="latest" className="focus:bg-[#FA9500]/10 focus:text-[#FA9500]">Latest</SelectItem>
              <SelectItem value="popular" className="focus:bg-[#FA9500]/10 focus:text-[#FA9500]">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {rooms.map((room: Room) => (
            <MyListCard key={room._id || room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}