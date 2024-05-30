import { useEffect } from "react"

// import NoSSR from 'react-no-ssr';
export default function SplashScreen()
// const [airSplashAnimation, setAirSplashAnimation] = useState(false);
{
    useEffect(() => {
        document.body.classList.add("splash-page");
        return () => {
            if (document.body.classList.contains("splash-page"))
              document.body.classList.remove("splash-page");
          };
    }, []);
    
    return (
    <div>
        <div className="splash-air-progress-bar">
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
                            <div className="d-flex">
                                <h6 className="ms-2 mb-0 tc-text bg-white h-30">0000</h6>
                                <h6 className="ms-2 mb-0 tc-text bg-white h-30">0000</h6>
                            </div>
                        </div>
                        <div className="d-flex mt-3">
                            <div className="col-4 col-md-3 col-xl-2 border-yellow first-mat-box">
                                <div className="pt-3 yello-bg w-100 pb-3 ">
                                    <h6 className="m-auto d-table tc-text bg-white h-30">0000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text bg-white h-15">00000000000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text bg-white h-15">00000000000</h6>
                                </div>
                            </div>
                            <div className="col-4 col-md-3 col-xl-2 border-top border-bottom border-end border-top-yellow border-bottom-yellow">
                                <div className="pt-3 bg-white w-100 pb-3 ">
                                    <h6 className="m-auto d-table tc-text bg-grey h-30">0000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                </div>
                            </div>
                            <div className="col-4 col-md-3 col-xl-2 border-top border-bottom border-end border-top-yellow border-bottom-yellow">
                                <div className="pt-3 bg-white w-100 pb-3 ">
                                    <h6 className="m-auto d-table tc-text bg-grey h-30">0000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                </div>
                            </div>
                            <div className="col-4 col-md-3 col-xl-2 border-top border-bottom border-end border-top-yellow border-bottom-yellow">
                                <div className="pt-3 bg-white w-100 pb-3 ">
                                    <h6 className="m-auto d-table tc-text bg-grey h-30">0000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                </div>
                            </div>
                            <div className="col-4 col-md-3 col-xl-2 border-top border-bottom border-end border-top-yellow border-bottom-yellow">
                                <div className="pt-3 bg-white w-100 pb-3 ">
                                    <h6 className="m-auto d-table tc-text bg-grey h-30">0000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                </div>
                            </div>
                            <div className="col-4 col-md-3 col-xl-2 d-none d-xl-inline border-top border-bottom border-end border-top-yellow border-bottom-yellow border-right-yellow last-mat-box">
                                <div className="pt-3 bg-white w-100 pb-3 ">
                                    <h6 className="m-auto d-table tc-text bg-grey h-30">0000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                    <hr className="hr-line mb-1" />
                                    <h6 className="m-auto d-table tc-text splash-bg-grey h-20">00000000000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-3 mt-4">
                            <div className="w-100 splash-bg-grey h-10"></div>
                            <div className="w-75 splash-bg-grey h-10 mt-2"></div>
                        </div>
                        <div className="bg-white w-100 mt-4 mb-4 p-3">
                            <div className="row m-0">
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <h6 className="mb-0 tc-text splash-bg-grey h-15 w-50">000000000</h6>
                                            </div>
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
                                        <h6 className="mb-0 text-end">
                                            <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end">
                                            <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end w-75 float-end">
                                            <span className="tc-text splash-bg-grey h-40 d-inline-block w-100"></span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">000000000000000</h6>
                                <div className="d-flex">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table ms-2 me-2">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-100 mt-4 mb-4 p-3">
                            <div className="row m-0">
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <h6 className="mb-0 tc-text splash-bg-grey h-15 w-50">000000000</h6>
                                            </div>
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
                                        <h6 className="mb-0 text-end">
                                            <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end">
                                            <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end w-75 float-end">
                                            <span className="tc-text splash-bg-grey h-40 d-inline-block w-100"></span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">000000000000000</h6>
                                <div className="d-flex">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table ms-2 me-2">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-100 mt-4 mb-4 p-3">
                            <div className="row m-0">
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <h6 className="mb-0 tc-text splash-bg-grey h-15 w-50">000000000</h6>
                                            </div>
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
                                        <h6 className="mb-0 text-end">
                                            <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end">
                                            <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end w-75 float-end">
                                            <span className="tc-text splash-bg-grey h-40 d-inline-block w-100"></span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">000000000000000</h6>
                                <div className="d-flex">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table ms-2 me-2">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-100 mt-4 mb-4 p-3">
                            <div className="row m-0">
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <h6 className="mb-0 tc-text splash-bg-grey h-15 w-50">000000000</h6>
                                            </div>
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
                                        <h6 className="mb-0 text-end">
                                            <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end">
                                            <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end w-75 float-end">
                                            <span className="tc-text splash-bg-grey h-40 d-inline-block w-100"></span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">000000000000000</h6>
                                <div className="d-flex">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table ms-2 me-2">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-100 mt-4 mb-4 p-3">
                            <div className="row m-0">
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <h6 className="mb-0 tc-text splash-bg-grey h-15 w-50">000000000</h6>
                                            </div>
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
                                        <h6 className="mb-0 text-end">
                                            <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end">
                                            <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end w-75 float-end">
                                            <span className="tc-text splash-bg-grey h-40 d-inline-block w-100"></span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">000000000000000</h6>
                                <div className="d-flex">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table ms-2 me-2">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-100 mt-4 mb-4 p-3">
                            <div className="row m-0">
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <h6 className="mb-0 tc-text splash-bg-grey h-15 w-50">000000000</h6>
                                            </div>
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
                                        <h6 className="mb-0 text-end">
                                            <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end">
                                            <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end w-75 float-end">
                                            <span className="tc-text splash-bg-grey h-40 d-inline-block w-100"></span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">000000000000000</h6>
                                <div className="d-flex">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table ms-2 me-2">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-100 mt-4 mb-4 p-3">
                            <div className="row m-0">
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <h6 className="mb-0 tc-text splash-bg-grey h-15 w-50">000000000</h6>
                                            </div>
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
                                        <h6 className="mb-0 text-end">
                                            <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end">
                                            <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end w-75 float-end">
                                            <span className="tc-text splash-bg-grey h-40 d-inline-block w-100"></span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">000000000000000</h6>
                                <div className="d-flex">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table ms-2 me-2">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-100 mt-4 mb-4 p-3">
                            <div className="row m-0">
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <h6 className="mb-0 tc-text splash-bg-grey h-15 w-50">000000000</h6>
                                            </div>
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
                                        <h6 className="mb-0 text-end">
                                            <span className="tc-text splash-bg-grey h-20 d-inline-block">00000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end">
                                            <span className="tc-text splash-bg-grey h-10 d-inline-block">000000</span>
                                        </h6>
                                        <h6 className="mb-0 mt-2 text-end w-75 float-end">
                                            <span className="tc-text splash-bg-grey h-40 d-inline-block w-100"></span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex border-top mt-2 pt-2 justify-content-between">
                                <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">000000000000000</h6>
                                <div className="d-flex">
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table ms-2 me-2">0000</h6>
                                    <h6 className="mb-0 tc-text splash-bg-grey h-30 mt-2 d-table">0000</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
        
    </div>
)
}