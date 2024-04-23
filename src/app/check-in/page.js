"use client"

import Image from "next/image";
import { airlineLogoLoader, trvLoader } from "../helpers/imageKitLoader";
import Header from "../components/header";
import Footer from "../components/footer";
export default function CheckIn() {
    return (
        <>
            <Header></Header>
            <section id="check-in">
                <div className="checkin-banner">
                    <Image
                        className="h-auto w-100 d-none d-md-block"
                        loader={trvLoader}
                        src="web-check-in-ae.webp"
                        alt="Airline Logo"
                        width={1920}
                        height={300}
                    />
                    <Image
                        className="h-auto w-100 d-md-none"
                        loader={trvLoader}
                        src="web-check-in-img-mobile.webp"
                        alt="Airline Logo"
                        width={60}
                        height={60}
                    />
                </div>
            </section>

            <section className="mb-5 bg-grey py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <p>Say goodbye to long check-in lines and enjoy a seamless travel experience with our hassle-free online web check-in. Secure your preferred seat, manage your itinerary, and breeze through the airport. Streamline your journey and start your trip on the right foot. Check-in now and travel with ease.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.delta.com/apac/en">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/DL.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Delta Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.united.com/en/us/checkin">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/UA.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">United Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.aircanada.com/ca/en/aco/home.html#/home:checkIn">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/AC.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Air Canada</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://mobilecheckin.jetblue.com/checkin/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/B6.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Jetblue Airways</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.aa.com/reservation/flightCheckInViewReservationsAccess.do">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/AA.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">American Airline</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://mobile.southwest.com/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/WN.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Southwest Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.spirit.com/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/NK.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Spirit Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://webselfservice.alaskaair.com/checkinweb/default.aspx?language=en_US">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/AS.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Alaska Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.flyfrontier.com/travel/my-trips/check-in/?mobile=true">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/F9.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Frontier</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://checkin.hawaiianairlines.com/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/HA.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Hawaiian Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="http://suncountry.com/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/SY.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Sun Country</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://checkin.westjet.com/index.html#/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/WS.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Westjet</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.allegiantair.com/online-checkin">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/G4.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Allegiant Air</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://aeromexico.com/en-us/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/AM.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">AeroMexico</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://checkin.copaair.com/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/CM.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Copa Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://flyflair.com/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/F8.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">FLAIR AIRLINES</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://checkin.aveloair.com/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/XP.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Avelo Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.flyporter.com/en/manage-flights/web-check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/PD.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Porter Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.volaris.com/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/Y4.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Volaris</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://checkin.sunwing.ca/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/WG.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">SunWing Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.avianca.com/us/en/your-booking/check-in/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/AV.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Avianca</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.latamairlines.com/us/en/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/LA.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">LATAM Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.latamairlines.com/ar/es/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/4M.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">LATAM Airlines Argentina</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.latamairlines.com/br/pt/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/JJ.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">LATAM Airlines Brasil</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.latamairlines.com/ec/es/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/XL.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">LATAM Airlines Ecuador</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.latamairlines.com/py/es/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/PZ.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">LATAM Airlines Paraguay</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.latamairlines.com/pe/es/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/LP.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">LATAM Airlines Peru</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.caribbean-airlines.com/#/plan-your-trip/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/BW.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Caribbean Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.vivaaerobus.com/en-us/info/get-ready-to-fly/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/VB.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Vivaaerobus</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://booking.palairlines.ca/check-in/search">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/PB.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Pal Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.vivaair.com/pe/es/web-check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/VV.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">VIVA Airlines Peru</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.emirates.com/english/manage-booking/online-check-in/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/EK.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Emirates</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.etihad.com/en-in/manage/check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/EY.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Etihad</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.airindia.com/in/en/manage/web-checkin.html">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/AI.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Air India</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://cki.qatarairways.com/cki/dashboard">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/QR.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Qatar Airways</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.lufthansa.com/ge/en/online-check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/LH.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Lufthansa</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.kuwaitairways.com/en/online-checkin">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/KU.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Kuwait Airways</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.turkishairlines.com/en-int/flights/manage-booking/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/TK.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Turkish Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.singaporeair.com/en_UK/plan-and-book/check-in-online/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/SQ.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Singapore Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.britishairways.com/travel/olcilandingpageauthreq/public/en_in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/BA.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">British Airways</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.gulfair.com/manage-my-booking/web-check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/GF.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Gulf Air</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.ana.co.jp/en/us/travel-information/online-check-in/">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/NH.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">All Nippon Airways</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.cathaypacific.com/mb/#/en_HK/olci/login">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/CX.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Cathay Pacific</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://checkin.swiss.com/web">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/LX.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Swiss International</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.ethiopianairlines.com/aa/book/booking/web-check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/ET.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Ethiopian Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.virginatlantic.com/PCCOciWeb/processFindPnr.action">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/VS.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Virgin Atlantic</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.philippineairlines.com/en/check-in-online">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/PR.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Philippines Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://flyasiana.com/C/GB/EN/contents/online-check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/OZ.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Asiana Airlines</h4>
                            </a>
                        </div>
                        <div className="checkin-article col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2">
                            <a className="rounded-1 mb-4 w-100 text-center text-decoration-none border bg-white d-inline-block p-3" target="_blank" href="https://www.austrian.com/jp/en/online-check-in">
                                <Image
                                    className=""
                                    loader={airlineLogoLoader}
                                    src="airline-logo/OS.webp"
                                    alt="Airline Logo"
                                    width={60}
                                    height={60}
                                />
                                <h4 className="mt-2 mb-0 fs-16 fw-bold color-black">Austrian Airlines</h4>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}
