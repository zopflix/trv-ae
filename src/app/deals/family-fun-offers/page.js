"use client"

import Header from "@/app/components/header";
import SearchSection from "@/app/components/search-section";
import Footer from "@/app/components/footer";
import SubscribeNewsletter from "@/app/components/subscribe-newsletter";
import { useEffect, useState } from "react";
import Head from "next/head";
import { getFormattedDate8, getLastDateOfCurrentMonth } from "@/app/helpers/common";



export default function FamilyVacationOffers() {

    const [noOfPassengers, setNoOfPassengers] = useState({ adults: 0, children: 0, infants: 0, cabin: '' });
    const couponDate = getLastDateOfCurrentMonth();


    useEffect(() => {

    }, [noOfPassengers])


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:url" content="https://www.faremaze.com" />
                <meta property="og:title" content="Family Vacation Offers | Enjoy Big Savings - Travanya" />
                <meta property="og:description" content="Enjoy unbeatable family vacation offers & deals with Travanya. Save big on your next getaway! Create lasting memories without breaking the bank. Book now!" />
                <meta property="og:image" content="https://assets.faremaze.com/faremaze-200x200.jpg" />
                <title>Family Vacation Offers | Enjoy Big Savings - Travanya</title>
                <meta name="description" content="Enjoy unbeatable family vacation offers & deals with Travanya. Save big on your next getaway! Create lasting memories without breaking the bank. Book now!" />
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
                                    <li className="breadcrumb-item active" aria-current="page">Family Vacation Offers</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1 className="color-blue mb-0 fw-bold fs-24">Unlock Amazing Family Vacation Offers & Deals With Travanya</h1>
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
                                        <td>FAMILYFUN</td>
                                        <td>{getFormattedDate8(couponDate)}</td>
                                        <td>Get ₹450 Off on One Way & ₹800 on Round Trip Family Flight Tickets.</td>
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
                                <li className="py-3">To avail of discounts, individuals need to register or sign up to book flight tickets for family to their preferred destination, using the coupon code: FAMILYFUN.</li>
                                <li className="py-3 border-top">This offer is valid until the end of this month.</li>
                                <li className="py-3 border-top">The offer pertains to bookings for family flight tickets.</li>
                                <li className="py-3 border-top">The offer applies to bookings conducted via Travanya's website and mobile site.</li>
                                <li className="py-3 border-top">Customers in this promotion can qualify for a flight discount of up to ₹450 for one-way family flight tickets and up to ₹800 for round-trip family flight tickets.</li>
                                <li className="py-3 border-top">This offer is valid only for bookings of flight tickets for more than 2 passengers.</li>
                                <li className="py-3 border-top">A convenience fee will be charged based on its applicability/relevancy.</li>
                                <li className="py-3 border-top">The offer cannot be combined with any other promotions.</li>
                                <li className="py-3 border-top">This offer is only valid for bookings made with valid promo codes.</li>
                                <li className="py-3 border-top">This offer cannot be used in combination with any other ongoing promotions on Travanya.</li>
                                <li className="py-3 border-top">In order to benefit from this offer, customers need to finalise their booking using a registered email address.</li>
                                <li className="py-3 border-top">In case of partial or full cancellation, the offer becomes void, and the discount will be reversed before processing any refunds.</li>
                                <li className="py-3 border-top">Discounts for children/infants, modifications to dates or flights, refund charges, weekend surcharges, blackout periods, travel restrictions, and/or flight restrictions will also apply in accordance with the fare rules.</li>
                                <li className="py-3 border-top">Changes to flights and dates are allowed, but are subject to change fees and fare adjustments.</li>
                                <li className="py-3 border-top">Name changes/alterations are not allowed.</li>
                                <li className="py-3 border-top">Travanya retains the right to decline the offer to customers if there is any misuse or abuse detected.</li>
                                <li className="py-3 border-top">The sole authority to interpret these terms lies with Travanya.</li>
                                <li className="py-3 border-top">Additionally, Travanya's standard booking and privacy policy, available at www.travanya.com, will apply.</li>
                                <li className="py-3 border-top">If any dispute arises, the courts in New Delhi will have jurisdiction.</li>
                                <li className="py-3 border-top">Travanya reserves the right to modify, alter, or change these terms and conditions at any time without prior notice and without assuming any liability. This includes the right to replace this offer, wholly or partially, with another offer - whether similar or not - or to extend or withdraw it altogether, without providing any explanation.</li>
                                <li className="py-3 border-top">Travanya will not be liable for any loss or damage resulting from force majeure.</li>
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

