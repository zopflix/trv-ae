"use client"
import Footer from "../components/footer";
import Layout from "../components/inner-layout";

export default function ContactUs() {
    return (
        <Layout>
            <section>
                <div className="copntainer-fluid">
                    {/* <iframe className="w-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5107.344886393982!2d55.29928764016693!3d25.15467750781785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f688c5516ea0f%3A0x44800f32689f57e2!2sThe%20Meydan%20Hotel!5e0!3m2!1sen!2sin!4v1702633060106!5m2!1sen!2sin" height={400} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                    <iframe className="w-100" height={400} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13718.87141043773!2d76.841758!3d30.7263314!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x66a7464b55ea918d!2sTravanya.com!5e0!3m2!1sen!2sin!4v1635144853474!5m2!1sen!2sin"></iframe>
                </div>
            </section>

            <section>
                <div className="container py-5">
                    <div className="row py-5 d-flex flex-column flex-md-row align-items-center">
                        <div className="col-12 col-md-7  py-3 py-md-0">
                            <div className="row subHeading">
                                <h2 className="mb-0 fw-normal mb-2">
                                    <strong className="color-orange">Contact Us</strong>

                                </h2>
                            </div>
                            <p className="text-center text-md-start">Looking to book flight tickets and holiday packages at budget-friendly prices? Connect with Travanya today for unbeatable holiday packages. We're here 24/7 to assist you with the best deals on airfares, hotels, packages, activities, and transportation. Use our live chat for quick responses and personalised guidance. Customise your tour packages with us – your journey, your way. So, why wait? Share your travel plans now with our experts.</p>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="row subHeading">
                                <h2 className="mb-0 fw-normal mb-2">
                                    <strong className="color-orange">Our Office</strong>
                                </h2>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-6">

                                    <p>
                                        <strong>Address</strong>
                                        <br />Plot 16 HSIIDC IT Park, Sector 22, Panchkula, Haryana 134109, India
                                    </p>
                                </div>
                                <div className="col-12 col-md-6">
                                    <p>
                                        <strong>Email Address :</strong> info@travanya.com
                                    </p>
                                    <p>
                                        <strong>Contact N0 :</strong>  +91-800-023-5865
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr />
            </section>

            <Footer></Footer>
        </Layout>
    )
}