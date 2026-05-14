import HeroMain from "@/components/heroSection/HeroMain";
import CursorDot from "@/components/CursorDot";
import DifferenceMain from "@/components/differenceSec/DifferenceMain";
import GuidanceMain from "@/components/guidance/GuidanceMain";
import ExpertiseMain from "@/components/expertise/ExpertiseMain";
import NumbersMain from "@/components/numbers/NumbersMain";
import ServicesMain from "@/components/services/ServicesMain";
import UnlockComponent from "@/components/UnlockComponent";

export const metadata = {
  title: "VEVLET | Software Development & AI Company in Pakistan",
  description:
    "Aptura Tech Solutions engineers intelligent software, AI systems, and digital products. Custom web development, app development, cybersecurity, UI/UX design & IoT solutions from Peshawar, Pakistan.",
  keywords: [
    "software development company",
    "web development Pakistan",
    "AI solutions",
    "mobile app development",
    "custom software",
    "Peshawar tech company",
  ],
  alternates: {
    canonical: "https://apturatechsolutions.tech",
  },
  openGraph: {
    title: "VEVLET | Engineering Intelligence",
    description:
      "Custom software, AI, web & app development. Trusted by businesses worldwide.",
    url: "https://apturatechsolutions.tech",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-transparent text-white">
      <CursorDot />
      <HeroMain />
      <DifferenceMain />
      <GuidanceMain />
      <ExpertiseMain />
      <NumbersMain />
      <ServicesMain />
      <UnlockComponent />
    </div>
  );
}
