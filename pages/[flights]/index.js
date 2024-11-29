import FlightsData from "@/app/components/flights-data";
import { appBaseURL, tenantId } from "@/app/config";
import { getFlightsPageData } from "@/app/services/flightService";
import Head from "next/head";
import { capitalizeEachWord } from "@/app/helpers/common";
import Layout from "@/app/components/_layout";

function FlightPages(props) {
    return (
        <Layout>
            {props.page == 'flights'
                ? <Head>
                    <title>Cheap Flights from UAE | Book Affordable Airline Tickets</title>
                    <meta name="description" content="Discover reasonable prices on flights from the UAE. Explore top destinations worldwide with our cheap flight deals. Book your affordable tickets today!" />
                    <link rel="canonical" href={`${appBaseURL}flights/`} />
                    <meta name='robots' content={`index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`} />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Cheap Flights from UAE | Book Affordable Airline Tickets" />
                    <meta property="og:description" content="Discover reasonable prices on flights from the UAE. Explore top destinations worldwide with our cheap flight deals. Book your affordable tickets today!" />
                    <meta property="og:url" content={`${appBaseURL}flights/`} />
                    <meta property="og:site_name" content="Travanya" />
                    <meta property="og:image" content="https://assets.travanya.com/logo.webp" />
                    <meta property="og:image:type" content="image/webp" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@TravanyaHoliday" />
                    <meta name="twitter:title" content="Cheap Flights from UAE | Book Affordable Airline Tickets" />
                    <meta name="twitter:description" content="Discover reasonable prices on flights from the UAE. Explore top destinations worldwide with our cheap flight deals. Book your affordable tickets today!" />
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

                : <Head>
                    <title>{props.data.metaTitle}</title>
                    <meta name="description" content={props.data.metaDescription} />
                    <link rel="canonical" href={`${appBaseURL}${props.data.parent}`} />
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
            }
            <FlightsData data={props.data} />
        </Layout >
    )
}

export async function getServerSideProps(context) {
    // Fetch data based on the context
    if (context.params.flights == 'flights') {
        const faqs = [
            {
                question: "How early should I book to get the cheapest fares?",
                answer: "For international flights, it's recommended to book at least 2-3 months in advance. However, for some short-haul or budget airlines, booking 4-6 weeks ahead can also secure good deals. Keep an eye out for seasonal sales and last-minute promotions."
            }, {
                question: "Which budget airlines offer cheap flights from UAE?",
                answer: "Some popular budget airlines offering affordable flights from the UAE include Flydubai, Air Arabia, Wizz Air, & Air India Express. These airlines frequently offer promotions & discounts, especially for regional destinations."
            }, {
                question: "What are the cheapest destinations to fly to from UAE?",
                answer: "Commonly, destinations such as Georgia, India, Sri Lanka, & Egypt are among the cheapest to fly to from the UAE. Regional destinations in Southeast Asia, like Thailand & the Maldives, can also have competitive fares, especially during off-peak seasons."
            }, {
                question: "How can I find the best deals on flights from UAE?",
                answer: "Use flight comparison websites such as Skyscanner or Google Flights to compare prices. Setting fare alerts, being flexible with travel dates, & booking during sales periods (e.g., New Year, Ramadan) are all great ways to find cheap flights."
            }, {
                question: "What’s the best time of year to book cheap flights from UAE?",
                answer: "The best time to book cheap flights is during off-peak travel seasons. For example, January to April & September to November are typically less crowded travel times. Sales often occur around UAE public holidays & festivals such as UAE National Day, Ramadan, & Black Friday."
            }, {
                question: "Can I get discounts for booking group flights?",
                answer: "Yes, many airlines and travel agencies offer discounts for group bookings. It's best to inquire directly with the airline or use a travel agency to secure better deals for group travelers."
            }, {
                question: "Are there any hidden fees with budget airlines?",
                answer: "Yes, budget airlines often charge for additional services like checked baggage, seat selection, meals, & extra legroom. It’s important to review the airline's fee structure before booking to avoid unexpected costs."
            }, {
                question: "How do I get last-minute flight deals from UAE?",
                answer: "Last-minute deals can sometimes be found on airline websites or flight aggregator platforms, especially if an airline needs to fill remaining seats. However, be flexible with your travel dates & destinations to take advantage of these offers."
            }, {
                question: "Can I use frequent flyer miles or credit card points to reduce flight costs?",
                answer: "Absolutely! Many airlines, including Emirates & Etihad, have frequent flyer programs where you can earn & redeem miles. Additionally, UAE credit cards often offer travel points or cashback that can be used towards flight bookings."
            }, {
                question: "How can I avoid high prices during peak seasons?",
                answer: "Book well in advance, avoid popular travel dates (such as school holidays and Eid), & consider flying on weekdays or early in the morning to find cheaper options. Being flexible with your travel dates can significantly lower costs."
            }
        ]
        const faqObjs = faqs.map(faq => ({
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
                "name": "Flights"
            }]
        }

        return {
            props: { data: { faqs: faqs }, faqObjs, breadcrumbObj, page: context.params.flights }
        }
    }

    const data = await getFlightsPageData({ parent: context.params.flights, tenantId: tenantId });
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
            "name": capitalizeEachWord(context.params.flights.replaceAll('-', ' '))
        }]
    }

    return {
        props: { data: data, faqObjs, breadcrumbObj, page: context.params.flights },
    };
}
export default FlightPages;