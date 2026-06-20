/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Expand, Users, LayoutList, Wind, Compass } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  capacity: string;
  view: string;
  amenities: string[];
  imageUrl: string;
}

export const hotelRooms: Room[] = [
  {
    id: 'room-two-story-villa',
    name: 'Two-Story Sunset Cedar Sanctum',
    description: 'Our flagship modern masterpiece replicating the video\'s design. Fully retractable floor-to-ceiling glass paneling, floating teak terraces, private 25m heated salt-water infinity pool, and customized structural concrete framing that harnesses natural sunset wind flows.',
    price: 3400,
    size: '4,200 sq ft',
    capacity: 'Up to 6 guests',
    view: 'Panoramic Sunset Horizon & Lagoon',
    amenities: ['24/7 Private Butler', 'Private Heli-Transfer Choice', 'Retractable Glass Walls', 'Submerged Pool Lounge'],
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'room-executive-suite',
    name: 'Ocean Reef Glass Pavilion',
    description: 'Suspended entirely above the vibrant tropical coral reef, this villa features triple-pane secure glass flooring sections, allowing you to gaze at turtle migration trails directly beneath your canopy bed. Private teak ladder to the ocean.',
    price: 2600,
    size: '2,900 sq ft',
    capacity: 'Up to 4 guests',
    view: 'Vibrant Undersea Reef & Open Sky',
    amenities: ['Glass Floor Portals', 'Sub-Aquatic Room Service', 'Outdoor Copper Tub', 'Private Kayak Slip'],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'room-penthouse',
    name: 'The Crown Crest Penthouse',
    description: 'Occupying the highest architectural coordinates of Royal Crest, our penthouse showcases 360-degree views of the archipelago. Indulge in an elevated, glass-bottom infinity plunge pool jutting out like a structural wing.',
    price: 4900,
    size: '5,500 sq ft',
    capacity: 'Up to 8 guests',
    view: '360° Island Archipelago Vista',
    amenities: ['Glass-Bottom Overhang Pool', 'In-Suite Culinary Chef', 'Vintage Humidor access', 'Private Elevator'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'room-coconut-grove-villa',
    name: 'Coconut Grove Sunset Pavilion',
    description: 'A sanctuary blending classical thatched rooflines with modern infinity pool elegance. Framed by towering palms and golden-orange sky-reflecting waters, the layout maximizes warm cross-breezes and outdoor terrace dining.',
    price: 3800,
    size: '3,800 sq ft',
    capacity: 'Up to 4 guests',
    view: 'Lush Gardens & Sunset Pool Vista',
    amenities: ['Thatch Gazebo Daybed', 'Linear Infinity Pool', 'Al-Fresco Dining Terrace', 'Sunrise Yoga Deck'],
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'room-teak-master-suite',
    name: 'Teakwood Resonance Master Suite',
    description: 'Featuring sophisticated horizontal custom-lacquered wood paneling, an absolute sound-isolated glass enclosure overlooking a slate bathing tub, ergonomic study desk station with high-end leather chairs, and premium Egyptian linens.',
    price: 2200,
    size: '1,800 sq ft',
    capacity: 'Up to 2 guests',
    view: 'Private Garden & Interior Elegance',
    amenities: ['Linear Wood Paneling', 'Acoustically Treated Glass Bathing Hall', 'Ergonomic Premium Bureau', 'Automated Ambient Lights'],
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
  }
];

interface LuxuryRoomsProps {
  onSelectRoom: (roomId: string) => void;
  selectedRoomId: string;
}

export default function LuxuryRooms({ onSelectRoom, selectedRoomId }: LuxuryRoomsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextSlider = () => {
    setActiveIdx((prev) => (prev === hotelRooms.length - 1 ? 0 : prev + 1));
  };

  const prevSlider = () => {
    setActiveIdx((prev) => (prev === 0 ? hotelRooms.length - 1 : prev - 1));
  };

  const activeRoom = hotelRooms[activeIdx];

  return (
    <div className="space-y-8" id="luxury-villas-showcase">
      {/* Editorial Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4" id="villas-title-row">
        <div className="space-y-1">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-[0.3em] font-medium block">
            THE PRIVATE HAVENS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-wide">
            Architectural <span className="italic text-amber-200">Bento of Living Art</span>
          </h2>
        </div>
        <p className="max-w-md text-xs text-gray-400 leading-relaxed text-left md:text-right">
          Every villa tier incorporates our unique structural design rules: generous wood-accent columns, pristine sun protection margins, and a zero-boundary pool connection.
        </p>
      </div>

      {/* Main Luxury Suite Carousel Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="carousel-grid-container">
        {/* Left Side: Dynamic Image Slide with Slider Buttons */}
        <div className="lg:col-span-7 relative h-[320px] md:h-[450px] rounded-3xl overflow-hidden group shadow-2xl border border-white/5" id="slider-image-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoom.id}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${activeRoom.imageUrl}')` }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              id={`room-image-${activeRoom.id}`}
            >
              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
            </motion.div>
          </AnimatePresence>

          {/* Quick Stats on Image corner */}
          <div className="absolute top-4 left-4 z-10 flex gap-2" id="room-badge-row">
            <span className="px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#0b0c10] bg-amber-400 rounded-full font-bold shadow">
              Tier {activeIdx + 1}
            </span>
            <span className="px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white bg-black/60 rounded-full border border-white/10 backdrop-blur">
              {activeRoom.size}
            </span>
          </div>

          {/* Slider Controllers */}
          <div className="absolute bottom-6 right-6 z-10 flex gap-2" id="slider-navigation">
            <button
              id="slider-btn-prev"
              onClick={prevSlider}
              className="w-10 h-10 rounded-full bg-black/65 border border-white/10 text-white hover:text-amber-300 hover:border-amber-400 hover:scale-105 transition-all text-sm font-mono flex items-center justify-center cursor-pointer"
            >
              ←
            </button>
            <div className="h-10 px-4 bg-black/65 border border-white/10 rounded-full text-white text-[11px] font-mono flex items-center justify-center">
              {activeIdx + 1} / {hotelRooms.length}
            </div>
            <button
              id="slider-btn-next"
              onClick={nextSlider}
              className="w-10 h-10 rounded-full bg-black/65 border border-white/10 text-white hover:text-amber-300 hover:border-amber-400 hover:scale-105 transition-all text-sm font-mono flex items-center justify-center cursor-pointer"
            >
              →
            </button>
          </div>
        </div>

        {/* Right Side: Luxurious Details & Content */}
        <div className="lg:col-span-5 text-left space-y-6 flex flex-col justify-center" id="room-details-pane">
          <div className="space-y-4">
            <span className="text-xs font-mono text-amber-300/80 flex items-center gap-1.5 uppercase font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Luxury Sanctuaries
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium tracking-wide">
              {activeRoom.name}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {activeRoom.description}
            </p>
          </div>

          {/* Suite Specs Grid */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4" id="room-specs-grid">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                <Users className="w-4 h-4 text-amber-400/80" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-gray-500 uppercase">Capacities</span>
                <span className="text-xs text-white font-medium">{activeRoom.capacity}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                <Compass className="w-4 h-4 text-amber-400/80" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-gray-500 uppercase">Expositions</span>
                <span className="text-xs text-white font-medium">{activeRoom.view}</span>
              </div>
            </div>
          </div>

          {/* Premium Amenities list */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Inclusive Luxury Amenities</span>
            <div className="flex flex-wrap gap-2" id="room-perks-badges">
              {activeRoom.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[10px] font-mono text-amber-300 border border-amber-400/15 bg-amber-500/5 rounded"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Reserve / Inquire Action */}
          <div className="pt-2 flex items-center justify-between gap-4" id="room-cta-box">
            <div>
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Daily rate</span>
              <span className="text-2xl font-serif text-white font-semibold">
                ${activeRoom.price} <span className="text-xs text-gray-400 font-sans font-light">/ night</span>
              </span>
            </div>

            <button
              id={`btn-select-room-${activeRoom.id}`}
              onClick={() => onSelectRoom(activeRoom.id)}
              className={`px-6 py-3.5 rounded-xl font-semibold text-xs tracking-widest uppercase transition-all flex items-center gap-2 font-mono ${
                selectedRoomId === activeRoom.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white/5 text-white hover:text-[#0b0c10] hover:bg-white border border-white/10'
              }`}
            >
              {selectedRoomId === activeRoom.id ? (
                <>✓ Sanctuary Selected</>
              ) : (
                <>
                  Select Suite
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
