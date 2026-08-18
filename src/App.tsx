/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import PhotoFrames from './components/PhotoFrames';
import ProjectsPortfolio from './components/ProjectsPortfolio';
import SkillsShowcase from './components/SkillsShowcase';
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

        {/* Dedicated Skills Grid Showcase */}
        <SkillsShowcase />

        {/* Git Projects Portfolio Section (Full Width) */}
        <section id="projects" className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
          <ProjectsPortfolio />
        </section>

        {/* Contact Guestbook Block */}
        <Guestbook />
      </main>

      {/* Footer Branding */}
      <Footer />
    </div>
  );
}
