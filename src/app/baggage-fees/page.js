
"use client"
import Image from 'next/image'
import { airlineLogoLoader, trvLoader } from '../helpers/imageKitLoader'
import Header from '../components/header'
import Footer from '../components/footer'

export default function BaggageFees() {


    return (
        <>
            <Header></Header>
            <div className="airline-bag-fee-main-wrp bg-grey py-5 mb-5">
                <h2 className='text-center fw-bold mb-5'>Airlines Baggage Fees</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="air-bag-fee-title bg-blue d-flex justify-content-between p-3">
                                <h3 className='color-white mb-0 fs-18'>Airline</h3>
                                <h3 className='color-white mb-0 fs-18 text-end'>Baggage Details</h3>
                            </div>
                            <div className="air-bag-fee bg-white border p-3">
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/DL.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Delta Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.delta.com/us/en/baggage/overview" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/EK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Emirates</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.emirates.com/in/english/before-you-fly/baggage/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/EY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Etihad</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.etihad.com/en-in/fly-etihad/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air India</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airindia.in/checked-baggage-allowances.htm" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/QR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Qatar Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.qatarairways.com/en/baggage/allowance.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>American Airline</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LH.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Lufthansa</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.lufthansa.com/br/en/baggage-overview" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LH.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Kuwait Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.kuwaitairways.com/en/is/free-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Turkish Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.turkishairlines.com/en-int/any-questions/baggage-information/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>United Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.united.com/ual/en/us/fly/travel/baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/NK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Spirit Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://customersupport.spirit.com/en-us/category/?id=CAT-01045" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Alaska Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.alaskaair.com/content/travel-info/baggage/overview" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/F9.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Frontier</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyfrontier.com/travel/travel-info/bag-options/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Hawaiian Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://hawaiianair.custhelp.com/app/answers/detail/a_id/80" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Sun Country</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.suncountry.com/bags-optional-services" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Westjet</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.westjet.com/en-ca/travel-info/baggage/index" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/G4.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Allegiant Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.allegiantair.com/popup/optional-services-fees#baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/O2.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Linear Air Taxi</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.linearair.com/terms" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>AeroMexico</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://aeromexico.com/en-us/travel-information/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/IR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Iran Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.iranair.it/english/passenger-services.shtml" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Philippines Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.philippineairlines.com/before-you-fly/baggage-information" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Virgin Australia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.virginaustralia.com/us/en/plan/baggage/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Asiana Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://flyasiana.com/C/GB/EN/contents/carry-on-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Austrian Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.austrian.com/at/de/gepaeck" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/9V.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Avior Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://aviorair.com/en/franquiciadequipaje" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/J2.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Azerbaijan Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.azal.az/en/information/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UP.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Bahamasair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.bahamasair.com/baggage-information/baggage-rates-baggage-claim-form-pdf" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Blue Air Transport</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyblueair.com/en/gb/luggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Blue Islands</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.blueislands.com/help-centre/essential-information/luggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Boliviana De Aviacion</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.boa.bo/BoAWebSite/Home/About?primary=politica_equipaje" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/4B.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Boutique Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.boutiqueair.com/p/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SN.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Brussels Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.brusselsairlines.com/in/en/extra-services/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/K6.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Cambodia Angkor Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.cambodiaangkorair.com/post/55/baggage-policy#baggage-policy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/5T.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Canadian North</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://canadiannorth.com/travel-info/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/9K.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Cape Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.capeair.com/flying_with_us/baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WX.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>CityJet</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.cityjet.com/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/CM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Copa Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.copaair.com/en/web/gs/baggage-policy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Avianca Costa Rica</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://help.avianca.com/hc/en-us/sections/4403224029979-Baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Liat</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.liat.com/travel-information/baggage-rules" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/Z8.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Linea Aerea Amaszonas</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.amaszonas.com/en-us/flying-info/prepare-your-travel/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/JE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Mango</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flymango.com/en/baggage/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MW.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Mokulele Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.mokuleleairlines.com/travel-info/policies/#tab2" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/YM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Montenegro</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://airmontenegro.com/en/information-and-services/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Oman Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.omanair.com/in/en/baggage-policy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Peach Aviation</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flypeach.com/en/lm/ai/airports/baggage/checked_in_bag" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>PenAir</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.ravnalaska.com/bags" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PW.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Precision Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.precisionairtz.com/en/helpdesk/excess-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>SunWing Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.sunwing.ca/en/sunwing-airlines/baggage-info" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Surinam Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyslm.com/travel-information/pre-flight/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/X3.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tuifly</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.tui.com/service-kontakt/flug/gepaeck/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UT.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>UT Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.utair.ru/en/service/services/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Uzbekistan</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.uzairways.com/en/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Vivaaerobus</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.vivaaerobus.com/en-us/info/get-ready-to-fly/baggage-policies" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/R3.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Yakutia Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.yakutia.aero/bagazh/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/F8.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>FLAIR AIRLINES</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://flyflair.com/travel-info/baggage/allowance-and-fees" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/2M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Maya Airline</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.mayaislandair.com/belize-flights-baggage#content" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Transat</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airtransat.com/en-US/Travel-Information-en-US/Baggage/Weight-Dimensions" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PN.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>China West Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://p.westair.cn/apssalepc/jsp/portal/en/BaggageDetails.jsp" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Corsair International</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flycorsair.com/en-ca/luggages/hold-luggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FN.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>fastjet</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.fastjet.com/flying-with-us/baggage-allowances/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Link Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.linkairways.com/Plan-Your-Travel/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/B5.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>East African</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://eastafrican.com/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/QD.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>JC International Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://jcairlines.com/travel-info/baggage-policies-and-rules.html/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/7C.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Jeju Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.jejuair.net/en/linkService/boardingProcessGuide/baggageGuide.do" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Western Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.westernairbahamas.com/conditions-of-carriage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/YL.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Libyan Wings</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://libyanwings.aero/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/8L.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Lucky Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.luckyair.net/extraalone/enter.html?id=5d6f8bcdf204b16aaf0f17b3" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Red Wings Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://flyredwings.com/en/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/DV.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>SCAT Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.scat.kz/en/baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/GQ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Sky Express</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.skyexpress.gr/en/sky-experience/before-fly/fare-types" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/S6.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Sunrise Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://sunriseairways.net/terms---conditions.html#Equipaje" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/GS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tianjin Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.tianjin-air.com/stcontent/menupage/fb195765-3202-43d1-8a20-4fa83ce8d95e/d754ed07-81fb-41be-89b8-d79efa34d0a1" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/8B.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>TransNusa Air Services</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.transnusa.co.id/product/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>TUI Fly Belgium</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.tuifly.be/en/excess-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/YC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Yamal Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://yamal.aero/passengers/services/fares/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/X1.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Hahn Air Technologies</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.hahnair.com/en/carrier/x1" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/XP.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Avelo Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.aveloair.com/optional-services" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PD.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Porter Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyporter.com/en-us/travel-information/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/EN.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Airdolomiti</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.airdolomiti.eu/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Egyptair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.egyptair.com/en/fly/baggage/Pages/default.aspx" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BW.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Caribbean Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.caribbean-airlines.com/#/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Virgin Atlantic</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.virginatlantic.com/us/en/travel-information/baggage-allowance.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/U2.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>EasyJet</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.easyjet.com/en/help/baggage/cabin-bag-and-hold-luggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/JL.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Japan Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.jal.co.jp/en/inter/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/QF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Qantas</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.qantas.com/travel/airlines/baggage/global/en" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Thai Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.thaiairways.com/en/plan_my_trip/travel_information/Baggage.page?" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/CA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air China</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airchina.us/CAPortal/dyn/portal/DisplayPage?COUNTRY_SITE=US&SITE=B000CA00&LANGUAGE=GB&PAGE=USPS" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/CZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>China Southern Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://global.csair.com/US/GB/INFO/XLFW/CKBA" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UL.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Srilankan Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.srilankan.com/en_uk/plan-and-book/luggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/A3.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Aegean Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://en.aegeanair.com/travel-information/baggage/baggage-allowance/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/EI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Aer Lingus</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://new.aerlingus.com/travel-information/baggage-information/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Aerolineas Argentinas</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://ww1.aerolineas.com.ar/arg/main.asp?idSitio=AR&idPagina=50&idIdioma=en" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AH.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Algerie</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://airalgerie.dz/en/travel-experience/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BT.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Baltic</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airbaltic.com/en/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BP.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Botswana</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://airbotswana.co.bw/airport" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/2J.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Burkina</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.air-burkina.com/en/preparer-son-voyage/bagages/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TX.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Caraibes</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.aircaraibes.com/services/aeroport/bagages" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/XK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Corsica</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.aircorsica.com/infos-bagages/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Europa</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.aireuropa.com/en/flights/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MD.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Madagasca</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.airmadagascar.com/en/information/baggage-weight-allowances" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Malta</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airmalta.com/information/baggage/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/9U.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Moldova</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airmoldova.md/hand-baggage-en/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SW.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Namibia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.airnamibia.com/travel-info-faq/about_luggage_baggage/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/NZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air New Zealand</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airnewzealand.com/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PX.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Niugin</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://airniugini.com.pg/plan-book/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Seychelles</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airseychelles.com/en/before-you-fly/baggage-information" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TN.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Tahiti Nui</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airtahitinui.com/us-en/baggage-policies" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LO.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Lot Polish</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.lot.com/us/en/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MH.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Malaysia airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.malaysiaairlines.com/in/en/plan/baggage/checked-baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OD.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Malindo Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.malindoair.com/the-malindo-experience/baggage2" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Mongolian Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.miat.com/pagecontent.php?pageId=49&lang=en" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Olympic Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.olympicair.com/en/Info/Baggage/Limits/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/8Q.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Onur Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.onurair.com/en/travel-information/detail/Baggage/129/193/0" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/8P.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Pacific Coastal Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.pacificcoastal.com/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Pegasus Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flypgs.com/en/useful-info/info-about-flights/general-rules" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Plus Ultra Airline</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://plusultra.com/equipaje/equipaje-en-cabina/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PO.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Proflight Zambia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://proflight-zambia.com/planning/baggage.php" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AT.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Royal Air Maroc</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.royalairmaroc.com/us-en/Travel-Info/Baggage-and-service-fees/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Royal Brunei</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyroyalbrunei.com/brunei/en/information/cabin-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/S7.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>S7 Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.s7.ru/home/info/baggage.dot" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Seaborne Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.seaborneairlines.com/seaborne-baggage-information/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>SilkAir</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.silkair.com/en_UK/in/travel-info/baggage/baggage-allowances/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Vueling Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.vueling.com/en/vueling-services/prepare-your-trip/luggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/EB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>WAMOS AIR</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.wamosair.com/en/passenger/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Windward Island Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.fly-winair.sx/baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/W6.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Wizz Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://wizzair.com/en-gb/information-and-services/travel-information/baggage#/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Xiamen Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.xiamenair.com/cn/en/PassengerService/passenger4_2.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KP.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>ASKY</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.flyasky.com/asky/fr/Infos-pratiques/Bagages/Bagages-5.aspx" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/J9.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Jazeera Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.jazeeraairways.com/BaggagePolicy.aspx" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/ID.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Batik Air Indonesia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://batikair.com/en/BaggageInfo" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/3K.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>JetStar Asia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.jetstar.com/au/en/flights/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Scoot</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyscoot.com/en/fly-scoot/before-you-fly/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HO.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Juneyao Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.juneyaoair.com/en/pages/infomation/en-US/clause-xingli.aspx" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/3U.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Sichuan Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://global.sichuanair.com/News/Detail/4610" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SL.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Thai Lion Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.lionairthai.com/en/ThaiLionAir-Experience/Baggage-Allowance" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/H9.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Himalaya Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.himalaya-airlines.com/travel/baggage-information" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/GA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Garuda Indonesia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.garuda-indonesia.com/sg/en/garuda-indonesia-experience/on-ground/baggage/index.page?" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/XQ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Sun express</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.sunexpress.com/en/information/luggage-info/travel-luggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/QG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Citilink</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.citilink.co.id/en/baggage-info" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/3S.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Antilles</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.airantilles.com/eng/infos-voyageurs" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Austral</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.air-austral.com/en/prepare-your-flight/your-baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Belgium</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airbaltic.com/en/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/JQ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Jetstar Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.jetstar.com/au/en/flights/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BL.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Jetstar Pacific Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.jetstar.com/au/en/flights/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/RQ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Kam Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.kamair.com/travel-with-us/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LAM</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.lam.co.mz/en/Travel-Information/Baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LQ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Lanmei Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMTransport.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/QV.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Lao Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.laoairlines.com/?contentkey=pages&id=22" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/4M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LATAM Airlines Argentina</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.latamairlines.com/us/en/experience/prepare-your-trip/baggage/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/4M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LATAM Airlines Brasil</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.latamairlines.com/us/en/experience/prepare-your-trip/baggage/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/4M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LATAM Airlines Ecuador</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.latamairlines.com/us/en/experience/prepare-your-trip/baggage/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/4M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LATAM Airlines Paraguay</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.latamairlines.com/us/en/experience/prepare-your-trip/baggage/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/4M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LATAM Airlines Peru</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.latamairlines.com/us/en/experience/prepare-your-trip/baggage/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/W4.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LC Perú</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.lcperu.pe/en/general-terms#equipaje" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Loganair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.loganair.co.uk/travel-information/luggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Luxair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.luxair.lu/en/information/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Mandarin Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.mandarin-airlines.com/Content/%E6%97%85%E5%AE%A2%E9%A0%88%E7%9F%A5-2016100014-32" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/7Y.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Mann Yadanarpon Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://airmyp.com/index.php/plan-my-trip/terms-and-conditions" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/L6.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Mauritania Airlines International</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.mauritaniaairlines.mr/index.php/franchises-bagages" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/7M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>MAYAir</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.mayair.com.mx/#FAQ" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/M9.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Motor Sich Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://flymotorsich.com/en/pages/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/5U.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>TAG</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.tag.com.gt/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/7J.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tajik Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.tajikairlines.com/ru/content/passengers/faq/#142" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Thai Vietjet Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.vietjetair.com/Sites/Web/en-US/NewsDetail/baggage-service/%20383/baggage-service" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MT.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Thomas Cook Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.thomascookairlines.com/en/book-plan/extras/baggage-allowance.jsp" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TV.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tibet Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.tibetairlines.com.cn/stdair/airline/tv/static_term/baggageservice?sign=true" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TJ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tradewind Aviation</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flytradewind.com/agent/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/T5.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Turkmenistan Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyturkmenistanairlines.eu/travel-information/faq" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/U8.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tus Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://tusairways.com/baggage-allowance-excess-policy/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/7W.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Windrose Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://windrose.aero/eng/information_services/baggage_norm.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/YE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>YanAir</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://yanair.ua/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/B4.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>ZanAir</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.zanair.com/About-ZanAir/Luggage-Allowance" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VH.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Viva Air Colombia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.vivaair.com/co/es/equipaje" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Pal Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.palairlines.ca/en/fly-right/baggage/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/9X.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Southern Airways Express</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://iflysouthern.com/contract-of-carriage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>French Bee</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://us.frenchbee.com/en/services-fares/our-services/hand-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/NO.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Neos Spa</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.neosair.it/content/cms/PDFs/Optional_service_and_fees.pdf" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/H1.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Hahn Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.hahnair.com/en/search?query=baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="air-bag-fee-title bg-blue d-md-flex justify-content-between p-3 d-none">
                                <h3 className='color-white mb-0 fs-18'>Airline</h3>
                                <h3 className='color-white mb-0 fs-18 text-end'>Baggage Details</h3>
                            </div>
                            <div className="air-bag-fee bg-white border p-3">
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SQ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Singapore Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.singaporeair.com/en_UK/sg/travel-info/baggage/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>British Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.britishairways.com/en-gb/information/baggage-essentials/checked-baggage-allowances" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/GF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Gulf Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.gulfair.com/your-journey/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/NH.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>All Nippon Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.ana.co.jp/en/in/travel-information/baggage-information/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/CX.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Cathay Pacific</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.cathaypacific.com/cx/en_US/baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LX.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Swiss International</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.swiss.com/hu/en/prepare/baggage/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>VISTARA</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airvistara.com/in/en/vistara-experience/on-ground/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/ET.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Ethiopian Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.ethiopianairlines.com/aa/information/baggage-information/free-baggage-allowance" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Canada</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.aircanada.com/ca/en/aco/home/plan/baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/CI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>China Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.china-airlines.com/us/en/fly/prepare-for-the-fly/baggage/baggage-rules" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>China Eastern Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://us.ceair.com/newCMS/us/en/content/en_Header/headerBottom/service/baggage/baggageDetail/201903/t20190305_2966.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VW.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Aeromar</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.aeromar.mx/en/informacion-pasajero" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Astana</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://airastana.com/global/en-us/Information/Baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/3H.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Inuit</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airinuit.com/en/manage/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/NX.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Macau</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.airmacau.com.mo/#/luggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Mauritius</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airmauritius.com/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/JU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Serbia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airserbia.com/en/information/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VT.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Tahiti</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airtahiti.com/en/baggage-animals" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Zimbabwe</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airzimbabwe.aero/prepare-travel/your-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>TUI fly Netherlands</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.tui.nl/vliegtickets/services/bagage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/IZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Arkia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.arkia.com/baggage-c115p" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>ARUBA AIRLINES</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.arubaairlines.com/checkinfees" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/XC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Corendon Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.corendonairlines.com/support-center/baggage-allowence" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/T3.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Eastern Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.easternairways.com/en-gb/information/travel-information/baggage-allowable-goods/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>FlyBe</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flybe.com/en/baggage-information/baggage-policy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>FlyDubai</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flydubai.com/en/flying-with-us/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HX.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Hong Kong Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.hongkongairlines.com/en_HK/fly-with-us/baggage/checkedbaggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>HOP</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.hop.fr/en" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/IB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Iberia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.iberia.com/us/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/ZY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Intercaribbean Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.intercaribbean.com/travel-information/baggage-essentials/baggage-allowances.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Kenmore Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.kenmoreair.com/Before-you-fly/faq-s/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BO.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LA COMPAGNIE</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.lacompagnie.com/en/plan/administrative-formalities/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/7H.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Ravn Alaska</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.ravnalaska.com/bags#:~:text=Ravn%20Alaska%20will%20accept%20one,maximum%20weight%20of%2020%20lbs.&text=Bags%20must%20be%20under%2050%20lbs%20to%20avoid%20incurring%20overweight%20fees." rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/RJ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Royal Jordanian</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.rj.com/en/info-and-tips/baggage-information/excess-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Rwandair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.rwandair.com/information/prepare-to-fly/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Ryanair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.ryanair.com/gb/en/plan-trip/flying-with-us/bags-made-simple" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SV.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Saudi Arabian Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.saudia.com/before-flying/baggage/baggage-allowances" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tsaradia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://tsaradia.com/preparez-votre-voyage/bagages.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Shandong Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.sda.cn/uploads/2/BaggageService.pdf" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/ZH.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Shenzhen Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://global.shenzhenair.com/zhair/ibe/static/pages/wcm/en/07-3-3-2-RegisteredLuggage_en.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/3M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Silver Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.silverairways.com/more-information/travel-policies/policy/baggage-policy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/2I.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Star Peru</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.alternativeairlines.com/star-peru11" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Contour Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.contourairlines.com/travel-information/at-the-airport/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/4N.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air North</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyairnorth.com/TravelInfo/Baggage.aspx" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/D8.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Norweign Air International</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.norwegian.com/uk/travel-info/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AW.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Africa World Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyafricaworld.com/travel-info/baggage-requirement/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Tanzania</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airtanzania.co.tz/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/6C.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Timor</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://air-timor.tl/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TL.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Airnorth</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airnorth.com.au/plan/baggage-services/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Aurora Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyaurora.ru/en/information/carriage-rules/transportation-of-baggage-and-hand-luggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/5Z.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>CemAir</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flycemair.co.za/general_r/extras_and_info.php#baggageallowances" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/ME.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Middle East Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.mea.com.lb/english/traveler-info/baggage-info/baggage-calculator" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MJ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Myway Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://mywayairlines.com/en/370/Baggage-Allowance" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/ON.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Nauru Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.nauruair.com/travel-info/before-you-fly/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/5N.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>SmartAvia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://flysmartavia.com/en/info/passenger/additional_services#add-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Pakistan International</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.piac.com.pk/experience/baggage/baggage-guide" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/ZP.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Paranair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.paranair.com/equipaje/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/2Z.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Passaredo</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.voepass.com.br/empresa/site/politica-bagagens" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FP.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Pelican Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flypelican.com.au/policy/2" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/CG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>PNG Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://pngair.com.pg/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/DP.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Pobeda Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.pobeda.aero/en/information/travel/baggage-rules/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AN.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Advanced Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.advancedairlines.com/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/4Z.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Airlink</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyairlink.com/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VV.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>VIVA Airlines Peru</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.vivaair.com/pe/en/luggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air France</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.airfrance.us/US/en/local/page_flottante/hp/us_dot_regulation.htm#baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>South African Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flysaa.com/manage-fly/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Scandinavian Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flysas.com/en/us/travel-info/baggage/?WT.ac=Footer_TI4" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Icelandair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.icelandair.us/information/baggage-information/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/DY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Norwegian Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.norwegian.com/us/travel-info/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>ITA Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.itaspa.com/en_en/fly-ita/baggage/hand-baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Aeroflot</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.aeroflot.com/ru-en/information/preparation/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Aircalin</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://us.aircalin.com/en/prepare-trip/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AV.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Avianca</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.avianca.com/us/en/travel-information/plan-your-trip/baggage/free-baggage-allowance" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/S4.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Azores Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.azoresairlines.pt/en/information/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AD.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Azul Linhas Aereas Brasileiras</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.voeazul.com.br/en/for-your-trip/international-flights/your-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Bangkok Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.bangkokair.com/eng/pages/view/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/JV.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Bearskin Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.bearskinairlines.com/baggage-policy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/B2.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Belavia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://en.belavia.by/passengers/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Biman Bangladesh</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.biman-airlines.com/flights/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/NT.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Binter Canarias</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.bintercanarias.com/eng/information/hand-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Bulgaria Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.air.bg/en/customer-support/your-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MO.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Calm Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.calmair.com/checkedbaggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Cathay Dragon</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.cathaypacific.com/cx/en_US/travel-information/baggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KX.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Cayman Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.caymanairways.com/baggage-policy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/5J.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>CEBU Pacific Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.cebupacificair.com/pages/plan-trip/baggage-info" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/9M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Central Mountain Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://flycma.com/terms-conditions/#baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/DE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Condor Flugdienst</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.condor.com/eu/flight-preparation/baggage-and-animals/free-baggage-allowance.jsp" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Croatia Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.croatiaairlines.com/Travel-info/Baggage/Checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Czech Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.csa.cz/ca-en/travel-information/before-the-flight/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>EL AL Israel-Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.elal.com/en/PassengersInfo/Baggage/Pages/default.aspx" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/EW.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Eurowings</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.eurowings.com/en/information/services/luggage.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Eva Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.evaair.com/en-us/managing-your-trip/baggage-information/general-information/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FJ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Fiji Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.fijiairways.com/flight-information/baggage-allowances/#Checked" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/AY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Finnair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.finnair.com/US/GB/information-services/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Firefly</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.fireflyz.com.my/en/flights/check-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/7F.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>First Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://firstair.ca/flying/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/XY.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Flynas</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.flynas.com/en/plan-my-trip/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/A9.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Georgian Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.georgian-airways.com/en/information/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/G8.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>GoAir</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.goair.in/bottom-menu/extra-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Hainan Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.hainanairlines.com/US/US/BASV" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/MR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Hunnu Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.hunnuair.com/en/travelinfo" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/I2.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Iberia Express</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.iberiaexpress.com/en/general-info/passenger-information/before-you-go/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/6E.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Indigo</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.goindigo.in/information/travel-information/baggage/bag-allowance.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/6H.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>ISRAIR</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.israirairlines.com/?mode=page&page=15470&lang=eng" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Jet2</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.jet2.com/faqs/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/GK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Jetstar</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.jetstar.com/us/en/flights/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KQ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Kenya Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.kenya-airways.com/prepare-for-travel/baggage-information/en/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KL.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>KLM</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.klm.com/travel/us_en/prepare_for_travel/baggage/baggage_allowance/index.htm" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/KE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Korean Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.koreanair.com/global/en/traveling/baggage-services.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LATAM Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.latam.com/en_us/travel-information/baggage/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/JT.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>LION AIR</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.lionair.co.id/docs/default-source/default-document-library/condition_of_carriage_eng.pdf?sfvrsn=10" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Spicejet</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.spicejet.com/AirTravelBaggageFaq.aspx" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/DT.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>TAAG Angola</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.taag.com/en/Plan/Luggage/Hold-luggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/EQ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tame</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.tame.com.ec/index.php/en/my-trip/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TP.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tap Portugal</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flytap.com/en-us/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/RO.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tarom</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.tarom.ro/en/checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HV.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Transavia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.transavia.com/en-EU/service/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/9N.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tropic Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.tropicair.com/travel-info/baggage-policy/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Tunisair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.tunisair.com/site/template/en/pc_en.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Ukraine International Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyuia.com/eng/information-and-services/before-you-fly/baggage/7277.html#" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/B7.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Uni Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.uniair.com.tw/uniweb/index.aspx" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/U6.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Ural Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.uralairlines.com/en/passengers-info/rules/ruchnaya-klad/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VJ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Vietjet Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.vietjetair.com/Sites/Web/en-US/NewsDetail/baggage-service/%20383/baggage-service" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/VN.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Vietnam Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.vietnamairlines.com/vn/en/travel-information/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/Y4.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Volaris</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://cms.volaris.com/en/useful-information/baggage/checked-baggage/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/V7.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Volotea</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.volotea.com/en/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/3E.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Choice One</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airchoiceone.com/customer-service/baggage-policies/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Côte d’Ivoire</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.aircotedivoire.com/en/infos-pratiques/transport-bagages/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/HC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Senegal</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://flyairsenegal.com/en/planifier/bagages-et-frais-de-service/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/NF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Air Vanuatu</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.airvanuatu.com/home/plan-book/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/RM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Aircompany Armenia</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://armeniafly.com/information/baggage/1" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/J5.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Alaska Seaplanes</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flyalaskaseaplanes.com/flight-info/terms-and-conditions/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/5O.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>ASL Airlines France</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.aslairlines.fr/en/travellers-information/prepare-your-trip/your-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/RC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Atlantic Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.atlanticairways.com/en/travel-info/luggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Auric Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.auricair.com/About-Us/terms" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/GR.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Aurigny Air Services</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.aurigny.com/faqs" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/YK.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Avia Traffic Company</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.aero.kg/novosti/izmenenie-bagazhnoj-normy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/O6.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Avianca (Brasil)</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.avianca.com/us/en/before-your-trip/prepare-your-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/A0.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Avianca Argentina</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.avianca.com/us/en/before-your-trip/prepare-your-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/2K.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Avianca Ecuador</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.avianca.com/us/en/before-your-trip/prepare-your-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Blue Bird Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://booking.bluebirdair.com/TRAVEL-INFORMATION/Checked-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Braathens Regional Aviation AB</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flygbra.se/info/allt-om-resan/bagage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/CC.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>CM Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.cmairlines.com/planea-y-reserva/equipaje" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/CQ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Coastal Aviation</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.coastal.co.tz/travel-info/luggage-limitation/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/CU.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Cubana de Aviacion</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.cubana.cu/information" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/ZE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Eastar Jet</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.eastarjet.com/newstar/PGWIK00001" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/EL.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Ellinair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://en.ellinair.com/article/gr_luggages" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/9F.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Eurostar</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.eurostar.com/rw-en/travel-info/travel-planning/luggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/5F.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>FlyOne</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://flyone.md/en/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>FlySafair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flysafair.co.za/travel-tools/extras/luggage-policy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/ST.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Germania</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flygermania.com/en-gb/planen/gepaeck/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/G3.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>GOL Linhas Aereas</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.voegol.com.br/en/information/travel-worry-free/checked-and-carry-on-baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/2L.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Helvetic Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.helvetic.com/en/travelinfo#!baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UO.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>VolHK Expressotea</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.hkexpress.com/en-hk/plan/travel-information/baggage-guide/checked-baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/8M.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Myanmar Airways Intl.</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://maiair.com/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/UB.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Myanmar National Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flymna.com/travel-info#airports" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/NP.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Nile Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.nileair.com/#/en/page/31/Baggage_Info" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/Y7.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>NordStar Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://nordstar.ru/en/passengers/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/BJ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Nouvelair</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.nouvelair.com/en/content/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/PG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Pascan Aviation</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.pascan.com/en/flights-info-pascan/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/1R.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>E Renfe</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.renfe.com/viajeros/info/index.html" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/7R.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>RusLine</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.rusline.aero/en/read/rules_of_transportation/carriage_of_baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/F2.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Safarilink</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flysafarilink.com/en/About-Us/baggage-allowance" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/D2.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Severstal Aircompany</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://severstal-avia.ru/en/info/pravila/bagazh-i-ruchnaya-klad/#normy-provoza-bagazha" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/FM.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Shanghai Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://us.ceair.com/en/content/information/baggage/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/1R.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Silverstone Air Services</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://silverstoneair.com/baggage-terms/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/1R.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Sky Airline</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.skyairline.com/english/conditions" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OW.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Skyward Express</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.skywardexpress.co.ke/baggage-policy/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/OS.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>SmartWings</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.smartwings.com/en/travel-info/excess-baggage-charges-policy/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/IE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Solomon Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.flysolomons.com/plan/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/SZ.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Somon Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="http://www.somonair.com/index.php/home/information/2" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/XG.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>SunExpress Deutschland</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.sunexpress.com/en/information/luggage-info/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/7E.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Sylt Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.syltair.de/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/TA.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>TACA International Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.avianca.com/otr/en/antes-de-tu-viaje/prepara-tu-equipaje/" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/NN.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>VIM Airlines</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.vim-avia.com/index.html " rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WF.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Wideroe</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.wideroe.no/en/travel-info/baggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/WE.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Thai Smile Airways</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.thaismileair.com/en/BaggagePolicy" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
                                    <div className="air-bag-fee-logo d-flex align-items-center">
                                        <Image
                                            className="me-3"
                                            loader={airlineLogoLoader}
                                            src="airline-logo/LI.webp"
                                            alt="Airline Logo"
                                            width={35}
                                            height={35}
                                        />
                                        <span className='fw-bold fs-14'>Jin Air</span>
                                    </div>
                                    <div className="air-bag-fee-detail pull-right">
                                        <a className='fw-bold fs-14 color-blue text-decoration-none' target="_blank" href="https://www.jinair.com/gate?dispLang=ENG&returnUrl=%2Fready%2Fbaggage" rel="noreferrer">View Detail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

