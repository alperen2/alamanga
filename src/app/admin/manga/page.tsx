'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Manga {
  id: string;
  title: string;
  cover: string;
  status: 'ONGOING' | 'FINISHED' | 'DROPPED';
  author: string;
  chapters: number;
}

// Bu veriler normalde API'den gelecek
const dummyManga: Manga[] = [
  {
    id: '1',
    title: 'One Piece',
    cover: '/manga-covers/one-piece.jpg',
    status: 'ONGOING',
    author: 'Eiichiro Oda',
    chapters: 1089
  },
  {
    id: '2',
    title: 'Jujutsu Kaisen',
    cover: '/manga-covers/jjk.jpg',
    status: 'ONGOING',
    author: 'Gege Akutami',
    chapters: 236
  }
];

export default function MangaManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredManga = dummyManga.filter(manga => {
    const matchesSearch = manga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manga.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || manga.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manga Yönetimi</h1>
        <Link
          href="/admin/manga/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Yeni Manga Ekle
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Manga veya yazar ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="ONGOING">Devam Ediyor</option>
              <option value="FINISHED">Tamamlandı</option>
              <option value="DROPPED">Bırakıldı</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left">Kapak</th>
                <th className="px-4 py-3 text-left">Başlık</th>
                <th className="px-4 py-3 text-left">Yazar</th>
                <th className="px-4 py-3 text-left">Durum</th>
                <th className="px-4 py-3 text-left">Bölümler</th>
                <th className="px-4 py-3 text-left">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredManga.map((manga) => (
                <tr key={manga.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">
                    <div className="relative w-16 h-24">
                      <Image
                        src={manga.cover}
                        alt={manga.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">{manga.title}</td>
                  <td className="px-4 py-3">{manga.author}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      manga.status === 'ONGOING' ? 'bg-green-500 text-white' :
                      manga.status === 'FINISHED' ? 'bg-blue-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {manga.status === 'ONGOING' ? 'Devam Ediyor' :
                       manga.status === 'FINISHED' ? 'Tamamlandı' :
                       'Bırakıldı'}
                    </span>
                  </td>
                  <td className="px-4 py-3">{manga.chapters}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/manga/${manga.id}/edit`}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Düzenle
                      </Link>
                      <button
                        onClick={() => {
                          // Silme işlemi burada yapılacak
                          if (confirm('Bu mangayı silmek istediğinize emin misiniz?')) {
                            console.log('Manga silindi:', manga.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        Sil
                      </button>
                      <Link
                        href={`/admin/manga/${manga.id}/chapters`}
                        className="text-green-500 hover:text-green-600"
                      >
                        Bölümler
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 