"use client"
import Layout from '../components/_layout'
import Head from 'next/head'
import { useRouter } from "next/navigation";
import InnterFooter from '../components/inner-footer'
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';
export default function Home() {
    const router = useRouter(null);


    const redirectToPendingPage = () => {
        window.location.href = "/";
    }
    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta property="og:title" content="Booking Failed - Travanya" />
                <meta property="og:description" content="By using our services, you agree to comply with Travanya' Terms & Conditions for a smooth experience. Familiarize yourself with the guidelines here." />
            </Head>


            <section className='py-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-2'></div>
                        <div className='col-12 col-lg-8'>
                            <div className='payment-main-wrp payment-failed text-center'>
                                <Image
                                    className="mb-4 payment-success-img"
                                    loader={trvLoader}
                                    src="icon/payment-failed-icon.svg"
                                    alt="close icon"
                                    width={100}
                                    height={100}
                                />
                                <h2 className='fw-bold mb-4'>Booking Failed</h2>
                                <p className='fs-14'>We regret to inform you that your booking couldn’t be processed at this time due to technical reasons, network issues, or other unforeseen reasons. Our agents are actively working to resolve this issue and will provide you with updates shortly.</p>
                                <p className='fs-14'>For immediate assistance, please call our experts at <a className='text-decoration-none color-blue fw-bold' href='tel:+918000235865'>+918000235865</a>. They will guide you through the next steps.</p>
                                <button className='border-0 fs-14 py-2 px-3 rounded-2 bg-blue color-white' onClick={() => redirectToPendingPage()}>Go To Home</button>
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
