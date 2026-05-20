import React from 'react';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Room } from '@/types/room';

export default async function FeaturedStudySpaces() {
  let rooms = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/featured-rooms`, { 
      method: 'GET',
      credentials: 'include',
      cache: 'no-store'
    });
    rooms = await res.json();
  } catch (error) {
    console.error("Failed to fetch rooms", error);
  }

  if (!rooms || rooms.length === 0) {
    rooms = [
      {
        _id: "6a0ab1585ad5a5005b075606",
        roomName: "Kaseem Cooper",
        description: "Ea eligendi aut sequ id voluptate assumenda. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        floor: "Distinctio Iste per",
        capacity: "81",
        hourlyRate: "100",
        amenities: ['wifi', 'ac', 'whiteboard'],
        imageUrl: "https://images.unsplash.com/photo-1531668720450-39cf1563fab9?w=600&auto=format&fit=crop&q=60"
      }
    ];
  }

  return (
    <div className="py-24 px-6 bg-white dark:bg-[#0e1322] border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* সেকশন হেডিং যা টেস্টমোনিয়ালের সাথে মিলবে */}
        <div className="text-center mb-16">
          <h2 className="font-black text-4xl tracking-[-0.04em] md:text-[2.75rem] text-gray-900 dark:text-white uppercase">
            Featured Study Spaces
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Pick from our top-rated, high-productivity environments handpicked for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {rooms.map((room: Room) => (
            <div
              key={room._id}
              className="w-full max-w-[380px] bg-gray-50 dark:bg-[#1a1c23] rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl dark:shadow-2xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 border border-gray-200/60 dark:border-gray-800/50"
            >
              <div className="relative w-full h-[240px] bg-gray-100 dark:bg-[#1a1c23]">
                <div className="absolute top-4 right-4 bg-[#ee6923] text-white font-black text-lg px-4 py-1.5 rounded-full z-10 shadow-md">
                  ${room.hourlyRate}/hr
                </div>
                <Image
                  src={room.imageUrl}
                  alt={room.roomName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 bg-white dark:bg-[#13151c]">
                <div className="flex gap-4 mb-6 flex-1">
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-2 line-clamp-1">
                      {room.roomName}
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed flex-1">
                      {room.description}
                    </p>

                    <div className="flex items-center gap-0.5 mt-auto">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-[#fcd53f] text-[#fcd53f]" />
                      ))}
                      <Star className="size-3.5 fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700" />
                    </div>
                  </div>

                  <div className="w-[1px] bg-gray-200 dark:bg-gray-800 my-1"></div>

                  <div className="w-[110px] flex flex-col justify-between space-y-3 pl-2">
                    <div>
                      <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Capacity</h3>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
                        {room.capacity} Persons
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Floor</h3>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5 line-clamp-1">
                        {room.floor}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Amenities</h3>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5 line-clamp-1 capitalize">
                        {room.amenities?.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                <Link href={`/rooms/${room._id}`} className="w-full mt-2">
                  <Button className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-[#ee6923] font-black uppercase rounded-full shadow-md text-xs tracking-widest flex items-center justify-center gap-2 border-none transition-all">
                    View Details
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}