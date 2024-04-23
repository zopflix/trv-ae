"use client"
import Layout from '../components/_layout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { processDummyTicket } from '../services/bookingService'
import { Modal } from 'react-bootstrap';
import InnterFooter from '../components/inner-footer'
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';

export default function DummyPaymentSuccess() {

    const router = useRouter(null);
    const [txnId, setTransactionId] = useState("");
    const [isPNRGenerated, setIsPNRGenerated] = useState(false);
    const [showContentLoader, setShowContentLoader] = useState(true);

    const downloadPdfFromByteArrayString = (byteArrayString, fileName) => {
        // Convert the base64-encoded string to a Uint8Array
        var byteCharacters = atob(byteArrayString);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);

        // Convert the Uint8Array to a Blob
        var blob = new Blob([byteArray], { type: 'application/pdf' });

        // Create a temporary URL for the Blob
        var url = URL.createObjectURL(blob);

        // Create a link element
        var link = document.createElement('a');

        // Set the href attribute to the temporary URL
        link.href = url;

        // Set the download attribute to specify the file name
        link.download = fileName;

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger a click event on the link to start the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);

        // Revoke the temporary URL to free up resources
        URL.revokeObjectURL(url);
    }

    const getTicket = () => {

        const params = new URLSearchParams(window.location.search);

        if (params) {

            let transactionId = params.get("id");

            setTransactionId(params.get("txnId"))

            setShowContentLoader(true);

            processDummyTicket(transactionId).then((res) => {

                setShowContentLoader(false);

                if (res && res.success && res.ticket) {
                    setIsPNRGenerated(true);
                    downloadPdfFromByteArrayString(res.ticket, "dummy-ticket-" + res.ticketId + ".pdf");
                }

                else {
                    setIsPNRGenerated(false);
                }
            });
        }
    }

    useEffect(() => {

        getTicket();

    }, [])

    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:title" content="Payment Success - Travanya" />
                <meta property="og:description" content="By using our services, you agree to comply with Travanya' Terms & Conditions for a smooth experience. Familiarize yourself with the guidelines here." />
                <title>Payment Success - Travanya</title>
            </Head>

            <div className='height-100-vh'>
                {isPNRGenerated && !showContentLoader &&
                    <section className='pt-5 pb-5'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2'></div>
                                <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8'>
                                    <div className='payment-main-wrp text-center'>
                                        <Image
                                            className="mb-4 h-auto"
                                            loader={trvLoader}
                                            src="icon/payment-sucess-icon.svg"
                                            alt="payment sucess icon"
                                            width={100}
                                            height={43}
                                        />
                                        <h2 className='fw-bold mb-4'>Payment Successful</h2>
                                        <h5 className='mb-3'>Your transaction ID: <span className=''>{txnId}</span></h5>
                                        <p><strong>Caution:</strong> Congratulations! Your payment has been successfully processed. Please wait while we work on generating your air ticket. If your ticket is not available within the next 30 seconds, you can download it using the link below.</p>
                                        <button className='bg-transparent border-0 fw-bold fs-16 text-decoration-underline' onClick={() => getTicket()}>Download Ticket</button>
                                    </div>
                                </div>
                                <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2'></div>
                            </div>
                        </div>
                    </section>

                }

                {!isPNRGenerated && !showContentLoader &&
                    <section className='py-5 '>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2'></div>
                                <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8'>
                                    <div className='payment-main-wrp text-center'>
                                        <Image
                                            className="mb-4 h-auto"
                                            loader={trvLoader}
                                            src="icon/payment-sucess-icon.svg"
                                            alt="payment sucess icon"
                                            width={100}
                                            height={43}
                                        />
                                        <h2 className='fw-bold mb-2'>Payment Successful</h2>
                                        <p className='mb-3'><strong><i>Further Processing in Progress...</i></strong></p>
                                    </div>
                                    <div className='payment-main-wrp'>
                                        <p><strong>Don’t Panic!</strong> Your payment has been successfully processed.
                                            However, we're currently experiencing a technical issue updating the payment status,
                                            but please rest assured; that your purchase is secure.
                                        </p>
                                        <p>
                                            <strong>Your transaction ID:</strong> <span className=''>{txnId}</span>
                                        </p>
                                        <p><strong>Important Note -</strong>The process may take 2 to 3
                                            hours as we actively work to resolve the issue and generate your ticket. We’ll update you accordingly.
                                        </p>
                                        <p>
                                            Thank you for your patience and understanding.
                                        </p>
                                    </div>
                                </div>
                                <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2'></div>
                            </div>
                        </div>
                    </section>
                }
            </div>

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


            <InnterFooter></InnterFooter>
        </Layout>
    )
}

// export async function generateMetadata() {
//     return {
//         title: 'Discover the Essence of NeoFares - About Us | Your Travel Companion',
//         description: 'Uncover the story behind NeoFares, your trusted travel companion. Learn about our mission, values, and commitment to providing seamless travel experiences. Explore the heart of NeoFares and join us on the journey.',
//         keywords: ['About NeoFares', 'Travel Company Story', 'Our Mission and Vision'],
//         openGraph: {
//             title: 'Discover the Essence of NeoFares - About Us | Your Travel Companion',
//             description: "Uncover the story behind NeoFares, your trusted travel companion. Learn about our mission, values, and commitment to providing seamless travel experiences. Explore the heart of NeoFares and join us on the journey.",
//             url: 'https://www.neofares.com/about-us',
//         },
//     }
// }
