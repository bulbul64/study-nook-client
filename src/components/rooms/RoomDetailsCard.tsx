'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Users,
  Layers,
  DollarSign,
  Wifi,
  Tv,
  Wind,
  Coffee,
  ArrowLeft,
  Edit3,
  BookmarkCheck,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Image from 'next/image';
import EditModal from './EditModal';
import { AlertDialogDestructive } from './AlertDialogAction ';
import { authClient, useSession } from '@/lib/auth-client';




const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  projector: Tv,
  whiteboard: Layers,
  ac: Wind,
  coffee: Coffee,
};

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

interface RoomType {
  _id: string;
  roomName: string;
  floor: string;
  capacity: string;
  hourlyRate: string;
  imageUrl: string;
  amenities: string[];
  description: string;
  bookingCount?: number;
  ownerId?: string;
}

export default function RoomDetailsClient({ room }: { room: RoomType }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
 const {data: session} = useSession();
 const user = session?.user
//  console.log(user)



  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Room not found!</h2>
        <Link href="/rooms" className="mt-5 text-sm text-purple-600 font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft className="size-4" /> Back to Rooms
        </Link>
      </div>
    );
  }

  const bookingCount = room.bookingCount || 0;

  
  const startHour = startTime ? parseInt(startTime.split(':')[0]) : 0;
  const endHour = endTime ? parseInt(endTime.split(':')[0]) : 0;
  const totalHours = endHour - startHour;
  const totalCost = totalHours > 0 ? totalHours * Number(room.hourlyRate) : 0;











  const handleDelete = async () => {
     const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${room._id}`, { method: 'DELETE' ,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        noCache: 'no-cache',
        // Authorization: `Bearer ${tokenData?.token}`,
      },
      });
      if (res.ok) {
        toast.success('Room deleted successfully!');
        router.push('/rooms');
        router.refresh();
      } else {
        toast.error('Failed to delete the room.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while deleting.');
    } 
  };


  const handleBooking = async () => {
    if (!bookingDate || !startTime || !endTime) {
      toast.error('Please fill all booking fields!');
      return;
    }

    if (totalHours <= 0) {
      toast.error('End Time must be after Start Time!');
      return;
    }


    const bookingData = {
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      userImage: user?.image,
      roomId: room._id,
      roomName: room.roomName,
      capacity: room.capacity,
      imageUrl: room.imageUrl,
      date: bookingDate,
      startTime,
      endTime,
      totalCost, 
    };
    
    console.log(bookingData)

    try {
     
      const res = await fetch('http://localhost:5000/api/rooms/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success('Room booked successfully!');
        setBookingDate('');
        setStartTime('');
        setEndTime('');
        router.refresh();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Booking failed. Slot might be unavailable.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    }
  };

  
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <EditModal room={room} isEditing={isEditing} setIsEditing={setIsEditing} />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-100 bg-radial from-purple-500/10 via-indigo-500/5 to-transparent pointer-events-none blur-3xl dark:from-purple-500/15" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <Link href="/rooms" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> Back to all spaces
            </Link>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 flex items-center gap-2 font-semibold hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400">
                <Edit3 className="size-4 text-blue-500" /> Edit Space
              </Button>
              <AlertDialogDestructive handleDelete={handleDelete} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Side: Room Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-gray-200/60 dark:border-gray-800/60 shadow-xl bg-gray-100 dark:bg-gray-900">
                <Image fill src={room.imageUrl} alt={room.roomName} className="w-full h-full object-cover" priority />
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">{room.roomName}</h1>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{room.description}</p>
              </div>

              <div className="border-t border-gray-200/60 dark:border-gray-800/60 pt-6">
                <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-4">Available Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {room.amenities?.map((amenity: string) => {
                    const Icon = amenityIcons[amenity.toLowerCase()] || Wifi;
                    return (
                      <Badge key={amenity} variant="secondary" className="px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/60 shadow-sm flex items-center gap-2.5 capitalize text-xs font-semibold text-gray-700 dark:text-gray-300">
                        <Icon className="size-4 text-purple-500" /> {amenity}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>

          
            <div className="lg:col-span-1">
              <div className="sticky top-28 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/80 dark:border-gray-800/80 rounded-3xl shadow-xl space-y-6">
                <div className="flex items-baseline justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Price per hour</span>
                  <div className="flex items-center text-gray-950 dark:text-white">
                    <DollarSign className="size-5 text-purple-500 -mr-1" />
                    <span className="text-3xl font-black">{room.hourlyRate}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-normal ml-1">/ hr</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/70 dark:border-purple-900/30 rounded-2xl">
                  <div className="p-2.5 bg-purple-600 text-white rounded-xl shadow-md shadow-purple-500/10">
                    <BookmarkCheck className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Popularity</p>
                    <p className="text-sm font-bold text-gray-950 dark:text-white">Booked <span className="text-purple-600 dark:text-purple-400 font-extrabold text-base">{bookingCount}</span> times</p>
                  </div>
                </div>

              
                <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 block">Select Date</label>
                    <Input type="date" min={today} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="rounded-xl" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 block">Start Time</label>
                      <select 
                        value={startTime} 
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/50"
                      >
                        <option value="">Select</option>
                        {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 block">End Time</label>
                      <select 
                        value={endTime} 
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/50"
                      >
                        <option value="">Select</option>
                        {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                    </div>
                  </div>

                
                  {totalCost > 0 && (
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                      <span className="text-xs font-bold text-gray-500 uppercase">Total Cost ({totalHours} {totalHours === 1 ? 'hr' : 'hrs'})</span>
                      <span className="text-sm font-black text-purple-600 dark:text-purple-400">${totalCost}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-500"><Layers className="size-4" /></div>
                    <span>Location: <span className="font-semibold text-gray-950 dark:text-white">{room.floor}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-500"><Users className="size-4" /></div>
                    <span>Capacity: <span className="font-semibold text-gray-950 dark:text-white">{room.capacity} Students</span></span>
                  </div>
                </div>

               
                <Button onClick={handleBooking} className="w-full py-6 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/10">
                  <Calendar className="size-4" /> Book This Space Now
                </Button>

                <p className="text-[11px] text-center text-gray-400 dark:text-gray-500">Secured and clean study environment guarantee.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}