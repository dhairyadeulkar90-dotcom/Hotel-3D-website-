/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, ArrowRight, Sun, Moon } from 'lucide-react';

interface CinematicIntroProps {
  key?: string;
  onEnterResort: () => void;
  dayNightMode: 'sunny' | 'twilight';
  onChangeDayNightMode: (mode: 'sunny' | 'twilight') => void;
}

export default function CinematicIntro({
  onEnterResort,
  dayNightMode,
  onChangeDayNightMode
}: CinematicIntroProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [loadingText, setLoadingText] = useState('Initiating Sanctuary Holo-grid...');
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play video and handle fallback timer once Loaded
  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay block or interruption:', err);
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && !videoEnded) {
      // 15 seconds safety backup in case video fails to fire onEnded due to network/browser constraints
      const backupTimer = setTimeout(() => {
        setVideoEnded(true);
      }, 15000);
      return () => clearTimeout(backupTimer);
    }
  }, [isLoaded, videoEnded]);

  // Web Audio Hook / Synth Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  // Preloader emulation
  useEffect(() => {
    const textStages = [
      'Polishing structural glass panels...',
      'Filling horizontal infinity reservoir...',
      'Setting sun azimuth to 34.5°...',
      'Calibrating cedar wood grain textures...',
      'Synthesizing ambient tropical ocean tide...',
      'Establishing Royal Crest Sanctuary...'
    ];

    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        
        // Random incremental steps
        const step = Math.floor(Math.random() * 12) + 5;
        const next = Math.min(prev + step, 100);
        
        // Update loaded text details selectively
        const stageIndex = Math.min(
          Math.floor((next / 100) * textStages.length),
          textStages.length - 1
        );
        setLoadingText(textStages[stageIndex]);
        
        return next;
      });
    }, 180);

    return () => clearInterval(timer);
  }, []);

  // Web Audio ocean waves synthesizer
  const startAmbientSynth = () => {
    try {
      if (audioCtxRef.current) return; // Already running

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.08, ctx.currentTime); // keep it extremely pleasant and gentle
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      // Create procedural pinkish wave simulator
      const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const outputChannel = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        outputChannel[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.Q.setValueAtTime(1.0, ctx.currentTime);
      lowpass.frequency.setValueAtTime(350, ctx.currentTime);
      filterNodeRef.current = lowpass;

      noiseSource.connect(lowpass);
      lowpass.connect(mainGain);
      noiseSource.start(0);

      // Create LFO to modulate the filter frequency for wave swells
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 seconds wave period
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(180, ctx.currentTime); // modulation depth in Hz

      lfo.connect(lfoGain);
      lfoGain.connect(lowpass.frequency); // modulate lowpass filter cutoff
      lfo.start(0);

      playChime(ctx, mainGain);
    } catch (err) {
      console.warn('Audio Context compilation skipped due to browser constraints.', err);
    }
  };

  const playChime = (ctx: AudioContext, destination: AudioNode) => {
    const freqs = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major chord
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
      
      oscGain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
      oscGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + idx * 0.1 + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 2.5);
      
      osc.connect(oscGain);
      oscGain.connect(destination);
      
      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 3);
    });
  };

  const toggleMute = () => {
    setIsAudioMuted(!isAudioMuted);
    if (!gainNodeRef.current) return;
    
    const ctx = audioCtxRef.current;
    if (ctx) {
      const targetVolume = !isAudioMuted ? 0 : 0.08;
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 0.3);
    }
  };

  const handleStartCinematic = () => {
    startAmbientSynth();
  };

  const triggerFlythrough = () => {
    setIsEntering(true);
    startAmbientSynth();
    if (audioCtxRef.current && gainNodeRef.current) {
      playChime(audioCtxRef.current, gainNodeRef.current);
    }
    
    setTimeout(() => {
      onEnterResort();
    }, 3000);
  };

  // Turn off synth on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#06070a] overflow-hidden flex flex-col justify-between" 
      id="cinematic-canvas-portal"
      style={{
        transition: 'transform 3000ms cubic-bezier(0.16, 1, 0.3, 1), opacity 3000ms ease, scale 3000ms cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isEntering ? 'translateY(-100%) scale(0.95)' : 'translateY(0) scale(1)',
        opacity: isEntering ? 0 : 1,
      }}
    >
      
      {/* Background Ambience Video Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle radial shadow to shape cinematic vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,0,0,0)_20%,rgba(6,7,10,0.95)_100%] z-10" />
        
        {/* Cinematic Villa Background active video loop */}
        <video
          id="intro-bg-video-loop"
          ref={videoRef}
          autoPlay={false}
          muted
          playsInline
          onEnded={() => setVideoEnded(true)}
          className="absolute inset-0 w-full h-full object-cover origin-center"
          style={{
            filter: dayNightMode === 'twilight' ? 'hue-rotate(240deg) brightness(0.4) contrast(1.15)' : 'brightness(0.95)',
          }}
        >
          <source src="https://res.cloudinary.com/dh3xdbqod/video/upload/v1781901367/Create_villa_hero_animation_202606192205_opmc7i.mp4" type="video/mp4" />
        </video>
        
        {/* Swimmer Emulation on Infinity pool edge */}
        {!isEntering && (
          <div className="absolute top-[58%] left-[45%] z-10 w-96 h-20 opacity-40 mix-blend-screen pointer-events-none" id="water-rippler">
            <div className="absolute animate-ping w-4 h-2 bg-white/40 rounded-full blur-[2px]" style={{ animationDuration: '3s' }} />
            <div className="absolute animate-ping w-8 h-3 bg-white/20 rounded-full blur-[4px] delay-1000" style={{ animationDuration: '4s' }} />
            <div className="absolute animate-pulse w-32 h-6 bg-cyan-400/10 rounded-full blur-md" />
          </div>
        )}
      </div>



      {/* Main Core Viewport - Dynamic Interactive Cinematic Reveal */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-6 text-center" id="cinematic-portal-focus">
        <AnimatePresence mode="wait">
          {!isLoaded ? (
            <motion.div
              key="preloader"
              className="max-w-md w-full space-y-6 bg-black/60 p-8 rounded-2xl border border-white/5 backdrop-blur-xl"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              id="loading-shield"
            >
              <div className="flex justify-center relative">
                <div className="w-16 h-16 rounded-full border-2 border-amber-300/20 border-t-amber-400 animate-spin flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-teal-400/30 animate-pulse flex items-center justify-center bg-black/60">
                    <span className="text-[10px] font-display text-amber-200">RC</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-white text-sm tracking-[0.3em] font-medium uppercase">
                  ROYAL CREST
                </h2>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-mono">
                  Loading Immersive Architecture
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span className="text-amber-300/80 uppercase tracking-wider">{loadingText}</span>
                  <span>{loadingProgress}%</span>
                </div>
              </div>
            </motion.div>
          ) : videoEnded ? (
            <motion.div
              key="hero-hub"
              className="max-w-3xl space-y-12"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              id="ready-card"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  id="brand-crown"
                >
                  <span className="text-[10px] uppercase font-mono tracking-[0.5em] text-amber-400 font-medium">
                    An Architectural Masterpiece
                  </span>
                </motion.div>

                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-[0.18em] leading-none uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]">
                  ROYAL <span className="font-medium text-amber-300">CREST</span>
                </h1>

                <p className="max-w-xl mx-auto text-xs sm:text-sm tracking-[0.32em] text-color-wash/85 font-mono uppercase leading-relaxed text-gray-300">
                  Curated Bali Adventure / Retreat
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                id="entry-triggers"
              >
                <button
                  id="cinematic-portal-btn"
                  onClick={triggerFlythrough}
                  disabled={isEntering}
                  className="px-8 py-4 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-amber-500/20 flex items-center gap-2"
                >
                  {isEntering ? 'Entering Sanctuary...' : 'Begin Journey'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Volumetric Blooming Lens Flare Effect on Entrance */}
      <AnimatePresence>
        {isEntering && (
          <motion.div
            id="lens-flare-flash"
            className="absolute inset-0 bg-gradient-to-b from-amber-200/20 via-amber-100/30 to-amber-900/10 backdrop-blur-[3px] pointer-events-none z-30 mix-blend-color-dodge"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            transition={{ duration: 2.3, times: [0, 0.4, 1], ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
