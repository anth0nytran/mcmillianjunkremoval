import type { Metadata } from "next";
import { DM_Sans, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  variable: "--font-app-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const displayFont = Montserrat({
  variable: "--font-app-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-app-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mcmillianjunkremoval.com'),
  title: "Affordable Junk Removal & Demolition in Houston, TX | McMillian Junk Removal",
  description: "Houston's trusted junk removal, demolition, and cleanout service. Same-day pickup. Residential & commercial. Serving Harris County, Sugar Land, Cypress, Fort Bend & Galveston County. Free estimates — call (832) 721-6206.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Affordable Junk Removal & Demolition | McMillian Junk Removal — Houston TX",
    description: "Fair pricing. Fast service. We haul it all. Junk removal, demolition, hoarder cleanouts, appliance removal & more. Free estimates — call or text anytime.",
    url: 'https://mcmillianjunkremoval.com',
    siteName: 'McMillian Junk Removal',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/mcmillian/new_logo_transparent.png',
        width: 1599,
        height: 1205,
        alt: 'McMillian Junk Removal — Affordable Junk Hauling in Houston TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Houston Junk Removal & Demolition | McMillian Junk Removal",
    description: "24/7 junk removal, demolition, and cleanout services for Houston and surrounding areas. Fair pricing, same-day service, free estimates.",
    images: ['/mcmillian/new_logo_transparent.png'],
  },
  icons: {
    icon: [
      { url: '/mcmillian/new_logo.svg', type: 'image/svg+xml' },
      { url: '/mcmillian/new_logo_transparent.png', type: 'image/png' },
    ],
    shortcut: '/mcmillian/new_logo_transparent.png',
    apple: '/mcmillian/new_logo_transparent.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gscVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "McMillian Junk Removal",
              "image": "https://mcmillianjunkremoval.com/mcmillian/new_logo_transparent.png",
              "@id": "https://mcmillianjunkremoval.com",
              "url": "https://mcmillianjunkremoval.com",
              "telephone": "+18327216206",
              "description": "Affordable junk removal, demolition, hoarder house cleanouts, appliance removal, and construction cleanup for residential and commercial clients in Houston and surrounding areas. 24/7 same-day service and free estimates.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Houston",
                "addressRegion": "TX",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.7604,
                "longitude": -95.3698
              },
              "areaServed": [
                { "@type": "City", "name": "Houston" },
                { "@type": "City", "name": "Sugar Land" },
                { "@type": "City", "name": "Cypress" },
                { "@type": "City", "name": "Katy" },
                { "@type": "City", "name": "Pearland" },
                { "@type": "City", "name": "Pasadena" },
                { "@type": "City", "name": "Missouri City" },
                { "@type": "County", "name": "Harris County" },
                { "@type": "County", "name": "Fort Bend County" },
                { "@type": "County", "name": "Galveston County" }
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              },
              "priceRange": "$$",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Junk Removal & Demolition Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Junk Removal" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Demolition Services" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hoarder House Clean-Out" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Appliance Removal" } }
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "McMillian Junk Removal",
              "alternateName": ["McMillian Junk Removal Houston", "McMillianJunkRemoval.com"],
              "url": "https://mcmillianjunkremoval.com"
            })
          }}
        />
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
        {gscVerification ? (
          <meta name="google-site-verification" content={gscVerification} />
        ) : null}
      </head>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html >
  );
}
