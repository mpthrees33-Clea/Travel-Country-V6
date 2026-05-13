import { Hero } from "@/sections/Hero";
import { TripPlannerPromo } from "@/sections/TripPlannerPromo";
import { FeaturedCollection } from "@/sections/FeaturedCollection";
import { BrandGrid } from "@/sections/BrandGrid";
import { EditorialBlock } from "@/sections/EditorialBlock";
import { LocalDeliveryBanner } from "@/sections/LocalDeliveryBanner";
import { Newsletter } from "@/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LocalDeliveryBanner />
      <TripPlannerPromo />
      <FeaturedCollection />
      <BrandGrid />
      <EditorialBlock />
      <Newsletter />
    </>
  );
}
