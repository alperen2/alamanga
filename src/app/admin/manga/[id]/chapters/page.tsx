'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Chapter {
  id: string;
  number: number;
  title: string;
  uploadDate: string;
  pageCount: number;
}

interface MangaInfo {
  id: string;
  title: string;
  cover: string;
}

export default function ChapterManagement({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [manga, setManga] = useState<MangaInfo | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API çağrısı burada yapılacak
        // Şimdilik örnek veri kullanıyoruz
        const mangaData = {
          id: params.id,
          title: 'One Piece',
          cover: '/manga-covers/one-piece.jpg',
        };

        const chaptersData = [
          {
            id: '1',
            number: 1089,
            title: 'Yeni Macera',
            uploadDate: '2024-03-15',
            pageCount: 18,
          },
          {
            id: '2',
            number: 1088,
            title: 'Büyük Savaş',
            uploadDate: '2024-03-08',
            pageCount: 17,
          },
        ];

        setManga(mangaData);
        setChapters(chaptersData);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Veriler yüklenirken bir hata oluştu.');
        router.push('/admin/manga');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleDeleteChapter = async (chapterId: string) => {
    if (confirm('Bu bölümü silmek istediğinize emin misiniz?')) {
      try {
        // API çağrısı burada yapılacak
        console.log('Chapter deleted:', chapterId);
        setChapters(prev => prev.filter(chapter => chapter.id !== chapterId));
      } catch (error) {
        console.error('Error deleting chapter:', error);
        alert('Bölüm silinirken bir hata oluştu.');
      }
    }
  };

  const filteredChapters = chapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.number.toString().includes(searchTerm)
  );

  if (isLoading || !manga) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-24 h-36 flex-shrink-0">
          <Image
            src={manga.cover}
            alt={manga.title}
            fill
            className="object-cover rounded"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{manga.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Bölüm Yönetimi</p>
          <button
            onClick={() => router.push(`/admin/manga/${manga.id}/chapters/new`)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Yeni Bölüm Ekle
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Bölüm ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left">Bölüm</th>
                <th className="px-4 py-3 text-left">Başlık</th>
                <th className="px-4 py-3 text-left">Yükleme Tarihi</th>
                <th className="px-4 py-3 text-left">Sayfa Sayısı</th>
                <th className="px-4 py-3 text-left">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredChapters.map((chapter) => (
                <tr key={chapter.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">{chapter.number}</td>
                  <td className="px-4 py-3">{chapter.title}</td>
                  <td className="px-4 py-3">
                    {new Date(chapter.uploadDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 py-3">{chapter.pageCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/admin/manga/${manga.id}/chapters/${chapter.id}/edit`)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteChapter(chapter.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Sil
                      </button>
                      <button
                        onClick={() => router.push(`/admin/manga/${manga.id}/chapters/${chapter.id}/pages`)}
                        className="text-green-500 hover:text-green-600"
                      >
                        Sayfalar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredChapters.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Bölüm bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
} 