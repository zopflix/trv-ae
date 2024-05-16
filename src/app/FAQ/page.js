"use client"

import Image from "next/image";
import { airlineLogoLoader, trvLoader } from "../helpers/imageKitLoader";
import Header from "../components/header";
import Footer from "../components/footer";
export default function SiteMap() {
    return (
        <>
            <Header></Header>
            <section className="BlogBanner py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="mb-0 fw-bold color-white text-center">FAQ</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-grey mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="mb-0 fw-bold fs-22 color-blue p-3 rounded-top-2">Frequently Asked Questions</h2>
                        </div>
                    </div>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#Q1" aria-expanded="true" aria-controls="Q1">
                                    <strong>Q:</strong>
                                    <span className="ms-2">What services are offered by Travanya?</span>
                                </button>
                            </h2>
                            <div id="Q1" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">We give complete vacation packages that cover every step of organising, scheduling, and planning the trip. Our team of travel experts leaves no stone unturned to ensure all your demands are met and a hassle-free journey has been organised well in time for you.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q2" aria-expanded="false" aria-controls="Q2">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Is planning my tour with Travanya chaotic?</span>
                                </button>
                            </h2>
                            <div id="Q2" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Using Travanya.com to plan a tour is really simple. To obtain carefully designed trip packages, browse the suggested itineraries provided on the website or give us a call. Tell us about your preferences in case you want it to be customised as per your requirements, and we'll work with you to create it while keeping your needs and budget in mind.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q3" aria-expanded="false" aria-controls="Q3">
                                    <strong>Q:</strong>
                                    <span className="ms-2">What are the steps to book my tour with Travanya?</span>
                                </button>
                            </h2>
                            <div id="Q3" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">The first and the last step to get your tour package is to mail us your requirements or even simpler, call us and tell us about what you want to have a perfect vacation and we assure you, we’ll handle the rest.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q4" aria-expanded="false" aria-controls="Q4">
                                    <strong>Q:</strong>
                                    <span className="ms-2">What all things are included in Travanya’s package?</span>
                                </button>
                            </h2>
                            <div id="Q4" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Depending on the number of people on the itinerary, our package cost typically includes hotel accommodations with breakfast, transportation for all city tours, and excursions by private air-conditioned car, van, or coach; it also may include train fare (if applicable); local guides who speak English or another foreign language when leading city tours; monument admission fees; and our assistance prior to and during the tour. In addition to lunches or dinners and other services, we may also add on-demand certain special activities like an elephant ride, a camel safari, a boat excursion, a wildlife safari etc.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q5" aria-expanded="false" aria-controls="Q5">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Do you have any other options apart from All-Inclusive Package Tours?</span>
                                </button>
                            </h2>
                            <div id="Q5" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Although we advise travellers to purchase all-inclusive package tours, we may also, upon request, eliminate specific services from our offerings, such as sightseeing, transportation, airline or train tickets, etc. for those who, for whatever reason, do not wish to purchase our full range of services.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q6" aria-expanded="false" aria-controls="Q6">
                                    <strong>Q:</strong>
                                    <span className="ms-2">What is your payment procedure?</span>
                                </button>
                            </h2>
                            <div id="Q6" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Once everything gets confirmed, we will require you to make a Booking Confirmation Amount for us to start with the further arrangements. The amount depends upon your services and tour package. The exact amount will be shared with you at the time of reservation. </span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q7" aria-expanded="false" aria-controls="Q7">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Can the confirmation amount be paid via Payment Gateway on the official website of Travanya?</span>
                                </button>
                            </h2>
                            <div id="Q7" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Yes, you can make your bookings via Payment Gateway on Travanya. However, a gateway charge of 1% will be applicable on net banking and credit card payments.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q8" aria-expanded="false" aria-controls="Q8">
                                    <strong>Q:</strong>
                                    <span className="ms-2">What hotel options are included in the package?</span>
                                </button>
                            </h2>
                            <div id="Q8" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">We offer a minimum of three-star Standard Category hotels, as well as four-star or better Superior or Premium hotels and five-star or superior Deluxe hotels. However, deluxe or premium hotels aren't always available at some locations. In these situations, we offer the best hotels that might not fit into either the premium or deluxe category. On request, we can include boutique, heritage, or palace hotels in your package.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q9" aria-expanded="false" aria-controls="Q9">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Can I choose a hotel stay as per my preferences?</span>
                                </button>
                            </h2>
                            <div id="Q9" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">The answer is - Why Not? We will send you a detailed list of all our hotels after the rest of the procedures are completed. You have full liberty to choose what fits you the best! </span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q10" aria-expanded="false" aria-controls="Q10">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Can we make changes to the tour plan after the booking is confirmed?</span>
                                </button>
                            </h2>
                            <div id="Q10" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">There are no restrictions as such to make changes to your package. However, it totally depends upon the situation. We don’t charge any extra amount for changes unless there is a penalty charged by principal suppliers for the same.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q11" aria-expanded="false" aria-controls="Q11">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Who will escort me from the foreign airport?</span>
                                </button>
                            </h2>
                            <div id="Q11" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Our representative at the airport will be there to greet you in the foreign land. He/She will be holding a placard of your name for easy identification.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </>
    );
}
