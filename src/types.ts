/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ResortLocation {
  id: string;
  name: string;
  destination: string;
  coordinates: string;
  description: string;
  basePrice: number;
  imageUrl: string;
}

export interface BookingDetails {
  locationId: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  promoCode: string;
  selectedVillaId?: string;
}

export interface HeadlineCopySuggestion {
  id: string;
  category: string;
  headline: string;
  subHeadline: string;
  justification: string;
}

export interface DesignManualContent {
  colors: {
    name: string;
    hex: string;
    usage: string;
    vibe: string;
  }[];
  typography: {
    role: string;
    fontFamily: string;
    style: string;
    guideline: string;
  }[];
  layoutRules: {
    rule: string;
    problem: string;
    solution: string;
    whyItWorks: string;
  }[];
}
