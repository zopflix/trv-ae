"use client"
import { useEffect, useState,useRef } from 'react'
import { cloneData, getAdultYearOptions, getAge, getBrowser, getChildYearOptions, getFormattedDate8, getCreditCardYearOptions, getDeviceName, getDiffFromMinutes, getFirstAdultYearOptions, getFormattedDate4, getFormattedDate6, getFormattedDate7, getFormattedTime, getInfantsYearOptions, isJsonString, isValidCardExpiry, isValidDayOfMonth, numberFormat, trackMixpanelEvent, gtag_report_conversion } from '../helpers/common';
import Layout from '../components/inner-layout';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/bootstrap.css";
import { dayOptions, monthOptions } from '../helpers/constants';
import FlightDetailFlap from '../components/flight-detail-flap';
import InputMask from "react-input-mask";
import creditCardType from 'credit-card-type';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { countries } from '../helpers/countries-info';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getPlaceDetail } from '../services/flightService';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { bookFlight } from '../services/bookingService';
import { contactNumber ,flightContactNumber, holidayContactNumber} from '../config';
import Image from "next/image"
import { airlineLogoLoader, trvLoader } from "../helpers/imageKitLoader"
import InnterFooter from '../components/inner-footer';
import SkipNGoToHome from '../components/_skip_go_home';
import { usePathname } from "next/navigation";

export default function CheckoutPage() {
    const path = usePathname();

    const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);

    const [flight, setFlightData] = useState(null);
    const [tripTotalPrice, setTripTotalPrice] = useState(null);
    const [emailInput, setEmailInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [emailSuggestions, setEmailSuggestions] = useState(["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "icloud.com", "aol.com", "msn.com"]);
    const [phone, setPhone] = useState("");
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [currentTab, setCurrentTab] = useState(1);
    const [passangers, setPassangers] = useState([]);
    const [totalPassangers, setTotalPassengers] = useState(0);
    const [avgPrice, setAvgPrice] = useState(null);
    const [totalTax, setTotalTax] = useState(0);
    const [isInvalidTravellers, setIsInvalidTravellers] = useState(false);
    const [sssPassangers, setSSSPassengers] = useState(0);
    const [isInvalidCardNo, setIsInvalidCardNo] = useState(false);
    const [showManualAddress, setShowManualAddress] = useState(false);
    const [restrictedCountry, setRestrictedCountry] = useState("in");
    const [value, setValue] = useState(null);
    const [editPsgs, setEditPsgs] = useState(null);
    const [isBookingDone, setIsBookingDone] = useState(false);
    const [isInvalidCardDetail, setIsInvalidCardDetail] = useState(false);
    const [isInvalidBillingDetail, setIsInvalidBillingDetail] = useState(false);
    const [isInvalidUpdatePsg, setIsInvalidUpdatePsg] = useState(false);
    const [openBackModal, setOpenBackModal] = useState(false);
    const [isBackLoading, setIsBackLoading] = useState(false);
    const [userIp, setUserIp] = useState("");
    const [currentActiveAcd, setCurrentActiveAcd] = useState(0);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
    const errorInputRef = useRef(null);

    const [billingDetail, setBillingDetail] = useState({
        country: "India",
        state: "",
        countryCode: "IN",
        cellCountryCode: "+91",
        city: "",
        zip: "",
        street: "",
        contactDetail: {
            contactNo: "",
            email: "",
        },
    });
    const [cardDetail, setCardDetail] = useState({
        cardType: "",
        cardNo: "",
        cardHolderName: "",
        eXPDate: "",
        cvv: "",
        expMonth: "",
        expYear: "",
    });

    let invalidTravellers = [];
    let psgs = [];
    let isInvalidContact = false;


    String.prototype.replaceAt = function (index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }
        return this.substring(0, index) + replacement + this.substring(index + 1);
    };

    const setUserDetailsInSessionStorage = (fieldName, value) => {
        if (sessionStorage.getItem("userDetails")) {
            let sessionDetails = JSON.parse(sessionStorage.getItem("userDetails"));
            sessionDetails[fieldName] = value;
            sessionStorage.setItem("userDetails", JSON.stringify(sessionDetails));
        }
        else {
            let data = {};
            data[fieldName] = value;
            sessionStorage.setItem("userDetails", JSON.stringify(data));
        }
    }

    useEffect(() => {
        const keywords = ['listing', 'checkout', 'flights', '/results', 'flight'];
        if (keywords.some(keyword => path.includes(keyword))) {
            setDisplayContactNumber(flightContactNumber);
        }
    }, [path, flightContactNumber]);

    const goToNextTab = (tab, checkValidation = false) => {
     
        let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (
          !billingDetail.contactDetail.email.match(validRegex) ||
          billingDetail.contactDetail.email.match(validRegex).length < 1
        ) {
          isInvalidContact = true;
          setIsValidEmail(false);
        } else setIsValidEmail(true);
    
        if (billingDetail.contactDetail.contactNo.length != 10) {
          isInvalidContact = true;
          setIsValidPhoneNumber(false);
        } else setIsValidPhoneNumber(true);
    
        const hasInvalidAge = passangers.some((x) => x.isAgeValid == false);
        if (hasInvalidAge) return;
    
        psgs = cloneData(passangers);
        setEditPsgs(psgs);
        invalidTravellers = passangers.filter(
          (x) =>
            !x.gender ||
            x.gender <= 0 ||
            !x.firstName ||
            !x.lastName ||
            !x.dayOfBirth ||
            !x.monthOfBirth ||
            !x.yearOFBirth ||
            !x.paxTitle
        );
    
        if (isInvalidContact) {
            errorInputRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          } else {
            setIsInvalidTravellers(false);
          }
          if (invalidTravellers.length > 0 || isInvalidContact) {
            setIsInvalidTravellers(true);
            errorInputRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
           setIsInvalidTravellers(invalidTravellers.length > 0);
          if (invalidTravellers.length > 0 || isInvalidContact) return;
          setIsInvalidTravellers(false);
    
    return true
      };

    const isPassengerValid = (paxType, allPsgs, isUpdate = false) => {
        allPsgs.forEach((psg, index) => {
            psg.dob = new Date(psg.yearOFBirth, psg.monthOfBirth - 1, psg.dayOfBirth).toLocaleDateString();
            let psgs = [...allPsgs];
            let age = getAge(psg.monthOfBirth + "/" + psg.dayOfBirth + "/" + psg.yearOFBirth,
                flight.trips.length > 1
                    ? flight.trips[1].listOfFlight[0].departeddate
                    : flight.trips[0].listOfFlight[0].departeddate
            );
            if (psg.dayOfBirth > 0 && psg.monthOfBirth > 0 && psg.yearOFBirth > 0) {
                if (paxType == 5) {
                    if (psg.paxType == 5) {
                        let dob = new Date(psg.yearOFBirth, psg.monthOfBirth - 1, psg.dayOfBirth);
                        let currentDate = new Date();
                        psgs[index].isAgeValid = currentDate >= dob && age < 2;
                        if (psgs[index].isAgeValid) {
                            psgs[index].isValidPassenger = age < 2;
                        }
                        isUpdate ? setEditPsgs(psgs) : setPassangers(psgs);
                    }
                } else if (paxType == 1) {
                    if (psg.paxType == 1 && psg.paxNumber == 1) {
                        psgs[index].isValidPassenger = age >= 18;
                        isUpdate ? setEditPsgs(psgs) : setPassangers(psgs);
                    } else if (psg.paxType == 1 && psg.paxNumber > 1) {
                        psgs[index].isValidPassenger = age >= 11;
                        isUpdate ? setEditPsgs(psgs) : setPassangers(psgs);
                    }
                } else if (paxType == 3) {
                    if (psg.paxType == 3) {
                        psgs[index].isValidPassenger = age >= 2 && age <= 11;
                        isUpdate ? setEditPsgs(psgs) : setPassangers(psgs);
                    }
                }
            }
        });
    };

    const handleChange = (e, fieldName, index, isUpdate = false) => {
        let result = e.target.value.replace(/[^a-z]/gi, "");
        if (fieldName == "firstName") {
            result = e.target.value.replace(/[^a-z ]/gi, "");
        }
        if (isUpdate) {
            let psanggers = [...editPsgs];
            psanggers[index][fieldName] = result;
            setEditPsgs(psanggers);
        }
        else {
            let psanggers = [...passangers];
            psanggers[index][fieldName] = result;
            setUserDetailsInSessionStorage("passengers", psanggers);
            setPassangers(psanggers);
        }
    };

    const confirmBooking = () => {
        const goToNextTabResult = goToNextTab();

        if (isBookingDone) return;


        // //Validating the card detail
        // const isInvalidCardDetail =
        //     !cardDetail.cardType || !cardDetail.cardNo || !cardDetail.cardHolderName ||
        //     !cardDetail.expMonth || !cardDetail.expYear || !cardDetail.cvv ||
        //     !(cardDetail.cvv.length >= 3) || !cardDetail.isValidCardExpiryDate ||
        //     !(cardDetail.cardType == "american-express" ? cardDetail.cardNo.length == 18 : cardDetail.cardNo.length == 19);
        // setIsInvalidCardDetail(isInvalidCardDetail);

        // validating billing detail
        const isInvalidDetail =
            !billingDetail.country || !billingDetail.state || !billingDetail.zip ||
            !billingDetail.street || !billingDetail.city || !billingDetail.contactDetail.email ||
            !billingDetail.contactDetail.contactNo || !isValidPhoneNumber || !isValidEmail;
        setIsInvalidBillingDetail(isInvalidDetail);


        if (isInvalidDetail) {
            let addressInfoElement = document.getElementById("billing-information");
            if (!goToNextTabResult) return;
            addressInfoElement.scrollIntoView();
          }
      

        if (
            !isInvalidDetail 
           
        ) {
            passangers.forEach((psg) => {
                // psg.dob = new Date(psg.yearOFBirth, psg.monthOfBirth - 1, psg.dayOfBirth).toLocaleDateString();
                psg.dayOfBirth = psg.dayOfBirth.toString();
                psg.yearOFBirth = psg.yearOFBirth.toString();
                psg.dob =
                    (psg.monthOfBirth.length == 2
                        ? psg.monthOfBirth
                        : "0" + psg.monthOfBirth) +
                    "/" +
                    (psg.dayOfBirth.length == 2 ? psg.dayOfBirth : "0" + psg.dayOfBirth) +
                    "/" +
                    psg.yearOFBirth;
                psg.monthOfBirth = parseInt(psg.monthOfBirth);
            });

            //Validating Infant Age
            const hasInvalidAge = passangers.some((x) => x.isAgeValid == false);
            if (hasInvalidAge) return;

            //Validating Passengers Age
            const hasInvalidPassengers = passangers.some(x => x.isValidPassenger == false);
            if (hasInvalidPassengers) return;

            setIsBookingDone(true);

            let cDetail = { ...cardDetail };
            cDetail.cardNo = cDetail.cardNo.replaceAll(" ", "");
            cDetail.eXPDate =
                (cDetail.expMonth > 9 ? cDetail.expMonth : "0" + cDetail.expMonth) +
                "/" +
                cardDetail.expYear.toString().substring(2);

            let bDetail = { ...billingDetail };
            bDetail.contactDetail.contactNo = bDetail.contactDetail.contactNo
                .replaceAll(" ", "")
                .replace(/[^a-zA-Z0-9 ' ']/g, "");
            let utmSouceValue = "";
            let utmTermValue = "";
            let referer = "";
            const searchId = localStorage.getItem("currentSearchId");
            const item = window.localStorage.getItem(searchId);
            if (isJsonString(atob(item))) {
                let paramsData = JSON.parse(atob(item));
                if (paramsData) {
                    utmSouceValue = paramsData.utm_source;
                    utmTermValue = paramsData.utm_term;
                    referer = paramsData.referer;
                }
            } else {
                var paramsData1 = new URLSearchParams(atob(item));
                if (paramsData1) {
                    utmSouceValue = paramsData1.get("utm_source");
                    utmTermValue = paramsData1.get("utm_term");
                    referer = paramsData1.get("referer");
                }
            }

            let dataToSend = {
                contract: flight,
                paymentDetail: {
                    passangers: passangers,
                    billingDetails: bDetail,
                    // cardDetails: cDetail,
                },
                resultIndex: flight.resultIndex,
                traceId: flight.traceId,
                utm_source: utmSouceValue,
                utm_term: utmTermValue,
                referer: referer,
                // crmId: crmId.toString(),
                browser: getBrowser(),
                device: getDeviceName(),
                user_ip: userIp,
                saverService: null,
                searchId: searchId,
            };

            localStorage.setItem("booking_data", JSON.stringify(dataToSend));
            setShowLoader(true)
            console.log("Book API Called")
            bookFlight(dataToSend).then(async (res) => {
                gtag_report_conversion();
                await trackMixpanelEvent("Make-Payment-Button-International");
                console.log("Response Recieved =>" + JSON.stringify(res));
                localStorage.removeItem("fsuccessPath");
                localStorage.removeItem("fpendingPath");
                const parm = new URLSearchParams(window.location.search);
                let utmSourceVal = "";
                if (parm) utmSourceVal = parm.get("utm_source");

                console.log("Response Recieved  Searalized=>" + JSON.stringify(res));
                if (res && !res.isBookingError && !!res.encodedData) {
                    await trackMixpanelEvent("Book_Button_Success", flight, true, bDetail);
                    window.location.href = "/booking-status?id=" + res.encodedData + "&utm_source=" + utmSourceVal;
                    setShowLoader(false)
                }

                // else {
                //     await trackMixpanelEvent("Book_Button_Success", flight, false, bDetail);
                //     localStorage.setItem("bookingInformation", JSON.stringify(res));
                //     window.location.href = "/confirmation/pending";
                //     setShowLoader(false)
                // }
            });
        }
    }

    useEffect(() => {
        let detail = { ...billingDetail };
        if (value)
            detail.street = value.label;
        else detail.street = "";
        setBillingDetail(detail);
    }, [value]);

    useEffect(() => {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (
            billingDetail.contactDetail &&
            !!billingDetail.contactDetail?.contactNo &&
            !!billingDetail.contactDetail?.email &&
            billingDetail.contactDetail?.email?.match(validRegex) &&
            billingDetail.contactDetail?.contactNo?.length == 10
        ) {
            (async () => {
                await trackMixpanelEvent("Contact_Information", flight, false, billingDetail);
            })();
        }
    }, [
        billingDetail.contactDetail.email,
        billingDetail.contactDetail.contactNo,
    ]);

    useEffect(() => {
        const item = window.localStorage.getItem("currentFlight");
        const flight = item ? JSON.parse(item) : null;
        setFlightData(flight);

        let splittedPrice = Math.round(flight.totalPrice);
        setTripTotalPrice(splittedPrice);
        let flightPrice = Math.round(flight.totalPrice);

        let totalPassangers = 0;
        let sssPassengers = 0;
        let taxAmount = 0
        flight.fareDetails.forEach((fare) => {
            if (fare.totalFareAmount > 0) {
                totalPassangers += fare.noofPax;
            }
            if (fare.totalTaxAmount > 0)
                taxAmount += fare.totalTaxAmount;

            sssPassengers += fare.noofPax;
        });

        if (flight.serviceFee > 0)
            taxAmount += flight.serviceFee;

        setSSSPassengers(sssPassengers);
        setTotalPassengers(totalPassangers);
        setTotalTax(taxAmount);

        let avgPrice = flightPrice / totalPassangers;
        setAvgPrice(avgPrice);

        let travellers = [];
        let totalTaxAmount = 0;
        if (flight && flight.fareDetails) {
            flight.fareDetails.map((element) => {
                totalTaxAmount += element.totalTaxAmount;
                for (let i = 0; i < element.noofPax; i++) {
                    travellers.push({
                        paxTitle: "",
                        isValidDOB: true,
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        nationality: "",
                        dob: "",
                        gender: -1,
                        paxType: element.paxType,
                        displayPaxType: element.displayPaxType,
                        noofPax: element.noofPax,
                        paxNumber: i + 1,
                        passportExpiry: null,
                        passportIssueDate: null,
                        passportNo: "",
                    });
                }
            });
        }
        setPassangers(travellers);

        // SET FIELDS DATA FROM SESSION STORAGE
        if (sessionStorage.getItem("userDetails")) {
            let data = JSON.parse(sessionStorage.getItem("userDetails"));
            let bDetail = { ...billingDetail };

            // SET PASSENGERS
            if (data.passengers && data.passengers.length > 0 && data.passengers.length == travellers.length) {
                let counter = 0;
                let isPsgSame = data.passengers.every((psg) => {
                    counter++;
                    return psg.displayPaxType == travellers[counter - 1].displayPaxType;
                });
                if (isPsgSame) setPassangers(data.passengers);
            }

            // SET EMAIL
            if (!!data.email) {
                bDetail.contactDetail.email = data.email;
                let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (data.email.match(validRegex) && data.email.match(validRegex).length > 0) {
                    setIsValidEmail(true);
                } else {
                    setIsValidEmail(null);
                }
            }

            // SET CONTACT NO

            if (!!data.countryCode && !!data.cellCountryCode) {
                // let bDetail = { ...billingDetail };
                billingDetail.countryCode = data.countryCode;
                billingDetail.cellCountryCode = data.cellCountryCode;
                setPhone(data.cellCountryCode);
            }

            if (!!data.phoneNumber) {
                // let bDetail = { ...billingDetail };
                bDetail.contactDetail.contactNo = data.phoneNumber;
                setIsValidPhoneNumber(data.phoneNumber.length == 10);
            }
            setBillingDetail(bDetail);
        }
        document.body.classList.add("checkout-page");
        document.body.classList.add("ThreeTabs");
        (async () => {
            await trackMixpanelEvent("Payment_page_Load", flight);
            const res = await axios.get("https://geolocation-db.com/json/");
            setUserIp(res?.data?.IPv4);
        })();
        return () => {
            if (document.body.classList.contains("checkout-page"))
                document.body.classList.remove("checkout-page");
        }
    }, []);

    return (
        <>
            <Layout>
                {/* <Head></Head> */}
            </Layout>
            <section className='pt-5 pb-5 bg-grey'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                            <div className='row align-items-center'>
                                <div className='tab-block col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 col-xxl-2'>
                                    <button className='transparent-btn' onClick={async () => { setOpenBackModal(true); }}>
                                        <i className="me-3 fa-solid fa-arrow-left"></i>
                                        <span>Back to Results</span>
                                    </button>
                                </div>
                                {/* <div className='col-12 col-sm-12 col-md-8 col-lg-9 col-xl-10 col-xxl-10'>
                                    <nav className='checkout-tabs-step'>
                                        <div className="nav nav-tabs justify-content-between" id="nav-tab" role="tablist">
                                            <button className={currentTab == 1 ? "nav-link show active" : "nav-link fill-active"} id="contact-info-tab" type="button" onClick={() => goToNextTab(1)}>
                                                <span className='tabs-num'>1</span>
                                                <span className='tabs-text'>Contact</span>
                                            </button>
                                            <button className={currentTab == 2 ? "nav-link show active" : (currentTab > 2 ? "nav-link fill-active" : "nav-link")} id="traveler-info-tab" type="button" onClick={() => goToNextTab(2, true)}>
                                                <span className='tabs-num'>2</span>
                                                <span className='tabs-text'>Travelers</span>
                                            </button>
                                            <button className={currentTab == 3 ? "nav-link show active" : (currentTab > 3 ? "nav-link fill-active" : "nav-link")} id="payment-info-tab" type="button" onClick={() => goToNextTab(3, true)}>
                                                <span className='tabs-num'>3</span>
                                                <span className='tabs-text'>Payment</span>
                                            </button>
                                        </div>
                                    </nav>
                                </div> */}
                            </div>
                        </div>
                        {
                            flight &&
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                                <div className='row mt-3'>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8'>
                                        <div className='flycard-box p-3 br-5 mb-4 d-lg-none'>
                                            <div className='d-flex justify-content-between align-items-start'>
                                                <div className='flycard-air-img'>
                                                    <Image
                                                        className="h-auto w-100"
                                                        loader={trvLoader}
                                                        src="flycard-ariplane-img.svg"
                                                        alt="flycard img"
                                                        width={176}
                                                        height={43}
                                                    />
                                                </div>
                                                <div className='air-flight-price text-end'>
                                                    <button className='transparent-btn mb-5' type='button' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => setSelectedTabIndex(0)}>View Details</button>
                                                </div>
                                            </div>
                                            <div className='flycard-detail'>
                                                <div className='mt-2 d-flex align-item-center justify-content-center'>
                                                    <h5 className="mb-0 fw-bold">{flight.trips[0].listOfFlight[0].fromCode}</h5>
                                                    <i className={flight.trips.length > 1 ? "pt-1 fa-solid fa-arrow-right-arrow-left ms-2 me-2" : "pt-1 fa-solid fa-arrow-right-long ms-2 me-2"}></i>
                                                    <h5 className="mb-0 fw-bold">{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode}</h5>
                                                </div>
                                                <div className='mt-2 d-flex align-item-center justify-content-center'>
                                                    <span>{getFormattedDate6(flight.trips[0].listOfFlight[0].departeddate)} {flight.trips.length > 1 && "- " + getFormattedDate6(flight.trips[1].listOfFlight[0].departeddate)} | {flight.totalPassangers + (flight.totalPassangers > 1 ? " Passengers" : " Adult")} | {flight.displayCabin}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-step-main-box bg-white p-3 mb-4'>
                                            <div className='checkout-step-main-title'>
                                                <h5 className='mb-2 fw-bold'>Contact Information</h5>
                                                <div className="important-note mt-2"><span>We will send your ticket(s) and notify you of any flight status changes</span></div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6'>
                                                    <div className="input-group mb-3 form-group-icon">
                                                        <label className="form-label">Email (for E-Tickets Delivery)</label>
                                                        <input type="email" autoComplete='off' className={isValidEmail == false ? "p-3 form-control float-start w-100 field-error" : "p-3 form-control float-start w-100"} placeholder="Enter your Email*"
                                                            value={billingDetail.contactDetail.email}
                                                            onChange={(e) => {
                                                                e.target.value = e.target.value.toLowerCase();
                                                                setEmailInput(e.target.value);
                                                                if (e.target.value.length > 0) {
                                                                    if (e.target.value[e.target.value.length - 1] == "@") {
                                                                        setShowSuggestions(true);
                                                                        setEmailSuggestions(["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "icloud.com", "aol.com", "msn.com"]);
                                                                    }
                                                                    else if (e.target.value.includes("@")) {
                                                                        let defValues = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "icloud.com", "aol.com", "msn.com"];
                                                                        let suggestions = defValues.filter((x) => x.includes(e.target.value.split("@")[1]));
                                                                        setShowSuggestions(true);
                                                                        setEmailSuggestions(suggestions);
                                                                    }
                                                                    else {
                                                                        setShowSuggestions(false);
                                                                    }
                                                                    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                                    if (
                                                                        e.target.value.match(validRegex) &&
                                                                        e.target.value.match(validRegex).length >
                                                                        0
                                                                    ) {
                                                                        setIsValidEmail(true);
                                                                        setUserDetailsInSessionStorage("email", e.target.value);
                                                                    } else {
                                                                        setIsValidEmail(null);
                                                                    }
                                                                }
                                                                let detail = { ...billingDetail };
                                                                detail.contactDetail.email = e.target.value;
                                                                setBillingDetail(detail);
                                                            }}
                                                            onBlur={(e) => {
                                                                if (e.target.value.length > 0) {
                                                                    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                                    setIsValidEmail((e.target.value.match(validRegex) && e.target.value.match(validRegex).length > 0) == true);
                                                                }
                                                            }}
                                                            onFocus={(e) => {
                                                                if (e.target.value.length > 0) {
                                                                    setIsValidEmail(null);
                                                                }
                                                            }}
                                                        />
                                                        {isValidEmail == true && (
                                                            <Image
                                                                className="icon"
                                                                loader={trvLoader}
                                                                src="icon/green-tick-icon.png"
                                                                alt="green-tick-icon"
                                                                width={176}
                                                                height={43}
                                                            />
                                                        )}
                                                        {(isValidEmail == false || (isInvalidBillingDetail && !billingDetail.contactDetail.email)) &&
                                                            <Image
                                                                className="icon"
                                                                loader={trvLoader}
                                                                src="icon/red-alet-icon.png"
                                                                alt="red-alet-icon.png"
                                                                width={176}
                                                                height={43}
                                                            />
                                                        }

                                                        {(showSuggestions && emailSuggestions.length > 0 && !emailInput.includes(".com")) &&
                                                            <div className="email-suggestions w-100">
                                                                {
                                                                    emailSuggestions.map((option, index) => {
                                                                        return (
                                                                            <h6 key={index} onClick={() => {
                                                                                let value = (emailInput && emailInput.includes("@")) ? (emailInput.split("@")[0] + "@" + option) : (emailInput + option);
                                                                                var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                                                if (value.match(validRegex) && value.match(validRegex).length > 0) {
                                                                                    setIsValidEmail(true);
                                                                                    setUserDetailsInSessionStorage("email", value);
                                                                                } else {
                                                                                    setIsValidEmail(null);
                                                                                }
                                                                                let detail = { ...billingDetail };
                                                                                detail.contactDetail.email = value;
                                                                                setBillingDetail(detail);
                                                                                setShowSuggestions(false);
                                                                            }}>{(emailInput && emailInput.includes("@"))
                                                                                ? (emailInput.split("@")[0] + "@" + option)
                                                                                : (emailInput + option)}
                                                                            </h6>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        }
                                                    </div>

                                                    <div className="input-group mb-3 form-group-icon">
                                                        <label className="form-label">Phone</label>
                                                        <div className='row'>
                                                            <div className='col-5 co-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-4'>
                                                                <PhoneInput
                                                                    country={"in"}
                                                                    enableSearch={true}
                                                                    enableClickOutside={true}
                                                                    value={phone}
                                                                    inputProps={{ readOnly: true }}
                                                                    onChange={(phone) => {
                                                                        let detail = { ...billingDetail };
                                                                        detail.countryCode = phone;
                                                                        detail.cellCountryCode = phone;
                                                                        setBillingDetail(detail);
                                                                        setUserDetailsInSessionStorage("countryCode", phone);
                                                                        setUserDetailsInSessionStorage("cellCountryCode", phone);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className='col-7 co-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-8'>
                                                                <input placeholder="Phone Number*" inputMode="numeric"
                                                                    pattern="[0-9]*"
                                                                    type="text"
                                                                    onPaste={(e) => e.preventDefault()}
                                                                    value={billingDetail?.contactDetail?.contactNo}
                                                                    maxLength={10}
                                                                    className={!isValidPhoneNumber ? "p-3 form-control float-start w-100 field-error" : "p-3 form-control float-start w-100"}
                                                                    onChange={(e) => {
                                                                        let cDetail = { ...billingDetail };
                                                                        var allowedChars = "0123456789";
                                                                        let cVal = e.target.value;
                                                                        if (allowedChars.indexOf(e.target.value.substring(e.target.value.length - 1)) == -1) {
                                                                            cVal = cVal.substring(0, cVal.length - 1);
                                                                        }
                                                                        cDetail.contactDetail.contactNo = cVal;
                                                                        setBillingDetail(cDetail);
                                                                        if (e.target.value.length == 10) {
                                                                            setUserDetailsInSessionStorage("phoneNumber", e.target.value);
                                                                        }
                                                                    }}
                                                                    onBlur={(e) => {
                                                                        if (e.target.value.length > 0) {
                                                                            setIsValidPhoneNumber(e.target.value.length == 10);
                                                                            if (e.target.value.length == 10) {
                                                                                setUserDetailsInSessionStorage("phoneNumber", e.target.value);
                                                                            }
                                                                        }
                                                                    }}
                                                                    onFocus={(e) => {
                                                                        if (e.target.value.length > 0) {
                                                                            setIsValidPhoneNumber(true);
                                                                        }
                                                                    }}>
                                                                </input>
                                                                {
                                                                    billingDetail && billingDetail.contactDetail && billingDetail.contactDetail.contactNo.length == 10 &&
                                                                    <Image
                                                                        className="icon"
                                                                        loader={trvLoader}
                                                                        src="icon/green-tick-icon.png"
                                                                        alt="green-tick-icon"
                                                                        width={176}
                                                                        height={43}
                                                                    />
                                                                }

                                                                {
                                                                    isInvalidBillingDetail && (!billingDetail.contactDetail.contactNo || billingDetail.contactDetail.contactNo.length < 10) &&
                                                                    <Image
                                                                        className="icon"
                                                                        loader={trvLoader}
                                                                        src="icon/red-alet-icon.png"
                                                                        alt="red-alet-icon.png"
                                                                        width={176}
                                                                        height={43}
                                                                    />
                                                                }
                                                                {
                                                                    isValidPhoneNumber == false && !isInvalidBillingDetail &&
                                                                    <Image
                                                                        className="icon"
                                                                        loader={trvLoader}
                                                                        src="icon/red-alet-icon.png"
                                                                        alt="red-alet-icon.png"
                                                                        width={176}
                                                                        height={43}
                                                                    />
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                                                    <div                             ref={errorInputRef}
 className='important-note mt-2'>
                                                        <strong>Important!</strong>
                                                        <span> Provide your valid email and phone to recieve e-tickets and important messages. This will also be used as billing email id and phone number.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-step-main-box bg-white p-3 222222'>
                                            <div className='checkout-step-main-title'>
                                                <h5 className='mb-2 fw-bold'>Traveler Information</h5>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                                                    <div className='important-note mt-2'>
                                                        <strong>Important!</strong>
                                                        <span> All names and dates of birth must match each traveler's passport or government issued photo ID.</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                passangers && passangers.map((pax, paxNumber) => {
                                                    let yearOptions = [];
                                                    if (pax.paxType == 1 && pax.paxNumber == 1)
                                                        yearOptions = getFirstAdultYearOptions();
                                                    else if (pax.paxType == 1)
                                                        yearOptions = getAdultYearOptions();
                                                    else if (pax.paxType == 3)
                                                        yearOptions = getChildYearOptions();
                                                    else if (pax.paxType == 5)
                                                        yearOptions = getInfantsYearOptions();

                                                    yearOptions = yearOptions.reverse();
                                                    let displayAge = "";

                                                    if (pax.paxType == 1 && pax.paxNumber == 1)
                                                        displayAge = "18+ Years";
                                                    else if (pax.paxType == 1 && pax.paxNumber > 1)
                                                        displayAge = "11+ Years";
                                                    else if (pax.paxType == 3)
                                                        displayAge = "2-11 Years";
                                                    else if (pax.paxType == 5)
                                                        displayAge = "Below 2 Years";
                                                    return (
                                                        <div className='mt-4' key={paxNumber}>
                                                            <div className='form-info-wrp'>
                                                                <div className="accordion" id="accordionExample">
                                                                    <div className="accordion-item">
                                                                        <h2 className="accordion-header" id="headingOne">
                                                                            <button className={"accordion-button " + (currentActiveAcd != paxNumber ? "collapsed" : "")} onClick={() => {
                                                                                if (currentActiveAcd == paxNumber)
                                                                                    setCurrentActiveAcd(-1);
                                                                                else setCurrentActiveAcd(paxNumber);
                                                                            }} type="button" data-bs-toggle="collapse" data-bs-target={"#travelerInfo" + paxNumber} aria-expanded="true" aria-controls={"travelerInfo" + paxNumber}>
                                                                                <div className='checkout-step-main-title'>
                                                                                    <h6 className='mb-0 fw-bold'>{pax.paxType == 5 ? "LAP INFANT" : pax.displayPaxType}-{pax.paxNumber} ({displayAge})</h6>
                                                                                </div>
                                                                            </button>
                                                                        </h2>
                                                                        <div id={"travelerInfo" + paxNumber} className={currentActiveAcd == paxNumber ? "accordion-collapse show" : "accordion-collapse collapse"}
                                                                            aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                            <div className="accordion-body">
                                                                                <div className='traveler-form'>
                                                                                    <div className='row'>
                                                                                        <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4'>
                                                                                            <div className="input-group mb-3">
                                                                                                <label className="form-label">Title<span>*</span></label>
                                                                                                <select className={isInvalidTravellers && !passangers[paxNumber].paxTitle ? "w-100 form-select field-error" : "w-100 form-select"} aria-label="Default select example" value={passangers[paxNumber].paxTitle} onChange={(val) => {
                                                                                                    let psgs = [...passangers];
                                                                                                    psgs[paxNumber].paxTitle = val.target.value;
                                                                                                    setPassangers(psgs);
                                                                                                    setUserDetailsInSessionStorage("passengers", psgs);
                                                                                                }}>
                                                                                                    <option value="" hidden>Select</option>
                                                                                                    <option value="MR">Mr.</option>
                                                                                                    {
                                                                                                        passangers[paxNumber].paxType == 1 &&
                                                                                                        <option value="MRS">Mrs.</option>
                                                                                                    }
                                                                                                    <option value="MS">Ms.</option>
                                                                                                    <option value="MSTR">Mstr.</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4'>
                                                                                            <div className="input-group mb-3">
                                                                                                <label className="form-label">First & Middle Name<span>*</span></label>
                                                                                                <input className={isInvalidTravellers && !passangers[paxNumber].firstName ? "p-3 form-control float-start w-100 field-error" : "p-3 form-control float-start w-100"} placeholder="Type Here" type="text" onChange={(e) => handleChange(e, "firstName", paxNumber)} value={passangers[paxNumber].firstName} />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4'>
                                                                                            <div className="input-group mb-3">
                                                                                                <label className="form-label">Last Name<span>*</span></label>
                                                                                                <input className={isInvalidTravellers && !passangers[paxNumber].lastName ? "p-3 form-control float-start w-100 field-error" : "p-3 form-control float-start w-100"} placeholder="Type Here" type="text" onChange={(e) => handleChange(e, "lastName", paxNumber)} value={passangers[paxNumber].lastName} />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-8 col-xxl-8'>
                                                                                            <div className="input-group mb-3">
                                                                                                <label className=" form-label">Date of Birth<span>*</span></label>
                                                                                                <div className='d-flex w-100'>
                                                                                                    <select className={(passangers[paxNumber].isValidDay == false || (isInvalidTravellers && !passangers[paxNumber].dayOfBirth)) ? "form-select field-error" : "form-select"} value={passangers[paxNumber].dayOfBirth}
                                                                                                        onChange={(e) => {
                                                                                                            let psgs = [...passangers];
                                                                                                            psgs[paxNumber].dayOfBirth = e.target.value;
                                                                                                            if (passangers[paxNumber].monthOfBirth && passangers[paxNumber].yearOFBirth && e.target.value)
                                                                                                                psgs[paxNumber].isValidDay = isValidDayOfMonth(e.target.value, passangers[paxNumber].monthOfBirth, passangers[paxNumber].yearOFBirth);
                                                                                                            setPassangers(psgs);
                                                                                                            setUserDetailsInSessionStorage("passengers", psgs);
                                                                                                            isPassengerValid(passangers[paxNumber].paxType, psgs);
                                                                                                        }}>
                                                                                                        <option value={""} hidden>Day</option>
                                                                                                        {dayOptions.map((opt, ix) => {
                                                                                                            return (
                                                                                                                <option value={opt.value} key={ix}>{opt.label}</option>
                                                                                                            );
                                                                                                        })}
                                                                                                    </select>
                                                                                                    <select className={((isInvalidTravellers && !passangers[paxNumber].monthOfBirth) || passangers[paxNumber].isAgeValid == false) ? "w-100 form-select field-error" : "w-100 form-select"} value={passangers[paxNumber].monthOfBirth}
                                                                                                        onChange={(e) => {
                                                                                                            let psgs = [...passangers];
                                                                                                            psgs[paxNumber].monthOfBirth = e.target.value;
                                                                                                            if (passangers[paxNumber].dayOfBirth && passangers[paxNumber].yearOFBirth && e.target.value)
                                                                                                                psgs[paxNumber].isValidDay = isValidDayOfMonth(passangers[paxNumber].dayOfBirth, e.target.value, passangers[paxNumber].yearOFBirth);
                                                                                                            setPassangers(psgs);
                                                                                                            setUserDetailsInSessionStorage("passengers", psgs);
                                                                                                            isPassengerValid(passangers[paxNumber].paxType, psgs);
                                                                                                        }}>
                                                                                                        <option value={""} hidden>Month</option>
                                                                                                        {monthOptions.map((opt, ix) => {
                                                                                                            return (
                                                                                                                <option value={opt.value} key={ix}>{opt.label}</option>
                                                                                                            );
                                                                                                        }
                                                                                                        )}
                                                                                                    </select>
                                                                                                    <select className={((isInvalidTravellers && !passangers[paxNumber].yearOFBirth) || passangers[paxNumber].isAgeValid == false) ? "form-select field-error" : "form-select"} value={passangers[paxNumber].yearOFBirth}
                                                                                                        onChange={(e) => {
                                                                                                            let psgs = [...passangers];
                                                                                                            psgs[paxNumber].yearOFBirth = e.target.value;
                                                                                                            if (passangers[paxNumber].monthOfBirth && passangers[paxNumber].dayOfBirth && e.target.value)
                                                                                                                psgs[paxNumber].isValidDay = isValidDayOfMonth(passangers[paxNumber].dayOfBirth, passangers[paxNumber].monthOfBirth, e.target.value);
                                                                                                            setPassangers(psgs);
                                                                                                            setUserDetailsInSessionStorage("passengers", psgs);
                                                                                                            isPassengerValid(passangers[paxNumber].paxType, psgs);
                                                                                                        }}>
                                                                                                        <option value={""} hidden>Year</option>
                                                                                                        {yearOptions.map(
                                                                                                            (opt, ix) => {
                                                                                                                return (
                                                                                                                    <option value={opt.value} key={ix}>{opt.label}</option>
                                                                                                                );
                                                                                                            }
                                                                                                        )}
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4'>
                                                                                            <div className="input-group mb-3">
                                                                                                <label className="w-100 form-label">Gender<span>*</span></label>
                                                                                                <select className={isInvalidTravellers && passangers[paxNumber].gender == -1 ? "w-100 form-select field-error" : "w-100 form-select"} aria-label="Default select example" onChange={(val) => {
                                                                                                    let psgs = [...passangers];
                                                                                                    if (val && val.target && !!val.target.value)
                                                                                                        psgs[paxNumber].gender = parseInt(val.target.value);
                                                                                                    else {
                                                                                                        psgs[paxNumber].gender = -1;
                                                                                                    }
                                                                                                    setPassangers(psgs);
                                                                                                    setUserDetailsInSessionStorage("passengers", psgs);
                                                                                                }}
                                                                                                    value={passangers[paxNumber].gender}>
                                                                                                    <option value="" hidden>Select</option>
                                                                                                    <option value="1">Male</option>
                                                                                                    <option value="2">Female</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                        <div className='checkout-step-main-box bg-white p-3 mt-4' id="billing-information">
                                            <div className='checkout-step-main-title'>
                                                <h5 className='mb-2 fw-bold'>Billing and Contact Information</h5>
                                            </div>
                                            <div className="important-note mt-2">
                                                <span>As per bank records or credit card company</span>
                                            </div>
                                            <div className="traveler-form mt-4">
                                                <div className="row">
                                                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                                                        <div className='row align-items-center mb-2'>
                                                            <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                                                <div className="input-group">
                                                                    <label className="form-label mb-0">Address<span>*</span></label>
                                                                </div>
                                                            </div>
                                                            <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                                                <div className='add-manually-address float-end'>
                                                                    {
                                                                        ((billingDetail?.country == "United States" ||
                                                                            billingDetail?.country == "Canada" ||
                                                                            billingDetail?.country == "Australia") && !showManualAddress) &&
                                                                        <button type="button" onClick={async () => {
                                                                            setShowManualAddress(true);
                                                                            await trackMixpanelEvent("Add_Manual_Address");
                                                                        }}><i className="fa fa-plus"></i> Add Manually</button>
                                                                    }
                                                                    {
                                                                        ((billingDetail?.country == "United States" &&
                                                                            billingDetail?.country == "Canada" &&
                                                                            billingDetail?.country == "Australia") || showManualAddress) &&
                                                                        <button type="button" onClick={() => {
                                                                            setShowManualAddress(false);
                                                                        }}><i className="fa fa-search" aria-hidden="true"></i> Search Address</button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row '>
                                                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                                                                <div className='input-group mb-3 w-100'>
                                                                    <div className={isInvalidBillingDetail && !billingDetail.street ? 'address-boxx w-100 field-error' : 'address-boxx w-100'}>
                                                                        {((billingDetail?.country == "United States" ||
                                                                            billingDetail?.country == "Canada" ||
                                                                            billingDetail?.country == "Australia") && !showManualAddress) && (
                                                                                <GooglePlacesAutocomplete
                                                                                    apiKey="AIzaSyBFjSm6QJb5DXS-ijrheh9xFxKat6Cddns"
                                                                                    autocompletionRequest={{ componentRestrictions: { country: [restrictedCountry] } }}
                                                                                    selectProps={{
                                                                                        value,
                                                                                        onChange: (value) => {
                                                                                            setValue(value);
                                                                                            if (value && value.value && !!value.value.place_id) {
                                                                                                getPlaceDetail(value.value.place_id).then((res) => {
                                                                                                    if (res && res.result && res.result.address_components) {
                                                                                                        let zipObj = res.result.address_components.find((x) => x.types[0] == "postal_code");
                                                                                                        let cityObj = res.result.address_components.find((x) => x.types[0] == "locality");
                                                                                                        if (!cityObj)
                                                                                                            cityObj = res.result.address_components.find((x) => x.types[0] == "sublocality_level_1");
                                                                                                        let stateObj = res.result.address_components.find((x) => x.types[0] == "administrative_area_level_1");
                                                                                                        let countryObj = res.result.address_components.find((x) => x.types[0] == "country");
                                                                                                        let billDetail = { ...billingDetail };
                                                                                                        if (countryObj)
                                                                                                            billDetail.country = countryObj.long_name;
                                                                                                        if (zipObj)
                                                                                                            billDetail.zip = zipObj.long_name;
                                                                                                        if (cityObj)
                                                                                                            billDetail.city = cityObj.long_name;
                                                                                                        if (stateObj) {
                                                                                                            const stateStr = stateObj.long_name;
                                                                                                            billDetail.state = stateStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                                                                                                        }
                                                                                                        billDetail.street = value.label;
                                                                                                        setBillingDetail(billDetail);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        },
                                                                                        placeholder: "Search Address",
                                                                                        isClearable: true,
                                                                                    }}
                                                                                    language="en"
                                                                                />
                                                                            )}

                                                                        {((billingDetail?.country != "United States" &&
                                                                            billingDetail?.country != "Canada" &&
                                                                            billingDetail?.country != "Australia") || showManualAddress) && (
                                                                                <input
                                                                                    type="text"
                                                                                    className={isInvalidBillingDetail && !billingDetail.street ? "p-3 form-control float-start w-100 field-error" : "p-3 form-control float-start w-100"}
                                                                                    id="address"
                                                                                    maxLength="150"
                                                                                    placeholder="1234 Main St"
                                                                                    onChange={(e) => {
                                                                                        let detail = { ...billingDetail };
                                                                                        detail.street = e.target.value;
                                                                                        setBillingDetail(detail);
                                                                                    }}
                                                                                    value={billingDetail.street}
                                                                                />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                                        <div className="input-group mb-3">
                                                            <label className="form-label">Country<span>*</span></label>
                                                            <div className='d-flex w-100'>
                                                                <CountryDropdown
                                                                    value={billingDetail.country}
                                                                    onChange={(val) => {
                                                                        var countryInfo = countries.find(
                                                                            (x) =>
                                                                                x.Name.toLocaleLowerCase() ==
                                                                                val.toLocaleLowerCase()
                                                                        );
                                                                        let detail = { ...billingDetail };
                                                                        detail.country = val;
                                                                        if (countryInfo) {
                                                                            detail.cellCountryCode =
                                                                                countryInfo.MobileCode;
                                                                            detail.countryCode = countryInfo.Code;
                                                                        }
                                                                        setBillingDetail(detail);
                                                                    }}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                                        <div className="input-group mb-3">
                                                            <label className="form-label">State<span>*</span></label>
                                                            <div className='d-flex w-100'>
                                                                <RegionDropdown country={billingDetail.country} value={billingDetail.state} onChange={(val) => { let detail = { ...billingDetail }; detail.state = val; setBillingDetail(detail); }}
                                                                    defaultOptionLabel='Select State' classes={(isInvalidBillingDetail && !billingDetail.state) ? "form-control field-error" : "form-control"} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                                        <div className="input-group mb-3">
                                                            <label className="form-label">City/Town<span>*</span></label>
                                                            <input type='text' className={isInvalidBillingDetail && !billingDetail.city ? "p-3 form-control float-start w-100 field-error" : "p-3 form-control float-start w-100"} placeholder='Type here'
                                                                value={billingDetail.city} onChange={(e) => {
                                                                    let detail = { ...billingDetail };
                                                                    const result = e.target.value.replace(/[^a-z ]/gi, "");
                                                                    detail.city = result;
                                                                    setBillingDetail(detail);
                                                                }} >
                                                            </input>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                                        <div className="input-group mb-3">
                                                            <label className="form-label">Postal/Zip code<span>*</span></label>
                                                            <input className={isInvalidBillingDetail && !billingDetail.zip ? "p-3 form-control float-start w-100 field-error" : "p-3 form-control float-start w-100"} placeholder="Write here" type="text"
                                                                maxLength={billingDetail.country == "United States" ? "5" : "10"}
                                                                value={billingDetail.zip} onChange={(e) => {
                                                                    let detail = { ...billingDetail };
                                                                    let pCode = "";
                                                                    if (billingDetail.country == "United States")
                                                                        pCode = e.target.value.replace(/[^0-9 ]/g, "");
                                                                    else
                                                                        pCode = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
                                                                    detail.zip = pCode;
                                                                    setBillingDetail(detail);
                                                                }}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className='checkout-step-main-box bg-white p-3 mt-4'>
                                        <div className='checkout-step-main-title'>
                                            <h5 className='mb-2 fw-bold'>Review Trip Details</h5>
                                        </div>
                                        <div className="important-note mt-2">
                                            <span>Please confirm <strong>Date & Time</strong> of flights and <strong>Name of Travelers</strong> are accurate.</span>
                                        </div>
                                        {
                                            editPsgs && editPsgs.map((pax, paxNumber) => {
                                                let yearOptions = [];
                                                if (pax.paxType == 1 && pax.paxNumber == 1)
                                                    yearOptions = getFirstAdultYearOptions();
                                                else if (pax.paxType == 1)
                                                    yearOptions = getAdultYearOptions();
                                                else if (pax.paxType == 3)
                                                    yearOptions = getChildYearOptions();
                                                else if (pax.paxType == 5)
                                                    yearOptions = getInfantsYearOptions();

                                                yearOptions = yearOptions.reverse();
                                                return (
                                                    <div className='mt-4' key={paxNumber}>
                                                        <div className='form-info-wrp'>
                                                            <div className="accordion" id="accordionUpdate">
                                                                <div className="accordion-item border-0">
                                                                    <h2 className="accordion-header" id="headingOneUpdate">
                                                                        <div className='reviewt-user-detail'>
                                                                            <button className="accordion-button collapsed" type="button" >
                                                                                <div className='checkout-step-main-title'>
                                                                                    <div className='d-flex align-items-center'>
                                                                                        <h6 className="mb-0 fw-bold">{pax.firstName} {pax.lastName}</h6>
                                                                                        <span className="ms-3 me-3">{pax.gender == 2 ? "Female" : "Male"} | {getFormattedDate8(pax.dob)}</span>
                                                                                        <div className='btn-group collapsed' data-bs-toggle="collapse" data-bs-target={"#travelerInfoUpdate" + paxNumber} aria-expanded="false" aria-controls={"travelerInfoUpdate" + paxNumber}>
                                                                                            <Image
                                                                                                className="cursor-pointer open"
                                                                                                loader={trvLoader}
                                                                                                src="icon/edi-flight-icon.svg"
                                                                                                alt="edi-flight-icon"
                                                                                                width={176}
                                                                                                height={43}
                                                                                            />
                                                                                            <Image
                                                                                                className="cursor-pointer close bg-dark p-1 rounded-pill h-auto"
                                                                                                loader={trvLoader}
                                                                                                src="icon/cross-icon.png"
                                                                                                alt="cross-icon"
                                                                                                width={25}
                                                                                                height={22}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    </h2>
                                                                    <div id={"travelerInfoUpdate" + paxNumber} className="accordion-collapse collapse" aria-labelledby="headingOneUpdate">
                                                                        <div className="accordion-body bg-grey mt-2 mb-4 border">
                                                                            <div className='traveler-form'>
                                                                                <div className='row'>
                                                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4'>
                                                                                        <div className="input-group mb-3">
                                                                                            <label className="form-label">Title<span>*</span></label>
                                                                                            <select className={isInvalidUpdatePsg && !pax.paxTitle ? "w-100 form-select field-error" : "w-100 form-select"} value={pax.paxTitle} onChange={(val) => {
                                                                                                let psgs = cloneData(editPsgs);
                                                                                                psgs[paxNumber].paxTitle = val.target.value;
                                                                                                setEditPsgs(psgs);
                                                                                            }}>
                                                                                                <option value="" hidden>Select</option>
                                                                                                <option value="MR">Mr.</option>
                                                                                                {
                                                                                                    pax.paxType == 1 &&
                                                                                                    <option value="MRS">Mrs.</option>
                                                                                                }
                                                                                                <option value="MS">Ms.</option>
                                                                                                <option value="MSTR">Mstr.</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4'>
                                                                                        <div className="input-group mb-3">
                                                                                            <label className="form-label">First & Middle Name<span>*</span></label>
                                                                                            <input className={isInvalidUpdatePsg && !pax.firstName ? "p-3 form-control float-start w-100 field-error" : "p-3 form-control float-start w-100"} placeholder="Type Here" type="text" onChange={(e) => handleChange(e, "firstName", paxNumber, true)} value={pax.firstName} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4'>
                                                                                        <div className="input-group mb-3">
                                                                                            <label className="form-label">Last Name<span>*</span></label>
                                                                                            <input className={isInvalidUpdatePsg && !pax.lastName ? "p-3 form-control float-start w-100 field-error" : "p-3 form-control float-start w-100"} placeholder="Type Here" type="text" onChange={(e) => handleChange(e, "lastName", paxNumber, true)} value={pax.lastName} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-8 col-xxl-8'>
                                                                                        <div className="input-group mb-3">
                                                                                            <label className=" form-label">Date of Birth<span>*</span></label>
                                                                                            <div className='d-flex w-100'>
                                                                                                <select className={(pax.isValidDay == false || (isInvalidUpdatePsg && !pax.dayOfBirth)) ? "form-select field-error" : "form-select"} value={pax.dayOfBirth}
                                                                                                    onChange={(e) => {
                                                                                                        let psgs = cloneData(editPsgs);
                                                                                                        psgs[paxNumber].dayOfBirth = e.target.value;
                                                                                                        if (pax.monthOfBirth && pax.yearOFBirth && e.target.value)
                                                                                                            psgs[paxNumber].isValidDay = isValidDayOfMonth(e.target.value, pax.monthOfBirth, pax.yearOFBirth);
                                                                                                        isPassengerValid(pax.paxType, psgs, true);
                                                                                                    }}>
                                                                                                    <option value={""} hidden>Day</option>
                                                                                                    {dayOptions.map((opt, ix) => {
                                                                                                        return (
                                                                                                            <option value={opt.value} key={ix}>{opt.label}</option>
                                                                                                        );
                                                                                                    })}
                                                                                                </select>
                                                                                                <select className={isInvalidUpdatePsg && !pax.monthOfBirth ? "w-100 form-select field-error" : "w-100 form-select"} value={pax.monthOfBirth}
                                                                                                    onChange={(e) => {
                                                                                                        let psgs = cloneData(editPsgs);
                                                                                                        psgs[paxNumber].monthOfBirth = e.target.value;
                                                                                                        if (pax.dayOfBirth && pax.yearOFBirth && e.target.value)
                                                                                                            psgs[paxNumber].isValidDay = isValidDayOfMonth(pax.dayOfBirth, e.target.value, pax.yearOFBirth);
                                                                                                        isPassengerValid(pax.paxType, psgs, true);
                                                                                                    }}>
                                                                                                    <option value={""} hidden>Month</option>
                                                                                                    {monthOptions.map((opt, ix) => {
                                                                                                        return (
                                                                                                            <option value={opt.value} key={ix}>{opt.label}</option>
                                                                                                        );
                                                                                                    }
                                                                                                    )}
                                                                                                </select>
                                                                                                <select className={isInvalidUpdatePsg && !pax.yearOFBirth ? "form-select field-error" : "form-select"} value={pax.yearOFBirth}
                                                                                                    onChange={(e) => {
                                                                                                        let psgs = cloneData(editPsgs);
                                                                                                        psgs[paxNumber].yearOFBirth = e.target.value;
                                                                                                        if (pax.monthOfBirth && pax.dayOfBirth && e.target.value)
                                                                                                            psgs[paxNumber].isValidDay = isValidDayOfMonth(pax.dayOfBirth, pax.monthOfBirth, e.target.value);
                                                                                                        isPassengerValid(pax.paxType, psgs, true);
                                                                                                    }}>
                                                                                                    <option value={""} hidden>Year</option>
                                                                                                    {yearOptions.map(
                                                                                                        (opt, ix) => {
                                                                                                            return (
                                                                                                                <option value={opt.value} key={ix}>{opt.label}</option>
                                                                                                            );
                                                                                                        }
                                                                                                    )}
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4'>
                                                                                        <div className="input-group mb-3">
                                                                                            <label className="w-100 form-label">Gender<span>*</span></label>
                                                                                            <select className={isInvalidUpdatePsg && pax.gender == -1 ? "w-100 form-select field-error" : "w-100 form-select"} onChange={(val) => {
                                                                                                let psgs = cloneData(editPsgs);
                                                                                                if (val && val.target && !!val.target.value)
                                                                                                    psgs[paxNumber].gender = parseInt(val.target.value);
                                                                                                else {
                                                                                                    psgs[paxNumber].gender = -1;
                                                                                                }
                                                                                                setEditPsgs(psgs);
                                                                                            }}
                                                                                                value={pax.gender}>
                                                                                                <option value="" hidden>Select</option>
                                                                                                <option value="1">Male</option>
                                                                                                <option value="2">Female</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='d-flex justify-content-end details-update-btn'>
                                                                                    <button type="button" className="cancel-btn btn align-items-center" data-bs-toggle="collapse" data-bs-target={"#travelerInfoUpdate" + paxNumber} aria-expanded="false" aria-controls={"travelerInfoUpdate" + paxNumber}
                                                                                        onClick={() => {
                                                                                            let psgs = cloneData(passangers);
                                                                                            setEditPsgs(psgs);
                                                                                        }}>Cancel</button>
                                                                                    <button type="button" className="ms-2 save-btn btn align-items-center" data-bs-toggle="collapse" data-bs-target={"#travelerInfoUpdate" + paxNumber} aria-expanded="false" aria-controls={"travelerInfoUpdate" + paxNumber} disabled={editPsgs.filter((x) => (!x.gender || x.gender <= 0) ||
                                                                                        !x.firstName || !x.lastName || !x.dayOfBirth || !x.monthOfBirth || !x.yearOFBirth || !x.paxTitle
                                                                                    ).length > 0}
                                                                                        onClick={() => {
                                                                                            let invalidTravellers = editPsgs.filter((x) => (!x.gender || x.gender <= 0) ||
                                                                                                !x.firstName || !x.lastName || !x.dayOfBirth || !x.monthOfBirth || !x.yearOFBirth || !x.paxTitle
                                                                                            );
                                                                                            if (invalidTravellers.length > 0) {
                                                                                                setIsInvalidUpdatePsg(true);
                                                                                                return;
                                                                                            }
                                                                                            let psgs = cloneData(editPsgs);
                                                                                            setPassangers(psgs);
                                                                                            setUserDetailsInSessionStorage("passengers", psgs);
                                                                                        }}>Update</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className='user-flight-review border-top mt-4 pt-4'>
                                            <div className='row'>
                                                <div className={flight.trips.length > 1 ? 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6' : 'col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'}>
                                                    <div className='user-flight-review-box'>
                                                        <div className='heading d-flex justify-content-between align-items-center'>
                                                            <h6 className='mb-0 fw-bold'>Departure | {getFormattedDate4(flight.trips[0].listOfFlight[0].departeddate)}</h6>
                                                            <div className='air-flight-price text-end'>
                                                                <button className='transparent-btn' type='button' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => setSelectedTabIndex(0)}>View Details</button>
                                                            </div>
                                                        </div>
                                                        <div className='airlinelogo d-flex align-items-center mt-4 mb-3'>
                                                            <Image
                                                                className="airline-logo h-auto"
                                                                loader={airlineLogoLoader}
                                                                src={`airline-logo/${flight.trips[0].validatingCarrier.code}.webp?q=100`}
                                                                alt="airplane-plus-icon"
                                                                width={35}
                                                                height={43}
                                                            />
                                                            <span className='ps-3'>{flight.trips[0].validatingCarrier.name}</span>
                                                        </div>
                                                        <div className='row airbox-details align-items-center'>
                                                            <div className='col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 col-xxl-2'>
                                                                <span>{getFormattedTime(flight.trips[0].listOfFlight[0].departureTime)}</span>
                                                                <h6 className='fw-bold mb-0'>{flight.trips[0].listOfFlight[0].fromCode}</h6>
                                                            </div>
                                                            <div className='col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8'>
                                                                <div className='d-flex align-items-center'>
                                                                    <div className='w-25 airbox-details-air-icon'>
                                                                        <Image
                                                                            className="h-auto float-end me-2"
                                                                            loader={trvLoader}
                                                                            src="icon/depart-air-purple-icon.svg"
                                                                            alt="Depart Air Icon"
                                                                            width={25}
                                                                            height={15}
                                                                        />
                                                                    </div>
                                                                    <div className='w-50 airbox-details-dot-line text-center'>
                                                                        <span>{getDiffFromMinutes(flight.trips[0].totalTripTime)}</span>
                                                                        <hr />
                                                                        <span>{flight.trips[0].listOfFlight.length == 1 ? "Non-Stop" : (flight.trips[0].listOfFlight.length - 1) + (flight.trips[0].listOfFlight.length == 2 ? " Stop" : " Stops")}</span>
                                                                    </div>
                                                                    <div className='w-25 airbox-details-air-icon'>
                                                                        <Image
                                                                            className="h-auto float-start ms-2"
                                                                            loader={trvLoader}
                                                                            src="icon/return-air-purple-icon.svg"
                                                                            alt="Return Air Icon"
                                                                            width={25}
                                                                            height={15}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 col-xxl-2 ps-0'>
                                                                <span>{getFormattedTime(flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].arrivalTime)}</span>
                                                                <h6 className='fw-bold mb-0'>{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    flight.trips.length > 1 &&
                                                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 border-start'>
                                                        <div className='user-flight-review-box'>
                                                            <div className='heading d-flex justify-content-between align-items-center'>
                                                                <h6 className='mb-0 fw-bold'>Return | {getFormattedDate4(flight.trips[1].listOfFlight[0].departeddate)}</h6>
                                                                <button className='transparent-btn text-end' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => setSelectedTabIndex(1)}>View Details</button>
                                                            </div>
                                                            <div className='airlinelogo d-flex align-items-center mt-4 mb-3'>
                                                                <Image
                                                                    className="airline-logo h-auto"
                                                                    loader={airlineLogoLoader}
                                                                    src={`airline-logo/${flight.trips[1].validatingCarrier.code}.webp?q=100`}
                                                                    alt="airplane-plus-icon"
                                                                    width={35}
                                                                    height={43}
                                                                />
                                                                <span className='ps-3'>{flight.trips[1].validatingCarrier.name}</span>
                                                            </div>
                                                            <div className='row airbox-details align-items-center'>
                                                                <div className='col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 col-xxl-2'>
                                                                    <span>{getFormattedTime(flight.trips[1].listOfFlight[0].departureTime)}</span>
                                                                    <h6 className='fw-bold mb-0'>{flight.trips[1].listOfFlight[0].fromCode}</h6>
                                                                </div>
                                                                <div className='col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <div className='w-25 airbox-details-air-icon'>
                                                                            <Image
                                                                                className="h-auto float-end me-2"
                                                                                loader={trvLoader}
                                                                                src="icon/depart-air-purple-icon.svg"
                                                                                alt="Depart Air Icon"
                                                                                width={25}
                                                                                height={15}
                                                                            />
                                                                        </div>
                                                                        <div className='w-50 airbox-details-dot-line text-center'>
                                                                            <span>{getDiffFromMinutes(flight.trips[1].totalTripTime)}</span>
                                                                            <hr />
                                                                            <span>{flight.trips[1].listOfFlight.length == 1 ? "Non-Stop" : (flight.trips[1].listOfFlight.length - 1) + (flight.trips[1].listOfFlight.length == 2 ? " Stop" : " Stops")}</span>
                                                                        </div>
                                                                        <div className='w-25 airbox-details-air-icon'>
                                                                            <Image
                                                                                className="h-auto float-start ms-2"
                                                                                loader={trvLoader}
                                                                                src="icon/return-air-purple-icon.svg"
                                                                                alt="Return Air Icon"
                                                                                width={25}
                                                                                height={15}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 col-xxl-2 ps-0'>
                                                                    <span>{getFormattedTime(flight.trips[1].listOfFlight[flight.trips[1].listOfFlight.length - 1].arrivalTime)}</span>
                                                                    <h6 className='fw-bold mb-0'>{flight.trips[1].listOfFlight[flight.trips[1].listOfFlight.length - 1].toCode}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div> */}
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <div className='important-note mt-4 text-center'>
                                                    <p className='d-none d-md-inline-block'>Please verify that the flight departure dates and times and the names of traveler(s) are correct. Once purchased, the cost of the airline tickets and service fees charged for booking are non-refundable after 24 hours. Additionally, tickets cannot be transferred to another person, and changing a traveler's name is not permitted. If you need to change the date or route of your flight, you may be subject to airline penalties and our service fees. Please note that fares are subject to change until the ticket is actually issued. The total ticket cost includes all taxes and our service fees. For major airlines, you can cancel your ticket within 24 hours of purchase by calling our 24/7 customer support. However, a cancellation fee will apply if you decide to cancel after this time. if you have booked low-cost carriers (LLC), the ticket is non-refundable.</p>
                                                    <p className=''><strong>Note: </strong>We welcome transactions made using Indian domestic credit or debit cards. If you are using an international card, kindly contact us at <a className='fw-bold text-nowrap' href={"tel:" + displayContactNumber}>{displayContactNumber}</a> for assistance.</p>
                                                    <p className='mb-0'>By clicking, Confirm & Book I agree that I have read and accepted Travanya<br /> <a href="/terms-conditions" target="_blank"><strong>Terms & Conditions</strong></a> and <a href="/privacy-policy" target="_blank"><strong>Privacy Policy.</strong></a></p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="border-0 fs-14 py-3 buttonStyle3 next w-100 d-none d-lg-inline mt-3" onClick={() => { confirmBooking() }}><span className="confirm_btn">Confirm & Book Flight</span></button>




                                        {/* <div className="tab-content" id="nav-tabContent">
                                        <div className={currentTab == 1 ? "tab-pane show active" : "tab-pane"} id="contact-info">

                                            <div className='d-flex justify-content-end mt-4'>
                                                <button className="border-0 fs-14 buttonStyle3 next d-none d-lg-inline" onClick={() => goToNextTab(2, true)}>Continue to Next Step</button>
                                            </div>
                                        </div>
                                        <div className={currentTab == 2 ? "tab-pane show active" : "tab-pane"} id="traveler-info">

                                            <div className="d-flex justify-content-end mt-4"><button className="border-0 fs-14 buttonStyle3 next d-none d-lg-inline" onClick={() => goToNextTab(3, true)}>Continue to Next Step</button></div>
                                        </div>
                                        <div className={currentTab == 3 ? "tab-pane show active" : "tab-pane"} id="payment-info">

                                            <div className="d-flex justify-content-end mt-4">
                                                
                                            </div>
                                        </div>
                                    </div> */}
                                    </div>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 d-none d-lg-inline-block'>
                                        <div className='sidebar-checkout '>
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item border-0">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flightDetails" aria-expanded="false" aria-controls="flightDetails">View Flight Detail</button>
                                                    </h2>
                                                    <div id="flightDetails" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <div className='bg-white'>
                                                                <div className='flycard-box p-3 br-5'>
                                                                    <div className='d-flex justify-content-between align-items-start'>
                                                                        <div className='flycard-air-img'>
                                                                            <Image
                                                                                className="h-auto w-100"
                                                                                loader={trvLoader}
                                                                                src="flycard-ariplane-img.svg"
                                                                                alt="flycard img"
                                                                                width={176}
                                                                                height={43}
                                                                            />
                                                                        </div>
                                                                        <div className='air-flight-price text-end'>
                                                                            <button className='transparent-btn mb-5' type='button' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => setSelectedTabIndex(0)}>View Details</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className='flycard-detail'>
                                                                        <div className='mt-2 d-flex align-item-center justify-content-center'>
                                                                            <h5 className="mb-0 fw-bold">{flight.trips[0].listOfFlight[0].fromCode}</h5>
                                                                            <i className={flight.trips.length > 1 ? "pt-1 fa-solid fa-arrow-right-arrow-left ms-2 me-2" : "pt-1 fa-solid fa-arrow-right-long ms-2 me-2"}></i>
                                                                            <h5 className="mb-0 fw-bold">{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode}</h5>
                                                                        </div>
                                                                        <div className='mt-2 d-flex align-item-center justify-content-center'>
                                                                            <span>{getFormattedDate6(flight.trips[0].listOfFlight[0].departeddate)} {flight.trips.length > 1 && "- " + getFormattedDate6(flight.trips[1].listOfFlight[0].departeddate)} | {flight.totalPassangers + (flight.totalPassangers > 1 ? " Passengers" : " Adult")} | {flight.displayCabin}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='checkout-sidebar-flight-detail ps-3 pt-3 pb-3 pe-3'>
                                                                    <div className='d-flex justify-content-between align-items-center mb-2 mt-0'>
                                                                        <div className='d-flex align-items-center'>
                                                                            <Image
                                                                                className="airplane-icon"
                                                                                loader={trvLoader}
                                                                                src="icon/plane-departure-icon.png"
                                                                                alt="airplane-icon"
                                                                                width={20}
                                                                                height={20}
                                                                            />
                                                                            <h5 className='mb-0 ms-2'>{getFormattedDate4(flight.trips[0].listOfFlight[0].departeddate)}</h5>
                                                                        </div>
                                                                        <div className='d-flex align-items-center text-end'>
                                                                            <span className='ms-2'>{getDiffFromMinutes(flight.trips[0].totalTripTime)}, {flight.trips[0].listOfFlight.length == 1 ? "Non-Stop" : (flight.trips[0].listOfFlight.length - 1) + (flight.trips[0].listOfFlight.length == 2 ? " Stop" : " Stops")}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                        <h6 className='mb-0 mt-2'>{flight.trips[0].listOfFlight[0].airportFromCity} ({flight.trips[0].listOfFlight[0].fromCode})</h6>
                                                                        <h6 className='mb-0 mt-2'>{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].airportToCity} ({flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode})</h6>
                                                                    </div>
                                                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                        <span className='flytime'>{getFormattedTime(flight.trips[0].listOfFlight[0].departureTime)}</span>
                                                                        <span className='flytime'>{getFormattedTime(flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].arrivalTime)}</span>
                                                                    </div>
                                                                    {
                                                                        flight.trips.length > 1 &&
                                                                        <>
                                                                            <div className='d-flex justify-content-between align-items-center mb-2 mt-4'>
                                                                                <div className='d-flex align-items-center'>
                                                                                    <Image
                                                                                        className="airplane-icon"
                                                                                        loader={trvLoader}
                                                                                        src="icon/plane-departure-cion.png"
                                                                                        alt="airplane-icon"
                                                                                        width={20}
                                                                                        height={20}
                                                                                    />
                                                                                    <h5 className='mb-0 ms-2'>{getFormattedDate4(flight.trips[1].listOfFlight[0].departeddate)}</h5>
                                                                                </div>
                                                                                <div className='d-flex align-items-center text-end'>
                                                                                    <span className='ms-2 '>{getDiffFromMinutes(flight.trips[1].totalTripTime)}, {flight.trips[1].listOfFlight.length == 1 ? "Non-Stop" : (flight.trips[1].listOfFlight.length - 1) + (flight.trips[1].listOfFlight.length == 2 ? " Stop" : " Stops")}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                                <h6 className='mb-0 mt-2'>{flight.trips[1].listOfFlight[0].airportFromCity} ({flight.trips[1].listOfFlight[0].fromCode})</h6>
                                                                                <span className='ms-2 flytime'>{getFormattedTime(flight.trips[1].listOfFlight[0].departureTime)}</span>
                                                                            </div>
                                                                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                                <h6 className='mb-0 mt-2'>{flight.trips[1].listOfFlight[flight.trips[1].listOfFlight.length - 1].airportToCity} ({flight.trips[1].listOfFlight[flight.trips[1].listOfFlight.length - 1].toCode})</h6>
                                                                                <span className='ms-2 flytime'>{getFormattedTime(flight.trips[1].listOfFlight[flight.trips[1].listOfFlight.length - 1].arrivalTime)}</span>
                                                                            </div>
                                                                        </>
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='bg-white mt-4 ps-3 pt-3 pb-3 pe-3'>
                                                <div className='checkout-price-detail-box'>
                                                    <h5 className='mb-3 fw-bold'>Price Details</h5>
                                                    {flight.fareDetails.map((fare, ix) => {
                                                        let psgPrice = (Math.round(fare.totalFareAmount - fare.totalTaxAmount) / fare.noofPax);
                                                        return (
                                                            <div className='price-detail-row d-flex justify-content-between align-items-center mb-3' key={ix}>
                                                                <h6 className='mb-0'>
                                                                    {fare.paxType == 5 ? "LAP INFANT" : fare.displayPaxType} ({fare.noofPax} X {numberFormat(psgPrice).split(".")[0]})
                                                                </h6>
                                                                <h6 className='mb-0'>
                                                                    {numberFormat(Math.round(psgPrice * fare.noofPax)).split(".")[0]}
                                                                </h6>
                                                            </div>
                                                        );
                                                    })}
                                                    <div className="price-detail-row d-flex justify-content-between align-items-center mb-0">
                                                        <h6 className='mb-0'>Taxes & Fees</h6>
                                                        <h6 className="mb-0">{numberFormat(Math.round(totalTax)).split(".")[0]}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='ps-3 pb-3 pe-3 bg-white total-price-box-wrap'>
                                                <div className='bg-grey ps-3 pt-3 pb-3 pe-3 d-flex justify-content-between align-items-center'>
                                                    <h5 className='mb-0 fw-bold'>Total Price (INR)</h5>
                                                    <h5 className='mb-0 fw-bold'>
                                                        {numberFormat(Number(tripTotalPrice)).split(".")[0]}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='air-flight-price'>
                                    <div className="offcanvas offcanvas-end side-flap" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                        <div className="offcanvas-header border-bottom">
                                            <h5 id="offcanvasRightLabel">Review Flight Details</h5>
                                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        {
                                            flight &&
                                            <FlightDetailFlap setLoader={false} selectedFlight={flight} isCheckout={true} selectedTabIndex={selectedTabIndex} sssPassangers={sssPassangers} />
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="fixed-bottom w-100 bg-white pt-3 pb-3 total-price-mob-strip d-lg-none">
                    <div className='row ms-0 me-0 align-items-center'>
                        <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                            <div className='label'>Trip total</div>
                            <h3 className='fw-bold mb-0'>
                                {numberFormat(Number(tripTotalPrice)).split(".")[0]}
                                <sup>.{numberFormat(Number(tripTotalPrice)).split(".")[1]}</sup>
                            </h3>
                            <button type="button" className="transparent-btn text-primary" data-bs-toggle="modal" data-bs-target="#viewPricePopup">View price summary</button>

                        </div>
                        <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                            <button className="float-end buttonStyle2 border-0 next" onClick={() => {
                                // if (currentTab == 3)
                                //     confirmBooking();
                                // else
                                //     goToNextTab(currentTab + 1, true);
                                confirmBooking();

                            }}> Confirm & Book Flight</button>
                        </div>
                    </div>
                </div>
                {
                    flight &&
                    <div className="modal fade" id="viewPricePopup" tabindex="-1" aria-labelledby="viewPricePopupLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h6 className="modal-title" id="viewPricePopupLabel">Price Summary</h6>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {flight.fareDetails.map((fare, ix) => {
                                        let psgPrice = (fare.totalFareAmount / fare.noofPax).toFixed(2);
                                        return (
                                            <div className='price-detail-row d-flex justify-content-between align-items-center mb-3' key={ix}>
                                                <h6 className='mb-0'>
                                                    {fare.paxType == 5 ? "LAP INFANT" : fare.displayPaxType} ({fare.noofPax} X {numberFormat(psgPrice)})
                                                </h6>
                                                <h6 className='mb-0'>
                                                    {numberFormat(fare.totalFareAmount).split(".")[0]}<sup>.{numberFormat(fare.totalFareAmount).split(".")[1]}</sup>
                                                </h6>
                                            </div>
                                        );
                                    })}

                                    <div className="price-detail-row d-flex justify-content-between align-items-center mb-3">
                                        <h6 className='mb-0'>Service Fee</h6>
                                        <h6 className="mb-0">{numberFormat(flight.serviceFee).split(".")[0]}
                                            <sup>.{numberFormat(flight.serviceFee).split(".")[1]}</sup>
                                        </h6>
                                    </div>
                                    <div className='pb-3 bg-white total-price-box-wrap'>
                                        <div className='bg-grey ps-3 pt-3 pb-3 pe-3 d-flex justify-content-between align-items-center'>
                                            <h5 className='mb-0 fw-bold'>Total Price (INR)</h5>
                                            <h5 className='mb-0 fw-bold'>
                                                {
                                                    numberFormat(Number(tripTotalPrice)).split(".")[0]
                                                }
                                                <sup>.
                                                    {
                                                        numberFormat(Number(tripTotalPrice)).split(".")[1]
                                                    }</sup>
                                            </h5>
                                        </div>
                                        <div className='payment-note border-top mt-3 pt-2'>
                                            <p className='mb-0'>
                                                <strong>Note: </strong>
                                                All fares are quoted in INR. Additional <a href="/baggage-fees/" target="_blank" rel="noreferrer">Baggage Fees</a> may apply as per the airline policies. Your Credit/Debit card may be billed in multiple charges totalling the final total price.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </section>
            <SkipNGoToHome goHomeText={"Go Back"} setOpenBackModal={setOpenBackModal} openBackModal={openBackModal} setIsBackLoading={setIsBackLoading} isBackLoading={isBackLoading}></SkipNGoToHome>


            <Modal className='centred-modal' show={showLoader} >
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
            {
                flight &&
                <InnterFooter></InnterFooter>
            }
        </>
    )
}