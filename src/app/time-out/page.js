"use client"
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Layout from '../components/_layout'

import InnerFooter from '../components/inner-footer'
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';

export default function TimeOut() {


    return (
        <>
            <Layout>

                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                    <meta property="og:url" content="https://www.faremaze.com" />
                    <meta property="og:title" content="Booking Time-Out - Refresh & Resume The Process | Faremaze" />
                    <meta property="og:description" content="Oops, Time's Up! Refresh and continue your journey planning hassle-free. Faremaze ensures a swift and secure booking experience. Your adventure awaits!" />
                    <meta property="og:image" content="https://assets.faremaze.com/faremaze-200x200.jpg" />
                    <title>Booking Time-Out - Refresh & Resume The Process | Faremaze</title>
                    <meta name="description" content="Oops, Time's Up! Refresh and continue your journey planning hassle-free. Faremaze ensures a swift and secure booking experience. Your adventure awaits!" />
                </Head>

                <section className='pt-5 mt-5 pb-2'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='payment-thankyou text-center'>
                                    <Image
                                        className="h-auto w-100 TimeOurImg"
                                        loader={trvLoader}
                                        src="time-out-img.svg"
                                        alt="timeout img"
                                        width={183}
                                        height={50}
                                    />
                                    <h2 className='mt-5'> Page Expired - Time Out</h2>
                                    <p className='mt-4'>Due to a prolonged waiting period, this page has expired/timed out. For a fresh payment link or assistance, please contact our travel agents at <a href="tel:+91-800 023 5865">+91-8000235865 </a> or drop us an email at <a href="mailto:support@travanya.ae">support@travanya.ae</a> We will be happy to assist you in completing your transaction seamlessly.</p>
                                    <p className='text-center fw-bold'>Thank you for choosing Travanya.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <hr />
                <InnerFooter></InnerFooter>
            </Layout>

        </>
    )
}

