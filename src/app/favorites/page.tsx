'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FavoriteManga {
  id: number;
  title: string;
  cover: string;
  status: 'ongoing' | 'finished' | 'dropped';
  lastRead: string;
  currentChapter: number;
  totalChapters: number;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteManga[]>([
    {
      id: 1,
      title: "One Piece",
      cover: "/manga-covers/one-piece.jpg",
      status: "ongoing",
      lastRead: "2024-02-08",
      currentChapter: 1089,
      totalChapters: 1089
    },
    // Add more favorites here
  ]);

  const [view, setView] = useState<'grid' | 'list'>('grid');

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(manga => manga.id !== id));
  };

  const getStatusColor = (status: FavoriteManga['status']) => {
    switch (status) {
      case 'ongoing': return 'bg-green-500';
      case 'finished': return 'bg-blue-500';
      case 'dropped': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Favorites</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg ${
              view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg ${
              view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No Favorites Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start adding manga to your favorites to keep track of them here.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Manga
          </Link>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((manga) => (
            <div key={manga.id} className="relative group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src={manga.cover}
                  alt={manga.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() => removeFavorite(manga.id)}
                    className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 18L18 6M6 6l12 12"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <Link href={`/manga/${manga.id}`}>
                    <h3 className="text-white font-semibold mb-1">{manga.title}</h3>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(manga.status)}`}>
                      {manga.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((manga) => (
            <div
              key={manga.id}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg"
            >
              <div className="relative w-24 h-32">
                <Image
                  src={manga.cover}
                  alt={manga.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <Link href={`/manga/${manga.id}`}>
                  <h3 className="text-xl font-semibold mb-2">{manga.title}</h3>
                </Link>
                <div className="flex items-center gap-4 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(manga.status)}`}>
                    {manga.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Last read: {manga.lastRead}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/manga/${manga.id}/chapter/${manga.currentChapter}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Continue Chapter {manga.currentChapter}
                  </Link>
                  <span className="text-sm text-gray-500">
                    Progress: {manga.currentChapter}/{manga.totalChapters}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeFavorite(manga.id)}
                className="p-2 text-gray-500 hover:text-red-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 