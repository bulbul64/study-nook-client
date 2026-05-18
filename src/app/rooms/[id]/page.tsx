import React from 'react';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RoomDetailsClient from '@/components/rooms/RoomDetailsCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomDetailsPage({ params }: PageProps) {
  const { id } = await params;
  let room = null;

  try {
    const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
      cache: 'no-store', 
    });
    
    if (res.ok) {
      room = await res.json();
    }
  } catch (error) {
    console.error("Error fetching room details:", error);
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Room not found!</h2>
        <p className="text-gray-500 mt-2">The study space you are looking for does not exist or was removed.</p>
        <Link href="/rooms" className="mt-5 text-sm text-purple-600 font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft className="size-4" /> Back to Rooms
        </Link>
      </div>
    );
  }

  return <RoomDetailsClient room={room} />;
}