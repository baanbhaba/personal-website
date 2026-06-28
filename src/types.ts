/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PhotoFrame {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  views: string;
  downloads: string;
  location: string;
  camera: string;
  settings: string;
  description: string;
}

export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  theme: 'saffron' | 'terracotta' | 'deep-rose' | 'indigo';
  timestamp: string;
}

export interface Dotfile {
  name: string;
  path: string;
  content: string;
  language: 'bash' | 'lua' | 'vim';
}
