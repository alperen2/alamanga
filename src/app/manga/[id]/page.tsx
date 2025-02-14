import Image from 'next/image'
import Link from 'next/link'
import Comments from '@/components/Comments'

interface MangaDetail {
  id: number;
  title: string;
  cover: string;
  description: string;
  status: 'ongoing' | 'finished' | 'dropped';
  totalChapters: number;
  author: string;
  artist: string;
  genres: string[];
  rating: number;
  chapters: {
    number: number;
    title: string;
    date: string;
  }[];
}

// This would normally come from an API
const mangaDetail: MangaDetail = {
  id: 1,
  title: "One Piece",
  cover: "/manga-covers/one-piece.jpg",
  description: "Follow Monkey D. Luffy and his pirate crew in their search for the ultimate treasure, the One Piece.",
  status: "ongoing",
  totalChapters: 1089,
  author: "Eiichiro Oda",
  artist: "Eiichiro Oda",
  genres: ["Action", "Adventure", "Comedy", "Fantasy"],
  rating: 4.9,
  chapters: [
    { number: 1089, title: "The Weight of Memory", date: "2024-02-08" },
    { number: 1088, title: "A Ray of Hope", date: "2024-02-01" },
    // Add more chapters...
  ]
};

export default function MangaDetail({ params }: { params: { id: string } }) {
  const getStatusColor = (status: MangaDetail['status']) => {
    switch (status) {
      case 'ongoing': return 'bg-green-500';
      case 'finished': return 'bg-blue-500';
      case 'dropped': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Manga Cover */}
        <div className="w-full md:w-1/3">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={mangaDetail.cover}
              alt={mangaDetail.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Manga Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{mangaDetail.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm text-white ${getStatusColor(mangaDetail.status)}`}>
              {mangaDetail.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500">Author</p>
              <p>{mangaDetail.author}</p>
            </div>
            <div>
              <p className="text-gray-500">Artist</p>
              <p>{mangaDetail.artist}</p>
            </div>
            <div>
              <p className="text-gray-500">Total Chapters</p>
              <p>{mangaDetail.totalChapters}</p>
            </div>
            <div>
              <p className="text-gray-500">Rating</p>
              <p className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                {mangaDetail.rating}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {mangaDetail.genres.map((genre) => (
                <Link
                  key={genre}
                  href={`/categories/${genre.toLowerCase()}`}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {mangaDetail.description}
          </p>
          
          <div className="flex gap-4">
            <Link
              href={`/manga/${params.id}/chapter/1`}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Read First Chapter
            </Link>
            <Link
              href={`/manga/${params.id}/chapter/${mangaDetail.totalChapters}`}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Latest Chapter
            </Link>
          </div>
        </div>
      </div>

      {/* Chapter List */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Chapters</h2>
        <div className="space-y-2">
          {mangaDetail.chapters.map((chapter) => (
            <Link
              key={chapter.number}
              href={`/manga/${params.id}/chapter/${chapter.number}`}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div>
                <span className="font-semibold">Chapter {chapter.number}</span>
                <span className="mx-2">-</span>
                <span>{chapter.title}</span>
              </div>
              <span className="text-gray-500">{chapter.date}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Disqus Comments */}
      <div className="mt-12">
        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6">Yorumlar</h2>
          <Comments
            id={params.id}
            title="Manga Başlığı"
            path={`/manga/${params.id}`}
          />
        </div>
      </div>
    </div>
  )
} 