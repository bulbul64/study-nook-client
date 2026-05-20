'use client';

import React from 'react';
import {
  Users,
  DollarSign,
  Layers,
  Wifi,
  Tv,
  AirVent,
  Coffee,
  Sparkles,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Room } from '@/types/room';
import Link from 'next/link';

const AMENITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  whiteboard: Sparkles,
  projector: Tv,
  ac: AirVent,
  coffee: Coffee,
};

export default function MyListCard({ room }: { room: Room }) {
  return (
    <div className="group relative flex flex-col h-full bg-white dark:bg-[#1a1c23] rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl border border-gray-100 dark:border-none transition-all duration-300 hover:-translate-y-2">
      
      {/* Top Section - Image */}
      <div className="relative w-full h-[320px] bg-gray-100 dark:bg-[#1a1c23] shrink-0">
        {/* Price Badge (Top Right) */}
        <div className="absolute top-0 right-0 bg-[#ee6923] text-white font-black text-xl px-6 py-3 rounded-tr-[2.5rem] rounded-bl-[1.5rem] z-10 shadow-lg flex items-center">
          <DollarSign className="size-5 -mr-0.5" />
          <span>{room.hourlyRate}</span>
        </div>
        
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={room.imageUrl}
          alt={room.roomName}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-[#282a32] dark:to-[#131418] p-7 border-l-[6px] border-b-[6px] border-[#ee6923] border-t border-r border-t-transparent border-r-transparent dark:border-t-transparent dark:border-r-transparent rounded-bl-[2.5rem] rounded-br-[2.5rem]">
        
        <div className="flex gap-4 flex-1 mb-6">
          
          {/* Left Column (Title, Description, Stars) */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2 line-clamp-1 group-hover:text-[#ee6923] transition-colors">
              {room.roomName}
            </h3>
            
            <p className="text-[11px] text-gray-600 dark:text-gray-400 mb-3 line-clamp-3 leading-relaxed flex-1">
              {room.description}
            </p>

            {/* Rating Stars */}
            <div className="flex items-center gap-0.5">
              <Star className="size-3.5 fill-[#fcd53f] text-[#fcd53f]" />
              <Star className="size-3.5 fill-[#fcd53f] text-[#fcd53f]" />
              <Star className="size-3.5 fill-[#fcd53f] text-[#fcd53f]" />
              <Star className="size-3.5 fill-[#fcd53f] text-[#fcd53f]" />
              <Star className="size-3.5 fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600" />
            </div>
          </div>

          {/* Vertical Divider Line */}
          <div className="w-[1px] bg-gray-300 dark:bg-gray-600/50 my-1"></div>

          {/* Right Column (Features - Capacity, Floor, Amenities) */}
          <div className="flex-1 flex flex-col justify-between space-y-3 pl-2">
            <div>
              <h4 className="text-[10px] font-bold text-gray-800 dark:text-white uppercase tracking-wider flex items-center gap-1">
                <Users className="size-3 text-[#ee6923]" /> Capacity
              </h4>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight mt-0.5">
                For {room.capacity} Persons
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-gray-800 dark:text-white uppercase tracking-wider flex items-center gap-1">
                <Layers className="size-3 text-[#ee6923]" /> Floor
              </h4>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight mt-0.5 line-clamp-1">
                {room.floor}
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-gray-800 dark:text-white uppercase tracking-wider">Amenities</h4>
              {room.amenities && room.amenities.length > 0 ? (
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  {room.amenities.slice(0, 3).map((amenityId) => {
                    const Icon = AMENITY_ICONS[amenityId];
                    return Icon ? (
                      <div
                        key={amenityId}
                        className="p-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300"
                        title={amenityId}
                      >
                        <Icon className="size-3" />
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight mt-0.5">Standard</p>
              )}
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-2">
          {/* Note: logic room._id || room.id kept intact as requested */}
          <Link href={`/rooms/${room._id || room._id}`} className="w-full">
            <Button className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-[#FA9500] font-black uppercase rounded-full shadow-xl text-xs tracking-widest flex items-center justify-center gap-2 border-none">
              View Details
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}