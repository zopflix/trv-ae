"use client"
import Layout from '../components/_layout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import InnterFooter from '../components/inner-footer'
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';
export default function Home() {
    const router = useRouter(null);
    const [transactionId, setTransactionId] = useState("");
    useEffect(() => {
        if (!!window.location.search) {
            let params = new URLSearchParams(window.location.search);
            setTransactionId(params.get("txnId"))

        }
    }, [])


    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:title" content="Payment Failed - Travanya" />
                <meta property="og:description" content="By using our services, you agree to comply with Travanya' Terms & Conditions for a smooth experience. Familiarize yourself with the guidelines here." />
            </Head>


            <section className='pt-5 pb-5 mt-5 mb-5'>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-12 col-lg-2'></div>
                        <div className='col-12 col-lg-8'>
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
                                <h5 className='mb-3'>Your transaction ID for this payment is : <span className=''>{transactionId}</span></h5>
                                <p><strong>Caution:</strong> Do not close this window or press Refresh or browser back button. If you do this, then the transaction process may be interrupted</p>
                                <button className='bg-transparent border-0 fw-bold fs-16 text-decoration-underline' onClick={() => {
                                    window.location.href = "/";
                                }
                                }>Go To Home</button>
                            </div>
                        </div>
                        <div className='col-12 col-lg-2'></div>
                    </div>
                </div>
            </section>


            <InnterFooter></InnterFooter>
        </Layout>
    )
}
