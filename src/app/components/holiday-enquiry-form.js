import Image from "next/image";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import { Fragment, forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";
import { getAirports } from "../services/flightService";
import { sendHolidayInquiry } from "../services/holidayService";
import { getFormattedDate8, trackMixpanelEvent } from "../helpers/common";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";

export default function HolidayEnquiryForm(props) {


    const [showTravelersCount, SetShowTravelersCount] = useState(false)
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [airports, setAirports] = useState([]);
    const [destinationAirports, setDestinationAirports] = useState([]);
    const [fromAirport, setFromAirport] = useState(null);
    const [toAirport, setToAirport] = useState( null);
    const [localAirportData, setLocalAirportDate] = useState([]);
    const [fromDate, setFromDate] = useState(new Date(new Date(new Date().setDate(new Date().getDate() + 1))));
    const [isSearchInProgress, setSearchInProgress] = useState(false);
    const [currentSearchTerm, setSearchTerm] = useState("");
    const [destinatioSearchTerm, setDestinationSearchTerm] = useState("");
    const [isRoutesFilled, setRoutesFilled] = useState(false);
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const [isTripSwitched, setTripSwitched] = useState(false);
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(null);
    const searchParams = useSearchParams();
    const path = usePathname();


    const DiableKeyboardOnMobile = forwardRef(({ value, onClick }, ref) => (
        <button className="DatePickerButton" onClick={onClick} ref={ref}>{value}</button>
    ));

    useEffect(() => {
        loadAirportRoutes();
       
    }, [])

    useEffect(() => {
        if(props?.bannerText){
            setToAirport({ city: props?.bannerText })
        }
    }, [props?.bannerText])

    const loadAirportRoutes = () => {
        getAirports().then((response) => {
            if (response && response.length > 1) {
                setLocalAirportDate(response);
            }
        })
    }

    const searchAirport = (srchCodeName, isOriginAirport = true) => {
        if (isOriginAirport)
            setSearchTerm(srchCodeName);
        else
            setDestinationSearchTerm(srchCodeName);

        setAirports([]);

        if (srchCodeName.length < 3) {
            return;
        }

        let airportList = [...localAirportData];
        let filteredRecords = [];

        filteredRecords = airportList.filter((airport) =>
            srchCodeName.length == 3
                ? airport.value.toLowerCase().includes(srchCodeName.toLowerCase())
                : airport.label.toLowerCase().includes(srchCodeName.toLowerCase()));

        if (filteredRecords.length >= 1) {
            if (isOriginAirport)
                setAirports(filteredRecords);
            else
                setDestinationAirports(filteredRecords);
        }
    }

    const submitEnquiry = async () => {
        setSearchInProgress(true);
        if (!!fromAirport.city && !!toAirport.city && fromDate && !!mobile && mobile.length == 10 && !!email && isValidEmail) {
            const res = await axios.get('https://geolocation-db.com/json/');
            let payload = {
                name: 'Traveller',
                packageName: `${toAirport.city}${!!toAirport.value ? '(' + toAirport.value + ')' : ''}`,
                travelDate: getFormattedDate8(fromDate),
                email: email,
                mobile: '91-' + mobile,
                price: 0,
                adults: adults,
                children: children,
                placeFrom: `${fromAirport.city}(${fromAirport.value})`,
                ip: !!res?.data?.IPv4 ? res?.data?.IPv4 : '',
                referer: searchParams?.get('utm_source') ? (searchParams?.get('utm_source') + ((searchParams?.get('utm_medium') ? (' | ' + searchParams?.get('utm_medium')) : '') + (searchParams?.get('utm_campaign') ? ' | ' + searchParams?.get('utm_campaign') : ''))) : '',
                packType: 'Leisure',
                location: (path.includes('india-tour-packages') ? "Domestic" : toAirport?.city)
            }

            await trackMixpanelEvent("Holiday_Inquiry_Submitted", null, false, null, payload);

            sendHolidayInquiry(payload).then(res => {
                if (res) {
                    setSearchInProgress(false);
                    window.location.href = `/holidays/thank-you/?id=${res}`;
                }
                else {
                    setHasError(true);
                    setSearchInProgress(false);
                }

            });
        }
        else {
            setHasError(true);
            setSearchInProgress(false);
        }
    }



    return (
        <>
            <section id="mainSearchForm" className="HoliDayModifyForm position-relative">
                {props.bannerText  && !props.isDetail &&
                    <Fragment>
                        <Image
                            className="h-auto w-100 holiDayMainBanner"
                            loader={trvLoader}
                            src="holiday-banner.webp"
                            alt="Package Image"
                            width={25}
                            height={25}
                        />
                        <div className="position-absolute top-0 start-0 end-0">
                            <h1 className="MainSubTittle color-white text-center fw-bold pt-2 pt-md-4">{props?.bannerText} Tour Packages</h1>
                        </div>
                    </Fragment>
                }
                <div className={props.bannerText && !props.isDetail  ? "HolidayFormBox position-absolute bottom-0 start-0 end-0 mb-lg-5" : ""}>
                    <div className='container'>
                        <div className='flightSearchWrp rounded-3 bg-white shadow'>
                            <div className="mainFlightSearchBox py-1 px-3">
                                <div className="row align-items-center">
                                    <div className="mobForm FieldA col-12">
                                        <div className="fromTofromBox">
                                            <div className="row">
                                                <div className='col-6 col-lg-3 py-2 border-end position-relative FromCodeSearchBox'>
                                                    <div className="bg-white">
                                                        <Image
                                                            className={!isTripSwitched ? "FlightFlip position-absolute end-0 m-auto top-50 bottom-50" : "FlightFlip position-absolute end-0 m-auto top-50 bottom-50 active"}
                                                            loader={trvLoader} src="icon/flip-icon.svg" alt="Flight Flip Icon"
                                                            width={35} height={35}
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
                                                                <div className="cityLabel text-truncate">{!fromAirport ? "Where from" : fromAirport?.city}</div>
                                                                {/* <div className="airPortName fs-12 color-black">{!fromAirport ? "" : fromAirport?.label}</div> */}
                                                            </button>
                                                            <div className="dropdown-menu p-0 rounded-0" aria-labelledby="fromCity">
                                                                <div className="SearchCityBox d-flex align-items-center">
                                                                    <div className="ms-3">
                                                                        <i className="fa-solid fa-magnifying-glass"></i>
                                                                    </div>
                                                                    <div><input autoComplete="off" className="border-0" type="text" placeholder="Where From?" id='fromAirport' onChange={(e) => {
                                                                        if (e.target.value.length > 2)
                                                                            searchAirport(e.target.value);
                                                                    }} onFocus={(e) => e.target.value = ''} /></div>
                                                                </div>
                                                                <div className="SearchSectorTitle fw-bold fs-12 py-1 px-2">Searched Sectors</div>
                                                                {(!!currentSearchTerm && (!airports || airports.length == 0)) &&
                                                                    <div className="text-center blank-error-filed text-center">
                                                                        <video loop autoPlay kind="captions"><source src="https://assets.neofares.com/no-match-found.mp4" type="video/mp4" /></video>
                                                                        <h6 className="fs-12 mb-4">Oops! No match found. Spell-check needed</h6>
                                                                    </div>
                                                                }

                                                                {!currentSearchTerm &&
                                                                    <div className="text-center">
                                                                        <Image className="h-auto w-50" loader={trvLoader}
                                                                            src="type-something.gif" alt="Key Board img"
                                                                            width={184} height={42}
                                                                        />
                                                                        <p className="fs-12">Enter atleast 3 characters to execute search</p>
                                                                    </div>
                                                                }

                                                                <div className="SearchCityListBox">
                                                                    {(currentSearchTerm && airports) &&
                                                                        airports.map((airport, index) => {
                                                                            return <div key={index} className="SearchCityList border-top" onClick={() => {
                                                                                if (toAirport) {
                                                                                    setRoutesFilled(true);
                                                                                }
                                                                                setFromAirport(airport);
                                                                            }}>
                                                                                <div className="row m-0 align-items-center">
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
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-6 col-lg-3 py-2 border-end position-relative ToCodeSearchBox'>
                                                    <div className="bg-white">
                                                        <div className="fromTofromBoxLabel fs-12">TO</div>
                                                        <div className="dropdown cityBoxDropDown">
                                                            <button className="w-100 text-start after-none p-0 btn border-0 dropdown-toggle" type="button" id="toCity" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => { document.getElementById('toAirport').focus(); }}>
                                                                <div className="cityLabel text-truncate">{!toAirport ? "Where to" : toAirport?.city}</div>
                                                                {/* <div className="airPortName fs-12 color-black">{!toAirport ? "" : toAirport?.label}</div> */}
                                                            </button>
                                                            <div className="dropdown-menu p-0 rounded-0" aria-labelledby="toCity">
                                                                <div className="SearchCityBox d-flex align-items-center">
                                                                    <div className="ms-3">
                                                                        <i className="fa-solid fa-magnifying-glass"></i>
                                                                    </div>
                                                                    <div>
                                                                        <input autoComplete="off" className="border-0" type="text" id='toAirport' placeholder="Where To?" onChange={(e) => { searchAirport(e.target.value, false); }} onFocus={(e) => e.target.value = ''} />
                                                                    </div>
                                                                </div>
                                                                <div className="SearchSectorTitle fw-bold fs-12 py-1 px-2">Searched Sectors</div>
                                                                {

                                                                    (!!destinatioSearchTerm && (!destinationAirports || destinationAirports.length == 0)) &&
                                                                    <div className="text-center blank-error-filed text-center">
                                                                        <video loop autoPlay kind="captions"><source src="https://assets.neofares.com/no-match-found.mp4" type="video/mp4" /></video>
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
                                                                            return <div key={index} className="SearchCityList border-top" onClick={() => {
                                                                                if (fromAirport) {
                                                                                    setRoutesFilled(true);
                                                                                }
                                                                                // if (toAirport && toAirport.value != airport.value && isModifyComponent) {
                                                                                //     setIsOldSearchCriteria(false);
                                                                                // }
                                                                                setToAirport(airport);
                                                                            }}>
                                                                                <div className="row m-0 align-items-center">
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
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3 py-2 border-end">
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
                                                            <div className="pt-1">DEPART</div>
                                                        </div>
                                                        <h6 className="dateLabel mt-1 mb-1">
                                                            <span className="me-2">{fromDate?.getDate()}</span>
                                                            {fromDate?.toLocaleDateString('en-IN', { month: 'long' }).substr(0, 3)}’{fromDate?.getFullYear().toString().substr(2)}
                                                        </h6>

                                                        <ReactDatePicker
                                                            isClearable={false}
                                                            selected={fromDate}
                                                            showMonthSelect
                                                            showYearSelect
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            onChange={(date) => setFromDate(date)}
                                                            minDate={new Date()}
                                                            dateFormat="dd/MMM/yy"
                                                            className='form-control d-flex w-100 h-100 bg-transparent border border-0 cursor-pointer'
                                                            customInput={<DiableKeyboardOnMobile />}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3 py-2">
                                                    <div className="bg-white">
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
                                                            <button className="w-100 text-start after-none p-0 btn border-0 dropdown-toggle" onClick={() => SetShowTravelersCount(true)}>
                                                                <h6 className="dateLabel mt-1 mb-1"><span className="me-2">{adults + children}</span>Travellers</h6>
                                                            </button>
                                                            <div className={showTravelersCount ? "p-0 rounded-0 p-3 bg-white position-absolute top-0 travelers-card border border-1" : "dropdown-menu p-0 rounded-0"}>
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
                                                                                        max={9 - children}
                                                                                        value={adults}
                                                                                        onChange={(e) => setAdults(e)}
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
                                                                                        max={9 - adults}
                                                                                        value={children}
                                                                                        onChange={(e) => setChildren(e)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-12 d-flex justify-content-end  mt-2'>
                                                                        <button type="button" className="text-capitalize bg-orange  border-0 color-white fs-12 px-2 pull-right py-2 rounded-3 h-auto" onClick={() => SetShowTravelersCount(false)}>Done</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {
                                                    (!!fromAirport && !!toAirport) &&
                                                    <div className="col-12 PhnEmail border-top">
                                                        <div className="row">
                                                            <div className="col-12 col-md-5 py-2">
                                                                <div className="FormGroup mb-0 bg-white rounded-2">
                                                                    {/* <label className="mb-1">Contact No.</label> */}
                                                                    <div className="position-relative PhoneNum">
                                                                        <div className="icon position-absolute top-50 bottom-50 m-auto ">
                                                                            <Image
                                                                                className=""
                                                                                loader={trvLoader}
                                                                                src="icon/india-flag.png"
                                                                                alt="india flag"
                                                                                width={20}
                                                                                height={15}
                                                                            /> <span>+91</span>
                                                                        </div>
                                                                        <input className={(hasError && mobile.length < 10) ? "form-control border-red" : "form-control"} type="text" pattern="[0-9]*" onPaste={(e) => e.preventDefault()} maxLength={10} placeholder="Contact Number" value={mobile} onChange={(e) => {
                                                                            var allowedChars = "0123456789";
                                                                            let cVal = e.target.value;
                                                                            if (allowedChars.indexOf(e.target.value.substring(e.target.value.length - 1)) == -1) {
                                                                                cVal = cVal.substring(0, cVal.length - 1);
                                                                            }
                                                                            setMobile(cVal);
                                                                        }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-5 py-2">
                                                                <div className="FormGroup mb-0 bg-white rounded-2">
                                                                    {/* <label className="mb-1">Email</label> */}
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
                                                                        <input className={((hasError && !email) || isValidEmail == false) ? "form-control border-red" : "form-control"} type="text" placeholder="Email Address" value={email} onChange={(e) => {
                                                                            setEmail(e.target.value);
                                                                            var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                                            if (e.target.value.match(validRegex) && e.target.value.match(validRegex).length > 0)
                                                                                setIsValidEmail(true);
                                                                            else
                                                                                setIsValidEmail(null);
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
                                                                            }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-2 py-2 mobForm">
                                                                <button className={isSearchInProgress ? "buttonStyle1 border-0 color-white fs-14 px-2 w-100 rounded-3 disabled-btn" : "buttonStyle1 border-0 color-white fs-14 fw-bold px-2 w-100 rounded-3"}
                                                                    disabled={isSearchInProgress} onClick={() => submitEnquiry()}>
                                                                    {isSearchInProgress
                                                                        ? <span className="spinner-border text-white" role="status"></span>
                                                                        : <span>Enquire</span>
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}