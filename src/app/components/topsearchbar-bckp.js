"use client"
import { useState, useEffect, useRef, useContext } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkMaxDateRange, cloneData, generateId, getMaxDatePicker, isJsonString, isSearchCriteriaSame, trackMixpanelEvent } from "../helpers/common";
import { getAirports, getCityData, getCityWeather } from "../services/flightService";
import moment from "moment";
import { flightClassOptions } from "../helpers/flightClass";
import NumericInput from "react-numeric-input";
import { useRouter } from "next/navigation";
import { CounterContext } from "../context/counter.context";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";

export default function Topsearchabar(props) {
    const { state, dispatch } = useContext(CounterContext);
    let criteria = state.searchCriteria ? JSON.parse(state.searchCriteria) : null;
    const [isTripSwitched, setTripSwitched] = useState(false);
    const [showOriginAirports, setShowOriginAirports] = useState(false);
    const [ShowDestinationAirports, setShowDestinationAirports] = useState(false);
    const [ShowTravelersBox, setShowTravelersBox] = useState(false);
    const [tripType, setTripType] = useState(2);
    const toListRef = useRef(null);
    const toTravelerRef = useRef(null);
    let currentDate = new Date();
    const [airportsData, setAirportsData] = useState([]);
    const [originAirportResults, setOriginAirportResults] = useState([]);
    const [destinationAirportResults, setDestinationAirportResults] = useState([]);
    const [fromDate, setFromDate] = useState(currentDate.setDate(currentDate.getDate() + 1));
    const [toDate, setToDate] = useState(currentDate.setDate(currentDate.getDate() + 3));
    const [allAirports, setAllAirports] = useState([]);
    const [fromInputValue, setFromInputValue] = useState((state.searchCriteria && criteria && criteria.segments) ? criteria.fromInputValue : "");
    const [toInputValue, setToInputValue] = useState((state.searchCriteria && criteria && criteria.segments) ? criteria.toInputValue : "");
    const [fromCode, setFromCode] = useState((state.searchCriteria && criteria && criteria.segments) ? criteria.segments[0].fromCode : "");
    const [toCode, setToCode] = useState((state.searchCriteria && criteria && criteria.segments) ? criteria.segments[0].toCode : "");
    const [fromLabel, setFromLabel] = useState((state.searchCriteria && criteria && criteria.segments) ? criteria.segments[0].fromLabel : "");
    const [toLabel, setToLabel] = useState((state.searchCriteria && criteria && criteria.segments) ? criteria.segments[0].toLabel : "");
    const [fromCodeError, setFromCodeError] = useState(false);
    const [toCodeError, setToCodeError] = useState(false);
    const [isSameOriginDestination, setSameOriginDestination] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [menuChilds, setMenuChilds] = useState((state.searchCriteria && criteria) ? criteria.child : 0);
    const [menuInfants, setMenuInfants] = useState((state.searchCriteria && criteria) ? criteria.noOfLapInfant : 0);
    const [menuAdults, setMenuAdults] = useState((state.searchCriteria && criteria) ? criteria.noOfAdult : 1);
    const [menuCabin, setMenuCabin] = useState((state.searchCriteria && criteria && criteria.cabin) ? criteria.cabin : 1);

    const [cabin, setCabin] = useState(1);
    const [displayCabin, setDisplayCabin] = useState('Economy');
    const [adults, setAdults] = useState(1);
    const [childs, setChilds] = useState(0);
    const [seniors, setSeniors] = useState(0);
    const [infants, setInfants] = useState(0);
    const [infantMaxValue, setMaxInfantsValue] = useState(1);
    const router = useRouter(null);
    const [fromCountry, setFromCountry] = useState("");
    const [toCountry, setToCountry] = useState("");
    const [cityName, setCityName] = useState("");
    const [cityDescription, setCityDescription] = useState("");
    const [weatherData, setWeatherData] = useState({
        text: "", temp: "", humidity: "", uv: "", wind: "", icon: ""
    });
    const [isCriteriaChanged, setCriteriaChanged] = useState(null);

    const handleoriginListOutsideClick = (event) => {
        if (toListRef.current && !toListRef.current.contains(event.target)) {
            setShowOriginAirports(false);
        }
    };

    const handledestinationListOutsideClick = (event) => {
        if (toListRef.current && !toListRef.current.contains(event.target)) {
            setShowDestinationAirports(false);
        }
    };

    const handletravelerOutsideClick = (event) => {
        if (toTravelerRef.current && !toTravelerRef.current.contains(event.target)) {
            setShowTravelersBox(false);
        }
    };

    const setAirportsDetails = () => {
        let airports = airportsData.map((x) => {
            let optionObj = { city: x.city, value: x.value, label: x.label, country: x.country, countryCode: x.countryCode };
            if (x.options && x.options.length > 0) {
                let airportOptions = [];
                x.options.forEach((element) => {
                    airportOptions.push({
                        value: element.value,
                        label: element.label,
                        city: element.city,
                        country: element.country,
                    });
                });

                optionObj.options = airportOptions;
            }
            return optionObj;
        });
        setAllAirports(airports);
        getCityDetails();
    }

    const getAirportsFromValues = (e, country = '') => {
        if (country == 'India') {
            return allAirports.filter((i) => e.length == 3
                ? i.country == 'India' && i.value.toLowerCase().includes(e.toLowerCase())
                : i.country == 'India' && i.label.toLowerCase().includes(e.toLowerCase())
            );
        }
        return allAirports.filter((i) =>
            e.length == 3
                ? i.value.toLowerCase().includes(e.toLowerCase())
                : i.label.toLowerCase().includes(e.toLowerCase())
        );
    };

    const getCityDetails = () => {
        if (!!fromCode && !!toCode) {
            let airport = airportsData.find(x => x.value == toCode);
            if (!!airport) {
                setCityName(airport.city);
                getCityData().then(res => {
                    let desc = res.find(x => x.cityName == airport.city);
                    setCityDescription(!!desc ? desc.content : `Experience the real essence of life in contemporary ${airport.city}`);
                });
                getWeatherDetails(airport.city);
            }
        }
    }

    const getWeatherDetails = (city) => {
        getCityWeather(city).then(res => {
            let weather = cloneData(weatherData);
            weather.text = res.forecast.forecastday[0].day.condition.text;
            weather.temp = res.forecast.forecastday[0].day.avgtemp_c;
            weather.humidity = res.forecast.forecastday[0].day.avghumidity;
            weather.uv = res.forecast.forecastday[0].day.uv;
            weather.wind = res.forecast.forecastday[0].day.maxwind_kph;
            weather.icon = 'https:' + res.forecast.forecastday[0].day.condition.icon;
            setWeatherData(weather);
        })
    }

    const setFiltersAndApply = (airports) => {
        //checking in query string if it contains
        let search = window.location.search;
        let params = new URLSearchParams(search);

        if (params.get("s")) {

            let currentKey = params.get("s")
            let keysToExclude = ["isDomesticFlight", "currentSelectedFilters", "currentFlight", "showIndiaContact", 'fpendingPath', 'fsuccessPath', "mySearchID", "searchCriteria", 'indiaUSAContact'];
            Object.keys(localStorage).forEach(function (lkey) {
                if (keysToExclude.indexOf(lkey) == -1 && currentKey != lkey)
                    localStorage.removeItem(lkey);
            });

            let storedFilters = localStorage.getItem(params.get("s"));
            if (
                !!storedFilters &&
                (isJsonString(storedFilters) || isJsonString(atob(storedFilters)))
            ) {
                params = JSON.parse(atob(storedFilters));
            } else if (!!storedFilters) {
                let dataParm = new URLSearchParams(atob(storedFilters));
                if (dataParm && dataParm.get("fromCode")) {
                    let from = airports.find((z) => z.value == dataParm.get("fromCode"));
                    let to = airports.find((z) => z.value == dataParm.get("toCode"));
                    let segmentData = [
                        {
                            fromCode: dataParm.get("fromCode"),
                            toCode: dataParm.get("toCode"),
                            departureDate: moment(dataParm.get("departureDate")).format(
                                "MM/DD/YYYY"
                            ),
                            fromLabel: from ? from.label : "",
                            toLabel: to ? to.label : "",
                            fromCountry: from?.country,
                            toCountry: to?.country,
                        },
                    ];

                    let tripTypeData = dataParm.get("tripType");
                    if (!!tripTypeData && tripTypeData == "2") {
                        segmentData.push({
                            fromCode: dataParm.get("toCode"),
                            toCode: dataParm.get("fromCode"),
                            departureDate: moment(dataParm.get("returnDate")).format(
                                "MM/DD/YYYY"
                            ),
                            fromLabel: to ? to.label : "",
                            toLabel: from ? from.label : "",
                            fromCountry: to?.country,
                            toCountry: from?.country,
                        });
                    }

                    setFromInputValue(from ? from.label : "");
                    setToInputValue(to ? to.label : "");

                    params.tripType = parseInt(tripTypeData);
                    params.segments = segmentData;

                    params.noOfAdult = parseInt(dataParm.get("noOfAdult"));
                    params.child = !!dataParm.get("child")
                        ? parseInt(dataParm.get("child"))
                        : 0;
                    params.noOfLapInfant = !!dataParm.get("noOfLapInfant")
                        ? parseInt(dataParm.get("noOfLapInfant"))
                        : 0;
                }
            }
            else {
                router.push("/");
            }
        }
        if (params && params.segments) {
            let fromCode = params.segments[0].fromCode;
            let from = airports.find((z) => z.value == fromCode);
            let toCode = params.segments[0].toCode;
            let to = airports.find((z) => z.value == toCode);
            let tripType = params.tripType;
            let cabin = params.cabin;
            let noOfAdult = params.noOfAdult;
            let childs = params.child;
            let infants = params.noOfLapInfant;
            let deptDate = params.segments[0].departureDate;
            let toDate = null;
            let referer = params.referer;
            let utm_source = params.utm_source;
            let utm_term = params.utm_term;
            let utm_medium = params.utm_medium;
            if (params.segments.length > 1) toDate = params.segments[1].departureDate;

            //Setting default parameters
            if (!cabin) cabin = 1;

            if (!noOfAdult) noOfAdult = 1;
            if (!infants) infants = 0;
            if (!childs) childs = 0;
            if (!tripType) tripType = 1;

            if (from) setFromCountry(from.country);
            if (to) setToCountry(to.country);

            setFromInputValue(params.fromInputValue);
            setToInputValue(params.toInputValue);

            let dates = [];
            dates.push(new Date(deptDate));
            setFromDate(new Date(deptDate));
            let segments = [
                {
                    fromCode: fromCode,
                    toCode: toCode,
                    departureDate: moment(deptDate).format("MM/DD/YYYY"),
                    fromLabel: from ? from.label : "",
                    toLabel: to ? to.label : "",
                    fromCountry: from?.country,
                    toCountry: to?.country,
                },
            ];
            if (!!toDate && tripType == 2) {
                dates.push(new Date(toDate));
                segments.push({
                    fromCode: toCode,
                    toCode: fromCode,
                    departureDate: moment(toDate).format("MM/DD/YYYY"),
                });
                // setReturnDate(new Date(toDate));
                setToDate(new Date(toDate));
            } else {
                tripType = 1;
                setToDate("");
            }
            setFromLabel(from ? from.label : "");
            setToLabel(to ? to.label : "");
            let dataToSend = {
                tripType: parseInt(tripType),
                senior: 0,
                noOfAdult: parseInt(noOfAdult),
                child: parseInt(childs),
                noOfLapInfant: parseInt(infants),
                cabin: parseInt(cabin),
                segments: segments,
                referer: referer,
                utm_source: utm_source,
                utm_term: utm_term,
                utm_medium: utm_medium
            };
            localStorage.setItem(
                "currentSelectedFilters",
                JSON.stringify(dataToSend)
            );
            localStorage.setItem("prevFilters", JSON.stringify(dataToSend));
        }

        let previousAppliedFilters = localStorage.getItem("currentSelectedFilters");
        if (!!previousAppliedFilters) {
            let parsedFilters = JSON.parse(previousAppliedFilters);
            let from = airports.find(
                (z) => z.value == parsedFilters.segments[0].fromCode
            );
            let to = airports.find(
                (z) => z.value == parsedFilters.segments[0].toCode
            );
            parsedFilters.segments[0].fromCountry = from?.country;
            parsedFilters.segments[0].toCountry = to?.country;

            setTripType(parsedFilters.tripType);
            setFromCode(parsedFilters.segments[0].fromCode);
            setFromLabel(parsedFilters.segments[0].fromLabel);
            if (from) setFromCountry(from.country);
            if (to) setToCountry(to.country);

            let dates = [];
            dates.push(new Date(parsedFilters.segments[0].departureDate));
            // setTravelDate(new Date(parsedFilters.segments[0].departureDate));

            setToCode(parsedFilters.segments[0].toCode);
            setToLabel(parsedFilters.segments[0].toLabel);
            setFromDate(new Date(parsedFilters.segments[0].departureDate));
            setAdults(parsedFilters.noOfAdult);
            setMenuAdults(parsedFilters.noOfAdult);
            setMaxInfantsValue(parsedFilters.noOfAdult);
            setChilds(parsedFilters.child);
            setMenuChilds(parsedFilters.child);
            setInfants(parsedFilters.noOfLapInfant);
            setMenuInfants(parsedFilters.noOfLapInfant);

            if (parsedFilters.tripType == 2) {
                dates.push(new Date(parsedFilters.segments[1].departureDate));
                setToDate(new Date(parsedFilters.segments[1].departureDate));
                // setReturnDate(new Date(parsedFilters.segments[1].departureDate));
            }
            // setDefaultDates(dates);
            let currentCabin = parseInt(parsedFilters.cabin);
            setCabin(currentCabin);
            setMenuCabin(currentCabin);
            setDisplayCabin(
                flightClassOptions.find((x) => x.value == currentCabin).label
            );
            props.modifySearch(parsedFilters);
        }
    };

    const refreshResults = () => {
        // setShowMoreFilters(false);
        let selectedTripType = tripType;
        if (!fromCode) {
            setFromCodeError(true);
            return;
        }
        if (!toCode) {
            setToCodeError(true);
            return;
        }
        if (!fromDate) {
            setTravelDateError(true);
            return;
        }
        if (selectedTripType == 2 && !toDate) {
            // setRTDateError(true);
            return;
        }
        if (fromCode == toCode) {
            setSameOriginDestination(true);
            return false;
        }
        if (tripType == 2 && (moment(toDate).format("MM/DD/YYYY") - moment(fromDate).format("MM/DD/YYYY")) < 0) {
            setIsInvalidDateRange(true);
            return;
        }
        // var from = airports.find((x) => x.value == fromCode);
        // if (from) setFromCountry(from.country);
        // var to = airports.find((x) => x.value == toCode);
        // if (to) setToCountry(to.country);
        let fromCountry = airportsData.find((z) => z.value == fromCode)?.country;
        let toCountry = airportsData.find((z) => z.value == toCode)?.country;

        let segments = [
            {
                fromCode: fromCode,
                toCode: toCode,
                departureDate: moment(fromDate).format("MM/DD/YYYY"),
                fromLabel: fromLabel,
                toLabel: toLabel,
                fromCountry: fromCountry,
                toCountry: toCountry,
            },
        ];
        if (toDate && tripType == 2) {
            segments.push({
                fromCode: toCode,
                toCode: fromCode,
                departureDate: moment(toDate).format("MM/DD/YYYY"),
            });
        } else {
            selectedTripType = 1;
            setTripType(1);
            setToDate("");
        }

        getCityDetails();

        let dataToSend = {
            tripType: selectedTripType,
            senior: seniors,
            noOfAdult: adults,
            child: childs,
            noOfLapInfant: infants,
            cabin: parseInt(cabin),
            segments: segments,
            fromInputValue: fromInputValue,
            toInputValue: toInputValue
        };
        let prevFilters = localStorage.getItem("prevFilters");

        if (!!prevFilters && isSearchCriteriaSame(JSON.parse(prevFilters), dataToSend)) {
            setCriteriaChanged(false);
            return false;
        }
        localStorage.setItem("prevFilters", JSON.stringify(dataToSend));
        let formattedToDate = "";
        if (selectedTripType == 2)
            formattedToDate =
                moment(toDate)
                    .format("YYYY-MM-DD")
                    .replace("/", "-")
                    .replace("/", "-") + "T12:34:56";

        localStorage.setItem("currentSelectedFilters", JSON.stringify(dataToSend));
        props.closeMobFilter();
        props.closeModifySearch(false);

        let search = window.location.search;
        let params = new URLSearchParams(search);
        let searchId = generateId(12);

        //checking and removing existing localstorage key
        let currentLocalStorageItem = localStorage.getItem(params.get("s"));
        if (currentLocalStorageItem) localStorage.removeItem(params.get("s"));

        params.set("s", searchId);
        history.replaceState(null, null, "?" + params.toString());
        dispatch({ type: "SETSEARCHCRITERIA", criteria: dataToSend });
        localStorage.setItem(searchId, btoa(JSON.stringify(dataToSend)));
        localStorage.setItem("mySearchID", searchId);

        localStorage.setItem(
            "isDomesticFlight",
            (fromCountry == toCountry).toString()
        );
        if (document.body.classList.contains("modify-form-wrp-open"))
            document.body.classList.remove("modify-form-wrp-open");
        if ((props.currentPage == 'results' && fromCountry == 'India' && toCountry == 'India')
            || (props.currentPage == 'listing' && !(fromCountry == 'India' && toCountry == 'India')))
            props.modifySearch(dataToSend, true);
        else if (fromCountry == 'India' && toCountry == 'India')
            router.push("/results?s=" + searchId);
        else
            router.push("/listing?s=" + searchId);
    };

    useEffect(() => {
        setAirportsDetails();
    }, [airportsData]);

    useEffect(() => {
        setCriteriaChanged(true);
    }, [tripType, adults, childs, infants, cabin, fromCode, toCode]);

    useEffect(() => {
        getAirports().then((res) => {
            setAirportsData(res);
            setFiltersAndApply(res);
        });
        document.addEventListener("click", handledestinationListOutsideClick, true);
        document.addEventListener("click", handleoriginListOutsideClick, true);
        document.addEventListener("click", handletravelerOutsideClick, true);
        return () => {
            document.removeEventListener("click", handledestinationListOutsideClick, true);
            document.removeEventListener("click", handleoriginListOutsideClick, true);
            document.removeEventListener("click", handletravelerOutsideClick, true);
        }

    }, []);



    return (

        <section className="modify-form-section pb-1 pt-2">
            <div className="banner-bg-layer"></div>
            <div className="container city-weather-section position-relative ">
                <div className="row pt-3 pb-3 align-items-center d-none d-lg-flex">
                    <div className="col-7">
                        <div className="city-name">
                            <h1 className="display-6 fw-bold text-light">
                                {cityName}
                            </h1>
                            <p className="fs-6 text-light">
                                {cityDescription}
                            </p>
                        </div>
                    </div>
                    {
                        (weatherData && weatherData.text) &&
                        <div className="col-5">
                            <div className="weather-box">
                                <div className="row align-items-center weather-box-inner-bg">
                                    <div className="col-6">
                                        <div className="row align-items-center">
                                            <div className="col-5">
                                                <div className="weather-img-box d-flex justify-content-center">
                                                    <Image
                                                        className='h-auto'
                                                        loader={sfLoader}
                                                        src={weatherData.icon}
                                                        height={20}
                                                        width={20}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="weather-temp-box d-flex flex-column align-items-center">
                                                    <small className="text-light">{weatherData.text}</small>
                                                    <span className="fs-3 fw-bold text-light">{weatherData.temp}<sup>°</sup>c</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 weather-border-left pe-5">
                                        <div className="weather-detail-box ps-3">
                                            <div className=" row justify-content-between align-items-center weather-border-bottom">
                                                <div className="col-7 text-light ps-0">Humidity</div>
                                                <div className="col-5 text-end text-light pe-0">{weatherData.humidity}</div>
                                            </div>
                                            <div className=" row justify-content-between align-items-center weather-border-bottom">
                                                <div className="col-7 text-light ps-0">UV Index</div>
                                                <div className="col-5 text-end text-light pe-0">{weatherData.uv}</div>
                                            </div>
                                            <div className=" row justify-content-between align-items-center">
                                                <div className="col-7 text-light px-0">Wind Speed</div>
                                                <div className="col-5 text-end text-light pe-0">{weatherData.wind}(Kmph)</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="position-relative banner-search-box">
                <div className="container pb-1 pt-1 ">
                    <div className="row px-3 py-1 inner-form-bg rounded-3  pt-2 pb-2 position-relative">
                        <div className="neo-search-box">
                            <div className="row pb-1 d-flex align-items-center">
                                <div className="col-8 col-sm-8 col-md-6 col-lg-3 col-xl-2 col-xxl-2 p-1 py-sm-1">
                                    <div className="trip-btn-box px-1 py-1">
                                        <button className={tripType == 2 ? "btn btn-sm position-relative text-center text-capitalize w-100 round-trip active " : "btn btn-sm position-relative text-center text-capitalize w-100 round-trip  "} onClick={() => {
                                            setTripType(2);
                                            let currentDate = fromDate ? new Date(fromDate) : new Date();
                                            let maxDate = getMaxDatePicker();
                                            let isMaxFromDate = checkMaxDateRange(maxDate, currentDate, 3);
                                            if (!isMaxFromDate)
                                                setToDate(new Date(currentDate.setDate(currentDate.getDate() + 3)));
                                            else
                                                setToDate(maxDate);
                                        }}>round trip</button>
                                        <button className={tripType == 1 ? "btn btn-sm position-relative text-center text-capitalize w-100 one-way active" : "btn btn-sm position-relative text-center text-capitalize w-100 one-way"} onClick={() => { setTripType(1) }}>one way</button>
                                    </div>
                                </div>
                            </div>

                            <div className="row pb-2 search-fields">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-6 col-xxl-6">
                                    <div className="row">
                                        <div className="col-12 col-md-6  px-1">
                                            <div className="col-12 position-relative">
                                                <div className="field ">
                                                    <div className="origin-field position-relative">
                                                        <label className="origin-lable">Origin</label>
                                                        <input className={fromCodeError ? "shake-alert" : ""} type="text" placeholder="City/Airport" onClick={() => setShowOriginAirports(true)} value={fromInputValue} onChange={(e) => {
                                                            setFromInputValue(e.target.value);
                                                            setSameOriginDestination(false);
                                                            setFromCode('');
                                                            setFromLabel('');
                                                            setFromCodeError('');
                                                            if (e.target.value.length > 2) {
                                                                let airports = getAirportsFromValues(e.target.value, 'India');
                                                                setOriginAirportResults(airports);
                                                            }
                                                            else {
                                                                setOriginAirportResults([]);
                                                            }
                                                        }} onFocus={(e) => e.target.select()} />
                                                    </div>
                                                    {fromInputValue?.length > 0 &&
                                                        <Image
                                                            className="clear-field-icon position-absolute"
                                                            loader={trvLoader}
                                                            src="icon/close.svg"
                                                            alt="close icon"
                                                            onClick={() => {
                                                                setFromInputValue('');
                                                                setFromCode('');
                                                                setFromLabel('');
                                                                setSameOriginDestination(false);
                                                                setFromCodeError(false);
                                                                setOriginAirportResults([]);
                                                            }}
                                                        />}
                                                </div>
                                                <div className="reversearrow position-absolute start-100 translate-middle top-50">
                                                    <Image
                                                        className={isTripSwitched ? " w-100 flip" : " w-100"}
                                                        loader={trvLoader}
                                                        alt="switch arrow"
                                                        src="icon/switch-arrow.svg"
                                                        onClick={() => {
                                                            if (allAirports.find(airport => airport.value == toCode && airport.country == 'India')) {
                                                                let newFromCode = toCode;
                                                                let newFromLabel = toLabel;
                                                                let newFromInputValue = toInputValue;
                                                                let newAirportResults = destinationAirportResults;

                                                                let newToCode = fromCode;
                                                                let newToLabel = fromLabel;
                                                                let newToInputValue = fromInputValue;
                                                                let newToAirportResults = originAirportResults;

                                                                setTripSwitched(!isTripSwitched);

                                                                setFromCode(newFromCode);
                                                                setFromCodeError(false);
                                                                setFromLabel(newFromLabel);
                                                                setFromInputValue(newFromInputValue);
                                                                setOriginAirportResults(newAirportResults);

                                                                setToCode(newToCode);
                                                                setToCodeError(false);
                                                                setToLabel(newToLabel);
                                                                setToInputValue(newToInputValue);
                                                                setDestinationAirportResults(newToAirportResults);
                                                            }
                                                        }}
                                                    />

                                                </div>
                                                <div className={showOriginAirports ? "fields-list-card position-absolute mt-2 top-100 show" : "fields-list-card position-absolute mt-2 top-100"} ref={toListRef} >
                                                    <div className="list px-3 ">
                                                        {(originAirportResults && originAirportResults.length > 0) &&
                                                            originAirportResults.map((airport, index) => {
                                                                return <div className="row list-item px-1 py-2 d-flex align-items-center rounded-1" key={index} onClick={() => {
                                                                    setFromInputValue(airport.city + " - " + airport.value);
                                                                    if (!!toCode && airport.value == toCode) {
                                                                        setSameOriginDestination(true);
                                                                    }
                                                                    else {
                                                                        setSameOriginDestination(false);
                                                                    }
                                                                    setFromCode(airport.value);
                                                                    setFromLabel(airport.label);
                                                                    setFromCodeError(false);
                                                                }}>
                                                                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10">
                                                                        <div className="city-name fs-6 fw-bold">
                                                                            {airport.city} ({airport.value})
                                                                        </div>
                                                                        <div className="airport-name fs-6 fw-light">
                                                                            <p className="mb-0">{airport.label}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2 d-flex align-items-center justify-content-end list-flag-box">
                                                                        <div className="city-name fs-6 fw-bold pe-2 text-black-50 ">
                                                                            {airport.countryCode}
                                                                        </div>
                                                                        <Image
                                                                            className="flag-img rounded-1"
                                                                            alt="Flag Icon"
                                                                            loader={sfLoader}
                                                                            src={`https://assets.neofares.com/country-flags/${airport.countryCode}.webp`}
                                                                            width={17}
                                                                            height={12}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            })
                                                        }

                                                        {
                                                            (!fromInputValue || fromInputValue.length < 3) &&
                                                            <span className="no-airport-list d-flex flex-column align-items-center justify-content-center w-100 mt-1 pt-2">
                                                                <Image
                                                                    className="h-auto w-50"
                                                                    loader={trvLoader}
                                                                    src="type-something.gif"
                                                                    alt="Key Board img"
                                                                    width={184}
                                                                    height={42}
                                                                />
                                                                Enter atleast 3 characters to execute search</span>
                                                        }

                                                        {
                                                            (!!fromInputValue && fromInputValue.length > 2 && originAirportResults.length == 0) &&
                                                            <span className="no-airport-list d-flex flex-column align-items-center justify-content-center w-100 mt-1 pt-3">
                                                                <video loop muted autoPlay >
                                                                    <source src="https://assets.neofares.com/no-match-found.mp4" type="video/mp4" />
                                                                </video>
                                                                Oops! No match found. Spell-check needed</span>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="row alert-row position-absolute  mb-1 top-100">
                                                    <div className={fromCodeError ? "mb-0 text-danger mt-0 ms-2 show" : "mb-0 text-danger mt-2 ms-2"} >Please Select Origin</div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6  px-1">
                                            <div className="col-12 position-relative">
                                                <div className="field">
                                                    <div className="destination-field position-relative">
                                                        <label>Destination</label>
                                                        <input className={toCodeError ? "shake-alert" : ""} type="text" placeholder="City/Airport" onClick={() => setShowDestinationAirports(true)} value={toInputValue} onChange={(e) => {
                                                            setToInputValue(e.target.value);
                                                            setSameOriginDestination(false);
                                                            setToCode('');
                                                            setToLabel(false);
                                                            setToCodeError(false);
                                                            if (e.target.value.length > 2) {
                                                                let airports = getAirportsFromValues(e.target.value);
                                                                setDestinationAirportResults(airports);
                                                            }
                                                            else {
                                                                setDestinationAirportResults([]);
                                                            }
                                                        }} onFocus={(e) => e.target.select()} />

                                                    </div>
                                                    {toInputValue?.length > 0 &&
                                                        <Image
                                                            className="clear-field-icon position-absolute"
                                                            loader={trvLoader}
                                                            src="icon/close.svg"
                                                            alt="close icon"
                                                            width={100}
                                                            height={43}
                                                            onClick={() => {
                                                                setToInputValue('');
                                                                setToCode('');
                                                                setToLabel('');
                                                                setToCodeError(false);
                                                                setSameOriginDestination(false);
                                                                setDestinationAirportResults([]);
                                                            }}
                                                        />}
                                                    <div className={ShowDestinationAirports ? "fields-list-card position-absolute mt-2 top-100 show destinationlist" : "fields-list-card position-absolute mt-2 top-100 destinationlist"} ref={toListRef} >
                                                        <div className="list px-3 ">
                                                            {(destinationAirportResults && destinationAirportResults.length > 0) &&
                                                                destinationAirportResults.map((airport, index) => {
                                                                    return <div className="row list-item px-1 py-2 d-flex align-items-center rounded-1" key={index} onClick={() => {
                                                                        setToInputValue(airport.city + " - " + airport.value);
                                                                        if (!!fromCode && airport.value == fromCode)
                                                                            setSameOriginDestination(true);
                                                                        else
                                                                            setSameOriginDestination(false);
                                                                        setToCode(airport.value);
                                                                        setToLabel(airport.label);
                                                                        setToCodeError(false);
                                                                        setShowOriginAirports(false);
                                                                        setShowDestinationAirports(false)
                                                                    }}>
                                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10">
                                                                            <div className="city-name fs-6 fw-bold">
                                                                                {airport.city} ({airport.value})
                                                                            </div>
                                                                            <div className="airport-name fs-6 fw-light">
                                                                                <p className="mb-0">{airport.label}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2 d-flex align-items-center justify-content-end list-flag-box">
                                                                            <div className="city-name fs-6 fw-bold pe-2 text-black-50 ">
                                                                                {airport.countryCode}
                                                                            </div>
                                                                            <Image
                                                                                className="flag-img rounded-1"
                                                                                alt="Flag Icon"
                                                                                loader={sfLoader}
                                                                                src={`https://assets.neofares.com/country-flags/${airport.countryCode}.webp`}
                                                                                width={17}
                                                                                height={12}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                            {
                                                                (!toInputValue || toInputValue.length < 3) &&
                                                                <span className="no-airport-list d-flex flex-column align-items-center justify-content-center w-100 mt-1 pt-2">

                                                                    <Image
                                                                        className="h-auto w-50"
                                                                        loader={trvLoader}
                                                                        src="type-something.gif"
                                                                        alt="Key Board img"
                                                                        width={184}
                                                                        height={42}
                                                                    />
                                                                    Enter atleast 3 characters to execute search</span>
                                                            }
                                                            {
                                                                (!!toInputValue && toInputValue.length > 2 && destinationAirportResults.length == 0) &&
                                                                <span className="no-airport-list d-flex flex-column align-items-center justify-content-center w-100 mt-1 pt-3">
                                                                    <video loop muted autoPlay >
                                                                        <source src="https://assets.neofares.com/no-match-found.mp4" type="video/mp4" />
                                                                    </video>
                                                                    Oops! No match found. Spell-check needed</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row alert-row position-absolute  mb-1 top-100">
                                                    <div className={toCodeError ? "mb-0 text-danger mt-0 ms-2 show" : "mb-0 text-danger mt-2 ms-2"}>Please Select Destination</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-6 col-xxl-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 px-1">
                                            <div className="field from-field">
                                                <div className=" position-relative">
                                                    <label className="calender-label">Departure</label>
                                                    <DatePicker
                                                        onKeyDown={(e) => {
                                                            e.preventDefault();
                                                        }}
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
                                                                document.getElementById("rtnDatePicker").focus();
                                                            }
                                                            setCriteriaChanged(true);
                                                        }}
                                                        isClearable={false}
                                                        className="form-control"
                                                        scrollableYearDropdown={true}
                                                        minDate={new Date()}
                                                        showYearDropdown={true}
                                                        showMonthDropdown={true}
                                                        yearDropdownItemNumber={100}
                                                        maxDate={getMaxDatePicker()}
                                                        dateFormat={'dd/MM/yyyy'}
                                                    />
                                                </div>
                                                <Image
                                                    className="field-icon position-absolute"
                                                    loader={trvLoader}
                                                    src="icon/calendar-orange-icon.svg"
                                                    alt="calendar icon"
                                                    width={15}
                                                    height={15}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 px-1 px-1 d-flex align-items-end">
                                            <div className="field return-field w-100">
                                                {
                                                    tripType == 2 ?
                                                        <>
                                                            <div className=" position-relative">
                                                                <label className="calender-label">Return</label>
                                                                <DatePicker
                                                                    id="rtnDatePicker"
                                                                    onKeyDown={(e) => { e.preventDefault() }}
                                                                    isClearable={false}
                                                                    disabled={tripType == 1}
                                                                    selected={toDate}
                                                                    onFocus={(e) => e.target.blur()}
                                                                    onChange={(date) => {
                                                                        setToDate(date);
                                                                        setCriteriaChanged(true);
                                                                    }}
                                                                    className="form-control"
                                                                    scrollableYearDropdown={true}
                                                                    minDate={fromDate}
                                                                    showYearDropdown={true}
                                                                    showMonthDropdown={true}
                                                                    yearDropdownItemNumber={100}
                                                                    maxDate={getMaxDatePicker()}
                                                                    dateFormat={'dd/MM/yyyy'}
                                                                />
                                                            </div>
                                                            <Image
                                                                className="field-icon position-absolute"
                                                                loader={trvLoader}
                                                                src="icon/calendar-orange-icon.svg"
                                                                alt="calendar icon"
                                                                width={15}
                                                                height={15}
                                                            />
                                                        </>
                                                        : <button className="btn rounded-2 return-date-btn w-100 " onClick={() => {
                                                            setTripType(2);
                                                            let currentDate = fromDate ? new Date(fromDate) : new Date();
                                                            let maxDate = getMaxDatePicker();
                                                            let isMaxFromDate = checkMaxDateRange(maxDate, currentDate, 3);
                                                            if (!isMaxFromDate)
                                                                setToDate(new Date(currentDate.setDate(currentDate.getDate() + 3)));
                                                            else
                                                                setToDate(maxDate);
                                                        }}>Tap to add a return date </button>
                                                }
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 px-1 px-1 d-flex align-items-end ">

                                            <div className="dropdown w-100">
                                                <label className="text-light traveler-lable ps-2">Traveller & Class</label>
                                                <div className={ShowTravelersBox ? "traveler-box-btn d-flex position-relative align-items-center justify-content-start rounded-2 dropdown-toggle w-100 py-1 show" : "traveler-box-btn d-flex position-relative align-items-center justify-content-start rounded-2 dropdown-toggle w-100 py-1"} onClick={() => setShowTravelersBox(true)} >
                                                    <Image
                                                        className="px-2 py-2"
                                                        loader={trvLoader}
                                                        src="icon/user.svg"
                                                        alt="user icon"
                                                        width={176}
                                                        height={43}
                                                    />
                                                    <span className="d-inline-block text-truncate">
                                                        {adults + childs + infants} {(adults + childs + infants) > 1 ? ' ' : 'Adult'}, {displayCabin}
                                                    </span>
                                                </div>

                                                <div className={ShowTravelersBox ? " traveler-info-box border-0 show" : " traveler-info-box border-0"} ref={toTravelerRef}>
                                                    <div className="container-fluid">
                                                        <div className="row px-2 py-2">
                                                            <div className="col-3 bg-light py-2 d-flex align-items-center justify-content-center">
                                                                <h4 className="mb-0 fs-6">Class</h4>
                                                            </div>
                                                            <div className="col-9 bg-light py-2">
                                                                <select className="form-select traveler-class-select" value={menuCabin} onChange={(e) => {
                                                                    setMenuCabin(e.target.value);
                                                                }}>
                                                                    <option value="1">Economy</option>
                                                                    <option value="2">Premium Economy</option>
                                                                    <option value="3">Business Class</option>
                                                                    <option value="4">First Class</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="row py-2">
                                                                    <div className="col-6">
                                                                        <p className="mb-0">Adults</p>
                                                                    </div>
                                                                    <div className="col-6 passenger-count-btn ">
                                                                        <NumericInput
                                                                            strict
                                                                            min={1}
                                                                            max={9 - (menuChilds + menuInfants)}
                                                                            step={1}
                                                                            value={menuAdults}
                                                                            onChange={(data) => {
                                                                                if (menuInfants > data) setMenuInfants(data);
                                                                                setMenuAdults(data);
                                                                                setMaxInfantsValue(data);
                                                                            }}
                                                                            onKeyDown={(evt) => {
                                                                                evt.preventDefault();
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="row py-2">
                                                                    <div className="col-6">
                                                                        <p className="mb-0">Children</p>
                                                                        <p className="mb-0"><small className="text-black-50">Ages 2 to 17</small></p>
                                                                    </div>
                                                                    <div className="col-6 passenger-count-btn d-flex justify-content-center align-items-center">
                                                                        <NumericInput
                                                                            strict
                                                                            min={0}
                                                                            max={9 - (menuAdults + menuInfants)}
                                                                            step={1}
                                                                            value={menuChilds}
                                                                            onChange={(data) => {
                                                                                setMenuChilds(data);
                                                                                if (
                                                                                    menuInfants >= menuAdults || 9 - (menuAdults + data) > menuAdults
                                                                                )
                                                                                    setMaxInfantsValue(menuAdults);
                                                                                else setMaxInfantsValue(9 - (menuAdults + data));
                                                                            }}
                                                                            onKeyDown={(evt) => {
                                                                                evt.preventDefault();
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="row py-2">
                                                                    <div className="col-6">
                                                                        <p className="mb-0">Infants</p>
                                                                        <p className="mb-0"><small className="text-black-50">Younger than 2</small></p>
                                                                    </div>
                                                                    <div className="col-6 passenger-count-btn d-flex justify-content-center align-items-center">
                                                                        <NumericInput
                                                                            strict
                                                                            min={0}
                                                                            max={infantMaxValue}
                                                                            step={1}
                                                                            value={menuInfants}
                                                                            onChange={(data) => {
                                                                                if (data >= menuAdults) setMaxInfantsValue(adults);
                                                                                else setMaxInfantsValue(9 - (menuAdults + menuChilds));

                                                                                if (menuAdults + menuChilds + data > 9) {
                                                                                    setMenuInfants(9 - (menuAdults + menuChilds));
                                                                                    return;
                                                                                }
                                                                                setMenuInfants(data);
                                                                            }}
                                                                            onKeyDown={(evt) => { evt.preventDefault(); }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="row">
                                                                    <div className="col-9 d-flex align-items-center justify-content-end">
                                                                        <small></small>{(menuAdults + menuChilds + menuInfants) > 1 ? (menuAdults + menuChilds + menuInfants) + " Travelers," : (menuAdults + menuChilds + menuInfants) + " Adult,"} {flightClassOptions.find((x) => x.value == menuCabin).label}
                                                                    </div>
                                                                    <div className="col-3 text-end">
                                                                        <button className="btn btn-secondary btn-sm travelers-done" onClick={() => {
                                                                            setShowTravelersBox(false);
                                                                            setAdults(menuAdults);
                                                                            setChilds(menuChilds);
                                                                            setInfants(menuInfants);
                                                                            setCabin(menuCabin);
                                                                            setDisplayCabin(flightClassOptions.find((x) => x.value == menuCabin).label);
                                                                        }}>Done</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2 col-xxl-2 px-1 px-1 d-flex align-items-end ">
                                            <button className="btn neo-submit text-white fs-4 rounded-2" onClick={() => refreshResults()}>
                                                {isLoading ? <div className="spinner-border" role="status"></div> : <span>Modify</span>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row alert-row position-absolute  mb-1 bottom-0">
                                <div className={isSameOriginDestination ? "mb-0 text-danger show" : "mb-0 text-danger"} >Please select different Origin and Destination Airports!</div>
                            </div>

                            <div className="row alert-row position-absolute  mb-1 bottom-0">
                                <div className={isCriteriaChanged == false ? "mb-0 text-danger show" : "mb-0 text-danger"} >Please change your search criteria before clicking the Modify Search.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

