"use client"

import Header from "@/app/components/header";
import SearchSection from "@/app/components/search-section";
import Footer from "@/app/components/footer";
import SubscribeNewsletter from "@/app/components/subscribe-newsletter";
import { useEffect, useState } from "react";
import Head from "next/head";
import { getFormattedDate8, getLastDateOfCurrentMonth } from "@/app/helpers/common";



export default function LetsFlyCoupoleOffer() {

    const [noOfPassengers, setNoOfPassengers] = useState({ adults: 0, children: 0, infants: 0, cabin: '' });
    const couponDate = getLastDateOfCurrentMonth();


    useEffect(() => {

    }, [noOfPassengers])


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:url" content="https://www.faremaze.com" />
                <meta property="og:title" content="Couple Flight Booking Offers | Cheap Couple Tickets - Travanya" />
                <meta property="og:description" content="Get the best deals on couple flight bookings with Travanya. Enjoy affordable couple flight tickets for your romantic getaway! Book now to enjoy huge savings." />
                <meta property="og:image" content="https://assets.faremaze.com/faremaze-200x200.jpg" />
                <title>Couple Flight Booking Offers | Cheap Couple Tickets - Travanya</title>
                <meta name="description" content="Get the best deals on couple flight bookings with Travanya. Enjoy affordable couple flight tickets for your romantic getaway! Book now to enjoy huge savings." />
            </Head>
            <Header></Header>
            <SearchSection setNoOfPassengers={setNoOfPassengers} selectedTab={0}></SearchSection>
            <section>
                <div className="container">
                    <div className="row py-4">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Couple Booking Offers</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1 className="color-blue mb-0 fw-bold fs-24">Enjoy Exclusive Offers On Couples Flight Tickets With Travanya</h1>
                        </div>
                        <div className="col-12 py-3">
                            <table cellPadding={15} className="table table-bordered shadow">
                                <thead>
                                    <tr>
                                        <th className="bg-light-blue">Coupon Code</th>
                                        <th className="bg-light-blue">Valid Upto</th>
                                        <th className="bg-light-blue">Saving</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>COUPLESFLY</td>
                                        <td>{getFormattedDate8(couponDate)}</td>
                                        <td>Get ₹1000 Off on Round Trip Couple Flight Tickets.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1 className="color-blue mb-0 fw-bold fs-24">Terms and Conditions</h1>
                        </div>
                        <div className="col-12 py-3">
                            <ul className="fs-14 list-style-none color-black">
                                <li className="py-3">To receive discounts, customers must book flight tickets for two individuals (either domestic or international) to their desired destination using the coupon code: COUPLESFLY.</li>
                                <li className="py-3 border-top">This offer remains valid until the end of this month.</li>
                                <li className="py-3 border-top">The offer applies to bookings for flight tickets for couples.</li>
                                <li className="py-3 border-top">The offer is applicable for bookings made through Travanya's website and mobile site.</li>
                                <li className="py-3 border-top">In this promotion, customers are eligible for a flight discount of up to ₹1000 on round-trip couple flight tickets.</li>
                                <li className="py-3 border-top">This offer is applicable solely to bookings of flight tickets for 2 couple passengers.</li>
                                <li className="py-3 border-top">A convenience fee will be applied depending on its relevance.</li>
                                <li className="py-3 border-top">This offer cannot be merged with any other promotions.</li>
                                <li className="py-3 border-top">This offer is exclusively applicable to bookings made with valid promo codes.</li>
                                <li className="py-3 border-top">This offer cannot be utilised in combination with any other ongoing promotions on Travanya.</li>
                                <li className="py-3 border-top">To avail of this offer, customers must complete their booking using a registered email address.</li>
                                <li className="py-3 border-top">If there is a partial or full cancellation, the offer will be invalidated, and the discount will be reversed prior to any refund processing.</li>
                                <li className="py-3 border-top">Discounts for children/infants, changes to flight or travel dates, refund fees, weekend surcharges, blackout periods, travel restrictions, and/or flight restrictions will also be subject to the fare rules.</li>
                                <li className="py-3 border-top">Flight and date modifications are permitted, however, they are subject to change fees and fare adjustments.</li>
                                <li className="py-3 border-top">Name alterations are allowed.</li>
                                <li className="py-3 border-top">Travanya reserves the right to refuse the offer to customers in case of any detected misuse or abuse.</li>
                                <li className="py-3 border-top">Moreover, Travanya's standard booking and privacy policy, available at www.travanya.ae, will apply.</li>
                                <li className="py-3 border-top">In the event of any dispute, jurisdiction shall be vested in the courts of New Delhi.</li>
                                <li className="py-3 border-top">Travanya reserves the right to amend, adjust, or modify these terms and conditions at any time without prior notice and without assuming any liability. This includes the right to substitute this offer, either wholly or partly, with another offer – whether similar or not – or to prolong or withdraw it entirely, without offering any explanation.</li>
                                <li className="py-3 border-top">Travanya shall not be responsible for any loss or damage arising from force majeure.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <SubscribeNewsletter></SubscribeNewsletter>
            <Footer></Footer>

        </>
    )
}

