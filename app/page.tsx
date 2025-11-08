import ParallaxSection from '@/components/ParallaxSection';
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <main>
      {/* Your Hero Section */}
      <HeroSection />
      
      {/* Parallax Section */}
      <ParallaxSection />
      
      {/* Rest of your content */}
    </main>
  );
}