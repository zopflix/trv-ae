import Slider from "react-slick";
import { isDesktop, isTablet } from "react-device-detect";
import { useEffect, useState } from "react";
import { getGoogleReviews } from "../services/flightService";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";
import { getDaysAgo } from "../helpers/common";

export default function GoogleReviews() {
    const [totalReviews, setTotalReviews] = useState();
    const [reviews, setReviews] = useState();

    const sliderSettings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "20px",
        slidesToShow: isTablet ? 2 : (isDesktop ? 3 : 1),
        slidesToScroll: 1,
        speed: 500,
        focusOnSelect: true,
        infinite: true
    };

    useEffect(() => {
        getGoogleReviews().then(res => {
            let sorted = res?.reviews?.sort((a, b) => parseInt(b.time) - parseInt(a.time));
            setTotalReviews(res?.company?.review_count);
            setReviews(sorted);
        });
    }, []);


    return (
        <section className="py-5 GoogleReviews">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="subHeading">
                            <h2 className="mb-3 fw-normal">Google <strong className="color-orange">Reviews</strong></h2>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="text-center">
                            <a className="color-blue text-decoration-none fw-bold d-inline-block m-auto" href="https://maps.google.com/?cid=7396958202357256589" target="_blank">Travanya.com</a>
                            <div className="GoogleReviewStar py-2">
                                <i className="fa fa-star color-orange fs-20"></i>
                                <i className="fa fa-star color-orange fs-20"></i>
                                <i className="fa fa-star color-orange fs-20"></i>
                                <i className="fa fa-star color-orange fs-20"></i>
                                <i className="fa fa-star-half color-orange fs-20"></i>
                            </div>
                            <p className="fs-12">Based on {totalReviews} reviews</p>
                            <a className="shadow googleReview buttonStyle4 color-white text-decoration-none fs-14 py-2 px-3 rounded-2 d-inline-block" href="https://search.google.com/local/writereview?placeid=ChIJKTmbpNiSDzkRjZHqVUtGp2Y" target="_blank">
                                <div className="d-flex align-items-center">
                                    <span>Review us on</span>
                                    <Image
                                        className="ms-2 bg-white rounded-circle p-1"
                                        loader={trvLoader}
                                        src="icon/google-icon.svg"
                                        alt="Payment Card"
                                        width={25}
                                        height={25}

                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-9">
                        <div className="position-relative">
                            <Slider {...sliderSettings}>
                                {reviews?.length > 0 &&
                                    reviews?.map((review, ix) => {
                                        return <div className="slider-items" key={ix}>
                                            <div className="bg-white shadow p-3 my-4 rounded-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <div className="GoogleReviewUserProfile">
                                                            <Image
                                                                className="me-2"
                                                                loader={sfLoader}
                                                                src={review.profile_photo_url}
                                                                alt="profile img"
                                                                width={50}
                                                                height={50}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <a className="color-blue text-decoration-none fw-bold" href={review.author_url} target="_blank">{review.author_name}</a>
                                                        <p className="mb-1 fs-12">{getDaysAgo(parseInt(review.time))}</p>
                                                        <div className="GoogleReviewStar">
                                                            <i className="fa fa-star color-orange fs-20"></i>
                                                            <i className="fa fa-star color-orange fs-20"></i>
                                                            <i className="fa fa-star color-orange fs-20"></i>
                                                            <i className="fa fa-star color-orange fs-20"></i>
                                                            {(parseInt(review.rating) > 4 && parseInt(review.rating) < 5) && <i className="fa fa-star-half color-orange fs-20"></i>}
                                                            {(parseInt(review.rating) == 5) && <i className="fa fa-star color-orange fs-20"></i>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="viewContent mt-2">
                                                    <p className="view fs-12 pt-1 pe-2">{review.text}</p>
                                                </div>
                                            </div>
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