import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  description: string;
  count: number;
  icon: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Action",
    description: "Fast-paced stories filled with combat and thrilling adventures.",
    count: 1250,
    icon: "⚔️",
    image: "/category-images/action.jpg"
  },
  {
    id: 2,
    name: "Romance",
    description: "Stories focusing on love, relationships, and emotional connections.",
    count: 980,
    icon: "❤️",
    image: "/category-images/romance.jpg"
  },
  {
    id: 3,
    name: "Fantasy",
    description: "Tales set in magical worlds with supernatural elements.",
    count: 1500,
    icon: "🔮",
    image: "/category-images/fantasy.jpg"
  },
  {
    id: 4,
    name: "Comedy",
    description: "Humorous stories designed to make you laugh.",
    count: 850,
    icon: "😄",
    image: "/category-images/comedy.jpg"
  },
  {
    id: 5,
    name: "Drama",
    description: "Emotional stories focusing on character development and relationships.",
    count: 720,
    icon: "🎭",
    image: "/category-images/drama.jpg"
  },
  {
    id: 6,
    name: "Slice of Life",
    description: "Stories depicting daily life and ordinary experiences.",
    count: 450,
    icon: "🌟",
    image: "/category-images/slice-of-life.jpg"
  },
  {
    id: 7,
    name: "Horror",
    description: "Scary and suspenseful stories designed to thrill readers.",
    count: 320,
    icon: "👻",
    image: "/category-images/horror.jpg"
  },
  {
    id: 8,
    name: "Mystery",
    description: "Stories involving solving crimes or uncovering secrets.",
    count: 280,
    icon: "🔍",
    image: "/category-images/mystery.jpg"
  },
  {
    id: 9,
    name: "Sci-Fi",
    description: "Stories exploring futuristic technology and scientific concepts.",
    count: 410,
    icon: "🚀",
    image: "/category-images/sci-fi.jpg"
  },
  {
    id: 10,
    name: "Sports",
    description: "Stories focusing on athletic competition and achievement.",
    count: 290,
    icon: "⚽",
    image: "/category-images/sports.jpg"
  },
  {
    id: 11,
    name: "Martial Arts",
    description: "Stories centered around fighting techniques and combat skills.",
    count: 380,
    icon: "🥋",
    image: "/category-images/martial-arts.jpg"
  },
  {
    id: 12,
    name: "School Life",
    description: "Stories set in educational institutions.",
    count: 560,
    icon: "🏫",
    image: "/category-images/school-life.jpg"
  }
];

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manga Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.name.toLowerCase()}`}
            className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-bold text-white">{category.name}</h2>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.count} titles
                </span>
                <span className="text-blue-500 group-hover:text-blue-600">
                  Browse →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 