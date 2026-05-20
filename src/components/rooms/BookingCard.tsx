'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {  DollarSign, Users, XCircle,  MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BookingCard({ booking }: { booking: any }) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);

const handleCancel = async () => {
  if (!window.confirm("Are you sure you want to cancel this booking?")) return;
  setIsCancelling(true);

  try {
 
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/bookings/${booking._id}/cancel`, {
      method: 'PATCH', // DELETE পরিবর্তন করে PATCH করা হয়েছে
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        noCache: 'no-cache',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
    });

    if (res.ok) {
      toast.success('Booking cancelled successfully!');
      router.refresh();
    } else {
      
      const data = await res.json();
      toast.error(data.message || 'Failed to cancel the booking.');
    }
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong while cancelling.');
  }
  setIsCancelling(false);
};

  return (
    <div className="group relative flex flex-col md:flex-row bg-white/70 dark:bg-[#1a1c23]/70 backdrop-blur-xl border border-gray-200/50 dark:border-white/5 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
      {/* Image Section */}
      <div className="relative w-full md:w-80 h-64 md:h-auto shrink-0 overflow-hidden">
        <Image src={booking.imageUrl} alt={booking.roomName} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${
            booking.status === 'confirmed' ? 'bg-[#FA9500]/20 text-[#FA9500] border-[#FA9500]/30' : 'bg-red-500/20 text-red-500 border-red-500/30'
          }`}>
            {booking.status}
          </Badge>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 p-8 flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{booking.roomName}</h2>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Users className="size-4" /> {booking.capacity} Seats</span>
              <span className="flex items-center gap-1.5"><MapPin className="size-4" /> StudyNook</span>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-[#050505] px-6 py-3 rounded-2xl border border-gray-200 dark:border-white/10">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Total Cost</p>
            <p className="text-xl font-black text-[#FA9500] flex items-center"><DollarSign className="size-4" />{booking.totalCost}</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#050505] p-4 rounded-2xl border border-gray-100 dark:border-white/5">
            <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Date</p>
            <p className="text-sm font-bold">{booking.date}</p>
          </div>
          <div className="bg-white dark:bg-[#050505] p-4 rounded-2xl border border-gray-100 dark:border-white/5">
            <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Time</p>
            <p className="text-sm font-bold">{booking.startTime} - {booking.endTime}</p>
          </div>
        </div>

        {/* Action */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex justify-end">
          {booking.status !== 'cancelled' ? (
            <Button onClick={handleCancel} variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 font-black uppercase tracking-widest text-[11px] h-12 rounded-2xl">
              <XCircle className="size-4 mr-2" /> {isCancelling ? 'Processing...' : 'Cancel'}
            </Button>
          ) : (
            <span className="text-red-400 text-[11px] font-black uppercase tracking-widest px-4 py-2 bg-red-50 dark:bg-red-950/20 rounded-xl">Cancelled</span>
          )}
        </div>
      </div>
    </div>
  );
}