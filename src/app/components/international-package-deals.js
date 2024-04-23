import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";
import Slider from "react-slick";
import { isBrowser } from "react-device-detect";


export default function InternationalPackageDeals() {


    const sliderSettings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "20px",
        slidesToShow: isBrowser ? 4 : 1,
        slidesToScroll: isBrowser ? 1 : 1,
        speed: 500,
        focusOnSelect: true
    };

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="subHeading">
                            <h2 className="mb-0 fw-normal">International <strong className="color-orange">Package</strong></h2>
                        </div>
                    </div>
                </div>
                <div className="">
                    <ul className="nav nav-pills mb-3 DealsTabs justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link color-black bg-white rounded-0 active" id="package1-tab" data-bs-toggle="pill" data-bs-target="#package1" type="button" role="tab" aria-controls="package1" aria-selected="true">Abu Dhabi</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link color-black bg-white rounded-0" id="citys2-tab" data-bs-toggle="pill" data-bs-target="#round-trip" type="button" role="tab" aria-controls="round-trip" aria-selected="false">Sharjah</button>
                        </li>
                    </ul>
                    <div className="tab-content bg-grey py-4 px-2 position-relative" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="package1" role="tabpanel" aria-labelledby="package1-tab">
                            <Slider {...sliderSettings}>
                                <div className="slider-items">
                                    <div className="packageBox position-relative">
                                        <div className="packageImgBox">
                                            <Image
                                                className="h-auto w-100"
                                                loader={trvLoader}
                                                src="package.webp"
                                                alt="Package img"
                                                width={176}
                                                height={43}
                                            />
                                        </div>
                                        <div className="packageNum position-absolute color-white">6 Packages</div>
                                        <div className="packageTitleBox bg-white px-3 py-2 rounded-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <p className="mb-0 fs-16 fw-bold color-black">Japan</p>
                                                </div>
                                                <div className="text-end">
                                                    <p className="mb-0 fs-12 fw-bold color-black">From</p>
                                                    <p className="mb-0 fs-16 fw-bold color-orange">AED 482</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}