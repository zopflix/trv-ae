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
                        <div className='col-12 col-md-1'></div>
                        <div className='col-12 col-md-10 py-2'>
                            <Image
                                className='w-100 h-auto'
                                loader={trvLoader}
                                src="icon/PartnerLogo.webp"
                                alt="facebook logo"
                                width={100}
                                height={24}
                            />
                        </div>
                        <div className='col-12 col-md-1'></div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

