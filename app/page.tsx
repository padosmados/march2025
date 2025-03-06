import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import LoadingCards from '@/components/card/LoadingCards';
import { Suspense } from 'react';





function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/mainbackground.jpg')", // ✅ No need for `/public/` in the path
        backgroundAttachment: "scroll",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Keep Background but Ensure Readability */}
      <section className="min-h-screen w-full bg-white/70 p-6"> 
        <CategoriesList
          category={searchParams?.category}
          search={searchParams?.search}
        />
        <Suspense fallback={<LoadingCards />}>
          <PropertiesContainer
            category={searchParams?.category}
            search={searchParams?.search}
          />
        </Suspense>
      </section>
    </div>
  );
}

export default HomePage;
