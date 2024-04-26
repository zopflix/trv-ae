"use client";
import { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFormattedDate8,trackMixpanelEvent } from "../helpers/common";
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { sendHolidayInquiry } from "../services/holidayService";
import axios from "axios";

import {
    checkMaxDateRange,
    generateId,
    getDisplayCabin,
    getDisplayClass,
    getMaxDatePicker,
  } from "../helpers/common";

export default function FlightInqueryForm(props) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [mobile, setMobile] = useState("");
  const path = usePathname();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tripType, setTripType] = useState(1);
  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");
 
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  

  const [enquireMode, setEnquireMode] = useState(false);

  useEffect(() => {
    const keywords = ['listing'];
    if (keywords.some(keyword => path.includes(keyword))) {
      setEnquireMode(true);
    }
}, [path]);


  useEffect(() => {
    setFromCode(props.data.fromCode);
    setToCode(props.data.toCode);
    setFromDate(props.data.fromDate);
    setToDate(props.data.toDate);
    setTripType(props.data.tripType);

    
  }, []);


  const submitInquiry = async () => {
    setIsSubmitting(true);
    setHasError(false);
    
    if (
      fromDate &&
      mobile.length == 10 &&
      !!email &&
      isValidEmail &&
      (tripType !== 1 || (tripType === 1 && toDate !== ""))
    ) {
      const res = await axios.get("https://geolocation-db.com/json/");

      let payload = {
        name: 'Traveller',
        packageName: `${props?.toCity}${'(' + toCode + ')'}`,
        travelDate: getFormattedDate8(fromDate),
        email: email,
        mobile: '91-' + mobile,
        price: 0,
        adults: props?.data?.travelers?.adults,
        children: props?.data?.travelers?.children,
        placeFrom: `${props?.fromCity}${'(' + fromCode + ')'}`,
        ip: !!res?.data?.IPv4 ? res?.data?.IPv4 : '',
        referer: searchParams?.get('utm_source') ? (searchParams?.get('utm_source') + ((searchParams?.get('utm_medium') ? (' | ' + searchParams?.get('utm_medium')) : '') + (searchParams?.get('utm_campaign') ? ' | ' + searchParams?.get('utm_campaign') : ''))) : '',
        packType: 'Leisure',
        location: (path.includes('india-tour-packages') ? "Domestic" : props?.toCity),
        mode:enquireMode
      }
      if (tripType === 1 && toDate !== "") {
        payload.returnDate = getFormattedDate8(toDate);
    }

      await trackMixpanelEvent("Holiday_Inquiry_Popup", null, false, null, payload);

      sendHolidayInquiry(payload).then(res => {
        if (res) {
          props.setopenFlightEnquiryForm(false);
          setIsSubmitting(false);
          window.location.href = `/holidays/thank-you/?id=${res}`;
        } else {
          setHasError(true);
          setIsSubmitting(false);
        }
      });
    } else {
      setHasError(true);
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 d-none d-md-inline-block"></div>
        <div className="col-12 col-md-6">
          <div className="shadow p-4 my-2 bg-white">
            <h4 class="mb-0 fw-bold color-blue mb-2 text-center">
              Excellent Choice!
            </h4>
            <p className="text-center fs-14">
              Please share the details so we can get back to you.
            </p>
            <form>
              <div className="d-flex">
                <div className="d-flex">
                  <div>
                    <label
                      className={
                        tripType == 1
                          ? "cursor-pointer form-check-label fs-14 bg-orange color-white px-3 py-1 rounded-pill active"
                          : "cursor-pointer form-check-label fs-14 bg-grey px-3 py-1 rounded-pill"
                      }
                      htmlFor="onway1"
                      onClick={() => {
                        setTripType(1);
                      }}
                    >
                      One Way
                    </label>
                  </div>
                  <div className="ms-2">
                    <label
                      className={
                        tripType == 2
                          ? "cursor-pointer form-check-label fs-14 bg-orange color-white px-3 py-1 rounded-pill active"
                          : "cursor-pointer form-check-label fs-14 bg-grey px-3 py-1 rounded-pill"
                      }
                      htmlFor="roundtrip1"
                      onClick={() => {
                        setTripType(2);
                        let _date = new Date(fromDate);
                        setToDate(new Date(_date.setDate(_date.getDate() + 3)));
                      }}
                    >
                      Round Trip
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-6 my-2">
                  {props.fromCity}{" "}
                </div>
                <div className="col-12 col-lg-6 my-2">
                  {props.toCity}
                </div>
              </div>
              <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <div className="input-group mb-3 d-flex flex-nowrap w-100 position-relative">
                        <span className="input-group-text bg-transparent border-end-0">
                          <img className="img-fluid" src="https://assets.faremaze.com/fm-bh/calender.svg" alt="calender" />
                        </span>
                        <ReactDatePicker
                          onKeyDown={(e) => e.preventDefault()}
                          selected={fromDate}
                          onFocus={(e) => e.target.blur()}
                          onChange={(date) => {
                            setFromDate(date);
                            let maxDate = getMaxDatePicker();
                            let isMaxFromDate = checkMaxDateRange(maxDate, date, 3);
                            if (tripType == 2 && date != null) {
                              let departDate = new Date(date);
                              if (!isMaxFromDate) {
                                setToDate(new Date(departDate.setDate(departDate.getDate() + 3)));
                              }
                              else {
                                setToDate(maxDate);
                              }
                              document.getElementById("modalRtnDate").focus();
                            }
                          }}
                          isClearable={false}
                          className="form-control"
                          scrollableYearDropdown={true}
                          minDate={new Date()}
                          showYearDropdown={true}
                          showMonthDropdown={true}
                          yearDropdownItemNumber={100}
                          maxDate={getMaxDatePicker()}
                        />
                      </div>
                    </div>

                    {tripType == 2 &&
                      <div className="col-12">
                        <div className="input-group mb-3 d-flex flex-nowrap w-100">
                          <span className="input-group-text bg-transparent border-end-0">
                            <img className="img-fluid" src="https://assets.faremaze.com/fm-bh/calender.svg" alt="calender" />
                          </span>
                          <ReactDatePicker
                            id="modalRtnDate"
                            onKeyDown={(e) => e.preventDefault()}
                            isClearable={false}
                            disabled={tripType == 1}
                            selected={toDate}
                            onFocus={(e) => e.target.blur()}
                            onChange={(date) => setToDate(date)}
                            className="form-control"
                            scrollableYearDropdown={true}
                            minDate={fromDate}
                            showYearDropdown={true}
                            showMonthDropdown={true}
                            yearDropdownItemNumber={100}
                            maxDate={getMaxDatePicker()}
                          />
                        </div>
                      </div>
                    }
                  </div>
                </div>
              <div className="row">
              <div className="FormGroup mb-2">
                  <label className="mb-1">Email</label>
                  <div className="position-relative">
                    <div className="icon position-absolute top-50 bottom-50 m-auto">
                      <Image
                        className="h-auto"
                        loader={trvLoader}
                        src="icon/email-grey-icon.svg"
                        alt="Email Icon"
                        width={25}
                        height={25}
                      />
                    </div>
                    <input
                      className={
                        (hasError && !email) || isValidEmail == false
                          ? "form-control border-red"
                          : "form-control"
                      }
                      type="text"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        var validRegex =
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (
                          e.target.value.match(validRegex) &&
                          e.target.value.match(validRegex).length > 0
                        )
                          setIsValidEmail(true);
                        else setIsValidEmail(null);
                      }}
                      onBlur={(e) => {
                        if (e.target.value.length > 0) {
                          var validRegex =
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                          setIsValidEmail(
                            (e.target.value.match(validRegex) &&
                              e.target.value.match(validRegex).length > 0) ==
                              true
                          );
                        }
                      }}
                      onFocus={(e) => {
                        if (e.target.value.length > 0) {
                          setIsValidEmail(null);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="FormGroup mb-2">
                  <label className="mb-1">Contact No.</label>
                  <div className="position-relative">
                    <div className="icon pt-2 position-absolute top-50 bottom-50 m-auto">
                      <span className="fs-14">+91</span>
                    </div>
                    <input
                      className={
                        hasError && mobile.length < 10
                          ? "form-control border-red"
                          : "form-control"
                      }
                      type="text"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      onPaste={(e) => e.preventDefault()}
                      maxLength={10}
                      placeholder="Contact Number"
                      value={mobile}
                      onChange={(e) => {
                        var allowedChars = "0123456789";
                        let cVal = e.target.value;
                        if (
                          allowedChars.indexOf(
                            e.target.value.substring(e.target.value.length - 1)
                          ) == -1
                        ) {
                          cVal = cVal.substring(0, cVal.length - 1);
                        }
                        setMobile(cVal);
                      }}
                    />
                  </div>
                </div>              </div>
              <div className="row">
                <div className="col-12">
                  <button className="w-100 bg-orange color-white border-0 py-2 rounded-2 fs-14"
                                      type="button"
                                      disabled={isSubmitting}
                                      onClick={() => submitInquiry()}
                  
                  >
                  {isSubmitting ? (
                      <div className="spinner-border" role="status"></div>
                    ) : (
                      <span>Enquire Now</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
