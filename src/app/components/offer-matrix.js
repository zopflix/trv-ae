"use client"

import Image from "next/image";
import Slider from "react-slick"
import { trvLoader } from "../helpers/imageKitLoader";
import { isDesktop } from "react-device-detect";

export default function OffersMatrix() {

    const sliderSettings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "20px",
        slidesToShow: (isDesktop ? 4 : 2),
        slidesToScroll: 1,
        speed: 500,
        focusOnSelect: true
    };


    return (
        <div className="">
            <Slider {...sliderSettings}>
                <div className="slider-items">
                    <div className="d-flex align-items-center border bg-light-blue p-2 rounded-1">
                        <div>
                            <Image
                                className="me-2"
                                loader={trvLoader}
                                src="icon/offer-percent.svg"
                                alt="domestic-img"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div>
                            <p className="mb-0 fs-10 color-black fw-bold">Get up to ₹200 Off*</p>
                            <p className="mb-0 fs-10"> <span className="color-blue fw-bold">TRAVANYAFIRST</span> on Flight</p>
                        </div>
                    </div>
                </div>
                <div className="slider-items">
                    <div className="d-flex align-items-center border bg-light-blue p-2 rounded-1">
                        <div>
                            <Image
                                className="me-2"
                                loader={trvLoader}
                                src="icon/offer-percent.svg"
                                alt="domestic-img"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div>
                            <p className="mb-0 fs-10 color-black fw-bold">Get up to ₹750 Off*</p>
                            <p className="mb-0 fs-10"> <span className="color-blue fw-bold">FLYDOUBLE</span> on Flight</p>
                        </div>
                    </div>
                </div>
                <div className="slider-items">
                    <div className="d-flex align-items-center border bg-light-blue p-2 rounded-1">
                        <div>
                            <Image
                                className="me-2"
                                loader={trvLoader}
                                src="icon/offer-percent.svg"
                                alt="domestic-img"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div>
                            <p className="mb-0 fs-10 color-black fw-bold">Get up to ₹800 Off*</p>
                            <p className="mb-0 fs-10"> <span className="color-blue fw-bold">FAMILYFUN</span> on Flight</p>
                        </div>
                    </div>
                </div>
                <div className="slider-items">
                    <div className="d-flex align-items-center border bg-light-blue p-2 rounded-1">
                        <div>
                            <Image
                                className="me-2"
                                loader={trvLoader}
                                src="icon/offer-percent.svg"
                                alt="domestic-img"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div>
                            <p className="mb-0 fs-10 color-black fw-bold">Get up to ₹1000 Off*</p>
                            <p className="mb-0 fs-10"> <span className="color-blue fw-bold">COUPLESFLY</span> on Flight</p>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

