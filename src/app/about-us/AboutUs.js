"use client"
import Footer from "../components/footer";
import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";
import Layout from "../components/_layout";
import PartnerLogo from "../components/partner-logo";

export default function AboutUs() {
    return (
        <Layout>

            <section className="BlogBanner py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="mb-0 fw-bold color-white text-center">About Us</h1>
                        </div>
                    </div>
                </div>
            </section>
            <PartnerLogo></PartnerLogo>

            <section>
                <div className="container py-5">
                    <div className="row d-flex flex-column flex-md-row align-items-center">
                        <div className="col-sm-12 col-lg-6 my-2">
                            <Image
                                className=" img-fluid mb-3"
                                loader={trvLoader}
                                src="about-img.webp"
                                alt="Author Img"
                                width={675}
                                height={400}
                            />
                        </div>
                        <div className="col-sm-12 col-lg-6 py-3 py-md-0">
                            <div className="row subHeading">
                                <h2 className="mb-0 fw-normal mb-2 d-flex align-items-center align-items-md-start flex-column">
                                    <strong className="color-orange">Welcome to Travanya</strong>
                                </h2>
                            </div>
                            <p className="text-center text-md-start">Travanya.com has been helping wanderlust souls accomplish their travel dreams since 2010. Over the years, it has successfully carved a niche in the travel industry by providing easy flight bookings, and end-to-end holiday packages. Available 24*7, our diligent travel agents strive hard to cater to the needs of the travellers by offering the most affordable flight tickets.</p>
                            <p className="text-center text-md-start">Our professionals understand the requirements meticulously and aim at providing the best flight and holiday deals. Because we understand that bonds become strong when people travel along, we leave no stone unturned to give an experience that will be cherished for ages at a stretch. Travel memories are the best memories that a person can leave behind as a legacy and we know this to the fullest!</p>
                        </div>
                        <div className="col-12">
                            <p className="text-center text-md-start">A perfect antidote for your travel bug, we are an agency you won’t regret putting your trust into. With us, you can be an equal part in choosing the colours and the thickness of the thread and we’ll make sure we knit it into something you can wear forever. We believe in transparency and fulfillling your travel needs at a cost-effective price without any hidden charges.</p>
                            <p className="text-center text-md-start">We assure you that our easy flight booking process will give you experiences you would want to boast about to everybody around. We are confident about this because we take our mission which is to help travellers quench their thirst for globetrotting at the best prices very seriously. </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container-fluid py-5 vision-block">
                    <div className="row subHeading">
                        <h2 className="mb-0 fw-normal text-center text-white mb-2">Our <strong className="color-orange">Vision</strong></h2>
                    </div>
                    <div className="row">
                        <div className="col-12 offset-md-2 col-md-8">
                            <p className="text-center text-white px-5">At Travanya, we envision redefining travel by crafting seamless journeys where every traveller is the protagonist. Our goal is to make travel a personalized, effortless experience, creating cherished memories and legacies. Transparency, affordability, and empowerment drive our vision for a new era of exploration.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container py-5">
                    <div className="row subHeading">
                        <h2 className="mb-0 fw-normal">Why Choose <strong className="color-orange">Travanya?</strong></h2>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4 p-4 d-flex">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4>Expertise</h4>
                                <p className="text-justify">At Travanya, our team of passionate travel enthusiasts and seasoned experts possesses extensive industry knowledge. We leverage this expertise to curate personalized itineraries that align with your travel desires.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 p-4 d-flex">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4>Tailored Experiences</h4>
                                <p className="text-justify">We understand the significance of personalization. Your journey with us is not just a trip; it's a tailored experience crafted to match your unique interests and preferences. We believe in creating memories that resonate with you.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 p-4 d-flex">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4>Global Reach</h4>
                                <p className="text-justify">Travanya opens the door to a vast network of trusted partners and suppliers worldwide. This global reach ensures that your travel experiences are not only seamless but also secure, wherever your adventure takes you.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 p-4 d-flex">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4>Customer Approach</h4>
                                <p className="text-justify">Your satisfaction is our priority. We are dedicated to providing exceptional service and support throughout every step of your journey. At Travanya, it's not just about booking a trip; it's about creating a travel experience that exceeds your expectations. </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-7 p-4 d-flex">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4>Sustainable Travel With Travanya</h4>
                                <p className="text-justify">At Travanya, we uphold our responsibility to protect the planet. Committed to sustainability, we promote eco-friendly travel practices, collaborating seamlessly with environmentally conscious partners to diminish our ecological impact. Choose Travanya for a journey that respects and preserves the beauty of our world.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-light mb-5   ">
                <div className="container py-5 ">
                    <div className="row py-5">
                        <div className="col-12 col-md-12">
                            <div className="row subHeading">
                                <h2 className="mb-0 fw-normal mb-3">
                                    Become A Part Of The
                                    <strong className="color-orange"> Travanya Family</strong>
                                </h2>
                            </div>
                            <p>Immerse yourself in the Travanya experience, where each adventure is a chance to discover, grow, and create enduring memories. Allow us to be your trusted travel companion, navigating you through diverse landscapes and cultures across the globe.</p>
                            <div className="col-12 col-lg-12">
                                <em>So, leave the planning to us – we do it well. Your journey with Travanya is not just a trip; it's an experience designed for you, by us. </em>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer></Footer>
        </Layout>
    )
}