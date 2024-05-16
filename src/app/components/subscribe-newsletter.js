import { useState } from "react"
import { subscribeUser } from "../services/bookingService";

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
        <section className="py-5">
            <div className="container">
                <div className="SubscribeNewsBox">
                    <div className="row m-0">
                        <div className="col-12 col-sm-12 col-md-6">
                            <div className="SubscribeNewsForm p-4">
                                <h2 className="color-white mb-3 fw-bold fs-22">Subscribe To Our Newsletter</h2>
                                <form>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className="fa-regular fa-envelope"></i>
                                        </span>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" required
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
                                    {/* <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className="fa-regular fa-envelope"></i>
                                        </span>
                                        city select code
                                    </div> */}
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="receiveMail" checked readOnly />
                                        <label className="form-check-label color-white fs-12" htmlFor="receiveMail">I would like to receive email from travanya.ae with the latest offers and promotions. See our <a className="color-white text-decoration-underline fw-bold" href="/privacy-policy" target="_blank">Privacy Policy</a>.</label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={isTermsAccepted} readOnly id="flexCheckChecked" onChange={() => setIsTermsAccepted(!isTermsAccepted)} />
                                        <label className="form-check-label color-white fs-12" htmlFor="flexCheckChecked">I have read and agree to the <a className="color-white text-decoration-underline fw-bold" href="/terms-conditions" target="_blank">Terms and Conditions</a>.</label>
                                    </div>

                                    {/* <button type="button" className="btn align-items-center color-white w-100 py-3 rounded-3 mt-3 fw-bold" onClick={() => submitData()}>Subscribe</button> */}
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
                        <div className="col-12 col-sm-12 col-md-6"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}