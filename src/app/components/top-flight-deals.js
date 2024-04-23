import Slider from "react-slick";
import { isDesktop, isTablet } from "react-device-detect";
import { useEffect, useState } from "react";
import { getFlightOffers } from "../services/flightService";
import Image from "next/image";
import { sfLoader } from "../helpers/imageKitLoader";

export default function TopFlightDeals() {
    const [offers, setOffers] = useState([]);

    const sliderSettings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "20px",
        slidesToShow: isTablet ? 2 : (isDesktop ? 3 : 1),
        slidesToScroll: 1,
        speed: 500,
        focusOnSelect: true
    };

    useEffect(() => {
        getFlightOffers().then(res => {
            setOffers(res);
        })
    }, []);


    return (
        <section className="TopFlightDeals">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-8">
                        <div className="subHeading">
                            <h2 className="mb-0 fw-normal">Top Flight <strong className="color-orange">Deals</strong></h2>
                        </div>
                    </div>
                    <div className="col-4 text-end">
                        <a className="text-decoration-none color-blue  fw-bold fs-14" href="/deals">View More</a>
                    </div>
                    <div className="col-12 mt-3">
                        <div className="position-relative px-2">
                            <Slider {...sliderSettings}>
                                {offers.length > 0 &&
                                    offers.filter(x => !x.isHoliday)?.map((offer, ix) => {
                                        return <div className="slider-items" key={ix}>
                                            <a href={offer.offerURL}>
                                                <Image
                                                    priority
                                                    className="w-100 h-auto"
                                                    loader={sfLoader}
                                                    src={offer.image}
                                                    alt="offer"
                                                    width={100}
                                                    height={100}
                                                />
                                            </a>
                                        </div>
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}