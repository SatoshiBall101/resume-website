"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default function ContactPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    // This will open the user's default email client
    window.location.href = `mailto:ammanilyas100@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };
  
  return (
    <main className="flex items-center bg-gray-950 justify-center min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-stone-300 mb-12">
            Have a question or want to work together? Fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>

          <form className="space-y-6 text-left" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-stone-300 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                placeholder="Let's connect!"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <div className="text-right">
              <motion.button 
                type="submit"
                className="inline-flex items-center gap-2 bg-violet-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-violet-600 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

