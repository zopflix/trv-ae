"use client";
import Image from "next/image";
import Header from "../components/header";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import FlightInfoSideBar from "../components/flight-info-sidebar";
import { Suspense, useEffect, useState } from "react";
import { getDurations } from "../services/holidayService";
import HolidayEnquiryForm from "./holiday-enquiry-form";
import { capitalizeEachWord, aedNumberFormat } from "../helpers/common";
import InquiryPopup from "./inquiry-popup";
import Footer from "./footer";

export default function HolidayDetails(props) {
  const packageData = props?.packageData?.Data;
  const [durations, setDurations] = useState([]);
  const inclusions = props?.packageData?.Data?.Inclusions;
  const exclusions = props?.packageData?.Data?.Exclusions;
  // const destinationName = props?.packageData?.Data?.Name;

  const stdAccommadations =
    props?.packageData?.Data?.PackageAccommodations?.find(
      (pkg) => pkg.AccommodationType == 1
    );
  const dlxAccommadations =
    props?.packageData?.Data?.PackageAccommodations?.find(
      (pkg) => pkg.AccommodationType == 2
    );
  const prmAccommadations =
    props?.packageData?.Data?.PackageAccommodations?.find(
      (pkg) => pkg.AccommodationType == 3
    );
  const [selectedAccommo, setSelectedAccommo] = useState(
    props?.packageData?.Data?.StandardPrice
      ? 0
      : props?.packageData?.Data?.DeluxePrice
        ? 1
        : 2
  );
  const [selectedRating, setSelectedRating] = useState(
    props?.packageData?.Data?.PackageAccommodations[0]?.Rating
  );
  const startingPrice = props?.packageData?.Data?.StandardPrice
    ? props?.packageData?.Data?.StandardPrice?.toFixed(2)
    : props?.packageData?.Data?.DeluxePrice
      ? props?.packageData?.Data?.DeluxePrice?.toFixed(2)
      : props?.packageData?.Data?.PremiumPrice?.toFixed(2);
  const [totalPrice, setTotalPrice] = useState(
    props?.packageData?.Data?.StandardPrice
      ? props?.packageData?.Data?.StandardPrice?.toFixed(2)
      : props?.packageData?.Data?.DeluxePrice
        ? props?.packageData?.Data?.DeluxePrice?.toFixed(2)
        : props?.packageData?.Data?.PremiumPrice?.toFixed(2)
  );
  const isDomestic = props?.packageData?.Data?.isDomestic;
  const [destinationName, setDestinationName] = useState("");
  const [destinationSlug, setDestinationSlug] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [openInquiryModal, setOpenInquiryModal] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date(new Date(new Date().setDate(new Date().getDate() + 7)))
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [totalPax, setTotalPax] = useState(1);


  useEffect(() => {
    document.body.classList.add("overflow-auto");
    document.body.classList.add("holidayDetail");

    let search = window.location.href;

    if (search.slice(-1) === "/") search = search.slice(0, -1);

    let parts = search.split("/");
    // let slug = parts.pop();
    let destSlug = parts[parts.length - 2];
    setDestinationSlug(destSlug);
    let dest = capitalizeEachWord(destSlug.split("-").slice(0, -2).join(" "));
    setDestinationName(dest);

    // getHolidayPackageBySlug(slug, tenantId).then(res => {
    // if (res?.Success) {
    // setPackageData(res.Data);
    // setIsDomestic(res?.Data?.IsDomestic);
    // setStdAccommodations(res.Data.PackageAccommodations.find(pkg => pkg.AccommodationType == 1));
    // setDlxAccommodations(res.Data.PackageAccommodations.find(pkg => pkg.AccommodationType == 2));
    // setPrmAccommodations(res.Data.PackageAccommodations.find(pkg => pkg.AccommodationType == 3));
    // setSelectedRating(res.Data.PackageAccommodations[0]?.Rating);
    //// setCurrency(res.Data.PackageAccommodations[0]?.Currency);
    // setTotalPrice(res.Data.StandardPrice ? res.Data.StandardPrice?.toFixed(2) : (res.Data.DeluxePrice ? res.Data.DeluxePrice?.toFixed(2) : res.Data.PremiumPrice.toFixed(2)));
    // setStartingPrice(res.Data.StandardPrice ? res.Data.StandardPrice?.toFixed(2) : (res.Data.DeluxePrice ? res.Data.DeluxePrice?.toFixed(2) : res.Data.PremiumPrice.toFixed(2)));
    // setSelectedAccommo(res.Data.StandardPrice ? 0 : (res.Data.DeluxePrice ? 1 : 2));
    // setInclusions(res.Data.Inclusions);
    // setExclusions(res.Data.Exclusions);
    // setIsLoading(false);
    getDurations().then((response) => {
      if (response?.data?.Success) setDurations(response.data.Data);
    });
    // }
    // else setIsLoading(false);
    // })

    return () => {
      if (document.body.classList.contains("overflow-auto")) {
        document.body.classList.remove("overflow-auto");
        document.body.classList.remove("holidayDetail");
      }
    };
  }, []);

  const modifyPackage = (noOfPax) => {
    if (selectedAccommo == 0)
      setTotalPrice(noOfPax * packageData?.StandardPrice);
    else if (selectedAccommo == 1)
      setTotalPrice(noOfPax * packageData?.DeluxePrice);
    else setTotalPrice(noOfPax * packageData?.PremiumPrice);
  };

  const changeRating = (acoType) => {
    switch (acoType) {
      case 0:
        setSelectedRating(3);
        break;
      case 1:
        setSelectedRating(4);
        break;
      case 2:
        setSelectedRating(5);
        break;
      default:
        setSelectedRating(3);
        break;
    }
  };

  return (
    <>
      <Header></Header>
      {/* {!isLoading && */}
      <div>
        <div className="container py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/holidays">Holidays</a>
              </li>
              <li className="breadcrumb-item">
                <a href={`/holidays/${destinationSlug}`}>
                  {destinationName} Tour Packages
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {packageData?.Title}
              </li>
            </ol>
          </nav>
        </div>
        <section className="pb-0">
          <div className="container">
            <div className="SearchDetailsWraper bg-light-blue p-3 rounded-top-4">
              <div className="row align-items-center m-0">
                <div className="col-12 col-sm-12 col-md-8 col-lg-9">
                  <div className="d-lg-flex align-items-center">
                    <h2 className="fs-20 color-black fw-bold mb-0 me-3 mb-0">
                      {packageData?.Title}
                    </h2>
                    <div>
                      <div className="d-flex align-items-center me-3">
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
                        <div className="my-2">
                          <p className="mb-0 color-black ms-2 fs-12 fw-bold">
                            {
                              durations.find(
                                (x) => x.Id == packageData?.Duration
                              )?.Value
                            }
                            {/* - 1 Country / 1 City */}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <div>
                    <div className="d-flex align-items-center me-3">
                      <div>
                        <Image
                          loader={trvLoader}
                          src="icon/apartment.svg"
                          alt="Apartment"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div>
                        <p className="mb-0 color-black ms-2 fs-12 fw-bold">Abu Dhabi (3N)</p>
                      </div>
                    </div>
                  </div> */}
                  </div>
                  {packageData?.Recommendations?.length > 0 && (
                    <div className="mt-1">
                      {packageData?.Recommendations.map((recc, recIx) => {
                        return (
                          <a
                            key={recIx}
                            className="d-inline-block bg-white rounded-5 color-black fs-12 text-decoration-none px-4 py-2 my-1 me-2"
                            href="#"
                          >
                            {recc}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-3 text-end">
                  <h2 className="fs-24 mb-0 color-orange fw-bold">
                    {aedNumberFormat(startingPrice)?.split(".")[0]}.
                    <sup>{aedNumberFormat(startingPrice)?.split(".")[1]}</sup>
                  </h2>
                  <p className="mb-0 fs-12 fw-bold color-black">
                    Starting Price per Person
                  </p>
                </div>
              </div>
            </div>
            <div className="HolidDayForm bg-blue py-3 rounded-2">
              <HolidayEnquiryForm bannerText={destinationName} isDetail={true} />
            </div>
            {/* <ModifySearchFormDetail destination={destinationName} fromDate={fromDate} setFromDate={setFromDate} adults={adults} setAdults={setAdults} children={children} setChildren={setChildren} setTotalPax={setTotalPax} modifyPackage={modifyPackage} /> */}
            <div className="FlightInfoDetailWraper my-4">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-8">
                  <div>
                    <ul
                      className="nav nav-pills mb-3 bg-grey p-3 border rounded-3 InfoTabs"
                      id="pills-tab"
                      role="tablist"
                    >
                      {/* <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="FlightInformation-tab" data-bs-toggle="pill" data-bs-target="#FlightInformation" type="button" role="tab" aria-controls="FlightInformation" aria-selected="true">Flight Information</button>
                                        </li> */}
                      {/* {!!packageData?.Overview && (
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="Overview-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#Overview"
                            type="button"
                            role="tab"
                            aria-controls="Overview"
                            aria-selected="false"
                          >
                            Overview
                          </button>
                        </li>
                      )} */}
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="Itinerary-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#Itinerary"
                          type="button"
                          role="tab"
                          aria-controls="Itinerary"
                          aria-selected="false"
                        >
                          Itinerary
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="Accommadation-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#Accommadation"
                          type="button"
                          role="tab"
                          aria-controls="Accommadation"
                          aria-selected="false"
                        >
                          Accommodations
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="InclusionExclusion-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#InclusionExclusion"
                          type="button"
                          role="tab"
                          aria-controls="InclusionExclusion"
                          aria-selected="false"
                        >
                          Inclusions & Exclusions
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="Notes-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#Notes"
                          type="button"
                          role="tab"
                          aria-controls="Notes"
                          aria-selected="false"
                        >
                          Important Notes
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      {/* <div className="tab-pane fade show active" id="FlightInformation" role="tabpanel" aria-labelledby="FlightInformation-tab">
                        <div className="border rounded-3 p-3 float-start w-100">
                          <ul className="nav nav-pills mb-3 departFlightTabs float-start" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button className="nav-link active" id="DepartFlight-tab" data-bs-toggle="pill" data-bs-target="#DepartFlight" type="button" role="tab" aria-controls="DepartFlight" aria-selected="true">Depart</button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button className="nav-link" id="ReturnFlight-tab" data-bs-toggle="pill" data-bs-target="#ReturnFlight" type="button" role="tab" aria-controls="ReturnFlight" aria-selected="false">Return</button>
                            </li>
                          </ul>
                          <div className="tab-content float-start w-100" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="DepartFlight" role="tabpanel" aria-labelledby="DepartFlight-tab">
                              <div className="bg-light-orange p-3">
                                <div className="row align-items-center m-0">
                                  <div className="col-12 col-sm-12 col-md-4">
                                    <p className="mb-0 fs-12 color-orange">Tue/Thu</p>
                                    <p className="mb-0 fs-12 color-black mt-2">Flight No: J2 5002</p>
                                  </div>
                                  <div className="col-12 col-sm-12 col-md-8">
                                    <div className="row align-items-center">
                                      <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                                        <h2 className="mb-0 fw-bold fs-20">DXB</h2>
                                        <p className="mb-0 fs-12 color-black mt-2">Dubai</p>
                                      </div>
                                      <div className="col-6 col-sm-6 col-md-6 col-lg-6 text-center">
                                        <p className="mb-0 fs-12 color-black">Depart- 06:55 AM</p>
                                        <p className="mb-0 fs-12 color-black">Arrive - 10:15 PM</p>
                                      </div>
                                      <div className="col-3 col-sm-3 col-md-3 col-lg-3 text-end">
                                        <h2 className="mb-0 fw-bold fs-20">AUH</h2>
                                        <p className="mb-0 fs-12 color-black mt-2">Abu Dhabi</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p className="mt-2 mb-0 fs-12 color-grey">Baggage Allowance: 23 Kg per person</p>
                            </div>
                            <div className="tab-pane fade" id="ReturnFlight" role="tabpanel" aria-labelledby="ReturnFlight-tab">Return</div>
                          </div>
                        </div> */}


                      <div
                        className="tab-pane fade show active"
                        id="Itinerary"
                        role="tabpanel"
                        aria-labelledby="Itinerary-tab"
                      >
                        {!!packageData?.Overview &&
                          <div className="border rounded-3 p-3 float-start w-100">
                            <h2 className="mb-0 color-blue fs-16 fw-bold">
                              Overview
                            </h2>
                            <hr className="color-orange my-2 w-25"></hr>
                            <div
                              className="fs-14"
                              dangerouslySetInnerHTML={{
                                __html: packageData?.Overview,
                              }}
                            />
                          </div>
                        }
                        <div className="border rounded-3 p-3 float-start w-100 mt-1">
                          <div className="accordion ItineraryAccordionMain" id="accordionPanelsStayOpenExample">
                            <h2 className="mb-0 color-blue fs-16 fw-bold">Itinerary</h2>
                            <hr className="color-orange my-2 w-25"></hr>
                            {packageData?.HolidayJourney.length > 0 &&
                              packageData.HolidayJourney.map((itinerary, ix) => {
                                return <div key={ix} className="accordion-item border-0">
                                  <h2 className="accordion-header border-0" id="panelsStayOpen-headingOne">
                                    <button type="button" className={ix == 0
                                      ? "bg-transparent accordion-button shadow-none border-0 px-0 bg-white"
                                      : "bg-transparent accordion-button border-0 px-0 bg-white collapsed"
                                    }
                                      data-bs-toggle="collapse" data-bs-target={"#day" + ix}
                                      aria-expanded="true" aria-controls={"day" + ix}
                                    >
                                      <div className="d-flex align-items-center w-100">
                                        <div className="DayTextBox pe-0">
                                          <p className="fs-18 mb-0 fw-bold color-grey">Day {ix + 1}</p>
                                        </div>
                                        <div>
                                          <p className="ms-3 mb-0 color-black fw-bold fs-16">{itinerary.Title}</p>
                                        </div>
                                      </div>
                                    </button>
                                  </h2>
                                  <div id={"day" + ix}
                                    className={
                                      ix == 0
                                        ? "bg-transparent accordion-collapse border-0 collapse show"
                                        : "bg-transparent accordion-collapse border-0 collapse"
                                    }
                                    aria-labelledby="panelsStayOpen-headingOne"
                                  >
                                    <div className="accordion-body">
                                      <div className="row w-100">
                                        {!!itinerary.ImageUrl && (
                                          <div className="col-12">
                                            <Image
                                              className="w-100 h-auto"
                                              src={itinerary.ImageUrl}
                                              width={200}
                                              height={200}
                                              alt="itinerary-img"
                                              loader={sfLoader}
                                            />
                                          </div>
                                        )}
                                        <div className="col-sm-12">
                                          <div
                                            className="listStyleNumber fs-14"
                                            dangerouslySetInnerHTML={{
                                              __html: itinerary.Description,
                                            }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              }
                              )}
                          </div>
                        </div>
                      </div>
                      {/* <div
                        className={
                          !packageData?.Overview
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                        id="Itinerary"
                        role="tabpanel"
                        aria-labelledby="Itinerary-tab"
                      >
                        
                      </div> */}
                      <div className="tab-pane fade" id="Accommadation" role="tabpanel" aria-labelledby="Accommadation-tab">
                        <div className="border rounded-3 p-3 float-start w-100">
                          <div>
                            <div className="row">
                              <div className="col-sm-12">
                                {!!stdAccommadations?.Details[0]?.Title && (
                                  <div className="accordion" id="accordionExample">
                                    <div className="accordion-item position-relative">
                                      <button
                                        className="AccommadationSelectButton end-0 mt-1 me-5 bg-transparent color-green py-2 px-3 float-end border-0 position-absolute"
                                        onClick={() => {
                                          setSelectedAccommo(0);
                                          setTotalPrice(
                                            totalPax *
                                            packageData?.StandardPrice?.toFixed(
                                              2
                                            )
                                          );
                                          changeRating(0);
                                        }}
                                      >
                                        {selectedAccommo == 0 && (
                                          <i className="fa-solid fa-circle-check me-2"></i>
                                        )}
                                        {selectedAccommo == 0 ? (
                                          <span className="fw-bold">
                                            Selected
                                          </span>
                                        ) : (
                                          <span className="fw-bold color-blue">
                                            Select
                                          </span>
                                        )}
                                      </button>
                                      <h2
                                        className="accordion-header"
                                        id="headingOne"
                                      >
                                        <button
                                          className="accordion-button fw-bold"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseOne"
                                          aria-expanded="true"
                                          aria-controls="collapseOne"
                                        >
                                          Standard{" "}
                                          <span className="d-none d-md-block">
                                            (
                                            {aedNumberFormat(
                                              packageData?.StandardPrice?.toFixed(
                                                2
                                              )
                                            )}
                                            )
                                          </span>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="row">
                                            {stdAccommadations?.Details?.map(
                                              (acco, ix) => {
                                                return (
                                                  <div
                                                    key={ix}
                                                    className="col-12 col-sm-12 col-lg-6 col-xl-4"
                                                  >
                                                    <div className="card bg-grey">
                                                      {!!acco.ImageUrl && (
                                                        <Image
                                                          className="h-auto w-100 rounded-3"
                                                          loader={sfLoader}
                                                          src={acco.ImageUrl}
                                                          alt="Deals img"
                                                          width={176}
                                                          height={43}
                                                        />
                                                      )}
                                                      <div className="card-body ">
                                                        <h3 className="fs-16 card-title mb-0 fw-bold">
                                                          {acco.Title}
                                                        </h3>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {!!dlxAccommadations?.Details[0]?.Title && (
                                  <div className="accordion" id="accordionDlx">
                                    <div className="accordion-item my-3 position-relative">
                                      <button
                                        className="AccommadationSelectButton end-0 mt-1 me-5 bg-transparent color-green py-2 px-3 float-end border-0 position-absolute"
                                        onClick={() => {
                                          setSelectedAccommo(1);
                                          setTotalPrice(
                                            totalPax *
                                            packageData?.DeluxePrice?.toFixed(
                                              2
                                            )
                                          );
                                          changeRating(1);
                                        }}
                                      >
                                        {selectedAccommo == 1 && (
                                          <i className="fa-solid fa-circle-check me-2"></i>
                                        )}
                                        {selectedAccommo == 1 ? (
                                          <span className="fw-bold">
                                            Selected
                                          </span>
                                        ) : (
                                          <span className="fw-bold color-blue">
                                            Select
                                          </span>
                                        )}
                                      </button>
                                      <h2
                                        className="accordion-header"
                                        id="headingOne"
                                      >
                                        <button
                                          className="accordion-button fw-bold"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseDlx"
                                          aria-expanded="true"
                                          aria-controls="collapseDlx"
                                        >
                                          Deluxe{" "}
                                          <span className="d-none d-md-block">
                                            (
                                            {aedNumberFormat(
                                              packageData?.DeluxePrice?.toFixed(
                                                2
                                              )
                                            )}
                                            )
                                          </span>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseDlx"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionDlx"
                                      >
                                        <div className="accordion-body">
                                          <div className="row">
                                            {dlxAccommadations?.Details?.map(
                                              (acco, ix) => {
                                                return (
                                                  <div
                                                    key={ix}
                                                    className="col-12 col-sm-12 col-md-2 col-lg-4"
                                                  >
                                                    <div className="card bg-grey">
                                                      {!!acco.ImageUrl && (
                                                        <Image
                                                          className="h-auto w-100 rounded-3"
                                                          loader={sfLoader}
                                                          src={acco.ImageUrl}
                                                          alt="Deals img"
                                                          width={176}
                                                          height={43}
                                                        />
                                                      )}
                                                      <div className="card-body ">
                                                        <h3 className="fs-16 card-title mb-0 fw-bold">
                                                          {acco.Title}
                                                        </h3>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {!!prmAccommadations?.Details[0]?.Title && (
                                  <div className="accordion" id="accordionPrm">
                                    <div className="accordion-item position-relative">
                                      <button
                                        className="AccommadationSelectButton end-0 mt-1 me-5 bg-transparent color-green py-2 px-3 float-end border-0 position-absolute"
                                        onClick={() => {
                                          setSelectedAccommo(2);
                                          setTotalPrice(
                                            totalPax *
                                            packageData?.PremiumPrice?.toFixed(
                                              2
                                            )
                                          );
                                          changeRating(2);
                                        }}
                                      >
                                        {selectedAccommo == 2 && (
                                          <i className="fa-solid fa-circle-check me-2"></i>
                                        )}
                                        {selectedAccommo == 2 ? (
                                          <span className="fw-bold">
                                            Selected
                                          </span>
                                        ) : (
                                          <span className="fw-bold color-blue">
                                            Select
                                          </span>
                                        )}
                                      </button>
                                      <h2
                                        className="accordion-header"
                                        id="headingOne"
                                      >
                                        <button
                                          className="accordion-button fw-bold"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapsePrm"
                                          aria-expanded="true"
                                          aria-controls="collapsePrm"
                                        >
                                          Premium{" "}
                                          <span className="d-none d-md-block">
                                            (
                                            {aedNumberFormat(
                                              packageData?.PremiumPrice?.toFixed(
                                                2
                                              )
                                            )}
                                            )
                                          </span>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapsePrm"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionPrm"
                                      >
                                        <div className="accordion-body">
                                          <div className="row">
                                            {prmAccommadations?.Details?.map(
                                              (acco, ix) => {
                                                return (
                                                  <div
                                                    key={ix}
                                                    className="col-12 col-sm-12 col-md-2 col-lg-4"
                                                  >
                                                    <div className="card bg-grey">
                                                      {!!acco.ImageUrl && (
                                                        <Image
                                                          className="h-auto w-100 rounded-3"
                                                          loader={sfLoader}
                                                          src={acco.ImageUrl}
                                                          alt="Deals img"
                                                          width={176}
                                                          height={43}
                                                        />
                                                      )}
                                                      <div className="card-body ">
                                                        <h3 className="fs-16 card-title mb-0 fw-bold">
                                                          {acco.Title}
                                                        </h3>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="InclusionExclusion"
                        role="tabpanel"
                        aria-labelledby="InclusionExclusion-tab"
                      >
                        <div className="border rounded-3 p-3 float-start w-100">
                          <div className="row">
                            <div className="col-sm-12 col-lg-6">
                              <h2 className="mb-0 color-blue fs-16 fw-bold">
                                Inclusions
                              </h2>
                              <hr className="color-orange my-2 w-25"></hr>
                              <div
                                id="SquareOrangeList"
                                className="fs-14"
                                dangerouslySetInnerHTML={{ __html: inclusions }}
                              />
                              {/* <ol className="InclusionsList my-4">
                                  {inclusions.map((incl, ix) => {
                                    return <li key={ix}>{incl.Detail}</li>
                                  })}
                                </ol> */}
                            </div>
                            <div className="col-sm-12 col-lg-6">
                              <h2 className="mb-0 color-blue fs-16 fw-bold">
                                Exclusions
                              </h2>
                              <hr className="color-orange my-2 w-25"></hr>
                              <div
                                id="SquareOrangeList"
                                className="fs-14"
                                dangerouslySetInnerHTML={{ __html: exclusions }}
                              />
                              {/* <ol className="InclusionsList my-4">
                                  {exclusions.map((excl, ix) => {
                                    return <li key={ix}>{excl.Detail}</li>
                                  })}
                                </ol> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="Notes"
                        role="tabpanel"
                        aria-labelledby="Notes-tab"
                      >
                        <div className="border rounded-3 p-3 float-start w-100">
                          <div className="col-12">
                            <h2 className="mb-2 color-blue fs-16 fw-bold">
                              Important Notes:
                            </h2>
                            <hr className="color-orange my-2 w-25"></hr>
                            <div
                              id="SquareOrangeList"
                              dangerouslySetInnerHTML={{
                                __html: packageData.Notes,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-4">
                  <FlightInfoSideBar
                    data={packageData}
                    rating={selectedRating}
                    totalPrice={totalPrice}
                    setOpenInquiryModal={setOpenInquiryModal}
                    adults={adults}
                    children={children}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="priceSummaryMobileStrip d-lg-none bg-blue position-fixed bottom-0 end-0 start-0">
          <div className="row m-0 align-items-center">
            <div className="col-7 col-sm-7">
              <p className="fs-12 mb-0 color-white">Total Amount</p>
              <p className="fs-18 mb-0 color-white fw-bold">
                {aedNumberFormat(totalPrice)?.split(".")[0]}.
                <sup>{aedNumberFormat(totalPrice)?.split(".")[1]}</sup>
              </p>
              <button
                className="btn p-0 color-white border-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <span className="fs-12">Price Details</span>
                <i className="fa-solid fa-chevron-right ms-2 fs-10"></i>
              </button>
              <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-body">
                  <button
                    type="button"
                    className="btn-close text-reset position-absolute end-0 top-0 me-3 mt-3"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                  <FlightInfoSideBar
                    data={packageData}
                    rating={selectedRating}
                    totalPrice={totalPrice}
                    setOpenInquiryModal={setOpenInquiryModal}
                    adults={adults}
                    children={children}
                  />
                </div>
              </div>
            </div>
            <div className="col-5 col-sm-5 text-end">
              <button className="bg-orange color-white fs-14 fw-bold border-0 rounded-3 px-3 py-3 my-3 w-100" onClick={() => { setOpenInquiryModal(true); }}>Enquire</button>
            </div>
          </div>
        </div>

        <Suspense>
          <InquiryPopup
            openInquiryModal={openInquiryModal}
            setOpenInquiryModal={setOpenInquiryModal}
            package={packageData}
            adults={adults}
            children={children}
            travelDate={fromDate}
            totalPrice={totalPrice}
            location={destinationName}
          />
        </Suspense>
        <Footer></Footer>
      </div>
      {/* } */}
    </>
  );
}
