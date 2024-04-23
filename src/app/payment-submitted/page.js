"use client"
import Layout from '../components/_layout'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import InnerFooter from '../components/inner-footer';
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';

export default function PaymentSubmitted() {
    const [bookingId, setBookingID] = useState('')
    useEffect(() => {
        if (typeof window !== 'undefined') {
            var dd = new URLSearchParams(window.location.search)
            const id = dd.get("id")
            setBookingID(id)
        }
    }, []);


    return (
        <>
            <Layout>

                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                    <meta property="og:url" content="https://www.faremaze.com" />
                    <meta property="og:title" content="Payment Submitted - Secure Flight Booking | Faremaze" />
                    <meta property="og:description" content="Your payment has been successfully submitted. Thank you for booking with us. Faremaze confirms smooth transactions. Get ready for takeoff with confidence." />
                    <meta property="og:image" content="https://assets.faremaze.com/faremaze-200x200.jpg" />
                    <title>Payment Submitted - Secure Flight Booking | Faremaze</title>
                    <meta name="description" content="Your payment has been successfully submitted. Thank you for booking with us. Faremaze confirms smooth transactions. Get ready for takeoff with confidence." />
                </Head>

                <section className='pt-5 mt-5 pb-2'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='payment-thankyou text-center'>
                                    <Image
                                        className="h-auto w-100 MainImgTop"
                                        loader={trvLoader}
                                        src="already-submitted-img.svg"
                                        alt="already-submitted img"
                                        width={183}
                                        height={50}
                                    />
                                    <h2 className='mt-5'>Payment for this booking has already been submitted!</h2>
                                    <p className='mt-4'>Kindly review the transaction on your end. If you haven't received your tickets yet, please be patient. We'll share the same with you shortly. For any further queries or assistance, feel free to contact our travel agents at <a href="tel:+91-800 023 5865">+91-8000235865</a> or drop us an email at <a href="mailto:support@travanya.com">support@travanya.com</a>.</p>
                                    <p className='text-center fw-bold'>Thank you for choosing Travanya.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <hr />
                <InnerFooter />
            </Layout>
        </>
    )
}

