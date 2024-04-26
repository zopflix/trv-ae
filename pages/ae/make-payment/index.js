"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from '@/app/components/stripe-checkout-form';
import Layout from '@/app/components/inner-layout';
import { useState } from 'react';
import InnterFooter from '@/app/components/inner-footer';
import { getPaymentIntent } from '@/app/services/bookingService';
import { trvLoader } from '@/app/helpers/imageKitLoader';
import Image from 'next/image';
import Head from 'next/head';


function StripePayment() {
    const stripePromise = loadStripe('pk_live_51OoL8ICeHMKD9V9Nnh6nUVO4tPI9DIXAY1PIgbPSV3ZXeUs1k4edZiyEBCtnM8lVLFVsLbD0fPnWsclvcKgGYG3q00q1U36XG9');

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: props.data.client_secret,
    // };

    const [currency, setCurrency] = useState('aed');
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState('');
    const [showAmountTab, setShowAmountTab] = useState(true);
    const [options, setOptions] = useState({ clientSecret: '' });
    const [hasError, setHasError] = useState(false);

    return (
        <Layout>
            <Head>
                <title>Securely Make Payments | Travanya</title>
                <meta name="description" content='Easily make payments online with Travanya. Choose from various secure payment options for a hassle-free experience. Pay securely and conveniently.' />
                <link rel="canonical" href='https://www.travanya.ae/ae/make-payment/' />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content='Securely Make Payments | Travanya' />
                <meta property="og:description" content='Easily make payments online with Travanya. Choose from various secure payment options for a hassle-free experience. Pay securely and conveniently.' />
                <meta property="og:url" content='https://www.travanya.ae/ae/make-payment/' />
                <meta property="og:site_name" content="Travanya" />
                <meta property="og:image" content="https://assets.travanya.com/logo.webp" />
                <meta property="og:image:type" content="image/webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@Travanya" />
                <meta name="twitter:title" content='Securely Make Payments | Travanya' />
                <meta name="twitter:description" content='Easily make payments online with Travanya. Choose from various secure payment options for a hassle-free experience. Pay securely and conveniently.' />
                <meta name="twitter:image" content="https://assets.travanya.com/logo.webp" />
            </Head>
            <div className='container mt-5 mb-5'>
                {showAmountTab &&
                    <div className='row'>
                        <div className='col-12 col-md-2 col-lg-3'></div>
                        <div className='col-12 col-md-8 col-lg-6'>
                            <h3 className='fw-bold color-blue text-center mb-3'>Make Payment!</h3>
                            <div className='bg-grey p-3 rounded-2'>

                                <div className="FormGroup mb-2">
                                    <label className="mb-1">Amount</label>
                                    <div className='d-flex'>
                                        <select className='form-select bg-white w-50 w-md-25 ps-3 me-3' value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                            <option value='aed'>AED</option>
                                            <option value='aud'>AUD</option>
                                            <option value='inr'>INR</option>
                                            <option value='usd'>USD</option>
                                        </select>
                                        <input className={(hasError && (!amount || amount <= 0)) ? "form-control ps-3 bg-white border border-red" : "form-control ps-3 bg-white"} type="number" value={amount} placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                </div>
                                <div className="FormGroup mb-2">
                                    <label className="mb-1">Description</label>
                                    <input className={(hasError && !description) ? "form-control bg-white ps-3 border border-red" : "form-control bg-white ps-3"} type="text" value={description} placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <button className="buttonStyle3 mt-2 border-0 color-white fs-14 px-2 w-100 py-2 fw-bold rounded-3" onClick={async () => {
                                    if (amount > 0 && !!description) {
                                        const data = await getPaymentIntent({ amount: parseFloat(amount), currency: currency, description: description });
                                        setOptions({ clientSecret: data?.client_secret });
                                        sessionStorage.setItem('stripeAmount', amount);
                                        setShowAmountTab(false);
                                    }
                                    else {
                                        setHasError(true);
                                    }
                                }}>
                                    <span>Next</span>
                                </button>
                            </div>
                        </div>
                        <div className='col-12 col-md-2 col-lg-3'></div>
                    </div>

                }

                {!showAmountTab &&
                    <div>
                        <div className='tab-block col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 col-xxl-2 mb-4'>
                            <button className='bg-white border border-blue rounded-3 py-2 px-4 d-flex align-items-center' onClick={() => setShowAmountTab(true)}>
                                <Image
                                    className="h-auto me-2"
                                    loader={trvLoader}
                                    src="icon/left-arrow.svg"
                                    alt="left arrow icon"
                                    width={7}
                                    height={45}
                                />
                                <span className='color-blue fs-14'>Go Back</span>
                            </button>
                        </div>
                        <Elements stripe={stripePromise} options={options}>
                            <StripeCheckoutForm />
                        </Elements>
                    </div>}
            </div>
            <InnterFooter />
        </Layout>

    );
}

export async function getServerSideProps(context) {
    // Fetch data based on the context
    // const data = await getPaymentIntent({ amount: 15, currency: "aed", description: 'Test Booking Payment' });
    // if (!data) {
    //     return {
    //         notFound: true
    //     }
    // }

    // return {
    //     props: { data: data },
    // };

    return { notFound: true}
}

export default StripePayment;