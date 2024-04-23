"use client"
import Layout from '../components/inner-layout';
import { useEffect, useState } from 'react';
import { generateTicket } from '../services/bookingService'
import { useRouter } from 'next/navigation';
import InnerFooter from '../components/inner-footer';
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image"

export default function Confirmation() {
    const router = useRouter();
    const [isBookingError, setBookingError] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const success = localStorage.getItem("fsuccessPath");
        const pending = localStorage.getItem("fpendingPath");

        if (success?.includes("success") || pending?.includes("pending")) return;

        // Clearing Previous Booking Data
        if (!pending && !success) {
            localStorage.removeItem("booking_data");
            localStorage.removeItem("bookingInformation");
        }

        if (params) {
            const transactionId = params.get("id");
            if (!success && !pending) {
                generateTicket(transactionId).then((res) => {
                    localStorage.setItem("bookingInformation", JSON.stringify(res));
                    if (res && res.bookingId > 0 && !res.isBookingError) {
                        setBookingError(false);
                        router.push("/confirmation/success");
                    }
                    else {
                        router.push("/booking-failed")
                    }
                });
            }

        }
    }, [])

    useEffect(() => {
        const pendings = localStorage.getItem("fpendingPath");
        const success = localStorage.getItem("fsuccessPath");

        // routing back to confirmation page
        if (success?.includes("success") || pendings?.includes("pending")) {
            window.history.go(1)
            window.location.href = "/confirmation/" + (pendings?.includes("pending") ? "pending" : "success")
            return;
        }

    }, [router])

    return (
        <Layout>

            <div className="success-payment-loader-img text-center pt-5 pb-5 bg-grey mb-4">
                <Image
                    className="w-auto h-auto"
                    loader={trvLoader}
                    src="success-payment-loading.gif"
                    alt="Travanya Logo"
                    width={750}
                    height={500}
                />
            </div>


            {/* <div className="flight_search mt sf" >
                <div className="container success-container">
                    <div className="row payment-success">
                        <h2 className="common_txt">Information Processed Sucessfully!!! <br />
                        </h2>
                        <div className="ticket-loading">
                            <p>Holding your booking..... Please wait!!</p>
                            <p>Please do not refresh or press back button!!</p>
                            <span><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
                        </div>
                    </div>
                </div>
            </div> */}


            {/* {isBookingError &&
                <div className={isBookingError ? "modal fade show call_genrate" : "modal fade call_genrate"} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" style={{ display: isBookingError ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={() => redirectToSearch()}>
                                <i className="fas fa-times"></i>
                            </button>
                            {
                                <div className="modal-body">
                                    <div className="row">

                                        <div className="col-md-12 content_side">

                                            <div className="error_content_payment">
                                                <h4>Sorry!.. Something went wrong in booking process!!</h4>

                                                <p>We will call you and process this manually!!</p>
                                            </div>
                                            <div className="contact_number">
                                                <a className="btn_common" href={"tel:" + displayContactNumber}>Call Now <i className="fas fa-phone-alt" ></i> {displayContactNumber}</a>
                                            </div>

                                        </div>

                                    </div></div>
                            }
                        </div>
                    </div>
                </div>
            } */}
            <InnerFooter></InnerFooter>
        </Layout >

    )
}