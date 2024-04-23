import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { appBaseURL } from "../config";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";

export default function StripeCheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [showContentLoader, setShowContentLoader] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
      

        setShowErrorModal(false);

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setShowContentLoader(true);

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: appBaseURL + 'ae/thank-you',
            },
        });

        if (result.error) {
            setShowContentLoader(false);
            setShowErrorModal(true);
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            setShowContentLoader(false);
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <>
            <form className="PymentForm" onSubmit={handleSubmit}>
                <AddressElement options={{ mode: 'shipping' }} />
                <PaymentElement />
                <button disabled={!stripe}>Submit</button>
            </form>

            <Modal className='centred-modal' show={showContentLoader} >
                <Modal.Body >
                    <div className="filter-loader-mid-icon">
                        <Image
                            className="h-auto w-100"
                            loader={trvLoader}
                            src="icon/GIF-FM.gif"
                            alt="GIF-FM"
                            width={176}
                            height={43}
                        />
                    </div>
                </Modal.Body>
            </Modal>

            <Modal className='centred-modal' show={showErrorModal} onHide={() => setShowErrorModal(false)} >
                <Modal.Body >
                    <div className="pe-4">
                        <Image
                            className="position-absolute cursor-pointer end-0 me-2 h-auto mb-4 payment-success-img"
                            loader={trvLoader}
                            src="icon/payment-failed-icon.svg"
                            alt="close icon"
                            width={18}
                            height={30}
                            onClick={() => setShowErrorModal(false)}
                        />
                        <div className="fw-bold fs-22  color-red text-center">Payment Failed</div>
                        <div className="fw-bold fs-14 text-center">Please review all the details and try again!</div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}