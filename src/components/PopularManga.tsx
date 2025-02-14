'use client';

import Image from 'next/image';
import { useState, useLayoutEffect } from 'react';
import Link from 'next/link';

interface Manga {
  id: number;
  title: string;
  cover: string;
  status: 'ongoing' | 'finished' | 'dropped';
  rating: number;
}

const popularManga: Manga[] = [
  {
    id: 1,
    title: "One Piece",
    cover: "/manga-covers/one-piece.jpg",
    status: "ongoing",
    rating: 4.9
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    cover: "/manga-covers/jjk.jpg",
    status: "ongoing",
    rating: 4.8
  },
  // Add more manga here
];

export default function PopularManga() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
    const savedFavorites = localStorage.getItem('mangaFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (mangaId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(mangaId)
        ? prev.filter(id => id !== mangaId)
        : [...prev, mangaId];
      
      localStorage.setItem('mangaFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const getStatusColor = (status: Manga['status']) => {
    switch (status) {
      case 'ongoing': return 'bg-green-500';
      case 'finished': return 'bg-blue-500';
      case 'dropped': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">Popular Manga</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {popularManga.map((manga) => (
          <div key={manga.id} className="relative group">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Link href={`/manga/${manga.id}`} className="block relative w-full h-full">
                <Image
                  src={manga.cover}
                  alt={manga.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white font-semibold">{manga.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(manga.status)}`}>
                      {manga.status}
                    </span>
                    <span className="text-yellow-400 text-sm">★ {manga.rating}</span>
                  </div>
                </div>
              </Link>
              {mounted && (
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() => toggleFavorite(manga.id)}
                    className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    <svg
                      className={`w-6 h-6 ${
                        favorites.includes(manga.id) ? 'text-red-500' : 'text-white'
                      }`}
                      fill={favorites.includes(manga.id) ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 