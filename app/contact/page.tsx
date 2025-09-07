"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const mailtoHref = `mailto:ammanilyas100@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;

  return (
    <main className="flex items-center justify-center min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <a href="/" className="inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Home
            </a>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-stone-300 mb-12">
            Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
          </p>

          <form className="space-y-6 text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-stone-300 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Let's connect!"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="text-right">
              <motion.a 
                href={mailtoHref}
                className="inline-flex items-center gap-2 bg-emerald-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-emerald-600 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.a>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

