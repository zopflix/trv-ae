import Head from "next/head";
import DomesticTourPackages from "@/app/components/Domestic-Tour-Packages";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import PartnerLogo from "@/app/components/partner-logo";
// import HolidayForm from "../components/holidayForm";
import SearchSection from '@/app/components/search-section'
import { appBaseURL } from "@/app/config";
import { usePathname } from "next/navigation";
import { useState } from 'react'


export default function Holidays() {
    const pathname = usePathname();
    const [noOfPassengers, setNoOfPassengers] = useState({ adults: 0, children: 0, infants: 0, cabin: '' });

    return (
        <>
            <Head>
                <title>Book Your Holiday Packages At Cheap Prices With Travanya</title>
                <meta name="description" content="Get your holiday packages booked with Travanya and save huge while you explore the world. Want to book cheap packages? Find your link to savings below. " />
                <link rel="canonical" href={`${appBaseURL}${pathname.replace('/', '')}`} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Book Your Holiday Packages At Cheap Prices With Travanya" />
                <meta property="og:description" content="Get your holiday packages booked with Travanya and save huge while you explore the world. Want to book cheap packages? Find your link to savings below. " />
                <meta property="og:url" content={`${appBaseURL}${pathname.replace('/', '')}`} />
                <meta property="og:site_name" content="Travanya" />
                <meta property="og:image" content="https://assets.travanya.com/logo.webp" />
                <meta property="og:image:type" content="image/webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TravanyaHoliday" />
                <meta name="twitter:title" content="Book Your Holiday Packages At Cheap Prices With Travanya" />
                <meta name="twitter:description" content="Get your holiday packages booked with Travanya and save huge while you explore the world. Want to book cheap packages? Find your link to savings below. " />
                <meta name="twitter:image" content="https://assets.travanya.com/logo.webp" />
            </Head >
            <Header></Header>
            <SearchSection setNoOfPassengers={setNoOfPassengers} selectedTab={0} />

            <PartnerLogo />
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="subHeading">
                                <h2 className="mb-3 fw-normal">Holiday <strong className="color-orange">Packages</strong></h2>
                            </div>
                        </div>
                        <DomesticTourPackages isHolidaysPage={true}></DomesticTourPackages>
                        <div className="col-12 mt-2">
                            <p className="fs-14">Planning a perfect holiday getaway? Check out our best <strong>holiday packages from UAE!</strong> Break free from the usual and find the world's wonders with our <strong>customized tour packages.</strong> Experience a vacation like no other with our <strong>holiday packages from Dubai, UAE</strong> provide an exceptional experience, offering a diverse range of options for your enjoyment. ensuring you have a truly memorable and enjoyable holiday. <button className="fs-12 color-blue bg-white border-0 p-0 d-inline-block">Read More</button></p>
                            <p className="fs-14">Our packages include great deals on flights and top-notch accommodations, offering you the best value. So, what are you waiting for? Grab your package now and start a journey to refresh your soul, mind, and body. Whether it’s exploring vibrant cities or lounging on sunny beaches, the choice is yours.</p>
                            <p className="fs-14">Travanya knows exactly what every tourist desires and needs, which is why we cater to our valued customers with utmost care. Book your <strong>holiday packages</strong> now, relax, and let us manage everything for you. It’s time to realize all your travel dreams. Let us make you feel special in our unique way. Don't miss our exceptional <strong>tour package offers from the UAE,</strong> providing both thrilling and serene holidays. These <strong>holiday packages from Dubai, UAE</strong>, are sure to leave you amazed. <button className="fs-12 color-blue bg-white border-0 p-0 d-inline-block">Show less</button></p>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="bg-grey py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="subHeading">
                                <h2 className="mb-3 fw-normal">International <strong className="color-orange">Tour Packages</strong></h2>
                            </div>
                        </div>
                        <div className="col-12">
                            <p className="fs-14">International destinations are spectacular and varied. From giving you the feel of futuristic cities to a warm embrace with the beauty of wide forests, sand dunes, the world is full of magnificent treasures waiting to be discovered. We at Travanya will help you identify the right destination to choose from for your holiday dreams. From transfers and accommodation</p>
                            <p className="fs-14"> to sightseeing opportunities, our <a className="text-decoration-none color-blue fw-bold" href="/international-tour-packages/">international tour packages</a> cater to every need.</p>
                            <p className="fs-14">We provide you with comprehensive solutions so that you and your loved ones can have a pleasant holiday. Whether you want to visit the historic cities of Europe, the rich cultural heritage and diversity of Africa, the natural wonders of Australia, the fascinating arts, culture, and cuisines of the Middle East or the Far East, we can help you to choose from our customized world tour packages which suit your needs. To make your decision easier, we want to show you what these different destinations have in store for you.</p>
                            <p className="fs-14">We at Travanya have crafted special tour packages for foreign destinations to help you realize your dream of overseas travel hassle-free. Our standard, as well as custom-made deals, cover a large part of this globe so that it doesn’t take you long to choose your favourite place of all. You can choose your dream destinations under <strong>Europe, Dubai, Far East, Middle East, Africa, Australia, Japan, New Zealand, Singapore, the Islands</strong>, etc. These continents further present country-wise selection. Explore our organized international vacation packages to find the best foreign land holiday deals for you.</p>
                            <p className="fs-14">At Travanya we have designed exclusive tour packages for foreign destinations so that you can make your dream of hassle-free foreign travel a reality. Our standard, as well as customized deals, cover a large portion of the world so that you can choose your favourite holiday location. The choice of destinations includes Hong Kong, Paris, Brazil, San Francisco, Rome, New York City, Vancouver, Cape Town, etc. These continents further present a country-wise selection. Book your international tour package to explore the world with the best overseas vacation deals available.</p>
                        </div>

                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="subHeading">
                                <h2 className="mb-3 fw-normal">Domestic <strong className="color-orange">Tour Packages</strong></h2>
                            </div>
                        </div>
                        <div className="col-12">
                            <p className="fs-14">India is a beautiful country known for its culture, visual arts, architecture, society, education, food, entertainment and natural richness. The land of diversity attracts the greatest number of <a className="text-decoration-none color-blue fw-bold" href="/tourism/india/">tourism in India</a> because of its multifaceted land, the highest mountain peak and the blue diamond Indian Ocean. Many travellers go to different places according to their interest to spend their holidays. Whether you are travelling with your family or friends, or you are a married couple, there are plenty of tourist places in India to choose from.</p>
                            <p className="fs-14">Well organized tour packages in India can save you a lot of time and money without any stress. Be it the Holi festival or the new year with family or friends, at Travanya, you can book holiday packages to many amazing holiday destinations on every occasion. In fact, we do a thorough search and bring you the list of your favourite holiday tour packages, all you have to do is book the travel package of your choice.</p>
                            <p className="fs-14">Are you one of those people who want to explore the green valleys and the natural beauty of India, or want to visit religious places during festivals, walk on sandy beaches in summer or are excited to learn about the history of India, you will find adventure experiences everywhere!! Whether you are looking to travel to North India or planning to spend a fun-filled holiday in South India as well as planning to visit <strong>Gulmarg, Darjeeling, Arunachal Pradesh, Kerala, Rajasthan,</strong> you will get an unforgettable experience. Because we here at Travanya provide you with the best <a className="text-decoration-none color-blue fw-bold" href="/india-tour-packages/">India Tour Packages</a> at discounted and affordable rates.</p>
                            <p className="fs-14">From your transportation to accommodation, we’ll take care of everything during your trip. The tour packages offered by us provide an experience that includes all the amenities without any hassle. Moreover, if you are a last-minute traveller, we promise to provide you with affordable and cheap India tour packages. With us, you can book the best and perfect holiday package to travel to India under your budget.</p>
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
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="color-blue fw-bold accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ1" aria-expanded="true" aria-controls="FAQ1">Q: Is it possible to make changes to my holiday tour package?</button>
                                    </h2>
                                    <div id="FAQ1" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>Answer:</strong>  Yes, you can modify your domestic or international tour package as per your choice.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="color-blue fw-bold accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ2" aria-expanded="false" aria-controls="FAQ2">Q: If I cancel my trip, what is the cancellation policy?</button>
                                    </h2>
                                    <div id="FAQ2" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>Answer:</strong>  The cancellation policy may vary depending on the holiday package, destination and day or hours of cancellation.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="color-blue fw-bold accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ3" aria-expanded="false" aria-controls="FAQ3">Q: Will, I get separate invoices for flights, hotels and transportation?</button>
                                    </h2>
                                    <div id="FAQ3" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>Answer:</strong>  You will receive a consolidated invoice for your holiday tour package, containing information about your flight, accommodation and transport facilities.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="color-blue fw-bold accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ4" aria-expanded="false" aria-controls="FAQ4">Q: Does my holiday tour package also include transportation services?</button>
                                    </h2>
                                    <div id="FAQ4" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>Answer:</strong>  Yes, transportation services are included in almost all our international and domestic tour packages. But it also depends on the region, destination and availability.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="color-blue fw-bold accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ5" aria-expanded="false" aria-controls="FAQ5">Does the tour package include rated hotels?</button>
                                    </h2>
                                    <div id="FAQ5" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>Answer:</strong>  Yes, our holiday tour packages offer our customers accommodation in recommended hotels based on their ratings and reviews.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <Footer></Footer>
        </>
    )
}

// export async function generateMetadata() {

//     return {
//         title: 'Book Your Holiday Packages At Cheap Prices With Travanya',
//         description: 'Get your holiday packages booked with Travanya and save huge while you explore the world. Want to book cheap packages? Find your link to savings below. ',
//         alternates: {
//             canonical: `${appBaseURL}holidays/`,
//         },
//         openGraph: {
//             title: 'Book Your Holiday Packages At Cheap Prices With Travanya',
//             description: 'Get your holiday packages booked with Travanya and save huge while you explore the world. Want to book cheap packages? Find your link to savings below. ',
//             type: "article",
//             images: 'https://assets.travanya.com/logo.webp',
//             url: `${appBaseURL}holidays/`
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: 'Book Your Holiday Packages At Cheap Prices With Travanya',
//             description: 'Get your holiday packages booked with Travanya and save huge while you explore the world. Want to book cheap packages? Find your link to savings below. ',
//             images: ['https://assets.travanya.com/logo.webp'],
//             site: "@TravanyaHoliday"
//         },
//     }
// }