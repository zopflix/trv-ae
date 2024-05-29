"use client"
import Layout from '../components/_layout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import InnterFooter from '../components/inner-footer'
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';
export default function PaymentConfirmationSuccess() {
    const router = useRouter(null);
    const [txnId, setTransactionId] = useState("");
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params) {
            const transactionId = params.get("id");
            setTransactionId(params.get("txnId"))

        }
    }, [])
    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:title" content="Payment Success - Travanya" />
                <meta property="og:description" content="By using our services, you agree to comply with Travanya' Terms & Conditions for a smooth experience. Familiarize yourself with the guidelines here." />
            </Head>
            <section className='py-5 mb-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-2'></div>
                        <div className='col-12 col-lg-8'>
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
                                <h6 className='mb-4'>Redirecting to merchant site...</h6>
                                <h5 className='mb-3'>Your transaction ID for this payment is : <span className=''>{txnId}</span></h5>
                                <p><strong>Caution:</strong> Do not close this window or press Refresh or browser back button. If you do this, then the transaction process may be interrupted</p>
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
