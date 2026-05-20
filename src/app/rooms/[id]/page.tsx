import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RoomDetailsCard from '@/components/rooms/RoomDetailsCard';
import { headers } from 'next/headers';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const currentHeaders = await headers();
  let room = null;

  try {
    const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': currentHeaders.get('cookie') || '',
      },
      cache: 'no-store',
    });

    if (res.ok) {
      room = await res.json();
    }
  } catch (error) {
    console.error('Error fetching room details:', error);
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Room not found
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
          The study space you are looking for does not exist or may have been removed.
        </p>

        <Link
          href="/rooms"
          className="mt-6 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#FA9500] transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="size-4 text-[#FA9500]" />
          Back to Rooms
        </Link>
      </div>
    );
  }

  return <RoomDetailsCard room={room} />;
}