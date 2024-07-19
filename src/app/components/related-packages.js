import Slider from "react-slick";
import { isDesktop, isTablet } from "react-device-detect";
import { aedNumberFormat } from "../helpers/common";

export default function RelatedPackages(props) {
    const packages = props.data;
    const destSlug = props.destSlug;

    const sliderSettings = {
        autoplay: packages.length > 2 ? true : false,
        className: "center",
        centerMode: false,
        infinite: packages.length > 2 ? true : false,
        centerPadding: "10px",
        slidesToShow: isTablet ? 2 : (isDesktop ? 2 : 1),
        slidesToScroll: 1,
        speed: 500,
        focusOnSelect: true
    };


    return (
        <div className="row py-4">
            <div className="col-12">
            <h4 className="mb-0 fw-normal">Related <strong className="color-orange">Packages</strong></h4>
            </div>
            <div className="col-12 position-relative py-1">
                <Slider {...sliderSettings}>
                    {packages?.map((pkg, ix) => {
                        return <div key={ix} className="slider-items">
                            <div className="border rounded-2 p-2">
                                <img className="w-100" src={pkg.image} />
                                <h2 className="fs-16 fw-bold mt-2 relatedTitle">{pkg.name}</h2>
                                <div className="border-top d-flex justify-content-between align-items-center pt-2">
                                    <div>
                                        <p className="mb-0 fs-14">From <span className="fw-bold fs-18 color-orange">{aedNumberFormat(pkg.startingPrice).split(".")[0]}</span></p>
                                    </div>
                                    <div>
                                        <a className="color-blue fw-bold text-decoration-none fs-16" target="_blank" href={`/holidays/${destSlug}/${pkg.slug}`}>View Detail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </Slider>
            </div>
        </div>
    )
}