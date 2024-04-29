"use client"
import Image from "next/image";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import Slider from "react-slick";
import { isDesktop, isTablet } from "react-device-detect";
import { useEffect, useState } from "react";
import { getDestinationAndPackages } from "../services/holidayService";
import { aedNumberFormat } from "../helpers/common";


export default function InternationalTourPackages() {
    const [internationalPackages, setInternationalPackages] = useState([]);

    const sliderSettings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "20px",
        slidesToShow: isTablet ? 2 : (isDesktop ? 4 : 1),
        slidesToScroll: 1,
        speed: 500,
        focusOnSelect: true
    };

    useEffect(() => {
        getDestinationAndPackages({ TenantId: 3, IsDomestic: false }).then(res => {
            if (res && res.length > 0)
                setInternationalPackages(res);
        });
    }, []);


    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="co-12 position-relative p-0">
                        <Slider {...sliderSettings}>
                            {internationalPackages?.map((pkg, ix) => {
                                return <div className="slider-items" key={ix}>
                                    <div className="packageBox position-relative cursor-pointer" onClick={() => window.open(`/international-tour-packages/${pkg.slug}-tour-packages`, '_blank')}>
                                        <div className="packageImgBox">
                                            <Image
                                                className="h-auto w-100"
                                                loader={!!pkg.image ? sfLoader : trvLoader}
                                                src={!!pkg.image ? pkg.image : "Abu-Dhabi-holiday.webp"}
                                                alt="international-img"
                                                width={176}
                                                height={43}
                                            />
                                        </div>
                                        <div className="packageNum position-absolute color-white">{pkg.totalPackages} Packages</div>
                                        <div className="packageTitleBox bg-white px-3 py-2 rounded-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <p className="mb-0 fs-16 fw-bold color-black">{pkg.name}</p>
                                                </div>
                                                <div className="text-end">
                                                    <p className="mb-0 fs-12 fw-bold color-black">From</p>
                                                    <p className="mb-0 fs-16 fw-bold color-orange">{aedNumberFormat(pkg.startingPrice).split('.')[0]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
}