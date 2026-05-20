import React from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  XCircle,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingCard({ booking }: { booking: any }) {
  return (
    <div className="group relative flex flex-col md:flex-row bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative w-full md:w-72 h-60 md:h-auto shrink-0 overflow-hidden">
        <Image
          src={booking.imageUrl}
          alt={booking.roomName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-4 left-4">
          <Badge
            className={`px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md flex items-center gap-1.5 ${
              booking.status === 'confirmed'
                ? 'bg-white/90 text-[#FA9500] border-[#FA9500]/30 dark:bg-gray-900/90'
                : 'bg-white/90 text-red-500 border-red-500/20 dark:bg-gray-900/90'
            }`}
          >
            {booking.status === 'confirmed' ? (
              <CheckCircle2 className="size-4" />
            ) : (
              <XCircle className="size-4" />
            )}
            <span className="uppercase tracking-wider">{booking.status}</span>
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-2">
                {booking.roomName}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1 rounded-md">
                  <Users className="size-4 text-[#FA9500]" />
                  Capacity: {booking.capacity}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1 rounded-md">
                  <MapPin className="size-4 text-[#FA9500]" />
                  StudyNook Library
                </span>
              </div>
            </div>

            <div className="shrink-0 text-left sm:text-right bg-[#FA9500]/10 dark:bg-[#FA9500]/5 px-4 py-3 rounded-2xl border border-[#FA9500]/20">
              <p className="text-[10px] text-[#FA9500] uppercase font-bold tracking-wider mb-1">
                Total Cost
              </p>
              <p className="text-2xl font-black text-[#FA9500] flex items-center sm:justify-end">
                <DollarSign className="size-5 -mr-1" />
                {booking.totalCost}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/50">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-white dark:bg-gray-900 shadow-sm rounded-xl text-[#FA9500]">
                <Calendar className="size-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Date
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-0.5">
                  {booking.date}
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px bg-gray-200 dark:bg-gray-700" />

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-white dark:bg-gray-900 shadow-sm rounded-xl text-[#FA9500]">
                <Clock className="size-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Time Slot
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-0.5">
                  {booking.startTime} - {booking.endTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            variant="outline"
            className="rounded-xl px-6 border-gray-200 dark:border-gray-800 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-500/10 dark:hover:border-red-500/30 transition-all font-bold h-11"
          >
            <XCircle className="size-4 mr-2" />
            Cancel Booking
          </Button>
        </div>
      </div>
    </div>
  );
}