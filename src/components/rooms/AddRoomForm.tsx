'use client';

import React from 'react';
import {
  Building,
  Layers,
  Users,
  DollarSign,
  Image as ImageIcon,
  Wifi,
  Tv,
  AirVent,
  Coffee,
  Sparkles,
  Plus,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
// import { authClient, useSession } from '@/lib/auth-client';
// import { redirect } from 'next/navigation';
// import Link from 'next/link';

const AVAILABLE_AMENITIES = [
  { id: 'wifi', label: 'High-speed Wi-Fi', icon: Wifi },
  { id: 'whiteboard', label: 'Whiteboard', icon: Sparkles },
  { id: 'projector', label: 'Projector', icon: Tv },
  { id: 'ac', label: 'Air Conditioning', icon: AirVent },
  { id: 'coffee', label: 'Coffee Machine', icon: Coffee },
];
const formSchema = z.object({
  roomName: z.string().min(1, 'Room name is required'),
  floor: z.string().min(1, 'Floor number is required'),
  capacity: z.string().min(1, 'Capacity is required'),
  hourlyRate: z.string().min(1, 'Hourly rate is required'),
  imageUrl: z.string().url('Invalid image URL'),
  amenities: z.array(z.string()), 
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export default function AddRoomForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      roomName: '',
      floor: '',
      capacity: '',
      hourlyRate: '',
      imageUrl: '',
      amenities: [],
      description: '',
    },
    resolver: zodResolver(formSchema),
  });
  
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const payload = {
      ...formData,
      userId,
    };

    // const { data: tokenData } = await authClient.token();

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${tokenData?.token}`,
        noCache: 'no-cache',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Room added successfully');
          form.reset();
        } else {
          toast.error('Failed to add room');
        }
      })
      .catch(() => {
        toast.error('Failed to add room');
      });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 relative">
      
      {/* Background Ambient Glow (matches Hero section theme) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-125 -z-10 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-linear-to-br from-[#FA9500]/30 to-transparent blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-linear-to-tl from-orange-400/20 to-transparent blur-[100px]" />
      </div>

      <div className="relative bg-white/80 dark:bg-[#1a1c23]/80 backdrop-blur-2xl border border-gray-200/60 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2rem] p-8 sm:p-12 overflow-hidden">
        
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left border-b border-gray-200/50 dark:border-white/10 pb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] uppercase text-gray-900 dark:text-white leading-tight">
            Create a New <span className="text-[#FA9500] block sm:inline">Study Space</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
            Fill in the details below to list your room for students and professionals.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column - General Info */}
            <div className="space-y-6">
              <Controller
                control={form.control}
                name="roomName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                      <Building className="size-3.5 text-[#FA9500]" /> Room Name
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      className="w-full h-14 rounded-2xl px-5 border-gray-200/80 dark:border-white/10 bg-white/50 dark:bg-[#131418]/50 text-base font-semibold text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#FA9500]/30 focus-visible:border-[#FA9500] transition-all shadow-sm"
                      placeholder="e.g., Quiet Corner Lab"
                      type="text"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                <Controller
                  control={form.control}
                  name="floor"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                        <Layers className="size-3.5 text-[#FA9500]" /> Floor
                      </FieldLabel>
                      <Input
                        aria-invalid={fieldState.invalid}
                        className="w-full h-14 rounded-2xl px-5 border-gray-200/80 dark:border-white/10 bg-white/50 dark:bg-[#131418]/50 text-base font-semibold text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#FA9500]/30 focus-visible:border-[#FA9500] transition-all shadow-sm"
                        placeholder="e.g., 3rd Floor"
                        type="text"
                        {...field}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="capacity"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                        <Users className="size-3.5 text-[#FA9500]" /> Capacity
                      </FieldLabel>
                      <Input
                        aria-invalid={fieldState.invalid}
                        className="w-full h-14 rounded-2xl px-5 border-gray-200/80 dark:border-white/10 bg-white/50 dark:bg-[#131418]/50 text-base font-semibold text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#FA9500]/30 focus-visible:border-[#FA9500] transition-all shadow-sm"
                        placeholder="e.g., 6"
                        type="number"
                        {...field}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="hourlyRate"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                      <DollarSign className="size-3.5 text-[#FA9500]" /> Hourly Rate
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        aria-invalid={fieldState.invalid}
                        className="w-full h-14 rounded-2xl pl-10 pr-5 border-gray-200/80 dark:border-white/10 bg-white/50 dark:bg-[#131418]/50 text-base font-semibold text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#FA9500]/30 focus-visible:border-[#FA9500] transition-all shadow-sm"
                        placeholder="0.00"
                        type="number"
                        {...field}
                      />
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    </div>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            {/* Right Column - Media & Amenities */}
            <div className="space-y-6">
              <Controller
                control={form.control}
                name="imageUrl"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                      <ImageIcon className="size-3.5 text-[#FA9500]" /> Cover Image URL
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      className="w-full h-14 rounded-2xl px-5 border-gray-200/80 dark:border-white/10 bg-white/50 dark:bg-[#131418]/50 text-base font-semibold text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#FA9500]/30 focus-visible:border-[#FA9500] transition-all shadow-sm"
                      placeholder="https://example.com/room.jpg"
                      type="url"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  
                  <Field>
                    <FieldLabel className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 block">
                      Select Amenities
                    </FieldLabel>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {AVAILABLE_AMENITIES.map((amenity) => {
                        const Icon = amenity.icon;
                        const isSelected = field.value?.includes(amenity.id);

                        return (
                          <button
                            key={amenity.id}
                            type="button"
                            onClick={() => {
                              const newValue = isSelected
                                ? field.value.filter((i: string) => i !== amenity.id)
                                : [...(field.value || []), amenity.id];
                              field.onChange(newValue);
                            }}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                              isSelected
                                ? 'bg-[#FA9500]/10 border-[#FA9500]/50 text-[#FA9500] shadow-[0_0_15px_rgba(250,149,0,0.1)]'
                                : 'bg-white/40 dark:bg-[#131418]/40 border-gray-200/80 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20'
                            }`}
                          >
                            <Icon
                              className={`size-4 transition-colors ${isSelected ? 'text-[#FA9500]' : 'text-gray-400'}`}
                            />
                            {amenity.label}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                )}
              />
            </div>

            {/* Full Width - Description */}
            <div className="lg:col-span-2 space-y-6">
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                      <FileText className="size-3.5 text-[#FA9500]" /> Room Description
                    </FieldLabel>

                    <textarea
                      aria-invalid={fieldState.invalid}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/50 dark:bg-[#131418]/50 text-base font-semibold text-gray-900 dark:text-white resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA9500]/30 focus-visible:border-[#FA9500] transition-all shadow-sm"
                      rows={5}
                      placeholder="Describe the room's atmosphere, rules, and perfect use cases..."
                      {...field}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200/50 dark:border-white/10 flex justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto h-14 px-10 rounded-full bg-[#FA9500] hover:bg-[#e08600] text-white font-black uppercase tracking-wider text-sm shadow-xl shadow-[#FA9500]/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Plus className="size-5 mr-2" /> List Study Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}