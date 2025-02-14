'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MangaFormData {
  title: string;
  author: string;
  description: string;
  status: 'ONGOING' | 'FINISHED' | 'DROPPED';
  cover: File | null;
  genres: string[];
  currentCoverUrl?: string;
}

// Örnek türler - normalde API'den gelecek
const availableGenres = [
  'Aksiyon',
  'Macera',
  'Komedi',
  'Dram',
  'Fantezi',
  'Korku',
  'Gizem',
  'Romantik',
  'Bilim Kurgu',
  'Spor',
  'Doğaüstü',
];

export default function EditManga({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MangaFormData>({
    title: '',
    author: '',
    description: '',
    status: 'ONGOING',
    cover: null,
    genres: [],
    currentCoverUrl: '',
  });
  const [coverPreview, setCoverPreview] = useState<string>('');

  useEffect(() => {
    const fetchManga = async () => {
      try {
        // API çağrısı burada yapılacak
        // Şimdilik örnek veri kullanıyoruz
        const mangaData = {
          title: 'One Piece',
          author: 'Eiichiro Oda',
          description: 'Büyük Korsan Çağı\'nda geçen bir macera...',
          status: 'ONGOING' as const,
          currentCoverUrl: '/manga-covers/one-piece.jpg',
          genres: ['Aksiyon', 'Macera', 'Komedi'],
          cover: null,
        };

        setFormData(mangaData);
        setCoverPreview(mangaData.currentCoverUrl);
      } catch (error) {
        console.error('Error fetching manga:', error);
        alert('Manga bilgileri yüklenirken bir hata oluştu.');
        router.push('/admin/manga');
      } finally {
        setIsLoading(false);
      }
    };

    fetchManga();
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, cover: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API çağrısı burada yapılacak
      console.log('Updated form data:', formData);
      
      // Başarılı olduğunda manga listesine dön
      router.push('/admin/manga');
    } catch (error) {
      console.error('Error updating manga:', error);
      alert('Manga güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
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
      <h1 className="text-2xl font-bold mb-6">Manga Düzenle</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
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

              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-1">
                  Yazar
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                  Durum
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                >
                  <option value="ONGOING">Devam Ediyor</option>
                  <option value="FINISHED">Tamamlandı</option>
                  <option value="DROPPED">Bırakıldı</option>
                </select>
              </div>

              <div>
                <label htmlFor="cover" className="block text-sm font-medium mb-1">
                  Kapak Görseli
                </label>
                <input
                  type="file"
                  id="cover"
                  name="cover"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
                {coverPreview && (
                  <div className="mt-2 relative w-32 h-48">
                    <Image
                      src={coverPreview}
                      alt="Cover preview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Açıklama
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Türler
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableGenres.map((genre) => (
                    <label
                      key={genre}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.genres.includes(genre)}
                        onChange={() => handleGenreToggle(genre)}
                        className="rounded border-gray-300 dark:border-gray-600"
                      />
                      <span className="text-sm">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
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
            {isSubmitting ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 