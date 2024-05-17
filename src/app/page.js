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
      <div className=''>
        <Image
          className="h-auto w-100"
          loader={trvLoader}
          src="TRV-holiday-main-banner.webp"
          alt="User Icon"
          width={20}
          height={20}
        />
        <div className=''>
        <SearchSection setNoOfPassengers={setNoOfPassengers} selectedTab={0} />
        </div>
      </div>
      {/* <SearchSection setNoOfPassengers={setNoOfPassengers} selectedTab={0} /> */}
      {
        !isFirstRender &&
        <Fragment>
          <PartnerLogo></PartnerLogo>
          <div className='spaceDivider'></div>
          {/* <TopFlightDeals /> */}
          <div className='spaceDivider'></div>
          {/* <iframe className='phnPay' src="https://mercury-uat.phonepe.com/transact/simulator?token=BtYkHF0NC3COl8nsQT0us5iU23YKIrjPdr7sNel7LkbZmgR2Gd" /> */}
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
          <GoogleReviews />
          <div className='spaceDivider'></div>
          <HolidayCategories />
          <SubscribeNewsletter></SubscribeNewsletter>
          <section id="AboutBox" className='py-5'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-12 col-md-5'>
                  <div className='about-content'>
                    <h2 class="color-black fw-normal mb-3">We make it easier for everyone to experience <strong class="fw-bold color-blue">the world Feedback</strong></h2>
                    <p className='fs-12'>Enjoy a smooth travel with Travanya, where we make your wanderlust dreams come true. Our devoted team excels in smooth flight reservations and customised vacation bundles that fit your budget without sacrificing quality.</p>
                    <p className='fs-12'>As your companions in travel, we enable you to design one-of-a-kind adventures. With transparent pricing, stress-free organization, and a dedication to ensuring your journey shines as the highlight of your narrative. Leave the details to us; your task is to pack and relish the experience.</p>
                    <a className='fs-14 text-decoration-none buttonStyle2 py-3 px-4 d-inline-block' href='/about-us/'>About More <i className="fa-solid fa-chevron-right fs-12 ms-1"></i></a>
                    <Image
                      className="h-auto float-end d-none d-lg-block"
                      loader={trvLoader}
                      src="about-trevler-women.webp"
                      alt="about-trevler-women"
                      width={200}
                      height={43}
                    />
                  </div>
                </div>
                <div className='col-12 col-md-2 pe-0'>
                  <Image
                    className="h-auto w-100"
                    loader={trvLoader}
                    src="about-air-img.webp"
                    alt="about air img"
                    width={176}
                    height={43}
                  />
                </div>
                <div className='col-12 col-md-5'>
                  <Image
                    className="h-auto w-100"
                    loader={trvLoader}
                    src="about-main-img.webp"
                    alt="about main img"
                    width={176}
                    height={43}
                  />
                </div>
              </div>

            </div>
          </section>
          <section id="chooseSection" className='py-5'>
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <h2 className='color-black fw-normal mb-3'>Why <strong className="fw-bold color-blue">Choose Us?</strong></h2>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox bg-light-blue border rounded-3 py-4'>
                    <div className='chooseBoxIcon m-auto text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/IATA-Certified-icon.svg"
                        alt="IATA Certified icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-blue fs-14 text-center mt-3 mb-0'>IATA-Certified</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox bg-light-blue border rounded-3 py-4'>
                    <div className='chooseBoxIcon m-auto text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Verified-Experts-icon.svg"
                        alt="Verified Experts icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-blue fs-14 text-center mt-3 mb-0'>Verified Experts</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox bg-light-blue border rounded-3 py-4'>
                    <div className='chooseBoxIcon m-auto text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Tour-Options-icon.svg"
                        alt="Tour Options icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-blue fs-14 text-center mt-3 mb-0'>100+ Tour Options</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox bg-light-blue border rounded-3 py-4'>
                    <div className='chooseBoxIcon m-auto text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Easy-Payment-icon.svg"
                        alt="Easy Payment icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-blue fs-14 text-center mt-3 mb-0'>Easy Payment</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox bg-light-blue border rounded-3 py-4'>
                    <div className='chooseBoxIcon m-auto text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Satisfaction-icon.svg"
                        alt="Satisfaction icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-blue fs-14 text-center mt-3 mb-0'>100% Satisfaction</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 py-3'>
                  <div className='chooseBox bg-light-blue border rounded-3 py-4'>
                    <div className='chooseBoxIcon m-auto text-center rounded-3'>
                      <Image
                        loader={trvLoader}
                        src="icon/Customisations-icon.svg"
                        alt="Satisfaction icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className='color-blue fs-14 text-center mt-3 mb-0'>Customisations</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer></Footer>
        </Fragment>
      }
    </Layout>
  )
}