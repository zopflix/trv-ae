import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";
import StarRatings from "react-star-ratings";
import { aedNumberFormat } from "../helpers/common";

export default function FlightInfoSideBar(props) {
    const pricePerPax = props.totalPrice / (props.adults + props.children);
    return (

        <div className="FlightInfoSideBarWrap">
            <div className="border p-3 rounded-3">
                <h2 className="color-orange fs-16 fw-bold">{props?.data?.Title}</h2>
                {props?.data?.Cities?.length > 0 && <p className="color-black fw-bold"><span className="color-grey">Cities:</span> {props?.data?.Cities?.join(', ')}</p>}
                <div className="d-flex align-items-center">
                    <div>
                        <p className="mb-0 me-2 color-grey fw-bold">{props?.rating} Stars</p>
                    </div>
                    <div>
                        <StarRatings
                            rating={props?.rating ? props.rating : 0}
                            starRatedColor="#FFC000"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-4 text-center my-2">
                        <Image
                            loader={trvLoader}
                            src="icon/highlights-icon.svg"
                            alt="Highlights icon"
                            width={20}
                            height={20}
                        />
                        <p className="color-grey fs-12 mb-0 mt-1">Highlights</p>
                    </div>
                    <div className="col-4 text-center my-2">
                        <Image
                            className=""
                            loader={trvLoader}
                            src="icon/sightseeing-icon.svg"
                            alt="Sightseeing icon"
                            width={20}
                            height={20}
                        />
                        <p className="color-grey fs-12 mb-0 mt-1">Sightseeing</p>
                    </div>
                    <div className="col-4 text-center my-2">
                        <Image
                            className=""
                            loader={trvLoader}
                            src="icon/transfers-icon.svg"
                            alt="Transfers icon"
                            width={20}
                            height={20}
                        />
                        <p className="color-grey fs-12 mb-0 mt-1">Transfers</p>
                    </div>
                    <div className="col-4 text-center my-2">
                        <Image
                            className=""
                            loader={trvLoader}
                            src="icon/meals-icon.svg"
                            alt="Meals icon"
                            width={20}
                            height={20}
                        />
                        <p className="color-grey fs-12 mb-0 mt-1">Meals</p>
                    </div>
                    <div className="col-4 text-center my-2">
                        <Image
                            className=""
                            loader={trvLoader}
                            src="icon/flight-icon-hide.svg"
                            alt="Flight icon"
                            width={20}
                            height={20}
                        />
                        <p className="color-grey fs-12 mb-0 mt-1">Flight</p>
                    </div>
                    <div className="col-4 text-center my-2">
                        <Image
                            className=""
                            loader={trvLoader}
                            src="icon/hotel-icon.svg"
                            alt="Hotel icon"
                            width={20}
                            height={20}
                        />
                        <p className="color-grey fs-12 mb-0 mt-1">Hotel</p>
                    </div>
                </div>
                <div className="bg-grey p-3">
                    <div className="border-bottom pb-3 mb-3 ">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="accordion border-0" id="accordionExample">
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header border-0" id="headingTwo">
                                        <button className="accordion-button collapsed p-0 bg-grey border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <span className="fs-14 me-1">Package Cost</span>
                                        </button>
                                    </h2>
                                </div>
                            </div>
                            <div>
                                <p className="mb-0 fs-14">{aedNumberFormat(props?.totalPrice)?.split('.')[0]}.<sup>{aedNumberFormat(props?.totalPrice)?.split('.')[1]}</sup></p>
                            </div>
                        </div>
                        <div className="accordion border-0" id="accordionExample">
                            <div className="accordion-item border-0">
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body border-0 px-0 bg-grey pb-0">
                                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                            <div>
                                                <p className="mb-0 fs-14">Adults ({props.adults} x {aedNumberFormat(pricePerPax)?.split('.')[0]}.<sup>{aedNumberFormat(pricePerPax)?.split('.')[1]}</sup>)</p>
                                            </div>
                                            <div>
                                                <p className="mb-0 fs-14">{aedNumberFormat(props.adults * pricePerPax)?.split('.')[0]}.<sup>{aedNumberFormat(props.adults * pricePerPax)?.split('.')[1]}</sup></p>
                                            </div>
                                        </div>
                                        {props.children > 0 &&
                                            <div className="d-flex align-items-center justify-content-between pt-3">
                                                <div>
                                                    <p className="mb-0 fs-14">Children ({props.children} x {aedNumberFormat(pricePerPax)?.split('.')[0]}.<sup>{aedNumberFormat(pricePerPax)?.split('.')[1]}</sup>)</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0 fs-14">{aedNumberFormat(props.children * pricePerPax)?.split('.')[0]}.<sup>{aedNumberFormat(props.children * pricePerPax)?.split('.')[1]}</sup></p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                        <div className="">
                            <p className="mb-0 color-black fw-bold">Total Amount</p>
                        </div>
                        <div>
                            <p className="mb-0 color-black fw-bold">{aedNumberFormat(props?.totalPrice)?.split('.')[0]}.<sup>{aedNumberFormat(props?.totalPrice)?.split('.')[1]}</sup></p>
                        </div>
                    </div>
                </div>
                <button className="buttonStyle3 fs-14 border-0 rounded-3 px-3 py-3 my-3 w-100" onClick={() => props.setOpenInquiryModal(true)}>Enquire</button>
                {/* <p className="mb-0 color-grey fs-12 d-flex"><span className="fw-bold me-1">Note:</span> <span dangerouslySetInnerHTML={{ __html: props?.data?.Notes }}></span></p> */}
            </div>
        </div>
    )
}