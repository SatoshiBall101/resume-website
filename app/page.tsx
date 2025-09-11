"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// --- SVG ICONS ---
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

// --- Reusable Components ---
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/#hero" className="text-xl font-bold text-white">AC</Link>
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/#about" className="text-stone-300 hover:text-white transition-colors">About</Link>
                    <Link href="/#experience" className="text-stone-300 hover:text-white transition-colors">Experience</Link>
                    <Link href="/#projects" className="text-stone-300 hover:text-white transition-colors">Projects</Link>
                    <Link href="/contact" className="bg-violet-500 text-white font-semibold py-2 px-5 rounded-full hover:bg-violet-600 transition-colors">Contact</Link>
                </nav>
            </div>
        </header>
    );
};

// --- Main Page Component ---
export default function PortfolioPage() {
    return (
        <div>
            <Header />
            <main className="bg-black-950">
                <motion.section 
                    id="hero" 
                    className="relative min-h-screen flex items-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 z-0">
                        <Image 
                            src="/headshot.png" 
                            alt="Amman Chuhan headshot" 
                            fill
                            style={{ objectFit: 'cover' }}
                            quality={100}
                            priority
                        />
                    </div>

                    <div className="noise-left z-[5]" aria-hidden="true" />
                    
                    <div className="container mx-auto px-6">
                        <div className="relative z-10 max-w-4xl text-left">
                            <motion.h1 
                                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                 <span className="relative inline-block z-10">
                                    Hi, I&apos;m Amman Chuhan
                                    {/* Blob sits behind this span but above the background image */}
                                    <span
                                    className="animated-blob pointer-events-none absolute -inset-6 md:-inset-10 -z-10"
                                    aria-hidden="true"
                                    />
                                </span>
                                <br />
                                <span className="typewriter font-ebgaramond text-violet-400 text-3xl md:text-4xl">
                                    Analyst, Technologist, &amp; Creative Problem Solver
                                </span>
                            </motion.h1>
                            <motion.p 
                                className="text-lg text-stone-300 mb-10 max-w-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                I bridge the gap between data-driven insights and technical product solutions. With a foundation in computer science and a focus on analytical strategy, I thrive on optimizing processes and building tools that create business value.
                            </motion.p>
                            <motion.a 
                                href="#projects" 
                                className="inline-flex items-center gap-2 bg-violet-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-violet-600 transition-all group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                View My Work
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                        </div>
                    </div>
                </motion.section>

                <div className="container mx-auto px-6">
                    <motion.section 
                        id="about" 
                        className="py-24 border-t border-gray-800"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="grid md:grid-cols-3 gap-16">
                            <div className="md:col-span-1">
                                <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
                                <div className="flex items-center gap-4">
                                    <a href="https://github.com/SatoshiBall101" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-violet-400 transition-colors"><GithubIcon /></a>
                                    <a href="https://www.linkedin.com/in/amman-chuhan/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-violet-400 transition-colors"><LinkedinIcon /></a>
                                </div>
                            </div>
                            <div className="md:col-span-2 text-stone-300 space-y-6 text-lg">
                                <p>
                                    My journey began with a computer science degree from USC, where I built a strong foundation in software engineering and problem-solving. While I love building technology, I&apos;m most passionate about understanding the &quot;why&quot; behind it—how data can inform strategy and how well-designed products can solve real-world business challenges.
                                </p>
                                <p>
                                    At SHOOK Research, I look forward to applying my analytical skills to not only crunch numbers but also to deconstruct and improve the very processes we use. My goal is to leverage my unique blend of technical and analytical skills to help guide products from idea to impact.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-4">
                                    <h3 className="w-full text-white font-semibold mb-2 text-lg">Core Competencies</h3>
                                    {['Data Analysis', 'Process Optimization', 'Software Engineering', 'Problem Solving', 'Communication', 'Teamwork', 'Leadership'].map((skill, i) => (
                                        <motion.span key={skill} className="bg-violet-900/50 text-violet-300 text-sm font-medium px-4 py-2 rounded-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                                            {skill}
                                        </motion.span>
                                    ))}
                                    <h3 className="w-full text-white font-semibold mb-2 mt-4 text-lg">Technologies</h3>
                                    {['Python', 'Java', 'C++', 'TypeScript', 'AWS', 'React', 'Next.js', 'Node.js', 'HTML/CSS', 'SQL', 'Tableau', 'Git'].map((skill, i) => (
                                        <motion.span key={skill} className="bg-gray-700/50 text-stone-300 text-sm font-medium px-4 py-2 rounded-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section 
                        id="experience" 
                        className="py-24 border-t border-gray-800"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Career & Education</h2>
                        <div className="max-w-3xl mx-auto space-y-12">
                            <div className="flex items-start gap-6">
                                <Image src="/shookresearch.jpeg"  alt="SHOOK Research Logo" width={48} height={48} className="w-12 h-12 rounded-full flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Research & Data Analyst</h3>
                                    <p className="text-violet-400 mb-1">SHOOK Research</p>
                                    <p className="text-stone-400 text-sm mb-2">Starting Jan 2026</p>
                                    <p className="text-stone-300">Will be analyzing quantitative and qualitative data to identify top financial advisors, carrying out due dilligence interviews, and optimizing internal data processing workflows to enhance efficiency.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-6">
                             <Image src="/trojanvision.png" alt="Trojan Vision Logo" width={48} height={48} className="w-12 h-12 object-contain rounded-full flex-shrink-0" />                                <div>
                                    <h3 className="text-xl font-semibold text-white">Head Project Manager</h3>
                                    <p className="text-violet-400 mb-1">Trojan Vision Television</p>
                                    <p className="text-stone-400 text-sm mb-2">Aug 2022 - May 2025</p>
                                    <p className="text-stone-300">Led and coordinated a student production team for Trojan Vision&apos;s gameshow section, managing executive producers, story teams, and technical crews to ensure smooth live productions.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-6">
                                <Image src="/coinpresso.png" alt="Coinpresso Logo" width={48} height={48} className="w-12 h-12 rounded-full flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Software Engineer Intern</h3>
                                    <p className="text-violet-400 mb-1">Coinpresso</p>
                                    <p className="text-stone-400 text-sm mb-2">May 2023 - Aug 2023</p>
                                    <p className="text-stone-300">Developed backend logic using Java with Springboot and Microservices Architechture. Used React, HTML and CSS for front-end development. Engineered a serverless AWS pipeline for a client&apos;s KYC portal using S3, Lambda, and Rekognition to automate facial analysis and validation, enhancing data processing efficiency.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <Image src="/marketcast.jpeg" alt="MarketCast Logo" width={48} height={48} className="w-12 h-12 rounded-full flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Content Insights Data Intern</h3>
                                    <p className="text-violet-400 mb-1">MarketCast</p>
                                    <p className="text-stone-400 text-sm mb-2">June 2022 - Aug 2022</p>
                                    <p className="text-stone-300">Analyzed qualitative and quantitative datasets for major entertainment clients, translating raw numbers into compelling data stories and visualizations to provide actionable insights.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <Image src="/usclogo.png" alt="USC Logo" width={48} height={48} className="w-12 h-12 rounded-full flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Computer Science (B.S.)</h3>
                                    <p className="text-violet-400 mb-1">University of Southern California</p>
                                    <p className="text-stone-400 text-sm mb-2">2021 - 2025</p>
                                    <p className="text-stone-300">Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Internetworking, Artificial Intelligence, Linear Algebra.</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section 
                        id="projects" 
                        className="py-24 border-t border-gray-800"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Select Projects</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <motion.div className="flex flex-col bg-gray-800/50 p-6 rounded-lg border border-gray-700" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0 }}>
                                <h3 className="text-xl font-semibold text-white mb-2">Automated KYC Pipeline</h3>
                                <p className="text-stone-300 mb-4 flex-grow">At Coinpresso, I identified a bottleneck in the manual Know Your Customer (KYC) process. I designed and engineered a fully automated, serverless pipeline on AWS using S3, Lambda, and Rekognition. This solution streamlined identity verification and enhanced data processing efficiency.</p>
                            </motion.div>
                            <motion.div className="flex flex-col bg-gray-800/50 p-6 rounded-lg border border-gray-700" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.1 }}>
                                <h3 className="text-xl font-semibold text-white mb-2">Entertainment Data Storytelling</h3>
                                <p className="text-stone-300 mb-4 flex-grow">At MarketCast, I transformed complex audience data into compelling narratives. By creating data visualizations and presentations for major entertainment clients, I translated raw numbers into actionable insights, helping stakeholders understand the &apos;why&apos; behind viewership trends.</p>
                            </motion.div>
                            <motion.div className="flex flex-col bg-gray-800/50 p-6 rounded-lg border border-gray-700" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.2 }}>
                                <h3 className="text-xl font-semibold text-white mb-2">Gameshow Production Lead</h3>
                                <p className="text-stone-300 mb-4 flex-grow">As Head Project Manager at Trojan Vision, I led a cross-functional student team of producers, writers, and technical crew to deliver a live, weekly gameshow. This role required managing timelines, securing sponsorships, and coordinating diverse teams under tight deadlines.</p>
                            </motion.div>
                             <motion.div className="flex flex-col bg-gray-800/50 p-6 rounded-lg border border-gray-700" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.3 }}>
                                <h3 className="text-xl font-semibold text-white mb-2">Cube Runner</h3>
                                <h4 className="text-l font text-gray-400 mb-2">visionOS Spatial Computing App</h4>
                                <p className="text-stone-300 mb-4 flex-grow">Developed an immersive rubiks solver game for visionOS. This project involved using SwiftUI, RealityKit, ARKit for hand gesture recognition, and a deep understanding of human-computer interaction in a 3D space among other things.</p>
                            </motion.div>
                            <motion.div className="flex flex-col bg-gray-800/50 p-6 rounded-lg border border-gray-700" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.4 }}>
                                <h3 className="text-xl font-semibold text-white mb-2">Calendar Pro</h3>
                                <h4 className="text-l font text-gray-400 mb-2">iPadOS Productivity App</h4>
                                <p className="text-stone-300 mb-4 flex-grow">Designed and built a native iPad calendar application with deep PencilKit integration. Unlike other offerings, this app offered a pencil centric apporach to recording tasks in a calendar app. I used a MVVM architecture with component-based architecture.</p>
                            </motion.div>
                            <Link href="/games" className="flex flex-col bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-violet-500 hover:-translate-y-1 transition-all group">
                                <h3 className="text-xl font-semibold text-white mb-2">C++ Game Prototypes</h3>
                                <p className="text-stone-300 mb-4 flex-grow">A collection of classic games built from scratch in C++ using a custom OpenGL rendering engine. These projects demonstrate a deep understanding of software architecture and low-level graphics programming.</p>
                                <div className="flex items-center text-violet-400 font-medium group-hover:underline mt-auto pt-4">
                                    Play the Collection <ArrowRightIcon className="ml-1 w-5 h-5" />
                                </div>
                            </Link>
                        </div>
                    </motion.section>
                    
                    <motion.section 
                        id="contact" 
                        className="py-24 text-center border-t border-gray-800"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s Connect</h2>
                        <p className="text-lg text-stone-300 max-w-2xl mx-auto mb-8">
                            I&apos;m passionate about building impactful products and if you&apos;d like to chat about technology, product, or potential opportunities, please get in touch.
                        </p>
                        <Link href="/contact" className="inline-block bg-violet-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-violet-600 transition-colors text-lg">
                            Get in Touch
                        </Link>
                    </motion.section>
                </div>
            </main>

            <footer className="bg-gray-950 border-t border-gray-800">
                <div className="container mx-auto px-6 py-8 text-center text-stone-400">
                    <p>&copy; {new Date().getFullYear()} Amman Chuhan. Built with Next.js & Tailwind CSS.</p>
                </div>
            </footer>
        </div>
    );
}

