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
                                    <strong className="color-orange">Welcome to Travanya - Curating Timeless Travel Memories!</strong>
                                </h2>
                            </div>
                            <p className="text-center text-md-start">Enjoy a smooth travel with Travanya, where we make your wanderlust dreams come true. Our devoted team excels in smooth flight reservations and customised vacation bundles that fit your budget without sacrificing quality. As your companions in travel, we enable you to design one-of-a-kind adventures. With transparent pricing, stress-free organisation, and a dedication to ensuring your journey shines as the highlight of your narrative, we are all set to plan everything for you from the start. Leave the details to us because your only task is to pack and relish the experience.</p>
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
                            <p className="text-center text-white px-5">At Travanya, we strive to revolutionise the travel experience by curating seamless journeys where every traveller takes centre stage. Our aim is to transform travel into a personalised, effortless adventure, nurturing unforgettable memories and lasting legacies. Transparency, affordability, and empowerment drive our vision for a new era of exploration.</p>
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
                        <div className="col-12 col-md-6 col-lg-4 p-4">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4 className="fw-bold">Expertise</h4>
                                <p className="text-justify fs-14">Our team at Travanya comprises of passionate travel enthusiasts and seasoned experts with vast industry knowledge. We use this expertise to curate personalised itineraries that match your travel preferences.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 p-4">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4 className="fw-bold">Customised Experiences</h4>
                                <p className="text-justify fs-14">Recognising the importance of personalisation, we ensure that your time with us transcends beyond a mere trip - it becomes a personalised experience tailored to your individual interests and preferences. Our goal is to craft memories that deeply resonate with you.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 p-4">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4 className="fw-bold">Global Reach</h4>
                                <p className="text-justify fs-14">Travanya provides access to an extensive network of reliable partners and suppliers across the globe. This global presence guarantees that your travel adventures are not only smooth but also safe, no matter where your journey leads you.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 p-4">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4 className="fw-bold">Customer Focused</h4>
                                <p className="text-justify fs-14">At Travanya, your satisfaction comes first. We are committed to delivering outstanding service and assistance at every stage of your journey. For us, it's not just about arranging a trip; it's about crafting a travel experience that goes above and beyond your expectations.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 p-4">
                            <div className="card shadow trv-why-chose-card rounded-0 border border-0 d-flex justify-content-center p-3">
                                <h4 className="fw-bold">Sustainable Travel With Travanya</h4>
                                <p className="text-justify fs-14">Travanya takes its commitment to environmental stewardship seriously. With our commitment to sustainability, we advocate for eco-conscious travel behaviours and work closely with like-minded partners to minimise our ecological footprint. Opt for Travanya for a journey that honours and safeguards the natural beauty of our planet.</p>
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
                                    Become A Part Of The <strong className="color-orange"> Travanya Family</strong>
                                </h2>
                            </div>
                            <p>Start your travel journey with Travanya, where every expedition offers opportunities for exploration, personal development, and the making of lasting memories. Let us accompany you as your reliable travel partner, guiding you through a myriad of landscapes and cultures worldwide.</p>
                            <div className="col-12 col-lg-12">
                                <em>So, leave the planning to us – it's our expertise. Your journey with Travanya is more than just a journey; it's a tailored experience crafted for you, by us.</em>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer></Footer>
        </Layout>
    )
}