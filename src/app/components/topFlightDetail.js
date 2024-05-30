import Image from "next/image";
import { airlineLogoLoader, trvLoader } from "../helpers/imageKitLoader";

export default function TopFlightDetails() {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="subHeading">
                            <h2 className="mb-0 fw-normal">Top Flight <strong className="color-orange">Deals</strong></h2>
                        </div>
                    </div>
                </div>
                <div className="topFlightDetails mt-2">
                    <ul className="nav nav-pills mb-3 DealsTabs justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link color-black bg-white rounded-0 active" id="domesticFlight-tab" data-bs-toggle="pill" data-bs-target="#domesticFlight" type="button" role="tab" aria-controls="domesticFlight" aria-selected="true">Domestic</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link color-black bg-white rounded-0" id="internationalFlight-tab" data-bs-toggle="pill" data-bs-target="#internationalFlight" type="button" role="tab" aria-controls="internationalFlight" aria-selected="false">International</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="domesticFlight" role="tabpanel" aria-labelledby="domesticFlight-tab">
                            <ul className="nav nav-pills mb-3 DealsTabs justify-content-start" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link color-black bg-transparent rounded-0 active" id="domesticOneWay-tab" data-bs-toggle="pill" data-bs-target="#domesticOneWay" type="button" role="tab" aria-controls="domesticOneWay" aria-selected="true">One Way</button>
                                </li>
                                {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link color-black bg-transparent rounded-0" id="domesticRoundTrip-tab" data-bs-toggle="pill" data-bs-target="#domesticRoundTrip" type="button" role="tab" aria-controls="domesticRoundTrip" aria-selected="false">Round Trip</button>
                                </li> */}
                            </ul>
                            <div className="tab-content px-0" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="domesticOneWay" role="tabpanel" aria-labelledby="domesticOneWay-tab">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/QP.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">AMD</h3>
                                                                <p className="mb-0 fs-12">Ahmedabad</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">BOM</h3>
                                                                <p className="mb-0 fs-12">Mumbai</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>4,000/<sup>*</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/6E.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">GOI</h3>
                                                                <p className="mb-0 fs-12">Goa</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">CCU</h3>
                                                                <p className="mb-0 fs-12">Kolkata </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>12,000/<sup>*</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/SG.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">BOM</h3>
                                                                <p className="mb-0 fs-12">Mumbai</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">DEL</h3>
                                                                <p className="mb-0 fs-12">Delhi</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>8,000/<sup>*</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/6E.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">DEL</h3>
                                                                <p className="mb-0 fs-12">Delhi</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">BLR</h3>
                                                                <p className="mb-0 fs-12">Banglore</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>8,500/<sup>*</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="domesticRoundTrip" role="tabpanel" aria-labelledby="domesticRoundTrip-tab">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">AUH</h3>
                                                                <p className="mb-0 fs-12">Abu Dhabi</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">DXB</h3>
                                                                <p className="mb-0 fs-12">Dubai </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>841.<sup>00</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">SJH</h3>
                                                                <p className="mb-0 fs-12">Sharjah</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">DXB</h3>
                                                                <p className="mb-0 fs-12">Dubai </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>1369.<sup>.00</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">SJH</h3>
                                                                <p className="mb-0 fs-12">Sharjah </p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">AUH</h3>
                                                                <p className="mb-0 fs-12">Abu Dhabi</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>1037.<sup>00</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">DXB</h3>
                                                                <p className="mb-0 fs-12">Dubai</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">AUH</h3>
                                                                <p className="mb-0 fs-12">Abu Dhabi</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>1141.<sup>00</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="internationalFlight" role="tabpanel" aria-labelledby="internationalFlight-tab">
                            <ul className="nav nav-pills mb-3 DealsTabs justify-content-start" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link color-black bg-transparent rounded-0 active" id="internationalOneWay-tab" data-bs-toggle="pill" data-bs-target="#internationalOneWay" type="button" role="tab" aria-controls="internationalOneWay" aria-selected="true">One Way</button>
                                </li>
                                {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link color-black bg-transparent rounded-0" id="internationalRoundTrip-tab" data-bs-toggle="pill" data-bs-target="#internationalRoundTrip" type="button" role="tab" aria-controls="internationalRoundTrip" aria-selected="false">Round Trip</button>
                                </li> */}
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="internationalOneWay" role="tabpanel" aria-labelledby="internationalOneWay-tab">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/UK.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">BLR</h3>
                                                                <p className="mb-0 fs-12">Banglore</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">MLE</h3>
                                                                <p className="mb-0 fs-12">Maldives</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>20,000/<sup>*</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">MAA</h3>
                                                                <p className="mb-0 fs-12">Chennai</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">BKK</h3>
                                                                <p className="mb-0 fs-12">Thailand </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>22,000/<sup>*</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">BOM</h3>
                                                                <p className="mb-0 fs-12">Mumbai</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">KTM</h3>
                                                                <p className="mb-0 fs-12">Nepal </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>12,000/<sup>*</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AF.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">BOM</h3>
                                                                <p className="mb-0 fs-12">Mumbai</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">JFK</h3>
                                                                <p className="mb-0 fs-12">New York</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>46,000/<sup>*</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="internationalRoundTrip" role="tabpanel" aria-labelledby="internationalRoundTrip-tab">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">MLE</h3>
                                                                <p className="mb-0 fs-12">Maldives</p>

                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">DXB</h3>
                                                                <p className="mb-0 fs-12">Dubai</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>1587.<sup>00</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">TBS</h3>
                                                                <p className="mb-0 fs-12">Tbilisi</p>
                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">AUH</h3>
                                                                <p className="mb-0 fs-12">Abu Dhabi</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>1257.<sup>00</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">RJTT</h3>
                                                                <p className="mb-0 fs-12">Tokyo</p>

                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">SJH</h3>
                                                                <p className="mb-0 fs-12">Sharjah</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>2707.<sup>00</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 py-2">
                                            <div className="topFlightDetailsList bg-white rounded-3">
                                                <div className="row m-0 align-items-center">
                                                    <div className="col-12 col-md-2 col-xl-1">
                                                        <Image
                                                            className="airLogo h-auto w-100"
                                                            loader={airlineLogoLoader}
                                                            src="airline-logo/AI.webp"
                                                            alt="Airline Logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-7 col-lg-6 col-xl-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-4">
                                                                <h3 className="mb-0 fw-bold">DPS</h3>
                                                                <p className="mb-0 fs-12">Bali</p>

                                                            </div>
                                                            <div className="col-4 p-0">
                                                                <Image
                                                                    className="h-auto w-100"
                                                                    loader={trvLoader}
                                                                    src="icon/dealsFlightLocationIcon.svg"
                                                                    alt="Flight Location Icon"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className="col-4 text-end">
                                                                <h3 className="mb-0 fw-bold">DXB</h3>
                                                                <p className="mb-0 fs-12">Dubai</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-3 col-lg-4 text-end">
                                                        <div className="InquireBox">
                                                            <h3 className="mb-0 fw-bold"><span className="color-orange">₹ </span>1717.<sup>00</sup></h3>
                                                            <button className="buttonStyle2 border-0 mt-2">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}