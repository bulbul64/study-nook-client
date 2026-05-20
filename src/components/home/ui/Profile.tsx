'use client';

import type { ReactElement } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LucideIcon,
  CircleUserRound,
  CreditCard,
  ReceiptText,
  Settings,
  LogOut,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { User } from '@/types/room';

type Props = {
  trigger: ReactElement;
  defaultOpen?: boolean;
  handleSignOut: () => void;
  align?: 'start' | 'center' | 'end';
};

type MenuItem = {
  label: string;
  icon: LucideIcon;
  destructive?: boolean;
};

const PROFILE_ITEMS: MenuItem[] = [
  { label: 'My Profile', icon: CircleUserRound },
  { label: 'My Subscription', icon: CreditCard },
  { label: 'My Invoice', icon: ReceiptText },
];

const SETTINGS_ITEMS: MenuItem[] = [{ label: 'Account Settings', icon: Settings }];

const LOGOUT_ITEM: MenuItem = {
  label: 'Signout',
  icon: LogOut,
  destructive: true,
};

const itemClass =
  'p-2.5 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 rounded-xl cursor-pointer gap-3 transition-colors duration-200 focus:bg-[#FA9500]/10 focus:text-[#FA9500] dark:focus:bg-[#FA9500]/15 dark:focus:text-[#FA9500]';


  const Dropdown = ({ trigger, defaultOpen, handleSignOut, align = 'end' }: Props) => {
    const { data: session } = authClient.useSession();
  const user = session?.user as User;

  const { name, email, image } = user;

  // console.log(user)

  return (
    <div className="">
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger className="cursor-pointer focus:outline-none">
          {trigger}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align={align}
          className="w-64 rounded-2xl p-2 bg-white/90 dark:bg-[#1a1c23]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-xl data-open:slide-in-from-bottom-20! data-closed:slide-out-to-bottom-20 data-open:fade-in-0 data-closed:fade-out-0 data-closed:zoom-out-100 duration-400"
        >
          <DropdownMenuGroup>
            {/* User Info Section */}
            <DropdownMenuLabel className="flex items-center gap-3 px-3 py-3 select-none">
              <div className="relative">
                <Avatar className="size-10 border border-gray-200/50 dark:border-white/10 shadow-inner">
                  <AvatarImage src={image as string} alt={name} />
                  <AvatarFallback className="font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                    {' '}
                    {name
                      ?.split(' ')
                      .map((word: string) => word[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}{' '}
                  </AvatarFallback>
                </Avatar>
                {/* Active Status Badge */}
                <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-[#1a1c23]" />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-gray-900 dark:text-white text-sm font-black tracking-tight truncate">
                  {name}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs font-medium truncate mt-0.5">
                  {email}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-gray-200/60 dark:bg-white/10 my-1.5" />

            {/* Main Links */}
            {PROFILE_ITEMS.map(({ label, icon: Icon }) => (
              <DropdownMenuItem key={label} className={itemClass}>
                <Icon size={16} className="text-[#FA9500]/80" />
                <span>{label}</span>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator className="bg-gray-200/60 dark:bg-white/10 my-1.5" />

            {/* Settings */}
            <DropdownMenuGroup>
              {SETTINGS_ITEMS.map(({ label, icon: Icon }) => (
                <DropdownMenuItem key={label} className={itemClass}>
                  <Icon size={16} className="text-[#FA9500]/80" />
                  <span>{label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-gray-200/60 dark:bg-white/10 my-1.5" />

            {/* Logout - Destructive with precise theme control */}
            <DropdownMenuItem
              onClick={handleSignOut}
              variant="destructive"
              className="p-2.5 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 rounded-xl cursor-pointer gap-3 transition-colors duration-200 focus:bg-red-50 dark:focus:bg-red-950/30"
            >
              <LOGOUT_ITEM.icon size={16} />
              <span>{LOGOUT_ITEM.label}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfileDropdown = ({ handleSignOut }: any) => {
  const { data: session } = authClient.useSession();
  const user = session?.user as User;
  const { name, image } = user;
  return (
    <Dropdown
      handleSignOut={handleSignOut}
      align="end"
      trigger={
        <div className="rounded-full ring-2 ring-transparent hover:ring-[#FA9500]/50 active:scale-95 transition-all duration-300 p-0.5">
          <Avatar className="size-9 cursor-pointer shadow-sm border border-gray-200/50 dark:border-white/10">
            <AvatarImage src={image as string} alt={name} />
            <AvatarFallback className="font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              {name
                ?.split(' ')
                .map((word: string) => word[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      }
    />
  );
};

export default ProfileDropdown;
