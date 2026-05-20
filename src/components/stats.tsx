import {
  FastForward,
  HeartHandshake,
  MonitorSmartphone,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Stats() {
  return (
    <div className="bg-gray-50 dark:bg-[#0b0f19] py-24 border-t border-b border-gray-100 dark:border-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#ee6923]/20 bg-white dark:bg-[#161b26] p-7 py-8 shadow-sm">
            <MonitorSmartphone className="mb-6 h-10 w-10 stroke-[1.75px] text-[#ee6923]" />
            <span className="block font-black text-5xl tracking-tight text-gray-900 dark:text-white">
              98%
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg font-medium">
              Booking completion rate
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#ee6923]/20 bg-white dark:bg-[#161b26] p-7 py-8 shadow-sm">
            <FastForward className="mb-6 h-10 w-10 stroke-[1.75px] text-[#ee6923]" />
            <span className="block font-black text-5xl tracking-tight text-gray-900 dark:text-white">
              250+
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg font-medium">
              Available study rooms
            </p>
          </div>

          {/* Card 3 (Large) */}
          <div className="row-span-2 flex flex-col overflow-hidden rounded-2xl border border-[#ee6923]/20 bg-white dark:bg-[#161b26] p-7 py-8 pb-0 shadow-sm">
            <HeartHandshake className="mb-6 h-10 w-10 stroke-[1.75px] text-[#ee6923]" />
            <span className="block font-black text-5xl tracking-tight text-gray-900 dark:text-white">
              15K+
            </span>
            <p className="mt-4 mb-2 text-gray-600 dark:text-gray-400 text-lg font-medium">
              Successful study sessions
            </p>
            <PersonalGoalsIllustration className="mt-auto -mb-1 h-auto w-full max-w-[260px] self-center" />
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-[#ee6923]/20 bg-white dark:bg-[#161b26] p-7 py-8 shadow-sm">
            <TrendingUp className="mb-6 h-10 w-10 stroke-[1.75px] text-[#ee6923]" />
            <span className="block font-black text-5xl tracking-tight text-gray-900 dark:text-white">
              45%
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg font-medium">
              Growth in bookings (MoM)
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl border border-[#ee6923]/20 bg-white dark:bg-[#161b26] p-7 py-8 shadow-sm">
            <Users className="mb-6 h-10 w-10 stroke-[1.75px] text-[#ee6923]" />
            <span className="block font-black text-5xl tracking-tight text-gray-900 dark:text-white">
              8K+
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg font-medium">
              Active library members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PersonalGoalsIllustration = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g>
      <path
        className="fill-[#ee6923]/20"
        d="M378.15,389.37C362.4,393.1,350.38,408.8,350.88,425c-10.09-11.12-28.54-13.39-41-5s-17.43,26.27-11,39.84c-14.91-11.64-39.16-8.41-50.51,6.72a31.53,31.53,0,0,0-47.51-18.25c-2.69-16.87-16.31-31.47-33-35.33s-35.29,3.28-45.12,17.25A38,38,0,0,0,63,438.85l10.11,3.26a55.43,55.43,0,0,1,41.18,34.57,43,43,0,0,1,69.85,9.12l77.85,0c19.38-.16,34.17.88,52.09,0,7.08-24.93,39.67-47.09,64.16-38.63a54.67,54.67,0,0,1,40-38.68C411.3,394.07,393.73,385.67,378.15,389.37Z"
      /> npm run build
    </g>
  </svg>
);