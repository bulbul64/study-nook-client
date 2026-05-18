import AddRoomForm from '@/components/rooms/AddRoomForm';
import Image from 'next/image';
import React from 'react';

export default function AddRoom() {
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
