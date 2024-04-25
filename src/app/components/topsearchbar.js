import { useState, useEffect, useContext } from "react";
import NumericInput from "react-numeric-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAirports } from "../services/flightService";

import {
  checkMaxDateRange,
  generateId,
  getDisplayCabin,
  getDisplayClass,
  getMaxDatePicker,
} from "../helpers/common";
import moment from "moment";
import { useRouter } from "next/navigation";
import { trvLoader } from "../helpers/imageKitLoader";
import SearchControl from "./search-control";
import { CounterContext } from "../context/counter.context";

export default function Topsearch(props) {
  const { state, dispatch } = useContext(CounterContext);
  const [fromAirport, setFromAirport] = useState(null);
  const [currentSearchTerm, setSearchTerm] = useState("");
  const [toAirport, setToAirport] = useState(null);
  const [destinatioSearchTerm, setDestinationSearchTerm] = useState("");
  const [destinationAirports, setDestinationAirports] = useState([]);
  const [isRoutesFilled, setRoutesFilled] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [cabinClass, setCabinClass] = useState("Economy");
  const [cabinValue, setCabinValue] = useState(1);
  const [ShowTravewlersCount, SetShowTravewlersCount] = useState(false);
  const [localAirportData, setLocalAirportDate] = useState([]);
  const [showToDate, setShowToDate] = useState(false);
  const [isTripSwitched, setTripSwitched] = useState(false);
  const [isSearchProgress, setSearchInProgress] = useState(false);

  const [isModifyComponent] = useState(true);

  // OLD MODIFY SEARCH
  const [airports, setAirports] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(
    new Date(new Date(new Date().setDate(new Date().getDate() + 2)))
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [tripType, setTripType] = useState(1);
  const [isOldSearchCriteria, setIsOldSearchCriteria] = useState(true);
  const [isSearchClicked, setSearchClicked] = useState(false);

  const router = useRouter();

  const resultPageFromDate = props.setFromDate;
  const resultPageToDate = props.setToDate;
  const resultPagePassengers = props.setNoOfPassengers;
  const resultPageFromCode = props.setFromCode;
  const resultPageToCode = props.setToCode;
  const resultPageFromLabel = props.setFromLabel;
  const resultPageToLabel = props.setToLabel;
  const isModifyInProgress = props.isModifyInProgress;

  const setTripTypeInListing = props.setTripType;


  useEffect(() => {
    if (fromAirport) {
      resultPageFromLabel(fromAirport.label);
      resultPageToLabel(toAirport.label);
      const currentSelectedFilters = localStorage.getItem(
        "currentSelectedFilters"
      );
      let paramsData = JSON.parse(currentSelectedFilters);
      let paxes = {
        adults: paramsData.noOfAdult,
        children: paramsData.child,
        infants: paramsData.noOfLapInfant,
        cabin: getDisplayCabin(parseInt(paramsData.cabin)),
      };

      resultPagePassengers(paxes);
    }
  }, [fromAirport, toAirport]);

  const getAirportByCode = (airportList, srchCodeName) => {
    let filteredRecords = airportList.filter((airport) =>
      srchCodeName.length == 3
        ? airport.value.toLowerCase().includes(srchCodeName.toLowerCase())
        : airport.label.toLowerCase().includes(srchCodeName.toLowerCase())
    );

    return filteredRecords[0];
  };

  const searchAirport = (srchCodeName, isOriginAirport = true) => {
    if (isOriginAirport) {
      setSearchTerm(srchCodeName);
    } else {
      setDestinationSearchTerm(srchCodeName);
    }

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

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const setFiltersAndApply = (airports) => {
    if (props.isRouteSearch && !!props.currentRoute && airports && airports.length > 0) {
      setRoutesFilled(true);
      let splitedRoute = props.currentRoute.split("-");
      const fromCode = splitedRoute[1].toLocaleUpperCase();
      const toCode = splitedRoute[4].toLocaleUpperCase();
      let from = airports.find((z) => z.value == fromCode);
      let to = airports.find((z) => z.value == toCode);

      const departDate = new Date(new Date().setDate(new Date().getDate() + 1));
      let segments = [
        {
          fromCode: fromCode,
          toCode: toCode,
          departureDate: moment(departDate).format("MM/DD/YYYY"),
          fromLabel: from?.label,
          toLabel: to?.label,
          fromCountry: from?.country,
          toCountry: to?.country,
        },
      ];
      let dataToSend = {
        tripType: 1,
        senior: 0,
        noOfAdult: 1,
        child: 0,
        noOfLapInfant: 0,
        cabin: 1,
        segments: segments,
        fromInputValue: from?.label,
        toInputValue: to?.label
      };

      resultPageFromCode(fromCode);
      resultPageFromLabel(from?.label);
      setFromAirport(from);
      setToAirport(to);
      resultPageToLabel(to?.label);
      resultPageToCode(toCode);
      setTripType(1);
      setFromDate(departDate)
      localStorage.setItem("prevFilters", JSON.stringify(dataToSend));
      localStorage.setItem("currentSelectedFilters", JSON.stringify(dataToSend));
      dispatch({ type: "SETSEARCHCRITERIA", criteria: dataToSend });
      props.modifySearch(dataToSend, true);
      return;
    }

    //checking in query string if it contains
    let search = window.location.search;
    let params = new URLSearchParams(search);

    if (params.get("s")) {
      let currentKey = params.get("s");
      let keysToExclude = [
        "isDomesticFlight",
        "currentSelectedFilters",
        "currentFlight",
        "showIndiaContact",
        "fpendingPath",
        "fsuccessPath",
        "showUTMContact",
        "utmContact",
        "mySearchID",
        "searchCriteria",
      ];
      Object.keys(localStorage).forEach(function (lkey) {
        if (keysToExclude.indexOf(lkey) == -1 && currentKey != lkey) {
          let isNotRemoveable = lkey == "formData";

          if (!isNotRemoveable) {
            localStorage.removeItem(lkey);
          }
        }
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
      } else {
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
      let utm_medium = params.utmMedium;
      if (params.segments.length > 1) toDate = params.segments[1].departureDate;

      //Setting default parameters
      if (!cabin) cabin = 1;

      if (!noOfAdult) noOfAdult = 1;
      if (!infants) infants = 0;
      if (!childs) childs = 0;
      if (!tripType) tripType = 1;

      let dates = [];
      dates.push(new Date(deptDate));
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
      } else {
        tripType = 1;
        setToDate("");
      }

      let dataToSend = {
        tripType: parseInt(tripType),
        senior: 0,
        noOfAdult: parseInt(noOfAdult),
        child: parseInt(childs),
        noOfLapInfant: parseInt(infants),
        cabin: parseInt(cabin),
        segments: segments,
        isFromCityCode: from ? from.isCityCode : false,
        isToCityCode: to ? to.isCityCode : false,
        referer: referer,
        utm_source: utm_source,
        utm_term: utm_term,
        utm_medium: utm_medium,
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
      setTripTypeInListing(parsedFilters.tripType);

      let dates = [];

      dates.push(new Date(parsedFilters.segments[0].departureDate));

      setFromDate(new Date(parsedFilters.segments[0].departureDate));
      resultPageFromDate(new Date(parsedFilters.segments[0].departureDate));

      setInfants(parsedFilters.noOfLapInfant);
      setAdults(parsedFilters.noOfAdult);

      if (
        document.body.classList.contains('oneway-listing')
      ) {
        document.body.classList.remove('oneway-listing')
      }

      if (parsedFilters.tripType == 2) {
        dates.push(new Date(parsedFilters.segments[1].departureDate));
      }

      else {
        document.body.classList.add('oneway-listing')
      }

      props.modifySearch(parsedFilters)?.then((res) => {
        setSearchInProgress(false);
        setSearchClicked(false);
        setIsOldSearchCriteria(true);
      });
    }
  };

  useEffect(() => {
    loadAirportRoutes();
  }, []);

  const searchFlights = async () => {
    if (fromAirport && toAirport && fromAirport.value == toAirport.value) {
      return;
    }

    if (!fromAirport || !toAirport) {
      setRoutesFilled(false);
      setSearchSubmitted(true);

      return;
    }

    setSearchClicked(true);

    if (isOldSearchCriteria) {
      return;
    }

    setSearchInProgress(true);

    setSearchSubmitted(true);

    setIsOldSearchCriteria(false);

    if (fromAirport.value == toAirport.value) {
      return;
    }

    if (!isRoutesFilled) {
      return;
    }

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

    resultPageFromDate(fromDate);
    resultPageFromCode(fromAirport.value);
    resultPageToCode(toAirport.value);
    resultPageFromLabel(fromAirport.label);
    resultPageToLabel(toAirport.label);

    if (!!toDate && tripType == 2) {
      segments.push({
        fromCode: toAirport.value,
        toCode: fromAirport.value,
        departureDate: toDate,
      });
      resultPageToDate(toDate);
    }
    let cabinToSend = 1;
    if (!!localStorage.getItem("currentSelectedFilters")) {
      cabinToSend = JSON.parse(
        localStorage.getItem("currentSelectedFilters")
      ).cabin;
    }

    //Setting default parameters
    if (cabinValue) cabinToSend = cabinValue;
    let data = {
      tripType: parseInt(tripType),
      senior: 0,
      noOfAdult: parseInt(adults),
      child: parseInt(children),
      noOfLapInfant: parseInt(infants),
      cabin: parseInt(cabinToSend),
      segments: segments,
      portalID: 50,
    };

    var formData = {
      fromAirport: fromAirport,
      toAirport: toAirport,
      fromDate: fromDate,
      toDate: toDate,
    };

    props.closeModifySearch();

    localStorage.setItem("formData", JSON.stringify(formData));

    let params = new URLSearchParams(window.location.search);

    let currentLocalStorageItem = localStorage.getItem(params.get("s"));

    if (currentLocalStorageItem) {
      localStorage.removeItem(params.get("s"));
    }

    let searchId = generateId(12);

    data.searchId = searchId;

    params.set("s", searchId);
    history.replaceState(null, null, "?" + params.toString());

    localStorage.setItem(searchId, btoa(JSON.stringify(data)));
    localStorage.setItem("mySearchID", searchId);
    localStorage.setItem("currentSelectedFilters", JSON.stringify(data));
    localStorage.setItem("searchCriteria", JSON.stringify(data));
    dispatch({ type: "SETSEARCHCRITERIA", criteria: data });

    setFiltersAndApply(localAirportData);

    if (fromAirport.country == "India" && toAirport.country == "India")
      router.push("/results?s=" + searchId);
    else router.push("/listing?s=" + searchId);
  };


  const loadAirportRoutes = () => {
    getAirports().then((response) => {
      const hours = 24;

      //cache.put("airportsdata", response, hours * 1000 * 60 * 60);

      if (response && response.length > 1) {
        setLocalAirportDate(response);

        var searchData = JSON.parse(
          localStorage.getItem("currentSelectedFilters")
        );

        if (searchData) {
          setTripType(searchData.tripType);
          setTripTypeInListing(searchData.tripType);
          setAdults(searchData.noOfAdult);
          setChildren(searchData.child);
          setInfants(searchData.noOfLapInfant);

          setCabinClass(getDisplayCabin(searchData.cabin));
        }

        var formData = JSON.parse(localStorage.getItem("formData"));

        if (formData) {
          setRoutesFilled(true);

          let _fromAirport = getAirportByCode(
            response,
            formData.fromAirport.value
          );
          setFromAirport(_fromAirport);

          let _toAirport = getAirportByCode(response, formData.toAirport.value);
          setToAirport(_toAirport);

          setFromDate(new Date(formData.fromDate));
          resultPageFromDate(new Date(formData.fromDate));

          setToDate(new Date(formData.toDate));
          resultPageToDate(new Date(formData.toDate));
        }

        setFiltersAndApply(response);

        //props.setIsRedirectedFromModify(true);
      }
    });
  };


  return (
    <>

      <SearchControl
        isModifyInProgress={isModifyInProgress}
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
        setCabinValue={setCabinValue}
        resultPageFromLabel={resultPageFromLabel}
      ></SearchControl>
    </>
  );
}
