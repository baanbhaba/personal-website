/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import PhotoFrames from './components/PhotoFrames';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-on-surface grain-overlay selection:bg-saffron selection:text-black">
      {/* Navbar header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="space-y-4 pb-12">
        {/* Hero Section */}
        <Hero />

        {/* About & Linux Terminal Row */}
        <AboutSection />

        {/* Photographic Frames & Music Synth Row */}
        <PhotoFrames />

        {/* Contact Guestbook Block */}
        <Guestbook />
      </main>

      {/* Footer Branding */}
      <Footer />
    </div>
  );
}
