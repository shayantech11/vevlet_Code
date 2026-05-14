import "./globals.css";
import Navbar from "@/components/header/Navbar";
import FooterMain from "@/components/footer/FooterMain";
import CursorDot from "@/components/CursorDot";
import ScrollToTop from "@/components/ScrollToTop";
import AuroraBackground from "@/components/AuroraBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import Loader from "@/components/Loader";

export const metadata = {
  metadataBase: new URL("https://apturatechsolutions.tech"),
  title: {
    default: "VEVLET | Software Development & AI Company in Pakistan",
    template: "%s | VEVLET",
  },
  description:
    "VEVLET is a leading software development company in Pakistan offering Web Development, App Development, AI Solutions, UI/UX Design, Cybersecurity, and IoT services. We engineer intelligent digital products for startups and enterprises.",
  keywords: [
    "VEVLET",
    "software development company Pakistan",
    "web development Peshawar",
    "AI solutions Pakistan",
    "IT consulting",
    "UI/UX design agency",
    "mobile app development Pakistan",
    "cybersecurity services",
    "IoT development",
    "digital innovation partner",
    "custom software development",
    "MERN stack development",
    "Next.js development company",
    "React development agency",
    "full stack development Pakistan",
    "Peshawar tech company",
    "software house Pakistan",
  ],
  authors: [{ name: "VEVLET", url: "https://apturatechsolutions.tech" }],
  creator: "VEVLET",
  publisher: "VEVLET",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://apturatechsolutions.tech",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apturatechsolutions.tech",
    siteName: "VEVLET",
    title: "VEVLET | Software Development & AI Company",
    description:
      "We engineer intelligent software, AI systems, and digital products. Custom web & app development, cybersecurity, and IoT solutions for businesses worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aptura Tech Solutions — Engineering Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aptura Tech Solutions | Software Development & AI",
    description:
      "Custom software, AI, web & app development from Pakistan's innovative tech company.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here after deployment
    // google: "your-verification-code",
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aptura Tech Solutions",
    url: "https://apturatechsolutions.tech",
    logo: "https://apturatechsolutions.tech/newLogo.png",
    description:
      "Software development company specializing in Web Development, App Development, AI Solutions, UI/UX Design, Cybersecurity, and IoT.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Peshawar",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-347-6801611",
      contactType: "customer service",
      email: "mshayanyounastech@gmail.com",
      availableLanguage: ["English", "Urdu"],
    },
    sameAs: [
      "https://linkedin.com/company/aptura-tech-solutions/",
    ],
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "Artificial Intelligence",
      "UI/UX Design",
      "Cybersecurity",
      "Internet of Things",
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#008080" />
        <link rel="icon" href="/logoo.png" />
        <link rel="apple-touch-icon" href="/logoo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-bg-deep text-text-main noise-overlay">
        <Loader />
        <AuroraBackground />
        <div className="relative z-[2] flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main className="flex-1 font-body">{children}</main>
          <FooterMain />
          <CursorDot />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
