"use client"
import Layout from '../components/_layout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import InnterFooter from '../components/inner-footer'
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';

export default function DummyPaymentFailed() {

    const router = useRouter(null);
    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {

        if (!!window.location.search) {

            let params = new URLSearchParams(window.location.search);

            setTransactionId(params.get("txnId"))
        }

    }, [])

    const redirectToPendingPage = () => {
        router.push(`/dummy-flight-ticket`);
    }


    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:title" content="Payment Failed - Travanya" />
                <meta property="og:description" content="By using our services, you agree to comply with Travanya' Terms & Conditions for a smooth experience. Familiarize yourself with the guidelines here." />
                <title>Payment Failed - Travanya</title>
            </Head>


            <section className='pt-5 mt-5'>
                <div className='container mt-5 height-100-vh '>
                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2'></div>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8'>
                            <div className='payment-main-wrp payment-failed text-center'>
                                <Image
                                    className="mb-4 payment-success-img h-auto"
                                    loader={trvLoader}
                                    src="icon/payment-failed-icon.svg"
                                    alt="payment failed img"
                                    width={100}
                                    height={43}
                                />
                                <h2 className='fw-bold mb-4'>Payment Failed</h2>
                                <h5 className='mb-3'>Your transaction ID: <span className=''>{transactionId}</span></h5>
                                <p><strong>Caution:</strong> We regret to inform you that your payment has not been successful,
                                    preventing us from generating your air ticket. Kindly review your payment details and ensure sufficient funds.
                                    If issues persist, contact your bank.</p>
                                <button className='bg-transparent border-0 fw-bold fs-16 text-decoration-underline' onClick={() => redirectToPendingPage()}>Go Back</button>
                            </div>
                        </div>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2'></div>
                    </div>
                </div>
            </section>
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