/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, Star, GitFork, ExternalLink, RefreshCw, ChevronRight, FileText, Loader2 } from 'lucide-react';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  default_branch?: string;
  fork: boolean;
}

const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 1,
    name: 'project-alchemi',
    description: 'Experimental web application & creative alchemy project',
    html_url: 'https://github.com/baanbhaba/project-alchemi',
    stargazers_count: 0,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-08-13T12:25:16Z',
    default_branch: 'main',
    fork: false
  },
  {
    id: 2,
    name: 'personal-website',
    description: 'Personal portfolio website showcasing Linux rice, photos, and projects',
    html_url: 'https://github.com/baanbhaba/personal-website',
    stargazers_count: 0,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-08-02T11:23:56Z',
    default_branch: 'main',
    fork: false
  },
  {
    id: 3,
    name: 'linux-config',
    description: 'My custom Linux rice dotfiles and system setup',
    html_url: 'https://github.com/baanbhaba/linux-config',
    stargazers_count: 0,
    forks_count: 0,
    language: 'Shell',
    updated_at: '2026-07-28T06:21:22Z',
    default_branch: 'main',
    fork: false
  },
  {
    id: 4,
    name: 'waybar-config',
    description: 'Minimalist and aesthetic Waybar layout & styling',
    html_url: 'https://github.com/baanbhaba/waybar-config',
    stargazers_count: 0,
    forks_count: 0,
    language: 'CSS',
    updated_at: '2026-07-10T17:59:19Z',
    default_branch: 'main',
    fork: false
  },
  {
    id: 5,
    name: 'kitty-config',
    description: 'Kitty terminal emulator config files and color themes',
    html_url: 'https://github.com/baanbhaba/kitty-config',
    stargazers_count: 0,
    forks_count: 0,
    language: 'Shell',
    updated_at: '2026-07-10T17:59:26Z',
    default_branch: 'main',
    fork: false
  },
  {
    id: 6,
    name: 'rofi',
    description: 'Rofi application launcher configuration and themes',
    html_url: 'https://github.com/baanbhaba/rofi',
    stargazers_count: 0,
    forks_count: 0,
    language: 'Shell',
    updated_at: '2026-07-10T17:59:09Z',
    default_branch: 'main',
    fork: false
  }
];

const CATEGORY_DOTS: Record<string, string> = {
  Projects: 'bg-blue-400',
  Configs: 'bg-emerald-400',
  Docs: 'bg-amber-400',
  Default: 'bg-saffron'
};

function getRepoCategory(repoName: string): 'Projects' | 'Configs' | 'Docs' {
  const name = repoName.toLowerCase();
  if (name.includes('config') || name.includes('zshrc') || name.includes('rofi') || name.includes('mako') || name.includes('dotfiles')) {
    return 'Configs';
  }
  if (name.includes('doc') || name.includes('guide') || name.includes('notes') || name.includes('wiki') || name.includes('backup') || name.includes('python')) {
    return 'Docs';
  }
  return 'Projects';
}

export default function ProjectsPortfolio() {
  const [repos, setRepos] = useState<GithubRepo[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeRepoId, setActiveRepoId] = useState<number | null>(null);
  
  // README content state cache per repo name
  const [readmeMap, setReadmeMap] = useState<Record<string, string>>({});
  const [loadingReadme, setLoadingReadme] = useState<boolean>(false);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.github.com/users/baanbhaba/repos?sort=updated&per_page=15');
      if (!res.ok) throw new Error('API limit');
      const data: GithubRepo[] = await res.json();
      const filtered = data.filter((r) => !r.fork);
      if (filtered.length > 0) {
        setRepos(filtered);
        setActiveRepoId(filtered[0]?.id || null);
      }
    } catch {
      setRepos(FALLBACK_REPOS);
      setActiveRepoId(FALLBACK_REPOS[0]?.id || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const categories = ['All', 'Projects', 'Configs', 'Docs'];

  const filteredRepos = selectedCategory === 'All'
    ? repos
    : repos.filter((r) => getRepoCategory(r.name) === selectedCategory);

  const activeRepo = repos.find((r) => r.id === activeRepoId) || filteredRepos[0] || repos[0];

  // Sync activeRepoId when selectedCategory changes if current selection is not in filtered list
  useEffect(() => {
    if (filteredRepos.length > 0) {
      const exists = filteredRepos.some((r) => r.id === activeRepoId);
      if (!exists && filteredRepos[0]) {
        setActiveRepoId(filteredRepos[0].id);
      }
    }
  }, [selectedCategory, repos]);

  // Fetch raw README when activeRepo changes
  useEffect(() => {
    if (!activeRepo) return;
    if (readmeMap[activeRepo.name]) return; // already cached

    const fetchReadme = async () => {
      setLoadingReadme(true);
      try {
        let text = '';
        // Method 1: GitHub Official Repo API (handles any branch, filename case, or extension)
        const apiRes = await fetch(`https://api.github.com/repos/baanbhaba/${activeRepo.name}/readme`, {
          headers: { Accept: 'application/vnd.github.raw+json' }
        });

        if (apiRes.ok) {
          text = await apiRes.text();
        } else {
          // Method 2: Fallback direct raw URLs for main & master branches
          const branch = activeRepo.default_branch || 'main';
          const rawRes = await fetch(`https://raw.githubusercontent.com/baanbhaba/${activeRepo.name}/${branch}/README.md`);
          if (rawRes.ok) {
            text = await rawRes.text();
          } else {
            const masterRes = await fetch(`https://raw.githubusercontent.com/baanbhaba/${activeRepo.name}/master/README.md`);
            if (masterRes.ok) {
              text = await masterRes.text();
            } else {
              throw new Error('No README file');
            }
          }
        }
        
        // Clean up markdown headers/html to make a clean readable summary preview
        const cleaned = text
          .replace(/<!--[\s\S]*?-->/g, '') // strip HTML comments
          .replace(/<[^>]*>?/gm, '')       // strip HTML tags
          .replace(/^#+\s+/gm, '')          // strip markdown header hashes
          .replace(/!\[.*?\]\(.*?\)/g, '')   // strip markdown images
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip markdown links
          .replace(/`{3}[\s\S]*?`{3}/g, '')  // strip codeblocks
          .replace(/`([^`]+)`/g, '$1')      // strip inline code ticks
          .replace(/\n\s*\n/g, '\n')        // collapse multiple blank lines
          .trim();

        setReadmeMap((prev) => ({
          ...prev,
          [activeRepo.name]: cleaned || activeRepo.description || 'No detailed README content available.'
        }));
      } catch {
        setReadmeMap((prev) => ({
          ...prev,
          [activeRepo.name]: activeRepo.description || 'Linux configuration & developer repository.'
        }));
      } finally {
        setLoadingReadme(false);
      }
    };

    fetchReadme();
  }, [activeRepo?.id, activeRepo?.name]);

  return (
    <div className="bg-card-about border-2 border-black rounded-2xl p-4 md:p-6 shadow-solid-dark text-on-surface">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-black/10">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl sm:text-3xl text-white bg-deep-rose px-3 py-1 rounded-lg border-2 border-black shadow-solid-dark tracking-tighter uppercase inline-block transform -rotate-1">
            / GIT_REPOS
          </h2>
          <span className="font-mono text-xs text-dusty-rose font-bold">
            {repos.length} repositories
          </span>
        </div>

        {/* Category Filters & Refresh */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-black/80 p-1.5 rounded-xl border-2 border-black shadow-sm overflow-x-auto text-xs font-mono">
            <span className="text-[10px] text-saffron font-black uppercase px-1.5 hidden sm:inline">TYPE:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-black transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-saffron text-black border-black shadow-sm scale-105'
                    : 'bg-black/40 text-cream border-white/20 hover:border-saffron hover:text-saffron'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={fetchRepos}
            disabled={loading}
            className="p-2 bg-saffron text-black border-2 border-black rounded-xl shadow-sm hover:rotate-12 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            title="Sync live from GitHub"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Split Interactive View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Repo List (5 cols) */}
        <div className="lg:col-span-5 bg-black/30 border border-black/20 rounded-xl p-2 space-y-1.5 max-h-80 overflow-y-auto font-mono text-xs">
          {filteredRepos.map((repo) => {
            const isSelected = activeRepo?.id === repo.id;
            const category = getRepoCategory(repo.name);
            const dotColor = CATEGORY_DOTS[category] || CATEGORY_DOTS['Default'];
            return (
              <div
                key={repo.id}
                onClick={() => setActiveRepoId(repo.id)}
                className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-saffron text-black font-bold border-black shadow-sm'
                    : 'bg-surface/40 hover:bg-surface/80 text-on-surface/90 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                  <span className="truncate">{repo.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] shrink-0 opacity-80">
                  <span>★ {repo.stargazers_count}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-40'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail & Live README Inspector (7 cols) */}
        {activeRepo && (
          <div className="lg:col-span-7 bg-surface border-2 border-black rounded-xl p-4 flex flex-col justify-between shadow-solid-rose">
            <div>
              {/* Repo Title & Direct Link */}
              <div className="flex items-start justify-between gap-2 mb-3 pb-2 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-terracotta shrink-0" />
                  <h3 className="font-mono font-bold text-base text-on-surface">
                    {activeRepo.name}
                  </h3>
                </div>

                <a
                  href={activeRepo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 bg-saffron hover:bg-turmeric text-black px-2.5 py-1 rounded-lg border border-black font-mono font-bold text-xs transition-colors shadow-sm"
                >
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* README Summary Header */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-dusty-rose mb-2">
                <FileText className="w-3.5 h-3.5 text-deep-rose" />
                <span>README SUMMARY</span>
                {loadingReadme && <Loader2 className="w-3 h-3 animate-spin text-saffron ml-1" />}
              </div>

              {/* Live README Content Summary */}
              <div className="bg-black/30 border border-black/10 rounded-lg p-3 max-h-36 overflow-y-auto">
                <p className="font-sans text-xs text-on-surface/90 leading-relaxed whitespace-pre-wrap">
                  {readmeMap[activeRepo.name] || (loadingReadme ? 'Fetching repository README...' : (activeRepo.description || 'No detailed README summary found.'))}
                </p>
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="pt-3 mt-3 border-t border-black/10 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-dusty-rose text-[10px] font-bold">TYPE:</span>
                  <span className="bg-saffron/20 text-saffron border border-saffron/30 px-2 py-0.5 rounded text-[10px] font-bold">
                    {getRepoCategory(activeRepo.name)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-dusty-rose text-[10px] font-bold">LANG:</span>
                  <span className="bg-black/10 px-2 py-0.5 rounded text-[10px] font-bold text-on-surface">
                    {activeRepo.language || 'Code'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-dusty-rose text-xs font-bold">
                <span className="flex items-center gap-1 text-saffron">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {activeRepo.stargazers_count}
                </span>
                <span className="flex items-center gap-1 text-terracotta">
                  <GitFork className="w-3.5 h-3.5" />
                  {activeRepo.forks_count}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Live GitHub Activity Heatmap Graph Banner */}
      <div className="mt-5 pt-4 border-t-2 border-dashed border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface border-2 border-black rounded-xl p-4 shadow-sm">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-terracotta" />
            <h4 className="font-mono text-xs font-black tracking-wider uppercase text-on-surface">
              GITHUB CONTRIBUTION ACTIVITY ⚡
            </h4>
          </div>
          <p className="font-sans text-xs text-dusty-rose font-medium">
            Live contribution graph for <a href="https://github.com/baanbhaba" target="_blank" rel="noreferrer" className="underline font-bold text-terracotta hover:text-deep-rose">@baanbhaba</a>
          </p>
        </div>

        {/* Dynamic GitHub Graph Embed */}
        <div className="overflow-x-auto max-w-full">
          <img
            src="https://ghchart.rshah.org/f4a300/baanbhaba"
            alt="baanbhaba GitHub Contribution Graph"
            loading="lazy"
            decoding="async"
            className="h-20 sm:h-24 object-contain filter contrast-125 rounded bg-black/90 p-2 border border-black/20"
          />
        </div>
      </div>
    </div>
  );
}
