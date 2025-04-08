import "./globals.css";
import Script from 'next/script'


export const metadata = {
  title: "GCSE Log - Built by students, for Students",
  description: "Built by students, for students. GCSE Log is a platform that collates resources from across the country, so you don't have to.",
  icons: {
    icon: "/icon.ico",
  },
  keywords: [
    "GCSE",
    "resources",
    "education",
    "students",
    "learning",
    "study",
    "revision",
    "collaboration",
    "community",
    "knowledge sharing",
  ],
  openGraph: {
    title: "GCSE Log - Built by students, for Students",
    description: "Built by students, for students. GCSE Log is a platform that collates resources from across the country, so you don't have to.",
    url: "https://gcselog.com",
    siteName: "GCSE Log",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link
          rel="stylesheet"
          href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css"
        />
         <link rel="icon" type="image/x-icon" href="icon.ico"/>
      </head>
      <body>
        {children}
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js"  />
      </body>
    </html>
  );
}
