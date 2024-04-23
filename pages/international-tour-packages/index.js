import InternationalTourPackages from "@/app/components/International-Tour-Packages";
import Layout from "@/app/components/_layout";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import PartnerLogo from "@/app/components/partner-logo";
import SearchSection from "@/app/components/search-section";
import { appBaseURL } from "@/app/config";
import Head from "next/head";
import { usePathname } from "next/navigation";


export default function InternationalTourpackages() {
    const pathname = usePathname();
    const faqs = [
        { Question: 'What are the ideal places to visit for married couples?', Answer: 'If you are looking for the best international honeymoon packages then visit our website to know more about our offers. You can book your tour for an adventure getaway or amazing destinations including Mauritius, Singapore, Maldives, Paris, London, Thailand, France, Hong Kong, Sri Lanka, New Zealand, or transcontinental Countries like Russia, Kazakhstan, Turkey, and Egypt.' },
        { Question: 'What are the most amazing destinations around the world to visit with kids?', Answer: 'If you are planning a family vacation with your kids then you can plan a trip to an adventure retreat like California, Maldives, Alaska, Hawaii, Las Vegas, New York, Washington, DC, East Asia etc.' },
        { Question: 'Is a passport required if I am planning an international tour from India?', Answer: 'Yes, if you are booking international tour packages from India then you must have a passport as it is mandatory for all foreign travellers.' },
        { Question: 'What type of visa is required to travel abroad as a tourist?', Answer: 'A tourist visa is required to travel abroad. As it is advisable to apply for your tourist visa well in advance for a hassle-free holiday.' },
        { Question: 'How can I book my cheap international flights from Travanya?', Answer: 'If you are planning to book international holiday packages from India then you can book your international flights with Travanya by contacting them or visiting our official website at affordable rates.' },
        { Question: 'Which countries provide visas on arrival to Indian passport holders?', Answer: 'There are many countries that provide visas on arrival including Indonesia, Fiji, Jordan, Cambodia, Hong Kong, Nepal, Bhutan, etc.' }
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
                <title>Book International Tour Packages Online From India | Travanya</title>
                <meta name="description" content="Book International Tour Packages Online at the best price with Travanya and get amazing discounts on your next tour. Call Now @ +91-800 023 5865." />
                <link rel="canonical" href={`${appBaseURL}${pathname.replace('/', '')}`} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Book International Tour Packages Online From India | Travanya" />
                <meta property="og:description" content="Book International Tour Packages Online at the best price with Travanya and get amazing discounts on your next tour. Call Now @ +91-800 023 5865." />
                <meta property="og:url" content={`${appBaseURL}${pathname.replace('/', '')}`} />
                <meta property="og:site_name" content="Travanya" />
                <meta property="og:image" content="https://assets.travanya.com/logo.webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TravanyaHoliday" />
                <meta name="twitter:title" content="Book International Tour Packages Online From India | Travanya" />
                <meta name="twitter:description" content="Book International Tour Packages Online at the best price with Travanya and get amazing discounts on your next tour. Call Now @ +91-800 023 5865." />
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
                            "name": "International Tour Packages"
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
                        <li className="breadcrumb-item active" aria-current="page">International Tour Packages</li>
                    </ol>
                </nav>
            </div>

            <section className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="subHeading">
                                <h2 className="mb-3 fw-normal">International <strong className="color-orange">Tour Packages</strong></h2>
                            </div>
                        </div>
                        <div className="col-12">
                            <p className="fs-14">Travelling abroad is everyone’s dream. An inclination to explore culture and language, meet new people from all over the world, witness exemplary and iconic architecture, amazing sights, enjoy pristine beaches, taste diverse cuisines, and unwind history drives all to travel to another picturesque country. If you are someone who wants to visit the world’s most amazing international holiday destinations that are truly fascinating then find the <strong>cheapest international tour packages </strong>for yourself.</p>
                            <p className="fs-14">Why is it so interesting to discover and admire new societies and cultures! Well, there are countless reasons to explore another part of the world. Some people think that travelling globally is expensive, but it is not. When organized effectively, your international tour can be more affordable. All you have to do is plan and book <strong>world tour packages</strong> in advance. At Travanya, we have arranged some of the best <strong>international holiday packages </strong>for you so that you can board a plane and travel the world without worrying about the travel budget or burning a big hole in your pocket.</p>
                            <h2 className="fs-20 fw-bold color-blue">Explore the best Selling Tour Packages</h2>
                            <p className="fs-14">A vacation in a wonderful land will provide a never-ending memory for every single person. Everyone feels eager to travel to a foreign destination and get acquainted with the culture, explore their way of life, and admire the natural beauty of man-made creations. Nowadays it is not a big deal to spend the holidays at your dream destination. As such, we bring you the best deals at Travanya so that you can enjoy your adventure tour according to your budget.</p>
                            <p className="fs-14">Our <strong>best-selling tour packages</strong> include many amazing and Mediterranean countries around the world. You can also access the best and cheapest discounts available on our website or contact our experts to know more about our international holiday packages. The <strong>world tour packages </strong>offered by Travanya are very affordable and suit the unique timetable, taste, expense plan, and requirement.</p>
                            <h2 className="fs-20 fw-bold color-blue">Cheap And Best International Holiday Packages</h2>
                            <p className="fs-14">As the name suggests, international holidays are extraordinary, are you searching for some amazing and the <strong>cheapest international travel packages</strong>! Here, at Travanya we offer you the best and most modest international trip packages to explore a world you never knew or imagined before. You don’t have to worry about anything when you intend to travel to your dream destination. Working as one of the <strong>best tour and travel companies</strong>, we understand the need to spend a memorable time with your family or friend, hence we provide our clients with <strong>cheap international holiday packages</strong>.</p>
                            <h2 className="fs-20 fw-bold color-blue">International Tour Packages By Destination</h2>
                            <p className="fs-14">Almost everyone hopes that life will return to normal and change from the usual. Some people choose quieter places like beautiful valleys or towns with amazing views and sandy beaches or isolated islands to get away from their busy lifestyles. Or on the other hand, you might be one of those people who are looking for experience, excitement, and fun during their holidays. Maybe, your tour is rooted in history and as a result, you get a chance to notice, respect, and learn about the religious destinations, pit road experiences, and national forest from different tourist places. Or you are among those who are looking for a romantic getaway or beach destinations to admire the beauty of nature with your loved one.</p>
                            <p className="fs-14">There are so many places on the planet that offer some unique experiences to travellers. As a result, the list of our international travel packages available might excite you even more. Including practically all of Cape Town, Sri Lanka, Dubai, Japan, Hong Kong, Mauritius, European Countries, etc.</p>
                            <p className="fs-14">During your unfamiliar excursions, cherish a part of those paramount minutes you never had. Another motivation for choosing foreign lands is that they offer something more that goes beyond your creative mind. At Travanya, the amazing range of flight fares, as well as international vacation packages, gives you the best and fun-filled experiences at an affordable price. So plan your vacation accordingly that includes maximum benefits during your travels.</p>
                            <h2 className="fs-20 fw-bold color-blue">International Tour Packages by Theme</h2>
                            <p className="fs-14">Be it a special night out or just another excursion, our international <strong>family tour packages </strong>as well as packages for couples or solo trips ensure that your vacation is purely fantastic. Whether you are looking for a location ideal for families, a hearty venture, or an enthralling experience, our organized <strong>foreign tour packages</strong> will amaze you. Choosing your dream vacation as per your interest helps you to relive pastoral memories and experience thrilling adventures that cannot be forgotten!! From memorable vacations to beach holidays, or trips to Asia, Africa, America, Antarctica, Europe, United Arab Emirates, and Australia, you will surely find the perfect getaways for you. For a lovebird or group of friends, or anything like that, experience wonderful love, relaxation, and much more with our international packages.</p>
                            <p className="fs-14">The main advantage of booking foreign vacation packages with us is that by no means, you are not limited to getting discounts for your holidays. Travanya being the best travel agency, as a result, we are offering you truly customized and <strong>cheap international tour packages</strong>! Explore the world, make new friends, discover new places, uncover secrets and satisfy your journey with us. Our experts work day and night to plan a memorable vacation that includes everything from romantic escapades to a place ideal for families. Plus, our comprehensive <strong>foreign tour packages </strong>make sure that we share the notoriety travel service, provided with the utmost care.</p>
                            <h2 className="fs-20 fw-bold color-blue">International Tour Packages By Month</h2>
                            <p className="fs-14">The world dazzles you every time but if you know about the perfect destination according to the month, you are ready for the all-rounder experience. Every month brings a new opportunity around the world whether it is colourful festivals or outdoor adventures or crowd-free places.</p>
                            <p className="fs-14">Generally, the best time to visit your favourite international destinations completely depends on your interest. Every month brings with it festivals, adventure sports, sightseeing, water activities, and many other fascinating experiences in different parts of the world. January is known for the parties welcoming the new year with celebrations as well as February is considered the occasion of dance festivals in different parts. Every place has its own influence because of the festive and exciting time to discover the scenic beauty of the land, visiting the amazing continent, and historical places with a natural feel, breath-taking beauty, and relaxing views.</p>
                            <h2 className="fs-20 fw-bold color-blue">International Tour Packages By Seasons</h2>
                            <p className="fs-14">The world tour by season offers every phase of the earth and different weather conditions around the world is the most enjoyable experience for every person. Everywhere in this beautiful world is blessed with coveted and appreciable weather and climate. There is snow, tropical sunshine, coldest winters, hot summers, and a blissful monsoon that keeps changing the list of best places to visit in every season.</p>
                            <p className="fs-14">Summer brings its own sweeping view of the best places to go on vacation. The Himalayas, the wide range of oceans, blue water, and scenic hill stations are there to rejuvenate your spirits. Monsoon dominates in different parts of the world. From pleasant rains to heavy rainfall, this season is blissful. And, the winter season offers snow-capped mountains, trees, and snow-covered forests. Few places across the world offer a romantic getaway as well as the best environment with a beautiful view. Every place in the world offers a different experience to its visitors. Choose your memorable holiday destination by season, this will help you find the most memorable experience at the lowest cost.</p>
                            <h2 className="fs-20 fw-bold color-blue">International Tour Packages with Travanya</h2>
                            <p className="fs-14">The world is full of beautiful places that will make you believe in their natural beauty. So, whether you are looking for a romantic getaway or an adventure trip, we will offer affordable packages for every tour you have. Your luxury and pocket-friendly trips abroad are sorted at Travanya as we offer <strong>cheap international holiday packages</strong> to provide our customers with the best experience and service.</p>
                            <p className="fs-14">Planning a vacation to your favourite foreign land is enough to create wonderful memories with your loved one. For those who want to explore the world with their feet. International holidays are special for them as our packages promise you never-ending experiences. When it comes to providing the best services, we promise to plan a great tour at affordable prices. Many of our customers choose their vacation destination as per the amazing offers available on <strong>international tour packages for family</strong>, friends or couples for affordable travel destinations. Whether one is looking for adventurous experiences, thrilling experiences, or just looking for fun-filled experiences, our packages offer an abundance of experiences to choose from.</p>
                            <p className="fs-14">Choose the right place for your vacation with us amongst the fascinating destinations! We offer a wide range of both standard and customized deals and offers on <strong>overseas tour packages</strong>. So, stop searching, as Travanya offers the best booking experience to its customers. Book your <strong>international holiday package from India</strong> at your dream location within your budget.</p>
                            <p className="fs-14"><strong>Tips for Finding the Best International Tour Packages</strong></p>
                            <ul className="DotList fs-14">
                                <li className="my-1">One of the most important tips to keep in mind when planning international travel is to make sure your passport and visa are up to date. Check the expiry date of your passport and renew it if necessary.</li>
                                <li className="my-1">See travel warnings and medical advice for the country you plan to visit. Make sure your health insurance covers all the plans you need to travel abroad. Otherwise definitely buy travel insurance.</li>
                                <li className="my-1">While planning your vacation check the weather conditions of the country, it is also important to follow the necessary guidelines for the traveller suffering from some major health conditions. Pack your medicines and first aid kit during your trip accordingly.</li>
                                <li className="my-1">It is necessary to respect the culture and religion of the country. Also, learn about the dos and don’ts of the country and locals before planning your international adventure.</li>
                            </ul>
                        </div>
                        <div className="col-12 mt-4">
                            <InternationalTourPackages />
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
        </Layout >
    )
}

// export async function generateMetadata() {

//     return {
//         title: 'Book International Tour Packages Online From India | Travanya',
//         description: 'Book International Tour Packages Online at the best price with Travanya and get amazing discounts on your next tour. Call Now @ +91-800 023 5865.',
//         alternates: {
//             canonical: `${appBaseURL}international-tour-packages/`,
//         },
//         openGraph: {
//             title: 'Book International Tour Packages Online From India | Travanya',
//             description: 'Book International Tour Packages Online at the best price with Travanya and get amazing discounts on your next tour. Call Now @ +91-800 023 5865.',
//             type: "article",
//             images: 'https://assets.travanya.com/logo.webp',
//             url: `${appBaseURL}international-tour-packages/`
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: 'Book International Tour Packages Online From India | Travanya',
//             description: 'Book International Tour Packages Online at the best price with Travanya and get amazing discounts on your next tour. Call Now @ +91-800 023 5865.',
//             images: ['https://assets.travanya.com/logo.webp'],
//             site: "@TravanyaHoliday"
//         },
//     }
// }