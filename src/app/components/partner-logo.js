"use client"
import Layout from '../components/_layout'
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';

export default function PartnerLogo() {

    return (
        <Layout>
            <div className='border-bottom text-center ReviewBar'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-1'></div>
                        <div className='col-12 col-lg-10 py-2'>
                            <div className='d-flex w-100 justify-content-between ReviewLogoBar'>
                                <div>
                                    <Image
                                        className=""
                                        loader={trvLoader}
                                        src="partner-logo/iata.webp"
                                        alt="IATA"
                                        width={176}
                                        height={45}
                                    />
                                </div>
                                <div>
                                    <a className='d-inline-block' href='#GoogleReviewWraper'>
                                        <Image
                                            className=""
                                            loader={trvLoader}
                                            src="partner-logo/google_rating.webp"
                                            alt="google_rating logo"
                                            width={176}
                                            height={45}
                                        />
                                    </a>
                                </div>
                                <div>
                                    <Image
                                        className=""
                                        loader={trvLoader}
                                        src="partner-logo/secure_ssl_encryption.webp"
                                        alt="secure ssl"
                                        width={176}
                                        height={45}
                                    />
                                </div>
                                <div>
                                    <Image
                                        className=""
                                        loader={trvLoader}
                                        src="partner-logo/customer_support.webp"
                                        alt="customer_support"
                                        width={176}
                                        height={40}
                                    />
                                </div>
                                <div>
                                    <Image
                                        className=""
                                        loader={trvLoader}
                                        src="partner-logo/fb_followers.webp"
                                        alt="fb_followers"
                                        width={176}
                                        height={45}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-1'></div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

