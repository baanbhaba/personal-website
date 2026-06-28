/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Disc, ExternalLink, Library, ChevronRight, Sparkles } from 'lucide-react';

interface AlbumConfig {
  title: string;
  year: string;
  url: string;
  coverDescription: string;
  badge: string;
}

interface ArtistConfig {
  id: string;
  name: string;
  genre: string;
  accentColor: string;
  bgHex: string;
  quote: string;
  albums: AlbumConfig[];
}

const ARTISTS: ArtistConfig[] = [
  {
    id: 'kendrick',
    name: 'Kendrick Lamar',
    genre: 'Conscious Hip-Hop',
    accentColor: 'bg-saffron text-black border-saffron',
    bgHex: '#E5A93B',
    quote: "The culture-defining giant of Compton. Unmatched storytelling, sharp flows, and Pulitzer-winning narrative complexity.",
    albums: [
      {
        title: 'To Pimp a Butterfly',
        year: '2015',
        url: 'https://music.apple.com/in/album/to-pimp-a-butterfly/974187289',
        coverDescription: 'A monumental milestone of conscious rap, jazz fusion, and spoken word poetry.',
        badge: 'MASTERPIECE'
      },
      {
        title: 'Mr. Morale & The Big Steppers',
        year: '2022',
        url: 'https://music.apple.com/in/album/mr-morale-the-big-steppers/1623854804',
        coverDescription: 'A raw, introspective double-album masterpiece.',
        badge: 'RAW'
      },
      {
        title: 'DAMN.',
        year: '2017',
        url: 'https://music.apple.com/in/album/damn/1440860105',
        coverDescription: 'Pulitzer Prize-winning sonic perfection.',
        badge: 'CLASSIC'
      },
      {
        title: 'good kid, m.A.A.d city',
        year: '2012',
        url: 'https://music.apple.com/in/album/good-kid-m-a-a-d-city-deluxe-version/1440818890',
        coverDescription: 'A cinematic street novel in musical form.',
        badge: 'ESSENTIAL'
      }
    ]
  },
  {
    id: 'frank',
    name: 'Frank Ocean',
    genre: 'Avant-Garde R&B',
    accentColor: 'bg-turmeric text-black border-turmeric',
    bgHex: '#E07A5F',
    quote: "Atmospheric storytelling, beautiful minimalist instrumentation, and raw emotional depth that redefined modern alternative R&B.",
    albums: [
      {
        title: 'Blonde',
        year: '2016',
        url: 'https://music.apple.com/in/album/blonde/1146195596',
        coverDescription: 'A sweeping, avant-garde collage of memory, guitar, and vocal pitches.',
        badge: 'MASTERPIECE'
      },
      {
        title: 'Channel Orange',
        year: '2012',
        url: 'https://music.apple.com/in/album/channel-orange/1441474453',
        coverDescription: 'A vivid, sunny-yet-melancholic exploration of youth and heartbreak.',
        badge: 'CLASSIC'
      }
    ]
  },
  {
    id: 'kanye',
    name: 'Kanye West',
    genre: 'Art-Pop Hip-Hop',
    accentColor: 'bg-deep-rose text-white border-deep-rose',
    bgHex: '#D1495B',
    quote: "One of the most influential and genre-bending artists of the 21st century. Bold production, high-concept visual directions, and timeless hooks.",
    albums: [
      {
        title: 'My Beautiful Dark Twisted Fantasy',
        year: '2010',
        url: 'https://music.apple.com/in/album/my-beautiful-dark-twisted-fantasy/1440742903',
        coverDescription: 'Maximalist orchestration and unmatched grandeur.',
        badge: 'PERFECTION'
      },
      {
        title: 'Yeezus',
        year: '2013',
        url: 'https://music.apple.com/in/album/yeezus/1440871676',
        coverDescription: 'A minimalist, abrasive industrial punk-rap roar.',
        badge: 'EXPERIMENTAL'
      },
      {
        title: 'Graduation',
        year: '2007',
        url: 'https://music.apple.com/in/album/graduation/1440824011',
        coverDescription: 'Electronic-infused stadium-sized anthems.',
        badge: 'ICONIC'
      },
      {
        title: 'The College Dropout',
        year: '2004',
        url: 'https://music.apple.com/in/album/the-college-dropout/1441151613',
        coverDescription: 'Warm, chipmunk-soul-fueled classic hip-hop debut.',
        badge: 'DEBUT CLASSIC'
      }
    ]
  },
  {
    id: 'fred',
    name: 'Fred again..',
    genre: 'Organic Electronic',
    accentColor: 'bg-terracotta text-white border-terracotta',
    bgHex: '#C05A46',
    quote: "Beautiful house beats built on intimate vocal samples, voice notes, and real-life field recordings.",
    albums: [
      {
        title: 'Actual Life 3',
        year: '2022',
        url: 'https://music.apple.com/in/album/actual-life-3-january-1-september-9-2022/1641885669',
        coverDescription: 'Euphoric dance records stitched from raw memory fragments.',
        badge: 'ESSENTIAL'
      },
      {
        title: 'Actual Life 2',
        year: '2021',
        url: 'https://music.apple.com/in/album/actual-life-2-november-5-2021-january-15-2022/1590740924',
        coverDescription: 'A gorgeous exploration of hope, friendship, and grief.',
        badge: 'DEEP CHILL'
      },
      {
        title: 'Actual Life 1',
        year: '2021',
        url: 'https://music.apple.com/in/album/actual-life-april-14-december-17-2020/1557262459',
        coverDescription: 'The revolutionary pandemic-era diaristic record.',
        badge: 'DEBUT'
      }
    ]
  }
];

export default function AnalogSynth() {
  const [activeArtistId, setActiveArtistId] = useState<string>('kendrick');

  const activeArtist = ARTISTS.find((a) => a.id === activeArtistId) || ARTISTS[0];

  return (
    <div id="music" className="lg:col-span-2 flex flex-col justify-between">
      {/* Neo-Brutalist Music Crate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="bg-indigo-blue border-2 border-black rounded-2xl p-5 md:p-6 shadow-solid-rose text-white flex flex-col justify-between h-full relative overflow-hidden transform rotate-1 hover:rotate-0 hover:scale-[1.01] transition-all duration-300"
      >
        {/* Sticky Vinyl Tag */}
        <div className="absolute top-3 right-3 opacity-90 z-10 pointer-events-none transform rotate-12 bg-saffron text-black border border-black font-sans font-black text-[9px] tracking-widest px-2.5 py-1 rounded shadow-sm uppercase">
          HEAVY ROTATION ⚡
        </div>

        <div className="space-y-4 z-10 mb-5">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-4xl sm:text-5xl text-black bg-turmeric px-4 py-1.5 rounded-lg border-2 border-black shadow-solid-dark tracking-tighter uppercase inline-block transform -rotate-1 select-none">
              /MUSIC
            </h2>
            <Music className="w-6 h-6 text-saffron animate-bounce" />
          </div>
          <p className="font-serif italic text-base md:text-lg text-saffron leading-snug">
            Crate Digging: My Active Soundtrack & Inspiration
          </p>
          <p className="font-sans text-xs leading-relaxed text-dusty-rose font-medium">
            Explore the specific artist directories and their iconic albums shaping my workspace rhythm. Click any record to stream directly on Apple Music.
          </p>

          {/* Interactive Artist Selector Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {ARTISTS.map((artist) => {
              const isActive = artist.id === activeArtistId;
              return (
                <button
                  key={artist.id}
                  onClick={() => setActiveArtistId(artist.id)}
                  className={`px-4 py-2 rounded-xl font-sans font-black text-xs uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-saffron text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]'
                      : 'bg-[#1a1110] text-dusty-rose border-black/40 hover:text-white hover:bg-black/30'
                  }`}
                >
                  {artist.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Artist Vinyl Storage Box */}
        <div className="relative z-10 flex-1 flex flex-col justify-between bg-black/45 border-2 border-black rounded-xl p-4 shadow-inner">
          <div className="mb-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Disc className="w-5 h-5 text-saffron animate-spin-slow" />
                <h3 className="font-display text-xl sm:text-2xl tracking-tight leading-none text-white uppercase font-black">
                  {activeArtist.name}
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase font-black px-2.5 py-1 rounded-lg border-2 border-black bg-white text-black shadow-sm">
                {activeArtist.genre}
              </span>
            </div>

            {/* Quote of artist vibe */}
            <p className="font-sans text-xs text-dusty-rose/90 italic leading-relaxed pt-1">
              "{activeArtist.quote}"
            </p>
          </div>

          {/* Album Crate Listings - Interactive elements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
            <AnimatePresence mode="wait">
              {activeArtist.albums.map((album, idx) => (
                <motion.a
                  key={album.title}
                  href={album.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-[#120b0a] hover:bg-[#1a100f] border-2 border-black rounded-xl p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[9px] font-black text-saffron uppercase tracking-widest">
                        {album.year}
                      </span>
                      <span className="bg-white/10 text-white font-mono text-[8px] font-black px-1.5 rounded uppercase">
                        {album.badge}
                      </span>
                    </div>
                    <h4 className="font-display text-sm text-white uppercase font-bold leading-tight group-hover:text-saffron transition-colors">
                      {album.title}
                    </h4>
                    <p className="font-sans text-[10px] text-gray-400 leading-snug line-clamp-1">
                      {album.coverDescription}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-saffron group-hover:text-black group-hover:border-black transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer system details */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-dusty-rose/40">
            <span className="flex items-center gap-1">
              <Library className="w-3.5 h-3.5 text-dusty-rose/40" />
              SELECT ALBUM TO STREAM
            </span>
            <span className="font-bold tracking-widest text-saffron">
              NEO-CRATE DIGGING v2.1
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
