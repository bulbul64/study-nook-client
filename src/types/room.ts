export type Room = {
  _id: string;
  roomName: string;
  floor: string;
  capacity: string;
  hourlyRate: string;
  imageUrl: string;
  amenities: string[];
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};