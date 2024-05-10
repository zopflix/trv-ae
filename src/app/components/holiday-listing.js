"use client"
import { Suspense, useEffect, useState } from "react";
import Header from "./header";
import HolidayEnquiryForm from "./holiday-enquiry-form";
import SideFilters from "./filter";
import { getAllHolidayPackages, getDurations } from "../services/holidayService";
import { tenantId } from "../config";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { aedNumberFormat } from "../helpers/common";
import InquiryPopup from "./inquiry-popup";
import { Modal } from "react-bootstrap";
import Footer from "./footer";
import PartnerLogo from "./partner-logo";
import GoogleReviews from "./google-reviews";

export default function HolidayListing(props) {
  const title = props?.packageData?.Data?.Title;
  const description = props?.packageData?.Data?.Description;
  const content = props?.packageData?.Data?.Content;
  const destinationName = props?.packageData?.Data?.Name;
  const pathname = usePathname();
  const faqs = props?.packageData?.Data?.FAQs;

  const [holidayPackages, setHolidayPackages] = useState([]);
  const [filteredHolidayPackages, setFilteredHolidayPackages] = useState([]);
  const [durations, setDurations] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [openInquiryModal, setOpenInquiryModal] = useState(false);
  const [inquiryPkg, setInquiryPkg] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);

  useEffect(() => {
    // let search = window.location.href;
    // let data = search.split('/').pop();
    // let dest = data.split('-');
    // dest = dest.slice(0, -2);
    // dest = dest.join(' ');
    // setDestinationName(capitalizeEachWord(dest));
    // getDestinationByName(dest).then(res => {
    // if (res?.Success) {
    if (props?.isDomestic == props?.packageData?.Data?.IsDomestic) {

      // setDestinationName(res?.Data?.Name);
      // setTitle(res?.Data?.Title);
      // setDescription(res?.Data?.Description);
      // setContent(res?.Data?.Content);
      // setFaqs(res?.Data?.FAQs);

      getAllHolidayPackages(tenantId, props?.packageData?.Data?.Name).then(res => {

        if (res?.Success) {
          setHolidayPackages(res?.Data);
          setFilteredHolidayPackages(res?.Data);
          setIsLoading(false);
          getDurations().then(response => {
            if (response?.data?.Success)
              setDurations(response.data.Data);
          })
        }
        else {
          setIsLoading(false);
        }
      });
    }
    else {
      setIsLoading(false);
    }
    // }
    // else {
    //   setIsLoading(false);
    // }
    // });


  }, []);


  return (
    <>
      <Header></Header>
      <Suspense><HolidayEnquiryForm bannerText={destinationName} /></Suspense>
      <PartnerLogo />

      {!!destinationName &&
        <div className="container py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href={props.isDomestic ? "/india-tour-packages" : "/international-tour-packages"}>{props.isDomestic ? 'India' : 'International'} Tour Packages</a></li>
              <li className="breadcrumb-item active" aria-current="page">{destinationName} Tour Packages</li>
            </ol>
          </nav>
        </div>
      }

      <section className="py-5 bg-grey mb-5">
        {holidayPackages.length > 0 &&
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-3">
                <div className="d-lg-none mb-4">
                  <button className="btn py-2 mb-3 d-flex align-items-center border border-blue" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    <i className="fa-solid fa-bars me-2 fs-20 color-blue"></i>
                    <span className="fs-16 fw-bold color-blue">Filter</span>
                  </button>
                  <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header justify-content-end">
                      <button type="button" className="btn-close text-reset float-end" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body p-0">

                      <div className="w-100 float-start">
                        {
                          holidayPackages.length > 0 &&
                          <SideFilters holidayPackages={holidayPackages} filteredPackages={filteredHolidayPackages} setFilteredPackages={setFilteredHolidayPackages} durations={durations} setIsContentLoading={setIsContentLoading} />
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-none d-lg-block">
                  {
                    holidayPackages.length > 0 &&
                    <SideFilters holidayPackages={holidayPackages} filteredPackages={filteredHolidayPackages} setFilteredPackages={setFilteredHolidayPackages} durations={durations} setIsContentLoading={setIsContentLoading} />
                  }
                </div>
              </div>
              {holidayPackages.length > 0 &&
                <div className="col-12 col-sm-12 col-md-12 col-lg-9">
                  <div>
                    <h2 className="color-black fs-16">Showing <span className="color-orange">{filteredHolidayPackages.length}</span> {destinationName} Tour Packages</h2>
                    <div className="DealsListMainWraper">
                      {filteredHolidayPackages.length > 0 &&
                        filteredHolidayPackages.map((item, ix) => {
                          const pkgPrice = item.StandardPrice ? item.StandardPrice : (item.DeluxePrice ? item.DeluxePrice : item.PremiumPrice);
                          return <div key={ix} className="DealsListBox mb-4 bg-white p-3 rounded-3">
                            <div className="row">
                              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 py-1">
                                <Image
                                  className=" w-100 rounded-3"
                                  loader={sfLoader}
                                  src={!!item?.ImageUrl ? item.ImageUrl : ''}
                                  alt="pkg-img"
                                  width={176}
                                  height={170}
                                />
                              </div>
                              <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-1">
                                <div className="row justify-content-between">
                                  <div className="col-6 py-1">
                                    <div className="DealsListContentBox">
                                      <h3 className="color-black fw-bold fs-20">{item.Title}</h3>
                                      <div className="d-flex align-items-center">
                                        <div>
                                          <Image
                                            className=""
                                            loader={trvLoader}
                                            src="icon/clock-orange-icon.svg"
                                            alt="Clock Icon"
                                            width={24}
                                            height={24}
                                          />
                                        </div>
                                        <div>
                                          <p className="mb-0 color-black ms-2 fs-14">{durations.find(x => x.Id == item.Duration)?.Value}</p>
                                        </div>
                                      </div>
                                      {item.Recommendations.length > 0 &&
                                        <div>
                                          <p className="fs-12 mt-3 mb-1 color-grey">Recommended for:</p>
                                          < div >
                                            {item.Recommendations.map((recc, recIx) => {
                                              return <div key={recIx} className="d-inline-block bg-grey rounded-5 color-black fs-12 text-decoration-none px-4 py-2 my-1 me-2" >{recc}</div>
                                            })}
                                          </div>
                                        </div>
                                      }
                                    </div>
                                  </div>
                                  <div className="col-6 py-1 text-lg-end">
                                    <div className="DealsListContentBox float-end">
                                      {item.Cities?.length > 0 && <p className="fs-14 color-black fw-bold"><span className="color-grey">Cities:</span> {item.Cities.join(', ')}</p>}
                                      <h3 className="mb-0 fw-bold color-black fs-24">{aedNumberFormat(pkgPrice)?.split('.')[0]}.<sup>{aedNumberFormat(pkgPrice)?.split('.')[1]}</sup></h3>
                                      <p className="color-grey fs-12 mb-2">Starting price per person</p>
                                      <button type="button" className="buttonStyle3 border-0 float-end" onClick={() => { setOpenInquiryModal(true); setInquiryPkg(item); }}>
                                        <div className="d-flex align-items-center justify-content-center">
                                          <div>
                                            <Image
                                              className="me-2"
                                              loader={trvLoader}
                                              src="icon/envelope-white-icon.svg"
                                              alt="envelope icon"
                                              width={20}
                                              height={20}
                                            />
                                          </div>
                                          <div>
                                            <span className="fs-14 fw-bold">Enquire</span>
                                          </div>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="row align-items-center border-top mt-3 pt-3">
                                  <div className="col-12 col-sm-12 col-lg-3">
                                    <div className="color-blue fs-14 text-decoration-none fw-bold">Customized Holidays</div>
                                  </div>
                                  <div className="col-7 col-md-8 col-lg-6 my-2">
                                    <div className="d-flex justify-content-between">
                                      <div className="text-center mx-2">
                                        <Image
                                          className=""
                                          loader={trvLoader}
                                          src="icon/highlights-icon.svg"
                                          alt="Highlights icon"
                                          width={20}
                                          height={20}
                                        />
                                        <p className="color-grey fs-12 mb-0 mt-1 d-none d-md-block">Highlights</p>
                                      </div>
                                      <div className="text-center mx-2">
                                        <Image
                                          className=""
                                          loader={trvLoader}
                                          src="icon/sightseeing-icon.svg"
                                          alt="Sightseeing icon"
                                          width={20}
                                          height={20}
                                        />
                                        <p className="color-grey fs-12 mb-0 mt-1 d-none d-md-block">Sightseeing</p>
                                      </div>
                                      <div className="text-center mx-2">
                                        <Image
                                          className=""
                                          loader={trvLoader}
                                          src="icon/transfers-icon.svg"
                                          alt="Transfers icon"
                                          width={20}
                                          height={20}
                                        />
                                        <p className="color-grey fs-12 mb-0 mt-1 d-none d-md-block">Transfers</p>
                                      </div>
                                      <div className="text-center mx-2">
                                        <Image
                                          className=""
                                          loader={trvLoader}
                                          src="icon/meals-icon.svg"
                                          alt="Meals icon"
                                          width={20}
                                          height={20}
                                        />
                                        <p className="color-grey fs-12 mb-0 mt-1 d-none d-md-block">Meals</p>
                                      </div>
                                      <div className="text-center mx-2">
                                        <Image
                                          className=""
                                          loader={trvLoader}
                                          src="icon/flight-icon-hide.svg"
                                          alt="flight icon"
                                          width={20}
                                          height={20}
                                        />
                                        <p className="color-grey fs-12 mb-0 mt-1 d-none d-md-block">Flight</p>
                                      </div>
                                      <div className="text-center mx-2">
                                        <Image
                                          className=""
                                          loader={trvLoader}
                                          src="icon/hotel-icon.svg"
                                          alt="hotel icon"
                                          width={20}
                                          height={20}
                                        />
                                        <p className="color-grey fs-12 mb-0 mt-1 d-none d-md-block">Hotel</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-4 col-lg-3 text-end">
                                    <button className="flaot-end bg-white p-0 border-0 fs-14 color-blue " onClick={() => {
                                      window.location.href = `${pathname}${item.Slug}/`;
                                    }}>View Details</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        })
                      }
                    </div>
                  </div>

                  {/* Default Date set as 15 days from now */}
                  <Suspense><InquiryPopup openInquiryModal={openInquiryModal} setOpenInquiryModal={setOpenInquiryModal} package={inquiryPkg} travelDate={new Date((new Date()).getTime() + (15 * 24 * 60 * 60 * 1000))} location={destinationName} /></Suspense>

                </div>
              }
            </div>
          </div>
        }

        {(!!title || !!description || !!content) &&
          <section className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="subHeading">
                    <h2 className="mb-3 fw-bold color-blue fs-24" dangerouslySetInnerHTML={{ __html: title }} />
                  </div>
                </div>
                {
                  showMore ?
                    <div className="col-12">
                      <div className="HolidayPackageContent">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                        <a className="text-decoration-none color-blue fs-14 fw-bold cursor-pointer" onClick={() => setShowMore(!showMore)}>Show less</a>
                      </div>
                    </div>
                    :
                    <div className="col-12">
                      <div className="HolidayPackageContent">
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                        <a className="text-decoration-none color-blue fs-14 fw-bold cursor-pointer" onClick={() => setShowMore(!showMore)}>Read more</a>
                      </div>
                    </div>
                }
              </div>
            </div>
          </section>
        }

        {(faqs?.length > 0 && !!faqs[0]?.Question && !!faqs[0]?.Answer) &&
          <section className="bg-grey py-5 mb-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="subHeading">
                    <h2 className="mb-4 fw-normal">Frequently Asked  <strong className="color-orange">Questions</strong></h2>
                  </div>
                </div>
                <div className="col-12">
                  <div className="accordion fs-14" id="accordionExample">
                    {faqs.map((faq, ix) => {
                      return <div key={ix} className="accordion-item">
                        <h2 className="accordion-header" id={"heading" + ix}>
                          <button className={ix == 0 ? "color-blue fw-bold accordion-button" : "color-blue fw-bold accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={"#FAQ" + ix} aria-expanded="true" aria-controls={"FAQ" + ix}>Q: {faq.Question}</button>
                        </h2>
                        <div id={"FAQ" + ix} className={ix == 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby={"heading" + ix} data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>Answer:</strong> {faq.Answer}
                          </div>
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      </section >

      {holidayPackages.length > 0 &&
        <Modal className='centred-modal' show={isContentLoading} >
          <Modal.Body >
            <div className="filter-loader-mid-icon">
              <Image
                className="h-auto w-100"
                loader={trvLoader}
                src="icon/GIF-FM.gif"
                alt="GIF-FM"
                width={176}
                height={43}
              />
            </div>
          </Modal.Body>
        </Modal>
      }
      {(!isLoading && (holidayPackages.length > 0 || !!title || !!description || !!content)) &&
        <Footer></Footer>
      }
    </>
  )
}