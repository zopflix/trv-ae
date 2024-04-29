"use client"
import Layout from '../components/_layout'
import Head from 'next/head'
import InnerFooter from '../components/inner-footer'
import { useEffect, useState } from 'react';
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';
import { contactNumber,holidayContactNumber } from '@/app/config';
import { usePathname } from 'next/navigation';

export default function ThankYou() {
    const [txnId, setTransactionId] = useState("");
    const path = usePathname();
    const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("id")) {
            setTransactionId(params.get("id"));
        }
    }, [])
    useEffect(() => {
     
        if (path.includes("/holidays")) {
            setDisplayContactNumber(holidayContactNumber);
    
        }else{
            setDisplayContactNumber(contactNumber);

        }
      }, []);

    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:title" content="Thank You for Your Enquiry | Travanya" />
                <title>Thank You for Your Enquiry | Travanya</title>
            </Head>

            <section className='pt-5 pb-2'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-2 col-lg-3'></div>
                        <div className='col-12 col-md-8 col-lg-6'>
                            <Image
                                className="h-auto w-100 MainImgTop"
                                loader={trvLoader}
                                src="thank-you-payment-img.png"
                                alt="thank-you-payment img"
                                width={183}
                                height={50}
                            />
                        </div>
                        <div className='col-12 col-md-2 col-lg-3'></div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='payment-thankyou text-center'>
                                <h2 className='mt-5 mb-4 fw-bold color-blue' >Thank You for Your Enquiry!</h2>
                                <span className='bg-orange rounded-2 color-white p-3 mb-5'><strong>Your Query Reference No: </strong>{txnId}</span>
                                {/* <p className='mt-5 fs-14'>Sit back and relax! We've got your holiday plans covered.</p> */}
                                <p className='text-center mt-5'>Our team will soon reach out to you with a personalised itinerary & the most affordable deal.</p>
                                <p>Need quick details? Call us anytime at <a className="color-blue fw-bold text-decoration-none" href={`tel:${displayContactNumber}`}>{displayContactNumber}</a>. We’re available 24/7.</p>
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

