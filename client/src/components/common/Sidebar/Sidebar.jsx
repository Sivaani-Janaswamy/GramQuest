import RecommendationSection from './RecommendationSection';
import TrendingSection from './TrendingSection';

const Sidebar = () => {
  return (
    <aside className="w-full md:w-80 px-5.5 py-5 space-y-6 text-sm sticky top-0 min-h-screen bg-[#ebebeb]">
      <RecommendationSection />
      <TrendingSection />
    </aside>
  );
};

export default Sidebar;