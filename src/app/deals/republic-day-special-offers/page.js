"use client"



import Header from "@/app/components/header";
import SearchSection from "@/app/components/search-section";
import Footer from "@/app/components/footer";
import SubscribeNewsletter from "@/app/components/subscribe-newsletter";
import { useEffect, useState } from "react";
import { getFormattedDate8, getLastDateOfCurrentMonth } from "@/app/helpers/common";



export default function Deals() {

    const [noOfPassengers, setNoOfPassengers] = useState({ adults: 0, children: 0, infants: 0, cabin: '' });
    const couponDate = getLastDateOfCurrentMonth();


    useEffect(() => {

    }, [noOfPassengers])


    return (
        <>
            <Header></Header>
            <SearchSection setNoOfPassengers={setNoOfPassengers} selectedTab={0}></SearchSection>
            <section>
                <div className="container">
                    <div className="row py-4">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Republic Day Special Offers</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1 className="color-blue mb-0 fw-bold fs-24">Travanya Republic Day Special Flight Booking Offers</h1>
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
                                        <td>FLYONREPUBLIC</td>
                                        <td>{getFormattedDate8(couponDate)}</td>
                                        <td>Get 10% Off OR upto Rs. 550 off on All Flight booking.</td>
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
                                <li className="py-3">To access discounts, individuals must register or sign up to book flight tickets to their desired destination, utilizing the coupon code: FLYONREPUBLIC.</li>
                                <li className="py-3 border-top">This offer is available till 26th Jan 2024.</li>
                                <li className="py-3 border-top">The offer is applicable to Flights Ticket Bookings.</li>
                                <li className="py-3 border-top">The offer is applicable to bookings made through Travanya’s website, and mobile site.</li>
                                <li className="py-3 border-top">Customers in this promotion are eligible to receive a flight discount of up to Rs. 550.</li>
                                <li className="py-3 border-top">A convenience fee will be applied based on its relevance.</li>
                                <li className="py-3 border-top">The offer cannot be combined with any other promotional offers.</li>
                                <li className="py-3 border-top">Only reservations made with valid promo codes will qualify for this offer.</li>
                                <li className="py-3 border-top">This offer is exclusively available to new customers who make their initial bookings on the platform. If a user has previously made bookings through the website, or mobile site, they will not be eligible for this offer.</li>
                                <li className="py-3 border-top">This offer cannot be combined with any other ongoing promotions on Travanya.</li>
                                <li className="py-3 border-top">To take advantage of this offer, customers must complete their booking using a registered email address.</li>
                                <li className="py-3 border-top">If there is a partial or full cancellation, the offer becomes null and the discount will be reversed before refund processing.</li>
                                <li className="py-3 border-top">Discounts for children/infants, date or flight changes, refund fees, weekend surcharges, blackout periods, travel restrictions, and/or flight restrictions will also be applicable in accordance with the fare rules.</li>
                                <li className="py-3 border-top">Flight and date modifications are permitted, subject to change fees and fare adjustments.</li>
                                <li className="py-3 border-top">Name alterations are not permitted.</li>
                                <li className="py-3 border-top">Travanya reserves the right to refuse the offer to customers in the event of any misuse or abuse.</li>
                                <li className="py-3 border-top">The interpretation of these terms is solely within the authority of Travanya.</li>
                                <li className="py-3 border-top">Furthermore, the standard booking and privacy policy of Travanya at www.travanya.ae will also be applicable.</li>
                                <li className="py-3 border-top">In case of any dispute, the courts in New Delhi will have jurisdiction.</li>
                                <li className="py-3 border-top">Travanya reserves the right, without prior notice and without assuming any liability, to add, alter, modify, change, or vary all of these terms and conditions at any time. This includes the right to replace, wholly or in part, this offer with another offer – whether similar or not – or to extend or withdraw it altogether, without assigning any reason.</li>
                                <li className="py-3 border-top">Travanya will not be held responsible for any loss or damage resulting from force majeure.</li>
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

