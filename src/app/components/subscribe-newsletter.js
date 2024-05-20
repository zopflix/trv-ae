import { useState } from "react"
import { subscribeUser } from "../services/bookingService";
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";

export default function SubscribeNewsletter() {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [subscription, setSubscription] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(true);


    const submitSubscription = () => {
        // setIsSubmitted(true);

        //Validations
        if (!isValidEmail || !isTermsAccepted || email.length == 0) {
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            subscribeUser(email).then((res) => {
                if (res) {
                    setSubscription(true);
                }
                setIsLoading(false);
            });
        }, 1000);
    };

    return (
        <>
            <section>
                <Image
                    className="w-100 h-auto d-none d-md-block"
                    loader={trvLoader}
                    src="newsletter-top-img.webp"
                    alt="newsletter top img"
                    width={7}
                    height={45}
                />
                <Image
                    className="w-100 h-auto d-md-none"
                    loader={trvLoader}
                    src="mobile-top-wave.webp"
                    alt="newsletter top img"
                    width={7}
                    height={45}
                />
                <div className="bg-blue py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-5 col-lg-4">
                                <Image
                                    className="w-100 h-auto"
                                    loader={trvLoader}
                                    src="newsletter-left-img.webp"
                                    alt="newsletter left img"
                                    width={7}
                                    height={45}
                                />
                            </div>
                            <div className="col-12 col-md-7 col-lg-4">
                                <div className="SubscribeNewsForm py-3 position-relative">
                                    <Image
                                        className="position-absolute  h-auto airImG d-none d-lg-block"
                                        loader={trvLoader}
                                        src="newsletter-air-img.webp"
                                        alt="newsletter air img"
                                        width={150}
                                        height={45}
                                    />
                                    <h2 className="color-white text-center mb-3 fw-bold">Sign up to our monthly newsletter</h2>
                                    <p className="color-white text-center fs-14">Save up to 50% on tours! Get exclusive access to members only deals by email.</p>
                                    <form>
                                        <div className="input-group mb-3">
                                            {/* <span className="input-group-text" id="basic-addon1">
                                                <i className="fa-regular fa-envelope"></i>
                                            </span> */}
                                            <input type="email" className="form-control py-3 fs-12" id="email" placeholder="Enter email" name="email" required
                                                onChange={(e) => {
                                                    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                    if (
                                                        e.target.value.match(validRegex) &&
                                                        e.target.value.match(validRegex).length > 0
                                                    ) {
                                                        setIsValidEmail(true);
                                                        setSubscription(false);
                                                    } else {
                                                        setIsValidEmail(null);
                                                    }
                                                    setEmail(e.target.value);
                                                }}
                                                onBlur={(e) => {
                                                    if (e.target.value.length > 0) {
                                                        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                        setIsValidEmail(
                                                            (e.target.value.match(validRegex) &&
                                                                e.target.value.match(validRegex).length >
                                                                0) == true
                                                        );
                                                    }
                                                }}
                                                onFocus={(e) => {
                                                    if (e.target.value.length > 0) {
                                                        setIsValidEmail(null);
                                                    }
                                                }}
                                                value={email}
                                            />
                                        </div>
                                        {/* <div className="form-check mb-3">
                                            <input className="form-check-input" type="checkbox" id="receiveMail" checked readOnly />
                                            <label className="form-check-label color-white fs-12" htmlFor="receiveMail">I would like to receive email from travanya.ae with the latest offers and promotions. See our <a className="color-white text-decoration-underline fw-bold" href="/privacy-policy" target="_blank">Privacy Policy</a>.</label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={isTermsAccepted} readOnly id="flexCheckChecked" onChange={() => setIsTermsAccepted(!isTermsAccepted)} />
                                            <label className="form-check-label color-white fs-12" htmlFor="flexCheckChecked">I have read and agree to the <a className="color-white text-decoration-underline fw-bold" href="/terms-conditions" target="_blank">Terms and Conditions</a>.</label>
                                        </div> */}

                                        <button type="button" disabled={subscription} className={subscription ? "btn align-items-center color-white w-100 py-3 rounded-3 mt-3 fw-bold d-flex align-items-center justify-content-center" : "btn align-items-center color-white w-100 py-3 rounded-3 mt-3 fw-bold d-flex align-items-center justify-content-center"} onClick={() => { subscription ? null : submitSubscription(); }}>
                                            {isLoading && (
                                                <div className="d-flex justify-content-center me-2">
                                                    <div className="spinner-border" role="status"></div>
                                                </div>
                                            )}
                                            {subscription ? "Subscribed" : "Subscribe"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-12 col-md-12 col-lg-4 d-none d-lg-block">
                                <Image
                                    className="w-100 h-auto"
                                    loader={trvLoader}
                                    src="newsletter-right-img.webp"
                                    alt="newsletter right img"
                                    width={7}
                                    height={45}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Image
                    className="w-100 h-auto d-md-none"
                    loader={trvLoader}
                    src="mobile-bottom-wave.webp"
                    alt="newsletter bottom img"
                    width={7}
                    height={45}
                />
                <Image
                    className="w-100 h-auto d-none d-md-block"
                    loader={trvLoader}
                    src="newsletter-bottom-img.webp"
                    alt="newsletter bottom img"
                    width={7}
                    height={45}
                />
            </section>
        </>
    )
}