"use client"
import Layout from '../components/_layout'
import Head from 'next/head'

import InnerFooter from '../components/inner-footer'
import { useEffect, useState } from 'react';
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';
import { getFormattedDate, getFormattedDate3, getFormattedDateTime, getFormattedTime } from '../helpers/common';

export default function ThankYou() {
    const [params, setParams] = useState(null);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params) {
            setParams(params)

        }
    }, [])

    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:title" content="" />
                <meta property="og:description" content="" />
                <title>Thank You For Your Payment | Booking Confirmed | Travanya</title>
            </Head>

            <section className='pt-3 pb-2'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-3 col-lg-4'></div>
                        {/* <div className='col-12 col-md-6 col-lg-4'>
                            <Image
                                className="h-auto w-100 MainImgTop"
                                loader={trvLoader}
                                src="thank-you-payment-img.png"
                                alt="thank-you-payment img"
                                width={183}
                                height={50}
                            />
                        </div> */}
                        <div className='col-12 col-md-3 col-lg-4'></div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='payment-thankyou text-center'>
                                <h2 className='mt-5 mb-4 fw-bold ' >Payment Successful!</h2>
                                <div className='row'>
                                    <div className='col-12 col-md-2 col-lg-3'></div>
                                    <div className='col-12 col-md-8 col-lg-6'>
                                        <table className="table table-bordered text-start">
                                            <thead>
                                                <tr>
                                                    <td className='bg-blue color-white fw-bold' colSpan={4}>Details:</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className='color-blue'>Transaction ID</th>
                                                    <td>{(params && !!params.get("id")) ? params.get("id") : ""}</td>
                                                </tr>
                                                <tr>
                                                    <th className='color-blue'>Amount</th>
                                                    <td>{(params && !!params.get("amt")) ? params.get("amt") : ""}</td>
                                                </tr>
                                                <tr>
                                                    <th className='color-blue'>Bank Ref. Number</th>
                                                    <td>{(params && !!params.get("bRef")) ? params.get("bRef") : ""}</td>
                                                </tr>
                                                <tr>
                                                    <th className='color-blue'>Payment Date</th>
                                                    <td>
                                                        {(params && !!params.get("pd")) ? getFormattedDateTime(params.get("pd"))  : ""}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='col-12 col-md-2 col-lg-3'></div>
                                </div>
                                <p className='mt-5 fs-14'>Congratulations! Your payment has been successfully processed. We are in the process of generating your air ticket, and it will be shared with you shortly. If, for any reason, you don't receive your ticket within the next few hours, don’t panic! Contact our agents at <a className='text-decoration-none color-blue fw-bold' href="tel:+91-8000235865">+91-8000235865</a> or drop us an email at <a className='text-decoration-none color-blue fw-bold' href="mailto:support@travanya.com">support@travanya.com</a>, they will provide you with the necessary assistance. </p>
                                <p className='text-center fw-bold'>Thank you for choosing Travanya.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>


            <InnerFooter />
        </Layout>
    )
}

