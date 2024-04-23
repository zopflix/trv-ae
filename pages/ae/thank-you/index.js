"use client"
import Layout from '@/app/components/_layout';
import Head from 'next/head'
import InnerFooter from '@/app/components/inner-footer';
import { useEffect, useState } from 'react';
import { trvLoader } from '@/app/helpers/imageKitLoader';
import Image from 'next/image';
import { contactNumber, uaeContact } from '@/app/config';
// import RootLayout from '@/app/layout';
import { getPaymentDetails } from '@/app/services/bookingService';

export default function ThankYou() {
    const [txnId, setTransactionId] = useState("");
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("payment_intent")) {
            let amount = sessionStorage.getItem('stripeAmount');
            if (amount)
                getPaymentDetails(params.get("payment_intent")).then(res => {
                    if (!!res)
                        setTransactionId(res);
                });
        }
    }, [])

    return (
        // <RootLayout>
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:title" content="Thank You for Your Payment | Travanya" />
                <title>Thank You for Your Payment | Travanya</title>
            </Head>

            <section className='pt-5 pb-2'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-2 col-lg-3'></div>
                        <div className='col-12 col-md-8 col-lg-6 text-center'>
                            <Image
                                className="h-auto MainImgTop"
                                loader={trvLoader}
                                src="thank-you-payment-img.png"
                                alt="thank-you-payment img"
                                width={350}
                                height={50}
                            />
                        </div>
                        <div className='col-12 col-md-2 col-lg-3'></div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='payment-thankyou text-center'>
                                <h2 className='mt-5 mb-4 fw-bold color-blue' >Thank You for Your Payment!</h2>
                                <span className='bg-orange rounded-2 color-white p-3 mb-4 d-inline-block'><strong>Your Payment Reference No: </strong>{txnId}</span>
                                <p className='mt-0 fs-14'>Congratulations! Your payment has been successfully processed.</p>
                                <p className='text-center fs-14'>We're thrilled to have you as our customer.</p>
                                <p>Need Help? Call us anytime at <a className="color-blue fw-bold text-decoration-none" href={`tel:${uaeContact}`}>{uaeContact}</a>. We’re available 24/7.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <InnerFooter />
        </Layout>
        // </RootLayout>
    )
}

export async function getServerSideProps() {
    return { notFound: true}
}

