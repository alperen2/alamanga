import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Admin Paneli</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/manga"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Mangalar</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manga ekle, düzenle ve yönet
          </p>
        </Link>

        <Link
          href="/admin/chapters"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Bölümler</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Bölüm ekle ve düzenle
          </p>
        </Link>

        <Link
          href="/admin/genres"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Kategoriler</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Kategori ekle ve düzenle
          </p>
        </Link>

        <Link
          href="/admin/users"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Kullanıcılar</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Kullanıcıları yönet
          </p>
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Son İstatistikler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Toplam Manga</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Toplam Bölüm</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Toplam Kullanıcı</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
} 