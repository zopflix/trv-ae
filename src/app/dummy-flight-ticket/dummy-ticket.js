"use client"
import { forwardRef, useEffect, useRef, useState } from "react";
import NumericInput from "react-numeric-input";
import { searchDummyFlights, getAirports } from "../services/flightService";
import { dummyTicketPayment } from "../services/bookingService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import CryptoJS from 'crypto-js'
import Header from "../components/header";
import Footer from "../components/footer";
import { airlineLogoLoader, sfLoader, trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";
import { checkMaxDateRange, getMaxDatePicker, gtag_report_conversion, trackMixpanelEvent } from "../helpers/common";
import PartnerLogo from "../components/partner-logo";
import GoogleReviews from "../components/google-reviews";


export default function DummyTicketForm() {
  const [ShowTravewlersCount, SetShowTravewlersCount] = useState(false)
  const [tripType, setTripType] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [airports, setAirports] = useState([]);
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [localAirportData, setLocalAirportDate] = useState([]);
  const [showToDate, setShowToDate] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date(new Date(new Date().setDate(new Date().getDate() + 2))));
  const [cabinClass, setCabinClass] = useState('Economy');
  const [cabinValue, setCabinValue] = useState(1);
  const [flights, setFlights] = useState([]);
  const [isProgress, setInProgress] = useState(false);
  const [isSearchProgress, setSearchInProgress] = useState(false);
  const [contract, setContract] = useState(null);
  const [travellers, setTravellers] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [isRoutesFilled, setRoutesFilled] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [isTripSwitched, setTripSwitched] = useState(false);
  const [currentSearchTerm, setSearchTerm] = useState("");
  const [destinationSearchTerm, setDestinationSearchTerm] = useState("");
  const [destinationAirports, setDestinationAirports] = useState([]);
  const [rtnDateOpen, setReturnDateOpened] = useState(false);
  const toDtePickerRef = useRef(null);
  const [prevPayload, setPrevPayload] = useState();
  const [isSameSearchErr, setIsSameSearchErr] = useState(false);

  const getDiffFromMinutes = (minutes) => {
    let difference = moment.duration(parseInt(minutes), 'minutes');
    let allHours = (difference.hours() + (24 * difference.days()));
    return (allHours > 9 ? (allHours + "h") : "0" + allHours + "h") + " " + (difference.minutes() > 9 ? difference.minutes() + "m" : "0" + difference.minutes() + "m");
  }

  const getFormattedDate = (date) => {
    return moment(date).format("DD MMM YY");
  }

  const getFormattedTime = (time) => {
    return moment(time, "hh:mm").format("hh:mm A");
  }

  const handleToDtePickerOutsideClick = (event) => {
    if (toDtePickerRef.current && !toDtePickerRef.current.contains(event.target)) {
      setReturnDateOpened(false);
    }
  };

  const DiableKeyboardOnMobile = forwardRef(({ value, onClick }, ref) => (
    <button className="DatePickerButton" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const updateReturnDate = () => {
    let currentDate = fromDate ? new Date(fromDate) : new Date();
    let maxDate = getMaxDatePicker();
    let isMaxFromDate = checkMaxDateRange(maxDate, currentDate, 3);
    if (!isMaxFromDate) {
      let _setToDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
      setToDate(_setToDate);
    }
    else {
      setToDate(maxDate);
    }
  }

  useEffect(() => {
    loadAirportRoutes();
    document.addEventListener("click", handleToDtePickerOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleToDtePickerOutsideClick, true);
    }
  }, [])

  useEffect(()=>{
    (async () => {
      await trackMixpanelEvent("Dummy_Ticket_Load");
    })();

  },[])

  const allowChars = (value) => {

    var allowedChars = "0123456789";
    let cVal = value;

    if (allowedChars.indexOf(value.substring(value.length - 1)) == -1) {
      cVal = cVal.substring(0, cVal.length - 1);
    }

    return cVal;
  }

  const isValidaEmail = (value) => {

    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.match(validRegex) && value.match(validRegex).length > 0) {

      return true;

    } else {

      return false;
    }
  }

  const isTravellerFormInValid = () => {

    setIsValidated(true);

    let invalidTravellers = travellers.filter((x) =>
      !x.firstName || !x.lastName || !x.email || !x.contactNo
      || (x.email && !isValidaEmail(x.email)) || (x.contactNo && x.contactNo.length != 10)
    );

    return invalidTravellers.length > 0;
  }


  const onSelectFlight = (flight) => {

    setIsValidated(false);

    flight.showTraverllerInfo = true;

    setContract(flight);

    let travellers = [];

    flight.fareDetails.map((x) => {

      for (let i = 0; i < x.noofPax; i++) {

        travellers.push({
          firstName: "",
          lastName: "",
          email: "",
          contactNo: ""
        })
      }
    })

    setTravellers(travellers);
  }

  const searchAirport = (srchCodeName, isOriginAirport = true) => {
    if (isOriginAirport)
      setSearchTerm(srchCodeName);
    else
      setDestinationSearchTerm(srchCodeName);

    setIsValidated(false);

    if (srchCodeName.length < 3) {
      return;
    }

    let airportList = [...localAirportData];

    let filteredRecords = airportList.filter((airport) =>
      srchCodeName.length == 3
        ? airport.value.toLowerCase().includes(srchCodeName.toLowerCase())
        : airport.label.toLowerCase().includes(srchCodeName.toLowerCase())
    );

    if (filteredRecords.length >= 1) {
      if (isOriginAirport)
        setAirports(filteredRecords);
      else
        setDestinationAirports(filteredRecords);
    }
  }

  const processPayment = async () => {
    if (isTravellerFormInValid()) {
      return;
    }
    await trackMixpanelEvent("Dummy_Ticket_Download_Button");

    setIsValidated(false);
    let dataToSend = {
      contract: contract,
      dummyTravellers: travellers,
      portalID: 50
    };

    setInProgress(true);
    dummyTicketPayment(dataToSend).then(async (res) => {
      setInProgress(false);
      if (res && res.success) {
        gtag_report_conversion();
        localStorage.setItem("bookingInformation", JSON.stringify(res.bookingInfo));
        createPaymentForm(res.data);
      }
    });
  }

  const searchFlights = async () => {
    setSearchSubmitted(true);
    setIsSameSearchErr(false);
    if (!isRoutesFilled) {
      return;
    }
    await trackMixpanelEvent("Dummy_Ticket_Search");

    let segments = [
      {
        fromCode: fromAirport.value,
        toCode: toAirport.value,
        departureDate: fromDate,
        fromLabel: fromAirport.label,
        toLabel: toAirport.label,
        fromCountry: fromAirport.country,
        toCountry: toAirport.country,
      },
    ];

    if (!!toDate && tripType == 2) {
      segments.push({
        fromCode: toAirport.value,
        toCode: fromAirport.value,
        departureDate: toDate,
      });
    }

    let data = {
      tripType: parseInt(tripType),
      senior: 0,
      noOfAdult: parseInt(adults),
      child: parseInt(children),
      noOfLapInfant: parseInt(infants),
      cabin: parseInt(cabinValue),
      segments: segments,
      portalId: 50
    };

    if (prevPayload && data && data.tripType == prevPayload.tripType && data.noOfAdult == prevPayload.noOfAdult
      && data.child == prevPayload.child && data.noOfLapInfant == prevPayload.noOfLapInfant && data.cabin == prevPayload.cabin
      && data.segments.length == prevPayload.segments.length && data.segments[0].fromCode == prevPayload.segments[0].fromCode
      && data.segments[0].toCode == prevPayload.segments[0].toCode && data.segments[0].departureDate == prevPayload.segments[0].departureDate
      && data.segments[1]?.departureDate == prevPayload.segments[1]?.departureDate) {
      setIsSameSearchErr(true);
      return;
    }
    setPrevPayload(data);
    setSearchInProgress(true);
    searchDummyFlights(data).then((response) => {
      setFlights(response);
      setSearchInProgress(false);
    })
  }

  const loadAirportRoutes = () => {
    getAirports().then((response) => {
      if (response && response.length > 1) {
        setLocalAirportDate(response);
      }
    })
  }

  const Decrypt = (str) => {
    const key = CryptoJS.enc.Utf8.parse("12@22Sh!pra@@0#0");
    const iv = CryptoJS.enc.Utf8.parse("12@22Sh!pra@@0#0");
    var decrypt = CryptoJS.AES.decrypt(str, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
  }

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

  return (
    <>
      <Header />

      <section id="mainSearchForm" className="py-5 trv-bg-semi-blue DummyTicketForm">
        <div className='container'>
          <div className='row mt-md-5'>
            <h1 className='fs-28 text-center fw-bolder text-white'>Book Your Dummy Flight Ticket for Only ₹500</h1>
            <p className='fs-16 text-center text-white'>Our dummy tickets are valid for visa applications and serve as proof of travel or return tickets. </p>
          </div>

          <div className='flightSearchWrp rounded-3 bg-white p-4'>
            <div className="row align-itmes-center">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 py-2">
                <div className="d-flex">
                  <div>
                    <label className={tripType == 1 ? "cursor-pointer form-check-label fs-14 bg-orange color-white px-3 py-1 rounded-pill active" : "cursor-pointer form-check-label fs-14 bg-grey px-3 py-1 rounded-pill"} htmlFor="onway1" onClick={() => { setTripType(1) }}>One Way</label>
                  </div>
                  <div className="ms-2">
                    <label className={tripType == 2 ? "cursor-pointer form-check-label fs-14 bg-orange color-white px-3 py-1 rounded-pill active" : "cursor-pointer form-check-label fs-14 bg-grey px-3 py-1 rounded-pill"} htmlFor="roundtrip1" onClick={() => {
                      setTripType(2);
                      let _date = new Date(fromDate);
                      setToDate(new Date(_date.setDate(_date.getDate() + 3)));
                    }}>Round Trip</label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-8 col-xxl-8 py-2 text-end d-none d-md-inline"><h2 className="mb-0 color-blue fw-bold fs-20">Discover The Joy Of Flying At The Cheapest Prices!</h2></div>
            </div>

            <div className="mainFlightSearchBox border py-3 px-3">
              <div className="row align-items-center">
                <div className="mobForm FieldA col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
                  <div className="fromTofromBox">

                    <div className="row">
                      <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-2 border-end position-relative FromCodeSearchBox'>
                        <div className="bg-white">
                          <Image
                            className={!isTripSwitched ? "FlightFlip position-absolute end-0 m-auto top-50 bottom-50" : "FlightFlip position-absolute end-0 m-auto top-50 bottom-50 active"}
                            loader={trvLoader}
                            src="icon/flip-icon.svg"
                            alt="Flight Flip Icon"
                            width={35}
                            height={35}
                            onClick={() => {
                              let newFromCode = toAirport;
                              let newToCode = fromAirport;
                              setTripSwitched(!isTripSwitched);
                              setFromAirport(newFromCode);
                              setToAirport(newToCode);
                            }}
                          />
                          <div className="fromTofromBoxLabel fs-12">FROM</div>
                          <div className="dropdown cityBoxDropDown">
                            <button className="w-100 text-start after-none p-0 btn border-0 dropdown-toggle" type="button" id="fromCity" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => { document.getElementById('fromAirport').focus(); }}>
                              <div className="cityLabel text-truncate">{!fromAirport ? "Where from" : fromAirport?.cityName}</div>
                              <div className="airPortName fs-12 color-black">{!fromAirport ? "" : fromAirport?.label}</div>
                            </button>
                            <div className="dropdown-menu p-0 rounded-0" aria-labelledby="fromCity">
                              <div className="SearchCityBox d-flex align-items-center">
                                <div className="ms-3">
                                  <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <div><input className="border-0" type="text" autoComplete="off" placeholder="Where From?" id='fromAirport' onChange={(e) => { searchAirport(e.target.value); }} onFocus={(e) => e.target.value = ''} /></div>
                              </div>
                              <div className="SearchSectorTitle fw-bold fs-12 py-1 px-2">Searched Sectors</div>
                              {

                                (!!currentSearchTerm && (!airports || airports.length == 0)) &&
                                <div className="text-center blank-error-filed text-center">
                                  <video loop autoplay kind="captions"><source src="https://assets.neofares.com/no-match-found.mp4" type="video/mp4" /></video>
                                  <h6 className="fs-12 mb-4">Oops! No match found. Spell-check needed</h6>
                                </div>
                              }


                              {!currentSearchTerm &&
                                <div className="text-center">
                                  <Image
                                    className="h-auto w-50"
                                    loader={trvLoader}
                                    src="type-something.gif"
                                    alt="Key Board img"
                                    width={184}
                                    height={42}
                                  />
                                  <p className="fs-12">Enter atleast 3 characters to execute search</p>
                                </div>
                              }

                              <div className="SearchCityListBox">
                                {(currentSearchTerm && airports) &&
                                  airports.map((airport, index) => {
                                    return <div key={index} className="SearchCityList border-top">
                                      <div className="row m-0 align-items-center" onClick={() => {
                                        if (toAirport) {
                                          setRoutesFilled(true);
                                        }
                                        setFromAirport(airport);
                                      }}>
                                        <div className="col-9">
                                          <div>
                                            <span className="fs-10 color-white bg-black p-1">{airport.countryCode}</span>
                                            <span className="fs-14 ms-2 fw-bold">{airport.city}</span>
                                          </div>
                                          <div className="airPortName">
                                            <span className="fs-12">{airport.label}</span>
                                          </div>
                                        </div>
                                        <div className="col-3 ps-0">
                                          <div className="d-flex justify-content-end align-itmes-center">
                                            <div><span className="fs-12">{airport.country}</span></div>
                                            <div>
                                              <Image
                                                className="ms-2 h-auto" alt="Flag Icon"
                                                loader={sfLoader}
                                                src={`https://assets.neofares.com/country-flags/${airport.countryCode}.webp`}
                                                width={17}
                                                height={12}
                                              />
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                      <div className="row m-0">
                                        <div className="col-12">
                                          {
                                            (airport.options && airport.options.length) > 0 &&
                                            airport.options.map((option, ix) => {
                                              return (
                                                <div className="airPortGroping">
                                                  <a className="d-flex py-2 color-black fs-12 text-decoration-none" key={ix} onClick={() => {
                                                    if (toAirport) {
                                                      setRoutesFilled(true);
                                                    }
                                                    setFromAirport(option);
                                                  }}>
                                                    <Image
                                                      className="me-1"
                                                      loader={trvLoader}
                                                      src="icon/Location-icon.svg"
                                                      alt="Location icon"
                                                      width={18}
                                                      height={18}
                                                    />
                                                    <span>{option.label}</span>
                                                  </a>
                                                </div>
                                              )
                                            })
                                          }
                                        </div>
                                      </div>

                                    </div>
                                  })
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-2 border-end position-relative ToCodeSearchBox'>
                        <div className="bg-white">
                          <div className="fromTofromBoxLabel fs-12">TO</div>
                          <div className="dropdown cityBoxDropDown">
                            <button className="w-100 text-start after-none p-0 btn border-0 dropdown-toggle" type="button" id="toCity" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => { document.getElementById('toAirport').focus(); }}>
                              <div className="cityLabel text-truncate">{!toAirport ? "Where to" : toAirport?.cityName}</div>
                              <div className="airPortName fs-12 color-black">{!toAirport ? "" : toAirport?.label}</div>
                            </button>
                            <div className="dropdown-menu p-0 rounded-0" aria-labelledby="toCity">
                              <div className="SearchCityBox d-flex align-items-center">
                                <div className="ms-3">
                                  <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <div>
                                  <input className="border-0" type="text" autoComplete="off" id='toAirport' placeholder="Where To?" onChange={(e) => { searchAirport(e.target.value, false); }} onFocus={(e) => e.target.value = ''} />
                                </div>
                              </div>
                              <div className="SearchSectorTitle fw-bold fs-12 py-1 px-2">Searched Sectors</div>
                              {

                                (!!destinationSearchTerm && (!destinationAirports || destinationAirports.length == 0)) &&
                                <div className="text-center blank-error-filed text-center">
                                  <video loop autoplay kind="captions"><source src="https://assets.neofares.com/no-match-found.mp4" type="video/mp4" /></video>
                                  <h6 className="fs-12 mb-4">Oops! No match found. Spell-check needed</h6>
                                </div>
                              }

                              {!destinationSearchTerm &&
                                <div className="text-center">
                                  <Image
                                    className="h-auto w-50"
                                    loader={trvLoader}
                                    src="type-something.gif"
                                    alt="Key Board img"
                                    width={184}
                                    height={42}
                                  />
                                  <p className="fs-12">Enter atleast 3 characters to execute search</p>
                                </div>
                              }
                              <div className="SearchCityListBox">
                                {(destinationAirports && !!destinationSearchTerm) &&
                                  destinationAirports.map((airport, index) => {
                                    return <div key={index} className="SearchCityList border-top" >
                                      <div className="row m-0 align-items-center" onClick={() => {
                                        if (fromAirport) {
                                          setRoutesFilled(true);
                                        }
                                        setToAirport(airport);
                                      }}>
                                        <div className="col-9">
                                          <div>
                                            <span className="fs-10 color-white bg-black p-1">{airport.countryCode}</span>
                                            <span className="fs-14 ms-2 fw-bold">{airport.city}</span>
                                          </div>
                                          <div className="airPortName">
                                            <span className="fs-12">{airport.label}</span>
                                          </div>
                                        </div>
                                        <div className="col-3 ps-0">
                                          <div className="d-flex justify-content-end align-itmes-center">
                                            <div><span className="fs-12">{airport.country}</span></div>
                                            <div>
                                              <Image
                                                className="ms-2 h-auto" alt="Flag Icon"
                                                loader={sfLoader}
                                                src={`https://assets.neofares.com/country-flags/${airport.countryCode}.webp`}
                                                width={17}
                                                height={12}
                                              />
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                      <div className="row m-0">
                                        <div className="col-12">
                                          {
                                            (airport.options && airport.options.length) > 0 &&
                                            airport.options.map((option, ix) => {
                                              return (
                                                <div className="airPortGroping">
                                                  <a className="d-flex py-2 color-black fs-12 text-decoration-none" key={ix} onClick={() => {
                                                    if (fromAirport) {
                                                      setRoutesFilled(true);
                                                    }
                                                    setToAirport(option);
                                                  }}>
                                                    <Image
                                                      className="me-1"
                                                      loader={trvLoader}
                                                      src="icon/Location-icon.svg"
                                                      alt="Location icon"
                                                      width={18}
                                                      height={18}
                                                    />
                                                    <span>{option.label}</span>
                                                  </a>
                                                </div>
                                              )
                                            })
                                          }
                                        </div>
                                      </div>

                                    </div>
                                  })
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="mobForm FieldB col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
                  <div className="row">

                    <div className="col-6 bg-white col-md-4 py-2 border-end" >
                      <div className='bg-white trv-datepicker position-relative DepartDatePicer'>
                        <div className="fromTofromBoxLabel fs-12 d-flex align-items-center">
                          <span >
                            <Image
                              className="me-2"
                              loader={trvLoader}
                              src="icon/calendar-orange-icon.svg"
                              alt="calendar icon"
                              width={15}
                              height={15}
                            />
                          </span>
                          <div className="pt-1">DEPARTURE</div>
                        </div>
                        <h6 className="dateLabel mt-1 mb-1">
                          <span className="me-2">{fromDate?.getDate()}</span>
                          {fromDate?.toLocaleDateString('en-IN', { month: 'long' }).substr(0, 3)}’{fromDate?.getFullYear().toString().substr(2)}
                        </h6>
                        <div className="airPortName fs-12 color-black">{fromDate?.toLocaleDateString('en-IN', { weekday: 'long' })}</div>

                        <DatePicker
                          // className="form-control"
                          isClearable={false}
                          selected={fromDate}
                          showMonthSelect
                          showYearSelect
                          showMonthDropdown
                          showYearDropdown
                          onChange={(date) => {
                            if (date > toDate) {
                              let _date = new Date(date);
                              setToDate(new Date(_date.setDate(_date.getDate() + 3)));
                            }
                            setFromDate(date);
                            setReturnDateOpened((tripType == 2));
                          }}
                          minDate={new Date()}
                          dateFormat="dd/MMM/yy"
                          className='form-control d-flex w-100 h-100 bg-transparent border border-0 cursor-pointer'
                          customInput={<DiableKeyboardOnMobile />}
                        />
                      </div>
                    </div>

                    {
                      tripType == 1 &&
                      <div className="col-6 bg-white col-md-4 py-2 border-end">
                        <div className="bg-white">
                          <div className="fromTofromBoxLabel fs-12 d-flex align-items-center">
                            <div>
                              <Image
                                className="me-2"
                                loader={trvLoader}
                                src="icon/calendar-orange-icon.svg"
                                alt="calendar icon"
                                width={15}
                                height={15}
                              />
                            </div>
                            <div className="pt-1">RETURN</div>
                          </div>
                          <p className="mb-0 fs-12 mt-2" onClick={() => {
                            setTripType(2);
                            updateReturnDate();

                          }}>Tap to add a return date for bigger discounts</p>
                        </div>
                      </div>
                    }
                    {
                      tripType == 2 &&
                      <div className="col-6 bg-white col-md-4 py-2" ref={toDtePickerRef}>
                        <div className='bg-white position-relative trv-datepicker ReturnDatePicker cursor-pointer'>
                          <div className="fromTofromBoxLabel fs-12 d-flex align-items-center">
                            <span >
                              <Image
                                className="me-2"
                                loader={trvLoader}
                                src="icon/calendar-orange-icon.svg"
                                alt="calendar icon"
                                width={15}
                                height={15}
                              />
                            </span>
                            <div className="pt-1">RETURN</div>

                          </div>
                          <div className="ReturnDateBOx" onClick={() => {
                            setReturnDateOpened(!rtnDateOpen)
                          }}>
                            <h6 className="dateLabel mt-1 mb-1" >
                              <span className="me-2">{toDate?.getDate()}</span>
                              {toDate?.toLocaleDateString('en-IN', { month: 'long' }).substr(0, 3)}’{toDate?.getFullYear().toString().substr(2)}
                            </h6>
                          </div>
                          <div className="airPortName fs-12 color-black">{toDate?.toLocaleDateString('en-IN', { weekday: 'long' })}</div>
                          <DatePicker
                            isClearable={false}
                            showMonthDropdown
                            showYearDropdown
                            selected={toDate}
                            onFocus={(e) => { e.target.blur(); }}
                            open={rtnDateOpen}
                            onChange={(date) => {
                              setShowToDate(!showToDate);
                              setToDate(date);
                              setReturnDateOpened(false);
                            }}
                            minDate={new Date(fromDate)}
                            dateFormat="dd/MMM/yy"
                            className='form-control d-flex w-100 h-100 bg-transparent border border-0 cursor-pointer'
                            customInput={<DiableKeyboardOnMobile />}
                          />
                        </div>
                      </div>
                    }

                    <div className="bg-white col-12 col-md-4 py-2">
                      <div className="fromTofromBoxLabel fs-12 d-flex align-items-center">
                        <div>
                          <Image
                            className="me-2"
                            alt="User Icon"
                            loader={trvLoader}
                            src="icon/user-orange-icon.svg"
                            width={15}
                            height={15}
                          />
                        </div>
                        <div className="pt-1">TRAVELLERS</div>
                      </div>
                      <div className=" cityBoxDropDown position-relative">
                        <button className="w-100 text-start after-none p-0 btn border-0 dropdown-toggle" onClick={() => SetShowTravewlersCount(true)}>
                          <h6 className="dateLabel mt-1 mb-1"><span className="me-2">{adults + children + infants}</span>Travellers</h6>
                          <div className="airPortName fs-12 color-black">{cabinClass}</div>
                        </button>
                        <div className={ShowTravewlersCount ? "p-0 rounded-0 p-3 bg-white position-absolute top-0 travelers-card border border-1" : "dropdown-menu p-0 rounded-0"}>
                          <div className='row'>
                            <div className='col-12'>
                              <div className='passenger-count'>
                                <div className='row d-flex align-items-center px-2 py-2'>
                                  <div className='col-5 d-flex flex-column'>
                                    <p className='mb-0 lh-1'> Adults</p>
                                  </div>
                                  <div className='col-7 passenger-count-btn'>
                                    <NumericInput
                                      className='custom-traveler-input border-0 border d-flex'
                                      min={1}
                                      max={9 - (children + infants)}
                                      value={adults}
                                      onChange={(e) => {
                                        setAdults(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className='row d-flex align-items-center px-2 py-2'>
                                  <div className='col-5 d-flex flex-column'>
                                    <p className='mb-0 lh-1'> Children</p>
                                    <small className='fs-10'>2- 12 years</small>
                                  </div>
                                  <div className='col-7 passenger-count-btn'>
                                    <NumericInput
                                      className='custom-traveler-input border-0 border d-flex'
                                      min={0}
                                      max={9 - (infants + adults)}
                                      value={children}
                                      onChange={(e) => {
                                        setChildren(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className='row d-flex align-items-center px-2 py-2'>
                                  <div className='col-5 d-flex flex-column'>
                                    <p className='mb-0 lh-1'> Infants</p>
                                    <small className='fs-10'>0 to 23 months</small>
                                  </div>
                                  <div className='col-7 passenger-count-btn'>
                                    <NumericInput
                                      className='custom-traveler-input border-0 border d-flex'
                                      min={0}
                                      max={infants >= adults ? adults : 9 - (adults + children)}
                                      value={infants >= adults ? adults : infants}
                                      onChange={(e) => {
                                        if (e >= adults) {

                                          setInfants(adults);
                                          return;
                                        }
                                        setInfants(e);

                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-12'>
                              <hr />
                              <div className='passenger-class-type p-1 '>
                                <div className="form-check">
                                  <input checked={cabinClass == 'Economy'} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={() => {

                                    setCabinClass('Economy');
                                    props.setCabinValue(1);
                                    setIsOldSearchCriteria(false);


                                  }} />
                                  <label className="form-check-label" htmlFor="flexRadioDefault1">Economy Class</label>
                                </div>
                                <div className="form-check">
                                  <input checked={cabinClass == 'Premium'} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => {

                                    setCabinClass('Premium')

                                    props.setCabinValue(2);
                                    setIsOldSearchCriteria(false);
                                  }} />
                                  <label className="form-check-label" htmlFor="flexRadioDefault2">Premium Economy Class</label>
                                </div>
                                <div className="form-check">
                                  <input checked={cabinClass == 'Business'} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={() => {

                                    setCabinClass('Business')

                                    props.setCabinValue(3);
                                    setIsOldSearchCriteria(false);
                                  }} />
                                  <label className="form-check-label" htmlFor="flexRadioDefault3">Business Class</label>
                                </div>
                                <div className="form-check">
                                  <input checked={cabinClass?.indexOf('First') > -1} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onChange={() => {

                                    setCabinClass('First')
                                    props.setCabinValue(4);
                                    setIsOldSearchCriteria(false);

                                  }} />
                                  <label className="form-check-label" htmlFor="flexRadioDefault4">First Class</label>
                                </div>
                              </div>
                              <hr />
                            </div>
                            <div className='col-12 d-flex justify-content-end'>
                              <button type="button" className="text-capitalize bg-orange  border-0 color-white fs-12 px-2 pull-right py-2 rounded-3 h-auto" onClick={() => SetShowTravewlersCount(false)}>Done</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobForm FieldC col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2 py-2">

                  <button className={isSearchProgress ? "buttonStyle4 border-0 color-white fs-14 px-2 w-100 py-3 rounded-3 disabled-btn" : "buttonStyle4 border-0 color-white fs-14 px-2 w-100 py-3 rounded-3"} disabled={isSearchProgress || isSearchProgress}
                    onClick={ () => {
                      // let paxes = { ...passengersCount };
                      // paxes.adults = adults;
                      // paxes.children = children;
                      // paxes.infants = infants;
                      // paxes.cabin = cabinClass;
                      // resultPagePassengers(paxes);
                      searchFlights();
                    }}>
                    {
                      !isSearchProgress &&
                      <span>Search</span>
                    }
                    {
                      isSearchProgress &&
                      <span className="spinner-border text-white" role="status"></span>
                    }
                  </button>
                </div>
                {
                  !isRoutesFilled && searchSubmitted &&
                  <label className='color-red'>Please select route destinations</label>
                }
                {
                  fromAirport && toAirport && (
                    fromAirport.value == toAirport.value) &&
                  <label className='color-red'>Please Select different Origin and Destination/City airports!</label>
                }
                {isSameSearchErr &&
                  <label className='color-red'>Please change your Search Criteria before clicking on Search!</label>
                }
              </div>
            </div>
          </div>

        </div>
      </section>

      <PartnerLogo></PartnerLogo>

      <div className="container py-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Dummy Flight Ticket</li>
          </ol>
        </nav>
      </div>


      {flights && flights.length > 0 &&
        <section className=' pb-5'>
          <div className='container py-5'>
            <div className='row px-3'>
              <div className='col-12'>
                <h2 className="text-underline w-100 color-green fw-bold mb-4">Found {flights?.length} flights</h2>

                {flights && flights.length > 0 &&
                  flights.map((flight, index) => {
                    return (
                      <div key={index} className='row align-items-center mt-4 border border-1 shadow rounded position-relative bg-white'>
                        <div className='col-12 col-md-8 col-lg-10'>
                          <div className='row m-0'>
                            <div className='col-12 flight-tkt-detail py-0'>
                              <div className='row align-items-center'>
                                <div className='col-2'>
                                  <Image
                                    className="h-auto py-2"
                                    loader={airlineLogoLoader}
                                    src={`airline-logo/${flight.trips[0].validatingCarrier.code}.webp`}
                                    alt="left arrow icon"
                                    width={30}
                                    height={45}
                                  />
                                </div>
                                <div className='col-3'>
                                  <p className='fs-4 mb-0 fw-bold'>{flight.trips[0].listOfFlight[0].fromCode}</p>
                                  <p className='fs-6 mb-0 d-flex fs-12'><span className='fs-12'>{getFormattedDate(flight.trips[0].listOfFlight[0].departeddate)}</span>
                                    <span className='d-none d-lg-block fs-12'> &nbsp;| {getFormattedTime(flight.trips[0].listOfFlight[0].departureTime)}</span></p>
                                </div>
                                <div className='col-4 my-2 border-1 border trv-bg-light d-flex justify-content-center align-items-center' >
                                  <p className='mb-0 fs-12 py-2'><span className='fs-12'>{getDiffFromMinutes(flight.trips[0].totalTripTime)} </span>
                                    <span className='d-none d-lg-inline-block fs-12'> &nbsp;| {flight.trips[0].listOfFlight.length == 1 ? "Non-Stop" : (flight.trips[0].listOfFlight.length - 1) + (flight.trips[0].listOfFlight.length == 2 ? " Stop" : " Stops")}</span></p>
                                </div>
                                <div className='col-3 text-end'>
                                  <p className='fs-4 mb-0 fw-bold'>{flight.trips[0].listOfFlight.slice(-1)[0].toCode}</p>
                                  <p className='fs-6 mb-0 d-flex fs-12 justify-content-end'><span className='fs-12'>{getFormattedDate(flight.trips[0].listOfFlight.slice(-1)[0].departeddate)} </span>
                                    <span className='d-none d-lg-block fs-12'>&nbsp; | {getFormattedTime(flight.trips[0].listOfFlight.slice(-1)[0].departureTime)}</span></p>
                                </div>
                              </div>
                            </div>

                            {flight.trips.length > 1 && <div className='col-12 flight-tkt-detail py-0 border-top'>
                              <div className='row align-items-center'>
                                <div className='col-2'>
                                  <Image
                                    className="h-auto py-2"
                                    loader={airlineLogoLoader}
                                    src={`airline-logo/${flight.trips[1].validatingCarrier.code}.webp`}
                                    alt="left arrow icon"
                                    width={30}
                                    height={45}
                                  />
                                </div>
                                <div className='col-3'>
                                  <p className='fs-4 mb-0 fw-bold'>{flight.trips[1].listOfFlight[0].fromCode}</p>
                                  <p className='fs-6 mb-0 d-flex fs-12'><span className='fs-12'>{getFormattedDate(flight.trips[1].listOfFlight[0].departeddate)}</span>
                                    <span className='d-none d-lg-block fs-12'> &nbsp;| {getFormattedTime(flight.trips[1].listOfFlight[0].departureTime)}</span></p>
                                </div>
                                <div className='col-4 my-2 border-1 border trv-bg-light d-flex justify-content-center align-items-center' >
                                  <p className='mb-0 fs-6 py-2 d-flex px-3 fs-12'><small className='fs-12'>{getDiffFromMinutes(flight.trips[1].totalTripTime)} </small>
                                    <small className='d-none d-lg-block fs-12'> &nbsp;| {flight.trips[1].listOfFlight.length == 1 ? "Non-Stop" : (flight.trips[1].listOfFlight.length - 1) + (flight.trips[1].listOfFlight.length == 2 ? " Stop" : " Stops")}</small></p>
                                </div>
                                <div className='col-3 text-end'>
                                  <p className='fs-4 mb-0 fw-bold'>{flight.trips[1].listOfFlight.slice(-1)[0].toCode}</p>
                                  <p className='fs-6 mb-0 d-flex fs-12 justify-content-end'><span className='fs-12'>{getFormattedDate(flight.trips[1].listOfFlight.slice(-1)[0].departeddate)}</span>
                                    <span className='d-none d-lg-block fs-12'> &nbsp;| {getFormattedTime(flight.trips[1].listOfFlight.slice(-1)[0].departureTime)}</span></p>
                                </div>
                              </div>
                            </div>

                            }


                          </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-2 border bg-grey py-3 py-md-4'>
                          <div className='row'>
                            <div className='col-6 col-md-12 text-center'>
                              <p className='mb-0 fw-bold fs-24'>
                                &#8377; {flight.fareDetails.reduce((accumulator, currentValue) => {
                                  return accumulator + currentValue.noofPax
                                }, 0) * 500}
                              </p>
                            </div>
                            <div className='col-6 col-md-12  text-center'>
                              <button type="button" className="buttonStyle2 border-0" onClick={() => { onSelectFlight(flight); }}>Select Ticket</button>
                            </div>
                          </div>

                        </div>

                        <div className={flight.showTraverllerInfo ? "col-12 trv-bg-light px-0" : "col-12 trv-bg-light d-none"}>
                          <div className='p-md-3 position-relative border-top'>
                            <span className='position-absolute top-0 end-0 me-3 mt-3 cursor-pointer bg-dark'
                              onClick={() => {
                                let f = [...flights]
                                f[index].showTraverllerInfo = false;
                                setFlights(f);
                              }}
                            ><i className="fa-solid fa-xmark text-white bg-dark p-2"></i></span>
                            <div className='row'>
                              <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 bg-white p-3'>
                                <h4 className="text-underline w-100 color-green fw-bold mb-4">Download Sample </h4>
                                <div className='travelers-detail-form'>
                                  {
                                    travellers.map((traveller, index) => {
                                      return <div key={index} className='border p-3'>
                                        <h6 className='color-green fw-bold'>{index + 1}. Passenger Info</h6>
                                        <div className='row'>
                                          <div className='col-12 col-md-6'>
                                            <div className="my-2">
                                              <label className="form-label fs-12">First Name</label>
                                              <input type="text"
                                                onChange={(e) => {
                                                  let t = [...travellers];
                                                  t[index].firstName = e.target.value;
                                                  setTravellers(t)
                                                }}
                                                className={(!traveller.firstName && isValidated) ? "shake-alert form-control fs-8 rounded-0 py-1" : "form-control fs-8 rounded-0 py-1"} id="exampleFormControlInput1" placeholder="Type First Name" value={traveller.firstName} />
                                            </div>
                                          </div>
                                          <div className='col-12 col-md-6'>
                                            <div className="my-2">
                                              <label className="form-label fs-12">Last Name</label>
                                              <input type="text"
                                                onChange={(e) => {
                                                  let t = [...travellers];
                                                  t[index].lastName = e.target.value;
                                                  setTravellers(t);
                                                }}
                                                value={traveller.lastName}
                                                className={(!traveller.lastName && isValidated) ? "shake-alert form-control fs-8 rounded-0 py-1" : "form-control fs-8 rounded-0 py-1"}
                                                id="exampleFormControlInput1" placeholder="Type Last Name" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className='row'>
                                          <div className='col-12 col-md-6'>
                                            <div className="my-2">
                                              <label htmlFor="exampleFormControlInput1" className="form-label fs-12">Email address</label>
                                              <input type="email"
                                                onChange={(e) => {
                                                  let t = [...travellers];
                                                  t[index].email = e.target.value;
                                                  setTravellers(t);
                                                }}
                                                value={traveller.email}
                                                className={((!traveller.email && isValidated) || (isValidated && !isValidaEmail(traveller.email))) ? "shake-alert form-control fs-8 rounded-0 py-1" : "form-control fs-8 rounded-0 py-1"} id="exampleFormControlInput1" placeholder="name@example.com" />
                                            </div>
                                          </div>
                                          <div className='col-12 col-md-6'>
                                            <div className="my-2">
                                              <label htmlFor="exampleFormControlInput1" className="form-label fs-12">Contact No</label>
                                              <input type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={10}
                                                onChange={(e) => {
                                                  let t = [...travellers];
                                                  t[index].contactNo = allowChars(e.target.value);
                                                  setTravellers(t);
                                                }}
                                                value={traveller.contactNo}
                                                className={(!traveller.contactNo && isValidated) ? "shake-alert form-control fs-8 rounded-0 py-1" : "form-control fs-8 rounded-0 py-1"} id="exampleFormControlInput1" placeholder="Enter Contact No." />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    })
                                  }

                                  <div className='row my-3'>
                                    <div className="'col-12">
                                      <p className="fs-14 text-center">By clicking, Download Now I agree that I have read and accepted Travanya<br /> <a className="text-decoration-none color-orange fw-bold" href="/dummy-ticket-terms-conditions/">Terms & Conditions</a>.</p>
                                    </div>
                                    <div className="d-grid gap-2 col-sm-12 col-md-6 mx-auto">
                                      <button className="trv-bg-orange  border border-0 h-auto btn btn-primary" disabled={isProgress}
                                        onClick={() => {
                                          processPayment();

                                        }}
                                        type="button">
                                        {!isProgress &&
                                          <span>Download Now</span>
                                        }
                                        {isProgress &&
                                          <span className="spinner-border text-white" role="status"></span>
                                        }
                                      </button>
                                    </div>
                                  </div>
                                </div>

                              </div>
                              <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                                <h2 className="text-underline w-100 color-green fw-bold mb-4 fs-16 mt-4">Sample Confirmation</h2>
                                <div className=''>
                                  <Image
                                    className="w-100 h-auto"
                                    loader={trvLoader}
                                    src="flight-dummy-ticket-sample.webp"
                                    alt="flight-dummy-ticket-sample"
                                    width={140}
                                    height={43}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className='row'>
                              <div className='col-8'>

                              </div>
                              <div className='col-4'>

                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>

            </div>
          </div>
        </section >

      }

      <section className=''>
        <div className='container py-5'>
          <div className='row'>
            <h2 className='text-underline w-100 color-green fw-bold mb-4 text-center'>Here’s How To Book Dummy Flight Ticket For Visa</h2>
          </div>
          <div className='row pt-2 pb-3 Dummy-Flight-Ticket-Visa d-flex justify-content-center'>
            <div className='col-6 col-md-6 col-lg py-2' >
              <div className='card shadow border border-0 m-0  mt-xl-5'>
                <Image
                  className="p-4 h-auto w-100"
                  loader={trvLoader}
                  src="icon/search-vect.png"
                  alt="Search icon"
                  width={100}
                  height={43}
                />
                <h5 className='text-center fs-20 fw-bold'>Search </h5>
                <p className='text-center fs-14 px-1 mb-3'>for the flight by filling the form</p>
              </div>
            </div>
            <div className='col-6 col-md-6 col-lg py-2'>
              <div className='card shadow border border-0 m-0 mb-xl-5'>
                <Image
                  className="p-4 h-auto w-100"
                  loader={trvLoader}
                  src="icon/select-vect.png"
                  alt="payment sucess icon"
                  width={100}
                  height={43}
                />
                <h5 className='text-center fs-20 fw-bold'>Select</h5>
                <p className='text-center fs-14 px-1 mb-3'>the flight of your choice </p>
              </div>
            </div>
            <div className='col-6 col-md-6 col-lg py-2'>
              <div className='card shadow border border-0 m-0  mt-xl-5'>
                <Image
                  className="p-4 h-auto w-100"
                  loader={trvLoader}
                  src="icon/fill-vect.png"
                  alt="payment sucess icon"
                  width={100}
                  height={43}
                />
                <h5 className='text-center fs-20 fw-bold'>Fill</h5>
                <p className='text-center fs-14 px-1 mb-3'>the details in the extended form</p>
              </div>
            </div>
            <div className='col-6 col-md-6 col-lg py-2'>
              <div className='card shadow border border-0 m-0 mb-xl-5'>
                <Image
                  className="p-4 h-auto w-100"
                  loader={trvLoader}
                  src="icon/pay-vect.png"
                  alt="payment sucess icon"
                  width={100}
                  height={43}
                />
                <h5 className='text-center fs-20 fw-bold'>Pay</h5>
                <p className='text-center fs-14 px-1 mb-3'>the fixed amount of INR 500</p>
              </div>
            </div>
            <div className='col-6 col-md-6 col-lg py-2'>
              <div className='card shadow border border-0 m-0  mt-xl-5'>
                <Image
                  className="p-4 h-auto w-100"
                  loader={trvLoader}
                  src="icon/receive-vect.png"
                  alt="payment sucess icon"
                  width={100}
                  height={43}
                />
                <h5 className='text-center fs-20 fw-bold'>Receive</h5>
                <p className='text-center fs-14 px-1 mb-3'>your dummy ticket in your email</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-light top-airlines-section'>
        <div className='container dummy-tkt-info-box py-5'>
          <div className='row'>
            <div className='col-sm-12 col-lg-6 d-flex align-items-center'>
              <div className='info-box-1 p-4'>
                <h4 className='text-underline w-100 color-green fw-bold mb-1'>What Is A Dummy Flight Ticket?</h4>
                <p className='mb-5'>A dummy flight ticket is nothing but a flight reservation that you can make without paying the full price of the travel ticket. It is, basically, a document that has the flight itinerary details but is not a confirmed ticket. </p>
                <h4 className='text-underline w-100 color-green fw-bold mb-1'>Why Do I Need A Dummy Ticket?</h4>
                <p className=''>Some countries require proof of a booked return or onward flight as part of the visa application process. In this case, the travellers may book a dummy flight ticket to meet this requirement and secure their visa, even if they don't plan to take the flight.</p>
                <p>Depending on the embassy/consulate, the document for return flight ticket is referred to as -</p>
              </div>
            </div>
            <div className='col-sm-12 col-lg-6 d-flex align-items-center'>
              <div className='info-box-2'>
                <div className='row p-4'>
                  <div className='col-sm-12 col-md-12 col-lg-10  offset-sm-0 overflow-hidden fw-bold py-0 ps-3 pe-0 my-2 bg-white rounded-3 d-flex justify-content-between align-items-center hover-box'>Booked / Confirmed Flight Itinerary
                    <Image
                      className="h-auto"
                      loader={trvLoader}
                      src="icon/Booked.svg"
                      alt="Booked icon"
                      width={65}
                      height={43}
                    />
                  </div>
                  <div className='col-sm-12 col-md-12 col-lg-10  offset-sm-0 overflow-hidden fw-bold py-0 ps-3 pe-0 my-2 bg-white rounded-3 d-flex justify-content-between align-items-center hover-box'>Round Trip Reservation
                    <Image
                      className="h-auto"
                      loader={trvLoader}
                      src="icon/RoundTrip.svg"
                      alt="RoundTrip icon"
                      width={65}
                      height={43}
                    />
                  </div>
                  <div className='col-sm-12 col-md-12 col-lg-10  offset-sm-0 overflow-hidden fw-bold py-0 ps-3 pe-0 my-2 bg-white rounded-3 d-flex justify-content-between align-items-center hover-box'>Flight Reservation / Confirmation
                    <Image
                      className="h-auto"
                      loader={trvLoader}
                      src="icon/FlightReservation.svg"
                      alt="FlightReservation icon"
                      width={65}
                      height={43}
                    />
                  </div>
                  <div className='col-sm-12 col-md-12 col-lg-10  offset-sm-0 overflow-hidden fw-bold py-0 ps-3 pe-0 my-2 bg-white rounded-3 d-flex justify-content-between align-items-center hover-box'>Confirmed / Round trip flight tickets
                    <Image
                      className="h-auto"
                      loader={trvLoader}
                      src="icon/Confirmed.svg"
                      alt="Confirmed icon"
                      width={65}
                      height={43}
                    />
                  </div>
                  <div className='col-sm-12 col-md-12 col-lg-10  offset-sm-0 overflow-hidden fw-bold py-0 ps-3 pe-0 my-2 bg-white rounded-3 d-flex justify-content-between align-items-center hover-box'>Proof of Onward Travel
                    <Image
                      className="h-auto"
                      loader={trvLoader}
                      src="icon/Proof.svg"
                      alt="Proof icon"
                      width={65}
                      height={43}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="landing-faq">
        <div className="container mb-4 mt-5">
          <div className="row  pt-2">
            <div className='col-12'>
              <div className='row p-3'>
                <h2 className="fw-bold color-blue">FAQ's</h2>
                <div className="accordion trv-accordian" id="accordionExample">

                  <div className="accordion-item border border-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">
                        <h3 className='fs-16 fw-bold py-2 mb-0'>Why do embassies and consulates need a return ticket?
                        </h3>
                      </button>
                    </h2>
                    <div id="faq1" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p className='mb-0 fs-14'>The embassy/consulate asks for proof of a round-trip flight reservation to ensure the applicant will not overstay their visa, and will get back to your home country before it expires. </p>
                        <p className='mb-0 fs-14'>Since a round-trip reservation shows the departure and arrival to your home country, this is a convincing document that you will return.</p>
                      </div>
                    </div>
                  </div>


                  <div className="accordion-item border border-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
                        <h3 className='fs-16 fw-bold py-2 mb-0'>Why are the authorities fine with a dummy ticket for visa?
                          ?</h3>
                      </button>
                    </h2>
                    <div id="faq2" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p className='mb-0 fs-14'>Most of the embassies and consulates in the world acknowledge the applicant’s loss of money in case of a visa rejection. Thus, they do not obligate visa applicants to book a flight ticket. For them, even holding the ticket works. The same is indicated in the list of required documents for visa application by the authorities. </p>
                        <p className='mb-0 fs-14'>And once the visa is in place, the applicant can purchase the reserved ticket, or cancel and book another based on their convenience, within the time of the visa validity. </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item border border-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
                        <h3 className='fs-16 fw-bold py-2 mb-0'>Do I need to book a flight ticket before applying for a visa?</h3>
                      </button>
                    </h2>
                    <div id="faq3" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p className='mb-0 fs-14'>No. You can have the dummy air ticket and get your visa processed. Later, when you have your visa, you can get the actual flights booked. </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border border-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">
                        <h3 className='fs-16 fw-bold py-2 mb-0'>Can I get a dummy flight ticket free of charge?
                        </h3>
                      </button>
                    </h2>
                    <div id="faq4" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p className='mb-0 fs-14'>The only way you can get a dummy ticket free of cost is by using a dummy ticket generator. However, these tickets aren’t held by the airlines and won’t appear when the embassy/consulate searches for them online. In other words, these tickets don’t have any live, valid PNR. In this case, a visa counsellor may reject your visa</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border border-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5" aria-expanded="false" aria-controls="faq5">
                        <h3 className='fs-16 fw-bold py-2 mb-0'>Can I use a dummy ticket booking generator?
                        </h3>
                      </button>
                    </h2>
                    <div id="faq5" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p className='mb-0 fs-14'>Flight dummy ticket generators create fake PNR on dummy air tickets for visas. Since the PNR on these tickets aren’t verifiable from Airline websites, the chances of the visa getting cancelled are higher. Instead, pay a minimal amount here to hold tickets from the airline system and be assured that you will face absolutely no issues in the visa process at least for this document. </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border border-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6" aria-expanded="false" aria-controls="faq6">
                        <h3 className='fs-16 fw-bold py-2 mb-0'>Is dummy ticket legal?</h3>
                      </button>
                    </h2>
                    <div id="faq6" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p className='mb-0 fs-14'>Yes, dummy tickets are legal. They are actually encouraged by embassies and consulates for visa processing. </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border border-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq7" aria-expanded="false" aria-controls="faq7">
                        <h3 className='fs-16 fw-bold py-2 mb-0'>For how long will the airline hold my ticket?</h3>
                      </button>
                    </h2>
                    <div id="faq7" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p className='mb-0 fs-14'>While some airlines hold the reservation for up to 48 hours, most of the airlines hold the ticket for around 3 days.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className='col-sm-12 col-md-12 col-lg-6'>
              <div className='row p-4'>
                <h2 className="fw-bold color-blue">From the Blogs</h2>
                <div className='links-box d-flex flex-column align-items-start  bg-light shadow rounded-3 p-5'>
                  <div className='blog-list my-3 d-flex align-items-center'>
                    <Image
                      className="img-thumb rounded-pill d-flex h-auto"
                      loader={trvLoader}
                      src="icon/blogs-icon.png"
                      alt="payment sucess icon"
                      width={20}
                      height={43}
                    />
                    <a className="blog-title fw-bold w-auto my-2 ps-0 ms-2 fs-16" href='https://www.travanya.com/blog/visa-free-countries-for-indian-passport-holders/' target="_blank">Visa Free Countries For Indian Passport Holders</a>
                  </div>

                  <div className='blog-list my-3 d-flex align-items-center'>
                    <Image
                      className="img-thumb rounded-pill d-flex h-auto"
                      loader={trvLoader}
                      src="icon/blogs-icon.png"
                      alt="payment sucess icon"
                      width={20}
                      height={43}
                    />
                    <a className="blog-title fw-bold w-auto my-2 ps-0 ms-2 fs-16" href='https://www.travanya.com/travel-guidelines/uk-visa-for-indians/' target="_blank">Guide To Applying For A UK Visa As An Indian Citizen</a>
                  </div>

                  <div className='blog-list my-3 d-flex align-items-center'>
                    <Image
                      className="img-thumb rounded-pill d-flex h-auto"
                      loader={trvLoader}
                      src="icon/blogs-icon.png"
                      alt="payment sucess icon"
                      width={20}
                      height={43}
                    />
                    <a className="blog-title fw-bold w-auto my-2 ps-0 ms-2 fs-16" href='https://www.travanya.com/travel-guidelines/countries-to-apply-student-visa-for-indians/' target="_blank">Top 10 Countries To Apply Student Visa For Indians </a>
                  </div>

                  <div className='blog-list my-3 d-flex align-items-center'>
                    <Image
                      className="img-thumb rounded-pill d-flex h-auto"
                      loader={trvLoader}
                      src="icon/blogs-icon.png"
                      alt="payment sucess icon"
                      width={20}
                      height={43}
                    />
                    <a className="blog-title fw-bold w-auto my-2 ps-0 ms-2 fs-16" href='https://www.travanya.com/blog/5-year-multiple-entry-visa-for-all-nationalities/' target="_blank">UAE Approves 5 Years Multiple Entry Visa For All Nationalities</a>
                  </div>

                  <div className='blog-list my-3 d-flex align-items-center'>
                    <Image
                      className="img-thumb rounded-pill d-flex h-auto"
                      loader={trvLoader}
                      src="icon/blogs-icon.png"
                      alt="payment sucess icon"
                      width={20}
                      height={43}
                    />
                    <a className="blog-title fw-bold w-auto my-2 ps-0 ms-2 fs-16" href='https://www.travanya.com/travel-guidelines/dubai-visa-for-indians/' target="_blank">Dubai Visa Guidelines For Indians</a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="bg-grey  mb-5">
        <GoogleReviews></GoogleReviews>
      </section>

      <Footer />
    </>
  )
}
