import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  count: number;
  icon: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Action",
    count: 1250,
    icon: "⚔️"
  },
  {
    id: 2,
    name: "Romance",
    count: 980,
    icon: "❤️"
  },
  {
    id: 3,
    name: "Fantasy",
    count: 1500,
    icon: "🔮"
  },
  {
    id: 4,
    name: "Comedy",
    count: 850,
    icon: "😄"
  },
  {
    id: 5,
    name: "Drama",
    count: 720,
    icon: "🎭"
  },
  {
    id: 6,
    name: "Slice of Life",
    count: 450,
    icon: "🌟"
  },
  {
    id: 7,
    name: "Horror",
    count: 320,
    icon: "👻"
  },
  {
    id: 8,
    name: "Mystery",
    count: 280,
    icon: "🔍"
  }
];

export default function Categories() {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            href={`/categories/${category.name.toLowerCase()}`}
            key={category.id}
            className="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h3 className="font-semibold group-hover:text-blue-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.count} titles
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/categories"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          View All Categories
        </Link>
      </div>
    </section>
  );
} 