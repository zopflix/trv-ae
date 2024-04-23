import DomesticTourPackages from "@/app/components/Domestic-Tour-Packages";
import Layout from "@/app/components/_layout";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import PartnerLogo from "@/app/components/partner-logo";
import SearchSection from "@/app/components/search-section";
import { appBaseURL } from "@/app/config";
import Head from "next/head";
import { usePathname } from "next/navigation";


export default function IndiaTourPackages() {
    const pathname = usePathname();
    const faqs = [
        { Question: 'What are the best honeymoon destinations in India?', Answer: 'Goa, Andamans, Kashmir, Manali, and Alleppey are some of the best places for a romantic vacation in India. Check out the exclusive honeymoon tour packages offered by Travanya.' },
        { Question: 'Is India safe for solo travellers?', Answer: 'India is a safe place for solo men, couples, families and a group of friends travelling. However, it might be quite challenging for a single female traveller. It is always advisable to understand the culture of the city you are visiting and take care of your local transportation and accommodation.' },
        { Question: 'Which Indian destinations are the best to see snowfall?', Answer: 'To experience fresh snowfall, head over to Manali, Gulmarg, Auli, Tawang, or Darjeeling. However, check the season of snowfall before visiting the mentioned places.' },
        { Question: 'Is visiting North India better than South India?', Answer: 'Both North and South India are considered the best destinations to travel to India. However, this also depends on your choice of destination. North India has more historic monuments, cultural places with serene hill stations. South India on the other hand is more chilled out with beaches, temples, and colonial architecture.' },
        { Question: 'What are the best beach destinations in India?', Answer: 'Goa, Andaman, Kochi, Pondicherry and Kerala has the most beaches in India. These destinations are ideal for a romantic getaway.' }
    ];
    const faqObjs = faqs.map(faq => ({
        "@type": "Question",
        "name": faq.Question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.Answer
        }
    }));


    return (
        <Layout>
            <Head>
                <title>India Tour Packages | Book India Holiday Packages At Travanya</title>
                <meta name="description" content="Planning to explore India? Travanya offers India Tour Packages at the lowest price in your budget. Book now to get exclusive discounts on your India holidays." />
                <link rel="canonical" href={`${appBaseURL}${pathname.replace('/', '')}`} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="India Tour Packages | Book India Holiday Packages At Travanya" />
                <meta property="og:description" content="Planning to explore India? Travanya offers India Tour Packages at the lowest price in your budget. Book now to get exclusive discounts on your India holidays." />
                <meta property="og:url" content={`${appBaseURL}${pathname.replace('/', '')}`} />
                <meta property="og:site_name" content="Travanya" />
                <meta property="og:image" content="https://assets.travanya.com/logo.webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TravanyaHoliday" />
                <meta name="twitter:title" content="India Tour Packages | Book India Holiday Packages At Travanya" />
                <meta name="twitter:description" content="Planning to explore India? Travanya offers India Tour Packages at the lowest price in your budget. Book now to get exclusive discounts on your India holidays." />
                <meta name="twitter:image" content="https://assets.travanya.com/logo.webp" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": ${JSON.stringify(faqObjs)}
                    }`
                }}>
                </script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: `{
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
                            "name": "India Tour Packages"
                        }]
                    }`
                }}>
                </script>
            </Head>
            <Header />
            <SearchSection selectedTab={1} />
            <PartnerLogo />

            <div className="container py-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">India Tour Packages</li>
                    </ol>
                </nav>
            </div>

            <section className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="subHeading">
                                <h2 className="mb-3 fw-normal">India <strong className="color-orange">Tour Packages</strong></h2>
                            </div>
                        </div>
                        <div className="col-12">
                            <h2 className="fs-20 fw-bold color-blue">Book Affordable India Tour Packages With Travanya</h2>
                            <p className="fs-14"><strong>India Tour Packages – </strong>Travel India to feel the power of spirituality and the magic of nature because “Zindagi Na Milegi Dubara.” The authenticity and spark of India will make you feel most alive.</p>
                            <p className="fs-14"><strong>Explore. Discover. Repeat</strong>. India is a majestic land dipped in history yet jammed in vogue life, diverse culture, rooted traditions and incredible people. From the Great Himalayas to the Arabian Sea and the Indian Ocean, India is packed with some magical views. It’s time to break the norms and travel through the charming beauty of the country with <strong>India tour packages</strong>. Whether you want to wander through the rich historical temples or want to wallow in diverse terrains, the glory of nature in India is surely going to take your breath away.</p>
                            <p className="fs-14">India’s exotic wildlife, ornate temples, magnificent forts, beautiful beaches, scenic mountains and UNESCO world heritage sites make it one of the popular destinations in the world. The list of tourist places to visit in India is just boundless. For a land so alluring and with so much to offer our travel agency will help you plan your trip with ease. Be it providing customised itinerary services or simply choosing an already prepared India holiday tour packages, we offer what suits your needs. A trip to India is all about sunshine and smiles, making it an ideal tourist destination to plan the best journey of your life.</p>
                            <h2 className="fs-20 fw-bold color-blue">Explore Best Selling Packages</h2>
                            <p className="fs-14">Historical and Divine, India is a phenomenal land with a mix of vibrant culture, luxury, and adventure. Your holiday packages in India can land you to some of the iconic places to visit and the best things to do on your trip to India. From the variety of delicious cuisines to astonishing architecture and sensuous beaches, this pristine country offers a thrilling experience to each traveller. Our travel experts at Travanya can help you plan your long-awaited vacation by combining the best tour packages in India with flights to India.</p>
                            <h2 className="fs-20 fw-bold color-blue">Top Things To Do On India Tour</h2>
                            <ul className="DotList fs-14">
                                <li className="my-1">Walkthrough the colourful streets of<strong> Delhi </strong>which are ideal for travellers who need a dose of history, the best food, and affordable yet trendiest shopping places.</li>
                                <li className="my-1">Visiting <strong>Darjeeling</strong> in the winter season will leave you spellbound. The blooming gardens, glittering sunshine and lush green tea fields everywhere are sure to set panoramic views.</li>
                                <li className="my-1">Stroll around the rich heritage points of <strong>Jaipur </strong>that include <em>Jal Mahal, City Palace, Nahargarh Fort, Jantar Mantar, </em>and<em> Amber Palace.</em></li>
                                <li className="my-1">Experience the unmatchable energy of <strong>Goa</strong> beaches and celebrate the best moments of your life. Spend some quality time away from all the daily fuss at <em>Baga Beach, Dudhsagar Waterfalls, Calangute Beach, </em>and<em> Aguada Fort. </em></li>
                                <li className="my-1">Wander around the “City of Dreams” <strong>Mumbai</strong> and walk along the <em>Marine Drive</em> with a Mumbai famous Vadapav in your hand. Visit <em>Juhu Beach, Elephanta Caves</em> and <em>Bollywood Film City</em>. </li>
                                <li className="my-1">Order a plate of momos with a cup of chai, and see the fur-ball like clouds passing between the alluring mountains of <strong>Himachal Pradesh</strong>. Trek to the <em>Rohtang Pass</em>, Manali and have unlimited fun in the snow.</li>
                            </ul>
                            <h2 className="fs-20 fw-bold color-blue">India Tour Packages By Destination</h2>
                            <p className="fs-14">Starting from the snowy mountains of Kashmir to the magnificent ocean of Kanyakumari, India hits the list of favourite destinations of most tourists around the world. The countless hill stations of <strong>Uttrakhand, Himachal Pradesh, Meghalaya</strong>, <strong>Sikkim </strong>and <strong>Arunachal </strong>Pradesh can take you to a whole new world of freedom. The metropolitan cities on the other hand like <strong>Chennai, Pune, Kolkata</strong>, <strong>Delhi, Hyderabad</strong>, and <strong>Ahmedabad </strong>are surely going to make your romantic getaways or family tours worthwhile. Travanya brings you the cheapest holiday packages in India for you to have a vacation, you always dreamt of.</p>
                            <h2 className="fs-20 fw-bold color-blue">India Tour Packages By Region</h2>
                            <p className="fs-14">Your holiday packages in India can take you to a blissful yet overwhelming experience. From an endless number of tourism choices to the wide range of food to taste, visiting India is total bliss. The rich heritage of <strong>North India</strong>, ancient temples of <strong>South India</strong>, jaw-dropping monasteries of the <strong>North East</strong>, and pristine beaches of <strong>West India</strong> together makes it a perfect country to visit. To cherish this exciting journey for the rest of your life, reserve the best India tour packages with Travanya. Our travel agents run the extra mile to provide the best customer satisfaction in addition to affordable vacation packages.</p>
                            <h2 className="fs-20 fw-bold color-blue">India Tour By Season</h2>
                            <p className="fs-14">India’s 3 most important seasons: Summer, Winter and Monsoon are the best time to travel around India and cherish its beauty. Travanya brings the most competitive holiday tour packages in India for all kinds of travellers. Whether you want an exotic honeymoon or want to explore with your friends, our travel agents guide you with the best time to plan your India tour. But make sure to brief your choice of destination to our expert planners over the call. Our exceptional knowledge can present you with the best options and cheap India tour packages for a memorable tour for life.</p>
                            <h2 className="fs-20 fw-bold color-blue">India Tour By Month</h2>
                            <p className="fs-14">India is a huge country with weather varying from one state to another. The tourists often get puzzled while picking the right month to travel the destination on their bucket list. From snow-covered mountains to the exotic land of beaches, travellers can enjoy all kinds of weather when in India. This beautiful land ensures that you have a great time here on your journey and get to see a lot of things. Each month in India has a spark and all you need to do is explore our holiday packages from India to pick the best option month-wise.</p>
                            <h2 className="fs-20 fw-bold color-blue">Popular India Tour Packages</h2>
                            <p className="fs-14">Travanya specializes in customised holiday packages for families, couples, friends and business travellers. We believe in bringing the best to our customers by arranging everything from flight tickets and hotel recommendations to pick and drop facilities, and meals. Let us plan the best tour packages in India for you. So, if you are confused about where to start, your travel companion Travanya has come up with some cheap tour packages in india with a price. We believe in making travel easier for you, and we do this well!</p>

                            <a href="#" className="text-decoration-none fs-14 color-blue fw-bold" id="btn-less" data-controls="#collapseCnt" data-sibling="#btn-more">Show less</a>
                        </div>
                        <div className="col-12 mt-4">
                            <DomesticTourPackages></DomesticTourPackages>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-grey py-5 mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="subHeading">
                                <h2 className="mb-4 fw-normal">Frequently Asked  <strong className="color-orange">Questions</strong></h2>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="accordion fs-14" id="accordionExample">
                                {faqs.map((faq, ix) => {
                                    return <div key={ix} className="accordion-item">
                                        <h2 className="accordion-header" id={"heading" + ix}>
                                            <button className={ix == 0 ? "color-blue fw-bold accordion-button" : "color-blue fw-bold accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={"#FAQ" + ix} aria-expanded={ix == 0 ? "true" : "false"} aria-controls={"FAQ" + ix}>Q: {faq.Question}</button>
                                        </h2>
                                        <div id={"FAQ" + ix} className={ix == 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <strong>Answer:</strong> {faq.Answer}
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </Layout>
    )
}

// export async function generateMetadata() {

//     return {
//         title: 'India Tour Packages | Book India Holiday Packages At Travanya',
//         description: 'Planning to explore India? Travanya offers India Tour Packages at the lowest price in your budget. Book now to get exclusive discounts on your India holidays.',
//         alternates: {
//             canonical: `${appBaseURL}india-tour-packages/`,
//         },
//         openGraph: {
//             title: 'India Tour Packages | Book India Holiday Packages At Travanya',
//             description: 'Planning to explore India? Travanya offers India Tour Packages at the lowest price in your budget. Book now to get exclusive discounts on your India holidays.',
//             type: "article",
//             images: 'https://assets.travanya.com/logo.webp',
//             url: `${appBaseURL}india-tour-packages/`
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: 'India Tour Packages | Book India Holiday Packages At Travanya',
//             description: 'Planning to explore India? Travanya offers India Tour Packages at the lowest price in your budget. Book now to get exclusive discounts on your India holidays.',
//             images: ['https://assets.travanya.com/logo.webp'],
//             site: "@TravanyaHoliday"
//         },
//     }
// }