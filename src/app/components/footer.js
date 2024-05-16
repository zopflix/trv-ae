"use client"
import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";
import { contactNumber,holidayContactNumber,flightContactNumber } from "../config";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
    const path = usePathname();
    const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);
    useEffect(() => {
        let numberToDisplay = contactNumber; 
    
        if  ( path.includes("/") || path.includes("/holidays") || path.includes("/international-tour-packages") || path.includes("/india-tour-packages")) {
            numberToDisplay = holidayContactNumber;
        } else if ( path.includes("/results") || path.includes("flight")) {
            numberToDisplay = flightContactNumber;
        }
        if (   path.includes("/make-payment")|| path.includes("/dummy-flight-ticket") || path.includes("/payment-failed-confirmation")) {
            numberToDisplay = contactNumber;
        }
    
        setDisplayContactNumber(numberToDisplay);
    }, []);
    
    return (
        <>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script>

            <footer>
                <div className="container border-bottom mb-4 pb-4">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-3 py-2">
                            <div className='main-logo mb-3'>
                                <Image
                                    className="h-auto w-100"
                                    loader={trvLoader}
                                    src="travanya-logo.webp"
                                    alt="Travanya Logo"
                                    width={176}
                                    height={43}
                                    priority
                                />
                            </div>
                            <h2 className="mb-0 fs-14 opacity-75 ">We're Just a Call Away!</h2>
                            <h3 className="fw-bold mb-2 fs-26">
                                <a className="text-decoration-none color-blue fs-18 fw-bold" href={"tel:" + displayContactNumber}>{displayContactNumber}</a>
                            </h3>
                            <p className="fs-12 fw-bold">Email: <a className="text-decoration-none color-black " href="mailto:info@travanya.ae">info@travanya.ae</a></p>
                            <p className="fs-12">Business Center 1, M Floor, The Meydan Hotel, Nad Al Sheba, Dubai, U.A.E</p>
                            <div className="social-icon">
                                <a href="https://www.facebook.com/TravanyaOfficial/" target="_blank">
                                    <Image
                                        className="me-2"
                                        loader={trvLoader}
                                        src="icon/facebook-icon.svg"
                                        alt="Facebook Ion"
                                        width={40}
                                        height={40}
                                    />
                                </a>
                                <a href="https://www.instagram.com/TravanyaOfficial/" target="_blank">
                                    <Image
                                        className="me-2"
                                        loader={trvLoader}
                                        src="icon/instagram-icon.svg"
                                        alt="instagram Ion"
                                        width={40}
                                        height={40}
                                    />
                                </a>
                                <a href="https://www.youtube.com/@travanya" target="_blank">
                                    <Image
                                        className="me-2"
                                        loader={trvLoader}
                                        src="icon/youtube.svg"
                                        alt="linkedin Ion"
                                        width={40}
                                        height={40}
                                    />
                                </a>
                                <a href="https://twitter.com/TravanyaDotCom/" target="_blank">
                                    <Image
                                        className=""
                                        loader={trvLoader}
                                        src="icon/twitter-icon.svg"
                                        alt="twitter Ion"
                                        width={40}
                                        height={40}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-9 py-2">
                            <div className="row">
                                <div className="col-6 col-sm-6 col-md-3">
                                    <h2 className="fw-bold fs-16">Company</h2>
                                    <ul className="list-style-none">
                                        <li><a className="fs-12 text-decoration-none" href="/about-us">About Us</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/contact-us">Contact Us</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/privacy-policy">Privacy Policy</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/terms-conditions">Terms & Conditions</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/disclaimer">Disclaimer</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/baggage-fees">Baggage Fees</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/check-in">Check In</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/FAQ">FAQ</a></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-sm-6 col-md-3">
                                    <h2 className="fw-bold fs-16">International Packages</h2>
                                    <ul className="list-style-none">
                                        <li><a className="fs-12 text-decoration-none" href="/international-tour-packages/dubai-tour-packages/">Dubai Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/international-tour-packages/vietnam-tour-packages/">Vietnam Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/international-tour-packages/turkey-tour-packages/">Turkey Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/international-tour-packages/thailand-tour-packages/">Thailand Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/international-tour-packages/singapore-tour-packages/">Singapore Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/international-tour-packages/mauritius-tour-packages/">Mauritius Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/international-tour-packages/bali-tour-packages/">Bali Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/international-tour-packages/maldives-tour-packages/">Maldives Tour Packages</a></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-sm-6 col-md-3">
                                    <h2 className="fw-bold fs-16">Domestic Packages</h2>
                                    <ul className="list-style-none">
                                        <li><a className="fs-12 text-decoration-none" href="/india-tour-packages/rajasthan-tour-packages/">Rajasthan Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/india-tour-packages/kashmir-tour-packages/">Kashmir Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/india-tour-packages/kerala-tour-packages/">Kerala Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/india-tour-packages/goa-tour-packages/">Goa Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/india-tour-packages/nainital-tour-packages/">Nainital Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/india-tour-packages/andaman-tour-packages/">Andaman Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/india-tour-packages/himachal-tour-packages/">Himachal Tour Packages</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/india-tour-packages/leh-ladakh-tour-packages/">Leh Ladakh Tour Packages</a></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-sm-6 col-md-3">
                                    <h2 className="fw-bold fs-16">Helpful Links</h2>
                                    <ul className="list-style-none">
                                        <li><a className="fs-12 text-decoration-none" href="/deals/first-flight-booking-offers/">First Flight Offers</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/tourism/dubai/">Dubai Tourism</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/tourism/dubai/tourist-attractions/">Dubai Tourist Attractions</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/tourism/dubai/parks/">Dubai Parks</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/tourism/dubai/shopping-places/">Dubai Shopping Places</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/tourism/india/">India Tourism</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/tourism/india/goa/">Goa Tourism</a></li>
                                        <li><a className="fs-12 text-decoration-none" href="/make-payment">Make Payment</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container last-footer">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center fs-12">*Fares incl. all fuel surcharges, our service fees and taxes. Displayed fares are based on historical data, are subject to change and cannot be guaranteed at the time of booking. Lowest fares may require an advance purchase of up to 21 days.</p>
                        </div>
                        <Image
                            className="h-auto m-auto d-table footerPaymetnCArd mt-2 mb-4"
                            loader={trvLoader}
                            src="icon/footer-payment-cards.png"
                            alt="Payment Card"
                            width={45}
                            height={45}
                        />
                        <div className="col-12">
                            <p className="text-center fs-12 border-top pt-3">Copyright © 2024 <a className="color-blue text-decoration-none fw-bold" href="https://www.travanya.ae/">Travanya.ae</a>, Powered by SHIPRA TRAVELS PVT. LTD. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>

            </footer>
            <div className="ContactStrapMobilebox position-fixed bottom-0 w-100">
                <div className="ContactStrapMobile bg-blue d-md-none rounded-top-3">
                    <a href={"tel:" + displayContactNumber} className="d-inline-block  w-100 text-decoration-none color-white">
                        <div className="d-flex align-items-center w-100 justify-content-center">
                            <div className="border-end me-4 pe-4 py-3">
                                <Image
                                    className="h-auto"
                                    loader={trvLoader}
                                    src="icon/phone-icon-white.svg"
                                    alt="mobile-icon"
                                    width={30}
                                    height={45}
                                />
                            </div>
                            <div className="text-center ">
                                <p className="mb-0 fs-14">Exclusive Flights & Holidays Deals</p>
                                <div className="fs-22 fw-bold">{displayContactNumber}</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}