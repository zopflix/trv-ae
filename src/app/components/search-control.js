"use client"
import Image from "next/image";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import { useRouter } from "next/navigation";
import { useState, forwardRef, useEffect, useRef, Suspense } from 'react'
import HolidayEnquiryForm from "./holiday-enquiry-form";

export default function SearchControl(props) {
    const toDtePickerRef = useRef(null);
    const tripType = props.tripType;
    const isTripSwitched = props.isTripSwitched;
    const myCustomLoader = props.myCustomLoader;
    const fromAirport = props.fromAirport;
    const toAirport = props.toAirport;
    const currentSearchTerm = props.currentSearchTerm;
    const destinatioSearchTerm = props.destinatioSearchTerm;
    const destinationAirports = props.destinationAirports;
    const isRoutesFilled = props.isRoutesFilled;
    const searchSubmitted = props.searchSubmitted;
    const isOldSearchCriteria = props.isOldSearchCriteria;
    const fromDate = props.fromDate;
    const toDate = props.toDate;
    const isSearchClicked = props.isSearchClicked;
    const DatePicker = props.DatePicker;
    const adults = props.adults;
    const children = props.children;
    const infants = props.infants;
    const cabinClass = props.cabinClass;
    const ShowTravewlersCount = props.ShowTravewlersCount;
    const NumericInput = props.NumericInput;
    const isModifyComponent = props.isModifyComponent;
    const isSearchProgress = props.isSearchProgress;
    const setTripType = props.setTripType;
    const setFromDate = props.setFromDate;
    const setToDate = props.setToDate;
    const setFromAirport = props.setFromAirport;
    const setToAirport = props.setToAirport;
    const searchAirport = props.searchAirport;
    const airports = props.airports;
    const setRoutesFilled = props.setRoutesFilled;
    const setShowToDate = props.setShowToDate;
    const showToDate = props.showToDate;
    const SetShowTravewlersCount = props.SetShowTravewlersCount;
    const setChildren = props.setChildren;
    const setInfants = props.setInfants;
    const setAdults = props.setAdults;
    const searchFlights = props.searchFlights;
    const setIsOldSearchCriteria = props.setIsOldSearchCriteria;
    const getMaxDatePicker = props.getMaxDatePicker;
    const checkMaxDateRange = props.checkMaxDateRange;
    const setTripSwitched = props.setTripSwitched;
    const setCabinClass = props.setCabinClass;
    const resultPagePassengers = props.resultPagePassengers ;
    // const updatePassengers = props.updatePassengers;




    const isModifyInProgress = props.isModifyInProgress;
    const [rtnDateOpen, setReturnDateOpened] = useState(false);
    const [passengersCount, setNoOfPassengerCount] = useState({ adults: 0, children: 0, infants: 0, cabin: '' });
    const [isBrowser, setIsBrowser] = useState(true);
    const router = useRouter();


   

    useEffect(() => {
        setIsBrowser(window.innerWidth > 1000)
        document.addEventListener("click", handleToDtePickerOutsideClick, true);
    }, [])

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
            if (toDate != _setToDate && isModifyComponent) {
                setIsOldSearchCriteria(false);
            }
        }
        else {
            setToDate(maxDate);
            if (toDate != maxDate && isModifyComponent) {
                setIsOldSearchCriteria(false);
            }
        }
    }

    return (
        <section id="mainSearchForm" className={isModifyComponent ? 'py-2' : 'py-5'}>
            <div className='container'>
                {
                    (!!props?.airlineTitle && !!props?.minPrice) &&
                    <div className="row d-lg-none">
                        <div className="col-12">
                            <h2 className="color-white fw-bold mb-4 fs-24 ps-2 text-center">
                                {props?.airlineTitle}
                                <span className="fw-bolder bg-yellow color-black fs-18 text-center ms-2 px-3 py-1 rounded-2">$ {props?.minPrice.split('.')[0]}.<sup>{props?.minPrice.split('.')[1]}</sup></span>
                            </h2>
                            <div className="text-center mb-3">
                                <Image
                                    className="h-auto w-75"
                                    loader={myCustomLoader}
                                    src={props?.airlineImage}
                                    alt="User Icon"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    </div>
                }
                {!isModifyComponent &&
                    <div className='formTabs ms-3'>

                        <ul className='ps-0 d-flex formTabsButton mb-0'>
                            <li className={props?.selectedTab > 0 ? '' : 'active'} onClick={() => router.push('/')}>
                                <div className='text-center'>
                                    <Image
                                        className="h-auto"
                                        loader={trvLoader}
                                        src={props?.selectedTab > 0 ? "icon/Flight-grey-icon.svg" : "icon/Flight-white-icon.svg"}
                                        alt="Home Icon"
                                        width={24}
                                        height={24}
                                    />
                                    <div className='fs-14 mt-2'>Flights</div>
                                </div>
                            </li>

                            <li className={props?.selectedTab == 1 ? "active" : ""} onClick={() => router.push('/holidays')}>
                                <div className='text-center'>
                                    <Image
                                        className="h-auto"
                                        loader={trvLoader}
                                        src={props?.selectedTab == 1 ? "icon/holidays-white-icon.svg" : "icon/holidays-grey-icon.svg"}
                                        alt="Flight Icon"
                                        width={24}
                                        height={24}
                                    />
                                    <div className='fs-14 mt-2'>Holidays</div>
                                </div>
                            </li>

                        </ul>
                    </div>
                }
                {props?.selectedTab == 1
                    ? <div className="HolidDayForm ">
                        <Suspense><HolidayEnquiryForm /></Suspense>
                    </div>
                    : <div className={isModifyComponent ? 'flightSearchWrp rounded-3 bg-white p-0' : 'flightSearchWrp rounded-3 bg-white p-4'}>
                        {(!isModifyComponent || !isBrowser)/*home page*/ &&
                            <div className="row  align-itmes-center">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 py-2">
                                    <div className="d-flex">
                                        <div>
                                            <label className={tripType == 1 ? "cursor-pointer form-check-label fs-14 bg-orange color-white px-3 py-1 rounded-pill active" : "cursor-pointer form-check-label fs-14 bg-grey px-3 py-1 rounded-pill"} htmlFor="onway1" onClick={() => {
                                                if (tripType == 2 && isModifyComponent) {
                                                    setIsOldSearchCriteria(false);
                                                }
                                                setTripType(1)
                                            }}>One Way</label>
                                        </div>
                                        <div className="ms-2">
                                            <label className={tripType == 2 ? "cursor-pointer form-check-label fs-14 bg-orange color-white px-3 py-1 rounded-pill active" : "cursor-pointer form-check-label fs-14 bg-grey px-3 py-1 rounded-pill"} htmlFor="roundtrip1" onClick={() => {
                                                if (tripType == 1 && isModifyComponent) {
                                                    setIsOldSearchCriteria(false);
                                                }
                                                setTripType(2);

                                                let _date = new Date(fromDate);

                                                setToDate(new Date(_date.setDate(_date.getDate() + 3)));
                                            }}>Round Trip</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-8 col-xxl-8 py-2 text-end d-none d-md-inline"><h2 className="mb-0 color-blue fw-bold fs-20">Discover The Joy Of Flying At The Cheapest Prices!</h2></div>

                            </div>
                        }

                        <div className={isModifyComponent ? "mainFlightSearchBox border py-0 px-2" : "mainFlightSearchBox border py-3 px-3"}>
                            <div className="row align-items-center">
                                <div className="mobForm FieldA col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
                                    <div className="fromTofromBox">

                                        <div className="row">
                                            {
                                                isBrowser && isModifyComponent /*not home page*/ &&
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 py-2 border-end position-relative">
                                                    <div className="dropdown">
                                                        <button className="btn border-0 p-0 dropdown-toggle d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <div className="fromTofromBoxLabel fs-12">Trip Type</div>
                                                        </button>
                                                        <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenuButton1">
                                                            <li>
                                                                <div>
                                                                    <label className={tripType == 1 ? "w-100 cursor-pointer form-check-label fs-14 bg-orange color-white px-3 py-1  active" : "w-100 cursor-pointer form-check-label fs-14 bg-grey px-3 py-1 "} htmlFor="onway1" onClick={() => {
                                                                        if (tripType == 2 && isModifyComponent) {
                                                                            setIsOldSearchCriteria(false);
                                                                        }
                                                                        setTripType(1)
                                                                    }}>One Way</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="">
                                                                    <label className={tripType == 2 ? "w-100 cursor-pointer form-check-label fs-14 bg-orange color-white px-3 py-1  active" : "w-100 cursor-pointer form-check-label fs-14 bg-grey px-3 py-1 "} htmlFor="roundtrip1" onClick={() => {
                                                                        if (tripType == 1 && isModifyComponent) {
                                                                            setIsOldSearchCriteria(false);
                                                                        }
                                                                        setTripType(2);
                                                                        updateReturnDate();
                                                                    }}>Round Trip</label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="cityLabel text-truncate">
                                                        {tripType == 1 ? 'One Way' : 'Round Trip'}
                                                    </div>

                                                </div>

                                            }
                                            <div className={!isModifyComponent ? 'col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-2 border-end position-relative FromCodeSearchBox' : 'col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 py-2 border-end position-relative FromCodeSearchBox'}>
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
                                                            
                                                            var formData = {
                                                                fromAirport: newFromCode,
                                                                toAirport: newToCode,
                                                                fromDate: fromDate,
                                                                toDate: toDate,
                                                              };
                                                          
                                                              localStorage.setItem("formData", JSON.stringify(formData));

                                                            if (isModifyComponent) {
                                                                setIsOldSearchCriteria(false);
                                                            }

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
                                                                                if (fromAirport && fromAirport.value != airport.value && isModifyComponent) {
                                                                                    setIsOldSearchCriteria(false);
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
                                                                                                        if (fromAirport && fromAirport.value != option.value && isModifyComponent) {
                                                                                                            setIsOldSearchCriteria(false);
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
                                            <div className={!isModifyComponent ? 'col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-2 border-end position-relative ToCodeSearchBox' : 'col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 py-2 border-end position-relative ToCodeSearchBox'}>
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

                                                                (!!destinatioSearchTerm && (!destinationAirports || destinationAirports.length == 0)) &&
                                                                <div className="text-center blank-error-filed text-center">
                                                                    <video loop autoplay kind="captions"><source src="https://assets.neofares.com/no-match-found.mp4" type="video/mp4" /></video>
                                                                    <h6 className="fs-12 mb-4">Oops! No match found. Spell-check needed</h6>
                                                                </div>
                                                            }

                                                            {!destinatioSearchTerm &&
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
                                                                {(destinationAirports && !!destinatioSearchTerm) &&
                                                                    destinationAirports.map((airport, index) => {
                                                                        return <div key={index} className="SearchCityList border-top" >
                                                                            <div className="row m-0 align-items-center" onClick={() => {
                                                                                if (fromAirport) {
                                                                                    setRoutesFilled(true);
                                                                                }
                                                                                if (toAirport && toAirport.value != airport.value && isModifyComponent) {
                                                                                    setIsOldSearchCriteria(false);
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
                                                                                                        if (toAirport && toAirport.value != option.value && isModifyComponent) {
                                                                                                            setIsOldSearchCriteria(false);
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

                                                        if (fromDate != date && isModifyComponent) {
                                                            setIsOldSearchCriteria(false);
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

                                                            if (toDate != date && isModifyComponent) {
                                                                setIsOldSearchCriteria(false);
                                                            }

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
                                                                                if (adults != e && isModifyComponent) {
                                                                                    setIsOldSearchCriteria(false);
                                                                                }
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
                                                                                if (children != e && isModifyComponent) {
                                                                                    setIsOldSearchCriteria(false);
                                                                                }
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
                                                                                if (infants != e && isModifyComponent) {
                                                                                    setIsOldSearchCriteria(false);
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

                                    {isModifyComponent &&
                                        <button className={isModifyInProgress ? "buttonStyle4 border-0 color-white fs-14 px-2 w-100 py-3 rounded-3 disabled-btn" : "buttonStyle4 border-0 color-white fs-14 px-2 w-100 py-3 rounded-3"} disabled={props.isSearchProgress || isModifyInProgress} onClick={() => {
                                            let paxes = { ...passengersCount };
                                            paxes.adults = adults;
                                            paxes.children = children;
                                            paxes.infants = infants;
                                            paxes.cabin = cabinClass;
                                            // updatePassengers(paxes);
                                            
                                            resultPagePassengers(paxes);

                                            searchFlights();
                                        }}>
                                            {
                                                !props.isSearchProgress &&
                                                <span>{isModifyComponent ? 'Modify' : 'Search'}</span>
                                            }
                                            {
                                                props.isSearchProgress &&
                                                <span className="spinner-border text-white" role="status"></span>
                                            }
                                        </button>
                                    }
                                    {!isModifyComponent &&
                                        <button className={isModifyInProgress ? "buttonStyle4 border-0 color-white fs-14 px-2 w-100 py-3 rounded-3 disabled-btn" : "buttonStyle4 border-0 color-white fs-14 px-2 w-100 py-3 rounded-3"} disabled={isSearchProgress || isModifyInProgress} onClick={() => {
                                            let paxes = { ...passengersCount };
                                            paxes.adults = adults;
                                            paxes.children = children;
                                            paxes.infants = infants;
                                            paxes.cabin = cabinClass;
                                            // updatePassengers(paxes);
                                            resultPagePassengers(paxes);

                                            searchFlights();
                                        }}>
                                            {
                                                !isSearchProgress &&
                                                <span>{isModifyComponent ? 'Modify' : 'Search'}</span>
                                            }
                                            {
                                                isSearchProgress &&
                                                <span className="spinner-border text-white" role="status"></span>
                                            }
                                        </button>
                                    }
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
                                {
                                    isOldSearchCriteria && isSearchClicked &&
                                    <label className='color-red'>Please change your search criteria before clicking the "Modify Search"</label>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section >
    );
}
