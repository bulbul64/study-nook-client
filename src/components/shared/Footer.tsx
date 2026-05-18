'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Logo from '../logo';
import { BsInstagram } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';
import { FaFacebook } from 'react-icons/fa';

const footerLinks = [
  { title: 'Home', href: '/' },
  { title: 'Rooms', href: '/rooms' },
  { title: 'About', href: '/about' },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50/60 dark:bg-gray-950/60 border-t border-gray-200/80 dark:border-gray-800/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">

          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Find and book the perfect study environment for focused work and group collaboration.
            </p>
          </div>

          <div>
            <h6 className="text-sm font-bold tracking-wider text-gray-900 dark:text-gray-50 uppercase mb-4">
              Useful Links
            </h6>
            <ul className="space-y-3">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FA9500] transition-colors"
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-sm font-bold tracking-wider text-gray-900 dark:text-gray-50 uppercase mb-4">
              Contact Information
            </h6>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-[#FA9500]" />
                <a
                  href="mailto:info@studynook.com"
                  className="hover:text-[#FA9500] transition-colors"
                >
                  info@studynook.com
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-[#FA9500]" />
                <a
                  href="tel:+880123456789"
                  className="hover:text-[#FA9500] transition-colors"
                >
                  +880 1234-567890
                </a>
              </li>
            </ul>
          </div>

        </div>

        <Separator className="my-8 bg-gray-200/80 dark:bg-gray-800/80" />

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-y-4">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()}{' '}
            <Link href="/" className="hover:text-[#FA9500] font-medium transition-colors">
              StudyNook
            </Link>
            . All rights reserved.
          </span>

          <div className="flex items-center gap-5 text-gray-500 dark:text-gray-400">
            <Link href="#" className="hover:text-[#FA9500] transition-colors">
              <FaFacebook className="size-5" />
            </Link>

            <Link href="#" className="hover:text-[#FA9500] transition-colors">
              <svg viewBox="0 0 24 24" className="size-4.5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
              </svg>
            </Link>

            <Link href="#" className="hover:text-[#FA9500] transition-colors">
              <LiaLinkedin className="size-5" />
            </Link>

            <Link href="#" className="hover:text-[#FA9500] transition-colors">
              <BsInstagram className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;