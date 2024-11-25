"use client"
import Image from "next/image";
import Footer from "../components/footer";
import Header from "../components/header";
import PartnerLogo from "../components/partner-logo";
import SearchSection from "../components/search-section";
import { trvLoader } from "../helpers/imageKitLoader";

export default function FlightPage() {
    return (
        <>
            <Header />
            <SearchSection />

            <PartnerLogo />
            <section className="bg-grey pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="fw-bold color-blue fs-24">Finding Cheap Flights from the UAE to Other Countries?</h2>
                            <p className="fs-14">The United Arab Emirates (UAE) is a vibrant international travel hub, known for its modern infrastructure & well-connected airports. With its strategic location, it serves as a gateway for travelers seeking to explore various destinations across the globe.For those looking to maximize their travel budget, finding affordable flights is essential. In this guide, we will provide you with a step-by-step approach to searching for & booking cheap flights from the UAE to various countries. Whether you're planning a quick getaway or an extensive trip, these tips will help you navigate the process & secure the best deals available.</p>
                            <h2 className="fw-bold color-blue fs-24">Top Destinations with Cheap Flights from UAE</h2>
                            <p className="fs-14">These popular destinations offer affordable flight options, making it easier for travelers to explore new cultures and experiences without overspending.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="FlightsCards" className="bg-grey pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-3 my-3">
                            <div className="cards">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front rounded-4">
                                            <Image
                                                className="w-100 h-auto rounded-4"
                                                loader={trvLoader}
                                                src="cheap-flight-georgia.webp"
                                                alt="cheap-flight-canada"
                                                width={35}
                                                height={35}
                                            />
                                            <div className="frontDetail">
                                                <p className="flightinfo color-white mb-0">Cheap Flights To</p>
                                                <h2 className="airlineName color-white fs-20 fw-bold">Frontier Airlines</h2>
                                            </div>
                                        </div>
                                        <div className="flip-card-back rounded-4">
                                            <p className="flightinfo color-blue mb-0">Cheap Flights To</p>
                                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Frontier Airlines</h2>
                                            <p className="fs-12 my-2">If you're looking to explore the charming landscapes and rich culture of Georgia, you're in luck! These routes often feature competitive prices, making it easier for travelers to enjoy everything this beautiful country has to offer. </p>
                                            <p className="fs-12 mb-0 color-blue fw-bold">Dubai to Georgia, Abu Dhabi to Georgia & Sharjah to Georgia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 my-3">
                            <div className="cards">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front rounded-4">
                                            <Image
                                                className="w-100 h-auto rounded-4"
                                                loader={trvLoader}
                                                src="cheap-flight-maldivas.webp"
                                                alt="cheap-flight-canada"
                                                width={35}
                                                height={35}
                                            />
                                            <div className="frontDetail">
                                                <p className="flightinfo color-white mb-0">Cheap Flights To</p>
                                                <h2 className="airlineName color-white fs-20 fw-bold">Maldives</h2>
                                            </div>
                                        </div>
                                        <div className="flip-card-back rounded-4">
                                            <p className="flightinfo color-blue mb-0">Cheap Flights To</p>
                                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Maldives</h2>
                                            <p className="fs-12 my-2">The Maldives is a dream destination known for its beautiful beaches & crystal-clear waters. Travelers from the UAE can find great flight options, these routes often offer affordable fares, making it easier to escape to paradise & enjoy a relaxing getaway in this tropical haven.</p>
                                            <p className="fs-12 mb-0 color-blue fw-bold">Dubai to Maldives, Abu Dhabi to Maldives & Sharjah to Maldives</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 my-3">
                            <div className="cards">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front rounded-4">
                                            <Image
                                                className="w-100 h-auto rounded-4"
                                                loader={trvLoader}
                                                src="cheap-flight-singapore.webp"
                                                alt="cheap-flight-canada"
                                                width={35}
                                                height={35}
                                            />
                                            <div className="frontDetail">
                                                <p className="flightinfo color-white mb-0">Cheap Flights To</p>
                                                <h2 className="airlineName color-white fs-20 fw-bold">Singapore</h2>
                                            </div>
                                        </div>
                                        <div className="flip-card-back rounded-4">
                                            <p className="flightinfo color-blue mb-0">Cheap Flights To</p>
                                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Singapore</h2>
                                            <p className="fs-12 my-2">Singapore is a sparkling city-state known for its modern attractions & cultural heritage. Travelers from the UAE can take advantage of affordable flights on popular routes. These routes frequently feature competitive prices, allowing you to explore the iconic sights, delicious cuisine, & diverse neighborhoods of this amazing destination on a budget. </p>
                                            <p className="fs-12 mb-0 color-blue fw-bold">Dubai to Singapore, Abu Dhabi to Singapore & Sharjah to Singapore</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 my-3">
                            <div className="cards">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front rounded-4">
                                            <Image
                                                className="w-100 h-auto rounded-4"
                                                loader={trvLoader}
                                                src="cheap-flight-thailand.webp"
                                                alt="cheap-flight-canada"
                                                width={35}
                                                height={35}
                                            />
                                            <div className="frontDetail">
                                                <p className="flightinfo color-white mb-0">Cheap Flights To</p>
                                                <h2 className="airlineName color-white fs-20 fw-bold">Thailand</h2>
                                            </div>
                                        </div>
                                        <div className="flip-card-back rounded-4">
                                            <p className="flightinfo color-blue mb-0">Cheap Flights To</p>
                                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Thailand</h2>
                                            <p className="fs-12 my-2">Thailand is a popular travel destination famed for its beautiful beaches, crowded cities, & delicious food. From the UAE, travelers can find great flight deals on popular routes. These routes offer reasonable fares, making it easy to experience Thailand's culture, landscapes, & markets, Thailand is just a flight away!</p>
                                            <p className="fs-12 mb-0 color-blue fw-bold">Dubai to Thailand, Abu Dhabi to Thailand & Sharjah to Thailand</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 my-3">
                            <div className="cards">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front rounded-4">
                                            <Image
                                                className="w-100 h-auto rounded-4"
                                                loader={trvLoader}
                                                src="cheap-flight-usa.webp"
                                                alt="cheap-flight-canada"
                                                width={35}
                                                height={35}
                                            />
                                            <div className="frontDetail">
                                                <p className="flightinfo color-white mb-0">Cheap Flights To</p>
                                                <h2 className="airlineName color-white fs-20 fw-bold">USA</h2>
                                            </div>
                                        </div>
                                        <div className="flip-card-back rounded-4">
                                            <p className="flightinfo color-blue mb-0">Cheap Flights To</p>
                                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">USA</h2>
                                            <p className="fs-12 my-2">The USA offers a diverse range of experiences, from iconic landmarks to vibrant cities. Travelers from the UAE can find reasonable flight options, that frequently feature competitive prices, making it easier to explore everything. Whether you're planning a family vacation or a solo adventure.</p>
                                            <p className="fs-12 mb-0 color-blue fw-bold">Dubai to USA, Abu Dhabi to USA & Sharjah to USA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 my-3">
                            <div className="cards">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front rounded-4">
                                            <Image
                                                className="w-100 h-auto rounded-4"
                                                loader={trvLoader}
                                                src="cheap-flight-canada.webp"
                                                alt="cheap-flight-canada"
                                                width={35}
                                                height={35}
                                            />
                                            <div className="frontDetail">
                                                <p className="flightinfo color-white mb-0">Cheap Flights To</p>
                                                <h2 className="airlineName color-white fs-20 fw-bold">Canada</h2>
                                            </div>
                                        </div>
                                        <div className="flip-card-back rounded-4">
                                            <p className="flightinfo color-blue mb-0">Cheap Flights To</p>
                                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Canada</h2>
                                            <p className="fs-12 my-2">Canada is a pretty country known for its unique nature & cities. If you're traveling from the UAE, you can find economical flight options these routes often provide attractive fares, allowing you to immerse yourself in Canada's rich culture, landscapes, & friendly communities.  </p>
                                            <p className="fs-12 mb-0 color-blue fw-bold">Dubai to Canada, Abu Dhabi to Canada & Sharjah to Canada</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="CheapFlightUAE" className="bg-blue py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5">
                            <div className="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button className="nav-link active" id="v-Low-Cost-Carriers-tab" data-bs-toggle="pill" data-bs-target="#v-Low-Cost-Carriers" type="button" role="tab" aria-controls="v-Low-Cost-Carriers" aria-selected="true">Low-Cost Carriers</button>
                                <button className="nav-link my-3" id="v-Full-Service-Airlines-Offering-Discounts-tab" data-bs-toggle="pill" data-bs-target="#v-Full-Service-Airlines-Offering-Discounts" type="button" role="tab" aria-controls="v-Full-Service-Airlines-Offering-Discounts" aria-selected="false">Full-Service Airlines Offering Discounts</button>
                                <button className="nav-link" id="v-Other-Notable-UAE-Airlines-tab" data-bs-toggle="pill" data-bs-target="#v-Other-Notable-UAE-Airlines" type="button" role="tab" aria-controls="v-Other-Notable-UAE-Airlines" aria-selected="false">Other Notable UAE Airlines</button>
                            </div>
                        </div>
                        <div className="col-12 col-md-7">
                            <h2 className="color-white fs-24">Best Airlines for Cheap Flights from UAE</h2>
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-Low-Cost-Carriers" role="tabpanel" aria-labelledby="v-Low-Cost-Carriers-tab">
                                    <h3 className="color-orange fw-bold fs-22">Low-Cost Carriers</h3>
                                    <div className="color-white fs-14">
                                        <p><span className="fw-bold">Flydubai:</span> Offers affordable flights to various destinations in the Middle East, Asia, and Europe.</p>
                                        <p><span className="fw-bold">Wizz Air:</span> Operates from Abu Dhabi, providing budget-friendly fares to numerous European cities.</p>
                                        <p><span className="fw-bold">Air Arabia:</span> Based in Sharjah, this airline covers multiple destinations in the Middle East, North Africa, and South Asia.</p>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="v-Full-Service-Airlines-Offering-Discounts" role="tabpanel" aria-labelledby="v-Full-Service-Airlines-Offering-Discounts-tab">
                                    <h3 className="color-orange fw-bold fs-22">Full-Service Airlines Offering Discounts</h3>
                                    <div className="color-white fs-14">
                                        <p><span className="fw-bold">Emirates:</span> Known for its premium service, Emirates often has discounts and promotions for flights worldwide.</p>
                                        <p><span className="fw-bold">Etihad Airways:</span> The national carrier of the UAE, offering competitive pricing and special deals for early bookings.</p>
                                        <p><span className="fw-bold">Qatar Airways:</span> Frequently provides discounted fares, especially during sales events for international routes.</p>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="v-Other-Notable-UAE-Airlines" role="tabpanel" aria-labelledby="v-Other-Notable-UAE-Airlines-tab">
                                    <h3 className="color-orange fw-bold fs-22">Other Notable UAE Airlines</h3>
                                    <div className="color-white fs-14">
                                        <p><span className="fw-bold">Abu Dhabi-based Airlines:</span> Airlines like SkyCargo and Royal Jet may also offer budget options for travelers.</p>
                                        <p><span className="fw-bold">Charter Airlines:</span> Consider charter services for affordable group travel options to popular destinations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-grey">
                <div className="container">
                    <div className="col-12">
                        <Image
                            className="w-100 h-auto my-3"
                            loader={trvLoader}
                            src=""
                            alt="Flights Banner"
                            width={35}
                            height={35}
                        />
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="color-blue fw-bold fs-24">Money-Saving Tips to Find Cheap Flights from UAE</h2>
                        </div>
                        <div className="col-12 col-md-6 my-2"></div>
                        <div className="col-12 col-md-6 my-2">
                            <div className="">
                                <div className="row">
                                    <div className="col-4 col-md-3 col-lg-2">
                                        <Image
                                            className="w-100 h-auto"
                                            loader={trvLoader}
                                            src=""
                                            alt=""
                                            width={35}
                                            height={35}
                                        />
                                    </div>
                                    <div className="col-8 col-md-9 col-lg-10">
                                        <h3 className="fs-18 fw-bold color-blue">Bundling Flights with Accommodations:</h3>
                                        <p className="fs-12">Look for travel package deals that combine flights & hotels, as this can often save you money compared to booking separately.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}