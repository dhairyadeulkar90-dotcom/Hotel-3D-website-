/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  Sliders, 
  Check, 
  Eye, 
  Lock, 
  FileText,
  Volume2
} from 'lucide-react';
import { HeadlineCopySuggestion } from '../types';

interface DesignManualProps {
  selectedHeadlineIndex: number;
  onSelectHeadline: (index: number) => void;
  bgOverlayOpacity: number;
  onSetBgOverlayOpacity: (opacity: number) => void;
  contrastMode: 'text-glow' | 'shadow-deep' | 'glass-card' | 'neutral';
  onSetContrastMode: (mode: 'text-glow' | 'shadow-deep' | 'glass-card' | 'neutral') => void;
  fontSizePreset: 'editorial' | 'architectural' | 'minimalist';
  onSetFontSizePreset: (preset: 'editorial' | 'architectural' | 'minimalist') => void;
  dayNightMode: 'sunny' | 'twilight';
  onChangeDayNightMode: (mode: 'sunny' | 'twilight') => void;
}

export const headlineSuggestions: HeadlineCopySuggestion[] = [
  {
    id: 'hl-poetic',
    category: 'Epic Editorial',
    headline: 'Where Azure Skies Dissolve Into Infinity',
    subHeadline: 'Experience a sanctuary where modern glass architecture floats effortlessly above the tide.',
    justification: 'Evocative and emotional. Combines the natural horizon with the physical pool layout, inviting immediate physical escape.'
  },
  {
    id: 'hl-bold',
    category: 'Sleek & Contemporary',
    headline: 'The Art of Floating',
    subHeadline: 'A magnificent two-story architectural marvel framed in glass, cedar wood, and pure liquid light.',
    justification: 'Focuses heavily on architectural identity and design. It sounds like an architectural digest front cover, catering to premium modern design tastes.'
  },
  {
    id: 'hl-quiet',
    category: 'Quiet Luxury',
    headline: 'Your Private Sanctuary Awaits',
    subHeadline: 'Unrivaled tropical design featuring expansive glass panels, sun-bleached decks, and secluded tropical vegetation.',
    justification: 'Welcoming, cozy yet ultra-exclusive. Uses verbs & private tags to build feelings of proprietary ownership, safety, and silence.'
  }
];

export default function DesignManual({
  selectedHeadlineIndex,
  onSelectHeadline,
  bgOverlayOpacity,
  onSetBgOverlayOpacity,
  contrastMode,
  onSetContrastMode,
  fontSizePreset,
  onSetFontSizePreset,
  dayNightMode,
  onChangeDayNightMode
}: DesignManualProps) {
  const [activeTab, setActiveTab] = React.useState<'copy' | 'typography' | 'colors' | 'layout' | 'controls'>('copy');

  return (
    <div className="flex flex-col h-full bg-[#0d0e14]/95 border-l border-white/10 overflow-hidden shadow-2xl" id="design-manual-panel">
      {/* Drawer Header */}
      <div className="p-6 border-b border-white/10 bg-[#07080b]/90 flex items-center justify-between" id="manual-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-md border border-amber-500/30">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="font-display text-sm tracking-widest text-white font-medium">DESIGN STUDIO</h2>
            <p className="text-[10px] uppercase tracking-wider text-amber-400/80 font-mono">Interactive Guidelines</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5">
          <button
            id="toggle-sunny"
            onClick={() => onChangeDayNightMode('sunny')}
            className={`px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase rounded-md transition-all ${
              dayNightMode === 'sunny' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sunny
          </button>
          <button
            id="toggle-twilight"
            onClick={() => onChangeDayNightMode('twilight')}
            className={`px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase rounded-md transition-all ${
              dayNightMode === 'twilight' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-gray-400 hover:text-white'
            }`}
          >
            Twilight
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-black/20" id="manual-tabs">
        {(['copy', 'colors', 'typography', 'layout', 'controls'] as const).map((tab) => (
          <button
            key={tab}
            id={`tab-btn-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center text-xs font-mono tracking-wider capitalize border-b-2 transition-all relative ${
              activeTab === tab 
                ? 'border-amber-400 text-white bg-white/[0.03]' 
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.01]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" id="manual-content">
        {activeTab === 'copy' && (
          <div className="space-y-5 animate-fade-in" id="copy-tab-pane">
            <div className="space-y-2">
              <h3 className="font-display text-sm text-white tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                LUXURIOUS COPYWRITING
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                When designing for high-end hospitality, the language must be atmospheric rather than transactional. Use sensory verbs and evoke spatial depth.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {headlineSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  id={`headline-option-${index}`}
                  onClick={() => onSelectHeadline(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all space-y-3 ${
                    selectedHeadlineIndex === index
                      ? 'bg-amber-500/5 gold-border-glow'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded">
                      {suggestion.category}
                    </span>
                    {selectedHeadlineIndex === index && (
                      <Check className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-white tracking-wide">{suggestion.headline}</h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed italic">"{suggestion.subHeadline}"</p>
                  </div>
                  <div className="pt-2 border-t border-white/[0.06]">
                    <p className="text-[10px] text-amber-400/80 font-mono italic">
                      💡 Reason: {suggestion.justification}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-5" id="colors-tab-pane">
            <div className="space-y-2">
              <h3 className="font-display text-sm text-white tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                GOLDEN & TROPICAL MATRICES
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                To guarantee white-hot web accessibility against sunny architectural glass, we map custom colors reflecting sun-baked luxury and deep ocean shadows.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white">White-Hot Legibility</span>
                  <span className="text-[10px] font-mono text-gray-400">#FFFFFF / #F1F5F9</span>
                </div>
                <div className="h-3 rounded bg-white w-full border border-white/20"></div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Pure pristine whites reflect daylight and represent modern sanitizers/luxury linens. They stand out when paired with a <strong className="text-gray-200">dimming backdrop card with 45%+ opacity</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-medium">Sahara Gold (Core Accent)</span>
                  <span className="text-[10px] font-mono text-gray-400">#CD9E4D</span>
                </div>
                <div className="h-3 rounded bg-amber-500 w-full"></div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  A balanced champagne gold with dark undertones that never bleaches under outdoor sunshine. Standardizes CTA borders, highlights, and logos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-teal-400">Aqua Lagoon (Deep Backdrop/Water)</span>
                  <span className="text-[10px] font-mono text-gray-400">#0B5C6C</span>
                </div>
                <div className="h-3 rounded bg-teal-600 w-full"></div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  An elegant tone sourced automatically from the glass bottom of the infinity pool. Gives a highly integrated, natural site flow when framing content.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-5" id="typography-tab-pane">
            <div className="space-y-2">
              <h3 className="font-display text-sm text-white tracking-wider flex items-center gap-2">
                <Type className="w-4 h-4 text-amber-400" />
                HIGH-CONTRAST TYPOGRAPHYSTYLE
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Legibility on bright background requires distinct weight hierarchies. Serifs provide the editorial vibe; crisp mono values represent the coordinates and metrics.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-[11px] font-mono uppercase text-amber-400">Headings: Cormorant Garamond</h4>
                <p className="font-serif text-2xl text-white">Primacy & Radiance</p>
                <p className="text-[11px] text-gray-400 leading-normal">
                  An elegant editorial serif mimicking physical high-fashion hotel brochures. Styled with tracking tight and italicized accents.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-[11px] font-mono uppercase text-teal-300">Body & Controls: Plus Jakarta</h4>
                <p className="text-sm font-sans font-medium text-white">Minimalist Geometric Comfort</p>
                <p className="text-[11px] text-gray-400 leading-normal">
                  A modern, ultra-clean neutral typeface. Optimized for high screen density booking widgets and interactive inputs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-[11px] font-mono uppercase text-amber-200">Data, Specs & Dates: JetBrains</h4>
                <p className="text-xs font-mono text-white">LATITUDE: -8.4095° S, 115.1889° E</p>
                <p className="text-[11px] text-gray-400 leading-normal">
                  Provides high-status telemetry accents. Perfect for hotel check-in/out dates, guest counts, and status readouts.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-5" id="layout-tab-pane">
            <div className="space-y-2">
              <h3 className="font-display text-sm text-white tracking-wider flex items-center gap-2">
                <Layout className="w-4 h-4 text-amber-400" />
                OBSTRUCTION-FREE LAYOUT
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                A luxury hotel background must not be hidden. Arrange UI cards to frame the architecture rather than clog the center.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <h4 className="text-xs font-mono text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Glistening Text Shadows
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  We programmatically attach subtle blurred black drop shadows (<code className="text-amber-300">drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]</code>) or custom dark soft-blurs to ensure white characters stay crystal clear even over bright white sand dunes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <h4 className="text-xs font-mono text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Horizontal Floating Frame
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  By placing the booking widget strictly at the bottom border of the screen, we frame the infinity pool water, acting as a visual base, while leaving the two-story glass lounge completely open in the viewport.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <h4 className="text-xs font-mono text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Sliding Glass Doors Portal
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Our custom intro portal simulates walking into the villa. As the user enters, glass sliding panels smoothly split apart, creating physical dimension and true luxurious theater.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'controls' && (
          <div className="space-y-5" id="controls-tab-pane">
            <div className="space-y-2">
              <h3 className="font-display text-sm text-white tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                VISUAL ADJUSTMENTS
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Tweak parameters dynamically to observe how different contrast methods affect the aesthetics and usability of the hotel hero section.
              </p>
            </div>

            <div className="space-y-4">
              {/* Overlay Opacity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">Ambient Shade Intensity</span>
                  <span className="text-amber-400">{Math.round(bgOverlayOpacity * 100)}%</span>
                </div>
                <input
                  id="overlay-opacity-range"
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={bgOverlayOpacity}
                  onChange={(e) => onSetBgOverlayOpacity(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-gray-400">
                  Dims the bright sunny backdrop to prioritize read-ease of the fine print elements.
                </p>
              </div>

              {/* Contrast Mode Radios */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono text-gray-300">Text Legibility Overlay</label>
                <div className="grid grid-cols-2 gap-2" id="contrast-options-grid">
                  {[
                    { id: 'shadow-deep', name: 'Text Drop Shadow' },
                    { id: 'text-glow', name: 'Ambient Halo Glow' },
                    { id: 'glass-card', name: 'Glassmorphic Card' },
                    { id: 'neutral', name: 'Minimal Neutral' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      id={`contrast-mode-${mode.id}`}
                      onClick={() => onSetContrastMode(mode.id as any)}
                      className={`py-2 px-3 text-left rounded-lg text-[11px] font-mono border transition-all ${
                        contrastMode === mode.id
                          ? 'border-amber-400 bg-amber-500/10 text-white'
                          : 'border-white/5 bg-black/20 text-gray-400 hover:text-white'
                      }`}
                    >
                      {mode.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* FontSizePreset Radios */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono text-gray-300">Typography Scale Theme</label>
                <div className="grid grid-cols-3 gap-1.5" id="scale-options-grid">
                  {[
                    { id: 'editorial', label: 'Editorial' },
                    { id: 'architectural', label: 'Arch' },
                    { id: 'minimalist', label: 'Minimalist' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      id={`font-preset-${preset.id}`}
                      onClick={() => onSetFontSizePreset(preset.id as any)}
                      className={`py-1.5 px-1 text-center rounded-lg text-[10px] uppercase tracking-wider font-mono border transition-all ${
                        fontSizePreset === preset.id
                          ? 'border-amber-400 bg-amber-500/15 text-amber-300'
                          : 'border-white/5 bg-black/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer credits in manual */}
      <div className="p-4 bg-[#07080b]/90 border-t border-white/5 text-center text-[10px] font-mono text-gray-500" id="manual-footer">
        ROYAL CREST COOPERATIVE &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}
