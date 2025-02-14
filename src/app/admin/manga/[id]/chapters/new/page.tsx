'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MangaInfo {
  id: string;
  title: string;
  cover: string;
  lastChapterNumber: number;
}

interface ChapterFormData {
  number: number;
  title: string;
  pages: File[];
}

export default function NewChapter({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manga, setManga] = useState<MangaInfo | null>(null);
  const [formData, setFormData] = useState<ChapterFormData>({
    number: 0,
    title: '',
    pages: [],
  });
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        // API çağrısı burada yapılacak
        // Şimdilik örnek veri kullanıyoruz
        const mangaData = {
          id: params.id,
          title: 'One Piece',
          cover: '/manga-covers/one-piece.jpg',
          lastChapterNumber: 1089,
        };

        setManga(mangaData);
        setFormData(prev => ({
          ...prev,
          number: mangaData.lastChapterNumber + 1,
        }));
      } catch (error) {
        console.error('Error fetching manga:', error);
        alert('Manga bilgileri yüklenirken bir hata oluştu.');
        router.push(`/admin/manga/${params.id}/chapters`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManga();
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Dosyaları sırala (01.jpg, 02.jpg, ... şeklinde)
    const sortedFiles = files.sort((a, b) => {
      return a.name.localeCompare(b.name, undefined, { numeric: true });
    });

    setFormData(prev => ({ ...prev, pages: sortedFiles }));

    // Önizlemeleri oluştur
    setPreviews([]);
    sortedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pages.length === 0) {
      alert('Lütfen en az bir sayfa yükleyin.');
      return;
    }

    setIsSubmitting(true);

    try {
      // API çağrısı burada yapılacak
      console.log('Form data:', formData);
      
      // Başarılı olduğunda bölüm listesine dön
      router.push(`/admin/manga/${params.id}/chapters`);
    } catch (error) {
      console.error('Error submitting chapter:', error);
      alert('Bölüm eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <p className="text-gray-600 dark:text-gray-400">Yeni Bölüm Ekle</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="number" className="block text-sm font-medium mb-1">
                  Bölüm Numarası
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Başlık
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pages" className="block text-sm font-medium mb-1">
                Sayfalar
              </label>
              <input
                type="file"
                id="pages"
                name="pages"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Sayfa dosyalarını sıralı bir şekilde seçin (01.jpg, 02.jpg, ...)
              </p>
            </div>

            {previews.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Sayfa Önizlemeleri</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative aspect-[2/3]">
                      <Image
                        src={preview}
                        alt={`Page ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Ekleniyor...' : 'Bölüm Ekle'}
          </button>
        </div>
      </form>
    </div>
  );
} 