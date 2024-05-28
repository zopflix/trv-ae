import Header from "./header";
import '../globals.css'
import '../variable-style.css'
import '../search-form-style.css'
import '../listing-style.css'
import '../holiday-listing.css'
import '../splash-style.css'
import '../user-style.css'
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { contactNumber, uaeContact, holidayContactNumber,flightContactNumber } from "../config";
import { usePathname } from "next/navigation";
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image"

export default function Layout({ children }) {
    const path = usePathname();
    const [showBtmStrip, setShowBtmStrip] = useState(false);
    const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);


    useEffect(() => {
        setShowBtmStrip(window.location.href.includes("packages") || window.location.href.includes("holidays"))
        if (path == '/ae/make-payment/')
            setDisplayContactNumber(uaeContact);
    });


    useEffect(() => {
        let numberToDisplay = contactNumber; 
    
        if  ( path.includes("/") || path.includes("/holidays") || path.includes("/international-tour-packages") || path.includes("/india-tour-packages")) {
            numberToDisplay = holidayContactNumber;
        } else if ( path.includes("/results") || path.includes("flight")) {
            numberToDisplay = flightContactNumber;
        }
    
        setDisplayContactNumber(numberToDisplay);
    }, []);

    return (
        <>
            <section>
                <Head>
                    {/* Bootstrap */}
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
                    <Script strategy='lazyOnload' src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" />
                    
                </Head>
                <Header></Header>
                <main>{children}</main>
            </section>
            {showBtmStrip &&
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
            }
        </>
    )
}