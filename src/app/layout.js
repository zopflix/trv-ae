import { Inter } from "next/font/google";
import "./globals.css";
import "./variable-style.css";
import "./search-form-style.css";
import "./listing-style.css";
import "./holiday-listing.css";
import "./splash-style.css";
import "./user-style.css";
import { CounterContextProvider } from "./context/counter.context";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        />

        {/* META TAGS */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0;"
        ></meta>
        <title>
          Tour & Travel Agency In India | Cheap Flights + Holiday Packages
        </title>
        <meta
          name="description"
          content="Travanya is the best travel agency in India that caters to all your tour and travel needs. Along with international & domestic flights, we plan holiday packages too."
        />

        {/* Font Awsome */}
        <Script
          strategy="lazyOnload"
          src="https://kit.fontawesome.com/2931c74514.js"
          crossOrigin="anonymous"
          defer
        />
        <Script
          strategy="lazyOnload"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org/",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Organization",
              "image": "https://www.travanya.com/wp-content/themes/trv/images/logo.webp",
              "name": "Travanya",
              "telephone": "8000235865",
              "address" :{
                "@type": "PostalAddress",
                "streetAddress": "Plot 16 HSIIDC IT Park, Sector 22, Panchkula,",
                "addressLocality": "Haryana",
                "addressRegion": "North",
                "postalCode": "134109",
                "addressCountry": "India"
              }
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.3"
            },
            "name": "Best Travel Agency.",
            "author": {
              "@type": "Person",
              "name": "Rahul s kumar"
            },
            "reviewBody": "It was good experience travelling to Bali for our honeymoon with booking made through travanya team, thanks a lot Mr Abhimanyu for charting the program. The hotel that was booked , even though it was a 4* one did not met our expectation , rest everything was well coordinated with the vendor team and we enjoyed a lot..",
            "publisher": {
              "@type": "Organization",
              "name": "Google reviews"
            }
          }`,
          }}
        />

<Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11426739459"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11426739459');`,
          }}
        />


        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T4P483N');`,
          }}
        />
      </head>
      <body className={inter.className}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T4P483N"
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <CounterContextProvider>{children}</CounterContextProvider></body>
    </html>
  );
}
