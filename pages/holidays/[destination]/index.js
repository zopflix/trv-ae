import Layout from "@/app/components/_layout";
import HolidayListing from "@/app/components/holiday-listing";
import { appBaseURL } from "@/app/config";
import { capitalizeEachWord } from "@/app/helpers/common";
import { getDestinationByName } from "@/app/services/holidayService";
import Head from "next/head";
import { usePathname } from "next/navigation";

export default function InternationalDestinationPage({ data, faqObjs, breadcrumbObj }) {
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
                <meta property="og:image" content="https://assets.travanya.com/logo.webp" />
                <meta property="og:image:type" content="image/webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TravanyaHoliday" />
                <meta name="twitter:title" content={data?.Data?.MetaTitle} />
                <meta name="twitter:description" content={data?.Data?.MetaDescription} />
                <meta name="twitter:image" content="https://assets.travanya.com/logo.webp" />
                {faqObjs.length > 0 && !!faqObjs[0].name &&
                    <script type="application/ld+json" dangerouslySetInnerHTML={{
                        __html: `{
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": ${JSON.stringify(faqObjs)}
                    }`
                    }}>
                    </script>
                }
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbObj)
                }}>
                </script>
            </Head>
            <HolidayListing isDomestic={false} packageData={data} />
        </Layout>
    )
}

// export async function generateMetadata({ params }) {
//     let data = params.destination.split('/').pop();
//     let dest = data.split('-');
//     dest = dest.slice(0, -2);
//     dest = dest.join(' ');

//     const res = await getDestinationByName(dest);

//     return {
//         title: res?.Data?.MetaTitle,
//         description: res?.Data?.MetaDescription,
//         alternates: {
//             canonical: `${appBaseURL}international-tour-packages/${params.destination}`,
//         },
//         openGraph: {
//             title: res?.Data?.MetaTitle,
//             description: res?.Data?.MetaDescription,
//             type: "article",
//             images: 'https://assets.travanya.com/logo.webp',
//             url: `${appBaseURL}international-tour-packages/${params.destination}`
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: res?.Data?.MetaTitle,
//             description: res?.Data?.MetaDescription,
//             images: ['https://assets.travanya.com/logo.webp'],
//             site: "@TravanyaHoliday"
//         },
//     }
// }

export async function getServerSideProps({ params }) {
    let dest = params?.destination?.split('-');

    if (dest[dest.length - 1] == 'packages' && dest[dest.length - 2] == 'tour') {
        dest = dest.slice(0, -2);
        dest = capitalizeEachWord(dest.join(' '));

        const res = await getDestinationByName(dest);
        let faqObjs = [];
        if (res?.Data?.FAQs?.length > 0) {
            faqObjs = res?.Data?.FAQs?.map(faq => ({
                "@type": "Question",
                "name": faq.Question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.Answer
                }
            }));
        }

        const breadcrumbObj = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.travanya.ae/"
            }, {
                "@type": "ListItem",
                "position": 2,
                "name": "Holidays",
                "item": "https://www.travanya.ae/holidays/"
            }, {
                "@type": "ListItem",
                "position": 3,
                "name": dest + ' Tour Packages'
            }]
        }

        return {
            props: { data: res, faqObjs, breadcrumbObj }
        };
    }
    else {
        return { notFound: true }
    }
}