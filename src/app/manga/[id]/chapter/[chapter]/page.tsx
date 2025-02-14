import ChapterViewer from '@/components/ChapterViewer';

// This would normally come from an API
const chapterPages = [
  { id: 1, imageUrl: "/manga-pages/chapter-1-1.jpg" },
  { id: 2, imageUrl: "/manga-pages/chapter-1-2.jpg" },
  { id: 3, imageUrl: "/manga-pages/chapter-1-3.jpg" },
  // Add more pages...
];

export default function ChapterPage({
  params: { id, chapter }
}: {
  params: { id: string; chapter: string }
}) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <ChapterViewer
        mangaId={id}
        chapterNumber={chapter}
        pages={chapterPages}
      />

      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <textarea
            placeholder="Write a comment..."
            className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 mb-4"
            rows={4}
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Post Comment
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Add related manga cards here */}
        </div>
      </div>
    </div>
  );
} 