/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Users, MapPin, Search, ArrowRight, X, Sparkles, Check, ChevronDown, Percent } from 'lucide-react';
import { BookingDetails, ResortLocation } from '../types';

interface BookingWidgetProps {
  locations: ResortLocation[];
  onBook: (details: BookingDetails) => void;
  dayNightMode: 'sunny' | 'twilight';
  contrastMode: 'text-glow' | 'shadow-deep' | 'glass-card' | 'neutral';
}

export default function BookingWidget({
  locations,
  onBook,
  dayNightMode,
  contrastMode
}: BookingWidgetProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 8);

  const formatDateString = (d: Date) => d.toISOString().split('T')[0];

  const [booking, setBooking] = useState<BookingDetails>({
    locationId: locations[0]?.id || 'loc-bali',
    checkIn: formatDateString(tomorrow),
    checkOut: formatDateString(nextWeek),
    guests: {
      adults: 2,
      children: 0,
      infants: 0
    },
    promoCode: ''
  });

  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [promoInputOpen, setPromoInputOpen] = useState(false);

  const selectedLocation = locations.find(l => l.id === booking.locationId) || locations[0];

  const handleGuestChange = (type: 'adults' | 'children' | 'infants', operation: 'inc' | 'dec') => {
    setBooking(prev => {
      const current = prev.guests[type];
      let updated = current;
      if (operation === 'inc') {
        updated = type === 'adults' ? Math.min(8, current + 1) : Math.min(6, current + 1);
      } else {
        const floor = type === 'adults' ? 1 : 0; // limit adults to min 1
        updated = Math.max(floor, current - 1);
      }
      return {
        ...prev,
        guests: {
          ...prev.guests,
          [type]: updated
        }
      };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(booking.checkIn) >= new Date(booking.checkOut)) {
      alert("Sanctuary Schedule Error: Your depart date must be after your arrival date.");
      return;
    }
    setSuccessModal(true);
    onBook(booking);
  };

  const totalGuests = booking.guests.adults + booking.guests.children + booking.guests.infants;

  return (
    <div className="w-full relative z-30" id="booking-widget-wrapper">
      {/* Interactive Booking Horizontal Bar Container */}
      <form
        id="booking-form-bar"
        onSubmit={handleFormSubmit}
        className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5 border border-white/10 rounded-2xl md:rounded-full overflow-hidden backdrop-blur-xl ${
          contrastMode === 'glass-card' 
            ? 'glass-panel gold-border-glow' 
            : 'bg-black/65 border-white/10'
        }`}
      >
        {/* FIELD 1: DESTINATION / LOCATION SELECT */}
        <div className="lg:col-span-3 px-6 py-4 flex items-center gap-3.5 border-b lg:border-b-0 lg:border-r border-white/5 hover:bg-white/[0.02] transition-all" id="field-sanctuary">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex-1 text-left">
            <label className="block text-[9px] font-mono tracking-widest text-amber-400/80 uppercase">
              Sanctuary Destination
            </label>
            <div className="relative mt-0.5">
              <select
                id="select-sanctuary"
                value={booking.locationId}
                onChange={(e) => setBooking({ ...booking, locationId: e.target.value })}
                className="w-full bg-transparent font-serif text-white text-[14px] font-medium outline-none cursor-pointer pr-4 appearance-none"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-[#0b0c10] text-white font-sans text-sm">
                    {loc.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-0 top-1.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* FIELD 2: CHECK IN DATE */}
        <div className="lg:col-span-2 px-6 py-4 flex items-center gap-3.5 border-b lg:border-b-0 lg:border-r border-white/5 hover:bg-white/[0.02] transition-all" id="field-arrival">
          <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex-grow text-left">
            <label className="block text-[9px] font-mono tracking-widest text-amber-400/80 uppercase">
              Arrival
            </label>
            <input
              id="input-arrival-date"
              type="date"
              value={booking.checkIn}
              min={formatDateString(new Date())}
              onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
              className="mt-0.5 bg-transparent text-white font-mono text-[13px] outline-none cursor-pointer w-full filter-none tracking-normal"
            />
          </div>
        </div>

        {/* FIELD 3: CHECK OUT DATE */}
        <div className="lg:col-span-2 px-6 py-4 flex items-center gap-3.5 border-b lg:border-b-0 lg:border-r border-white/5 hover:bg-white/[0.02] transition-all" id="field-departure">
          <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex-grow text-left">
            <label className="block text-[9px] font-mono tracking-widest text-amber-400/80 uppercase">
              Departure
            </label>
            <input
              id="input-departure-date"
              type="date"
              value={booking.checkOut}
              min={booking.checkIn}
              onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
              className="mt-0.5 bg-transparent text-white font-mono text-[13px] outline-none cursor-pointer w-full tracking-normal"
            />
          </div>
        </div>

        {/* FIELD 4: GUEST POPOVER PICKER */}
        <div className="lg:col-span-3 px-6 py-4 flex items-center gap-3.5 border-b lg:border-b-0 lg:border-r border-white/5 relative hover:bg-white/[0.02] transition-all" id="field-guests">
          <Users className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex-1 text-left cursor-pointer" onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}>
            <label className="block text-[9px] font-mono tracking-widest text-amber-400/80 uppercase">
              Guests
            </label>
            <span className="block font-serif text-white text-[14px] font-medium mt-0.5">
              {totalGuests} guest{totalGuests > 1 ? 's' : ''}
              {booking.guests.children > 0 && <span className="text-gray-400 font-sans text-xs"> (incl. children)</span>}
            </span>
          </div>
          <button
            id="toggle-guest-modal"
            type="button"
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            className="p-1 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* GUEST MODAL POPOVER CHASSIS */}
          {isGuestDropdownOpen && (
            <div 
              id="guest-popover-panel" 
              className="absolute z-40 top-full left-0 right-0 lg:left-auto lg:right-0 mt-2 bg-[#090a0f] border border-white/10 rounded-2xl p-5 shadow-2xl glass-panel w-72 space-y-4 text-white text-left"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h4 className="font-display text-xs tracking-wider font-semibold text-amber-300">ACCOMMODATIONS PARTITIONS</h4>
                <button
                  id="close-guest-popover"
                  type="button"
                  onClick={() => setIsGuestDropdownOpen(false)}
                  className="p-1 text-gray-500 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Adults Counter */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[13px] font-medium font-sans">Adults</span>
                  <span className="block text-[10px] text-gray-400">Ages 13 or above</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    id="dec-adults"
                    type="button"
                    onClick={() => handleGuestChange('adults', 'dec')}
                    className="w-7 h-7 rounded-full border border-white/10 hover:border-amber-400/50 flex items-center justify-center font-mono hover:text-amber-300 transition-all text-sm"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-mono text-sm">{booking.guests.adults}</span>
                  <button
                    id="inc-adults"
                    type="button"
                    onClick={() => handleGuestChange('adults', 'inc')}
                    className="w-7 h-7 rounded-full border border-white/10 hover:border-amber-400/50 flex items-center justify-center font-mono hover:text-amber-300 transition-all text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[13px] font-medium font-sans">Children</span>
                  <span className="block text-[10px] text-gray-400">Ages 2 to 12</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    id="dec-children"
                    type="button"
                    onClick={() => handleGuestChange('children', 'dec')}
                    className="w-7 h-7 rounded-full border border-white/10 hover:border-amber-400/50 flex items-center justify-center font-mono hover:text-amber-300 transition-all text-sm"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-mono text-sm">{booking.guests.children}</span>
                  <button
                    id="inc-children"
                    type="button"
                    onClick={() => handleGuestChange('children', 'inc')}
                    className="w-7 h-7 rounded-full border border-white/10 hover:border-amber-400/50 flex items-center justify-center font-mono hover:text-amber-300 transition-all text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Infants Counter */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[13px] font-medium font-sans">Infants</span>
                  <span className="block text-[10px] text-gray-400">Ages 0 to 1</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    id="dec-infants"
                    type="button"
                    onClick={() => handleGuestChange('infants', 'dec')}
                    className="w-7 h-7 rounded-full border border-white/10 hover:border-amber-400/50 flex items-center justify-center font-mono hover:text-amber-300 transition-all text-sm"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-mono text-sm">{booking.guests.infants}</span>
                  <button
                    id="inc-infants"
                    type="button"
                    onClick={() => handleGuestChange('infants', 'inc')}
                    className="w-7 h-7 rounded-full border border-white/10 hover:border-amber-400/50 flex items-center justify-center font-mono hover:text-amber-300 transition-all text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Confirm Selection */}
              <button
                id="btn-confirm-guests"
                type="button"
                onClick={() => setIsGuestDropdownOpen(false)}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-medium tracking-widest uppercase rounded-xl transition-all mt-2"
              >
                APPLY PARTITIONS
              </button>
            </div>
          )}
        </div>

        {/* FIELD 5: PRIMARY CALL TO ACTION BUTTON */}
        <div className="lg:col-span-2 p-2 flex items-center justify-center bg-black/45 lg:bg-transparent" id="field-submit">
          <button
            id="booking-submit-btn"
            type="submit"
            className="w-full lg:w-11/12 py-3.5 lg:py-4 px-6 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase hover:scale-102 transition-all flex items-center justify-center gap-2 font-sans hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            INQUIRE
          </button>
        </div>
      </form>

      {/* Code Inquire Optional Accessory bar */}
      <div className="flex gap-4 justify-center items-center mt-3 text-[10px] font-mono text-gray-400" id="booking-accessory-row">
        <span>PREMIUM SERVICE: <strong className="text-teal-400">COMPLIMENTARY HELIPAD TRANSFER</strong></span>
        <span>•</span>
        <button
          id="promo-toggle-btn"
          type="button"
          onClick={() => setPromoInputOpen(!promoInputOpen)}
          className="text-amber-300 hover:text-white transition-all underline flex items-center gap-1"
        >
          <Percent className="w-3 h-3" />
          {booking.promoCode ? `Promo Code: ${booking.promoCode}` : 'Add Promo Offer'}
        </button>

        {promoInputOpen && (
          <div className="flex items-center gap-1.5 bg-[#090a0f] border border-white/10 px-2 py-0.5 rounded-lg ml-2 animate-fade-in" id="promo-input-box">
            <input
              id="promo-text-field"
              type="text"
              placeholder="e.g. SKYLINE26"
              value={booking.promoCode}
              onChange={(e) => setBooking({ ...booking, promoCode: e.target.value.toUpperCase() })}
              className="bg-transparent border-none outline-none text-white font-mono text-[10px] uppercase w-24"
            />
            <button
              id="apply-promo-btn"
              type="button"
              onClick={() => setPromoInputOpen(false)}
              className="text-amber-300 text-[9px] hover:text-white uppercase"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* LUXURY RECEIPT / BOOKING INQUIRY SUCCESS PANEL */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" id="booking-modal-overlay">
          <div className="bg-[#0e1017] border border-amber-400/30 gold-border-glow rounded-3xl p-6 md:p-8 max-w-lg w-full text-white text-left space-y-6 shadow-2xl relative" id="booking-modal-inner">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-widest text-white font-semibold">SANCTUARY RESERVED</h3>
                  <p className="text-[9px] font-mono uppercase text-amber-400/80">Pending Concierge Verification</p>
                </div>
              </div>
              <button
                id="close-success-modal"
                onClick={() => setSuccessModal(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inquire Invoice details */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 font-sans text-sm" id="booking-receipt">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-gray-400">Sanctuary Choice</span>
                <strong className="text-white font-serif">{selectedLocation.name}</strong>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-4">
                <div>
                  <span className="block text-[10px] font-mono text-amber-400/80 uppercase">Arrival Schedule</span>
                  <span className="font-mono text-sm font-semibold">{booking.checkIn}</span>
                  <span className="block text-xs text-gray-400">15:00 Guest Welcoming</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-amber-400/80 uppercase">Depart Schedule</span>
                  <span className="font-mono text-sm font-semibold">{booking.checkOut}</span>
                  <span className="block text-xs text-gray-400">11:00 Final Valet Clear</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-gray-400">Occupancy Partition</span>
                <strong className="text-white font-mono text-xs">{totalGuests} Guest{totalGuests > 1 ? 's' : ''} ({booking.guests.adults} Ad, {booking.guests.children} Ch, {booking.guests.infants} Inf)</strong>
              </div>

              {booking.promoCode && (
                <div className="flex justify-between items-center text-emerald-400 border-b border-white/5 pb-2 text-xs">
                  <span>Loyalty Code Activated</span>
                  <span className="font-mono">{booking.promoCode} (-15% Elite Tier Cut)</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="block text-xs text-gray-400">Inquire Estimated Escrow</span>
                  <span className="text-[10px] text-gray-500 font-mono italic">Does not account for custom yacht slip transfers</span>
                </div>
                <span className="text-xl font-serif text-amber-300 font-semibold text-gold-gradient">
                  ${(selectedLocation.basePrice * 7 * (booking.promoCode ? 0.85 : 1)).toLocaleString()} USD
                </span>
              </div>
            </div>

            <div className="space-y-3" id="booking-modal-cta">
              <div className="flex gap-2 items-center text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2.5 rounded-xl">
                <Check className="w-4 h-4 shrink-0" />
                <p className="leading-snug">
                  An elite Hospitality Concierge will contact you within **10 minutes** at **{window.localStorage.getItem('user_email') || 'your registered address'}** to coordinate luxury transit options.
                </p>
              </div>

              <button
                id="btn-confirm-booking-agent"
                onClick={() => setSuccessModal(false)}
                className="w-full py-4 bg-gold-gradient hover:scale-101 text-black font-semibold text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2"
              >
                SECURE CONCIERGE QUEUE
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
