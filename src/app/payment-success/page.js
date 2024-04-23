"use client"
import Layout from '../components/_layout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { decryptPaymentResponse, generateTBOTicket } from '../services/bookingService'
import InnterFooter from '../components/inner-footer'
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';
export default function Home() {
    const router = useRouter(null);
    const [txnId, setTransactionId] = useState("");
    const [amt, setAmount] = useState("");
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params) {
            const transactionId = params.get("txnId");
            const bref = params.get("bref");
            const bid = params.get("bid");
            const encryptedId=params.get("id")
            setTransactionId(params.get("txnId"))
            setAmount(params.get("amt"));
            generateTBOTicket(encryptedId, bref, bid).then((res) => {
                if (res && res.data && res.data.bookingId > 0) {
                    localStorage.setItem("bookingInformation", JSON.stringify(res.data));
                    router.push("/confirmation/success");
                }
                else {
                    router.push("/booking-failed");
                }
            });
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
                                <h5 className='mb-3'>Your transaction ID for this payment is : <span className=''>{txnId}</span></h5>
                                <h5 className='mb-3'>Amount is : <span className=''>{amt}</span></h5>
                                <p className='fs-14'> We are currently in the process of generating your air ticket. You will receive your tickets within minutes, please be patient and refrain from refreshing the page. We'll send the same to your registered email address too. Happy travelling! </p>
                                <p className='fs-14'>If you do not receive your tickets within a few hours, please feel free to contact our travel experts at <a className='text-decoration-none color-blue fw-bold' href='tel:+918000235865'>+918000235865</a>. They are available 24/7 to assist you.</p>
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
