import Layout from "./_layout";
import Footer from "./footer";
import { capitalizeEachWord, numberFormat, searchDeals } from "../helpers/common";
import PartnerLogo from "./partner-logo";
import SearchSection from "./search-section";
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";
import { usePathname } from 'next/navigation';
// import { getCheapFlightDeals } from "../services/flightService";
import { useEffect, useState } from "react";
// import AirportSearchForm from "./airport-search-form";
// import HideEnquiryFormModal from "./hide-enq-btn";
import { portalId } from "../config";

export default function FlightsData(props) {
  const [deals, setDeals] = useState([]);
  const [flightType, setFlightType] = useState(true);
  const path = usePathname();
  const [fromAirport, setFromAirport] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [nearbyAirports, setNearbyAirports] = useState([]);
  const [isDifferentPage, setIsDifferentPage] = useState(false);


  useEffect(() => {
    fetchDeals();
    checkForDifferentPage();
  }, [flightType]);

  const checkForDifferentPage = () => {
    if (path === "/airports/find-airport-near-me/")
      setIsDifferentPage(true);
  }

  const fetchDeals = async () => {
    let dataToSend = {
      FromCode: props?.data?.fromCode,
      ToCode: props?.data?.toCode,
      FromCountry: props?.data?.fromCountry,
      ToCountry: props?.data?.toCountry,
      PortalId: ''
    }

    if (path === "/cheap-flights/") {
      dataToSend = {
        "FromCode": "",
        "ToCode": "",
        "IsDomestic": flightType,
        "PortalId": 50
      }
    }

    else if (!!props?.data?.fromCode || !!props?.data?.toCode || !!props?.data?.fromCountry || !!props?.data?.toCountry)
      dataToSend.PortalId = portalId;

    // DEALS NOT AVAILABLE RIGHT NOW
    // const res = await getCheapFlightDeals(dataToSend);
    const res = []
    setDeals(res);
  };

  const handleDomesticClick = () => {
    setFlightType(true);
  };

  const handleInternationalClick = () => {
    setFlightType(false);
  };



  return (
    <>
      <Layout />
      {/* {path === "/airports/find-airport-near-me/"
        ? <AirportSearchForm setNearbyAirports={setNearbyAirports} setFromCity={setFromCity}
          fromAirport={fromAirport} setFromAirport={setFromAirport} />
        :  */}
        <SearchSection />
      {/* //  */}
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
          </ol>
        </nav>
      </div>


      {/* {(path === "/cheap-flights" || path === "/cheap-flights/") &&
        <section className="cheepFlightDeals bg-grey py-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="fw-bold text-center fs-26 mb-5">Book Cheap Airline Tickets on</h2>
                <div className="rounded-pill bg-white mb-4 d-table m-auto dealsFlightMenu">
                  <ul className="nav nav-pills fs-14 " id="pills-tab" role="tablist">
                    <li className="nav-item cursor-pointer" role="presentation">
                      <button
                        className={`align-items-center d-flex rounded-pill nav-link ${flightType ? 'active' : ''}`}
                        id="domesticFlightDeals-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#domesticFlightDeals"
                        type="button"
                        role="tab"
                        aria-controls="domesticFlightDeals"
                        aria-selected={!flightType}
                        onClick={handleDomesticClick}
                      >
                        <div>
                          <Image
                            className="deactiveIcon h-auto me-2"
                            loader={trvLoader}
                            src="icon/global-orange-icon.svg"
                            alt="global icon"
                            width={18}
                            height={45}
                          />
                          <Image
                            className="activeIcon h-auto me-2"
                            loader={trvLoader}
                            src="icon/global-white-icon.svg"
                            alt="global icon"
                            width={18}
                            height={45}
                          />
                        </div>
                        <div>
                          <span className="fw-bold">Domestic Flights</span>
                        </div>
                      </button>
                    </li>
                    <li className="nav-item cursor-pointer" role="presentation">
                      <button
                        className={`align-items-center d-flex rounded-pill nav-link ${!flightType ? 'active' : ''}`}
                        id="internationalFlightDeals-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#internationalFlightDeals"
                        type="button"
                        role="tab"
                        aria-controls="internationalFlightDeals"
                        aria-selected={flightType}
                        onClick={handleInternationalClick}
                      >
                        <div>
                          <Image
                            className="deactiveIcon h-auto me-2"
                            loader={trvLoader}
                            src="icon/home-orange-icon.svg"
                            alt="home icon"
                            width={18}
                            height={45}
                          />
                          <Image
                            className="activeIcon h-auto me-2"
                            loader={trvLoader}
                            src="icon/home-white-icon.svg"
                            alt="home icon"
                            width={18}
                            height={45}
                          />
                        </div>
                        <div>
                          <span className="fw-bold">International Flights</span>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="domesticFlightDeals" role="tabpanel" aria-labelledby="domesticFlightDeals-tab">
                    <div className="row">
                      {deals.length > 0 && deals.map((obj, index) => (
                        <div key={index} className="col-12 col-md-12 col-lg-6 my-2">
                          <div className="cheepFlightDealsBox bg-white rounded-3">


                            <div className="row m-0 align-items-center">
                              <div className="col-12 col-md-9 col-lg-8 col-xl-9 my-3 my-md-0">
                                <div className="row">
                                  <div className="col-2 align-items-center">
                                    <img style={{ width: 40 }}
                                      // src="https://assets.shipratravel.com/airline-logo/6E.webp"
                                      src={`https://assets.shipratravel.com/airline-logo/${obj.airlineCode}.webp`}
                                    />
                                  </div>
                                  <div className="col-10">
                                    <div className="d-flex align-items-center justify-content-between w-100 px-3">
                                      <div>
                                        <p className="mb-0 fw-bold fs-20 text-start">{obj.fromCode}</p>
                                      </div>
                                      <div>
                                        <Image
                                          className="w-auto mx-3"
                                          loader={trvLoader}
                                          src="icon/airdrop-grey-icon.svg"

                                          alt="airdrop icon"
                                          width={7}
                                          height={40}
                                        />
                                      </div>
                                      <div>
                                        <p className="mb-0 fw-bold fs-20 text-end">{obj.toCode}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-4 col-xl-3 text-center position-relative cheepFlightDealsBtn py-3 py-lg-5">
                                <a className="buttonStyle6 rounded-pill fw-bold d-inline-block" href="/listing" target="_blank"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    let searchId = searchDeals(obj.fromCode, obj.toCode, obj.departureDate, 12);
                                    window.open("/listing?s=" + searchId, "_blank");
                                  }}
                                >
                                  {numberFormat(Number(obj.price))}
                                </a>
                              </div>
                            </div>


                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                  <div className="tab-pane fade" id="internationalFlightDeals" role="tabpanel" aria-labelledby="internationalFlightDeals-tab">
                    <div className="row">
                      {deals.length > 0 && deals.map((obj, index) => (

                        <div className="col-12 col-md-12 col-lg-6 my-2" key={index}>
                          <div className="cheepFlightDealsBox bg-white rounded-3">
                            <div className="row m-0 align-items-center">
                              <div className="col-12 col-md-9 col-lg-8 col-xl-9 my-3 my-md-0">
                                <div className="row">
                                  <div className="col-2 align-items-center">
                                    <img style={{ width: 40 }}
                                      src={`https://assets.shipratravel.com/airline-logo/${obj.airlineCode}.webp`}

                                    />
                                  </div>
                                  <div className="col-10">
                                    <div className="d-flex align-items-center justify-content-between w-100 px-3">
                                      <div>
                                        <p className="mb-0 fw-bold fs-20 text-start">{obj.fromCode}</p>
                                      </div>
                                      <div>
                                        <Image
                                          className="w-auto mx-3"
                                          loader={trvLoader}
                                          src="icon/airdrop-grey-icon.svg"
                                          alt="airdrop icon"
                                          width={7}
                                          height={40}
                                        />
                                      </div>
                                      <div>
                                        <p className="mb-0 fw-bold fs-20 text-end">{obj.toCode}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-4 col-xl-3 text-center position-relative cheepFlightDealsBtn py-3 py-lg-5">
                                <a className="buttonStyle6 rounded-pill fw-bold d-inline-block" href="/listing" target="_blank"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    let searchId = searchDeals(obj.fromCode, obj.toCode, obj.departureDate, 12);
                                    window.open("/listing?s=" + searchId, "_blank");
                                  }}

                                >

                                  {numberFormat(Number(obj.price))}


                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>
      } */}

      {/* NEARBY AIRPORTS TABLE */}
      {/* {(path === "/airports/find-airport-near-me/" && !!fromCity) &&
        <div className="container">
          <h2 className="color-blue"><strong>Airports Found Within 100 Miles of {fromCity}</strong></h2>
          <table className="table table-striped border">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Airport Name</th>
                <th scope="col">City</th>
                <th scope="col">Distance(By Air)</th>
              </tr>
            </thead>
            <tbody>
              {nearbyAirports?.map((airport, ix) => {
                return <tr key={ix}>
                  <th scope="row">{ix + 1}</th>
                  <td>{airport.name}</td>
                  <td>{airport.city}</td>
                  <td>{airport.distance} miles</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      } */}

      {!!props?.data?.bannerTitle && !isDifferentPage &&
        <div className="text-center d-table m-auto">
          <h1 className="color-blue fw-bold">{props.data.bannerTitle}</h1>
          <hr className="w-50 m-auto border-blue border-2 opacity-100" />
        </div>
      }

      {(deals.length > 0 && path !== "/cheap-flights/") &&
        <section className="cheepFlightDeals bg-grey py-5 mb-5">
          <div className="container">
            <div className="row">
              {deals.map((obj, index) => (
                <div key={index} className="col-12 col-md-12 col-lg-6 my-2">
                  <div className="cheepFlightDealsBox bg-white rounded-3">


                    <div className="row m-0 align-items-center">
                      <div className="col-12 col-md-9 col-lg-8 col-xl-9 my-3 my-md-0">
                        <div className="row">
                          <div className="col-2 align-items-center">
                            <img style={{ width: 40 }}
                              // src="https://assets.shipratravel.com/airline-logo/6E.webp"
                              src={`https://assets.shipratravel.com/airline-logo/${obj.airlineCode}.webp`}
                            />
                          </div>
                          <div className="col-10">
                            <div className="d-flex align-items-center justify-content-between w-100 px-3">
                              <div>
                                <p className="mb-0 fw-bold fs-20 text-start">{obj.fromCode}</p>
                              </div>
                              <div>
                                <Image
                                  className="w-auto mx-3"
                                  loader={trvLoader}
                                  src="icon/airdrop-grey-icon.svg"

                                  alt="airdrop icon"
                                  width={7}
                                  height={40}
                                />
                              </div>
                              <div>
                                <p className="mb-0 fw-bold fs-20 text-end">{obj.toCode}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-3 col-lg-4 col-xl-3 text-center position-relative cheepFlightDealsBtn py-3 py-lg-5">
                        <a className="buttonStyle6 rounded-pill fw-bold d-inline-block" href="/listing" target="_blank"
                          onClick={(e) => {
                            e.preventDefault();
                            let searchId = searchDeals(obj.fromCode, obj.toCode, obj.departureDate, 12);
                            window.open("/listing?s=" + searchId, "_blank");
                          }}
                        >
                          {numberFormat(Number(obj.price))}
                        </a>
                      </div>
                    </div>


                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      }

      <div className={isDifferentPage ? "container" : "container mt-4"}>
        <div className="row">
          {props?.data?.flightPageContent?.map((item, ix) => {
            return <div className="col-12" key={'content' + ix}>
              <div className="HolidayPackageContent mb-3" dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          })}
        </div>
      </div>

      {/* <HideEnquiryFormModal /> */}

      {/* <div className="container HolidayPackageContent mt-4 mb-5" dangerouslySetInnerHTML={{ __html: props?.data?.content }} /> */}

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


      {/* <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="flight-from-tab" data-bs-toggle="pill" data-bs-target="#flight-from" type="button" role="tab" aria-controls="flight-from" aria-selected="true">Home</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="flight-to-tab" data-bs-toggle="pill" data-bs-target="#flight-to" type="button" role="tab" aria-controls="flight-to" aria-selected="false">Profile</button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="flight-from" role="tabpanel" aria-labelledby="flight-from-tab">...</div>
                <div className="tab-pane fade" id="flight-to" role="tabpanel" aria-labelledby="flight-to-tab">...</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {props?.data?.flightPageContent?.length > 0 && <Footer />}
    </>
  )
}