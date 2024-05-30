"use client";
import { useState, useEffect } from "react";
import NumericInput from "react-numeric-input";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { getAirports, getMostSearchFlights } from "../services/flightService";
import SearchControl from "./search-control";
import { useRouter } from "next/navigation";
import {
  checkMaxDateRange,
  generateId,
  getMaxDatePicker,
  trackMixpanelEvent,
} from "../helpers/common";
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";
registerLocale("es", es);

export default function SearchSection(props) {
  const [ShowTravewlersCount, SetShowTravewlersCount] = useState(false);
  const [tripType, setTripType] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [airports, setAirports] = useState([]);
  const [destinationAirports, setDestinationAirports] = useState([]);
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [localAirportData, setLocalAirportDate] = useState([]);
  const [showToDate, setShowToDate] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date(new Date(new Date().setDate(new Date().getDate() + 1)))
  );
  const [toDate, setToDate] = useState(
    new Date(new Date(new Date().setDate(new Date().getDate() + 4)))
  );
  const [cabinClass, setCabinClass] = useState("Economy");
  const [cabinValue, setCabinValue] = useState(1);
  const [isSearchProgress, setSearchInProgress] = useState(false);
  const [currentSearchTerm, setSearchTerm] = useState("");
  const [destinatioSearchTerm, setDestinationSearchTerm] = useState("");
  const [isRoutesFilled, setRoutesFilled] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [isTripSwitched, setTripSwitched] = useState(false);
  const [isModifyComponent] = useState(false);
  const [isOldSearchCriteria, setIsOldSearchCriteria] = useState(true);
  const [isSearchClicked, setSearchClicked] = useState(false);

  const router = useRouter();

  const resultPageFromDate = props.setFromDate;
  const resultPageToDate = props.setToDate;
  const resultPagePassengers = props.setNoOfPassengers;

  const getAirportByCode = (airportList, srchCodeName, isFrom = false) => {
    let filteredRecords = airportList.filter((airport) =>
      srchCodeName.length == 3
        ? airport.value.toLowerCase().includes(srchCodeName.toLowerCase())
        : airport.label.toLowerCase().includes(srchCodeName.toLowerCase())
    );

    return filteredRecords[0];
  };

  //#region Page initialization
  useEffect(() => {
    loadAirportRoutes();
  }, []);

  useEffect(() => {
    if (fromAirport && localAirportData.length > 0) {
      loadMostSearchs(fromAirport?.value, localAirportData);
    }
  }, [fromAirport]);

  const fetchUserLocation = (airports) => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: userLat, longitude: userLng } = position.coords;

        let nearestAirport = null;
        let minDist = Infinity;
        airports.forEach((airport) => {
          const dist = Math.sqrt(
            (userLat - airport.latitude) ** 2 +
            (userLng - airport.longitude) ** 2
          );
          if (dist < minDist) {
            nearestAirport = airport;
            minDist = dist;
          }
        });

        var formData = JSON.parse(localStorage.getItem("formData"));

        if (!formData) {
          setFromAirport(nearestAirport);
        }
      },
      (error) => console.error("Error getting user location:", error)
    );


  };

  const loadMostSearchs = (origin, airports) => {
    var formData = JSON.parse(localStorage.getItem("formData"));

    if (formData) {
      setToAirport(formData.toAirport);
    } else {

      getMostSearchFlights(origin).then((response) => {
        if (response) {

          let _toAirport = getAirportByCode(airports, response);

          setToAirport(_toAirport);

          setRoutesFilled(true);
        }
      });
    }


  };


  //#region helper events
  const searchAirport = (srchCodeName, isOriginAirport = true) => {
    if (isOriginAirport) setSearchTerm(srchCodeName);
    else setDestinationSearchTerm(srchCodeName);

    setAirports([]);

    if (srchCodeName.length < 3) {
      return;
    }

    let airportList = [...localAirportData];

    let filteredRecords = [];

    // if (isOriginAirport) {
    //   let indianAirports = airportList.filter(
    //     (airport) => airport.country == "India"
    //   );

    //   filteredRecords = indianAirports.filter((airport) =>
    //     srchCodeName.length == 3
    //       ? airport.value.toLowerCase().includes(srchCodeName.toLowerCase())
    //       : airport.label.toLowerCase().includes(srchCodeName.toLowerCase())
    //   );
    // } else {

    // }

    filteredRecords = airportList.filter((airport) =>
      srchCodeName.length == 3
        ? airport.value.toLowerCase().includes(srchCodeName.toLowerCase())
        : airport.label.toLowerCase().includes(srchCodeName.toLowerCase())
    );

    if (filteredRecords.length >= 1) {
      if (isOriginAirport) setAirports(filteredRecords);
      else setDestinationAirports(filteredRecords);
    }
  };

  //#endregion

  //#region APIs

  const searchFlights = async () => {
    if (!fromAirport || !toAirport) {
      setRoutesFilled(false);
      setSearchSubmitted(true);

      return;
    }

    if (fromAirport.value == toAirport.value) {
      return;
    }

    setSearchSubmitted(true);

    var formData = {
      fromAirport: fromAirport,
      toAirport: toAirport,
      fromDate: fromDate,
      toDate: toDate,
    };

    localStorage.setItem("formData", JSON.stringify(formData));

    if (!isRoutesFilled) {
      return;
    }

    setSearchInProgress(true);

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
    // resultPageFromDate(fromDate);
    // resultPageFromCode(fromAirport.value);
    // resultPageToCode(toAirport.value);
    // resultPageFromLabel(fromAirport.label);
    // resultPageToLabel(toAirport.label);

    if (!!toDate && tripType == 2) {
      segments.push({
        fromCode: toAirport.value,
        toCode: fromAirport.value,
        departureDate: toDate,
      });
    }

    let params = new URLSearchParams(window.location.search);
    let utmSouceValue = "";
    let utmTermValue = "";
    let referer = "";
    if (params && !!params.get("utm_source")) {
      utmSouceValue =
        params.get("utm_source") + "_campaign_" + params.get("utm_campaign");
      utmTermValue = params.get("utm_term");
      referer = params.get("referer");
    }
    let data = {
      tripType: parseInt(tripType),
      senior: 0,
      noOfAdult: parseInt(adults),
      child: parseInt(children),
      noOfLapInfant: parseInt(infants),
      cabin: parseInt(cabinValue),
      segments: segments,
      portalID: 107,
      utm_source: utmSouceValue,
      utm_term: utmTermValue,
      referer: referer,
    };

    let searchId = generateId(12);

    data.searchId = searchId;

    await trackMixpanelEvent("Home_Widget_Search", null, false, null, data);

    localStorage.setItem(searchId, btoa(JSON.stringify(data)));

    localStorage.setItem("mySearchID", searchId);

    localStorage.setItem("currentSelectedFilters", JSON.stringify(data));
    router.push("/listing?s=" + searchId);
    setTimeout(() => {
      setSearchInProgress(false);
    }, 1000);

    // if (segments[0].fromCountry == "India" && segments[0].toCountry == "India")
    //   router.push("/results?s=" + searchId);
    // else router.push("/listing?s=" + searchId);
    // setTimeout(() => {
    //   setSearchInProgress(false);
    // }, 1000);
  };

  const loadAirportRoutes = () => {
    getAirports().then((response) => {
      if (response && response.length > 1) {
        setLocalAirportDate(response);
        fetchUserLocation(response);

        var searchData = JSON.parse(
          localStorage.getItem("currentSelectedFilters")
        );

        if (searchData) {
          setTripType(searchData.tripType);
          setAdults(searchData.noOfAdult);
          setChildren(searchData.child);
          setInfants(searchData.noOfLapInfant);
        }

        var formData = JSON.parse(localStorage.getItem("formData"));

        if (formData) {
          setRoutesFilled(true);

          let _fromAirport = getAirportByCode(
            response,
            formData.fromAirport.value,
            true
          );
          setFromAirport(_fromAirport);

          let _toAirport = getAirportByCode(response, formData.toAirport.value);
          setToAirport(_toAirport);

          //if filter has previous date then don't need to change
          if (new Date(formData.fromDate) > fromDate) {
            setFromDate(new Date(formData.fromDate));
            setToDate(new Date(formData.toDate));
          }
        }
      }
    });
  };
  //#endregion

  return (
      <div className='position-relative'>
        <Image
          className="h-auto w-100 d-none d-md-block"
          loader={trvLoader}
          src="TRV-holiday-main-banner.webp"
          alt="User Icon"
          width={20}
          height={20}
        />
        <Image
          className="h-auto w-100 d-md-none"
          loader={trvLoader}
          src="TRV-holiday-main-banner-mob.webp"
          alt="User Icon"
          width={20}
          height={20}
        />
        <div className='FormBoxWrp'>
          <SearchControl
            resultPagePassengers={resultPagePassengers}
            resultPageFromDate={resultPageFromDate}
            resultPageToDate={resultPageToDate}
            tripType={tripType}
            isTripSwitched={isTripSwitched}
            myCustomLoader={trvLoader}
            fromAirport={fromAirport}
            toAirport={toAirport}
            currentSearchTerm={currentSearchTerm}
            destinatioSearchTerm={destinatioSearchTerm}
            destinationAirports={destinationAirports}
            isRoutesFilled={isRoutesFilled}
            searchSubmitted={searchSubmitted}
            isOldSearchCriteria={isOldSearchCriteria}
            isSearchClicked={isSearchClicked}
            fromDate={fromDate}
            toDate={toDate}
            DatePicker={DatePicker}
            adults={adults}
            children={children}
            infants={infants}
            cabinClass={cabinClass}
            ShowTravewlersCount={ShowTravewlersCount}
            NumericInput={NumericInput}
            isModifyComponent={isModifyComponent}
            isSearchProgress={isSearchProgress}
            setTripType={setTripType}
            setToDate={setToDate}
            setFromDate={setFromDate}
            setFromAirport={setFromAirport}
            setToAirport={setToAirport}
            searchAirport={searchAirport}
            airports={airports}
            setRoutesFilled={setRoutesFilled}
            setShowToDate={setShowToDate}
            showToDate={showToDate}
            SetShowTravewlersCount={SetShowTravewlersCount}
            setChildren={setChildren}
            setAdults={setAdults}
            setInfants={setInfants}
            searchFlights={searchFlights}
            setIsOldSearchCriteria={setIsOldSearchCriteria}
            getMaxDatePicker={getMaxDatePicker}
            checkMaxDateRange={checkMaxDateRange}
            setTripSwitched={setTripSwitched}
            setCabinClass={setCabinClass}
            airlineTitle={props.airlineTitle}
            minPrice={props.minPrice}
            airlineImage={props.airlineImage}
            selectedTab={props.selectedTab}
            setCabinValue={setCabinValue}
          ></SearchControl>
        </div>
      </div>

  );
}
