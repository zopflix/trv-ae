import Layout from "./_layout";
import Footer from "./footer";
import { capitalizeEachWord } from "../helpers/common";
import PartnerLogo from "./partner-logo";
import SearchSection from "./search-section";
import { usePathname } from 'next/navigation';
import { Fragment, useState } from "react";
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";

export default function FlightsData(props) {
  const path = usePathname();
  const [noOfPassengers, setNoOfPassengers] = useState({ adults: 0, children: 0, infants: 0, cabin: '' });

  return (
    <>
      <Layout />
      <SearchSection setNoOfPassengers={setNoOfPassengers} selectedTab={0} />
      <PartnerLogo></PartnerLogo>

      <div className="container py-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            {props?.data?.parent &&
              <li className={props?.data?.child1 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child1 ? <a href={`/${props.data.parent}/`}>{capitalizeEachWord(props.data.parent.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child1 &&
              <li className={props?.data?.child2 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child2 ? <a href={`/${props.data.parent}/${props.data.child1}/`}>{capitalizeEachWord(props.data.child1.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child2 &&
              <li className={props?.data?.child3 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child3 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/`}>{capitalizeEachWord(props.data.child2.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child3 &&
              <li className={props?.data?.child4 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child4 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/`}>{capitalizeEachWord(props.data.child3.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child4 &&
              <li className={props?.data?.child5 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child5 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/${props.data.child4}/`}>{capitalizeEachWord(props.data.child4.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child5 &&
              <li className={props?.data?.child6 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child6 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/${props.data.child4}/${props.data.child5}/`}>{capitalizeEachWord(props.data.child5.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child6 &&
              <li className={props?.data?.child4 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child7 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/${props.data.child4}/${props.data.child5}/${props.data.child6}/`}>{capitalizeEachWord(props.data.child6.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child7 &&
              <li className={props?.data?.child4 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child8 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/${props.data.child4}/${props.data.child5}/${props.data.child6}/${props.data.child7}/`}>{capitalizeEachWord(props.data.child7.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child8 &&
              <li className="breadcrumb-item active" aria-current="page">{capitalizeEachWord(props.data.bannerTitle)}</li>
            }
            {path === '/flights/' &&
              <li className="breadcrumb-item active" aria-current="page">Flights</li>
            }
          </ol>
        </nav>
      </div>

      {path === '/flights/'
        ? <Fragment>
          <section className="pt-3">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="text-center d-table m-auto mb-5">
                    <h1 className="color-blue fw-bold">Cheap Flights from the UAE</h1>
                    <hr className="w-50 m-auto border-blue border-2 opacity-100" />
                  </div>
                  <h2 className="fw-bold color-blue fs-24">Finding Cheap Flights from the UAE to Other Countries?</h2>
                  <p className="fs-14">The United Arab Emirates (UAE) is a vibrant international travel hub, known for its modern infrastructure & well-connected airports. With its strategic location, it serves as a gateway for travelers seeking to explore various destinations across the globe.For those looking to maximize their travel budget, finding affordable flights is essential. In this guide, we will provide you with a step-by-step approach to searching for & booking cheap flights from the UAE to various countries. Whether you're planning a quick getaway or an extensive trip, these tips will help you navigate the process & secure the best deals available.</p>
                  <h2 className="fw-bold color-blue fs-24">Top Destinations with Cheap Flights from UAE</h2>
                  <p className="fs-14">These popular destinations offer affordable flight options, making it easier for travelers to explore new cultures and experiences without overspending.</p>
                </div>
              </div>
            </div>
          </section>
          <section id="FlightsCards" className="bg-grey py-2 mt-2">
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
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="flightinfo color-white mb-0 fw-bold">Cheap Flights To</p>
                                <h2 className="airlineName color-white fs-20 fw-bold">Georgia</h2>
                              </div>
                              <div className="text-end">
                                <p className="mb-0 color-white fs-18 fw-bold">AED 631</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flip-card-back rounded-4">
                          <a href="/flights/uae-to-georgia-flight/" target="_blank" rel="noreferrer">
                            <p className="flightinfo color-blue mb-0 fw-bold">Cheap Flights To</p>
                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Georgia</h2>
                          </a>
                          <p className="fs-12 my-2">If you're looking to explore the charming landscapes and rich culture of Georgia, you're in luck! These routes often feature competitive prices, making it easier for travelers to enjoy everything this beautiful country has to offer. </p>
                          <ul className="fs-12 ms-0 ps-3">
                            <li><a className="color-blue" href="/flights/uae-to-georgia-flight/" target="_blank" rel="noreferrer">Dubai to Georgia - AED 896</a></li>
                            <li><a className="color-blue" href="/flights/uae-to-georgia-flight/" target="_blank" rel="noreferrer">Abu Dhabi to Georgia - AED 731</a></li>
                            <li><a className="color-blue" href="/flights/uae-to-georgia-flight/from-sharjah-shj/" target="_blank" rel="noreferrer">Sharjah to Georgia - AED 631</a></li>
                          </ul>
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
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="flightinfo color-white mb-0 fw-bold">Cheap Flights To</p>
                                <h2 className="airlineName color-white fs-20 fw-bold">Maldives</h2>
                              </div>
                              <div className="text-end">
                                <p className="mb-0 color-white fs-18 fw-bold">AED 383</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flip-card-back rounded-4">
                          <a href="/flights/uae-to-maldives-flight/" target="_blank" rel="noreferrer">
                            <p className="flightinfo color-blue mb-0 fw-bold">Cheap Flights To</p>
                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Maldives</h2>
                          </a>
                          <p className="fs-12 my-2">The Maldives is a dream destination known for its beautiful beaches & crystal-clear waters. Travelers from the UAE can find great flight options, these routes often offer affordable fares, making it easier to escape to paradise & enjoy a relaxing getaway in this tropical haven.</p>
                          <ul className="fs-12 ms-0 ps-3">
                            <li><a className="color-blue" href="/flights/uae-to-maldives-flight/from-dubai-dxb/" target="_blank" rel="noreferrer">Dubai to Maldives Flights - AED 462</a></li>
                            <li><a className="color-blue" href="/flights/uae-to-maldives-flight/from-abu-dhabi-auh/" target="_blank" rel="noreferrer">Abu Dhabi to Maldives Flights - AED 383</a></li>
                          </ul>
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
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="flightinfo color-white mb-0 fw-bold">Cheap Flights To</p>
                                <h2 className="airlineName color-white fs-20 fw-bold">Singapore</h2>
                              </div>
                              <div className="text-end">
                                <p className="mb-0 color-white fs-18 fw-bold">AED 764</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flip-card-back rounded-4">
                          <a href="/flights/uae-to-singapore-flight/" target="_blank" rel="noreferrer">
                            <p className="flightinfo color-blue mb-0 fw-bold">Cheap Flights To</p>
                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Singapore</h2>
                          </a>
                          <p className="fs-12 my-2">Singapore is a sparkling city-state known for its modern attractions & cultural heritage. Travelers from the UAE can take advantage of affordable flights on popular routes. These routes frequently feature competitive prices, allowing you to explore the iconic sights, delicious cuisine, & diverse neighborhoods of this amazing destination on a budget. </p>
                          <ul className="fs-12 ms-0 ps-3">
                            <li><a className="color-blue" href="/flights/uae-to-singapore-flight/from-dubai-dxb/" target="_blank" rel="noreferrer">Dubai to Singapore Flights - AED 1,472</a></li>
                            <li><a className="color-blue" href="/flights/uae-to-singapore-flight/from-abu-dhabi-auh/" target="_blank" rel="noreferrer">Abu Dhabi to Singapore Flights - AED 764</a></li>
                          </ul>
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
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="flightinfo color-white mb-0 fw-bold">Cheap Flights To</p>
                                <h2 className="airlineName color-white fs-20 fw-bold">Thailand</h2>
                              </div>
                              <div className="text-end">
                                <p className="mb-0 color-white fs-18 fw-bold">AED 821</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flip-card-back rounded-4">
                          <a href="/flights/uae-to-thailand-flight/" target="_blank" rel="noreferrer">
                            <p className="flightinfo color-blue mb-0 fw-bold">Cheap Flights To</p>
                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Thailand</h2>
                          </a>
                          <p className="fs-12 my-2">Thailand is a popular travel destination famed for its beautiful beaches, crowded cities, & delicious food. From the UAE, travelers can find great flight deals on popular routes. These routes offer reasonable fares, making it easy to experience Thailand's culture, landscapes, & markets, Thailand is just a flight away!</p>
                          <ul className="fs-12 ms-0 ps-3">
                            <li><a className="color-blue" href="/flights/uae-to-thailand-flight/from-dubai-dxb/" target="_blank" rel="noreferrer">Dubai to Thailand Flights - AED 821</a></li>
                            <li><a className="color-blue" href="/flights/uae-to-thailand-flight/from-abu-dhabi-auh/" target="_blank" rel="noreferrer">Abu Dhabi to Thailand Flights - AED 845</a></li>
                          </ul>
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
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="flightinfo color-white mb-0 fw-bold">Cheap Flights To</p>
                                <h2 className="airlineName color-white fs-20 fw-bold">USA</h2>
                              </div>
                              <div className="text-end">
                                <p className="mb-0 color-white fs-18 fw-bold">AED 2,444</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flip-card-back rounded-4">
                          <a href="/flights/uae-to-usa-flight/" target="_blank" rel="noreferrer">
                            <p className="flightinfo color-blue mb-0 fw-bold">Cheap Flights To</p>
                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">USA</h2>
                          </a>
                          <p className="fs-12 my-2">The USA offers a diverse range of experiences, from iconic landmarks to vibrant cities. Travelers from the UAE can find reasonable flight options, that frequently feature competitive prices, making it easier to explore everything. Whether you're planning a family vacation or a solo adventure.</p>
                          <ul className="fs-12 ms-0 ps-3">
                            <li><a className="color-blue" href="/flights/uae-to-usa-flight/from-dubai-dxb/" target="_blank" rel="noreferrer">Dubai to USA Flights - AED 2,444</a></li>
                          </ul>
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
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="flightinfo color-white mb-0 fw-bold">Cheap Flights To</p>
                                <h2 className="airlineName color-white fs-20 fw-bold">Canada</h2>
                              </div>
                              <div className="text-end">
                                <p className="mb-0 color-white fs-18 fw-bold">AED 1,619</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flip-card-back rounded-4">
                          <a href="/flights/uae-to-canada-flight/" target="_blank" rel="noreferrer">
                            <p className="flightinfo color-blue mb-0 fw-bold">Cheap Flights To</p>
                            <h2 className="mn-0 airlineName color-blue fs-20 fw-bold">Canada</h2>
                          </a>
                          <p className="fs-12 my-2">Canada is a pretty country known for its unique nature & cities. If you're traveling from the UAE, you can find economical flight options these routes often provide attractive fares, allowing you to immerse yourself in Canada's rich culture, landscapes, & friendly communities.  </p>
                          <ul className="fs-12 ms-0 ps-3">
                            <li><a className="color-blue" href="/flights/uae-to-canada-flight/from-dubai-dxb/" target="_blank" rel="noreferrer">Dubai to Canada Flights - AED 2,421</a></li>
                            <li><a className="color-blue" href="/flights/uae-to-canada-flight/from-abu-dhabi-auh/" target="_blank" rel="noreferrer">Abu Dhabi to Canada Flights - AED 1,619</a></li>
                          </ul>
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
          <section className="bg-grey pb-4">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Image
                    className="w-100 h-auto my-5 rounded-4"
                    loader={trvLoader}
                    src="banner/flights-travller-banner-ae.webp"
                    alt="Flights Banner"
                    width={35}
                    height={35}
                  />
                </div>
              </div>
              <div className="CheapFlightsFromUAE">
                <div className="row">
                  <div className="col-12">
                    <h2 className="color-blue fw-bold fs-24">Money-Saving Tips to Find Cheap Flights from UAE</h2>
                  </div>
                  <div className="col-12 col-md-6 my-2">
                    <Image
                      className="w-100 h-auto my-3"
                      loader={trvLoader}
                      src="saving-tips-img.webp"
                      alt="Flights Banner"
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className="col-12 col-md-6 my-2">
                    <div className="CheapFlightsFromUAEList">
                      <div className="row align-items-center">
                        <div className="col-4 col-md-3 col-lg-2">
                          <Image
                            className="w-100 h-auto"
                            loader={trvLoader}
                            src="bundling-flights-accommodations.webp"
                            alt="listing img"
                            width={35}
                            height={35}
                          />
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <h3 className="fs-18 fw-bold color-blue">Bundling Flights with Accommodations:</h3>
                          <p className="fs-12 mb-0">Look for travel package deals that combine flights & hotels, as this can often save you money compared to booking separately.</p>
                        </div>
                      </div>
                      <div className="row align-items-center mt-3">
                        <div className="col-4 col-md-3 col-lg-2">
                          <Image
                            className="w-100 h-auto"
                            loader={trvLoader}
                            src="booking-flights-hotels-together.webp"
                            alt="listing img"
                            width={35}
                            height={35}
                          />
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <h3 className="fs-18 fw-bold color-blue">Booking Flights & Hotels Together:</h3>
                          <p className="fs-12 mb-0">Many travel websites offer discounts when you book your flight & hotel together, making your trip more affordable.</p>
                        </div>
                      </div>
                      <div className="row align-items-center mt-3">
                        <div className="col-4 col-md-3 col-lg-2">
                          <Image
                            className="w-100 h-auto"
                            loader={trvLoader}
                            src="leveraging-currency-exchanges.webp"
                            alt="listing img"
                            width={35}
                            height={35}
                          />
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <h3 className="fs-18 fw-bold color-blue">Leveraging Currency Exchanges:</h3>
                          <p className="fs-12 mb-0">When traveling, consider paying in the local currency to avoid extra fees from currency conversion.</p>
                        </div>
                      </div>
                      <div className="row align-items-center mt-3">
                        <div className="col-4 col-md-3 col-lg-2">
                          <Image
                            className="w-100 h-auto"
                            loader={trvLoader}
                            src="paying-in-local-currency.webp"
                            alt="listing img"
                            width={35}
                            height={35}
                          />
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <h3 className="fs-18 fw-bold color-blue">Paying in Local Currency:</h3>
                          <p className="fs-12 mb-0">If given the option, always choose to pay in the local currency of your destination to minimize additional charges.</p>
                        </div>
                      </div>
                      <div className="row align-items-center mt-3">
                        <div className="col-4 col-md-3 col-lg-2">
                          <Image
                            className="w-100 h-auto"
                            loader={trvLoader}
                            src="avoiding-unnecessary-foreign.webp"
                            alt="listing img"
                            width={35}
                            height={35}
                          />
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <h3 className="fs-18 fw-bold color-blue">Avoiding Unnecessary Foreign Transaction Fees:</h3>
                          <p className="fs-12 mb-0">Use a credit or debit card that does not charge foreign transaction fees to save money while traveling abroad.</p>
                        </div>
                      </div>
                      <div className="row align-items-center mt-3">
                        <div className="col-4 col-md-3 col-lg-2">
                          <Image
                            className="w-100 h-auto"
                            loader={trvLoader}
                            src="sign-up-alerts.webp"
                            alt="listing img"
                            width={35}
                            height={35}
                          />
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <h3 className="fs-18 fw-bold color-blue">Sign Up for Alerts:</h3>
                          <p className="fs-12 mb-0">Subscribe to fare alerts from airlines & travel websites to get notifications about price drops & special promotions.</p>
                        </div>
                      </div>
                      <div className="row align-items-center mt-3">
                        <div className="col-4 col-md-3 col-lg-2">
                          <Image
                            className="w-100 h-auto"
                            loader={trvLoader}
                            src="be-flexible-travel.webp"
                            alt="listing img"
                            width={35}
                            height={35}
                          />
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <h3 className="fs-18 fw-bold color-blue">Be Flexible with Travel Dates:</h3>
                          <p className="fs-12 mb-0">If possible, adjust your travel dates to find cheaper flights, as prices can vary significantly depending on the day of the week.</p>
                        </div>
                      </div>
                      <div className="row align-items-center my-3">
                        <div className="col-4 col-md-3 col-lg-2">
                          <Image
                            className="w-100 h-auto"
                            loader={trvLoader}
                            src="book-in-advance.webp"
                            alt="listing img"
                            width={35}
                            height={35}
                          />
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <h3 className="fs-18 fw-bold color-blue">Book in Advance:</h3>
                          <p className="fs-12 mb-0">Try to book your flights several weeks or months ahead of your travel date to secure better deals.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-3">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="mb-0 fw-bold fs-22 color-blue py-3 rounded-top-2">Frequently Asked Questions</h2>
                </div>
                <div className="col-12">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ1">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#question1" aria-expanded="true" aria-controls="question1">
                          <span className="fs-14 fw-bold">Q: How early should I book to get the cheapest fares?</span>
                        </button>
                      </h2>
                      <div id="question1" className="accordion-collapse collapse show" aria-labelledby="FAQ1" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: For international flights, it's recommended to book at least 2-3 months in advance. However, for some short-haul or budget airlines, booking 4-6 weeks ahead can also secure good deals. Keep an eye out for seasonal sales and last-minute promotions.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ2">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#question2" aria-expanded="false" aria-controls="question2">
                          <span className="fs-14 fw-bold">Q: Which budget airlines offer cheap flights from UAE?</span>
                        </button>
                      </h2>
                      <div id="question2" className="accordion-collapse collapse" aria-labelledby="FAQ2" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: Some popular budget airlines offering affordable flights from the UAE include Flydubai, Air Arabia, Wizz Air, & Air India Express. These airlines frequently offer promotions & discounts, especially for regional destinations.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ3">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#question3" aria-expanded="false" aria-controls="question3">
                          <span className="fs-14 fw-bold">Q: What are the cheapest destinations to fly to from UAE?</span>
                        </button>
                      </h2>
                      <div id="question3" className="accordion-collapse collapse" aria-labelledby="FAQ3" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: Commonly, destinations such as Georgia, India, Sri Lanka, & Egypt are among the cheapest to fly to from the UAE. Regional destinations in Southeast Asia, like Thailand & the Maldives, can also have competitive fares, especially during off-peak seasons.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ4">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#question4" aria-expanded="false" aria-controls="question4">
                          <span className="fs-14 fw-bold">Q: How can I find the best deals on flights from UAE?</span>
                        </button>
                      </h2>
                      <div id="question4" className="accordion-collapse collapse" aria-labelledby="FAQ4" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: Use flight comparison websites such as Skyscanner or Google Flights to compare prices. Setting fare alerts, being flexible with travel dates, & booking during sales periods (e.g., New Year, Ramadan) are all great ways to find cheap flights.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ5">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#question5" aria-expanded="false" aria-controls="question5">
                          <span className="fs-14 fw-bold">Q: What’s the best time of year to book cheap flights from UAE?</span>
                        </button>
                      </h2>
                      <div id="question5" className="accordion-collapse collapse" aria-labelledby="FAQ5" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: The best time to book cheap flights is during off-peak travel seasons. For example, January to April & September to November are typically less crowded travel times. Sales often occur around UAE public holidays & festivals such as UAE National Day, Ramadan, & Black Friday.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ6">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#question6" aria-expanded="false" aria-controls="question6">
                          <span className="fs-14 fw-bold">Q: Can I get discounts for booking group flights?</span>
                        </button>
                      </h2>
                      <div id="question6" className="accordion-collapse collapse" aria-labelledby="FAQ6" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: Yes, many airlines and travel agencies offer discounts for group bookings. It's best to inquire directly with the airline or use a travel agency to secure better deals for group travelers.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ7">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#question7" aria-expanded="false" aria-controls="question7">
                          <span className="fs-14 fw-bold">Q: Are there any hidden fees with budget airlines?</span>
                        </button>
                      </h2>
                      <div id="question7" className="accordion-collapse collapse" aria-labelledby="FAQ7" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: Yes, budget airlines often charge for additional services like checked baggage, seat selection, meals, & extra legroom. It’s important to review the airline's fee structure before booking to avoid unexpected costs.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ8">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#question8" aria-expanded="false" aria-controls="question8">
                          <span className="fs-14 fw-bold">Q: How do I get last-minute flight deals from UAE?</span>
                        </button>
                      </h2>
                      <div id="question8" className="accordion-collapse collapse" aria-labelledby="FAQ8" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: Last-minute deals can sometimes be found on airline websites or flight aggregator platforms, especially if an airline needs to fill remaining seats. However, be flexible with your travel dates & destinations to take advantage of these offers.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ9">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#question9" aria-expanded="false" aria-controls="question9">
                          <span className="fs-14 fw-bold">Q: Can I use frequent flyer miles or credit card points to reduce flight costs?</span>
                        </button>
                      </h2>
                      <div id="question9" className="accordion-collapse collapse" aria-labelledby="FAQ9" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: Absolutely! Many airlines, including Emirates & Etihad, have frequent flyer programs where you can earn & redeem miles. Additionally, UAE credit cards often offer travel points or cashback that can be used towards flight bookings. </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="FAQ10">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#question10" aria-expanded="false" aria-controls="question10">
                          <span className="fs-14 fw-bold">Q: How can I avoid high prices during peak seasons?</span>
                        </button>
                      </h2>
                      <div id="question10" className="accordion-collapse collapse" aria-labelledby="FAQ20" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p className="mb-0 fs-14">A: Book well in advance, avoid popular travel dates (such as school holidays and Eid), & consider flying on weekdays or early in the morning to find cheaper options. Being flexible with your travel dates can significantly lower costs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </Fragment>
        : <Fragment>
          {!!props?.data?.bannerTitle &&
            <div className="text-center d-table m-auto">
              <h1 className="color-blue fw-bold">{props.data.bannerTitle}</h1>
              <hr className="w-50 m-auto border-blue border-2 opacity-100" />
            </div>
          }

          <div className="container mt-4">
            <div className="row">
              {props?.data?.flightPageContent?.map((item, ix) => {
                return <div className="col-12" key={'content' + ix}>
                  <div className="HolidayPackageContent mb-3" dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              })}
            </div>
          </div>

          {(props?.data?.flightPageFaqs?.length > 0 && !!props?.data?.flightPageFaqs[0].question && !!props?.data?.flightPageFaqs[0].answer) &&
            <section className="py-5 mb-5">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="subHeading">
                      <h2 className="mb-4 fw-normal">Frequently Asked  <strong className="color-orange">Questions</strong></h2>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="accordion fs-14" id="accordionExample">
                      {props.data.flightPageFaqs.map((faq, ix) => {
                        return <div key={ix} className="accordion-item">
                          <h2 className="accordion-header" id={"heading" + ix}>
                            <button className={ix == 0 ? "color-blue fw-bold accordion-button" : "color-blue fw-bold accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={"#FAQ" + ix} aria-expanded="true" aria-controls={"FAQ" + ix}>Q: {faq.question}</button>
                          </h2>
                          <div id={"FAQ" + ix} className={ix == 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby={"heading" + ix} data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <strong>Answer:</strong> {faq.answer}
                            </div>
                          </div>
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }

          {props?.data?.flightPageContent?.length > 0 && <Footer />}
        </Fragment>}
    </>
  )
}