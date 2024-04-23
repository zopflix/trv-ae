"use client"
import { Fragment, useEffect, useState,useRef } from 'react'
import { Decrypt, cloneData, getAdultYearOptions, getAge, getBrowser, getChildYearOptions, getDeviceName, getDiffFromMinutes, getFirstAdultYearOptions, getFormattedDate4, getFormattedDate6, getFormattedDate7, getFormattedTime, getInfantsYearOptions, gtag_report_conversion, isJsonString, isValidDayOfMonth, numberFormat, trackMixpanelEvent } from '../helpers/common';
import Layout from '../components/inner-layout';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/bootstrap.css";
import { dayOptions, monthOptions } from '../helpers/constants';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { countries } from '../helpers/countries-info';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getPlaceDetail } from '../services/flightService';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { bookTBOFlight, getSSR } from '../services/bookingService';
import DetailsFlap from '../components/details-flap';
import { contactNumber, flightContactNumber } from '../config';
import Image from "next/image"
import { airlineLogoLoader, trvLoader } from "../helpers/imageKitLoader"
import ChangePrice from '../components/change-price';
import BookingFailed from '../components/booking-failed-modal';
import SeatSelection from '../components/seat-selection';
import { currentCoupons } from '../config';
import InnterFooter from '../components/inner-footer';
import SkipNGoToHome from '../components/_skip_go_home';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePathname } from "next/navigation";

export default function CheckoutPage() {
  const path = usePathname();
  const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);
  const [flight, setFlightData] = useState(null);
  const [returnFlight, setReturnFlightData] = useState(null);
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
  const [isInvalidTravellers, setIsInvalidTravellers] = useState(false);
  const [sssPassangers, setSSSPassengers] = useState(0);
  const [showManualAddress, setShowManualAddress] = useState(false);
  const [restrictedCountry, setRestrictedCountry] = useState("in");
  const [value, setValue] = useState(null);
  const [editPsgs, setEditPsgs] = useState(null);
  const [isBookingDone, setIsBookingDone] = useState(false);
  const [isInvalidBillingDetail, setIsInvalidBillingDetail] = useState(false);
  const [isInvalidUpdatePsg, setIsInvalidUpdatePsg] = useState(false);
  const [openBackModal, setOpenBackModal] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const [userIp, setUserIp] = useState("");
  const [currentActiveAcd, setCurrentActiveAcd] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [openNewPriceModal, setOpenNewPriceModal] = useState(false);
  const [openBookingFailedModal, setOpenBookingFailedModal] = useState(false);
  const [hasDepartPriceChanged, setDepartPriceChanged] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  const [oldPrice, setOldPrice] = useState(0);
  const [crmId, setCRMId] = useState("");
  const [totalTax, setTotalTax] = useState(0);
  const [hasPromoCodeApplied, setPromoCodeApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoCodeName, setPromoCode] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [showSeatSelectionModal, setShowSeatSelectionModal] = useState(false);
  const [returnFlightSSRServices, setReturnFlightSSRServices] = useState(null);
  const [departFlightSSRServices, setDepartFlightSSRServices] = useState(null);
  const [seatsDataFound, setSeatsDataFound] = useState(false);
  const [checkingSeats, setCheckingSeats] = useState(false);
  const [departSeats, setDepartSeats] = useState([]);
  const [returnSeats, setReturnSeats] = useState([]);
  const [totalSeatPrice, setTotalSeatPrice] = useState(0);
  const [segments, setSegments] = useState([]);
  const [isSeatCriteriaSelected, setIsSeatCriteriaSelected] = useState(false);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [allCoupons, setAllCoupons] = useState([]);
  const errorInputRef = useRef(null);

  let invalidTravellers = [];
  let psgs = [];
  let isInvalidContact = false;


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
  useEffect(() => {

    if (path.includes("/book-flight")) {
      setDisplayContactNumber(flightContactNumber);

    }
  }, []);

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

    //update segments in case info is updated for travelers
    resetPassengersInfoInSegments();

    const hasInvalidAge = passangers.some((x) => x.isAgeValid == false);
    if (hasInvalidAge) return false; // return false if age validation fails

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
    if (
      flight.trips[0].listOfFlight[0].departCountryCode !=
      flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1]
        .arrivalCountryCode
    ) {
      invalidTravellers = passangers.filter(
        (x) =>
          !x.passportNo ||
          !x.passportExpiry ||
          !new RegExp(/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/).test(x.passportNo)
      );
    }

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

    // window.scrollTo(0, 0);

    return true;
  };
  const isPassengerValid = (paxType, allPsgs, isUpdate = false) => {
    allPsgs.forEach((psg, index) => {
      psg.dob = new Date(psg.yearOFBirth, psg.monthOfBirth - 1, psg.dayOfBirth).toLocaleDateString();
      let psgs = [...allPsgs];
      let age = getAge(psg.monthOfBirth + "/" + psg.dayOfBirth + "/" + psg.yearOFBirth,
        returnFlight
          ? returnFlight.trips[0].listOfFlight[0].departeddate
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

  const createPaymentForm = (values) => {
    var objValues = Decrypt(values);
    var obj = JSON.parse(objValues)
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "https://secure.payu.in/_payment");
    Object.keys(obj).forEach(function (key) {
      // Create an input element for emailID
      var ID = document.createElement("input");
      ID.setAttribute("type", "hidden");
      ID.setAttribute("name", key);

      if (key == "optionalparam1" || key == "optionalparam2") {
        ID.setAttribute("value", Decrypt(obj[key]));
        ID.setAttribute("name", key == "optionalparam1" ? "surl" : "furl");
      }
      else
        ID.setAttribute("value", obj[key]);
      form.append(ID);
    });
    document.getElementsByTagName("body")[0]
      .appendChild(form).submit();

  }

  const updateDepartChangedPrice = (res, hasBothPriceChanged = false, departPrice = 0, rtnPrice = 0) => {
    let currentFlight = JSON.parse(JSON.stringify(flight));
    let diff = (res.newPrice - currentFlight.totalPrice);
    if (hasBothPriceChanged == true)
      diff = res.newPrice - (currentFlight.totalPrice + returnFlight.totalPrice);

    let totalPaxes = flight.fareDetails.map(x => x.noofPax).reduce((a, b) => a + b, 0);
    let perPaxAdditionalFare = diff / totalPaxes;
    let oldPrice = currentFlight.totalPrice;
    if (returnFlight) {
      let currentReturnFlight = JSON.parse(JSON.stringify(returnFlight));
      oldPrice += currentReturnFlight.totalPrice;
    }
    setOldPrice(oldPrice);

    flight.fareDetails.forEach((x => {
      x.totalFareAmount += (perPaxAdditionalFare * x.noofPax);
    }));
    flight.totalPrice = hasBothPriceChanged == true ? departPrice : res.newPrice;
    let tripPrice = flight.totalPrice;
    if (returnFlight) {
      tripPrice = (flight.totalPrice + (hasBothPriceChanged == true ? rtnPrice : returnFlight.totalPrice));
      setNewPrice(tripPrice);
    }
    else
      setNewPrice((flight.totalPrice));

    flight.checkPriceChange = false; // this field is set to remove double time price change check

    setFlightData(flight);
    setCRMId(res.crmId);

    setTripTotalPrice(tripPrice);

  }

  const updateReturnChangedPrice = (res) => {
    let currentFlight = JSON.parse(JSON.stringify(flight));
    let currentReturnFlight = JSON.parse(JSON.stringify(returnFlight));

    let diff = (res.newPrice - currentReturnFlight.totalPrice);
    let totalPaxes = currentReturnFlight.fareDetails.map(x => x.noofPax).reduce((a, b) => a + b, 0);
    let perPaxAdditionalFare = diff / totalPaxes;
    let oldPrice = currentFlight.totalPrice;
    if (currentReturnFlight) {
      oldPrice += currentReturnFlight.totalPrice;
    }
    setOldPrice(oldPrice);
    currentReturnFlight.totalPrice = res.newPrice;
    currentReturnFlight.fareDetails.forEach((x => {
      x.totalFareAmount += (perPaxAdditionalFare * x.noofPax);
    }));
    setNewPrice((flight.totalPrice + currentReturnFlight.totalPrice));

    flight.checkPriceChange = false;
    setFlightData(flight);
    setReturnFlightData(currentReturnFlight);
    setCRMId(res.crmId);

    setTripTotalPrice((flight.totalPrice + currentReturnFlight.totalPrice));

  }

  const confirmBooking = () => {
    const goToNextTabResult = goToNextTab();



    //save seat segments to show on confirmation page
    if (segments && segments.length > 0) {
      localStorage.setItem("seatSegments", JSON.stringify(segments));
    }
    if (isBookingDone) return;



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


    if (!isInvalidDetail) {
      passangers.forEach((psg) => {
        psg.dayOfBirth = psg.dayOfBirth?.toString();
        psg.yearOFBirth = psg.yearOFBirth?.toString();

        psg.dob =
          (parseInt(psg.monthOfBirth) > 9
            ? psg.monthOfBirth
            : "0" + psg.monthOfBirth) +
          "/" +
          (parseInt(psg.dayOfBirth) > 9 ? psg.dayOfBirth : "0" + psg.dayOfBirth) +
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

      //update seat price in total
      flight.totalPrice += totalSeatPrice;

      let dataToSend = {
        departureFlight: {
          contract: flight,
          paymentDetail: {
            passangers: passangers,
            billingDetails: bDetail,
          },
          resultIndex: flight.resultIndex,
          traceId: flight.traceId,
          utm_source: utmSouceValue,
          utm_term: utmTermValue,
          referer: referer,
          browser: getBrowser(),
          device: getDeviceName(),
          user_ip: userIp,
          saverService: null,
          searchId: searchId,
          crmId: crmId,
          couponCode: couponData?.name,
          discount: couponData?.discount,
          seats: departSeats,
          checkPriceChange: flight.checkPriceChange

        }
      };

      if (returnFlight) {
        dataToSend.returnFlight = {
          contract: returnFlight,
          paymentDetail: {
            passangers: passangers,
            billingDetails: bDetail,
          },
          resultIndex: returnFlight.resultIndex,
          traceId: returnFlight.traceId,
          utm_source: utmSouceValue,
          utm_term: utmTermValue,
          referer: referer,
          browser: getBrowser(),
          device: getDeviceName(),
          user_ip: userIp,
          saverService: null,
          searchId: searchId,
          seats: returnSeats,
          checkPriceChange: flight.checkPriceChange
        }
      }

      localStorage.setItem("booking_data", JSON.stringify(dataToSend));
      setShowLoader(true)
      bookTBOFlight(dataToSend).then(async (res) => {
        gtag_report_conversion();
        let deptCountry = dataToSend.departureFlight.contract.trips[0].listOfFlight[0].departCountryCode;
        let arrivalCountry = dataToSend.departureFlight.contract.trips[0].listOfFlight[dataToSend.departureFlight.contract.trips[0].listOfFlight.length - 1].arrivalCountryCode
        await trackMixpanelEvent(`Make-Payment-Button-${deptCountry != arrivalCountry ? "International" : "Domestic"}`);
        setShowLoader(false);
        setIsBookingDone(false)
        if (res && res.success) {
          createPaymentForm(res.data);
        }
        else if (!res.success && res.isPriceChange && res.hasBothPriceChanged == true) {
          res.newPrice = res.newDepartPrice + res.newReturnPrice;
          updateDepartChangedPrice(res, true, res.newDepartPrice, res.newReturnPrice);
          setOpenNewPriceModal(true)
        }
        else if (!res.success && res.isPriceChange && res.hasDepartPriceChanged == true) {
          setDepartPriceChanged(true);
          updateDepartChangedPrice(res);
          setOpenNewPriceModal(true);
        }
        else if (!res.success && res.isPriceChange && res.hasDepartPriceChanged == false) {
          setDepartPriceChanged(false);
          updateReturnChangedPrice(res);
          setOpenNewPriceModal(true);
        }

        else if (!res.success && !res.isPriceChange) {
          setOpenBookingFailedModal(true);
        }




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

    const item = window.localStorage.getItem("departFlight");
    const flight = item ? JSON.parse(item) : null;
    if (flight)
      flight.checkPriceChange = true;
    setFlightData(flight);

    getSSRServices(flight);

    const returnItem = window.localStorage.getItem("returnFlight");
    const rtnFlight = returnItem ? JSON.parse(returnItem) : null;
    setReturnFlightData(rtnFlight);

    if (rtnFlight) {
      getSSRServices(rtnFlight, true);
    }


    let splittedPrice = Math.round(flight.totalPrice);
    let flightPrice = Math.round(flight.totalPrice);

    if (rtnFlight) {
      splittedPrice = Math.round(splittedPrice + rtnFlight.totalPrice)
      flightPrice = Math.round(flightPrice + rtnFlight.totalPrice)
    }

    setTripTotalPrice(splittedPrice);

    let totalPassangers = 0;
    let sssPassengers = 0;

    flight.fareDetails.forEach((fare) => {
      if (fare.totalFareAmount > 0) {
        totalPassangers += fare.noofPax;
      }
      sssPassengers += fare.noofPax;
    });

    setSSSPassengers(sssPassengers);
    setTotalPassengers(totalPassangers);

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

      if (rtnFlight && rtnFlight.fareDetails) {

        rtnFlight.fareDetails.forEach((element) => {

          totalTaxAmount += element.totalTaxAmount;
        });

        totalTaxAmount += rtnFlight.serviceFee;
      }
    }

    setPassangers(travellers);

    if (flight.serviceFee > 0) {

      totalTaxAmount += flight.serviceFee;
    }
    setTotalTax(totalTaxAmount);

    let couponPassangers = travellers.filter(x => x.paxType != 5); // excluding the infant Pax type for the calculations
    let adultPaxes = couponPassangers.filter(x => x.paxType == 1).length;
    let filteredCoupons =
      currentCoupons.filter(x => couponPassangers.length >= x.minPax
        && (!x.isReturnCouponOnly || rtnFlight != null) && (!x.coupleOnly));

    filteredCoupons.map((c) => {
      if (rtnFlight != null && c.roundDiscount > 0)
        c.discount = c.roundDiscount;
      else if (rtnFlight == null && c.oneWayDiscount > 0)
        c.discount = c.oneWayDiscount;
      return c;
    });
    setAllCoupons(filteredCoupons);

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

  useEffect(() => {
    if (passangers?.length == 2) {
      let adultPaxes = passangers.filter(x => x.paxType == 1);
      let coupleCoupon = currentCoupons.find(x => x.coupleOnly == true);

      if (adultPaxes.length == 2
        && adultPaxes.some(x => x.gender == "1")
        && adultPaxes.some(x => x.gender == "2")) {

        let existingCoupons = JSON.parse(JSON.stringify(allCoupons));
        if (coupleCoupon && !existingCoupons.some(x => x.name == coupleCoupon.name))
          existingCoupons.push(coupleCoupon)

        setAllCoupons(existingCoupons)
      }
      else if (allCoupons.some(x => x.coupleOnly == true)) {
        let newCoupons = allCoupons.filter(x => !x.coupleOnly);
        setAllCoupons(newCoupons);
        if (!!promoCodeName && promoCodeName == coupleCoupon?.name)
          removePromoCode();
      }
    }

  }, [passangers])

  const setSeatingSelectionDone = (isDone) => {
    setIsSeatCriteriaSelected(isDone);
  }

  const applyPromoCode = (coupon) => {
    let currentFlight = JSON.parse(JSON.stringify(flight));
    let currentTripTotal = tripTotalPrice;
    if (discountAmount > 0) {
      currentFlight.totalPrice += discountAmount;
      currentTripTotal += discountAmount;
    }

    setTimeout(() => {
      let discountValue = coupon.discount;

      if (coupon.discountPercentage > 0) {
        discountValue = Number((coupon.discountPercentage / 100) * currentFlight.totalPrice);
      }

      if (discountValue > coupon.discount)
        discountValue = coupon.discount;

      currentFlight.totalPrice = currentFlight.totalPrice - discountValue;

      setFlightData(currentFlight);

      setCouponData({ name: coupon?.name, discount: discountValue });

      setTripTotalPrice((currentTripTotal - discountValue))
      setPromoCodeApplied(true);
      setDiscountAmount(discountValue);
      setPromoCode(coupon?.name)
    }, 500);



  }

  const removePromoCode = () => {
    let currentFlight = JSON.parse(JSON.stringify(flight));
    currentFlight.totalPrice = currentFlight.totalPrice + discountAmount;
    setFlightData(currentFlight);


    setTripTotalPrice((tripTotalPrice + discountAmount))
    setPromoCodeApplied(false);
    setPromoCode("")
    let checBox = document.getElementById(couponData?.name)
    setCouponData({ name: null, discount: null });
    setDiscountAmount(0);
    checBox.checked = false
  }

  const getSSRServices = (flight, isReturn = false) => {

    if (segments && segments.length > 0) {
      return;
    }

    setCheckingSeats(true);

    getSSR(flight).then((res) => {
      setCheckingSeats(false);
      setSeatsDataFound(res && res.success);
      if (res && res.success) {

        if (isReturn) {

          setReturnFlightSSRServices(res.data);
        }
        else {
          setDepartFlightSSRServices(res.data);
        }

      }

    });

  }

  //#region seat segments
  const resetPassengersInfoInSegments = () => {

    if (!segments || segments.length <= 0) {

      return;
    }

    let allSegments = [...segments];

    let updatedPassengers = getPassengers();

    for (let i = 0; i < allSegments.length; i++) {

      let segment = allSegments[i];

      let segmentPassengers = segment.passengers;

      if (updatedPassengers.length != segmentPassengers.length) {

        break;
      }

      for (let s = 0; s < segmentPassengers.length; s++) {

        let updatedPassenger = updatedPassengers[s];

        let segmentPassenger = segmentPassengers[s];

        //update values
        segmentPassenger.name = updatedPassenger.name;
        segmentPassenger.label = updatedPassenger.label;
      }

    }

  }

  const getPassengers = () => {

    let paxes = [];

    let sessionUsers = JSON.parse(sessionStorage.getItem("userDetails"));

    if (sessionUsers) {

      for (let i = 0; i < sessionUsers.passengers.length; i++) {

        let pax = sessionUsers.passengers[i];

        //Exclude infant on lap
        if (pax.paxType == 5) {
          continue;
        }

        let paxTypeName = getPaxType(pax.paxType);

        let passenger = {
          paxNo: i + 1,
          paxType: paxTypeName,
          seat: null,
          name: pax.firstName + ' ' + pax.lastName,
          label: pax.firstName.substring(0, 1) + pax.lastName.substring(0, 1)
        };

        paxes.push(passenger);
      }

    }

    return paxes;
  }



  const getPaxType = (paxType) => {

    switch (paxType) {
      case 1:
        return 'Adult';
      case 2:
        return 'Senior';
      case 3:
        return 'Child';
      case 4:
        return 'Infant';
    }
  }
  //#endregion

  return (
    <>

      <Layout>

        <section className='pt-5 pb-5 bg-grey'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                <div className='row align-items-center'>
                  <div className='tab-block col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 col-xxl-2'>
                    <button className='transparent-btn'
                      onClick={async () => {
                        setOpenBackModal(true);
                      }}>
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
                        <button className={currentTab == 3 ? "nav-link show active" : (currentTab > 3 ? "nav-link fill-active" : "nav-link")} id="optionals-info-tab" type="button" onClick={() => {

                          goToNextTab(3, true)

                        }}>
                          <span className='tabs-num'>3</span>
                          <span className='tabs-text'>Optionals</span>
                        </button>
                        <button className={currentTab == 4 ? "nav-link show active" : (currentTab > 4 ? "nav-link fill-active" : "nav-link")} id="payment-info-tab" type="button" onClick={() => goToNextTab(4, true)}>
                          <span className='tabs-num'>4</span>
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
                            <i className={returnFlight ? "pt-1 fa-solid fa-arrow-right-arrow-left ms-2 me-2" : "pt-1 fa-solid fa-arrow-right-long ms-2 me-2"}></i>
                            <h5 className="mb-0 fw-bold">{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode}</h5>
                          </div>
                          <div className='mt-2 d-flex align-item-center justify-content-center'>
                            <span>{getFormattedDate6(flight.trips[0].listOfFlight[0].departeddate)} {returnFlight && "- " + getFormattedDate6(returnFlight.trips[0].listOfFlight[0].departeddate)} | {sssPassangers + (sssPassangers > 1 ? " Passengers" : " Adult")} | {flight.displayCabin}</span>
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

                            <div className="input-group mb-3 form-group-icon w-100">
                              <label className="w-100 form-label">Phone</label>
                              <div className='row m-0 w-100'>
                                <div className='col-5 co-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-4 ps-0'>
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
                                <div className='col-7 co-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-8 pe-0'>
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
                            <div className='important-note mt-2'>
                              <strong ref={errorInputRef}>Important!</strong>
                              <span> Provide your valid email and phone to recieve e-tickets and important messages. This will also be used as billing email id and phone number.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='checkout-step-main-box bg-white p-3 mb-4'>
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

                                              {(flight.trips[0].listOfFlight[0].departCountryCode != flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].arrivalCountryCode) &&
                                                <Fragment>
                                                  <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-2'>
                                                    <div className="input-group mb-2">
                                                      <label>Passport Number<span>*</span></label>
                                                    </div>
                                                    <input className={isInvalidTravellers && (!passangers[paxNumber].passportNo || !(new RegExp(/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/).test(passangers[paxNumber].passportNo))) ? "form-control fs-14 field-error" : "form-control fs-14"} placeholder="Type Here" type="text" onChange={(e) => {
                                                      let psanggers = [...passangers];
                                                      psanggers[paxNumber].passportNo = e.target.value;
                                                      setUserDetailsInSessionStorage("passengers", psanggers);
                                                      setPassangers(psanggers);
                                                    }} value={passangers[paxNumber].passportNo} />
                                                  </div>
                                                  <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 position-relative mb-2 w-100datePicer'>
                                                    <div className="input-group mb-2">
                                                      <label>Passport Expiry <span>*</span></label>
                                                    </div>
                                                    <DatePicker
                                                      selected={passangers[paxNumber].passportExpiry}
                                                      isClearable={false}
                                                      showMonthSelect
                                                      showYearSelect
                                                      showMonthDropdown
                                                      showYearDropdown
                                                      onChange={(date) => {
                                                        let psgs = [...passangers];
                                                        psgs[paxNumber].passportExpiry = date;
                                                        setPassangers(psgs);
                                                      }}
                                                      minDate={new Date(flight.trips.length > 1 ? new Date(flight.trips[1].listOfFlight[flight.trips[1].listOfFlight.length - 1].arrivalAt) : new Date(flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].arrivalAt))}
                                                      dateFormat="dd/MM/yy"
                                                      className={isInvalidTravellers && !passangers[paxNumber].passportExpiry ? 'border-red form-control w-100' : 'form-control w-100'}
                                                    />
                                                  </div>
                                                </Fragment>
                                              }
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
                      <div className='checkout-step-main-box bg-white p-3 mb-4' id="billing-information">
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
                      <div className='checkout-step-main-box bg-white p-3 mb-4'>
                        <div className='row mb-4'>
                          <div className='col-6'>
                            <div className='checkout-step-main-title'>
                              <h5 className='mb-1 fw-bold'>Seat Selection</h5>
                            </div>
                            <div className='important-note mt-0'>
                              {!isSeatCriteriaSelected &&
                                <span>Reserve your favorite seats to:</span>
                              }
                              {isSeatCriteriaSelected &&
                                <span><span className='color-orange fw-bold'>Thank You,</span> Your Seat selection has been received</span>
                              }
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className='checkout-step-main-title text-end'>
                              <h5 className='mb-1 fw-bold color-green'>{numberFormat(Math.round(totalSeatPrice)).split(".")[0]}<sup>.{numberFormat(Math.round(totalSeatPrice)).split(".")[1]}</sup></h5>
                              <h5 className='mb-1 fs-14 color-black opacity-50'>Total Fare</h5>
                            </div>
                          </div>
                        </div>
                        {!isSeatCriteriaSelected &&
                          <div className='row'>
                            <div className='col-8 col-xl-9'>
                              <div className='important-note mt-4'>
                                <span>Open the Seat Map to choose your exact seat</span>
                              </div>
                              <button className="buttonStyle2 ViewSeatModelButton mt-3 border-0 color-white fs-14 rounded-3" disabled={!(!checkingSeats && seatsDataFound)} onClick={async () => {
                                setShowSeatSelectionModal(true);
                                await trackMixpanelEvent("View_Seat_Map")
                              }}><span>{checkingSeats ? 'Checking seats.....' : !checkingSeats && seatsDataFound ? 'View Seat Map' : 'Seats Assigned Randomly'}</span></button>

                              {
                                (!checkingSeats && !seatsDataFound) &&

                                <p className='fs-12 bg-light-blue color-black border p-2 rounded-2 mt-3'><strong>Note:</strong> Seats will be Assigned Randomly. The 'Seat Selection' option is not available for this flight.</p>
                              }
                            </div>
                            <div className='col-4 col-xl-3'>
                              <Image
                                className="h-auto w-100"
                                loader={trvLoader}
                                src="seat-selection.svg"
                                alt="Seat Selection"
                                width={176}
                                height={43}
                              />
                            </div>
                          </div>
                        }
                        {isSeatCriteriaSelected &&

                          <div className='SeatSelectionDetailsTable'>
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                              {segments && segments.length > 0 &&
                                segments.map((segment, index) => {
                                  return (
                                    <li className="nav-item" role="presentation">
                                      <button className={`${index == selectedSegmentIndex ? 'nav-link active' : 'nav-link'}`} id="SeatDetailTab1-tab" data-bs-toggle="pill" data-bs-target={`#SeatDetailTab_${index}`} type="button" role="tab" aria-controls="SeatDetailTab1" aria-selected="true"
                                        onClick={(e) => {
                                          setSelectedSegmentIndex(index);
                                        }}
                                      >
                                        {segment.segmentData.rowSeats[0].seats[0].origin}-{segment.segmentData.rowSeats[0].seats[0].destination}
                                      </button>
                                    </li>
                                  );
                                })
                              }
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                              <div className="tab-pane fade show active" id={`#SeatDetailTab_${selectedSegmentIndex}`} role="tabpanel" aria-labelledby="SeatDetailTab1-tab">
                                <table className="table color-black fw-bold fs-12">
                                  <thead className="bg-light-blue">
                                    <tr>
                                      <td>Traveler</td>
                                      <td>Seat Number</td>
                                      <td>Fare Price</td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {segments && segments[selectedSegmentIndex] && segments[selectedSegmentIndex].passengers && segments[selectedSegmentIndex].passengers.length > 0 &&

                                      segments[selectedSegmentIndex].passengers.map((p, i) => {
                                        return (
                                          <tr valign="middle">
                                            <td>{p?.name}</td>
                                            <td>
                                              <div className="SelectSeatDetail active">{p?.seat?.code}</div>
                                            </td>
                                            <td>
                                              {p && p.seat && p.seat.price &&
                                                <div className='w-bold'>₹ {p?.seat?.price}</div>
                                              }
                                              {(!p || !p.seat) &&
                                                <div className='w-bold'>₹ 0</div>
                                              }
                                            </td>
                                          </tr>
                                        );
                                      })
                                    }

                                  </tbody>
                                </table>
                              </div>

                            </div>
                            <button className="buttonStyle2 ViewSeatModelButton mt-3 border-0 color-white fs-14 rounded-3" disabled={!(!checkingSeats && seatsDataFound)} onClick={async () => { setShowSeatSelectionModal(true); }}><span>{checkingSeats ? 'Checking seats.....' : !checkingSeats && seatsDataFound ? 'Modify Seats' : 'No seats availability'}</span></button>
                          </div>

                        }
                      </div>
                   
                      <div className='checkout-step-main-box bg-white p-3 mt-4 d-none'>
                        <div className="">
                          <div className="row align-items-center">
                            <div className="col-12 col-md-7">
                              <div className="bg-grey rounded-pill border py-2 px-4 w-auto d-inline-block">
                                <p className="mb-0 fs-12 color-black fw-bold">08:13 left to complete booking</p>
                              </div>
                            </div>
                            <div className="col-12 col-md-5 text-end">
                              <div className="fw-bold fs-16">
                                <span className="pe-2 opacity-50">Total Fare:</span>
                                <span>₹ 4955</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row border m-0 my-3">
                          <div className="col-12 col-md-4 col-lg-3 p-md-0">
                            <div className="PaymentMethorMenu bg-grey h-100">
                              <ul className="nav nav-pills d-md-block" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                  <button className="nav-link active" id="debit-credit-card-tab" data-bs-toggle="pill" data-bs-target="#debit-credit-card" type="button" role="tab" aria-controls="debit-credit-card" aria-selected="true">Debit/ Credit Card</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button className="nav-link" id="netbanking-tab" data-bs-toggle="pill" data-bs-target="#netbanking" type="button" role="tab" aria-controls="netbanking" aria-selected="false">Netbanking</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button className="nav-link" id="wallets-tab" data-bs-toggle="pill" data-bs-target="#wallets" type="button" role="tab" aria-controls="wallets" aria-selected="false">Wallets</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button className="nav-link" id="UPI-tab" data-bs-toggle="pill" data-bs-target="#UPI" type="button" role="tab" aria-controls="UPI" aria-selected="false">UPI</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button className="nav-link" id="google-pay-tab" data-bs-toggle="pill" data-bs-target="#google-pay" type="button" role="tab" aria-controls="google-pay" aria-selected="false">GooglePay</button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-12 col-md-8 col-lg-9 p-md-0">
                            <div className="PaymentMethorDetails">
                              <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="debit-credit-card" role="tabpanel" aria-labelledby="debit-credit-card-tab">
                                  <div className="p-3">
                                    <div className="fw-bold fs-18 border-bottom pb-3 mb-2">Debit/ Credit Card</div>
                                    <div className="CardDetailForm checkout-step-main-box">
                                      <div className="row">
                                        <div className="col-12">
                                          <div className="input-group my-2">
                                            <label className="form-label">Card number<span>*</span></label>
                                            <div className="position-relative w-100">
                                              <input className="p-3 form-control float-start w-100" placeholder="1234 1234 **** **** ****" maxlength="16" type="text" />
                                              <Image
                                                className="h-auto position-absolute end-0 m-auto top-0 bottom-0 me-3"
                                                loader={trvLoader}
                                                src="payment-card/visa.webp"
                                                alt="green-tick-icon"
                                                width={40}
                                                height={43}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-12 col-md-4 col-lg-6">
                                          <div className="input-group my-2">
                                            <label className="form-label">Card Holder's Name<span>*</span></label>
                                            <div className="position-relative w-100">
                                              <input className="p-3 form-control float-start w-100" placeholder="John Doe" maxlength="16" type="text" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3">
                                          <div className="input-group my-2">
                                            <label className="form-label">Expiration<span>*</span></label>
                                            <div className="position-relative w-100">
                                              <input className="p-3 form-control float-start w-100" placeholder="MM/YY" maxlength="16" type="text" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3">
                                          <div className="input-group my-2">
                                            <label className="form-label">CVV<span>*</span></label>
                                            <div className="position-relative w-100">
                                              <input className="p-3 form-control float-start w-100" placeholder="***" maxlength="16" type="text" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-12 my-2">
                                          <div>
                                            <div className="fs-12 color-black fw-bold"><span className="color-orange">We use 128-bit</span> secure encryption providing you a SAFE Payment environment</div>
                                          </div>
                                        </div>
                                        <div className="col-12 my-2 text-end">
                                          <div className="d-flex align-items-center justify-content-end">
                                            <div className="me-3">
                                              <div className="color-orange fw-bold">₹ 4955</div>
                                            </div>
                                            <div className="">
                                              <button className="buttonStyle3 fs-12 border-0">Make Payment</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="tab-pane fade" id="netbanking" role="tabpanel" aria-labelledby="netbanking-tab">Netbanking</div>
                                <div className="tab-pane fade" id="wallets" role="tabpanel" aria-labelledby="wallets-tab">Wallets</div>
                                <div className="tab-pane fade" id="UPI" role="tabpanel" aria-labelledby="UPI-tab">UPI</div>
                                <div className="tab-pane fade" id="google-pay" role="tabpanel" aria-labelledby="google-pay-tab">GooglePay</div>
                              </div>
                              <div className="border-top text-center py-2 mt-5">
                                <Image
                                  className="w-auto"
                                  loader={trvLoader}
                                  src="partner-logo/IATA.png"
                                  alt="green-tick-icon"
                                  width={40}
                                  height={25}
                                />
                                <Image
                                  className="w-auto mx-4"
                                  loader={trvLoader}
                                  src="icon/google-review.png"
                                  alt="green-tick-icon"
                                  width={40}
                                  height={25}
                                />
                                <Image
                                  className="w-auto"
                                  loader={trvLoader}
                                  src="icon/secure-ssl-logo.png"
                                  alt="green-tick-icon"
                                  width={40}
                                  height={25}
                                />
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
                                                <span className="ms-3 me-3">{pax.gender == 2 ? "Female" : "Male"} | {getFormattedDate7(pax.dob)}</span>
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
                            <div className={returnFlight ? 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6' : 'col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'}>
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
                              returnFlight &&
                              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 border-start'>
                                <div className='user-flight-review-box'>
                                  <div className='heading d-flex justify-content-between align-items-center'>
                                    <h6 className='mb-0 fw-bold'>Return | {getFormattedDate4(returnFlight.trips[0].listOfFlight[0].departeddate)}</h6>
                                    <button className='transparent-btn text-end' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => setSelectedTabIndex(1)}>View Details</button>
                                  </div>
                                  <div className='airlinelogo d-flex align-items-center mt-4 mb-3'>
                                    <Image
                                      className="airline-logo h-auto"
                                      loader={airlineLogoLoader}
                                      src={`airline-logo/${returnFlight.trips[0].validatingCarrier.code}.webp?q=100`}
                                      alt="airplane-plus-icon"
                                      width={35}
                                      height={43}
                                    />
                                    <span className='ps-3'>{returnFlight.trips[0].validatingCarrier.name}</span>
                                  </div>
                                  <div className='row airbox-details align-items-center'>
                                    <div className='col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 col-xxl-2'>
                                      <span>{getFormattedTime(returnFlight.trips[0].listOfFlight[0].departureTime)}</span>
                                      <h6 className='fw-bold mb-0'>{returnFlight.trips[0].listOfFlight[0].fromCode}</h6>
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
                                          <span>{getDiffFromMinutes(returnFlight.trips[0].totalTripTime)}</span>
                                          <hr />
                                          <span>{returnFlight.trips[0].listOfFlight.length == 1 ? "Non-Stop" : (returnFlight.trips[0].listOfFlight.length - 1) + (returnFlight.trips[0].listOfFlight.length == 2 ? " Stop" : " Stops")}</span>
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
                                      <span>{getFormattedTime(returnFlight.trips[0].listOfFlight[returnFlight.trips[0].listOfFlight.length - 1].arrivalTime)}</span>
                                      <h6 className='fw-bold mb-0'>{returnFlight.trips[0].listOfFlight[returnFlight.trips[0].listOfFlight.length - 1].toCode}</h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div> */}
                      <div className='checkout-step-main-box bg-white p-3 mt-4 d-lg-none'>
                        <h5 className='mb-3 fw-bold fs-16'>Have a coupon code</h5>
                        <div className="input-group mb-3">
                          <input onChange={(e) => { setPromoCode(e.target.value) }} type="text" value={promoCodeName} className="form-control" placeholder="Promo Code" aria-label="Promo Code" aria-describedby="button-addon2" />

                          {
                            hasPromoCodeApplied &&
                            <button className="btn bg-green color-white fs-14 px-3" type="button" id="button-addon2" onClick={() => { removePromoCode(); }}>Clear</button>
                          }

                          {
                            !hasPromoCodeApplied &&
                            <button className="btn bg-orange color-white fs-14 px-3" onClick={() => {
                              if (allCoupons.some(x => x.name.toLowerCase() == promoCodeName.toLowerCase())) {
                                let currentCoupon = allCoupons.find(x => x.name.toLowerCase() == promoCodeName.toLowerCase());
                                if (currentCoupon && !!currentCoupon.name)
                                  applyPromoCode(currentCoupon);
                              }

                            }} type="button" id="button-addon2">Apply</button>
                          }
                        </div>
                        {
                          hasPromoCodeApplied &&
                          <div>
                            <p className='color-green fw-bold fs-12'>Congratulations! {couponData?.name} Discount of Rs.{numberFormat(discountAmount).split(".")[0]} has been applied successfully.</p>
                          </div>
                        }

                        {
                          allCoupons.map((promoCoupon, ix) => {
                            var couponLabel = "";

                            if (promoCoupon.discountPercentage > 0
                            ) {
                              couponLabel = `Apply Promo Code and get ${promoCoupon.discountPercentage}% off, Max up to ${promoCoupon.discount}`
                            }
                            if (promoCoupon.discountPercentage <= 0)
                              couponLabel = `Apply Promo Code and get  Max up to ${promoCoupon.discount}`
                            return (<div className='' key={ix}>
                              <div id={'section_' + promoCoupon.name} className="form-check my-3" >
                                <input checked={promoCodeName == promoCoupon.name} className="form-check-input" type="radio" name="flexRadioDefault_mob" id={"mob_" + promoCoupon.name} onClick={() => { applyPromoCode(promoCoupon); }} />
                                <label className="form-check-label fw-bold" for={"mob_" + promoCoupon.name} >
                                  <span>{promoCoupon.name}</span>
                                  <h6 className='mb-0 fs-10'>{couponLabel}</h6>
                                </label>
                              </div>

                            </div>)
                          })
                        }
                      </div>
                      <div className='row'>
                        <div className='col-12'>
                          <div className='important-note mt-4 text-center'>
                            <p className=''><strong>Note: </strong>We welcome transactions made using Indian domestic credit or debit cards. If you are using an international card, kindly contact us at <a className='fw-bold text-nowrap' href={"tel:" + displayContactNumber}>{displayContactNumber}</a> for assistance.</p>
                            <p className=''>By clicking, Confirm & Book I agree that I have read and accepted Travanya<br /> <a href="/terms-conditions" target="_blank"><strong>Terms & Conditions</strong></a> and <a href="/privacy-policy" target="_blank"><strong>Privacy Policy.</strong></a></p>
                          </div>
                        </div>
                        <div className='col-12'>
                          <button className="border-0 fs-14 py-3 buttonStyle3 next w-100 d-none d-lg-inline" onClick={async () => { confirmBooking(); }}>
                              <span className="confirm_btn">Make Payment</span>
                            </button>
                        </div>
                      </div>
                      <div className="tab-content" id="nav-tabContent">
                        {/* <div className={currentTab == 1 ? "tab-pane show active" : "tab-pane"} id="contact-info">

                          <div className='d-flex justify-content-end mt-4'>
                            <button className="border-0 fs-14 buttonStyle3 next d-none d-lg-inline" onClick={() => goToNextTab(2, true)}>Continue to Next Step</button>
                          </div>
                        </div> */}
                        {/* <div className={currentTab == 2 ? "tab-pane show active" : "tab-pane"} id="traveler-info">
                          

                          <div className="d-flex justify-content-end mt-4"><button className="border-0 fs-14 buttonStyle3 next d-none d-lg-inline" onClick={() => goToNextTab(3, true)}>Continue to Next Step</button></div>
                        </div> */}
                        {/* <div className={currentTab == 3 ? "tab-pane show active" : "tab-pane"} id="optionals-info">
                          
                          <div className="d-flex justify-content-end mt-4"><button className="border-0 fs-14 buttonStyle3 next d-none d-lg-inline" onClick={() => goToNextTab(4, true)}>Continue to Next Step</button></div>
                        </div> */}
                        {/* <div className={currentTab == 4 ? "tab-pane show active" : "tab-pane"} id="payment-info">
                          
                          <div className="d-flex justify-content-end mt-2">
                            
                          </div>
                        </div> */}
                      </div>
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
                                        <i className={returnFlight ? "pt-1 fa-solid fa-arrow-right-arrow-left ms-2 me-2" : "pt-1 fa-solid fa-arrow-right-long ms-2 me-2"}></i>
                                        <h5 className="mb-0 fw-bold">{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode}</h5>
                                      </div>
                                      <div className='mt-2 d-flex align-item-center justify-content-center'>
                                        <span>{getFormattedDate6(flight.trips[0].listOfFlight[0].departeddate)} {returnFlight && "- " + getFormattedDate6(returnFlight.trips[0].listOfFlight[0].departeddate)} | {sssPassangers + (sssPassangers > 1 ? " Passengers" : " Adult")} | {flight.displayCabin}</span>
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
                                      <span className='flytime'>{getFormattedTime(flight.trips[0].listOfFlight[0].departureTime)}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                      <h6 className='mb-0 mt-2'>{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].airportToCity} ({flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode})</h6>
                                      <span className='flytime'>{getFormattedTime(flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].arrivalTime)}</span>
                                    </div>

                                    {
                                      returnFlight &&
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

                                            <h5 className='mb-0 ms-2'>{getFormattedDate4(returnFlight.trips[0].listOfFlight[0].departeddate)}</h5>
                                          </div>
                                          <div className='d-flex align-items-center text-end'>
                                            <span className='ms-2 '>{getDiffFromMinutes(returnFlight.trips[0].totalTripTime)}, {returnFlight.trips[0].listOfFlight.length == 1 ? "Non-Stop" : (returnFlight.trips[0].listOfFlight.length - 1) + (returnFlight.trips[0].listOfFlight.length == 2 ? " Stop" : " Stops")}</span>
                                          </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center mb-2'>
                                          <h6 className='mb-0 mt-2'>{returnFlight.trips[0].listOfFlight[0].airportFromCity} ({returnFlight.trips[0].listOfFlight[0].fromCode})</h6>
                                          <span className='ms-2 flytime'>{getFormattedTime(returnFlight.trips[0].listOfFlight[0].departureTime)}</span>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center mb-2'>
                                          <h6 className='mb-0 mt-2'>{returnFlight.trips[0].listOfFlight[returnFlight.trips[0].listOfFlight.length - 1].airportToCity} ({returnFlight.trips[0].listOfFlight[returnFlight.trips[0].listOfFlight.length - 1].toCode})</h6>
                                          <span className='ms-2 flytime'>{getFormattedTime(returnFlight.trips[0].listOfFlight[returnFlight.trips[0].listOfFlight.length - 1].arrivalTime)}</span>
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
                              if (returnFlight) {
                                let rtnFare = returnFlight.fareDetails[ix];
                                psgPrice = psgPrice + (Math.round(rtnFare.totalFareAmount - rtnFare.totalTaxAmount) / rtnFare.noofPax);
                              }
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

                            <div className="price-detail-row d-flex justify-content-between align-items-center mb-3">
                              <h6 className='mb-0'>Taxes & Fees</h6>
                              <h6 className="mb-0">{numberFormat(Math.round(totalTax)).split(".")[0]}
                              </h6>
                            </div>
                            {
                              isSeatCriteriaSelected &&
                              totalSeatPrice > 0 &&
                              <div className="price-detail-row d-flex justify-content-between align-items-center mb-3">
                                <h6 className='mb-0'>Seat price</h6>
                                <h6 className="mb-0">{numberFormat(totalSeatPrice).split(".")[0]}
                                </h6>
                              </div>
                            }
                            {
                              hasPromoCodeApplied &&
                              <div className="price-detail-row d-flex justify-content-between align-items-center mb-3">
                                <h6 className='mb-0 color-green fw-bold'>Discount</h6>
                                <h6 className="mb-0 color-green fw-bold">{numberFormat(discountAmount).split(".")[0]}
                                </h6>
                              </div>
                            }

                          </div>
                        </div>

                        <div className='ps-3 pb-3 pe-3 bg-white total-price-box-wrap'>
                          <div className='bg-grey ps-3 pt-3 pb-3 pe-3 d-flex justify-content-between align-items-center'>
                            <h5 className='mb-0 fw-bold'>Total Price (INR)</h5>
                            <h5 className='mb-0 fw-bold'>
                              {
                                numberFormat(Number(tripTotalPrice + (isSeatCriteriaSelected ? totalSeatPrice : 0))).split(".")[0]
                              }
                            </h5>
                          </div>

                        </div>
                        <div className='bg-white mt-4 ps-3 pt-3 pb-3 pe-3'>
                          <h5 className='mb-3 fw-bold'>Have a coupon code</h5>
                          <div className="input-group mb-3">
                            <input onChange={(e) => {
                              setPromoCode(e.target.value)
                            }} type="text" value={promoCodeName} className="form-control" placeholder="Promo Code" aria-label="Promo Code" aria-describedby="button-addon2" />

                            {
                              hasPromoCodeApplied &&
                              <button className="btn bg-green color-white fs-14 px-3" type="button" id="button-addon2" onClick={() => { removePromoCode(); }}>Clear</button>
                            }

                            {
                              !hasPromoCodeApplied &&
                              <button className="btn bg-orange color-white fs-14 px-3" onClick={() => {
                                if (allCoupons.some(x => x.name.toLowerCase() == promoCodeName.toLowerCase())) {
                                  let currentCoupon = allCoupons.find(x => x.name.toLowerCase() == promoCodeName.toLowerCase());
                                  if (currentCoupon && !!currentCoupon.name)
                                    applyPromoCode(currentCoupon);
                                }

                              }} type="button" id="button-addon2">Apply</button>

                            }
                          </div>
                          {
                            hasPromoCodeApplied &&
                            <div>
                              <p className='color-green fw-bold fs-12'>Congratulations! {couponData.name} Discount of Rs.{numberFormat(discountAmount).split(".")[0]} has been applied successfully.</p>
                            </div>
                          }

                          {
                            allCoupons.map((promoCoupon, ix) => {
                              var couponLabel = "";

                              if (promoCoupon.discountPercentage > 0
                              ) {
                                couponLabel = `Apply Promo Code and get ${promoCoupon.discountPercentage}% off, Max up to ${promoCoupon.discount}`
                              }
                              if (promoCoupon.discountPercentage <= 0)
                                couponLabel = `Apply Promo Code and get  Max up to ${promoCoupon.discount}`

                              return (<div className='' key={ix}>
                                <div id={'section_' + promoCoupon.name} className="form-check my-3" >
                                  <input checked={promoCodeName == promoCoupon.name} className="form-check-input" type="radio" name="flexRadioDefault" id={promoCoupon.name} onClick={() => {
                                    applyPromoCode(promoCoupon);
                                  }} />
                                  <label className="form-check-label fw-bold" for={promoCoupon.name} >
                                    <span>{promoCoupon.name}</span>
                                    <h6 className='mb-0 fs-10'>{couponLabel}</h6>
                                  </label>
                                </div>

                              </div>)
                            })
                          }
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
                        <DetailsFlap totalSeatPrice={totalSeatPrice} setLoader={false} selectedFlight={flight} selectedRtnFlight={returnFlight} isCheckout={true} selectedTabIndex={selectedTabIndex} sssPassangers={sssPassangers} discount={hasPromoCodeApplied ? Number(discountAmount / sssPassangers) : 0} />
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="fixed-bottom w-100 bg-white pt-3 pb-3 total-price-mob-strip d-lg-none">
            <div className='row ms-0 me-0 align-items-center'>
              <div className='col-5 col-sm-5 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                <div className='label'>Trip total</div>
                <h3 className='fw-bold mb-0'>
                  {numberFormat(Number(tripTotalPrice + totalSeatPrice)).split(".")[0]}
                </h3>
                <button type="button" className="transparent-btn color-blue fs-12 fw-bold" data-bs-toggle="modal" data-bs-target="#viewPricePopup">View price summary</button>
              </div>
              <div className='col-7 col-sm-7 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                <button className="float-end next buttonStyle2 border-0 " onClick={() => {
                  // if (currentTab == 4)
                  //   confirmBooking();
                  // else
                  //   goToNextTab(currentTab + 1, true);
                  confirmBooking();

                }}><span className='fs-12'>Confirm & Book Flight</span></button>
              </div>
            </div>
          </div>
          {
            flight &&
            <div className="modal fade" id="viewPricePopup" tabindex="-1" aria-labelledby="viewPricePopupLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title fw-bold" id="viewPricePopupLabel">Price Summary</h6>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    {flight.fareDetails.map((fare, ix) => {
                      let psgPrice = (Math.round(fare.totalFareAmount - fare.totalTaxAmount) / fare.noofPax);
                      if (returnFlight) {
                        let rtnFare = returnFlight.fareDetails[ix];
                        psgPrice = psgPrice + (Math.round(rtnFare.totalFareAmount - rtnFare.totalTaxAmount) / rtnFare.noofPax);
                      }
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

                    <div className="price-detail-row d-flex justify-content-between align-items-center mb-3">
                      <h6 className='mb-0'>Taxes & Fees</h6>
                      <h6 className="mb-0">{numberFormat(Math.round(totalTax)).split(".")[0]}
                      </h6>
                    </div>
                    {
                      isSeatCriteriaSelected &&
                      totalSeatPrice > 0 &&
                      <div className="price-detail-row d-flex justify-content-between align-items-center mb-3">
                        <h6 className='mb-0'>Seat price</h6>
                        <h6 className="mb-0">{numberFormat(totalSeatPrice).split(".")[0]}
                        </h6>
                      </div>
                    }

                    {
                      hasPromoCodeApplied &&
                      <div className="price-detail-row d-flex justify-content-between align-items-center mb-3">
                        <h6 className='mb-0 color-green fw-bold'>Discount</h6>
                        <h6 className="mb-0 color-green fw-bold">{numberFormat(discountAmount)}
                        </h6>
                      </div>
                    }
                    <div className='pb-3 bg-white total-price-box-wrap'>
                      <div className='bg-grey ps-3 pt-3 pb-3 pe-3 d-flex justify-content-between align-items-center'>
                        <h5 className='mb-0 fw-bold'>Total Price (INR)</h5>
                        <h5 className='mb-0 fw-bold'>
                          {
                            numberFormat(Number(tripTotalPrice + totalSeatPrice)).split(".")[0]
                          }
                        </h5>
                      </div>

                    </div>


                  </div>
                </div>
              </div>
            </div>
          }
        </section>

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

        <Modal className='centred-modal' show={openNewPriceModal}>
          <Modal.Body >
            <ChangePrice hasDepartPriceChanged={hasDepartPriceChanged} isListinPage={false} setOpenNewPriceModal={setOpenNewPriceModal} newPrice={newPrice} oldPrice={oldPrice} confirmBooking={confirmBooking} flight={flight} updateDepartChangedPrice={updateDepartChangedPrice} updateReturnChangedPrice={updateReturnChangedPrice}></ChangePrice>
          </Modal.Body>
        </Modal>
        <Modal className='centred-modal' show={openBookingFailedModal}>
          <Modal.Body >
            <BookingFailed setOpenBookingFailedModal={setOpenBookingFailedModal} ></BookingFailed>
          </Modal.Body>
        </Modal>
        <Modal className='SeatSelectionModal' show={showSeatSelectionModal}>
          <Modal.Body >
            <button className='p-0 border-0 bg-transparent position-absolute end-0 me-4 mt-3 closePopup' onClick={() => setShowSeatSelectionModal(false)}>
              <i className="color-white  fs-20 fa-solid fa-xmark"></i>
            </button>
            <SeatSelection getPassengers={getPassengers} segments={segments} setSegments={setSegments} setShowSeatSelectionModal={setShowSeatSelectionModal} setTotalSeatPrice={setTotalSeatPrice} totalSeatPrice={totalSeatPrice} setDepartSeats={setDepartSeats} setReturnSeats={setReturnSeats} returnFlightSSRServices={returnFlightSSRServices} departFlightSSRServices={departFlightSSRServices} setSeatingSelectionDone={setSeatingSelectionDone} ></SeatSelection>
          </Modal.Body>
        </Modal>

        <SkipNGoToHome goHomeText={"Go Back"} setOpenBackModal={setOpenBackModal} openBackModal={openBackModal} setIsBackLoading={setIsBackLoading} isBackLoading={isBackLoading}></SkipNGoToHome>


      </Layout >
      {
        flight &&
        <InnterFooter></InnterFooter>
      }
    </>
  )
}