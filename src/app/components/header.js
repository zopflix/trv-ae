"use client"
import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import MainMenu from "./menu";
import { usePathname } from 'next/navigation';
import SkipNGoToHome from "./_skip_go_home";
import { contactNumber,holidayContactNumber, uaeContact,flightContactNumber } from "../config";

export default function Header() {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openBackModal, setOpenBackModal] = useState(false);
    const [isBackLoading, setIsBackLoading] = useState(false);
    const path = usePathname();
    const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);

    useEffect(() => {
        if (path == "/ae/thank-you/") {
          setDisplayContactNumber(uaeContact);
        }
    
        if ( path.includes("/") || path.includes("/holidays") || path.includes("/international-tour-packages") || path.includes("/india-tour-packages")) {
            setDisplayContactNumber(holidayContactNumber);
        }
        
        if (   path.includes("/results")|| path.includes("flight") || path.includes("/booking-failed") || path.includes("/payment-success") || path.includes("/payment-failed") ) {
            setDisplayContactNumber(flightContactNumber);
        }
        if (  path.includes("/dummy-payment-failed")||  path.includes("/make-payment")|| path.includes("/dummy-flight-ticket") || path.includes("/payment-failed-confirmation")) {
            setDisplayContactNumber(contactNumber);
        }
      }, []);

     
     
   

    return (
        <header className='py-2 bg-white'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2'>
                        <span className='main-logo cursor-pointer'
                            onClick={() => {
                                if (
                                    path == "/listing" ||
                                    path == "/checkout" ||
                                    path == "/purchase" ||
                                    path == "/results" ||
                                    path == "/buy"
                                )
                                    setOpenBackModal(true);
                                else window.open("/", "_self");
                            }}
                        >
                            <Image
                                className="h-auto w-100"
                                loader={trvLoader}
                                src="travanya-logo.webp"
                                alt="Travanya Logo"
                                width={176}
                                height={43}
                                priority
                            />
                        </span>
                    </div>
                    <div className='col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xxl-10'>
                        <div className='d-flex align-items-center justify-content-end'>
                            <div className="d-lg-none me-3">
                                <button className="bg-white border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
                                    <Image
                                        className="h-auto"
                                        loader={trvLoader}
                                        src="icon/menu-icon.svg"
                                        alt="Travanya Logo"
                                        width={18}
                                        height={43}
                                    />
                                </button>

                                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasMenuLabel">
                                            <a href="#" className='main-logo d-inline-block'>
                                                <Image
                                                    className="h-auto w-100"
                                                    loader={trvLoader}
                                                    src="travanya-logo.webp"
                                                    alt="Travanya Logo"
                                                    width={176}
                                                    height={43}
                                                />
                                            </a>
                                        </h5>
                                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body p-0">
                                        <MainMenu></MainMenu>
                                    </div>
                                </div>
                            </div>
                            <div className="d-none d-lg-block me-3">
                                <nav className="navbar navbar-expand-lg py-0">
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <MainMenu></MainMenu>
                                    </div>
                                </nav>
                            </div>
                            <div className='phoneNumber h-auto '>
                                <a className='btn px-0 border-0 d-flex align-itmes-center text-decoration-none' href={'tel:' + displayContactNumber}>
                                    <div>
                                        <Image
                                            className="h-auto"
                                            loader={trvLoader}
                                            src="icon/phone-call-icon.svg"
                                            alt="Phone Icon"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className='d-none d-lg-block'>
                                        <span className='color-blue fs-16 fw-bold ps-2'>{displayContactNumber}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal className="userLoginForms" show={openLoginModal} onHide={() => setOpenLoginModal(false)}>
                <Modal.Body>
                    <button type="button" className="btn-close end-0 float-end position-absolute top-0 right-0 mt-3 me-3" onClick={() => setOpenLoginModal(false)}></button>
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-6 d-none d-lg-inline">
                            <Image
                                className="h-auto w-100 mainLoginPopImg"
                                loader={trvLoader}
                                src="login-popup-img.webp"
                                alt="Login Popup Img"
                                width={176}
                                height={43}
                            />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 p-0">
                            <div className="loginForm">
                                <h2 className="mb-0 fw-bold color-orange mb-2">Plan Your Package With Us!</h2>
                                <form>
                                    <div className="FormGroup mb-2">
                                        <label className="mb-1">Package type</label>
                                        <div className="position-relative">
                                            <div className="icon position-absolute top-50 bottom-50 m-auto">
                                                <Image
                                                    className="h-auto"
                                                    loader={trvLoader}
                                                    src="icon/package-type-icon.svg"
                                                    alt="Package Icon"
                                                    width={25}
                                                    height={25}
                                                />
                                            </div>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Leisure</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="FormGroup mb-2">
                                        <label className="mb-1">Location</label>
                                        <div className="position-relative">
                                            <div className="icon position-absolute top-50 bottom-50 m-auto">
                                                <Image
                                                    className="h-auto"
                                                    loader={trvLoader}
                                                    src="icon/Location-icon.svg"
                                                    alt="locaiton Icon"
                                                    width={25}
                                                    height={25}
                                                />
                                            </div>
                                            <input className="form-control" type="text" placeholder="Couple's Dream Singapore Sojourn" />
                                        </div>
                                    </div>
                                    <div className="FormGroup mb-2">
                                        <label className="mb-1">Travel Date</label>
                                        <div className="position-relative">
                                            <div className="icon position-absolute top-50 bottom-50 m-auto">
                                                <Image
                                                    className="h-auto"
                                                    loader={trvLoader}
                                                    src="icon/date-grey-icon.svg"
                                                    alt="Date Icon"
                                                    width={25}
                                                    height={25}
                                                />
                                            </div>
                                            <input className="form-control" type="text" placeholder="Tentative Travel Date" />
                                        </div>
                                    </div>
                                    <div className="FormGroup mb-2">
                                        <label className="mb-1">Contact No.</label>
                                        <div className="position-relative">
                                            <div className="icon position-absolute top-50 bottom-50 m-auto">
                                                <Image
                                                    className="h-auto"
                                                    loader={trvLoader}
                                                    src="icon/phone-grey-icon.svg"
                                                    alt="Phone Icon"
                                                    width={25}
                                                    height={25}
                                                />
                                            </div>
                                            <input className="form-control" type="text" placeholder="Contact Number" />
                                        </div>
                                    </div>
                                    <div className="FormGroup mb-2">
                                        <label className="mb-1">Email</label>
                                        <div className="position-relative">
                                            <div className="icon position-absolute top-50 bottom-50 m-auto">
                                                <Image
                                                    className="h-auto"
                                                    loader={trvLoader}
                                                    src="icon/email-grey-icon.svg"
                                                    alt="Email Icon"
                                                    width={25}
                                                    height={25}
                                                />
                                            </div>
                                            <input className="form-control" type="text" placeholder="Email Address" />
                                        </div>
                                    </div>
                                    <div className="FormGroup mb-2">
                                        <button className="enquireBtn rounded-3 border-0 color-white w-100 mt-2">Enquire Now</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <SkipNGoToHome goHomeText={"Go To Home"} setOpenBackModal={setOpenBackModal} openBackModal={openBackModal} setIsBackLoading={setIsBackLoading} isBackLoading={isBackLoading}></SkipNGoToHome>

        </header>

    )
}