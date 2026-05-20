'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ALL_AMENITIES = [
  { label: 'WiFi', value: 'wifi' },
  { label: 'AC', value: 'ac' },
  { label: 'Whiteboard', value: 'whiteboard' },
  { label: 'Projector', value: 'projector' },
  { label: 'Sound System', value: 'sound system' },
];

export default function RoomFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get('amenities')?.split(',') || []
  );
 
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '200');


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (search) params.set('search', search);
      else params.delete('search');

      if (maxPrice && maxPrice !== '200') params.set('maxPrice', maxPrice);
      else params.delete('maxPrice');

      router.push(`?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, maxPrice]);

  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedAmenities.length > 0) params.set('amenities', selectedAmenities.join(','));
    else params.delete('amenities');

    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedAmenities]);

  const handleAmenityChange = (amenityValue: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityValue) ? prev.filter((a) => a !== amenityValue) : [...prev, amenityValue]
    );
  };

  return (
    <div className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-6 mb-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        <div className="relative">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Search Room</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Type room name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl bg-white/80 dark:bg-gray-950/80"
            />
          </div>
        </div>

   
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Max Price</label>
            <span className="text-sm font-bold text-[#FA9500]">${maxPrice}/hr</span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#FA9500]"
          />
        </div>

        {/* ৩. Amenities */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {ALL_AMENITIES.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity.value);
              return (
                <button
                  key={amenity.value}
                  type="button"
                  onClick={() => handleAmenityChange(amenity.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-[#FA9500] text-white border-[#FA9500]'
                      : 'bg-white/40 dark:bg-gray-950/40 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-[#FA9500]/50'
                  }`}
                >
                  {amenity.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}