"use client"

import Header from "@/app/components/header";
import SearchSection from "@/app/components/search-section";
import Footer from "@/app/components/footer";
import SubscribeNewsletter from "@/app/components/subscribe-newsletter";
import { useEffect, useState } from "react";
import { getFormattedDate8, getLastDateOfCurrentMonth } from "@/app/helpers/common";
import Head from "next/head";



export default function DoublePaxOffer() {

    const [noOfPassengers, setNoOfPassengers] = useState({ adults: 0, children: 0, infants: 0, cabin: '' });
    const couponDate = getLastDateOfCurrentMonth();


    useEffect(() => {

    }, [noOfPassengers])


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:url" content="https://www.faremaze.com" />
                <meta property="og:title" content="Double Pax Flight Booking Offers | Cheap Tickets - Travanya" />
                <meta property="og:description" content="Find exclusive deals on double-passenger flight bookings at Travanya. Enjoy affordable tickets for two! Discover cheap fares & book your dream getaway today." />
                <meta property="og:image" content="https://assets.faremaze.com/faremaze-200x200.jpg" />
                <title>Double Pax Flight Booking Offers | Cheap Tickets - Travanya</title>
                <meta name="description" content="Find exclusive deals on double-passenger flight bookings at Travanya. Enjoy affordable tickets for two! Discover cheap fares & book your dream getaway today." />
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
                                    <li className="breadcrumb-item active" aria-current="page">Fly Double Offers</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1 className="color-blue mb-0 fw-bold fs-24">Get Incredible Discounts On 2 PAX Flight Bookings With Travanya</h1>
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
                                        <td>FLYDOUBLE</td>
                                        <td>{getFormattedDate8(couponDate)}</td>
                                        <td>Get 10% Off or ₹400 Off on One Way & ₹750 Off on Round Trip Two Passengers’ Flight Tickets.</td>
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
                                <li className="py-3">To avail of discounts, customers need to book flight tickets for two individuals (whether domestic or international) to their preferred destination by applying the coupon code: FLYDOUBLE.</li>
                                <li className="py-3 border-top">This offer is valid until the end of this month.</li>
                                <li className="py-3 border-top">The offer is valid for bookings made through Travanya's website and mobile site.</li>
                                <li className="py-3 border-top">In this promotion, customers can enjoy a flight discount of 10% or up to ₹400 on one-way 2-pax flight tickets and ₹750 on round-trip 2-pax flight tickets.</li>
                                <li className="py-3 border-top">This offer is exclusively valid for bookings of flight tickets for two passengers.</li>
                                <li className="py-3 border-top">A convenience fee will be charged based on its applicability/relevancy.</li>
                                <li className="py-3 border-top">This offer cannot be combined with any other promotions.</li>
                                <li className="py-3 border-top">This offer is exclusively valid for bookings made with valid promo codes.</li>
                                <li className="py-3 border-top">This offer cannot be used in combination with any other ongoing promotions on Travanya.</li>
                                <li className="py-3 border-top">To take advantage of this offer, customers need to finalise their booking by using a registered email address.</li>
                                <li className="py-3 border-top">In the event of a partial or full cancellation, the offer will become void, and the discount will be reversed before any refunds are processed.</li>
                                <li className="py-3 border-top">Discounts for children/infants, modifications to flight or travel dates, refund charges, weekend surcharges, blackout periods, travel restrictions, and/or flight restrictions will also adhere to the fare rules.</li>
                                <li className="py-3 border-top">Changes to flights and dates are allowed, but they are subject to change fees and fare adjustments.</li>
                                <li className="py-3 border-top">Name changes/alterations are allowed.</li>
                                <li className="py-3 border-top">Travanya reserves the right to refuse the offer to customers if any misuse or abuse is detected.</li>
                                <li className="py-3 border-top">Additionally, Travanya's standard booking and privacy policy, available at www.travanya.ae, will be enforced.</li>
                                <li className="py-3 border-top">In case of any dispute, jurisdiction will be held by the courts located in New Delhi.</li>
                                <li className="py-3 border-top">Travanya reserves the right to revise, adapt, or modify these terms and conditions at any time without prior notice and without assuming any liability. This includes the right to replace this offer, entirely or partially, with another offer – whether similar or not – or to extend or withdraw it altogether, without providing any explanation.</li>
                                <li className="py-3 border-top">Travanya will not be liable for any loss or damage resulting from force majeure events.</li>
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

