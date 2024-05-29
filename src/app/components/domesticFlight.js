import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";

export default function DomesticFlights() {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="subHeading">
                            <h2 className="mb-0 fw-normal">Domestic <strong className="color-orange">Flights</strong></h2>
                        </div>
                    </div>
                </div>
                <div className="">
                    <ul className="nav nav-pills mb-3 DealsTabs justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link color-black bg-white rounded-0 active" id="citys1-tab" data-bs-toggle="pill" data-bs-target="#citys1" type="button" role="tab" aria-controls="citys1" aria-selected="true">Abu Dhabi</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link color-black bg-white rounded-0" id="citys2-tab" data-bs-toggle="pill" data-bs-target="#round-trip" type="button" role="tab" aria-controls="round-trip" aria-selected="false">Sharjah</button>
                        </li>
                    </ul>
                    <div className="tab-content bg-grey p-4" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="citys1" role="tabpanel" aria-labelledby="citys1-tab">
                            <div className="row">
                                <div className="col-12 col-lg-3">
                                    <div className="DubaiDealsBox bg-white">
                                        <div className="cityDealsImg">
                                            <Image
                                                className="h-auto w-100"
                                                loader={trvLoader}
                                                src="tajmahal-img.webp"
                                                alt="Taj Mahal Img"
                                                width={17}
                                                height={12}
                                            />
                                        </div>
                                        <div className="DealsReviewBox">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <div className="d-flex">
                                                        <div>
                                                            <Image
                                                                className="h-auto "
                                                                loader={trvLoader}
                                                                src="icon/clock-orange-icon.svg"
                                                                alt="Clock Icon"
                                                                width={17}
                                                                height={12}
                                                            />
                                                        </div>
                                                        <div>
                                                            <span className="ms-2 fw-bold fs-14">4N/ 5D</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="start">123</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="DubaiDealsContentBox p-3">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <Image
                                                        className=""
                                                        loader={trvLoader}
                                                        src="icon/location-orange-icon.svg"
                                                        alt="Location Icon"
                                                        width={24}
                                                        height={24}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="mb-0 ms-2 fw-bold fs-18">Abu Dhabi</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="DubaiDealsTags p-3 border-top border-bottom">
                                            <button className="fs-12 rounded-4 me-2 my-1 bg-grey color-black border-0 py-2 px-3">Akbar Recomended</button>
                                            <button className="fs-12 rounded-4 me-2 my-1 bg-grey color-black border-0 py-2 px-3">Beach</button>
                                            <button className="fs-12 rounded-4 me-2 my-1 bg-grey color-black border-0 py-2 px-3">Family with kids</button>
                                            <button className="fs-12 rounded-4 me-2 my-1 bg-grey color-black border-0 py-2 px-3">Honeymoon</button>
                                        </div>
                                        <div className="p-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <button className="fs-12 border-0 buttonStyle3">Details</button>
                                                </div>
                                                <div className="text-end">
                                                    <p className="mb-0 fs-14">Form</p>
                                                    <h3 className="fw-bold fs-18 mb-0">AED 482</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}