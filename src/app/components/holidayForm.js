import Image from "next/image";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import { useContext, useEffect, useState } from "react";
import NumericInput from "react-numeric-input";
import { getAirports } from "../services/flightService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkMaxDateRange, generateId, getMaxDatePicker, trackMixpanelEvent } from "../helpers/common";
import { CounterContext } from "../context/counter.context";
import { useRouter } from "next/navigation";

export default function HolidayForm(props) {
    const { dispatch } = useContext(CounterContext);
    const [ShowTravewlersCount, SetShowTravewlersCount] = useState(false)
    const [tripType, setTripType] = useState(1);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [airports, setAirports] = useState([]);
    const [fromInputValue, setFromInputValue] = useState('');
    const [toInputValue, setToInputValue] = useState('');
    const [fromAirport, setFromAirport] = useState(null);
    const [toAirport, setToAirport] = useState(null);
    const [localAirportData, setLocalAirportDate] = useState([]);
    const [showFromDate, setShowFromDate] = useState(false);
    const [showToDate, setShowToDate] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date(new Date(new Date().setDate(new Date().getDate() + 2))));
    const [cabinClass, setCabinClass] = useState('Economy');
    const [isSearchProgress, setSearchInProgress] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [isRoutesFilled, setRoutesFilled] = useState(false);
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadAirportRoutes();
    }, [])


    const resetAirports = () => {
        setAirports(null);
    }

    const searchAirport = (srchCodeName) => {

        let airportList = [...localAirportData];
        let filteredRecords = airportList.filter((airport) =>
            srchCodeName.length == 3
                ? airport.value.toLowerCase().includes(srchCodeName.toLowerCase())
                : airport.label.toLowerCase().includes(srchCodeName.toLowerCase())
        );
        setAirports(filteredRecords);
    }

    const searchFlights = async () => {
        setSearchInProgress(true);
        setSearchSubmitted(true);
        if (!isRoutesFilled)
            return;
        let segments = [
            {
                fromCode: fromAirport.value,
                toCode: toAirport.value,
                departureDate: fromDate,
                fromLabel: fromAirport.label,
                toLabel: toAirport.label,
                fromCountry: fromAirport.country,
                toCountry: toAirport.country,
                fromCity: fromAirport.city,
                toCity: toAirport.city
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
            cabin: parseInt(1),
            segments: segments,
            portalID: 107
        };
        localStorage.setItem("searchData", data);
        let searchId = generateId(12);
        data.searchId = searchId;
        dispatch({ type: "SETSEARCHCRITERIA", criteria: data });
        localStorage.setItem(searchId, btoa(JSON.stringify(data)));
        localStorage.setItem("mySearchID", searchId);
        localStorage.setItem("currentSelectedFilters", JSON.stringify(data));
        if (segments[0].fromCountry == "India" && segments[0].toCountry == "India")
            router.push("/results?s=" + searchId);
        else
            router.push("/listing?s=" + searchId);
        setTimeout(() => {
            setSearchInProgress(false);
        }, 1000)


    }

    const loadAirportRoutes = () => {
        getAirports().then((response) => {
            if (response && response.length > 1)
                setLocalAirportDate(response);
        })
    }

    return (
        <section id="mainSearchForm">
            <div className='container'>
                {/* <div className="row">
                    <div className="col-12">
                        <h1 className="flightSearchTitle color-white fw-bold text-center mb-5">Book Your Tickets Now</h1>
                    </div>
                </div> */}
                <div className='formTabs m-auto d-table'>
                    <ul className='ps-0 d-flex formTabsButton mb-0'>
                        <li className={props?.selectedTab > 0 ? '' : 'active'}>
                            <div className='text-center'>
                                <Image
                                    className="h-auto"
                                    loader={trvLoader}
                                    src={props?.selectedTab > 0 ? "icon/home-grey-icon.svg" : "icon/home-white-icon.svg"}
                                    alt="Home Icon"
                                    width={24}
                                    height={24}
                                />
                                <div className='fs-14 mt-2'>Home</div>
                            </div>
                        </li>
                        <li>
                            <div className='text-center'>
                                <Image
                                    className="h-auto"
                                    loader={trvLoader}
                                    src="icon/Flight-grey-icon.svg"
                                    alt="Flight Icon"
                                    width={24}
                                    height={24}
                                />
                                <div className='fs-14 mt-2'>Flights</div>
                            </div>
                        </li>
                        <li className={props?.selectedTab == 2 ? "active" : ""}>
                            <div className='text-center'>
                                <Image
                                    className="h-auto"
                                    loader={trvLoader}
                                    src={props?.selectedTab == 2 ? "icon/holidays-white-icon.svg" : "icon/holidays-grey-icon.svg"}
                                    alt="Flight Icon"
                                    width={24}
                                    height={24}
                                />
                                <div className='fs-14 mt-2'>Holidays</div>
                            </div>
                        </li>
                        <li>
                            <div className='text-center'>
                                <Image
                                    className="h-auto"
                                    loader={trvLoader}
                                    src="icon/Tours-grey-icon.svg"
                                    alt="Flight Icon"
                                    width={24}
                                    height={24}
                                />
                                <div className='fs-14 mt-2'>Tours</div>
                            </div>
                        </li>
                        <li>
                            <div className='text-center'>
                                <Image
                                    className="h-auto"
                                    loader={trvLoader}
                                    src="icon/contactus-grey-icon.svg"
                                    alt="Flight Icon"
                                    width={24}
                                    height={24}
                                />
                                <div className='fs-14 mt-2'>Contact us</div>
                            </div>
                        </li>
                        <li>
                            <div className='text-center'>
                                <Image
                                    className="h-auto"
                                    loader={trvLoader}
                                    src="icon/blog-grey-icon.svg"
                                    alt="Flight Icon"
                                    width={24}
                                    height={24}
                                />
                                <div className='fs-14 mt-2'>Blog</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flightSearchWrp rounded-3 bg-white p-4">
                    <div className="row  align-itmes-center">
                        <div className="col-12 col-sm-12 col-md-7 col-lg-6 col-xl-4 col-xxl-4 pb-2">
                            <div className="row align-itmes-center">
                                <div className="col-4">
                                    <div className="form-check">
                                        <input className="form-check-input" checked={tripType == 1} type="radio" name="onway" id="onway1" onChange={() => setTripType(1)} />
                                        <label className="form-check-label fs-14" htmlFor="onway1">One Way</label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-check">
                                        <input className="form-check-input" checked={tripType == 2} type="radio" name="roundtrip" id="roundtrip1" onChange={() => {
                                            setTripType(2);
                                            setToDate(new Date(new Date().setDate(fromDate.getDate() + 2)));
                                        }} />
                                        <label className="form-check-label fs-14" htmlFor="roundtrip1">Round Trip</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainFlightSearchBox border p-3">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-5">
                                <div className="fromTofromBox">
                                    <div className="row">
                                        <div className="col-12 col-md-6 py-2 border-end">
                                            <div className="fromTofromBoxLabel fs-12">FROM</div>
                                            <div className="dropdown cityBoxDropDown">
                                                <button className="w-100 text-start after-none p-0 btn border-0 dropdown-toggle" type="button" id="fromCity" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => {
                                                    document.getElementById('fromAirport').focus();
                                                }}>
                                                    <div className="cityLabel text-truncate">{!fromAirport ? "Where from" : fromAirport?.city}</div>
                                                    <div className="airPortName fs-12 color-black">{!fromAirport ? "" : fromAirport?.label}</div>
                                                </button>
                                                <div className="dropdown-menu p-0 rounded-0" aria-labelledby="fromCity">
                                                    <div className="SearchCityBox d-flex align-items-center">
                                                        <div className="ms-3">
                                                            <i className="fa-solid fa-magnifying-glass"></i>
                                                        </div>
                                                        <div>
                                                            <input className="border-0" autoComplete="off" type="text" placeholder="Where From?" id='fromAirport'
                                                                value={fromInputValue}
                                                                onChange={(e) => {
                                                                    setFromInputValue(e.target.value);
                                                                    if (e.target.value.length > 2)
                                                                        searchAirport(e.target.value);
                                                                    else setAirports([]);
                                                                }}
                                                                onFocus={(e) => e.target.value = ''}
                                                            /></div>
                                                    </div>
                                                    <div className="SearchSectorTitle fw-bold fs-12 py-1 px-2">Searched Sectors</div>
                                                    {(fromInputValue.length > 2 && airports?.length == 0) &&
                                                        <div className="text-center blank-error-filed text-center">
                                                            <video loop muted autoPlay >
                                                                <source src="https://assets.neofares.com/no-match-found.mp4" type="video/mp4" />
                                                            </video>
                                                            <h6 className="fs-12 mb-4">Oops! No match found. Spell-check needed</h6>
                                                        </div>
                                                    }
                                                    {(fromInputValue.length < 3 && airports.length == 0) &&
                                                        <div className="text-center blank-error-filed text-center">
                                                            <Image
                                                                className="mb-4 h-auto"
                                                                loader={trvLoader}
                                                                src="/type-something.gif"
                                                                alt="type-something"
                                                                width={100}
                                                                height={43}
                                                            />
                                                            <h6 className="fs-12 mb-4">Enter atleast 3 characters to execute search</h6>
                                                        </div>
                                                    }
                                                    <div className="SearchCityListBox">
                                                        {airports &&
                                                            airports.map((airport, index) => {
                                                                return <div key={index} className="SearchCityList border-top" onClick={() => {
                                                                    if (toAirport) {
                                                                        setRoutesFilled(true);
                                                                    }
                                                                    setFromAirport(airport);
                                                                    resetAirports();
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
                                        <div className="col-12 col-md-6 py-2 border-end">
                                            <div className="fromTofromBoxLabel fs-12">TO</div>
                                            <div className="dropdown cityBoxDropDown">
                                                <button className="w-100 text-start after-none p-0 btn border-0 dropdown-toggle" type="button" id="toCity" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => {
                                                    document.getElementById('toAirport').focus();
                                                }}>
                                                    <div className="cityLabel text-truncate">{!toAirport ? "Where to" : toAirport?.city}</div>
                                                    <div className="airPortName fs-12 color-black">{!toAirport ? "" : toAirport?.label}</div>
                                                </button>
                                                <div className="dropdown-menu p-0 rounded-0" aria-labelledby="toCity">
                                                    <div className="SearchCityBox d-flex align-items-center">
                                                        <div className="ms-3">
                                                            <i className="fa-solid fa-magnifying-glass"></i>
                                                        </div>
                                                        <div>
                                                            <input className="border-0" autoComplete="off" type="text" id='toAirport' placeholder="Where To?"
                                                                value={toInputValue}
                                                                onChange={(e) => {
                                                                    setToInputValue(e.target.value);
                                                                    if (e.target.value.length > 2)
                                                                        searchAirport(e.target.value);
                                                                    else setAirports([]);
                                                                }}
                                                                onFocus={(e) => e.target.value = ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="SearchSectorTitle fw-bold fs-12 py-1 px-2">Searched Sectors</div>
                                                    {(toInputValue.length > 2 && airports?.length == 0) && <div className="text-center blank-error-filed text-center">
                                                        <video loop autoPlay kind="captions"><source src="https://assets.neofares.com/no-match-found.mp4" type="video/mp4" /></video>
                                                        <h6 className="fs-12 mb-4">Oops! No match found. Spell-check needed</h6>
                                                    </div>
                                                    }
                                                    {(toInputValue.length < 3 && airports?.length == 0) &&
                                                        <div className="text-center blank-error-filed text-center">
                                                            <Image
                                                                className="mb-4 h-auto"
                                                                loader={trvLoader}
                                                                src="/type-something.gif"
                                                                alt="type-something"
                                                                width={100}
                                                                height={43}
                                                            />
                                                            <h6 className="fs-12 mb-4">Enter atleast 3 characters to execute search</h6>
                                                        </div>
                                                    }
                                                    <div className="SearchCityListBox">
                                                        {airports &&
                                                            airports.map((airport, index) => {
                                                                return <div key={index} className="SearchCityList border-top" onClick={() => {
                                                                    if (fromAirport) {
                                                                        setRoutesFilled(true);
                                                                    }
                                                                    setToAirport(airport);
                                                                    resetAirports();
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
                                        {!isRoutesFilled && searchSubmitted
                                            &&
                                            <label className='color-red'>Please select route destinations</label>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5">
                                <div className="row">
                                    <div className="col-6 col-md-4 py-2 border-end">
                                        <div className='trv-datepicker position-relative' onClick={() => setShowFromDate(true)}>
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
                                                {fromDate.toLocaleDateString('en-IN', { month: 'long' }).substr(0, 3)}’{fromDate.getFullYear().toString().substr(2)}
                                            </h6>
                                            <div className="airPortName fs-12 color-black">{fromDate.toLocaleDateString('en-IN', { weekday: 'long' })}</div>
                                            <DatePicker
                                                selected={fromDate}
                                                showMonthSelect
                                                showYearSelect
                                                showMonthDropdown
                                                showYearDropdown
                                                onChange={(date) => {
                                                    if (date > toDate) {
                                                        setToDate(new Date(new Date().setDate(date.getDate() + 2)));
                                                    }
                                                    setFromDate(date);
                                                }}
                                                minDate={new Date()}
                                                dateFormat="dd/MMM/yy"
                                                className='form-control d-flex w-100 h-100 bg-transparent border border-0'
                                            />
                                        </div>
                                    </div>
                                    {tripType == 1 &&
                                        <div className="col-6 col-md-4 py-2 border-end">
                                            <div className="fromTofromBoxLabel  fs-12 d-flex align-items-center">
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
                                                let currentDate = fromDate ? new Date(fromDate) : new Date();
                                                let maxDate = getMaxDatePicker();
                                                let isMaxFromDate = checkMaxDateRange(maxDate, currentDate, 3);
                                                if (!isMaxFromDate)
                                                    setToDate(new Date(currentDate.setDate(currentDate.getDate() + 3)));
                                                else
                                                    setToDate(maxDate);
                                            }}>Tap to add a return date for bigger discounts</p>
                                        </div>
                                    }
                                    {tripType == 2 &&
                                        <div className="col-6 col-md-4 py-2 trv-datepicker" >
                                            <div className='position-relative trv-datepicker'>
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
                                                <h6 className="dateLabel mt-1 mb-1">
                                                    <span className="me-2">{toDate?.getDate()}</span>
                                                    {toDate.toLocaleDateString('en-IN', { month: 'long' }).substr(0, 3)}’{toDate.getFullYear().toString().substr(2)}
                                                </h6>
                                                <div className="airPortName fs-12 color-black">{toDate.toLocaleDateString('en-IN', { weekday: 'long' })}</div>
                                                <DatePicker
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    onFocus={(e) => e.target.blur()}
                                                    onChange={(date) => {
                                                        if (date < fromDate) {
                                                            setFromDate(new Date(new Date().setDate(date.getDate() - 2)));
                                                        }
                                                        setShowToDate(!showToDate);
                                                        setToDate(date);
                                                    }}
                                                    minDate={new Date(fromDate)}
                                                    dateFormat="dd/MMM/yy"
                                                    className='form-control d-flex w-100 h-100 bg-transparent border border-0'
                                                />
                                            </div>

                                        </div>
                                    }

                                    <div className="col-6 col-md-4 py-2">
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
                                                                    <small className='fs-10'>2- 12 Years</small>
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
                                                                    <small className='fs-10'>0- 23 Months</small>
                                                                </div>
                                                                <div className='col-7 passenger-count-btn'>
                                                                    <NumericInput
                                                                        className='custom-traveler-input border-0 border d-flex'
                                                                        min={0}
                                                                        max={9 - (adults + children)}
                                                                        value={infants}
                                                                        onChange={(e) => {
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
                                                                <input checked={cabinClass == 'Economy'} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={() => setCabinClass('Economy')} />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">Economy Class</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input checked={cabinClass == 'Premium'} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => setCabinClass('Premium')} />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault2">Premium Economy Class</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input checked={cabinClass == 'Business'} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={() => setCabinClass('Business')} />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault3">Business Class</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input checked={cabinClass == 'First'} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onChange={() => setCabinClass('First')} />
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
                            <div className="col-12 col-lg-2 py-2">
                                <button className="buttonStyle4 border-0 color-white fs-14 px-2 w-100 py-3 rounded-3" disabled={isSearchProgress} onClick={() => searchFlights()}>
                                    {!isSearchProgress &&
                                        <span>Search</span>
                                    }
                                    {isSearchProgress &&
                                        <span className="spinner-border text-white" role="status"></span>
                                    }
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}