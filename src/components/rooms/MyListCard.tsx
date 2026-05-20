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
    <div className="group relative flex flex-col h-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800/80 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={room.imageUrl}
          alt={room.roomName}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-gray-950/80 dark:bg-white/90 backdrop-blur-xl rounded-full text-white dark:text-gray-950 font-semibold text-sm shadow-md">
          <DollarSign className="size-3.5 text-[#FA9500]" />
          <span>{room.hourlyRate}</span>
          <span className="text-xs font-normal text-gray-300 dark:text-gray-600">
            /hr
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-[#FA9500] uppercase mb-3">
          <span className="flex items-center gap-1">
            <Layers className="size-3.5" /> {room.floor}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span className="flex items-center gap-1">
            <Users className="size-3.5" /> {room.capacity}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 tracking-tight line-clamp-1 group-hover:text-[#FA9500] transition-colors">
          {room.roomName}
        </h3>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">
          {room.description}
        </p>

        {room.amenities && room.amenities.length > 0 && (
          <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
            {room.amenities.map((amenityId) => {
              const Icon = AMENITY_ICONS[amenityId];
              return Icon ? (
                <div
                  key={amenityId}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400"
                  title={amenityId}
                >
                  <Icon className="size-4" />
                </div>
              ) : null;
            })}
          </div>
        )}

        <div className="mt-5">
          <Link href={`/rooms/${room._id || room.id}`}>
            <Button className="w-full h-11 rounded-xl bg-[#FA9500] hover:bg-[#e08600] text-white font-medium shadow-md shadow-[#FA9500]/20 flex items-center justify-center gap-2">
              View Details
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}