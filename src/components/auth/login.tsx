"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("একটি সঠিক ইমেল ঠিকানা লিখুন"),
  password: z.string().min(8, "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে"),
});

const Login = () => {


  const router = useRouter();



  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
 const {  error } = await authClient.signIn.email({
    email: formData.email, 
    password: formData.password,
});
 if (!error) {
  router.push('/')
}

    
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
    provider: "google",
  });
  };
  
  return (
    <div className="flex relative min-h-screen bg-gray-50 dark:bg-gray-950 items-center justify-center p-4 overflow-hidden">
      <Image
        src="/hero.png" 
        alt="Modern library interior with people studying"
        fill
        priority
        className="object-cover object-center opacity-40 dark:opacity-20 pointer-events-none"
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--card-foreground) 5%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--card-foreground) 5%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 90%)",
        }}
      />

      <div className="relative w-full max-w-lg backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 px-8 py-10 shadow-2xl transition-all duration-300">
        <div className="relative flex flex-col items-center">
          <div className="h-12 w-12 rounded-xl bg-[#FA9500]/10 flex items-center justify-center border border-[#FA9500]/20 text-[#FA9500] font-bold text-xl tracking-wider shadow-inner">
            SN
          </div>
          <h2 className="mt-5 font-semibold text-2xl text-gray-900 dark:text-gray-50 tracking-tight">
            স্বাগতম ব্যাক!
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            আপনার অ্যাকাউন্টে লগ ইন করুন
          </p>

          <Button 
            onClick={handleGoogleLogin}
            variant="outline" 
            className="mt-8 w-full gap-3 h-11 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors font-medium rounded-xl"
          >
            <GoogleLogo />
            Google দিয়ে এগিয়ে যান
          </Button>

          <div className="my-6 flex w-full items-center justify-center">
            <Separator className="flex-1 bg-gray-200 dark:bg-gray-800" />
            <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">অথবা</span>
            <Separator className="flex-1 bg-gray-200 dark:bg-gray-800" />
          </div>

          <form
            className="w-full space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                  <FieldLabel className="text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide">ইমেল ঠিকানা</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full h-11 rounded-xl border-gray-200 dark:border-gray-800 focus-visible:ring-[#FA9500] bg-white/50 dark:bg-gray-950/50 transition-all"
                    placeholder="name@example.com"
                    type="email"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} className="text-xs font-medium text-red-500 mt-1" />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide">পাসওয়ার্ড</FieldLabel>
                    <Link
                      className="text-xs font-medium text-[#FA9500] hover:underline"
                      href="#"
                    >
                      পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                  </div>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full h-11 rounded-xl border-gray-200 dark:border-gray-800 focus-visible:ring-[#FA9500] bg-white/50 dark:bg-gray-950/50 transition-all"
                    placeholder="••••••••"
                    type="password"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} className="text-xs font-medium text-red-500 mt-1" />
                </Field>
              )}
            />
            <Button 
              className="w-full h-11 bg-[#FA9500] hover:bg-[#e08600] text-white font-medium rounded-xl shadow-lg shadow-[#FA9500]/20 transition-all active:scale-[0.98]" 
              type="submit"
            >
              লগ ইন করুন
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            অ্যাকাউন্ট নেই?
            <Link className="ml-1.5 font-medium text-[#FA9500] hover:underline" href="/register">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const GoogleLogo = () => (
  <svg
    className="inline-block shrink-0 align-sub text-inherit"
    fill="none"
    height="1.1em"
    id="icon-google"
    viewBox="0 0 16 16"
    width="1.1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
        fill="#4285F4"
      />
      <path
        d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
        fill="#34A853"
      />
      <path
        d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
        fill="#FBBC04"
      />
      <path
        d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect fill="white" height="16" width="15.6825" />
      </clipPath>
    </defs>
  </svg>
);

export default Login;