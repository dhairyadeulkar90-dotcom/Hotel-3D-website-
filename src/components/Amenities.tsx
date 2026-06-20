/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ChefHat, 
  Waves, 
  Compass, 
  MapPin, 
  PlaneTakeoff, 
  ShieldCheck, 
  Gem,
  Sparkles
} from 'lucide-react';

interface Amenity {
  id: string;
  icon: React.ComponentType<any>;
  name: string;
  sub: string;
  description: string;
  schedule: string;
  exclusivity: string;
}

const resortAmenities: Amenity[] = [
  {
    id: 'am-spa',
    icon: HeartHandshake,
    name: 'The Hydrothermal Hammam Spa',
    sub: 'Total Bio-tuning & Renewal',
    description: 'Bespoke thermal bath treatment tunnels carved directly into ocean volcanic basalt. Features custom cold-plunge plunge holes and essential oil herbal steam chambers.',
    schedule: '08:00 AM - 10:00 PM',
    exclusivity: 'Exclusive for Villa Sanctuaries'
  },
  {
    id: 'am-dining',
    icon: ChefHat,
    name: 'Epicurean Ocean Deck Dining',
    sub: 'Michelin Multi-Sensory Gastronomy',
    description: 'Chef Akira\'s tasting menus utilize marine products sourced at the resort\'s marine reserve within 4 hours. Pairings feature vintages from our deep undersea cellar.',
    schedule: '12:00 PM - 11:30 PM',
    exclusivity: 'Reservations Mandatory'
  },
  {
    id: 'am-pool',
    icon: Waves,
    name: 'Suspended Gravity Pool Deck',
    sub: 'Infinity Above the Abyss',
    description: 'Enjoy a 50m thermal infinity pool that visually morphs with the horizon. Configured with personal submerged sun-beds and champagne servers.',
    schedule: '24 Hours Open',
    exclusivity: 'Complimentary Access'
  },
  {
    id: 'am-transit',
    icon: PlaneTakeoff,
    name: 'Heli & Riva Yacht Valet Transit',
    sub: 'Seamless Aero-Aqueous Arrivals',
    description: 'Skip standard island logistics. Arrive via private Airbus H135 helicopters directly to our resort helipad or board our custom private leather Riva yacht cabins.',
    schedule: 'Coordinated on Calendar',
    exclusivity: 'Prior Booking Mandatory'
  },
  {
    id: 'am-butler',
    icon: Gem,
    name: '24/7 Elite Butler Service',
    sub: 'Unspoken Private Gestures',
    description: 'Whether organizing private beach fire pits, unlisted lagoon swimming pathways, or unpacking travel garments, your certified concierge butler is reachable via smart devices.',
    schedule: 'Full Time Constant',
    exclusivity: 'Default for Premium Suites'
  },
  {
    id: 'am-security',
    icon: ShieldCheck,
    name: 'Diplomatic Shield Security',
    sub: 'Absolute Unrivaled Seclusion',
    description: 'We respect privacy. Features secure radar air enclosures, private sea walls, and state-of-the-art security details managing secure transits dynamically for world headers.',
    schedule: 'Continuous Protocol',
    exclusivity: 'Maximum Protection tier'
  }
];

export default function Amenities() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="space-y-8" id="amenities-showcase">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4" id="amenities-title-row">
        <div className="space-y-1">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-[0.3em] font-medium block">
            ROYAL SERVICES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-wide">
            Curated <span className="italic text-amber-200">Indulgences & Protocols</span>
          </h2>
        </div>
        <p className="max-w-md text-xs text-gray-400 leading-relaxed text-left md:text-right">
          Premium services arranged by our hospitality council to ensure your tropical stay remains secure, secluded, and physically outstanding.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="amenities-grid">
        {resortAmenities.map((am, idx) => {
          const Icon = am.icon;
          const isHovered = hoveredIdx === idx;
          
          return (
            <div
              key={am.id}
              id={am.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`p-6 rounded-2xl border transition-all text-left space-y-4 relative overflow-hidden flex flex-col justify-between ${
                isHovered
                  ? 'bg-amber-500/5 gold-border-glow'
                  : 'bg-white/[0.01] border-white/5'
              }`}
            >
              {/* Background Glow */}
              <div 
                className={`absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ background: 'radial-gradient(circle at 10% 10%, rgba(245,158,11,0.06) 0%, rgba(0,0,0,0) 60%)' }}
              />

              <div className="space-y-4 relative z-10">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl transition-all ${
                    isHovered 
                      ? 'bg-amber-500 text-black' 
                      : 'bg-white/5 text-amber-300 border border-white/5'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono uppercase bg-white/5 px-2 py-0.5 rounded text-gray-400">
                    {am.exclusivity}
                  </span>
                </div>

                {/* Text Block */}
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg text-white tracking-wide group-hover:text-amber-300 transition-colors">
                    {am.name}
                  </h3>
                  <p className="text-[10px] font-mono text-amber-400/80 uppercase">
                    {am.sub}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {am.description}
                  </p>
                </div>
              </div>

              {/* Schedule indicator */}
              <div className="pt-4 border-t border-white/[0.05] flex justify-between items-center text-[10px] font-mono text-gray-500 relative z-10" id={`schedule-row-${am.id}`}>
                <span>TIMINGS / PROTOCOLS</span>
                <span className="text-gray-300 font-medium">{am.schedule}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
