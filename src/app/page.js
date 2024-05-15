"use client"
import { trvLoader } from './helpers/imageKitLoader'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Layout from './components/_layout'
import SearchSection from './components/search-section'
import PartnerLogo from './components/partner-logo'
// const Header = dynamic(() => import('./components/header'), { suspense: true })
const Footer = dynamic(() => import('./components/footer'), { ssr: false })
// const SearchSection = dynamic(() => import('./components/search-section'), { suspense: true })
const TopFlightDeals = dynamic(() => import('./components/top-flight-deals'), { ssr: true })
const DomesticPackageDeals = dynamic(() => import('./components/domestic-package-deals'), { ssr: true })
const SubscribeNewsletter = dynamic(() => import('./components/subscribe-newsletter'), { ssr: true })
const GoogleReviews = dynamic(() => import('./components/google-reviews'), { ssr: true })
const HolidayCategories = dynamic(() => import('./components/holiday-categories'), { ssr: false })


export default function Home() {

  const [noOfPassengers, setNoOfPassengers] = useState({ adults: 0, children: 0, infants: 0, cabin: '' });
  const [isFirstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  },)

  return (
    <Layout>
      {/* <Header></Header> */}
      <SearchSection setNoOfPassengers={setNoOfPassengers} selectedTab={0} />
      {
        !isFirstRender &&
        <Fragment>
          <PartnerLogo></PartnerLogo>
          <div className='spaceDivider'></div>
          <TopFlightDeals />
          <div className='spaceDivider'></div>

          <DomesticPackageDeals />
          <div className='spaceDivider'></div>

          <div className='container'>
            <Image
              className="h-auto w-100"
              loader={trvLoader}
              src="Travanya-ae-banner.webp"
              alt="Flight Banner"
              width={176}
              height={43}
            />
          </div>
          <div className='spaceDivider'></div>
          <HolidayCategories />
          <GoogleReviews />
          <div className='spaceDivider'></div>
          <section id="AboutBox" className='bg-orange pt-5'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-12 col-sm-12 col-md-6 col-lg-7 py-3'>
                  <div className='about-content'>
                    <h2 className='color-white fw-normal mb-3'>About <strong className="fw-bold">Travanya</strong></h2>
                    <p className='color-white fs-12'>Enjoy a smooth travel with Travanya, where we make your wanderlust dreams come true. Our devoted team excels in smooth flight reservations and customised vacation bundles that fit your budget without sacrificing quality.</p>
                    <p className='color-white fs-12'>As your companions in travel, we enable you to design one-of-a-kind adventures. With transparent pricing, stress-free organization, and a dedication to ensuring your journey shines as the highlight of your narrative. Leave the details to us; your task is to pack and relish the experience.</p>
                    <a className='fs-14 color-white text-decoration-none' href='/about-us/'>About More <i className="fa-solid fa-chevron-right fs-12 ms-1"></i></a>
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-md-6 col-lg-5 py-3'>
                  <Image
                    className="h-auto w-100 d-none d-md-block"
                    loader={trvLoader}
                    src="about-img.webp"
                    alt="About Image"
                    width={176}
                    height={43}
                  />
                </div>
              </div>
            </div>
          </section>
          <div className='bg-blue d-none d-md-inline'>
            <Image
              className="h-auto w-100"
              loader={trvLoader}
              src="about-section-bottom-border.svg"
              alt="About Bottom Border"
              width={176}
              height={43}
            />
          </div>
          <section id="chooseSection" className='py-5 bg-blue'>
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <h2 className='color-white fw-normal mb-5 text-center'>Why <strong className="fw-bold">Choose Us?</strong></h2>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox'>
                    <div className='chooseBoxIcon m-auto bg-white text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/IATA-Certified.svg"
                        alt="IATA Certified icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-white fs-14 text-center mt-3'>IATA-Certified</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox'>
                    <div className='chooseBoxIcon m-auto bg-white text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Verified-Experts.svg"
                        alt="Verified Experts icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-white fs-14 text-center mt-3'>Verified Experts</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox'>
                    <div className='chooseBoxIcon m-auto bg-white text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Tour-Options.svg"
                        alt="100+ Tour Options icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-white fs-14 text-center mt-3'>100+ Tour Options</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox'>
                    <div className='chooseBoxIcon m-auto bg-white text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Easy-Payment.svg"
                        alt="Easy Payment icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-white fs-14 text-center mt-3'>Easy Payment</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox'>
                    <div className='chooseBoxIcon m-auto bg-white text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Satisfaction.svg"
                        alt="100% Satisfaction icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-white fs-14 text-center mt-3'>100% Satisfaction</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox'>
                    <div className='chooseBoxIcon m-auto bg-white text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Customisations.svg"
                        alt="Customisations icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-white fs-14 text-center mt-3'>Customisations</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <SubscribeNewsletter></SubscribeNewsletter>
          <Footer></Footer>
        </Fragment>
      }
    </Layout>
  )
}