
import Layout from "@/components/Layout/Layout";
import Hero from "@/components/Hero/Hero";
import FeaturedProducts from "@/components/Products/FeaturedProducts";
import OnSaleProducts from "@/components/Products/OnSaleProducts";
import CategoryGrid from "@/components/Hero/CategoryGrid";
import FeatureSection from "@/components/Hero/FeatureSection";
import BrandShowcase from "@/components/Hero/BrandShowcase";

export default function Index() {
  return (
    <Layout>
      <div className="page-transition">
        <Hero />
        <FeatureSection />
        <FeaturedProducts />
        <CategoryGrid />
        <OnSaleProducts />
        <BrandShowcase />
      </div>
    </Layout>
  );
}
