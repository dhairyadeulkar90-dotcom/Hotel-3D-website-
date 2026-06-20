/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Settings2, 
  Compass, 
  Volume2, 
  VolumeX, 
  ArrowUpRight, 
  ChevronRight,
  BookOpen,
  Menu,
  X,
  Languages,
  Calendar,
  Waves
} from 'lucide-react';

import CinematicIntro from './components/CinematicIntro';
import BookingWidget from './components/BookingWidget';
import LuxuryRooms, { hotelRooms } from './components/LuxuryRooms';
import Amenities from './components/Amenities';
import DesignManual, { headlineSuggestions } from './components/DesignManual';
import { ResortLocation, BookingDetails } from './types';

// Luxury Resorts Array with precise details
const resortLocations: ResortLocation[] = [
  {
    id: 'loc-bali',
    name: 'Royal Crest Sanctum',
    destination: 'Uluwatu, Bali',
    coordinates: '8.4095° S, 115.1889° E',
    description: 'A two-story sunrise sanctuary set on limestone cliffs overlooking the Indian ocean.',
    basePrice: 3400,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'loc-maldives',
    name: 'Amber Sands Pavilion',
    destination: 'Ba Atoll, Maldives',
    coordinates: '3.2028° N, 73.2207° E',
    description: 'Private stilted glass overwater cabins connected by teak walkways with private helipad.',
    basePrice: 5200,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'loc-amalfi',
    name: 'Riviera Cliff Crest',
    destination: 'Amalfi, Italy',
    coordinates: '40.6340° N, 14.6027° E',
    description: 'An architectural bento of wood and marble suspended 150 meters above the Mediterranean tide.',
    basePrice: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'loc-costarica',
    name: 'Forest Lagoon Outpost',
    destination: 'Arenal, Costa Rica',
    coordinates: '10.3015° N, 84.4071° W',
    description: 'Eco-futuristic glass pavilions wrapped in cedar scaffolding within a private volcanic canopy.',
    basePrice: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function App() {
  const [showCinematicIntro, setShowCinematicIntro] = useState(true);
  const [dayNightMode, setDayNightMode] = useState<'sunny' | 'twilight'>('sunny');
  const [selectedHeadlineIndex, setSelectedHeadlineIndex] = useState(0);
  const [bgOverlayOpacity, setBgOverlayOpacity] = useState(0.35);
  const [contrastMode, setContrastMode] = useState<'text-glow' | 'shadow-deep' | 'glass-card' | 'neutral'>('shadow-deep');
  const [fontSizePreset, setFontSizePreset] = useState<'editorial' | 'architectural' | 'minimalist'>('editorial');
  const [selectedRoomId, setSelectedRoomId] = useState('room-two-story-villa');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Keep a digital clock updated representing resort local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Emulate premium local luxury time
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Background video vertical parallax scroll effect listener
  useEffect(() => {
    const scrollContainer = document.getElementById('main-hotel-scroll-area');
    if (!scrollContainer) return;

    const handleScroll = () => {
      setScrollY(scrollContainer.scrollTop);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [showCinematicIntro]);

  const activeCopy = headlineSuggestions[selectedHeadlineIndex];
  const selectedLocation = resortLocations[0]; // core bali showcase

  const handleBookInquiry = (details: BookingDetails) => {
    console.log('Sanctuary Inquired! Securely logging details:', details);
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    // Smooth scroll down to booking widget to finalize
    const element = document.getElementById('luxury-booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white flex flex-col relative font-sans overflow-x-hidden" id="applet-viewport">
      <AnimatePresence>
        {showCinematicIntro && (
          <CinematicIntro
            key="cinematic-opening-gate"
            onEnterResort={() => setShowCinematicIntro(false)}
            dayNightMode={dayNightMode}
            onChangeDayNightMode={setDayNightMode}
          />
        )}
      </AnimatePresence>

      {/* Main Sanctuary Website Frame */}
      <div className="flex-grow flex flex-col relative" id="resort-master-frame">
        {/* TOP EDITORIAL NAVIGATION BAR (5 Standard luxury links requested) */}
        <header 
          id="royal-crest-navbar"
          className="relative z-40 w-full border-b border-white/5 bg-black/40 backdrop-blur-md px-6 py-4 md:px-10 flex justify-between items-center"
        >
          {/* Logo & Crest Shield */}
          <div className="flex items-center gap-3" id="brand-logo-section">
            <div className="w-10 h-10 border border-amber-400/45 rounded-lg flex items-center justify-center relative bg-black/60 shadow">
              <Sparkles className="w-4.5 h-4.5 text-amber-300" />
            </div>
            <div className="text-left font-display">
              <span className="block text-xs font-semibold tracking-[0.25em] text-white">ROYAL CREST</span>
              <span className="block text-[8px] tracking-[0.4em] text-amber-400/80 uppercase">Resort &amp; Residences</span>
            </div>
          </div>

          {/* Desktop Navigation Link Items (5 Standard Links Every Hotel Site Needs) */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-widest uppercase text-gray-300" id="desktop-navigation">
            <a href="#luxury-villas-showcase" id="nav-item-villas" className="hover:text-amber-300 transition-colors relative group py-2">
              Our Sanctuaries
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#amenities-showcase" id="nav-item-gastronomy" className="hover:text-amber-300 transition-colors relative group py-2">
              Gastronomy
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#amenities-showcase" id="nav-item-wellness" className="hover:text-amber-300 transition-colors relative group py-2">
              Wellness Spa
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#amenities-showcase" id="nav-item-experiences" className="hover:text-amber-300 transition-colors relative group py-2">
              Curated Escapes
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#luxury-villas-showcase" id="nav-item-story" className="hover:text-amber-300 transition-colors relative group py-2">
              Our Heritage
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          {/* Action Trigger / Side Studio toggle */}
          <div className="flex items-center gap-3" id="navbar-actions">
            {/* Main CTA Reservation trigger */}
            <a
              id="nav-cta-book"
              href="#luxury-booking-section"
              className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase hover:scale-103 transition-all font-mono shadow-md flex items-center gap-1 cursor-pointer"
            >
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white md:hidden hover:text-amber-400"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-nav"
              className="fixed inset-0 z-50 bg-[#06070a]/98 flex flex-col justify-between p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              id="mobile-navigation-pane"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span className="font-display tracking-widest text-[#cdcdcd] font-bold text-sm">ROYAL CREST</span>
                  </div>
                  <button id="close-mobile-menu" onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white hover:text-amber-400 bg-white/5 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 text-xl font-serif tracking-normal text-left" id="mobile-nav-links">
                  <a href="#luxury-villas-showcase" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 flex items-center justify-between">
                    <span>Our Private Sanctuaries</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </a>
                  <a href="#amenities-showcase" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 flex items-center justify-between">
                    <span>Gastronomy Venues</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </a>
                  <a href="#amenities-showcase" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 flex items-center justify-between">
                    <span>Wellness &amp; Hammam</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </a>
                  <a href="#amenities-showcase" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 flex items-center justify-between">
                    <span>Curated Archipelago Escapes</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </a>
                  <a href="#luxury-villas-showcase" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 flex items-center justify-between">
                    <span>Our Heritage</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </a>
                </nav>
              </div>

              <div className="space-y-4">
                <div className="text-center font-mono text-[9px] text-gray-500">
                  LATITUDE: -8.4095° S | BALI
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CORE BODY GRID: Page and Sidebar Studio */}
        <div className="flex-grow flex relative" id="body-chassis">
          
          {/* LEFT COLUMN: THE REAL HOTEL WEBSITE EXPERIENCE */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 relative scroll-smooth bg-[#06070a]" id="main-hotel-scroll-area">
            
            {/* 1. HERO PORTAL FRAME (Video Background - Modern tropical pool villa with Wood pillar highlights) */}
            <section 
              id="hero-sanctuary-portal" 
              className="relative h-[85vh] min-h-[550px] w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden border-b border-white/5"
            >
              {/* BACKDROP: HTML5 Video with Unsplash Pool Villa Fallback */}
              <div className="absolute inset-0 z-0 pointer-events-none" id="visual-background-engine">
                {/* Custom darkness ambient shading to ensure copy stands out over sunlit footage */}
                <div 
                  className="absolute inset-0 bg-black transition-opacity duration-700 z-10"
                  style={{ opacity: bgOverlayOpacity }}
                />

                {/* Ambient Soft Vignette Grid and bottom dark fading (to transition into section below pool flawlessly) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-black/20 z-10" />

                {/* Cinematic Villa Background active video loop */}
                <motion.video
                  id="hero-bg-video-loop"
                  autoPlay
                  loop
                  muted
                  playsInline
                  referrerPolicy="no-referrer"
                  src="https://res.cloudinary.com/dh3xdbqod/video/upload/v1781899816/Create_villa_hero_animation_202606192203_r4c7lj.mp4"
                  className="w-full h-full object-cover transition-[filter] duration-700 origin-center"
                  style={{
                    filter: dayNightMode === 'twilight' ? 'hue-rotate(240deg) brightness(0.4) contrast(1.15)' : 'brightness(0.9)',
                    transform: `translateY(${scrollY * 0.3}px) scale(1.12) translateZ(0)`
                  }}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={!showCinematicIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.15 }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  poster="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80"
                />
              </div>

              {/* FLOATING HUD METRICS & TELEMETRY RAILS */}
              <div className="relative z-20 w-full flex justify-between items-center text-[10px] uppercase font-mono tracking-[0.25em] text-gray-300 pointer-events-none" id="hero-hud-rail">
                <div className="flex items-center gap-2 border border-white/10 bg-black/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>{selectedLocation.destination}</span>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-xs font-light">
                  <span className="text-gray-500 font-mono">COORD: {selectedLocation.coordinates}</span>
                  <span className="text-gray-600">|</span>
                  <div className="flex items-center gap-1.5 border border-white/10 bg-black/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>LST: {currentTime || '12:00:00'}</span>
                  </div>
                </div>
              </div>

              {/* CORE HERO TITLES (The exact Headline & Subtitle requested) */}
              <div 
                className="relative z-20 max-w-4xl text-left my-auto space-y-5 md:space-y-6 pt-10" 
                id="hero-editorial-center"
              >
                {/* Concept badge */}
                <motion.div 
                  id="hero-mini-crest"
                  className="inline-flex items-center gap-2 border border-amber-400/20 bg-amber-500/5 px-3.5 py-1 rounded-full backdrop-blur-sm"
                  initial={{ opacity: 0, y: 15 }}
                  animate={!showCinematicIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[10px] font-mono tracking-widest text-amber-200 uppercase font-medium">
                    ARCHITECTURAL DIGEST MASTERWORK
                  </span>
                </motion.div>

                {/* Headline Dynamic Renderer */}
                <motion.h1 
                  id="hero-title-headline"
                  className={`font-serif leading-tight font-light transition-all duration-500 ${
                    fontSizePreset === 'editorial' ? 'text-4xl sm:text-6xl md:text-7xl tracking-wide' :
                    fontSizePreset === 'architectural' ? 'text-3xl sm:text-5xl md:text-6xl tracking-tight' :
                    'text-3xl sm:text-4xl md:text-5xl tracking-normal font-sans'
                  } ${
                    contrastMode === 'shadow-deep' ? 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] text-white' :
                    contrastMode === 'text-glow' ? 'text-white text-shadow-glow' :
                    contrastMode === 'glass-card' ? 'bg-[#000000]/45 p-6 rounded-2xl border border-white/10 text-white backdrop-blur-sm' :
                    'text-white font-medium'
                  }`}
                  style={{
                    textShadow: contrastMode === 'text-glow' ? '0 0 15px rgba(205,158,77,0.4), 0 2px 10px rgba(0,0,0,0.9)' : undefined
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={!showCinematicIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.4 }}
                >
                  {activeCopy.headline.replace(/Infinity/g, '')}
                  <span className="font-sans italic text-gold-gradient font-semibold tracking-normal block mt-1">Infinity Horizon</span>
                </motion.h1>

                {/* Sub-Headline description */}
                <motion.p 
                  id="hero-title-subheadline"
                  className={`max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed font-light ${
                    contrastMode === 'shadow-deep' ? 'text-gray-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] font-medium' :
                    contrastMode === 'glass-card' ? 'text-gray-300' :
                    'text-gray-300'
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={!showCinematicIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: 0.6 }}
                >
                  {activeCopy.subHeadline}
                </motion.p>

                {/* Quick explore features anchor links */}
                <motion.div 
                  className="flex flex-wrap gap-4 pt-1 sm:pt-3" 
                  id="hero-quick-anchors"
                  initial={{ opacity: 0, y: 15 }}
                  animate={!showCinematicIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: 0.8 }}
                >
                  <a
                    id="hero-villas-anchor"
                    href="#luxury-villas-showcase"
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-xs tracking-widest uppercase transition-all backdrop-blur font-mono flex items-center gap-1.5 border border-white/15"
                  >
                    <span>Browse Sanctuaries</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <a
                    id="hero-amenities-anchor"
                    href="#amenities-showcase"
                    className="px-5 py-2.5 rounded-full bg-black/40 hover:bg-white/5 text-[#dcdcdc] font-mono text-xs tracking-widest uppercase transition-all flex items-center gap-1.5 border border-white/5"
                  >
                    <span>Curated Experiences</span>
                  </a>
                </motion.div>
              </div>
            </section>

            {/* DESIGN MANUAL SUMMARY CARD (Responsive placeholder in case they close manual) */}
            <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-16" id="scrolling-website-sections">
              
              {/* 3. DYNAMIC LUXURY SUITE PRESENTATION AND SLIDER */}
              <section id="rooms-section" className="scroll-mt-10">
                <LuxuryRooms
                  onSelectRoom={handleSelectRoom}
                  selectedRoomId={selectedRoomId}
                />
              </section>

              {/* 4. HOTEL AMENITIES & SERVICES SECTION */}
              <section id="amenities-section" className="scroll-mt-10">
                <Amenities />
              </section>
            </div>

            {/* MAIN COMPREHENSIVE FOOTER */}
            <footer className="w-full bg-[#06070a] border-t border-white/5 px-6 py-12 md:px-12 text-left" id="royal-crest-footer">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8" id="footer-inner-grid">
                
                {/* Col 1: Brand Info */}
                <div className="md:col-span-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border border-amber-400/35 rounded flex items-center justify-center bg-black/60 text-amber-300">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="font-display tracking-widest text-[#dddddd] font-semibold text-xs">ROYAL CREST</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    An elite cooperative of private luxurious sanctuaries spanning global archipelagos, designed for discerning travelers.
                  </p>
                  <p className="text-[10px] font-mono text-gray-500">
                    BALI • MALDIVES • AMALFI • COSTA RICA
                  </p>
                </div>

                {/* Col 2: Useful Links (matching 5 links requested) */}
                <div className="md:col-span-3 space-y-3 md:pl-10">
                  <span className="block text-[10px] font-mono text-amber-300/80 uppercase tracking-widest">Resort Sectors</span>
                  <ul className="space-y-1.5 text-xs text-gray-400" id="footer-links-list">
                    <li><a href="#luxury-villas-showcase" className="hover:text-white transition-colors block">Private Sanctuaries</a></li>
                    <li><a href="#amenities-showcase" className="hover:text-white transition-colors block">Gastronomy &amp; Cellar</a></li>
                    <li><a href="#amenities-showcase" className="hover:text-white transition-colors block">The Hydrothermal Spa</a></li>
                    <li><a href="#amenities-showcase" className="hover:text-white transition-colors block">Curated Escapes Portfolio</a></li>
                    <li><a href="#luxury-villas-showcase" className="hover:text-white transition-colors block">Our Heritage</a></li>
                  </ul>
                </div>

                {/* Col 3: Tech details */}
                <div className="md:col-span-5 space-y-4">
                  <span className="block text-[10px] font-mono text-amber-300/80 uppercase tracking-widest">Legal &amp; Specifications</span>
                  <div className="space-y-2 rounded-xl bg-white/[0.02] border border-white/5 p-4 text-[11px] text-gray-400 leading-relaxed font-mono" id="footer-tech-specs">
                    <div>SECURE ARCHITECTURAL COMPLIANCE: <strong className="text-amber-300">LEVEL 5</strong></div>
                    <div>YACHT DECK INTEGRATION: <strong className="text-teal-400">ACTIVE RIVA PORT</strong></div>
                    <div>RESERVE PRIVACY: <strong className="text-white">DIPLOMATIC SECURE PORTAL</strong></div>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    &copy; {new Date().getFullYear()} Royal Crest Resort Co. All rights reserved globally.
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
