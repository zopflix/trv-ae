"use client"
import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";
import { contactNumber, holidayContactNumber, flightContactNumber } from "../config";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDestinationAndPackages } from "../services/holidayService";

export default function Footer() {
    const path = usePathname();
    const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);
    const [packagesMenu, setpackagesMenu] = useState([]);

    useEffect(() => {
        let numberToDisplay = contactNumber;

        if (path.includes("/") || path.includes("/holidays") || path.includes("/international-tour-packages") || path.includes("/india-tour-packages")) {
            numberToDisplay = holidayContactNumber;
        } else if (path.includes("/results") || path.includes("flight")) {
            numberToDisplay = flightContactNumber;
        }
        if (path.includes("/make-payment") || path.includes("/dummy-flight-ticket") || path.includes("/payment-failed-confirmation")) {
            numberToDisplay = contactNumber;
        }

        setDisplayContactNumber(numberToDisplay);
    }, []);




    useEffect(() => {
        getDestinationAndPackages({ TenantId: 7, IsDomestic: false }).then(res => {
            if (res && res.length > 0)
                setpackagesMenu(res);

        });
    }, []);

    return (
        <>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script>

            <footer className="FooterLayoutOne">
                <Image
                    className="h-auto w-100"
                    loader={trvLoader}
                    src="footer-wave.png"
                    alt="footer-wave "
                    width={176}
                    height={43}
                    priority
                />
                <div className="footerWrp bg-blue">
                    <div className="container border-bottom mb-4 pb-4">
                        <div className="row pt-5">
                            <div className="col-12 col-md-4 col-lg-6">
                                <h2>Creating extraordinary travel experiences.</h2>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3">
                                <p className="fs-12">Business Center 1, M Floor, The Meydan Hotel, Nad Al Sheba, Dubai, U.A.E</p>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3">
                                <h3 className="my-0">
                                    <a className="color-white text-decoration-none fs-22 fw-bold" href={'tel:' + contactNumber}>{contactNumber}</a><br />
                                    <a className="color-white text-decoration-none fs-14 d-inline-block opacity-75" href="#">info@travanya.com</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="container ">
                        <div className="row">
                            <div className="col-6 col-lg-3">
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
                                <div className="social-icon mt-3">
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
                            <div className="col-6 col-lg-3">
                                <h2 className="fw-bold fs-16">Holiday Packages</h2>
                                <ul className="list-style-none">
                                    {
                                        packagesMenu.length > 0 && packagesMenu.map((obj, key)=>(
                                            <li key={key}><a className="fs-12 text-decoration-none" href={`/holidays/${obj.slug}-tour-packages/`}>{obj.name +" " +"Tour Package"}</a></li>

                                        ))
                                    }

                                </ul>
                            </div>
                           
                            <div className="col-6 col-lg-3">
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
                    <div className="container last-footer">
                        <div className="row border-top border-bottom mt-4 align-items-center">
                            <div className="col-12 col-lg-6 col-xl-7">
                                <p className="text-center fs-12 my-3">*Fares incl. all fuel surcharges, our service fees and taxes. Displayed fares are based on historical data, are subject to change and cannot be guaranteed at the time of booking. Lowest fares may require an advance purchase of up to 21 days.</p>
                            </div>
                            <div className="col-12 col-lg-6 col-xl-5">
                                <div className="bg-white rounded-2 py-2 px-2">
                                    <Image
                                        className="w-100 h-auto"
                                        loader={trvLoader}
                                        src="icon/footer-payment-cards.png"
                                        alt="Payment Card"
                                        width={45}
                                        height={45}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="text-center fs-12 pt-3">Copyright © 2024 <a className="color-white text-decoration-none fw-bold" href="https://www.travanya.ae/">Travanya.ae</a>, Powered by SHIPRA TRAVELS PVT. LTD. All Rights Reserved.</p>
                            </div>
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