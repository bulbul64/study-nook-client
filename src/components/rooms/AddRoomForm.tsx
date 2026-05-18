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
  amenities: z.array(z.string()).default([]),
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

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    fetch('http://localhost:5000/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Room added successfully');
        } else {
          toast.error('Failed to add room');
        }
      })
      .catch(() => {
        toast.error('Failed to add room');
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800/80 shadow-2xl rounded-2xl p-6 sm:p-10 overflow-hidden">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50 sm:text-4xl">
            Create a New <span className="text-[#FA9500]">Study Space</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Fill in the details below to list your room for students.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <Controller
                control={form.control}
                name="roomName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                      <Building className="size-4 text-[#FA9500]" /> ROOM NAME
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      className="w-full h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 text-sm focus-visible:ring-[#FA9500]"
                      placeholder="e.g., Quiet Corner Lab"
                      type="text"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="floor"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                      <Layers className="size-4 text-[#FA9500]" /> FLOOR
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      className="w-full h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 text-sm focus-visible:ring-[#FA9500]"
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
                    <FieldLabel className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                      <Users className="size-4 text-[#FA9500]" /> CAPACITY
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      className="w-full h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 text-sm focus-visible:ring-[#FA9500]"
                      placeholder="e.g., 6 Persons"
                      type="number"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="hourlyRate"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                      <DollarSign className="size-4 text-[#FA9500]" /> HOURLY RATE
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      className="w-full h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 text-sm focus-visible:ring-[#FA9500]"
                      placeholder="0.00"
                      type="number"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <div className="space-y-5">
              <Controller
                control={form.control}
                name="imageUrl"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                      <ImageIcon className="size-4 text-[#FA9500]" /> IMAGE
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      className="w-full h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 text-sm focus-visible:ring-[#FA9500]"
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
                    <FieldLabel className="text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-2 block">
                      SELECT AMENITIES
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
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                              isSelected
                                ? 'bg-[#FA9500]/10 border-[#FA9500]/30 text-[#FA9500]'
                                : 'bg-white/40 dark:bg-gray-950/40 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                            }`}
                          >
                            <Icon className={`size-4 ${isSelected ? 'text-[#FA9500]' : 'text-gray-400'}`} />
                            {amenity.label}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                )}
              />
            </div>

            <div className="md:col-span-2 space-y-5">
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                      <FileText className="size-4 text-[#FA9500]" /> DESCRIPTION
                    </FieldLabel>

                    <textarea
                      aria-invalid={fieldState.invalid}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 text-sm resize-none focus-visible:ring-[#FA9500]"
                      rows={4}
                      placeholder="Tell students about the room..."
                      {...field}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full sm:w-auto h-11 px-8 rounded-xl bg-[#FA9500] hover:bg-[#e08600] text-white font-medium shadow-lg shadow-[#FA9500]/20"
          >
            <Plus className="size-5" /> Create Study Room
          </Button>
        </form>
      </div>
    </div>
  );
}