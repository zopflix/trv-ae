import { Fragment, useEffect } from "react"
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";
import { getFormattedDate8 } from "../helpers/common";

export default function ResultsSplashScreen(props) {

    useEffect(() => {
        document.body.classList.add("splash-page");
        return () => {
            if (document.body.classList.contains("splash-page"))
                document.body.classList.remove("splash-page");
        };
    }, []);



    return (
        <div>
            <div className="SlashLoaderAir text-center px-2 py-5 fs-14">
                <div className="position-relative d-table m-auto ">
                    <div className="SplashLoader"></div>
                    <Image
                        className="h-auto  position-absolute top-0 bottom-0 m-auto start-0 end-0"
                        loader={trvLoader}
                        src="icon/Splash-loader-plane.svg"
                        alt="Splash loader plane"
                        width={50}
                        height={19}
                    />
                </div>
                <p className="mt-2 mb-1">Searching for the best deals for you</p>
                <div className="d-table d-md-flex m-auto justify-content-center align-items-center fw-bold text-center">
                    <div>{props?.data?.fromLabel}</div>
                    <div>
                        <Image
                            className="h-auto mx-2 d-none d-md-block"
                            loader={trvLoader}
                            src={props?.data?.tripType > 1 ? "icon/Splash-arrow-plane.svg" : "icon/right.svg"}
                            alt="Splash loader plane"
                            width={20}
                            height={19}
                        />
                        <Image
                            className="h-auto my-2 d-md-none"
                            loader={trvLoader}
                            src={props?.data?.tripType > 1 ? "icon/Splash-arrow-mob-plane.svg" : "icon/bottom.svg"}
                            alt="Splash loader plane"
                            width={10}
                            height={19}
                        />
                    </div>
                    <div>{props?.data?.toLabel}</div>
                </div>
                <div className="d-flex justify-content-center align-items-center my-2">
                    <div>Departure ({getFormattedDate8(props?.data?.fromDate)})</div>
                    {props?.data?.tripType > 1 &&
                        <Fragment>
                            <div className="mx-2">-</div>
                            <div>Return ({getFormattedDate8(props?.data?.toDate)})</div>
                        </Fragment>
                    }
                </div>
                <div>{props?.data?.travelers?.adults + props?.data?.travelers?.children + props?.data?.travelers?.infants} Traveler(s), {props?.data?.travelers?.cabin}</div>
            </div>

            {/* <div className="splash-air-progress-bar">
                <div className="splash-air-animation-bar"></div>
            </div>

            <div className="splash-ani-box splash-code">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3 d-none d-lg-inline-block">
                            <div className="bg-white p-3 mb-5">
                                <div className="d-flex align-items-center">
                                    <h6 className="mb-0 tc-text splash-bg-grey">000<br />0000</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-20">000000000</h6>
                                </div>
                                <hr className="hr-line" />
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">000000000</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-20">000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-3">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">00</h6>
                                    <h6 className="ms-2 mb-0 tc-text splash-bg-grey h-20">0000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">00</h6>
                                    <h6 className="ms-2 mb-0 tc-text splash-bg-grey h-20">0000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">00</h6>
                                    <h6 className="ms-2 mb-0 tc-text splash-bg-grey h-20">0000000</h6>
                                </div>
                                <hr className="hr-line" />
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-5 w-100 mt-2">00</h6>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-20">00</h6>
                                </div>
                                <hr className="hr-line" />
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-5 w-100 mt-2">00</h6>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-20">00</h6>
                                </div>
                                <hr className="hr-line" />
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-3">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <hr className="hr-line" />
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-3">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <hr className="hr-line" />
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-20">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-3">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-15">00</h6>
                                    <h6 className="ms-3 mb-0 tc-text splash-bg-grey h-15">000000000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 overflow-hidden">
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0">Searching for flights from 400+ airlines.....</h6>
                            </div>

                            <div className="bg-white p-3 mt-3 mb-0">
                                <div className="w-100 splash-bg-grey h-10"></div>
                                <div className="w-75 splash-bg-grey h-10 mt-2"></div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    
                                    <div className=" w-100 mt-4 mb-4 p-3 custom-screen-active-splash-screen border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text bg-white h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text bg-white h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text bg-white h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text bg-white h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text bg-white h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text bg-white h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text bg-white h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text bg-white h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text bg-white h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text bg-white h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text bg-white h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text bg-white h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text bg-white h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>


                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-6">
                                    

                                    <div className=" w-100 mt-4 mb-4 p-3 custom-screen-active-splash-screen border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text bg-white h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text bg-white h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text bg-white h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text bg-white h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text bg-white h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text bg-white h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text bg-white h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text bg-white h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text bg-white h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text bg-white h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text bg-white h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text bg-white h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text bg-white h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3  border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>

                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>


                                    <div className="bg-white w-100 mt-4 mb-4 p-3 border">
                                        <div className="row m-0">
                                            <div className="col-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row align-items-center mt-3">
                                                            <div className="col-2 col-md-3 col-lg-4 col-xl-3 p-0">
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-40 mb-2 d-table">0000</h6>
                                                                <h6 className="mb-0 tc-text splash-bg-grey h-10 float-start">00000000</h6>
                                                            </div>
                                                            <div className="col-10 col-md-9 col-lg-8 col-xl-9">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                    </div>
                                                                    <div className="col-4 p-0">
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                        <hr className="hr-line mb-0 mt-0" />
                                                                        <h6 className="m-auto tc-text splash-bg-grey h-10 w-25 mt-2">00000</h6>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="d-table float-end">
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-10 w-25">0000</h6>
                                                                            <h6 className="mb-0 tc-text splash-bg-grey h-20 mt-2 d-table">000000</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-table float-end w-75">
                                                    <h6 className="mb-0 mt-2 text-end mb-2">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block btn-active">00</span>
                                                    </h6>
                                                    <h6 className="mb-0 text-end">
                                                        <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-2 text-end">
                                                        <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000000</h6>
                                            <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">00000</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}


        </div>
    )
}