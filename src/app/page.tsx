import FeaturedSlider from '@/components/FeaturedSlider';
import PopularManga from '@/components/PopularManga';
import Categories from '@/components/Categories';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="mb-8">
        <FeaturedSlider />
      </section>

      <PopularManga />
      
      <Categories />
    </div>
  );
}
