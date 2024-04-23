"use client"
import Image from "next/image";
import Footer from "../components/footer";
import Header from "../components/header";
import { trvLoader } from "../helpers/imageKitLoader";

export default function Disclaimer() {
    return (
        <>
            <Header></Header>
            <section className="BlogBanner py-2">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="mb-0 fw-bold color-white text-center">Disclaimer</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container py-1">

                    <div className="row py-2 py-md-5 d-flex flex-column flex-md-row align-items-center">
                        <div className="col-12 col-md-3 ">
                            <Image
                                className="mb-4 h-auto w-100 shadow"
                                loader={trvLoader}
                                src="/disclaimer-img.avif"
                                alt="disclaimer icon"
                                width={100}
                                height={43}
                            />
                        </div>
                        <div className="col-12 col-md-9 py-3 py-md-0">
                            <div className="row subHeading">
                                <h2 className="mb-0 fw-normal mb-2"><strong className="color-orange">Disclaimers </strong></h2>
                            </div>
                            <p className="text-center text-md-start">While Travanya strives hard to keep the information on this website up to date and correct, there may be cases (however unlikely) when the information on the website errs. Hence, Travanya makes no guarantees, express or implied, about the accuracy, reliability, suitability or availability of the information in the form of services, information, or related graphics that appear on the website.</p>
                            <p className="text-center text-md-start">We shall not be liable for any damages arising out of or in response to a client’s reliability of the information provided on the website. We shall also not be liable for the website being temporarily unavailable due to technical issues even though every measure is taken to keep the website healthy.</p>
                            <p className="text-center text-md-start">From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone ‘bad’.</p>
                            <p className="text-center text-md-start">Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their “Terms of Service” before engaging in any business or uploading any information.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container-fluid shadow mb-5">
                    <div className="row d-flex align-items-center">
                        <div className="col-12 col-md-6 py-5 px-5 d-flex flex-column align-items-md-end">
                            <h2 className="fw-bolder">Consent</h2>
                            <p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>
                        </div>
                        <div className="col-12 col-md-6 py-5 px-5 bg-dark">
                            <h2 className="fw-bolder text-white">Update</h2>
                            <p className="text-white">Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </>

    )
}
