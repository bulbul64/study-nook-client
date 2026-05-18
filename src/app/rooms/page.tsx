import React from 'react';
import RoomsCard from '@/components/card/RoomsCard';
import { Inbox } from 'lucide-react';
import { Room } from '@/types/room';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default async function AllRoomsPage() {
  let rooms: Room[] = [];
 try {
    const res = await fetch('http://localhost:5000/api/rooms', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch rooms');
    }
    rooms = await res.json();
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
 

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-87.5 bg-radial from-purple-500/10 via-indigo-500/5 to-transparent pointer-events-none blur-3xl dark:from-purple-500/15" />
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-purple-400/10 rounded-full pointer-events-none blur-3xl dark:bg-purple-600/10" />
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-sky-400/10 rounded-full pointer-events-none blur-3xl dark:bg-sky-600/10" />

      <div className="max-w-7xl mx-auto relative z-10">
         
  <div className="flex items-end justify-between mb-5">
        <h2 className="font-medium text-[1.5rem] tracking-tight">
          All Study Rooms
        </h2>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

        {rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-3xl shadow-xl max-w-xl mx-auto mt-12">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-full text-purple-500 mb-4">
              <Inbox className="size-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">No rooms found</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              We couldn&apos;t find any study spaces available at the moment. Please check back
              later or add a new space!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {rooms.map((room: Room) => (
              <RoomsCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
