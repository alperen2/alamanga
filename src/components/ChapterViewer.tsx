'use client';

import { useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ChapterViewerProps {
  mangaId: string;
  chapterNumber: string;
  pages: Array<{
    id: number;
    imageUrl: string;
  }>;
}

export default function ChapterViewer({ mangaId, chapterNumber, pages }: ChapterViewerProps) {
  const [readingMode, setReadingMode] = useState<'vertical' | 'slider'>('vertical');
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (readingMode === 'slider') {
        if (e.key === 'ArrowLeft') {
          setCurrentPage(prev => Math.max(1, prev - 1));
        } else if (e.key === 'ArrowRight') {
          setCurrentPage(prev => Math.min(pages.length, prev + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mounted, readingMode, pages.length]);

  if (!mounted) {
    return (
      <div className="relative aspect-[2/3]">
        <Image
          src={pages[0].imageUrl}
          alt="First Page"
          fill
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 py-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href={`/manga/${mangaId}`}
              className="text-blue-500 hover:text-blue-600"
            >
              ← Back to Manga
            </Link>
            <h1 className="text-xl font-bold">Chapter {chapterNumber}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={readingMode}
              onChange={(e) => setReadingMode(e.target.value as 'vertical' | 'slider')}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <option value="vertical">Vertical Reading</option>
              <option value="slider">Slider Reading</option>
            </select>
            
            {readingMode === 'slider' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {pages.length}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(pages.length, prev + 1))}
                  disabled={currentPage === pages.length}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {readingMode === 'vertical' ? (
          <div className="space-y-4">
            {pages.map((page) => (
              <div key={page.id} className="relative aspect-[2/3]">
                <Image
                  src={page.imageUrl}
                  alt={`Page ${page.id}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative aspect-[2/3]">
            <Image
              src={pages[currentPage - 1].imageUrl}
              alt={`Page ${currentPage}`}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
} 