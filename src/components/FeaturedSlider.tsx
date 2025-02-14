'use client';

import { useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedManga {
  id: number;
  title: string;
  cover: string;
  description: string;
}

const featuredManga: FeaturedManga[] = [
  {
    id: 1,
    title: "One Piece",
    cover: "/manga-covers/one-piece.jpg",
    description: "Follow Monkey D. Luffy and his pirate crew in their search for the ultimate treasure, the One Piece."
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    cover: "/manga-covers/jjk.jpg",
    description: "A boy fights... to be killed. The story of Yuji Itadori, who joined the Jujutsu Sorcerers to fight against Curses."
  },
  {
    id: 3,
    title: "Chainsaw Man",
    cover: "/manga-covers/chainsaw.jpg",
    description: "Denji's life of poverty changes forever when he merges with his pet chainsaw devil to become Chainsaw Man!"
  }
];

export default function FeaturedSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredManga.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const manga = featuredManga[currentSlide];

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
      {mounted ? (
        <>
          {featuredManga.map((manga, index) => (
            <div
              key={manga.id}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Link href={`/manga/${manga.id}`} className="block relative w-full h-full">
                <Image
                  src={manga.cover}
                  alt={manga.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{manga.title}</h2>
                  <p className="text-gray-200">{manga.description}</p>
                </div>
              </Link>
            </div>
          ))}
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featuredManga.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <Link href={`/manga/${manga.id}`} className="block relative w-full h-full">
          <Image
            src={manga.cover}
            alt={manga.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
            <h2 className="text-3xl font-bold text-white mb-2">{manga.title}</h2>
            <p className="text-gray-200">{manga.description}</p>
          </div>
        </Link>
      )}
    </div>
  );
} 