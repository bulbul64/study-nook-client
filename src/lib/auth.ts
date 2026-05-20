import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';

const client = new MongoClient(process.env.MONGODB_URI || '');
const db = client.db();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },

  database: mongodbAdapter(db, {
    client,
  }),

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },

  // === এই অংশটুকু নতুন যুক্ত করা হয়েছে ===
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none", // ক্রস-ডোমেইন কুকি এলাও করার জন্য
      secure: true,     // HTTPS-এর মাধ্যমে কুকি পাস করার জন্য
    }
  },
  // ===================================

  plugins: [jwt()],
});