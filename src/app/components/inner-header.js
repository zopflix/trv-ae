"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isExternalUTM } from "../helpers/common";
import { contactNumber, externalContactNumber, uaeContact,flightContactNumber } from "../config";
import { trvLoader } from "../helpers/imageKitLoader";
import SkipNGoToHome from "./_skip_go_home";
import Image from "next/image";

export default function InnerHeader() {
    const [openBackModal, setOpenBackModal] = useState(false);
    const path = usePathname();

    const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);
    const [isBackLoading, setIsBackLoading] = useState(false);

    useEffect(() => {
        if (isExternalUTM())
            setDisplayContactNumber(externalContactNumber);
        else if (path == '/ae/make-payment/')
            setDisplayContactNumber(uaeContact);
    }, []);

    useEffect(() => {
        const keywords = ['listing', 'checkout', 'flights', '/results', 'flight', 'confirmation'];
        if (keywords.some(keyword => path.includes(keyword))) {
            setDisplayContactNumber(flightContactNumber);
        }
    }, [path, flightContactNumber]);
    

    return (


        <header className='py-2 bg-white'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2'>
                        <div className='main-logo cursor-pointer'

                            onClick={() => {
                                if (
                                    path == "/listing/" ||
                                    path == "/checkout/" ||
                                    path == "/purchase/" ||
                                    path == "/results/" ||
                                    path == "/buy/" ||
                                    path == "/book-flight/"
                                ) {
                                    setOpenBackModal(true);

                                }
                                else { window.open("/", "_self") };
                            }}
                        >
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
                    </div>
                    <div className='col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xxl-10'>
                        <div className='d-flex align-items-center justify-content-end'>
                            <div className='phoneNumber h-auto '>
                                <a className='btn px-0 border-0 d-flex align-itmes-center text-decoration-none py-lg-3' href={'tel:' + displayContactNumber}>
                                    <div>
                                        <Image
                                            className="h-auto"
                                            loader={trvLoader}
                                            src="icon/phone-call-icon.svg"
                                            alt="Phone Icon"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className='d-none d-lg-block'>
                                        <span className='color-blue fs-16 fw-bold ps-2'>{displayContactNumber}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SkipNGoToHome goHomeText={"Go To Home"} setOpenBackModal={setOpenBackModal} openBackModal={openBackModal} setIsBackLoading={setIsBackLoading} isBackLoading={isBackLoading}></SkipNGoToHome>

        </header>


    )
}

