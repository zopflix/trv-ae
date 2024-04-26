import Layout from "@/app/components/_layout";
import FlightsData from "@/app/components/flights-data";
import { appBaseURL, tenantId } from "@/app/config";
import { capitalizeEachWord } from "@/app/helpers/common";
import { getFlightsPageData } from "@/app/services/flightService";
import Head from "next/head";

function FlightPageChild3(props) {

    return (
        <Layout>
            <Head>
                <title>{props.data.metaTitle}</title>
                <meta name="description" content={props.data.metaDescription} />
                <link rel="canonical" href={`${appBaseURL}${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/${props.data.child4}/${props.data.child5}/${props.data.child6}/`} />
                <meta name='robots' content={`index, ${props.data.canIndex ? 'follow' : 'nofollow'}, max-image-preview:large, max-snippet:-1, max-video-preview:-1`} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={props.data.metaTitle} />
                <meta property="og:description" content={props.data.metaDescription} />
                <meta property="og:url" content={`${appBaseURL}${props.data.parent}`} />
                <meta property="og:site_name" content="Travanya" />
                <meta property="og:image" content="https://assets.travanya.com/logo.webp" />
                <meta property="og:image:type" content="image/webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TravanyaHoliday" />
                <meta name="twitter:title" content={props.data.metaTitle} />
                <meta name="twitter:description" content={props.data.metaDescription} />
                <meta name="twitter:image" content="https://assets.travanya.com/logo.webp" />
                {props.faqObjs.length > 0 && !!props.faqObjs[0].name &&
                    <script type="application/ld+json" dangerouslySetInnerHTML={{
                        __html: `{
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": ${JSON.stringify(props.faqObjs)}
                    }`
                    }}>
                    </script>
                }
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify(props.breadcrumbObj)
                }}>
                </script>
            </Head>
            <FlightsData data={props.data} />
        </Layout >
    )
}

export async function getServerSideProps(context) {
    // Fetch data based on the context+
    const data = await getFlightsPageData({ parent: context.params.flights, child1: context.params.child1, child2: context.params.child2, child3: context.params.child3, child4: context.params.child4, child5: context.params.child5, child6: context.params.child6, tenantId: tenantId });

    if (!data) {
        return {
            notFound: true
        }
    }
    const faqObjs = data?.flightPageFaqs?.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }));

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
            "name": capitalizeEachWord(context.params.flights.replaceAll('-', ' ')),
            "item": `https://www.travanya.ae/${context.params.flights}/`
        }, {
            "@type": "ListItem",
            "position": 3,
            "name": capitalizeEachWord(context.params.child1.replaceAll('-', ' ')),
            "item": `https://www.travanya.ae/${context.params.flights}/${context.params.child1}/`
        }, {
            "@type": "ListItem",
            "position": 4,
            "name": capitalizeEachWord(context.params.child2.replaceAll('-', ' ')),
            "item": `https://www.travanya.ae/${context.params.flights}/${context.params.child1}/${context.params.child2}/`
        }, {
            "@type": "ListItem",
            "position": 5,
            "name": capitalizeEachWord(context.params.child3.replaceAll('-', ' ')),
            "item": `https://www.travanya.ae/${context.params.flights}/${context.params.child1}/${context.params.child2}/${context.params.child3}/`
        }, {
            "@type": "ListItem",
            "position": 6,
            "name": capitalizeEachWord(context.params.child4.replaceAll('-', ' ')),
            "item": `https://www.travanya.ae/${context.params.flights}/${context.params.child1}/${context.params.child2}/${context.params.child3}/${context.params.child4}/`
        }, {
            "@type": "ListItem",
            "position": 7,
            "name": capitalizeEachWord(context.params.child5.replaceAll('-', ' ')),
            "item": `https://www.travanya.ae/${context.params.flights}/${context.params.child1}/${context.params.child2}/${context.params.child3}/${context.params.child4}/${context.params.child5}/`
        }, {
            "@type": "ListItem",
            "position": 8,
            "name": capitalizeEachWord(context.params.child6.replaceAll('-', ' '))
        }]
    }

    return {
        props: { data: data, faqObjs, breadcrumbObj },
    };
}
export default FlightPageChild3;






