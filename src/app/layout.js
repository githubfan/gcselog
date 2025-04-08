import "./globals.css";
import Script from 'next/script'


export const metadata = {
  title: "GCSE Log",
  description: "Revision - reimagined.",
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
