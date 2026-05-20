'use client';

import React from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import {
  Wifi,
  Layers,
  Home,
  Users,
  DollarSign,
  Image as ImageIcon,
  FileText,
  Sparkles,
  Tv,
  AirVent,
  Coffee,
} from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { authClient } from '@/lib/auth-client';

const AVAILABLE_AMENITIES = [
  { id: 'wifi', label: 'High-speed Wi-Fi', icon: Wifi },
  { id: 'whiteboard', label: 'Whiteboard', icon: Sparkles },
  { id: 'projector', label: 'Projector', icon: Tv },
  { id: 'ac', label: 'Air Conditioning', icon: AirVent },
  { id: 'coffee', label: 'Coffee Machine', icon: Coffee },
];

const formSchema = z.object({
  roomName: z.string().min(1, 'Room name is required'),
  floor: z.string().min(1, 'Floor is required'),
  capacity: z.string().min(1, 'Capacity is required'),
  hourlyRate: z.string().min(1, 'Rate is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  description: z.string().min(1, 'Description is required'),
  amenities: z.array(z.string()),
  _id: z.string(),
});

interface RoomType {
  roomName: string;
  floor: string;
  capacity: string;
  hourlyRate: string;
  imageUrl: string;
  description: string;
  amenities: string[];
  _id: string;
}

export default function EditModal({
  isEditing,
  setIsEditing,
  room,
}: {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  room: RoomType;
}) {

 

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      roomName: room.roomName,
      floor: room.floor,
      capacity: room.capacity,
      hourlyRate: room.hourlyRate,
      imageUrl: room.imageUrl,
      description: room.description,
      amenities: room.amenities,
      _id: room._id,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
//  const {data:tokenData} = await authClient.token();

    const { _id, ...updateData } = formData;

    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${_id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Successfully updated:', data);
        setIsEditing(false);
      } else {
        console.error('Failed to update:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const imageUrl = useWatch({
    control: form.control,
    name: 'imageUrl',
  });

  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent className="md:max-w-4xl p-0 overflow-hidden rounded-[2rem] bg-white dark:bg-gray-950 border border-gray-200/60 dark:border-gray-800/80 shadow-2xl gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Space Configuration</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Left Side: Image */}
          <div className="relative w-full md:w-[38%] h-60 md:h-auto bg-gray-100 dark:bg-gray-900 shrink-0">
            <Image
              src={imageUrl || room.imageUrl}
              alt={room.roomName}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full h-full object-cover"
              priority
            />
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider uppercase w-fit mb-3 border border-white/20">
                Preview
              </span>
              <Controller
                control={form.control}
                name="roomName"
                render={({ field }) => <Input placeholder="Destination Name" {...field} />}
              />
            </div>
          </div>

          {/* Right Side: Form Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-950">
            {/* Header */}
            <div className="px-8 pt-8 pb-4 shrink-0">
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                Configuration Space
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                Modify attributes, layout pricing, and available accommodations.
              </p>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-4 custom-scrollbar">
              <form
                id="edit-room-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6"
              >
                <Controller
                  control={form.control}
                  name="roomName"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                        <Home className="size-3.5 text-purple-500" />
                        Space Name
                      </FieldLabel>
                      <Input
                        aria-invalid={fieldState.invalid}
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 transition-all text-sm font-medium"
                        placeholder="e.g. Premium Suite 101"
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
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                        <Layers className="size-3.5 text-purple-500" />
                        Floor / Location
                      </FieldLabel>
                      <Input
                        aria-invalid={fieldState.invalid}
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 transition-all text-sm font-medium"
                        placeholder="e.g. Level 3"
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
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                        <Users className="size-3.5 text-purple-500" />
                        Capacity (Students)
                      </FieldLabel>
                      <Input
                        aria-invalid={fieldState.invalid}
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 transition-all text-sm font-medium"
                        placeholder="e.g. 8"
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
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                        <DollarSign className="size-3.5 text-purple-500" />
                        Hourly Rate ($)
                      </FieldLabel>
                      <Input
                        aria-invalid={fieldState.invalid}
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 transition-all text-sm font-medium"
                        placeholder="e.g. 20"
                        type="number"
                        {...field}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="imageUrl"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                        <ImageIcon className="size-3.5 text-purple-500" />
                        Cover Image URL
                      </FieldLabel>
                      <Input
                        aria-invalid={fieldState.invalid}
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 transition-all text-sm font-medium"
                        placeholder="https://images.unsplash.com/..."
                        type="url"
                        {...field}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                        <FileText className="size-3.5 text-purple-500" />
                        Description
                      </FieldLabel>
                      <Input
                        aria-invalid={fieldState.invalid}
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 transition-all text-sm font-medium"
                        placeholder="Provide details about room utilities..."
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
                    <Field className="sm:col-span-2">
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 block">
                        Available Amenities
                      </FieldLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {AVAILABLE_AMENITIES.map((amenity) => {
                          const IconComponent = amenity.icon;
                          const isSelected = field.value?.includes(amenity.id);
                          return (
                            <button
                              key={amenity.id}
                              type="button"
                              onClick={() => {
                                const newValue = isSelected
                                  ? field.value.filter((id: string) => id !== amenity.id)
                                  : [...(field.value || []), amenity.id];
                                field.onChange(newValue);
                              }}
                              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left text-[13px] font-semibold transition-all duration-200 ease-in-out transform active:scale-[0.97] ${
                                isSelected
                                  ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-300 shadow-sm ring-1 ring-purple-500/20'
                                  : 'bg-white dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-purple-300 dark:hover:border-purple-700/50 hover:bg-gray-50 dark:hover:bg-gray-900'
                              }`}
                            >
                              <IconComponent
                                className={`size-4 shrink-0 transition-colors ${
                                  isSelected
                                    ? 'text-purple-600 dark:text-purple-400'
                                    : 'text-gray-400 group-hover:text-purple-400'
                                }`}
                              />
                              <span className="truncate">{amenity.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  )}
                />
              </form>
            </div>

            {/* Footer Action Buttons */}
            <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-950/50 shrink-0 flex items-center justify-end gap-3 rounded-b-[2rem]">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="h-10 rounded-xl px-5 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-300 text-sm font-bold transition-colors"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="edit-room-form"
                className="h-10 rounded-xl px-7 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20 text-sm font-bold transition-all active:scale-[0.97]"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
