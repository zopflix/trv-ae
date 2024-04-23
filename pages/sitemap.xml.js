import { getSitemapData } from "@/app/services/flightService";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
  <loc>https://www.travanya.com/</loc>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://www.travanya.com/about-us/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/holidays/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/india-tour-packages/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/international-tour-packages/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/blog/travanya-your-gateway-to-unforgettable-journeys-from-UAE-to-anywhere/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/blog/umrah-saudi-visa-for-uae-residents/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/blog/best-things-to-do-in-dubai-airport/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/contact-us/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/privacy-policy/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/terms-conditions/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/disclaimer/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/baggage-fees/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/check-in/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/FAQ/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/dummy-flight-ticket/</loc>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.travanya.com/blog/</loc>
  <priority>0.64</priority>
</url>
     ${posts
      .map(page => {
        return `
      <url>
          <loc>${page}</loc>
          <priority>0.80</priority>
      </url>
    `;
      }).join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const posts = await getSitemapData();

  // // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;