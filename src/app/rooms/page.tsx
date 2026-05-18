import RoomsCard from "@/components/card/RoomsCard";
import { Inbox } from "lucide-react";


const DUMMY_ROOMS = [
  {
    _id: '1',
    roomName: 'Premium Quiet Corner Lab',
    floor: '3rd Floor',
    capacity: '6 Persons',
    hourlyRate: '15.00',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    amenities: ['wifi', 'whiteboard', 'ac'],
    description: 'A silent oasis optimized for deep work, research, and collaborative coding sessions.',
  },
  {
    _id: '2',
    roomName: 'Silicon Valley Innovation Room',
    floor: '5th Floor',
    capacity: '12 Persons',
    hourlyRate: '25.00',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600',
    amenities: ['wifi', 'projector', 'ac', 'coffee'],
    description: 'Perfect for presentations, team hackathons, and high-energy brainstorming setups.',
  },
];

export default function AllRoomsPage() {


  
  const rooms = DUMMY_ROOMS; 

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
      
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">
            Explore All{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-indigo-500 to-sky-500">
              Study Spaces
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-2xl">
            Find and book the perfect environment tailored for your next big project, study marathon, or collaborative group session.
          </p>
        </div>

    
        {rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-3xl shadow-xl max-w-xl mx-auto mt-12 animate-fade-in">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-full text-purple-500 mb-4">
              <Inbox className="size-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">No rooms found</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              We couldn&apos;t find any study spaces available at the moment. Please check back later or add a new space!
            </p>
          </div>
        ) : (
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
             <RoomsCard key={room._id} room={room} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}