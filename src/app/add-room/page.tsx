import AddRoomForm from '@/components/rooms/AddRoomForm';
import { auth } from '@/lib/auth';
import { ArrowLeft } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function AddRoom() {
  const session = await auth.api.getSession({
    headers: await headers() 
})

const user = session?.user;



   if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You are not logged in!</h2>
        <Link href="/login" className="mt-5 text-sm text-purple-600 font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft className="size-4" /> Back to Login
        </Link>
      </div>
    );
  }





  return (
    <div className="relative min-h-screen flex items-center justify-center">
      
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero.png" 
          alt="Modern library interior with people studying"
          fill
          priority
          className="object-cover object-center"
        />
  
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-950/85 backdrop-blur-[3px]" />
      </div>
      <AddRoomForm />
    </div>
  );
}
