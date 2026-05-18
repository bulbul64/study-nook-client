import React from 'react';
import RoomsCard from '@/components/rooms/RoomsCard';
import { Inbox } from 'lucide-react';
import { Room } from '@/types/room';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#FA9500]/10 via-transparent to-transparent pointer-events-none blur-3xl dark:from-[#FA9500]/15" />
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-[#FA9500]/10 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-[#ffb347]/10 rounded-full pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-semibold text-[1.5rem] tracking-tight text-gray-900 dark:text-gray-50">
            All Study Rooms
          </h2>

          <Select defaultValue="recommended">
            <SelectTrigger className="w-45 rounded-xl border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800/80">
              <SelectItem value="recommended" className="focus:bg-[#FA9500]/10 focus:text-[#FA9500]">
                Recommended
              </SelectItem>
              <SelectItem value="latest" className="focus:bg-[#FA9500]/10 focus:text-[#FA9500]">
                Latest
              </SelectItem>
              <SelectItem value="popular" className="focus:bg-[#FA9500]/10 focus:text-[#FA9500]">
                Popular
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800/80 rounded-2xl shadow-2xl max-w-xl mx-auto mt-12">
            <div className="p-4 bg-[#FA9500]/10 rounded-full text-[#FA9500] mb-4">
              <Inbox className="size-10" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              No rooms found
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              We couldn’t find any study spaces available right now. Try again later or add a new room.
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