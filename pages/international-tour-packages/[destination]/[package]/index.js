
import Layout from "@/app/components/_layout";
import HolidayDetails from "@/app/components/holiday-details";
import { appBaseURL, tenantId } from "@/app/config";
import { capitalizeEachWord } from "@/app/helpers/common";
import { getHolidayPackageBySlug } from "@/app/services/holidayService";
import Head from "next/head";
import { usePathname } from "next/navigation";

export default function InternationalDestinationPage({ data, breadcrumbObj }) {
    const pathname = usePathname();

    return (
        <Layout>
            <Head>
                <title>{data?.Data?.MetaTitle}</title>
                <meta name="description" content={data?.Data?.MetaDescription} />
                <link rel="canonical" href={`${appBaseURL}${pathname.replace('/', '')}`} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={data?.Data?.MetaTitle} />
                <meta property="og:description" content={data?.Data?.MetaDescription} />
                <meta property="og:url" content={`${appBaseURL}${pathname.replace('/', '')}`} />
                <meta property="og:site_name" content="Travanya" />
                <meta property="og:image" content={data?.Data?.ImageUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TravanyaHoliday" />
                <meta name="twitter:title" content={data?.Data?.MetaTitle} />
                <meta name="twitter:description" content={data?.Data?.MetaDescription} />
                <meta name="twitter:image" content={data?.Data?.ImageUrl} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbObj)
                }}>
                </script>
            </Head>
            <HolidayDetails packageData={data} />
        </Layout>
    )
}

export async function generateMetadata({ params }) {
    const data = await getHolidayPackageBySlug(params.package, tenantId);

    return {
        title: data?.Data?.MetaTitle,
        description: data?.Data?.MetaDescription,
        alternates: {
            canonical: `${appBaseURL}${data?.Data?.isDomestic ? 'india-tour-packages' : 'international-tour-packages'}/${params.destination}/${params.package}`,
        },
        openGraph: {
            title: data?.Data?.MetaTitle,
            description: data?.Data?.MetaDescription,
            type: "article",
            images: [data?.Data?.ImageUrl],
            url: `${appBaseURL}${data?.Data?.isDomestic ? 'india-tour-packages' : 'international-tour-packages'}/${params.destination}/${params.package}`
        },
        twitter: {
            card: "summary_large_image",
            title: data?.Data?.MetaTitle,
            description: data?.Data?.MetaDescription,
            images: [data?.Data?.ImageUrl],
            site: "@TravanyaHoliday"
        },
    }
}

export async function getServerSideProps({ params }) {
    const res = await getHolidayPackageBySlug(params.package, tenantId);

    const breadcrumbObj = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.travanya.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "International Tour Packages",
            "item": "https://www.travanya.com/international-tour-packages/"
        }, {
            "@type": "ListItem",
            "position": 3,
            "name": capitalizeEachWord(params.destination.replaceAll('-', ' ')),
            "item": `https://www.travanya.com/international-tour-packages/${params.destination}/`
        }, {
            "@type": "ListItem",
            "position": 4,
            "name": capitalizeEachWord(params.package.replaceAll('-', ' ')),
            "item": `https://www.travanya.com/international-tour-packages/${params.destination}/${params.package}/`
        }
        ]
    }

    if (res.Success)
        return { props: { data: res, breadcrumbObj } };
    else
        return { notFound: true }
}