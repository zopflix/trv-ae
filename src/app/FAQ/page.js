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
                                    <span className="ms-2">What Services Do You Offer?</span>
                                </button>
                            </h2>
                            <div id="Q1" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">We provide end-to-end holiday packages that involve the complete process of planning, booking, and arranging the holiday. Our diligent travel agents strive hard to cater to the needs of the travellers, thereby making their holiday seamless and hassle-free.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q2" aria-expanded="false" aria-controls="Q2">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Do You ONLY Provide All-Inclusive Package Tours?</span>
                                </button>
                            </h2>
                            <div id="Q2" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">While we recommend travellers to get all-inclusive package tours, we can also exclude particular services on-request like sightseeing, transfers, flight/train tickets, etc for those who do not want to buy entire services from us for any reason.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q3" aria-expanded="false" aria-controls="Q3">
                                    <strong>Q:</strong>
                                    <span className="ms-2">How Do I Plan My Tour?</span>
                                </button>
                            </h2>
                            <div id="Q3" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Planning tours with Travanya.com is super easy. Go through the suggested itineraries given on the website or call us to get well-designed tour packages. If you want to customize it, let us know your requirements and we’ll help you design it, keeping your budget and requirements in mind.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q4" aria-expanded="false" aria-controls="Q4">
                                    <strong>Q:</strong>
                                    <span className="ms-2">How Can I Book My Tour With You?</span>
                                </button>
                            </h2>
                            <div id="Q4" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">You simply have to mail us your requirements or give us a call and we’ll assist you in the booking process.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q5" aria-expanded="false" aria-controls="Q5">
                                    <strong>Q:</strong>
                                    <span className="ms-2">What Is Included In Your Package Cost?</span>
                                </button>
                            </h2>
                            <div id="Q5" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Our package cost usually includes hotel accommodations with breakfast, all transfers, city tours and excursions by private air-conditioned car/van/coach depending on the number of people as per the itinerary, train fare (if applicable), local English speaking or other foreign language speaking guides (if available for city tours), entrance fee to monuments, and our assistance on arrival and during the tour. On-demand, we can also include some special activities like elephant ride, camel safari, boat ride, etc; apart from including lunches or dinners and other services.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q6" aria-expanded="false" aria-controls="Q6">
                                    <strong>Q:</strong>
                                    <span className="ms-2">What About The Payment Process?</span>
                                </button>
                            </h2>
                            <div id="Q6" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Once the package is finalized, we would need you to make a Booking Confirmation Amount to go ahead with the arrangements. The amount will depend on the services you may require for the tour. The exact terms will be declared at the time of reservation.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q7" aria-expanded="false" aria-controls="Q7">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Can this Booking Confirmation Amount Be Paid Via Payment Gateway On The website?</span>
                                </button>
                            </h2>
                            <div id="Q7" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Yes, the Booking Confirmation Amount can be paid via payment gateway. While no gateway charges will be applicable on debit card payments, 1% gateway charges will be applied on credit card and net banking payments. We also accept cheques that shall be acknowledged once processed & clear.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q8" aria-expanded="false" aria-controls="Q8">
                                    <strong>Q:</strong>
                                    <span className="ms-2">What If I Have to Make Any Changes in the Tour for Any Reason?</span>
                                </button>
                            </h2>
                            <div id="Q8" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">We shall do our best to make changes as per your request and shall not charge you anything unless there is a penalty charged by principal suppliers for making these changes.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q9" aria-expanded="false" aria-controls="Q9">
                                    <strong>Q:</strong>
                                    <span className="ms-2">What All Hotels Do You Provide?</span>
                                </button>
                            </h2>
                            <div id="Q9" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">We provide minimum Standard Category Hotels i.e. 3-star hotels, Superior or Premium Hotels i.e. 4-star or equivalent, and Deluxe Hotels i.e. 5-star or equivalent. However, at some destinations, deluxe or premium hotels are not there and in such cases, we provide the best available hotels which may not conform to either Premium or Deluxe category. We can also include heritage/palace/boutique hotels in your package on demand.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q10" aria-expanded="false" aria-controls="Q10">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Will I Know Which Hotels I Will Be Staying in Before I Go?</span>
                                </button>
                            </h2>
                            <div id="Q10" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">Absolutely! We shall send you a detailed list of hotels from which you can choose before making a payment.</span>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Q11" aria-expanded="false" aria-controls="Q11">
                                    <strong>Q:</strong>
                                    <span className="ms-2">Who Will I Meet When I Arrive In The Country I Book A Holiday Package To?</span>
                                </button>
                            </h2>
                            <div id="Q11" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>A:</strong>
                                    <span className="ms-2">You will be greeted by our representative at the airport on your arrival. He shall be holding a placard of your name for identification.</span>
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
