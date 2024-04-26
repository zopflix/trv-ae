import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";
import { contactNumber, uaeContact } from "../config";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function InnterFooter() {
    const path = usePathname();
    const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);

    useEffect(() => {
        if (path == '/ae/make-payment/')
            setDisplayContactNumber(uaeContact);
    }, [])
    return (
        <>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script>

            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center fs-14">*Fares incl. all fuel surcharges, our service fees and taxes. Displayed fares are based on historical data, are subject to change and cannot be guaranteed at the time of booking. Lowest fares may require an advance purchase of up to 21 days.</p>
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
                            <p className="text-center fs-12 border-top pt-3">Copyright © 2024 <a className="color-blue text-decoration-none fw-bold" href="https://www.travanya.ae/">Travanya.com</a>, Powered by SHIPRA TRAVELS PVT. LTD. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>

            </footer>

            {/* <div className="ContactStrapMobilebox position-fixed bottom-0 w-100">
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
            </div> */}

        </>


    )
}