"use client"

import Image from "next/image"
import Header from "../components/header"
import InnterFooter from "../components/inner-footer"
import { trvLoader } from "../helpers/imageKitLoader"

export default function PaymentProcess() {


    return (
        <>
            <Header></Header>
            
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-9">
                        <div className="border rounded-2 p-2">
                            <div className="row align-items-center">
                                <div className="col-12 col-md-7">
                                    <div className="bg-grey rounded-pill border py-2 px-4 w-auto d-inline-block">
                                        <p className="mb-0 fs-12 color-black fw-bold">08:13 left to complete booking</p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-5 text-end">
                                    <div className="fw-bold fs-16">
                                        <span className="pe-2 opacity-50">Total Fare:</span>
                                        <span>₹ 4955</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row border m-0 my-3">
                            <div className="col-12 col-md-4 col-lg-3 p-md-0">
                                <div className="PaymentMethorMenu bg-grey h-100">
                                    <ul className="nav nav-pills d-md-block" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="debit-credit-card-tab" data-bs-toggle="pill" data-bs-target="#debit-credit-card" type="button" role="tab" aria-controls="debit-credit-card" aria-selected="true">Debit/ Credit Card</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="netbanking-tab" data-bs-toggle="pill" data-bs-target="#netbanking" type="button" role="tab" aria-controls="netbanking" aria-selected="false">Netbanking</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="wallets-tab" data-bs-toggle="pill" data-bs-target="#wallets" type="button" role="tab" aria-controls="wallets" aria-selected="false">Wallets</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="UPI-tab" data-bs-toggle="pill" data-bs-target="#UPI" type="button" role="tab" aria-controls="UPI" aria-selected="false">UPI</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="google-pay-tab" data-bs-toggle="pill" data-bs-target="#google-pay" type="button" role="tab" aria-controls="google-pay" aria-selected="false">GooglePay</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-9 p-md-0">
                                <div className="PaymentMethorDetails">
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="debit-credit-card" role="tabpanel" aria-labelledby="debit-credit-card-tab">
                                            <div className="p-3">
                                                <div className="fw-bold fs-18 border-bottom pb-3 mb-2">Debit/ Credit Card</div>
                                                <div className="CardDetailForm checkout-step-main-box">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="input-group my-2">
                                                                <label className="form-label">Card number<span>*</span></label>
                                                                <div className="position-relative w-100">
                                                                    <input className="p-3 form-control float-start w-100" placeholder="1234 1234 **** **** ****" maxlength="16" type="text" />
                                                                    <Image
                                                                        className="h-auto position-absolute end-0 m-auto top-0 bottom-0 me-3"
                                                                        loader={trvLoader}
                                                                        src="payment-card/visa.webp"
                                                                        alt="green-tick-icon"
                                                                        width={40}
                                                                        height={43}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-md-4 col-lg-6">
                                                            <div className="input-group my-2">
                                                                <label className="form-label">Card Holder's Name<span>*</span></label>
                                                                <div className="position-relative w-100">
                                                                    <input className="p-3 form-control float-start w-100" placeholder="John Doe" maxlength="16" type="text" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 col-md-4 col-lg-3">
                                                            <div className="input-group my-2">
                                                                <label className="form-label">Expiration<span>*</span></label>
                                                                <div className="position-relative w-100">
                                                                    <input className="p-3 form-control float-start w-100" placeholder="MM/YY" maxlength="16" type="text" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 col-md-4 col-lg-3">
                                                            <div className="input-group my-2">
                                                                <label className="form-label">CVV<span>*</span></label>
                                                                <div className="position-relative w-100">
                                                                    <input className="p-3 form-control float-start w-100" placeholder="***" maxlength="16" type="text" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 my-2">
                                                            <div>
                                                                <div className="fs-12 color-black fw-bold"><span className="color-orange">We use 128-bit</span> secure encryption providing you a SAFE Payment environment</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 my-2 text-end">
                                                            <div className="d-flex align-items-center justify-content-end">
                                                                <div className="me-3">
                                                                    <div className="color-orange fw-bold">₹ 4955</div>
                                                                </div>
                                                                <div className="">
                                                                    <button className="buttonStyle3 fs-12 border-0">Make Payment</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="netbanking" role="tabpanel" aria-labelledby="netbanking-tab">Netbanking</div>
                                        <div className="tab-pane fade" id="wallets" role="tabpanel" aria-labelledby="wallets-tab">Wallets</div>
                                        <div className="tab-pane fade" id="UPI" role="tabpanel" aria-labelledby="UPI-tab">UPI</div>
                                        <div className="tab-pane fade" id="google-pay" role="tabpanel" aria-labelledby="google-pay-tab">GooglePay</div>
                                    </div>
                                    <div className="border-top text-center py-2 mt-5">
                                        <Image
                                            className="w-auto"
                                            loader={trvLoader}
                                            src="partner-logo/IATA.png"
                                            alt="green-tick-icon"
                                            width={40}
                                            height={25}
                                        />
                                        <Image
                                            className="w-auto mx-4"
                                            loader={trvLoader}
                                            src="icon/google-review.png"
                                            alt="green-tick-icon"
                                            width={40}
                                            height={25}
                                        />
                                        <Image
                                            className="w-auto"
                                            loader={trvLoader}
                                            src="icon/secure-ssl-logo.png"
                                            alt="green-tick-icon"
                                            width={40}
                                            height={25}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3">Side Bar</div>
                </div>
            </div>
            <InnterFooter></InnterFooter>
        </>
    )
}

