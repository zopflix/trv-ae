"use client"
import Image from "next/image";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import Slider from "react-slick";
import { isDesktop, isTablet } from "react-device-detect";
import { getDestinationAndPackages } from "../services/holidayService";
import { useEffect, useState } from "react";
import { aedNumberFormat } from "../helpers/common";


export default function RelatedPackages() {
    const [domesticPackages, setDomesticPackages] = useState([]);

    const sliderSettings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "10px",
        slidesToShow: isTablet ? 2 : (isDesktop ? 2 : 1),
        slidesToScroll: 1,
        speed: 500,
        focusOnSelect: true
    };

    useEffect(() => {
        getDestinationAndPackages({ TenantId: 7, IsDomestic: false }).then(res => {
            if (res && res.length > 0)
                setDomesticPackages(res);
        });
    }, []);


    return (
        <div className="row py-4">
            <div className="col-12">
                <h3 className="mb-3">Related Packages</h3>
            </div>
            <div className="col-12 position-relative py-1">
                <Slider {...sliderSettings}>
                    <div className="slider-items">
                        <div className="border rounded-2 p-2">
                            <img className="w-100" src="https://assets.superfares.com/cms/The-Statue-Of-Seema-Malakaya-At-The-Gangaramaya-Temple.webp" />
                            <h2 className="fs-18 fw-bold mt-2">Anantaya Resort And Spa Chilaw</h2>
                            <div className="border-top d-flex justify-content-between align-items-center pt-2">
                                <div>
                                    <p className="mb-0 fs-14">From <span className="fw-bold fs-18 color-orange">AUD 999</span></p>
                                </div>
                                <div>
                                    <a className="color-blue fw-bold text-decoration-none fs-16" href="#">View Detail</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}