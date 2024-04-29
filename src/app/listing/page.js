"use client";
import Topsearch from "../components/topsearchbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { isBrowser } from "react-device-detect";
import Image from "next/image";
import ReactSlider from "react-slider";
import { searchFlights } from "../services/flightService";
import { Fragment, useEffect, useState } from "react";
import {
  encodeData,
  getDiffFromMinutes,
  getDisplayAirline,
  getDisplayCabin,
  getFormattedDate,
  getFormattedDate4,
  getFormattedTime,
  isADomesticFlight,
  isPureAirline,
  numberFormat,
  aedNumberFormat,
  trackMixpanelEvent,
} from "../helpers/common";
import InnerFooter from "../components/inner-footer";
import { contactNumber } from "../config";
import { Modal } from "react-bootstrap";
import FlightDetailFlap from "../components/flight-detail-flap";
import { bookKiwiFlight } from "../services/bookingService";
import { GDSNames } from "../helpers/constants";
import ChangePrice from "../components/change-price";
import CircularJSON from "circular-json";
import { airlineLogoLoader, trvLoader } from "../helpers/imageKitLoader";
import InnerHeader from "../components/inner-header";
import ResultsSplashScreen from "../components/custom-splash-screen";
import OffersMatrix from "../components/offer-matrix";
import FlightInqueryForm from "../components/FlightInquery";

export default function Listing() {
  const sortByOptions = [
    { value: 1, label: "Price (Lowest)" },
    { value: 2, label: "Price (Highest)" },
    { value: 3, label: "Duration (Shortest)" },
    { value: 4, label: "Duration (Longest)" },
  ];

  const sliderSettings = {
    className: "center",
    centerMode: false,
    infinite: false,
    centerPadding: "20px",
    slidesToShow: isBrowser ? 4 : 2,
    slidesToScroll: isBrowser ? 4 : 2,
    speed: 500,
  };
  const [inquiryPkg, setInquiryPkg] = useState();

  const [fromLabel, setFromLabel] = useState(null);
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [toLabel, setToLabel] = useState(null);
  const [defaultSortOption, setDefaultSortOption] = useState(sortByOptions[0]);
  const [flights, setFlightsData] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [currentFilters, setCurrentFilters] = useState(null);
  const [itemsCounter, setItemsCounter] = useState(10);
  const [validatingCarriers, setValidatingCarriers] = useState([]);
  const [pureValidatingCarriers, setPureValidatingCarriers] = useState([]);
  const [matrixAirlines, setMatrixAirlines] = useState([]);
  const [stopsFilters, setStopsFilters] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [priceFilterValues, setPriceFilterValues] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState([0, 24]);
  const [selectedReturnTimeRange, setSelectedReturnTimeRange] = useState([
    0, 24,
  ]);
  const [selectedMatrixStops, setSelectedMatrixStops] = useState([]);
  const [selectedMatrixAirline, setSelectedMatrixAirline] = useState({
    name: null,
    connectingAirlines: null,
  });
  const [selectedMatrixAirlineStop, setSelectedMatrixAirlineStop] = useState({
    name: null,
    connectingAirlines: null,
    stops: null,
  });
  const [isSelectClicked, setIsSelectClicked] = useState(false);

  const [selectedPureAirlines, setSelectedPureAirlines] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [priceFilterRange, setPriceFilterRange] = useState([]);
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [showContentLoader, setShowContentLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [mobSideFilterClicked, setMobSideFilterClicked] = useState(false);
  const [displayContactNumber, setDisplayContactNumber] =
    useState(contactNumber);
  const [showSpinnerIndex, setShowSpinnerIndex] = useState(null);

  const [newPrice, setNewPrice] = useState(0);
  const [openNewPriceModal, setOpenNewPriceModal] = useState(false);
  const [openFlightEnquiryForm, setopenFlightEnquiryForm] = useState(false);
  const [airportFromCity, setAirportFromCity] = useState("");
  const [airportToCity, setAirportToCity] = useState("");

  const [tripType, setTripType] = useState(1);
  const [fromDate, setFromDate] = useState(
    new Date(new Date(new Date().setDate(new Date().getDate() + 1)))
  );
  const [toDate, setToDate] = useState(
    new Date(new Date(new Date().setDate(new Date().getDate() + 4)))
  );

  const [noOfPassengers, setNoOfPassengers] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    cabin: "",
  });
  const [fromCode, setFromCode] = useState(null);
  const [toCode, setToCode] = useState(null);

  useEffect(() => {
    document.body.classList.add("bg-grey");
    return () => {
      if (document.body.classList.contains("bg-grey"))
        document.body.classList.remove("bg-grey");
    };
  }, []);


  const clearFilters = () => {
    setSelectedStops([]);
    setSelectedAirlines([]);
    setSelectedPureAirlines([]);
    setSelectedMatrixAirline({ name: null, connectingAirlines: null });
    setSelectedMatrixAirlineStop({
      name: null,
      connectingAirlines: null,
      stops: null,
    });
    setSelectedMatrixStops([]);
    setSelectedTimeRange([0, 24]);
    setSelectedReturnTimeRange([0, 24]);
    setPriceFilterValues([
      Math.min(
        ...flights.map((flight) =>
          (flight.totalPrice / totalPassengers).toFixed(2)
        )
      ),
      Math.max(
        ...flights.map((flight) =>
          (flight.totalPrice / totalPassengers).toFixed(2)
        )
      ),
    ]);
    setFlightsData(flights);
    setFilteredFlights(flights);
    setFilters(flights);
  };

  const setFilters = (
    res,
    filterType = "",
    airlines = null,
    pureAirlines = null,
    stops = null
  ) => {
    setShowContentLoader(true);
    var departStops = res.map((x) => x.departureStops);
    let carriers = [];
    let pureCarrier = [];

    res.forEach((element) => {
      if (
        carriers.findIndex(
          (x) => x.code == element.trips[0].validatingCarrier.code
        ) == -1
      ) {
        let extendCarrier = element.trips[0].validatingCarrier;
        let carrierPrice = 0;
        let sortedResults = sortResults(res);
        let carrierContract = sortedResults.find(
          (x) =>
            x.trips[0].validatingCarrier.code ==
              element.trips[0].validatingCarrier.code &&
            !(
              x.trips[0].listOfFlight.every(
                (z) =>
                  z.marketingCarrier == element.trips[0].validatingCarrier.code
              ) &&
              (x.trips.length > 1
                ? x.trips[1].listOfFlight.every(
                    (z) =>
                      z.marketingCarrier ==
                      element.trips[0].validatingCarrier.code
                  )
                : true)
            )
        );
        if (carrierContract) {
          let totalPassangers = 0;
          carrierContract.fareDetails.forEach((fare) => {
            if (fare.totalFareAmount > 0) {
              totalPassangers += fare.noofPax;
            }
          });
          carrierPrice = carrierContract.totalPrice / totalPassangers;
        }
        extendCarrier.price = carrierPrice;
        extendCarrier.connectingAirlines = !(
          element.trips[0].listOfFlight
            .map((x) => x.marketingCarrier)
            .every((x) => x == element.trips[0].validatingCarrier.code) &&
          (element.trips.length > 1
            ? element.trips[1].listOfFlight
                .map((x) => x.marketingCarrier)
                .every((x) => x == element.trips[0].validatingCarrier.code)
            : true)
        );
        if (extendCarrier.connectingAirlines) carriers.push(extendCarrier);
      }

      if (
        pureCarrier.findIndex(
          (x) => x.code == element.trips[0].validatingCarrier.code
        ) == -1
      ) {
        let allAirlinesSame = element.trips[0].listOfFlight
          .map((x) => x.marketingCarrier)
          .every((x) => x == element.trips[0].validatingCarrier.code);
        if (element.trips.length > 1) {
          allAirlinesSame =
            allAirlinesSame &&
            element.trips[1].listOfFlight
              .map((x) => x.marketingCarrier)
              .every((x) => x == element.trips[0].validatingCarrier.code);
        }
        if (allAirlinesSame) {
          let extendPureCarrier = element.trips[0].validatingCarrier;
          let extendPureCarrierPice = 0;
          let sortedResults = sortResults(res);
          let purecarrierContract = sortedResults.find(
            (x) =>
              x.trips[0].listOfFlight.every(
                (z) =>
                  z.marketingCarrier == element.trips[0].validatingCarrier.code
              ) &&
              (x.trips.length > 1
                ? x.trips[1].listOfFlight.every(
                    (z) =>
                      z.marketingCarrier ==
                      element.trips[0].validatingCarrier.code
                  )
                : true)
          );
          if (purecarrierContract) {
            let totalPassangers = 0;
            purecarrierContract.fareDetails.forEach((fare) => {
              if (fare.totalFareAmount > 0) {
                totalPassangers += fare.noofPax;
              }
            });
            extendPureCarrierPice =
              purecarrierContract.totalPrice / totalPassangers;
          }
          extendPureCarrier.price = extendPureCarrierPice;
          extendPureCarrier.connectingAirlines = false;
          pureCarrier.push(extendPureCarrier);
        }
      }
    });
    carriers = carriers.sort((a, b) => a.price - b.price);
    pureCarrier = pureCarrier.sort((a, b) => a.price - b.price);

    if (
      !filterType ||
      (filterType != "airline" &&
        filterType != "pure-airline" &&
        filterType != "price")
    ) {
      setPureValidatingCarriers(pureCarrier);
      setValidatingCarriers(carriers);
    } else if (
      (filterType == "pure-airline" &&
        (!pureAirlines || pureAirlines.length == 0)) ||
      (filterType == "airline" && (!airlines || airlines.length == 0))
    ) {
      setPureValidatingCarriers(pureCarrier);
      setValidatingCarriers(carriers);
    }

    let allAirlines = [];
    if (
      (!matrixAirlines ||
        matrixAirlines.length == 0 ||
        filterType == "modifySearch") &&
      res.length > 0 &&
      res[0].gdsName != "TBO"
    ) {
      carriers.forEach((carrier) => {
        carrier.nonStopFlights = [];
        carrier.oneStopFlights = [];
        carrier.multipleStopFlights = [];
        res.filter((element) => {
          if (element.trips[0].listOfFlight[0].marketingCarrier != carrier.code)
            return false;
          // if (element.trips[0].listOfFlight.some(x => x.marketingCarrier == carrier.code) && (element.trips.length > 1 ? element.trips[1].listOfFlight.some(x => x.marketingCarrier == carrier.code) : true)) {
          let allAirlinesSame = element.trips[0].listOfFlight
            .map((x) => x.marketingCarrier)
            .every((x) => x == element.trips[0].validatingCarrier.code);
          if (element.trips.length > 1) {
            allAirlinesSame =
              allAirlinesSame &&
              element.trips[1].listOfFlight
                .map((x) => x.marketingCarrier)
                .every((x) => x == element.trips[0].validatingCarrier.code);
          }
          if (!allAirlinesSame) {
            let isNonStop = element.trips[0].listOfFlight.length == 1;
            let isOneStop = element.trips[0].listOfFlight.length == 2;
            let isMultipleStops = element.trips[0].listOfFlight.length > 2;
            if (element.trips.length == 2) {
              isNonStop =
                element.trips[0].listOfFlight.length == 1 &&
                element.trips[1].listOfFlight.length == 1;
              isOneStop =
                (element.trips[0].listOfFlight.length == 2 ||
                  element.trips[1].listOfFlight.length == 2) &&
                element.trips[0].listOfFlight.length <= 2 &&
                element.trips[1].listOfFlight.length <= 2;
              isMultipleStops =
                element.trips[0].listOfFlight.length > 2 ||
                element.trips[1].listOfFlight.length > 2;
            }
            if (isNonStop) carrier.nonStopFlights.push(element);
            else if (isOneStop) carrier.oneStopFlights.push(element);
            else if (isMultipleStops) carrier.multipleStopFlights.push(element);
          }
          return !allAirlinesSame;
          // }
        });
      });

      pureCarrier.forEach((carrier) => {
        carrier.nonStopFlights = [];
        carrier.oneStopFlights = [];
        carrier.multipleStopFlights = [];
        res.filter((element) => {
          if (element.trips[0].listOfFlight[0].marketingCarrier != carrier.code)
            return false;
          let allAirlinesSame = element.trips[0].listOfFlight
            .map((x) => x.marketingCarrier)
            .every((x) => x == element.trips[0].validatingCarrier.code);
          if (element.trips.length > 1) {
            allAirlinesSame =
              allAirlinesSame &&
              element.trips[1].listOfFlight
                .map((x) => x.marketingCarrier)
                .every((x) => x == element.trips[0].validatingCarrier.code);
          }
          if (allAirlinesSame) {
            let isNonStop = element.trips[0].listOfFlight.length == 1;
            let isOneStop = element.trips[0].listOfFlight.length == 2;
            let isMultipleStops = element.trips[0].listOfFlight.length > 2;
            if (element.trips.length == 2) {
              isNonStop =
                element.trips[0].listOfFlight.length == 1 &&
                element.trips[1].listOfFlight.length == 1;
              isOneStop =
                (element.trips[0].listOfFlight.length == 2 ||
                  element.trips[1].listOfFlight.length == 2) &&
                element.trips[0].listOfFlight.length <= 2 &&
                element.trips[1].listOfFlight.length <= 2;
              isMultipleStops =
                element.trips[0].listOfFlight.length > 2 ||
                element.trips[1].listOfFlight.length > 2;
            }
            if (isNonStop) carrier.nonStopFlights.push(element);
            else if (isOneStop) carrier.oneStopFlights.push(element);
            else if (isMultipleStops) carrier.multipleStopFlights.push(element);
          }
          return allAirlinesSame;
        });
      });

      if (carriers && carriers.length > 0) allAirlines.push(...carriers);
      if (pureCarrier && pureCarrier.length > 0)
        allAirlines.push(...pureCarrier);

      if (allAirlines.length > 0) {
        allAirlines = allAirlines
          .filter((x) => x.price > 0)
          .sort(function (a, b) {
            return a.price - b.price;
          });
      }
      setMatrixAirlines(allAirlines);
    }

    if (
      !filterType ||
      filterType != "stops" ||
      (filterType == "stops" && (!stops || stops.length == 0))
    )
      setStopsFilters([...new Set(departStops.sort())]);

    setTimeout(() => {
      setShowContentLoader(false);
    }, 600);
  };

  const applyMatrixFilter = (filterType, value, airlineStops = null) => {
    clearFilters();
    let noOfStops = [];
    let allFilteredFlights = flights;

    if (filterType == "stops") {
      if (selectedMatrixStops.indexOf(parseInt(value)) > -1) {
        noOfStops = selectedMatrixStops.filter((x) => x != value);
        // setSelectedMatrixAirline({ name: null, connectingAirlines: null });
        // setSelectedMatrixAirlineStop({ name: null, connectingAirlines: null, stops: null });
        setSelectedMatrixStops(noOfStops);
        setSelectedStops(noOfStops);
        // setSelectedAirlines([]);
        // setSelectedPureAirlines([]);
      } else {
        noOfStops = selectedMatrixStops;
        noOfStops.push(parseInt(value));
        setSelectedMatrixStops(noOfStops);
        setSelectedStops(noOfStops);
      }
      if (noOfStops && noOfStops.length > 0) {
        allFilteredFlights = allFilteredFlights.filter(
          (x) =>
            noOfStops.includes(x.departureStops) &&
            (!noOfStops.includes(0) || noOfStops.includes(x.returnStops))
        );
      }
    } else if (filterType == "airline") {
      if (
        selectedMatrixAirline.name == value.name &&
        selectedMatrixAirline.connectingAirlines == value.connectingAirlines
      ) {
      } else {
        setSelectedMatrixAirline({
          name: value.name,
          connectingAirlines: value.connectingAirlines,
        });

        if (value.connectingAirlines) {
          allFilteredFlights = allFilteredFlights.filter((element) => {
            let containsSelectedAirline = element.trips[0].listOfFlight.some(
              (x) => x.marketingCarrier == value.code
            );
            if (!containsSelectedAirline) {
              return false;
            }
            let allAirlinesSame = element.trips[0].listOfFlight
              .map((x) => x.marketingCarrier)
              .every((x) => x == element.trips[0].validatingCarrier.code);
            if (element.trips.length > 1) {
              allAirlinesSame =
                allAirlinesSame &&
                element.trips[1].listOfFlight
                  .map((x) => x.marketingCarrier)
                  .every((x) => x == element.trips[0].validatingCarrier.code);
            }
            return !allAirlinesSame;
          });
        } else {
          allFilteredFlights = allFilteredFlights.filter((element) => {
            if (element.trips[0].listOfFlight[0].marketingCarrier != value.code)
              return false;
            let allAirlinesSame = element.trips[0].listOfFlight
              .map((x) => x.marketingCarrier)
              .every((x) => x == element.trips[0].validatingCarrier.code);
            if (element.trips.length > 1) {
              allAirlinesSame =
                allAirlinesSame &&
                element.trips[1].listOfFlight
                  .map((x) => x.marketingCarrier)
                  .every((x) => x == element.trips[0].validatingCarrier.code);
            }
            return allAirlinesSame;
          });
        }
      }
    } else if (filterType == "airline-stops") {
      if (
        selectedMatrixAirlineStop.name == value.name &&
        selectedMatrixAirlineStop.connectingAirlines ==
          value.connectingAirlines &&
        selectedMatrixAirlineStop.stops == airlineStops
      ) {
      } else {
        setSelectedMatrixAirlineStop({
          name: value.name,
          connectingAirlines: value.connectingAirlines,
          stops: airlineStops,
        });

        let selectedAirline = matrixAirlines.find(
          (x) => x.code == value.code && x.connectingAirlines == false
        );

        if (value.connectingAirlines) {
          selectedAirline = matrixAirlines.find(
            (x) => x.code == value.code && x.connectingAirlines == true
          );
        }

        switch (airlineStops) {
          case 0:
            allFilteredFlights = selectedAirline.nonStopFlights;
            break;
          case 1:
            allFilteredFlights = selectedAirline.oneStopFlights;
            break;
          case 2:
            allFilteredFlights = selectedAirline.multipleStopFlights;
            break;
          default:
            allFilteredFlights = selectedAirline.nonStopFlights;
        }
      }
    }

    allFilteredFlights = sortResults(allFilteredFlights);
    setFilteredFlights(allFilteredFlights);
  };

  const applyFilters = (filterType, value) => {
    let noOfStops = [];
    let allFilteredFlights = [];
    let pureAirlines = [];
    let airlines = [];

    setSelectedMatrixAirline({ name: null, connectingAirlines: null });
    setSelectedMatrixAirlineStop({
      name: null,
      connectingAirlines: null,
      stops: null,
    });

    if (filterType == "stops") {
      allFilteredFlights = flights;
      if (selectedStops.indexOf(parseInt(value)) > -1) {
        noOfStops = selectedStops.filter((x) => x != value);
        setSelectedMatrixAirline({ name: null, connectingAirlines: null });
        setSelectedMatrixAirlineStop({
          name: null,
          connectingAirlines: null,
          stops: null,
        });
        setSelectedStops(noOfStops);
        setSelectedMatrixStops(noOfStops);
      } else {
        noOfStops = selectedStops;
        noOfStops.push(parseInt(value));
        setSelectedMatrixAirline({ name: null, connectingAirlines: null });
        setSelectedMatrixAirlineStop({
          name: null,
          connectingAirlines: null,
          stops: null,
        });
        setSelectedStops(noOfStops);
        setSelectedMatrixStops(noOfStops);
      }

      if (
        (selectedAirlines && selectedAirlines.length > 0) ||
        (selectedPureAirlines && selectedPureAirlines.length > 0)
      ) {
        let ff = [];
        selectedAirlines.forEach((air) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              (!x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) ||
                (x.trips.length > 1
                  ? !x.trips[1].listOfFlight
                      .map((f) => f.marketingCarrier)
                      .every((f) => f == x.trips[0].validatingCarrier.code)
                  : false))
          );
          ff.push(...fFlights);
        });

        selectedPureAirlines.forEach((air) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) &&
              (x.trips.length > 1
                ? x.trips[1].listOfFlight
                    .map((f) => f.marketingCarrier)
                    .every((f) => f == x.trips[0].validatingCarrier.code)
                : true)
          );
          ff.push(...fFlights);
        });
        allFilteredFlights = ff;
      }

      allFilteredFlights = allFilteredFlights.filter(
        (x) =>
          x.totalPrice / totalPassengers >= priceFilterValues[0] &&
          x.totalPrice / totalPassengers <= priceFilterValues[1]
      );
      allFilteredFlights = allFilteredFlights.filter((x) =>
        isWithinTimeRange(
          formatTime(selectedTimeRange[0]),
          selectedTimeRange[1] == 24
            ? "11:59 PM"
            : formatTime(selectedTimeRange[1]),
          getFormattedTime(x.trips[0].listOfFlight[0].departureTime)
        )
      );
      if (
        allFilteredFlights.length > 0 &&
        allFilteredFlights[0].trips.length > 1
      )
        allFilteredFlights = allFilteredFlights.filter((x) =>
          isWithinTimeRange(
            formatTime(selectedReturnTimeRange[0]),
            selectedReturnTimeRange[1] == 24
              ? "11:59 PM"
              : formatTime(selectedReturnTimeRange[1]),
            getFormattedTime(x.trips[1].listOfFlight[0].departureTime)
          )
        );

      if (noOfStops && noOfStops.length > 0) {
        allFilteredFlights = allFilteredFlights.filter(
          (x) =>
            noOfStops.includes(x.departureStops) &&
            (!noOfStops.includes(0) || noOfStops.includes(x.returnStops))
        );
      }
    } else if (filterType == "price") {
      allFilteredFlights = flights;
      if (
        (selectedAirlines && selectedAirlines.length > 0) ||
        (selectedPureAirlines && selectedPureAirlines.length > 0)
      ) {
        let ff = [];
        selectedAirlines.forEach((air) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              (!x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) ||
                (x.trips.length > 1
                  ? !x.trips[1].listOfFlight
                      .map((f) => f.marketingCarrier)
                      .every((f) => f == x.trips[0].validatingCarrier.code)
                  : false))
          );
          ff.push(...fFlights);
        });

        selectedPureAirlines.forEach((air) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) &&
              (x.trips.length > 1
                ? x.trips[1].listOfFlight
                    .map((f) => f.marketingCarrier)
                    .every((f) => f == x.trips[0].validatingCarrier.code)
                : true)
          );
          ff.push(...fFlights);
        });
        allFilteredFlights = ff;
      }

      if (selectedStops && selectedStops.length > 0) {
        allFilteredFlights = allFilteredFlights.filter(
          (x) =>
            selectedStops.includes(x.departureStops) &&
            (!selectedStops.includes(0) ||
              selectedStops.includes(x.returnStops))
        );
      }

      allFilteredFlights = allFilteredFlights.filter((x) =>
        isWithinTimeRange(
          formatTime(selectedTimeRange[0]),
          selectedTimeRange[1] == 24
            ? "11:59 PM"
            : formatTime(selectedTimeRange[1]),
          getFormattedTime(x.trips[0].listOfFlight[0].departureTime)
        )
      );
      if (
        allFilteredFlights.length > 0 &&
        allFilteredFlights[0].trips.length > 1
      )
        allFilteredFlights = allFilteredFlights.filter((x) =>
          isWithinTimeRange(
            formatTime(selectedReturnTimeRange[0]),
            selectedReturnTimeRange[1] == 24
              ? "11:59 PM"
              : formatTime(selectedReturnTimeRange[1]),
            getFormattedTime(x.trips[1].listOfFlight[0].departureTime)
          )
        );
      allFilteredFlights = allFilteredFlights.filter(
        (x) =>
          (x.totalPrice / totalPassengers).toFixed(2) >= value[0] &&
          (x.totalPrice / totalPassengers).toFixed(2) <= value[1]
      );
    } else if (filterType == "pure-airline") {
      if (selectedPureAirlines.findIndex((x) => x.name == value.name) > -1) {
        pureAirlines = selectedPureAirlines.filter((x) => x.name != value.name);
        setSelectedPureAirlines(pureAirlines);
      } else {
        pureAirlines = selectedPureAirlines;
        pureAirlines.push({ name: value.name, connectingAirlines: false });
        setSelectedPureAirlines(pureAirlines);
      }
      if (
        (!pureAirlines || pureAirlines.length == 0) &&
        (!selectedAirlines || selectedAirlines.length == 0)
      ) {
        allFilteredFlights = flights;
      } else {
        let ff1 = [];

        selectedAirlines.forEach((air) => {
          let fFlights = flights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              (!x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) ||
                (x.trips.length > 1
                  ? !x.trips[1].listOfFlight
                      .map((f) => f.marketingCarrier)
                      .every((f) => f == x.trips[0].validatingCarrier.code)
                  : false))
          );
          if (
            fFlights &&
            fFlights.length > 0 &&
            selectedStops &&
            selectedStops.length > 0
          ) {
            fFlights = fFlights.filter((x) =>
              selectedStops.includes(x.departureStops)
            );
          }
          ff1.push(...fFlights);
        });

        pureAirlines.forEach((air) => {
          let fFlights = flights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) &&
              (x.trips.length > 1
                ? x.trips[1].listOfFlight
                    .map((f) => f.marketingCarrier)
                    .every((f) => f == x.trips[0].validatingCarrier.code)
                : true)
          );
          ff1.push(...fFlights);
        });
        allFilteredFlights = sortResults(ff1);
      }

      if (selectedStops && selectedStops.length > 0) {
        allFilteredFlights = allFilteredFlights.filter(
          (x) =>
            selectedStops.includes(x.departureStops) &&
            (!selectedStops.includes(0) ||
              selectedStops.includes(x.returnStops))
        );
      }

      allFilteredFlights = allFilteredFlights.filter(
        (x) =>
          x.totalPrice / totalPassengers >= priceFilterValues[0] &&
          x.totalPrice / totalPassengers <= priceFilterValues[1]
      );
      allFilteredFlights = allFilteredFlights.filter((x) =>
        isWithinTimeRange(
          formatTime(selectedTimeRange[0]),
          selectedTimeRange[1] == 24
            ? "11:59 PM"
            : formatTime(selectedTimeRange[1]),
          getFormattedTime(x.trips[0].listOfFlight[0].departureTime)
        )
      );
      if (
        allFilteredFlights.length > 0 &&
        allFilteredFlights[0].trips.length > 1
      )
        allFilteredFlights = allFilteredFlights.filter((x) =>
          isWithinTimeRange(
            formatTime(selectedReturnTimeRange[0]),
            selectedReturnTimeRange[1] == 24
              ? "11:59 PM"
              : formatTime(selectedReturnTimeRange[1]),
            getFormattedTime(x.trips[1].listOfFlight[0].departureTime)
          )
        );
    } else if (filterType == "airline") {
      if (selectedAirlines.findIndex((x) => x.name == value.name) > -1) {
        airlines = selectedAirlines.filter((x) => x.name != value.name);
        setSelectedAirlines(airlines);
      } else {
        airlines = selectedAirlines;
        airlines.push({ name: value.name, connectingAirlines: true });
        setSelectedAirlines(airlines);
      }

      if (
        (!airlines || airlines.length == 0) &&
        (!selectedPureAirlines || selectedPureAirlines.length == 0)
      ) {
        allFilteredFlights = flights;
      } else {
        let ff1 = [];
        airlines.forEach((air) => {
          let fFlights = flights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              (!x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) ||
                (x.trips.length > 1
                  ? !x.trips[1].listOfFlight
                      .map((f) => f.marketingCarrier)
                      .every((f) => f == x.trips[0].validatingCarrier.code)
                  : false))
          );
          ff1.push(...fFlights);
        });

        selectedPureAirlines.forEach((air) => {
          let fFlights = flights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) &&
              (x.trips.length > 1
                ? x.trips[1].listOfFlight
                    .map((f) => f.marketingCarrier)
                    .every((f) => f == x.trips[0].validatingCarrier.code)
                : true)
          );
          if (
            fFlights &&
            fFlights.length > 0 &&
            selectedStops &&
            selectedStops.length > 0
          ) {
            fFlights = fFlights.filter((x) =>
              selectedStops.includes(x.departureStops)
            );
          }
          ff1.push(...fFlights);
        });

        allFilteredFlights = sortResults(ff1);
      }

      if (selectedStops && selectedStops.length > 0) {
        allFilteredFlights = allFilteredFlights.filter(
          (x) =>
            selectedStops.includes(x.departureStops) &&
            (!selectedStops.includes(0) ||
              selectedStops.includes(x.returnStops))
        );
      }

      allFilteredFlights = allFilteredFlights.filter(
        (x) =>
          x.totalPrice / totalPassengers >= priceFilterValues[0] &&
          x.totalPrice / totalPassengers <= priceFilterValues[1]
      );
      allFilteredFlights = allFilteredFlights.filter((x) =>
        isWithinTimeRange(
          formatTime(selectedTimeRange[0]),
          selectedTimeRange[1] == 24
            ? "11:59 PM"
            : formatTime(selectedTimeRange[1]),
          getFormattedTime(x.trips[0].listOfFlight[0].departureTime)
        )
      );
      if (
        allFilteredFlights.length > 0 &&
        allFilteredFlights[0].trips.length > 1
      )
        allFilteredFlights = allFilteredFlights.filter((x) =>
          isWithinTimeRange(
            formatTime(selectedReturnTimeRange[0]),
            selectedReturnTimeRange[1] == 24
              ? "11:59 PM"
              : formatTime(selectedReturnTimeRange[1]),
            getFormattedTime(x.trips[1].listOfFlight[0].departureTime)
          )
        );
    } else if (filterType == "depart-time") {
      allFilteredFlights = flights;
      if (
        (selectedAirlines && selectedAirlines.length > 0) ||
        (selectedPureAirlines && selectedPureAirlines.length > 0)
      ) {
        let ff = [];
        selectedAirlines.forEach((air) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              (!x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) ||
                (x.trips.length > 1
                  ? !x.trips[1].listOfFlight
                      .map((f) => f.marketingCarrier)
                      .every((f) => f == x.trips[0].validatingCarrier.code)
                  : false))
          );
          ff.push(...fFlights);
        });

        selectedPureAirlines.forEach((air) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) &&
              (x.trips.length > 1
                ? x.trips[1].listOfFlight
                    .map((f) => f.marketingCarrier)
                    .every((f) => f == x.trips[0].validatingCarrier.code)
                : true)
          );
          ff.push(...fFlights);
        });
        allFilteredFlights = ff;
      }

      if (selectedStops && selectedStops.length > 0) {
        allFilteredFlights = allFilteredFlights.filter(
          (x) =>
            selectedStops.includes(x.departureStops) &&
            (!selectedStops.includes(0) ||
              selectedStops.includes(x.returnStops))
        );
      }

      allFilteredFlights = allFilteredFlights.filter(
        (x) =>
          x.totalPrice / totalPassengers >= priceFilterValues[0] &&
          x.totalPrice / totalPassengers <= priceFilterValues[1]
      );
      if (
        allFilteredFlights.length > 0 &&
        allFilteredFlights[0].trips.length > 1
      )
        allFilteredFlights = allFilteredFlights.filter((x) =>
          isWithinTimeRange(
            formatTime(selectedReturnTimeRange[0]),
            selectedReturnTimeRange[1] == 24
              ? "11:59 PM"
              : formatTime(selectedReturnTimeRange[1]),
            getFormattedTime(x.trips[1].listOfFlight[0].departureTime)
          )
        );
      allFilteredFlights = allFilteredFlights.filter((x) =>
        isWithinTimeRange(
          formatTime(selectedTimeRange[0]),
          selectedTimeRange[1] == 24
            ? "11:59 PM"
            : formatTime(selectedTimeRange[1]),
          getFormattedTime(x.trips[0].listOfFlight[0].departureTime)
        )
      );
    } else if (filterType == "return-time") {
      allFilteredFlights = flights;
      if (
        (selectedAirlines && selectedAirlines.length > 0) ||
        (selectedPureAirlines && selectedPureAirlines.length > 0)
      ) {
        let ff = [];
        selectedAirlines.forEach((air) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              (!x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) ||
                (x.trips.length > 1
                  ? !x.trips[1].listOfFlight
                      .map((f) => f.marketingCarrier)
                      .every((f) => f == x.trips[0].validatingCarrier.code)
                  : false))
          );
          ff.push(...fFlights);
        });

        selectedPureAirlines.forEach((air) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].validatingCarrier.name == air.name &&
              x.trips[0].listOfFlight
                .map((f) => f.marketingCarrier)
                .every((f) => f == x.trips[0].validatingCarrier.code) &&
              (x.trips.length > 1
                ? x.trips[1].listOfFlight
                    .map((f) => f.marketingCarrier)
                    .every((f) => f == x.trips[0].validatingCarrier.code)
                : true)
          );
          ff.push(...fFlights);
        });
        allFilteredFlights = ff;
      }
      if (selectedStops && selectedStops.length > 0) {
        allFilteredFlights = allFilteredFlights.filter(
          (x) =>
            selectedStops.includes(x.departureStops) &&
            (!selectedStops.includes(0) ||
              selectedStops.includes(x.returnStops))
        );
      }

      allFilteredFlights = allFilteredFlights.filter(
        (x) =>
          x.totalPrice / totalPassengers >= priceFilterValues[0] &&
          x.totalPrice / totalPassengers <= priceFilterValues[1]
      );
      allFilteredFlights = allFilteredFlights.filter((x) =>
        isWithinTimeRange(
          formatTime(selectedTimeRange[0]),
          selectedTimeRange[1] == 24
            ? "11:59 PM"
            : formatTime(selectedTimeRange[1]),
          getFormattedTime(x.trips[0].listOfFlight[0].departureTime)
        )
      );
      if (
        allFilteredFlights.length > 0 &&
        allFilteredFlights[0].trips.length > 1
      )
        allFilteredFlights = allFilteredFlights.filter((x) =>
          isWithinTimeRange(
            formatTime(selectedReturnTimeRange[0]),
            selectedReturnTimeRange[1] == 24
              ? "11:59 PM"
              : formatTime(selectedReturnTimeRange[1]),
            getFormattedTime(x.trips[1].listOfFlight[0].departureTime)
          )
        );
    }

    setFilteredFlights(allFilteredFlights);

    setFilters(
      allFilteredFlights,
      filterType,
      airlines,
      pureAirlines,
      selectedStops
    );
  };

  const sortResults = (results) => {
    if (defaultSortOption.value == 1) {
      return results.sort(function (a, b) {
        return a.totalPrice - b.totalPrice;
      });
    } else if (defaultSortOption.value == 2) {
      return results.sort(function (a, b) {
        return b.totalPrice - a.totalPrice;
      });
    } else if (defaultSortOption.value == 3) {
      return results.sort(function (a, b) {
        return a.trips[0].totalTripTime - b.trips[0].totalTripTime;
      });
    } else if (defaultSortOption.value == 4) {
      return results.sort(function (a, b) {
        return b.trips[0].totalTripTime - a.trips[0].totalTripTime;
      });
    }
  };

  const modifySearch = async (data, searchSubmited = false) => {
    clearFilters();
    setFlightsData([]);
    setIsLoading(true);
    // if (data?.segments[0]?.fromCountry == "India") {
      if (data) {
      const res = await searchFlights(data);
      var amadeusResult = res;
      var sortedResults = amadeusResult.sort(function (a, b) {
        return a.totalPrice - b.totalPrice;
      });
      refreshData(sortedResults, data);
      setIsLoading(false);
    } else {
      refreshData([], data);
      setIsLoading(false);
    }
  };

  const refreshData = (res, data) => {
    var travelDate = new Date(data.segments[0].departureDate);
    var prevdate = new Date(travelDate);
    var nextdate = new Date(travelDate);
    prevdate.setDate(prevdate.getDate() - 3); // minus the date
    nextdate.setDate(nextdate.getDate() + 3); // minus the date

    var departureDates = [];
    var returnDates = [];
    for (var d = prevdate; d <= nextdate; d.setDate(d.getDate() + 1)) {
      departureDates.push(new Date(d));
    }

    if (data.segments.length > 1) {
      travelDate = new Date(data.segments[1].departureDate);
      prevdate = new Date(travelDate);
      nextdate = new Date(travelDate);
      prevdate.setDate(prevdate.getDate() - 3); // minus the date
      nextdate.setDate(nextdate.getDate() + 3); // minus the date

      for (var d = prevdate; d <= nextdate; d.setDate(d.getDate() + 1)) {
        returnDates.push(new Date(d));
      }
    }


    if (typeof res == "object") {
      let sortedResults = sortResults(res);

      setFlightsData(sortedResults);
      setFilteredFlights(sortedResults);
      let totalPassengers = 0;
      sortedResults[0]?.fareDetails.forEach((fare) => {
        if (fare.totalFareAmount > 0) {
          totalPassengers += fare.noofPax;
        }
      });
      setTotalPassengers(totalPassengers);
      setPriceFilterRange([
        Math.min(
          ...sortedResults.map((flight) =>
            (flight.totalPrice / totalPassengers).toFixed(2)
          )
        ),
        Math.max(
          ...sortedResults.map((flight) =>
            (flight.totalPrice / totalPassengers).toFixed(2)
          )
        ),
      ]);
      setPriceFilterValues([
        Math.min(
          ...sortedResults.map((flight) =>
            (flight.totalPrice / totalPassengers).toFixed(2)
          )
        ),
        Math.max(
          ...sortedResults.map((flight) =>
            (flight.totalPrice / totalPassengers).toFixed(2)
          )
        ),
      ]);
      setFilters(sortedResults, "modifySearch");
    } else {
      setFlightsData([]);
      setFilteredFlights([]);
      setPriceFilterValues([0, 100]);
    }

    let currentStoredFilters = localStorage.getItem("currentSelectedFilters");
    if (!!currentStoredFilters)
      setCurrentFilters(JSON.parse(currentStoredFilters));
  };

  const formatTime = (time) => {
    // const hour = time;
    // const period = (time < 12 || time == 24) ? 'AM' : 'PM';
    return `${time}:00`;
  };

  const closeMobileFilter = () => {
    if (document.body.classList.contains("modify-form-wrp-open"))
      document.body.classList.remove("modify-form-wrp-open");

    let currentStoredFilters = localStorage.getItem("currentSelectedFilters");
    if (!!currentStoredFilters)
      setCurrentFilters(JSON.parse(currentStoredFilters));
  };

  const isWithinTimeRange = (minTime, maxTime, departTime) => {
    return (
      Date.parse("01/01/2011 " + departTime) >=
        Date.parse("01/01/2011 " + minTime) &&
      Date.parse("01/01/2011 " + departTime) <=
        Date.parse("01/01/2011 " + maxTime)
    );
  };

  const checkPriceChangeInKiwi = async (flight) => {
    if (flight?.gdsName != GDSNames.Kiwi) {
      return flight;
    }

    //remove circular dependency for the oject nonStopFlights
    flight.trips[0].validatingCarrier.nonStopFlights = [];
    flight.trips[0].validatingCarrier.oneStopFlights = [];
    flight.trips[0].validatingCarrier.multipleStopFlights = [];
    if (flight.trips.length > 1) {
      flight.trips[1].validatingCarrier.nonStopFlights = [];
      flight.trips[1].validatingCarrier.oneStopFlights = [];
      flight.trips[1].validatingCarrier.multipleStopFlights = [];
    }

    let dataToSend = {
      contract: flight,
      resultIndex: flight.resultIndex,
      traceId: flight.traceId,
      bookingToken: flight.bookingToken,
      userUniqueId: flight.userUniqueId,
      portalId: 107,
    };

    if (!showContentLoader) {
      setShowContentLoader(true);
    }

    let res = await bookKiwiFlight(dataToSend);

    if (!res.sessionId) {
      let retry = confirm(res);

      while (retry) {
        checkPriceChangeInKiwi(flight);
      }
    }

    setShowContentLoader(false);

    if (!res.isPriceChanged && res.isBookingError) {
      alert(res.error);

      setOpenNewPriceModal(false);

      return null;
    }

    flight.sessionId = res.sessionId;
    flight.nationalities = res.nationalities;
    flight.carryOnBaggage = res.carryOnBaggage;
    flight.checkedBaggage = res.checkedBaggage;
    flight.includedBaggage = res.includedBaggage;
    flight.isTravelDocumentRequired = res.isTravelDocumentRequired;
    flight.fareDetails = res.contract.fareDetails;

    if (res.isPriceChanged) {
      setNewPrice(res.newPrice);

      setOpenNewPriceModal(true);

      return null;
    }

    flight.totalPrice = res.contract.totalPrice;

    return flight;
  };

  const gotoCheckoutPage = (flight) => {
    const parm = new URLSearchParams(window.location.search);

    let parms = "?amt=" + flight.totalPrice;

    let encodedParams = encodeData(parms);

    localStorage.setItem("currentSearchId", parm.get("s"));

    if (flight.gdsName == GDSNames.Tbo.toString()) {
      localStorage.setItem("departFlight", JSON.stringify(flight));
      window.location.href =
        "/book-flight/?token=" + encodedParams.replace("+", "-");
    } else
      window.location.href =
        "/checkout/?token=" + encodedParams.replace("+", "-");
  };

  useEffect(() => {
    let flights = [...filteredFlights];
    let res = sortResults(flights);
    setFilteredFlights(res);
  }, [defaultSortOption]);

  useEffect(() => {
    if (showContentLoader) document.body.classList.add("filter-load");
    else {
      document.body.classList.remove("filter-load");
    }
  }, [showContentLoader]);

  useEffect(() => {
    document.body.classList.add("listing-page");
    return () => {
      if (document.body.classList.contains("listing-page"))
        document.body.classList.remove("listing-page");
    };
  }, []);

  useEffect(() => {
    if (flights && flights.length > 0) {
      const header = document.getElementById("filterBySection");
      const sticky = header.offsetTop;
      const scrollCallBack = window.addEventListener("scroll", () => {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
      };
    }
  }, [flights]);

  return (
    <>
      <InnerHeader></InnerHeader>
      {currentFilters &&
        !isLoading &&
        currentFilters.segments &&
        currentFilters.segments.length > 0 && (
          <div className="modify-aiport-breadcrumb bg-grey pt-2 pb-2 border-bottom desk-hide d-lg-none">
            {/* // (state.searchCriteria && JSON.parse(state.searchCriteria).segments && JSON.parse(state.searchCriteria).segments.length > 0)
          //   ? <div className='container'>
          //     <div className='row align-items-center'>
          //       <div className='col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5'>
          //         <div className='d-flex align-items-center'>
          //           <h6 className='mb-0 fw-bolder color-white'>{JSON.parse(state.searchCriteria).segments[0].fromCode}</h6>
          //           <i className="fa-solid fa-arrow-right-arrow-left color-white ms-2 me-2"></i>
          //           <h6 className='mb-0 color-white fw-bolder'>{JSON.parse(state.searchCriteria).segments[0].toCode}</h6>
          //         </div>
          //       </div>
          //       <div className='col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5 border-start color-white'>
          //         <span>{getFormattedDate4(JSON.parse(state.searchCriteria).segments[0].departureDate)} {JSON.parse(state.searchCriteria).segments.length > 1 && "- " + getFormattedDate4(JSON.parse(state.searchCriteria).segments[1]?.departureDate)}</span>
          //         <span>{JSON.parse(state.searchCriteria).noOfAdult} {JSON.parse(state.searchCriteria).noOfAdult > 1 ? 'Adults' : 'Adult'} {JSON.parse(state.searchCriteria).child > 0 && ", " + JSON.parse(state.searchCriteria).child + " Child"}{JSON.parse(state.searchCriteria).noOfLapInfant > 0 && ", " + JSON.parse(state.searchCriteria).noOfLapInfant + " Infants"}, {getDisplayCabin(parseInt(JSON.parse(state.searchCriteria).cabin))}</span>
          //         <span>{JSON.parse(state.searchCriteria).tripType == 2 ? "Round Trip" : "One Way"}</span>
          //       </div>
          //       <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'>
          //         <i className="fa-regular fa-pen-to-square float-end h4 mb-0 color-white" onClick={() => setMobSideFilterClicked(!mobSideFilterClicked)}></i>
          //       </div>
          //     </div>
          //   </div>
          //   : ((!isLoading && flights.length > 0) || (isLoading == false && flights.length == 0)) && */}
            <div className="container">
              <div className="row align-items-center">
                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                  <div className="d-flex align-items-center">
                    {currentFilters &&
                      currentFilters.segments &&
                      currentFilters.segments.length > 0 && (
                        <>
                          <h6 className="mb-0 fw-bolder">
                            {currentFilters.segments[0].fromCode}
                          </h6>
                          {currentFilters.segments.length > 1 ? (
                            <i className="fa-solid fa-arrow-right-arrow-left ms-2 me-2"></i>
                          ) : (
                            <i className="fa-solid fa-arrow-right ms-2 me-2"></i>
                          )}

                          <h6 className="mb-0 fw-bolder">
                            {currentFilters.segments[0].toCode}
                          </h6>
                        </>
                      )}
                  </div>
                </div>
                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5 border-start">
                  <span>
                    {currentFilters &&
                      currentFilters.segments &&
                      currentFilters.segments.length > 0 &&
                      getFormattedDate4(
                        currentFilters.segments[0].departureDate
                      )}
                    {currentFilters &&
                      currentFilters.segments &&
                      currentFilters.segments.length > 1 &&
                      "- " +
                        getFormattedDate4(
                          currentFilters?.segments[1]?.departureDate
                        )}
                  </span>
                  {currentFilters && (
                    <>
                      <span>
                        {currentFilters.noOfAdult} Adult(s){" "}
                        {currentFilters.child > 0 &&
                          ", " + currentFilters.child + " Child"}{" "}
                        {currentFilters.noOfLapInfant > 0 &&
                          ", " + currentFilters.noOfLapInfant + " Infants"}{" "}
                        , {getDisplayCabin(parseInt(currentFilters.cabin))}
                      </span>
                      <span>
                        {" "}
                        {currentFilters.tripType == 2
                          ? "Round Trip"
                          : "One Way"}
                      </span>
                    </>
                  )}
                </div>
                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                  <i
                    className="fa-regular fa-pen-to-square float-end h4 mb-0"
                    onClick={() =>
                      setMobSideFilterClicked(!mobSideFilterClicked)
                    }
                  ></i>
                </div>
              </div>
            </div>
          </div>
        )}

      <div
        className={
          mobSideFilterClicked ? "modify-searchh active" : "modify-searchh"
        }
      >
        <Topsearch
          modifySearch={modifySearch}
          closeMobFilter={closeMobileFilter}
          isFlightsLoading={isLoading}
          closeModifySearch={setMobSideFilterClicked}
          setTripType={setTripType}
          setFromDate={setFromDate}
          setToDate={setToDate}
          setNoOfPassengers={setNoOfPassengers}
          setFromCode={setFromCode}
          setToCode={setToCode}
          setFromLabel={setFromLabel}
          setFromCity={setFromCity}
          setToCity={setToCity}
          setToLabel={setToLabel}
          currentPage="listing"
          noOfPassengers={noOfPassengers}
        />
      </div>
      {flights && flights.length > 0 && !isLoading && (
        <div className="flight-results bg-grey mb-0" id="totalPriceStrip">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3 col-xxl-3">
                <div className="sidebar-filter-btn mt-4 desk-hide">
                  <h4
                    id="filterBySection"
                    className="filter-sub-heading d-flex mb-0 align-items-center bg-white ps-2 pt-2 pe-2 pb-2 justify-content-center cursor-pointer"
                    onClick={() => {
                      document.body.classList.add("filter-open");
                      setOpenFilters(true);
                    }}
                  >
                    <span className="icon me-2">
                      <span>
                        <Image
                          className=""
                          loader={trvLoader}
                          src="icon/filter-icon.svg"
                          alt="filter icon"
                          width={15}
                          height={15}
                        />
                      </span>
                    </span>
                    <span className="sub-heading-title dgc">Filter By</span>
                  </h4>
                </div>
                <div
                  className={
                    openFilters
                      ? "side-bar-air-filter br-5 mt-3 mb-4 active"
                      : "side-bar-air-filter br-5 mt-3 mb-4"
                  }
                >
                  <div className="filter-items py-3 ps-3 pe-3 desk-hide">
                    <h4 className="filter-sub-heading d-flex mb-0 align-items-center justify-content-between">
                      <span className="sub-heading-title dgc">Filter By</span>
                      <button
                        className="transparent-btn sidebar-filter-close-btn"
                        onClick={() => {
                          setOpenFilters(false);
                          document.body.classList.remove("filter-open");
                        }}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </h4>
                  </div>

                  <div className="filter-items py-2 ps-3 pe-3 mob-hide">
                    <div className="row align-items-center mb-2 mt-2">
                      <div className="col-6 col-sm-6 col-md-8 col-lg-7 col-xl-7 col-xxl-7 pe-0">
                        <h4 className="filter-sub-heading d-flex mb-0 align-items-center">
                          <span className="icon me-2">
                            <span>
                              <Image
                                className=""
                                loader={trvLoader}
                                src="icon/filter-icon.svg"
                                alt="filter icon"
                                width={15}
                                height={15}
                              />
                            </span>
                          </span>
                          <span className="sub-heading-title dgc">
                            Filter By
                          </span>
                        </h4>
                      </div>
                      <div className="col-6 col-sm-6 col-md-4 col-lg-5 col-xl-5 col-xxl-5">
                        <button
                          className="transparent-btn float-end clear-filter-btn"
                          onClick={() => clearFilters()}
                        >
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="filter-wrp-box pt-2">
                    <div className="filter-wrp-bo border-0 pt-0 pb-0">
                      <div className="filter-wrp-box">
                        <div className="filter-items pt-3 pb-3 ps-3 pe-3">
                          <div className="row align-items-center mb-2">
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                              <h5 className="sub-title mb-0 dgc">Stops</h5>
                            </div>
                          </div>

                          {stopsFilters.map((stop, index) => {
                            return (
                              <div
                                className="form-check cursor-pointer"
                                key={index}
                                onClick={() => {
                                  applyFilters("stops", stop);
                                }}
                              >
                                <input
                                  className="form-check-input cursor-pointer"
                                  type="checkbox"
                                  value={stop}
                                  checked={selectedStops.indexOf(stop) > -1}
                                  readOnly
                                />
                                <label className="form-check-label cursor-pointer dgc">
                                  {stop == 0
                                    ? "Non Stop"
                                    : stop + (stop == 1 ? " Stop" : " Stops")}
                                </label>
                              </div>
                            );
                          })}
                        </div>

                        <div className="filter-items py-3 ps-3 pe-3">
                          <h5 className="sub-title mb-0 dgc">Price</h5>
                          <div className="price-slider pt-3">
                            <ReactSlider
                              className="horizontal-slider"
                              thumbClassName="example-thumb"
                              trackClassName="example-track"
                              min={priceFilterRange[0]}
                              max={priceFilterRange[1]}
                              value={priceFilterValues}
                              minDistance={1}
                              step={1}
                              onChange={(e) => {
                                setPriceFilterValues(e);
                              }}
                              onAfterChange={(e) => {
                                applyFilters("price", e);
                              }}
                            />
                            <div className="row mt-3">
                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <h6 className="mb-0 d-table">
                                  {
                                    aedNumberFormat(
                                      Math.round(priceFilterValues[0])
                                    ).split(".")[0]
                                  }
                                </h6>
                              </div>
                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-end">
                                <h6 className="mb-0 d-table float-end">
                                  {
                                    aedNumberFormat(
                                      Math.round(priceFilterValues[1])
                                    ).split(".")[0]
                                  }
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="filter-items py-3 ps-3 pe-3">
                          <h5 className="sub-title mb-0 dgc">
                            Departure Duration
                          </h5>
                          <div className="price-slider pt-3">
                            <ReactSlider
                              className="horizontal-slider"
                              thumbClassName="example-thumb"
                              trackClassName="example-track"
                              min={0}
                              max={24}
                              value={selectedTimeRange}
                              onChange={(e) => setSelectedTimeRange(e)}
                              onAfterChange={(e) => {
                                applyFilters("depart-time", e);
                              }}
                              step={1}
                              minDistance={1}
                            />
                            <div className="row mt-3">
                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <h6 className="mb-0 d-table">
                                  {formatTime(selectedTimeRange[0])}
                                </h6>
                              </div>
                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-end">
                                <h6 className="mb-0 d-table float-end">
                                  {selectedTimeRange[1] == 24
                                    ? "23:59"
                                    : formatTime(selectedTimeRange[1])}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        {currentFilters &&
                          currentFilters.segments &&
                          currentFilters.segments.length > 1 && (
                            <div className="filter-items py-3 ps-3 pe-3">
                              <h5 className="sub-title mb-0 dgc">
                                Return Duration
                              </h5>
                              <div className="price-slider pt-3">
                                <ReactSlider
                                  className="horizontal-slider"
                                  thumbClassName="example-thumb"
                                  trackClassName="example-track"
                                  min={0}
                                  max={24}
                                  value={selectedReturnTimeRange}
                                  onChange={(e) =>
                                    setSelectedReturnTimeRange(e)
                                  }
                                  onAfterChange={(e) => {
                                    applyFilters("return-time", e);
                                  }}
                                  step={1}
                                  minDistance={1}
                                />
                                <div className="row mt-3">
                                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <h6 className="mb-0 d-table">
                                      {formatTime(selectedReturnTimeRange[0])}
                                    </h6>
                                  </div>
                                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-end">
                                    <h6 className="mb-0 d-table float-end">
                                      {selectedReturnTimeRange[1] == 24
                                        ? "23:59"
                                        : formatTime(
                                            selectedReturnTimeRange[1]
                                          )}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        <div className="filter-items pt-3 pb-3 ps-3 pe-3">
                          <h5 className="sub-title mb-2 dgc">Sort By</h5>
                          <div className="form-check">
                            {sortByOptions.map((option, ix) => {
                              return (
                                <div
                                  key={ix}
                                  onClick={() => {
                                    setDefaultSortOption(
                                      sortByOptions.find(
                                        (x) => x.value == parseInt(option.value)
                                      )
                                    );
                                  }}
                                >
                                  <input
                                    className="form-check-input cursor-pointer"
                                    type="radio"
                                    name="group1"
                                    value={option.value}
                                    checked={
                                      option.value == defaultSortOption.value
                                        ? true
                                        : false
                                    }
                                    readOnly
                                  />
                                  <label className="form-check-label cursor-pointer dgc">
                                    {option.label}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {pureValidatingCarriers &&
                          pureValidatingCarriers.length > 0 && (
                            <div className="filter-items pt-3 pb-3 ps-3 pe-3">
                              <h5 className="sub-title mb-2 dgc">Airlines</h5>
                              <div className="form-check">
                                {pureValidatingCarriers.map((carrier, ix) => {
                                  return (
                                    <div
                                      key={ix}
                                      onClick={() => {
                                        applyFilters("pure-airline", carrier);
                                      }}
                                    >
                                      <input
                                        className="form-check-input cursor-pointer"
                                        type="checkbox"
                                        checked={
                                          selectedPureAirlines.length > 0 &&
                                          selectedPureAirlines.find(
                                            (x) => x.name == carrier.name
                                          )
                                        }
                                        value={carrier.name}
                                        readOnly
                                      />
                                      <label className="form-check-label cursor-pointer dgc">
                                        {carrier.name}
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        {validatingCarriers &&
                          validatingCarriers.length > 0 && (
                            <div className="filter-items pt-3 pb-3 ps-3 pe-3 border-0">
                              <h5 className="sub-title mb-2 dgc">
                                Multiple Airlines
                              </h5>
                              <div className="form-check">
                                {validatingCarriers.map((carrier, ix) => {
                                  return (
                                    <div
                                      key={ix}
                                      onClick={() => {
                                        applyFilters("airline", carrier);
                                      }}
                                    >
                                      <input
                                        className="form-check-input cursor-pointer"
                                        type="checkbox"
                                        checked={
                                          selectedAirlines.length > 0 &&
                                          selectedAirlines.find(
                                            (x) => x.name == carrier.name
                                          )
                                        }
                                        value={carrier.name}
                                        readOnly
                                      />
                                      <label className="form-check-label cursor-pointer dgc">
                                        {carrier.name}
                                      </label>
                                      <Image
                                        className="multiple-airlines-logo ms-2"
                                        loader={trvLoader}
                                        src="icon/airplane-plus-icon.png"
                                        alt="airplane-plus-icon"
                                        width={22}
                                        height={20}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="filter-items pt-3 pb-0 border-0 d-lg-none fixed-bottom">
                        <div className="d-flex p-2">
                          <button
                            className="clear-filter btn-primary w-100 br-5 pt-2 pb-2 border-0 m-2"
                            onClick={() => {
                              setOpenFilters(false);
                              document.body.classList.remove("filter-open");
                              setShowContentLoader(true);
                              setTimeout(() => {
                                setShowContentLoader(false);
                              }, 1000);
                            }}
                          >
                            Apply Filters
                          </button>
                          <button
                            className="clear-filter btn-primary w-100 br-5 pt-2 pb-2 border-0 m-2 bg-orange"
                            onClick={() => {
                              setOpenFilters(false);
                              document.body.classList.remove("filter-open");
                              setShowContentLoader(true);
                              setTimeout(() => {
                                setShowContentLoader(false);
                              }, 1000);
                              clearFilters();
                            }}
                          >
                            Clear Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 col-xxl-9">
                <div className="air-listing-results matrixSlider pt-4 mb-4 position-relative matrix-slider">
                  <div className="row ">
                    {/* <div className="col-9 col-sm-9 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      {currentFilters && currentFilters.segments && currentFilters.segments.length > 0 && (
                        <div className="search-result-num">
                          <p className="mb-0 fw-bold">Showing {itemsCounter >= filteredFlights.length ? filteredFlights.length : itemsCounter} flights from {currentFilters.segments[0].fromCode} to {currentFilters.segments[0].toCode} out of {filteredFlights.length}</p>
                        </div>
                      )}
                    </div> */}
                    <div className="col-8">
                      {flights.length > 0 && (
                        <p className="fs-14 fw-bold mb-2">
                          {flights[0].trips[0].listOfFlight[0].airportFromCity}{" "}
                          to{" "}
                          {
                            flights[0].trips[0].listOfFlight[
                              flights[0].trips[0].listOfFlight.length - 1
                            ].airportToCity
                          }{" "}
                          flights Starting @ AED {flights[0].totalPrice}
                        </p>
                      )}
                    </div>
                    {/* <div className="col-12">
                      <OffersMatrix></OffersMatrix>
                    </div> */}
                  </div>
                  {/* {matrixAirlines && matrixAirlines.length > 0 && (
                    <div className="matrix-slider mt-0 mb-0">
                      <div className="row">
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-2 col-xxl-2 pe-0">
                          <div className="matrix-sidebar w-100 ">
                            <div className="matrix-sidebar-box w-100">
                              <h4 className="mb-0">Airline</h4>
                              {matrixAirlines.some(
                                (x) =>
                                  x.nonStopFlights &&
                                  x.nonStopFlights.length > 0
                              ) && (
                                <h6
                                  className={
                                    selectedMatrixStops.indexOf(0) > -1
                                      ? "cursor-pointer fw-bold border-top mb-0 pt-2 pb-2 active"
                                      : "cursor-pointer fw-bold border-top mb-0 pt-2 pb-2"
                                  }
                                  onClick={() => applyMatrixFilter("stops", 0)}
                                >
                                  Non Stop
                                </h6>
                              )}
                              {matrixAirlines.some(
                                (x) =>
                                  x.oneStopFlights &&
                                  x.oneStopFlights.length > 0
                              ) && (
                                <h6
                                  className={
                                    selectedMatrixStops.indexOf(1) > -1
                                      ? "cursor-pointer fw-bold border-top mb-0 pt-2 pb-2 active"
                                      : "cursor-pointer fw-bold border-top mb-0 pt-2 pb-2"
                                  }
                                  onClick={() => applyMatrixFilter("stops", 1)}
                                >
                                  1 Stop
                                </h6>
                              )}
                              {matrixAirlines.some(
                                (x) =>
                                  x.multipleStopFlights &&
                                  x.multipleStopFlights.length > 0
                              ) && (
                                <h6
                                  className={
                                    selectedMatrixStops.indexOf(2) > -1
                                      ? "cursor-pointer fw-bold border-top mb-0 pt-2 pb-2 active"
                                      : "cursor-pointer fw-bold border-top mb-0 pt-2 pb-2"
                                  }
                                  onClick={() => applyMatrixFilter("stops", 2)}
                                >
                                  2 Stops
                                </h6>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-10 col-xxl-10 ps-0 matrix-box">
                          {matrixAirlines && matrixAirlines.length > 0 && (
                            <Slider {...sliderSettings}>
                              {matrixAirlines.map((carrier, index) => {
                                if (
                                  carrier.nonStopFlights == 0 &&
                                  carrier.oneStopFlights == 0 &&
                                  carrier.multipleStopFlights == 0
                                )
                                  return false;
                                return (
                                  <div className="slider-items" key={index}>
                                    <div className="">
                                      <div
                                        className={
                                          selectedMatrixAirline.name ==
                                            carrier.name &&
                                          selectedMatrixAirline.connectingAirlines ==
                                            carrier.connectingAirlines
                                            ? "bg-white slider-main-item-box cursor-pointer active"
                                            : "bg-white slider-main-item-box cursor-pointer"
                                        }
                                      >
                                        <div
                                          className="slide-img"
                                          onClick={() => {
                                            applyMatrixFilter(
                                              "airline",
                                              carrier
                                            );
                                          }}
                                        >
                                          {carrier.connectingAirlines ==
                                            true && (
                                            <Image
                                              className="air-icon w-auto"
                                              loader={trvLoader}
                                              src="icon/airplane-plus-icon.png"
                                              alt="airplane-plus-icon"
                                              width={176}
                                              height={20}
                                            />
                                          )}
                                          <Image
                                            loader={airlineLogoLoader}
                                            src={
                                              "airline-logo/" +
                                              carrier.code +
                                              ".webp"
                                            }
                                            height="100"
                                            width="100"
                                            style={{ objectFit: "contain" }}
                                            quality={100}
                                            alt=""
                                          />
                                          <label>{carrier.name}</label>
                                        </div>
                                        <div className="slide-cont">
                                          {matrixAirlines.some(
                                            (x) =>
                                              x.nonStopFlights &&
                                              x.nonStopFlights.length > 0
                                          ) ? (
                                            carrier.nonStopFlights &&
                                            carrier.nonStopFlights.length >
                                              0 ? (
                                              <h6
                                                className={
                                                  selectedMatrixStops.indexOf(
                                                    0
                                                  ) > -1 ||
                                                  (selectedMatrixAirlineStop.name ==
                                                    carrier.name &&
                                                    selectedMatrixAirlineStop.connectingAirlines ==
                                                      carrier.connectingAirlines &&
                                                    selectedMatrixAirlineStop.stops ==
                                                      0)
                                                    ? "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2 active"
                                                    : "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2"
                                                }
                                                onClick={() => {
                                                  applyMatrixFilter(
                                                    "airline-stops",
                                                    carrier,
                                                    0
                                                  );
                                                }}
                                              >
                                                {
                                                  numberFormat(
                                                    Math.round(
                                                      carrier.nonStopFlights[0]
                                                        .totalPrice
                                                    ) / totalPassengers
                                                  ).split(".")[0]
                                                }
                                              </h6>
                                            ) : (
                                              <h6
                                                className={
                                                  selectedMatrixStops.indexOf(
                                                    0
                                                  ) > -1
                                                    ? "cursor-pointer fw-bold matrix-one-stop price border-top mb-0 pt-2 pb-2 active"
                                                    : "cursor-pointer fw-bold matrix-one-stop price border-top mb-0 pt-2 pb-2"
                                                }
                                              >
                                                --
                                              </h6>
                                            )
                                          ) : (
                                            <Fragment></Fragment>
                                          )}
                                          {matrixAirlines.some(
                                            (x) =>
                                              x.oneStopFlights &&
                                              x.oneStopFlights.length > 0
                                          ) ? (
                                            carrier.oneStopFlights &&
                                            carrier.oneStopFlights.length >
                                              0 ? (
                                              <h6
                                                className={
                                                  selectedMatrixStops.indexOf(
                                                    1
                                                  ) > -1 ||
                                                  (selectedMatrixAirlineStop.name ==
                                                    carrier.name &&
                                                    selectedMatrixAirlineStop.connectingAirlines ==
                                                      carrier.connectingAirlines &&
                                                    selectedMatrixAirlineStop.stops ==
                                                      1)
                                                    ? "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2 active"
                                                    : "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2"
                                                }
                                                onClick={() => {
                                                  applyMatrixFilter(
                                                    "airline-stops",
                                                    carrier,
                                                    1
                                                  );
                                                }}
                                              >
                                                {
                                                  numberFormat(
                                                    Math.round(
                                                      carrier.oneStopFlights[0]
                                                        .totalPrice
                                                    ) / totalPassengers
                                                  ).split(".")[0]
                                                }
                                              </h6>
                                            ) : (
                                              <h6
                                                className={
                                                  selectedMatrixStops.indexOf(
                                                    1
                                                  ) > -1
                                                    ? "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2 active"
                                                    : "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2"
                                                }
                                              >
                                                --
                                              </h6>
                                            )
                                          ) : (
                                            <Fragment></Fragment>
                                          )}
                                          {matrixAirlines.some(
                                            (x) =>
                                              x.multipleStopFlights &&
                                              x.multipleStopFlights.length > 0
                                          ) ? (
                                            carrier.multipleStopFlights &&
                                            carrier.multipleStopFlights.length >
                                              0 ? (
                                              <h6
                                                className={
                                                  selectedMatrixStops.indexOf(
                                                    2
                                                  ) > -1 ||
                                                  (selectedMatrixAirlineStop.name ==
                                                    carrier.name &&
                                                    selectedMatrixAirlineStop.connectingAirlines ==
                                                      carrier.connectingAirlines &&
                                                    selectedMatrixAirlineStop.stops >
                                                      1)
                                                    ? "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2 active"
                                                    : "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2"
                                                }
                                                onClick={() => {
                                                  applyMatrixFilter(
                                                    "airline-stops",
                                                    carrier,
                                                    2
                                                  );
                                                }}
                                              >
                                                {
                                                  numberFormat(
                                                    Math.round(
                                                      carrier
                                                        .multipleStopFlights[0]
                                                        .totalPrice
                                                    ) / totalPassengers
                                                  ).split(".")[0]
                                                }
                                              </h6>
                                            ) : (
                                              <h6
                                                className={
                                                  selectedMatrixStops.indexOf(
                                                    2
                                                  ) > -1
                                                    ? "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2 active"
                                                    : "cursor-pointer matrix-non-stop price border-top mb-0 pt-2 pb-2"
                                                }
                                              >
                                                --
                                              </h6>
                                            )
                                          ) : (
                                            <Fragment></Fragment>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </Slider>
                          )}
                        </div>
                      </div>
                    </div>
                  )} */}

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mt-0 note-bar br-5 ps-3 pt-3 pe-3 pb-3">
                        <p className="mb-0">
                          <strong>Note:</strong> * All the fares displayed are
                          for{" "}
                          {currentFilters &&
                          currentFilters.segments &&
                          currentFilters.segments.length > 1
                            ? "Round Trip"
                            : "One Way"}{" "}
                          and are in AED, inclusive of base fare, taxes and
                          service fees.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="air-flight-listing mt-1">
                    {/* {
                      (currentFilters && currentFilters.segments && currentFilters.segments.length > 1 && ((departTBOFlights && departTBOFlights.length > 0) || (returnTBOFlights && returnTBOFlights.length > 0))) &&
                      <div className='row'>
                        <div className='col-sm-12'>
                          <div className='list-type-button d-flex'>
                            <div className={!isCustomView ? 'list-type-button-item active d-flex align-items-center br-10 me-3 cursor-pointer' : 'list-type-button-item d-flex align-items-center br-10 me-3 cursor-pointer'} onClick={() => setIsCustomView(false)}>
                              <div className='icon'>
                                <span className='me-2'>
                                </span>
                              </div>
                              <div className='btn-text'>
                                <h5 className='mb-0'>Regular view <span>({numberFormat(6999).split('.')[0]})</span></h5>
                                <h6 className='mb-0'>Your predefined ticket</h6>
                              </div>
                            </div>
                            <div className={isCustomView ? 'list-type-button-item active d-flex align-items-center br-10 cursor-pointer' : 'list-type-button-item d-flex align-items-center br-10 cursor-pointer'} onClick={() => setIsCustomView(true)}>
                              <div className='icon'>
                                <span className='me-2'>
                                </span>
                              </div>
                              <div className='btn-text'>
                                <h5 className='mb-0'>Custom view <span>({numberFormat(departTBOFlights[0].totalPrice + returnTBOFlights[0].totalPrice).split('.')[0]})</span></h5>
                                <h6 className='mb-0'>Build your own ticket</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    } */}

                    {/* {
                      flights.slice(0, 1).map((flight, flightIndex) => {
                        let flightPrice = Math.round(flight.totalPrice);
                        let totalPassangers = 0;
                        let totalPax = 0
                        flight.fareDetails.forEach((fare) => {
                          totalPax += fare.noofPax;
                          if (fare.totalFareAmount > 0) {
                            totalPassangers += fare.noofPax
                          }
                        })
                        let avgPrice = Math.round(flightPrice / totalPassangers);
                        const thirtyPercentOffPrice = Math.round((avgPrice * 70) / 100);
                        const isIndiaUsaPage = ((currentFilters?.segments[0]?.fromCountry == "United States") && (currentFilters?.segments[0]?.toCountry == "India")) || ((currentFilters?.segments[0]?.toCountry == "United States") && (currentFilters?.segments[0]?.fromCountry == "India"));

                        return isIndiaUsaPage
                          ? flight.trips.length > 1
                            ? <div className='regular-round-trip listing-com' key={flightIndex}>
                              <div className='regular-flight-round-box mt-4 mb-4 border'>
                                <div className='row align-items-center'>
                                  <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-10 col-xxl-10 both-flight-box'>
                                    <div className='row align-items-center'>
                                      <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6'>
                                        <div className='row'>
                                          <div className='col-sm-12'>
                                            <h2 className='digination-sub-title mb-3 dgc'>Departure | {getFormattedDate4(flight.trips[0].listOfFlight[0].departeddate)}</h2>
                                          </div>
                                        </div>
                                        <div className='row align-items-center'>
                                          <div className='col-2 col-sm-2 col-md-3 col-lg-4 col-xl-4 col-xxl-3'>
                                            <div className='air-flight-logo text-start'>
                                              <span>Unpublished Airline</span>
                                            </div>
                                          </div>
                                          <div className='col-10 col-sm-10 col-md-9 col-lg-8 col-xl-8 col-xxl-9'>
                                            <div className='row align-items-center'>
                                              <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                <h4 className='airport-code mb-0 dgc'>
                                                  <span className='flight-plus-air'>
                                                    <span className='tooltip-box cursor-pointer'>{flight.trips[0].listOfFlight[0].fromCode}</span>
                                                    <span className='tooltip-hover-top left-banner-city'>
                                                      {flight.trips[0].listOfFlight[0].airportFromCity}
                                                    </span>
                                                  </span>
                                                </h4>
                                              </div>
                                              <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0'>
                                                <div className='from-to-from-digination'>
                                                  {
                                                    flight.trips[0].listOfFlight.length <= 3 &&
                                                    <h5 className='mb-0 text-center'>
                                                      {
                                                        flight.trips[0].listOfFlight.map((t, ix) => {
                                                          if (ix >= flight.trips[0].listOfFlight.length - 1)
                                                            return (<Fragment key={ix}></Fragment>)
                                                        })
                                                      }
                                                    </h5>
                                                  }
                                                  <h6 className='airport-code mb-0 text-center'>
                                                    <span className='flight-plus-air'>
                                                      <span className='tooltip-box cursor-pointer'>0 to 1 Stop</span>
                                                    </span>
                                                  </h6>
                                                </div>
                                              </div>
                                              <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                <h4 className='airport-code mb-0'>
                                                  <span className='flight-plus-air'>
                                                    <span className='tooltip-box cursor-pointer'>{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode}</span>
                                                    <span className='tooltip-hover-top right-banner-city'>
                                                      {flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].airportToCity}
                                                    </span>
                                                  </span>
                                                </h4>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 flight-round-box'>
                                        <div className='row'>
                                          <div className='col-sm-12'>
                                            <h2 className='digination-sub-title mb-3 dgc'>Return | {getFormattedDate4(flight.trips[1].listOfFlight[0].departeddate)}</h2>
                                          </div>
                                        </div>
                                        <div className='row align-items-center'>
                                          <div className='col-2 col-sm-2 col-md-3 col-lg-4 col-xl-4 col-xxl-3'>
                                            <div className='air-flight-logo text-start'>
                                              <span>Unpublished Airline</span>
                                            </div>
                                          </div>
                                          <div className='col-10 col-sm-10 col-md-9 col-lg-8 col-xl-8 col-xxl-9'>
                                            <div className='row align-items-center'>
                                              <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                <h4 className='airport-code mb-0'>
                                                  <span className='flight-plus-air'>
                                                    <span className='tooltip-box cursor-pointer'>{flight.trips[1].listOfFlight[0].fromCode}</span>
                                                    <span className='tooltip-hover-top left-banner-city'>
                                                      {flight.trips[1].listOfFlight[0].airportFromCity}
                                                    </span>
                                                  </span>
                                                </h4>
                                              </div>
                                              <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0'>
                                                <div className='from-to-from-digination'>
                                                  {
                                                    flight.trips[1].listOfFlight.length <= 3 &&
                                                    <h5 className='mb-0 text-center'>
                                                      {
                                                        flight.trips[1].listOfFlight.map((t, ix) => {
                                                          if (ix >= flight.trips[1].listOfFlight.length - 1)
                                                            return (<Fragment key={ix}></Fragment>)
                                                        })
                                                      }
                                                    </h5>
                                                  }
                                                  <h6 className='airport-code mb-0 text-center'>
                                                    <span className='flight-plus-air'>
                                                      <span className='tooltip-box cursor-pointer'>0 to 1 Stop</span>
                                                    </span>
                                                  </h6>
                                                </div>
                                              </div>
                                              <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                <h4 className='airport-code mb-0'>
                                                  <span className='flight-plus-air'>
                                                    <span className='tooltip-box cursor-pointer'>{flight.trips[1].listOfFlight[flight.trips[1].listOfFlight.length - 1].toCode}</span>
                                                    <span className='tooltip-hover-top right-banner-city'>
                                                      {flight.trips[1].listOfFlight[flight.trips[1].listOfFlight.length - 1].airportToCity}
                                                    </span>
                                                  </span>
                                                </h4>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-2 col-xxl-2 ps-0'>
                                    <div className='air-flight-price text-end'>
                                      <h2 className='mb-0 dgc'><span className="d-inline-block w-100 text-end pb-2 text-decoration-line-through">{numberFormat(avgPrice).split(".")[0]}</span> {numberFormat(thirtyPercentOffPrice).split(".")[0]}</h2>
                                      <h6 className='mb-2 mt-2'>{totalPassangers > 1 ? "Round Trip Per Traveler" : "Round Trip Per Adult"}</h6>
                                      <a className="btn-style1 float-end call-btn border-0 text-center active" href="tel:+1-844-659-0101"
                                        onClick={async () => {
                                          await trackMixpanelEvent("India_Call_Listing");
                                        }}
                                      >Call Now</a>
                                    </div>
                                  </div>
                                </div>
                                <div className='air-flight-btn-and-bag mt-3 pt-2'>
                                  <div className='row align-items-center'>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                                      <div className='special-offer-red-img w-100 text-center'>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            : <div className='regular-one-trip listing-com' key={flightIndex}>
                              <div className='regular-flight-round-box mt-4 mb- pb-2 border'>
                                <div className='row align-items-center'>
                                  <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 both-flight-box'>
                                    <div className='row align-items-center'>
                                      <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                                        <div className='row'>
                                          <div className='col-sm-12'>
                                            <h2 className='digination-sub-title mb-3 dgc'>Departure | {getFormattedDate4(flight.trips[0].listOfFlight[0].departeddate)}</h2>
                                          </div>
                                        </div>
                                        <div className='row align-items-center'>
                                          <div className='col-2 col-sm-2 col-md-3 col-lg-4 col-xl-3 col-xxl-3'>
                                            <div className='air-flight-logo text-start'>
                                              <span>Unpublished Airline</span>
                                            </div>
                                          </div>
                                          <div className='col-10 col-sm-10 col-md-9 col-lg-8 col-xl-9 col-xxl-9 pe-0 ps-0'>
                                            <div className='row align-items-center'>
                                              <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                <h4 className='airport-code mb-0'>
                                                  <span className='tooltip-box cursor-pointer'>{flight.trips[0].listOfFlight[0].fromCode}</span>
                                                </h4>
                                                <h6 className='flight-time mb-0'>
                                                  <span>{flight.trips[0].listOfFlight[0].airportFromCity}</span>
                                                  <span className='flight-plus-air'>
                                                  </span>
                                                </h6>
                                              </div>
                                              <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0'>
                                                <div className='from-to-from-digination'>
                                                  {
                                                    flight.trips[0].listOfFlight.length <= 3 &&
                                                    <h5 className='mb-0 text-center'>
                                                      {
                                                        flight.trips[0].listOfFlight.map((t, ix) => {
                                                          if (ix >= flight.trips[0].listOfFlight.length - 1)
                                                            return (<Fragment key={ix}></Fragment>)
                                                        })
                                                      }
                                                    </h5>
                                                  }
                                                  <h6 className='airport-code mb-0 text-center'>
                                                    <span className='flight-plus-air'>
                                                      <span className='tooltip-box cursor-pointer'>0 to 1 Stop</span>
                                                    </span>
                                                  </h6>
                                                </div>
                                              </div>
                                              <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                <h4 className='airport-code mb-0 dgc'>
                                                  <span className='tooltip-box cursor-pointer'>{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode}</span>
                                                </h4>
                                                <h6 className='flight-time mb-0'>
                                                  <span>{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].airportToCity}</span>
                                                </h6>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 ps-0'>
                                    <div className='air-flight-price text-end'>
                                      <h2 className='mb-0 dgc'><span className="text-decoration-line-through ">{numberFormat(avgPrice).split(".")[0]}</span> {numberFormat(thirtyPercentOffPrice).split(".")[0]}</h2>
                                      <h6 className='mb-2 mt-2'>{totalPassangers > 1 ? "Avg. Price Per Traveler" : "Per Adult"}</h6>
                                      <a className="btn-style1 float-end call-btn border-0 text-center active" href="tel:+1-844-659-0101"
                                        onClick={async () => {
                                          await trackMixpanelEvent("India_Call_Listing");
                                        }}
                                      >Call Now</a>
                                    </div>
                                  </div>
                                </div>
                                <div className='air-flight-btn-and-bag mt-3 pt-2'>
                                  <div className='row align-items-center'>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                                      <div className='special-offer-red-img w-100 text-center'>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          : <Fragment></Fragment>
                      })
                    } */}

                    {/* {(currentFilters.segments[0].fromCountry != "India" ||
                      currentFilters.segments[0].toCountry != "India" ||
                      (currentFilters.segments[0].fromCountry == "India" &&
                        currentFilters.segments[0].toCountry == "India" &&
                        currentFilters.segments.length == 1)) && */}
                          {(currentFilters.segments[0].fromCountry  ||
                      currentFilters.segments[0].toCountry  ||
                      (currentFilters.segments[0].fromCountry  &&
                        currentFilters.segments[0].toCountry  &&
                        currentFilters.segments.length == 1)) &&
                      filteredFlights
                        .slice(0, itemsCounter)
                        .map((flight, flightIndex) => {
                          let deptDate = new Date(
                            flight.trips[0].listOfFlight[0].departeddate
                          );
                          let arrDate = new Date(
                            flight.trips[0].listOfFlight[
                              flight.trips[0].listOfFlight.length - 1
                            ].arrivalAt
                          );
                          let difference =
                            arrDate.getTime() - deptDate.getTime();
                          let departDays = Math.ceil(
                            difference / (1000 * 3600 * 24)
                          );
                          let returnTotalDays = 0;
                          let hasDeptMultipleAirlines =
                            !flight.trips[0].listOfFlight
                              .map((x) => x.marketingCarrier)
                              .every(
                                (x) =>
                                  x == flight.trips[0].validatingCarrier.code
                              );
                          let hasReturnMultipleAirlines = false;
                          let layoverCounter = 0;
                          let returnLayoverCounter = 0;

                          if (flight.trips.length > 1) {
                            hasReturnMultipleAirlines =
                              !flight.trips[1].listOfFlight
                                .map((x) => x.marketingCarrier)
                                .every(
                                  (x) =>
                                    x == flight.trips[1].validatingCarrier.code
                                );
                            let returnDepartedDate = new Date(
                              flight.trips[1].listOfFlight[0].departeddate
                            );
                            let returnArrivalDate = new Date(
                              flight.trips[1].listOfFlight[
                                flight.trips[1].listOfFlight.length - 1
                              ].arrivalAt
                            );
                            let returnDifference =
                              returnArrivalDate.getTime() -
                              returnDepartedDate.getTime();
                            returnTotalDays = Math.ceil(
                              returnDifference / (1000 * 3600 * 24)
                            );
                          }

                          let flightPrice = Math.round(flight.totalPrice);
                          let totalPassangers = 0;
                          let totalPax = 0;
                          flight.fareDetails.forEach((fare) => {
                            totalPax += fare.noofPax;
                            if (fare.totalFareAmount > 0) {
                              totalPassangers += fare.noofPax;
                            }
                          });
                          let avgPrice = Math.round(
                            flightPrice / totalPassangers
                          );
                          var displayOperatedBy = [
                            ...new Set(
                              flight.trips[0].listOfFlight
                                .filter(
                                  (x) =>
                                    x.airlineName != x.operatedBy &&
                                    !!x.operatedBy
                                )
                                .map((x) => x.operatedBy)
                            ),
                          ];
                          var displayRtrnOperatedBy = flight.trips.length >
                            1 && [
                            ...new Set(
                              flight.trips[1].listOfFlight
                                .filter(
                                  (x) =>
                                    x.airlineName != x.operatedBy &&
                                    !!x.operatedBy
                                )
                                .map((x) => x.operatedBy)
                            ),
                          ];
                          let showBaggageOptions = isPureAirline(flight);
                          let baggageOptions = null;
                          let isDomestic = isADomesticFlight(flight);
                          let isBaggageClassMatching =
                            flight.trips[0].listOfFlight[0].classOfService ==
                            "M";
                          if (showBaggageOptions && isBaggageClassMatching) {
                            baggageOptions = getDisplayAirline(
                              flight.trips[0].validatingCarrier.name,
                              isDomestic
                            );
                          }
                          // const isIndiaUsaPage = ((currentFilters?.segments[0]?.fromCountry == "United States") && (currentFilters?.segments[0]?.toCountry == "India")) || ((currentFilters?.segments[0]?.toCountry == "United States") && (currentFilters?.segments[0]?.fromCountry == "India"));

                          return (
                            <div
                              className="regular-flight-wrp"
                              key={flightIndex}
                            >
                              {/* {(flightIndex == 1) && (isIndiaUsaPage) &&
                            <div className="fm-offer-banner row position-relative mt-3 cursor-pointer">
                              <a href='tel:+1-844-659-0101' onClick={async () => {
                                await trackMixpanelEvent("UC_Listing_CallBanner");
                              }} >
                                <div className="banner-city-box position-absolute">
                                  <span>{flight.trips[0].listOfFlight[0]?.airportFromCity}</span> <br className="d-none d-lg-inline" /><span>to</span><br className="d-none d-lg-inline" /> <span>{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1]?.airportToCity}</span></div>
                              </a>
                            </div>
                          } */}
                              {currentFilters &&
                                currentFilters.segments &&
                                currentFilters.segments.length == 2 &&
                                flight &&
                                flight.trips &&
                                flight.trips.length > 1 && (
                                  <div className="regular-round-trip listing-com">
                                    <div className="regular-flight-round-box mt-4 mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-10 col-xxl-10 both-flight-box">
                                          <div className="color-white gds-code">
                                            {flight.gdsHiddenId}
                                          </div>
                                          <div className="row align-items-center">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
                                              <div className="row">
                                                <div className="col-sm-12">
                                                  <h2 className="digination-sub-title mb-3 dgc">
                                                    Departure |{" "}
                                                    {getFormattedDate4(
                                                      flight.trips[0]
                                                        .listOfFlight[0]
                                                        .departeddate
                                                    )}
                                                  </h2>
                                                </div>
                                              </div>
                                              <div className="row align-items-center">
                                                <div className="col-2 col-sm-2 col-md-3 col-lg-4 col-xl-4 col-xxl-3">
                                                  <div className="air-flight-logo text-start">
                                                    <Image
                                                      className="mb-1 h-auto"
                                                      loader={airlineLogoLoader}
                                                      src={
                                                        "airline-logo/" +
                                                        flight.trips[0]
                                                          .validatingCarrier
                                                          .code +
                                                        ".webp"
                                                      }
                                                      alt="airplane-plus-icon"
                                                      width={35}
                                                      height={43}
                                                    />
                                                    {hasDeptMultipleAirlines && (
                                                      <Image
                                                        className="air-icon w-auto"
                                                        loader={trvLoader}
                                                        src="icon/airplane-plus-icon.png"
                                                        alt="airplane-plus-icon"
                                                        width={176}
                                                        height={20}
                                                      />
                                                    )}
                                                    <span>
                                                      {
                                                        flight.trips[0]
                                                          .validatingCarrier
                                                          .name
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="col-10 col-sm-10 col-md-9 col-lg-8 col-xl-8 col-xxl-9">
                                                  <div className="row align-items-center">
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                      <h6 className="flight-time mb-0">
                                                        <span>
                                                          {getFormattedTime(
                                                            flight.trips[0]
                                                              .listOfFlight[0]
                                                              .departureTime
                                                          )}
                                                        </span>
                                                      </h6>
                                                      <h4 className="airport-code mb-0 dgc">
                                                        <span className="flight-plus-air">
                                                          <span className="tooltip-box cursor-pointer">
                                                            {
                                                              flight.trips[0]
                                                                .listOfFlight[0]
                                                                .fromCode
                                                            }
                                                          </span>
                                                          <span className="tooltip-hover-top">
                                                            {
                                                              flight.trips[0]
                                                                .listOfFlight[0]
                                                                .fromAirportName
                                                            }
                                                          </span>
                                                        </span>
                                                      </h4>
                                                    </div>
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0">
                                                      <div className="from-to-from-digination">
                                                        <h6 className="text-center mb-0">
                                                          {getDiffFromMinutes(
                                                            flight.trips[0]
                                                              .totalTripTime
                                                          )}
                                                        </h6>
                                                        {flight.trips[0]
                                                          .listOfFlight
                                                          .length <= 3 && (
                                                          <h5 className="mb-0 text-center">
                                                            {flight.trips[0].listOfFlight.map(
                                                              (t, ix) => {
                                                                if (
                                                                  ix >=
                                                                  flight
                                                                    .trips[0]
                                                                    .listOfFlight
                                                                    .length -
                                                                    1
                                                                )
                                                                  return (
                                                                    <Fragment
                                                                      key={ix}
                                                                    ></Fragment>
                                                                  );
                                                                return (
                                                                  <span
                                                                    key={ix}
                                                                  ></span>
                                                                );
                                                              }
                                                            )}
                                                          </h5>
                                                        )}
                                                        <h6 className="airport-code mb-0 text-center">
                                                          <span className="flight-plus-air">
                                                            <span className="tooltip-box cursor-pointer">
                                                              {flight.trips[0]
                                                                .listOfFlight
                                                                .length == 1
                                                                ? "Non-Stop"
                                                                : flight
                                                                    .trips[0]
                                                                    .listOfFlight
                                                                    .length -
                                                                  1 +
                                                                  (flight
                                                                    .trips[0]
                                                                    .listOfFlight
                                                                    .length == 2
                                                                    ? " Stop"
                                                                    : " Stops")}
                                                            </span>
                                                            <span className="tooltip-hover-top">
                                                              <ul className="flight-duration-ovelry p-0 m-0 text-start">
                                                                <li>
                                                                  <strong>
                                                                    Flight
                                                                    Duration:
                                                                  </strong>{" "}
                                                                  {getDiffFromMinutes(
                                                                    flight
                                                                      .trips[0]
                                                                      .totalTripTime
                                                                  )}
                                                                </li>
                                                                {flight.trips[0].listOfFlight.map(
                                                                  (tf, ix) => {
                                                                    if (
                                                                      !!tf.displayLayOverTime
                                                                    )
                                                                      layoverCounter += 1;
                                                                    return (
                                                                      <Fragment
                                                                        key={ix}
                                                                      >
                                                                        {!!tf.displayLayOverTime && (
                                                                          <li>
                                                                            <strong>
                                                                              Layover
                                                                              {
                                                                                layoverCounter
                                                                              }
                                                                              :
                                                                            </strong>{" "}
                                                                            {
                                                                              tf.displayLayOverTime
                                                                            }
                                                                            ,{" "}
                                                                            {
                                                                              tf.airportToCity
                                                                            }
                                                                          </li>
                                                                        )}
                                                                      </Fragment>
                                                                    );
                                                                  }
                                                                )}
                                                              </ul>
                                                            </span>
                                                          </span>
                                                        </h6>
                                                        {/* <h6 className='text-center mb-0'>{flight.trips[0].listOfFlight.length == 1 ? "Non-Stop" : (flight.trips[0].listOfFlight.length - 1 + (flight.trips[0].listOfFlight.length == 2 ? " Stop" : " Stops"))}</h6> */}
                                                      </div>
                                                    </div>
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                      <h6 className="flight-time mb-0 text-end">
                                                        <span>
                                                          {getFormattedTime(
                                                            flight.trips[0]
                                                              .listOfFlight[
                                                              flight.trips[0]
                                                                .listOfFlight
                                                                .length - 1
                                                            ].arrivalTime
                                                          )}
                                                        </span>
                                                        {departDays > 0 && (
                                                          <span className="flight-plus-air">
                                                            <span className="tooltip-box cursor-pointer color-red">
                                                              + {departDays}
                                                            </span>
                                                            <span className="tooltip-hover-top">
                                                              <strong>
                                                                Flight Arrival -
                                                              </strong>{" "}
                                                              {getFormattedDate(
                                                                flight.trips[0]
                                                                  .listOfFlight[
                                                                  flight
                                                                    .trips[0]
                                                                    .listOfFlight
                                                                    .length - 1
                                                                ].arrivalAt
                                                              )}
                                                            </span>
                                                          </span>
                                                        )}
                                                      </h6>
                                                      {/* <h4 className='airport-code mb-0 dgc'>{flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].toCode}</h4> */}
                                                      <h4 className="airport-code mb-0 dgc text-end">
                                                        <span className="flight-plus-air">
                                                          <span className="tooltip-box cursor-pointer">
                                                            {
                                                              flight.trips[0]
                                                                .listOfFlight[
                                                                flight.trips[0]
                                                                  .listOfFlight
                                                                  .length - 1
                                                              ].toCode
                                                            }
                                                          </span>
                                                          <span className="tooltip-hover-top">
                                                            {
                                                              flight.trips[0]
                                                                .listOfFlight[
                                                                flight.trips[0]
                                                                  .listOfFlight
                                                                  .length - 1
                                                              ].toAirportName
                                                            }
                                                          </span>
                                                        </span>
                                                      </h4>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {displayOperatedBy &&
                                                displayOperatedBy.length >
                                                  0 && (
                                                  <div className="row">
                                                    <div className="col-sm-12">
                                                      <h6 className="operated-by mb-0 mt-3">
                                                        Operated by:{" "}
                                                        {displayOperatedBy.join(
                                                          ", "
                                                        )}
                                                      </h6>
                                                    </div>
                                                  </div>
                                                )}
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 flight-round-box">
                                              <div className="row">
                                                <div className="col-sm-12">
                                                  <h2 className="digination-sub-title mb-3 dgc">
                                                    Return |{" "}
                                                    {getFormattedDate4(
                                                      flight.trips[1]
                                                        .listOfFlight[0]
                                                        .departeddate
                                                    )}
                                                  </h2>
                                                </div>
                                              </div>
                                              <div className="row align-items-center">
                                                <div className="col-2 col-sm-2 col-md-3 col-lg-4 col-xl-4 col-xxl-3">
                                                  <div className="air-flight-logo text-start">
                                                    <Image
                                                      className="mb-1 h-auto"
                                                      loader={airlineLogoLoader}
                                                      src={
                                                        "airline-logo/" +
                                                        flight.trips[1]
                                                          .validatingCarrier
                                                          .code +
                                                        ".webp"
                                                      }
                                                      alt="airplane-plus-icon"
                                                      width={35}
                                                      height={43}
                                                    />
                                                    {hasReturnMultipleAirlines && (
                                                      <Image
                                                        className="air-icon w-auto"
                                                        loader={trvLoader}
                                                        src="icon/airplane-plus-icon.png"
                                                        alt="airplane-plus-icon"
                                                        width={176}
                                                        height={20}
                                                      />
                                                    )}
                                                    <span>
                                                      {
                                                        flight.trips[1]
                                                          .validatingCarrier
                                                          .name
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="col-10 col-sm-10 col-md-9 col-lg-8 col-xl-8 col-xxl-9">
                                                  <div className="row align-items-center">
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                      <h6 className="flight-time mb-0">
                                                        <span>
                                                          {getFormattedTime(
                                                            flight.trips[1]
                                                              .listOfFlight[0]
                                                              .departureTime
                                                          )}
                                                        </span>
                                                        <span className="flight-plus-air"></span>
                                                      </h6>
                                                      {/* <h4 className='airport-code mb-0 dgc'>{flight.trips[1].listOfFlight[0].fromCode}</h4> */}
                                                      <h4 className="airport-code mb-0 dgc">
                                                        <span className="flight-plus-air">
                                                          <span className="tooltip-box cursor-pointer">
                                                            {
                                                              flight.trips[1]
                                                                .listOfFlight[0]
                                                                .fromCode
                                                            }
                                                          </span>
                                                          <span className="tooltip-hover-top">
                                                            {
                                                              flight.trips[1]
                                                                .listOfFlight[0]
                                                                .fromAirportName
                                                            }
                                                          </span>
                                                        </span>
                                                      </h4>
                                                    </div>
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0">
                                                      <div className="from-to-from-digination">
                                                        <h6 className="text-center mb-0">
                                                          {getDiffFromMinutes(
                                                            flight.trips[1]
                                                              .totalTripTime
                                                          )}
                                                        </h6>
                                                        {flight.trips[1]
                                                          .listOfFlight
                                                          .length <= 3 && (
                                                          <h5 className="mb-0 text-center">
                                                            {flight.trips[1].listOfFlight.map(
                                                              (t, ix) => {
                                                                if (
                                                                  ix >=
                                                                  flight
                                                                    .trips[1]
                                                                    .listOfFlight
                                                                    .length -
                                                                    1
                                                                )
                                                                  return (
                                                                    <Fragment
                                                                      key={ix}
                                                                    ></Fragment>
                                                                  );
                                                                return (
                                                                  <span
                                                                    key={ix}
                                                                  ></span>
                                                                );
                                                              }
                                                            )}
                                                          </h5>
                                                        )}
                                                        <h6 className="airport-code mb-0 text-center">
                                                          <span className="flight-plus-air">
                                                            <span className="tooltip-box cursor-pointer">
                                                              {flight.trips[1]
                                                                .listOfFlight
                                                                .length == 1
                                                                ? "Non-Stop"
                                                                : flight
                                                                    .trips[1]
                                                                    .listOfFlight
                                                                    .length -
                                                                  1 +
                                                                  (flight
                                                                    .trips[1]
                                                                    .listOfFlight
                                                                    .length == 2
                                                                    ? " Stop"
                                                                    : " Stops")}
                                                            </span>
                                                            <span className="tooltip-hover-top">
                                                              <ul className="flight-duration-ovelry p-0 m-0 text-start">
                                                                <li>
                                                                  <strong>
                                                                    Flight
                                                                    Duration:
                                                                  </strong>{" "}
                                                                  {getDiffFromMinutes(
                                                                    flight
                                                                      .trips[1]
                                                                      .totalTripTime
                                                                  )}
                                                                </li>
                                                                {flight.trips[1].listOfFlight.map(
                                                                  (tf, ix) => {
                                                                    if (
                                                                      !!tf.displayLayOverTime
                                                                    )
                                                                      returnLayoverCounter += 1;
                                                                    return (
                                                                      <Fragment
                                                                        key={ix}
                                                                      >
                                                                        {!!tf.displayLayOverTime && (
                                                                          <li>
                                                                            <strong>
                                                                              Layover{" "}
                                                                              {
                                                                                returnLayoverCounter
                                                                              }
                                                                              :
                                                                            </strong>{" "}
                                                                            {
                                                                              tf.displayLayOverTime
                                                                            }
                                                                            ,{" "}
                                                                            {
                                                                              tf.airportToCity
                                                                            }
                                                                          </li>
                                                                        )}
                                                                      </Fragment>
                                                                    );
                                                                  }
                                                                )}
                                                              </ul>
                                                            </span>
                                                          </span>
                                                        </h6>
                                                      </div>
                                                    </div>
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                      <h6 className="flight-time mb-0 text-end">
                                                        <span>
                                                          {getFormattedTime(
                                                            flight.trips[1]
                                                              .listOfFlight[
                                                              flight.trips[1]
                                                                .listOfFlight
                                                                .length - 1
                                                            ].arrivalTime
                                                          )}
                                                        </span>
                                                        {returnTotalDays >
                                                          0 && (
                                                          <span className="flight-plus-air">
                                                            <span className="tooltip-box cursor-pointer color-red">
                                                              +{" "}
                                                              {returnTotalDays}
                                                            </span>
                                                            <span className="tooltip-hover-top">
                                                              <strong>
                                                                Flight Arrival -
                                                              </strong>{" "}
                                                              {getFormattedDate(
                                                                flight.trips[1]
                                                                  .listOfFlight[
                                                                  flight
                                                                    .trips[1]
                                                                    .listOfFlight
                                                                    .length - 1
                                                                ].arrivalAt
                                                              )}
                                                            </span>
                                                          </span>
                                                        )}
                                                      </h6>
                                                      <h4 className="airport-code mb-0 dgc text-end">
                                                        <span className="flight-plus-air">
                                                          <span className="tooltip-box cursor-pointer">
                                                            {
                                                              flight.trips[1]
                                                                .listOfFlight[
                                                                flight.trips[1]
                                                                  .listOfFlight
                                                                  .length - 1
                                                              ].toCode
                                                            }
                                                          </span>
                                                          <span className="tooltip-hover-top">
                                                            {
                                                              flight.trips[1]
                                                                .listOfFlight[
                                                                flight.trips[1]
                                                                  .listOfFlight
                                                                  .length - 1
                                                              ].toAirportName
                                                            }
                                                          </span>
                                                        </span>
                                                      </h4>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {displayRtrnOperatedBy &&
                                                displayRtrnOperatedBy.length >
                                                  0 && (
                                                  <div className="row">
                                                    <div className="col-sm-12">
                                                      <h6 className="operated-by mb-0 mt-3">
                                                        Operated by:{" "}
                                                        {displayRtrnOperatedBy.join(
                                                          ", "
                                                        )}
                                                      </h6>
                                                    </div>
                                                  </div>
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-2 col-xxl-2 ps-0">
                                          <div className="air-flight-price text-end">
                                            <h2 className="mb-0 dgc">
                                              {
                                                aedNumberFormat(avgPrice).split(
                                                  "."
                                                )[0]
                                              }
                                            </h2>
                                            <h6 className="mb-2 mt-2">
                                              {totalPassangers > 1
                                                ? "Round Trip Per Traveler"
                                                : "Round Trip Per Adult"}
                                            </h6>
                                            {/* <button
                                              className="bg-orange color-white rounded-2 fs-12 py-2 px-3 border-0 float-end text-center"
                                              onClick={async () => {
                                                setShowSpinnerIndex(
                                                  flightIndex
                                                );
                                                let currentFlight = flight;
                                                await trackMixpanelEvent(
                                                  "Listing_Itineary_Select",
                                                  currentFlight
                                                );

                                                currentFlight.departDays =
                                                  departDays;
                                                currentFlight.returnDays =
                                                  returnTotalDays;
                                                currentFlight.baggageOptions =
                                                  baggageOptions;
                                                currentFlight.totalPassangers =
                                                  totalPax;
                                                currentFlight.displayCabin =
                                                  getDisplayCabin(
                                                    parseInt(
                                                      currentFilters.cabin
                                                    )
                                                  );
                                                currentFlight.avgPrice =
                                                  avgPrice;
                                                setSelectedFlight(
                                                  currentFlight
                                                );

                                                if (
                                                  flight.gdsName ==
                                                  GDSNames.Tbo.toString()
                                                ) {
                                                  localStorage.setItem(
                                                    "departFlight",
                                                    JSON.stringify(flight)
                                                  );
                                                } else {
                                                  window.localStorage.setItem(
                                                    "currentFlight",
                                                    CircularJSON.stringify(
                                                      flight
                                                    )
                                                  );
                                                }
                                                await checkPriceChangeInKiwi(
                                                  currentFlight
                                                ).then((flight) => {
                                                  if (!flight) {
                                                    setShowSpinnerIndex(null);
                                                    return;
                                                  }
                                                  setTimeout(() => {
                                                    window.localStorage.setItem(
                                                      "currentFlight",
                                                      CircularJSON.stringify(
                                                        flight
                                                      )
                                                    );
                                                    gotoCheckoutPage(flight);
                                                    setShowSpinnerIndex(null);
                                                  }, 1000);
                                                });
                                              }}
                                            >
                                              {showSpinnerIndex ===
                                              flightIndex ? (
                                                <span
                                                  className="spinner-border text-white"
                                                  role="status"
                                                ></span>
                                              ) : (
                                                <span>Book</span>
                                              )}
                                            </button> */}

                                            <button
                                              type="button"
                                              className="buttonStyle3 border-0 float-end fs-14"
                                              onClick={async () => {
                                                setShowSpinnerIndex(
                                                  flightIndex
                                                );
                                                let currentFlight = flight;
                                                await trackMixpanelEvent(
                                                  "Listing_Itineary_Select",
                                                  currentFlight
                                                );
                                               
                                                currentFlight.departDays =
                                                  departDays;
                                                currentFlight.returnDays =
                                                  returnTotalDays;
                                                currentFlight.baggageOptions =
                                                  baggageOptions;
                                                currentFlight.totalPassangers =
                                                  totalPax;
                                                currentFlight.displayCabin =
                                                  getDisplayCabin(
                                                    parseInt(
                                                      currentFilters.cabin
                                                    )
                                                  );
                                                currentFlight.avgPrice =
                                                  avgPrice;
                                                setSelectedFlight(
                                                  currentFlight
                                                );

                                                if (
                                                  flight.gdsName ==
                                                  GDSNames.Tbo.toString()
                                                ) {
                                                  localStorage.setItem(
                                                    "departFlight",
                                                    JSON.stringify(flight)
                                                  );
                                                } else {
                                                  window.localStorage.setItem(
                                                    "currentFlight",
                                                    CircularJSON.stringify(
                                                      flight
                                                    )
                                                  );
                                                }
                                                setShowSpinnerIndex(
                                                  null
                                                );
                                                setopenFlightEnquiryForm(true);
                                                setInquiryPkg(currentFlight);
                                              }}
                                            >
                                              {showSpinnerIndex ===
                                              flightIndex ? (
                                                <span
                                                  className="spinner-border text-white"
                                                  role="status"
                                                ></span>
                                              ) : (
                                                <span>Enquire</span>
                                              )}{" "}
                                            </button>

                                            <div
                                              className="offcanvas offcanvas-end side-flap"
                                              tabIndex="-1"
                                              id="offcanvasRight"
                                              aria-labelledby="offcanvasRightLabel"
                                            >
                                              <div className="offcanvas-header border-bottom">
                                                <h5 id="offcanvasRightLabel">
                                                  Review Flight Details
                                                </h5>
                                                <button
                                                  type="button"
                                                  className="btn-close text-reset"
                                                  data-bs-dismiss="offcanvas"
                                                  aria-label="Close"
                                                ></button>
                                              </div>
                                              {selectedFlight &&
                                                selectedFlight.totalPrice >
                                                  0 && (
                                                  <FlightDetailFlap
                                                    setLoader={
                                                      setShowContentLoader
                                                    }
                                                    selectedFlight={
                                                      selectedFlight
                                                    }
                                                    gotoCheckoutPage={
                                                      gotoCheckoutPage
                                                    }
                                                    checkPriceChangeInKiwi={
                                                      checkPriceChangeInKiwi
                                                    }
                                                    selectedTabIndex={0}
                                                  />
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {baggageOptions && (
                                        <div className="air-flight-btn-and-bag mt-1 pt-2">
                                          <div className="row align-items-center">
                                            <div className="col-10 col-sm-10 col-md-8 col-lg-7 col-xl-8 col-xxl-8 pe-0">
                                              <div className="air-flight-btn"></div>
                                            </div>
                                            <div className="col-2 col-sm-2 col-md-4 col-lg-5 col-xl-4 col-xxl-4">
                                              <div className="air-flight-bag text-end">
                                                <div className="dropdown dropdown-hover">
                                                  <button
                                                    type="button"
                                                    className="btn btn-primary dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                  >
                                                    <div className="mob-hide">
                                                      <Image
                                                        className=""
                                                        loader={trvLoader}
                                                        src="icon/personal-item-included.svg"
                                                        alt="personal-item-included"
                                                        width={25}
                                                        height={23}
                                                      />
                                                      <Image
                                                        className=""
                                                        loader={trvLoader}
                                                        src={
                                                          baggageOptions.carryOnBag ==
                                                          "Chargeable"
                                                            ? "icon/carry-on-chargeable.svg"
                                                            : "icon/carry-on-included.svg"
                                                        }
                                                        alt="airplane-plus-icon"
                                                        width={25}
                                                        height={23}
                                                      />
                                                      <Image
                                                        className=""
                                                        loader={trvLoader}
                                                        src={
                                                          baggageOptions.carryOnBag ==
                                                          "Chargeable"
                                                            ? "icon/checked-chargeable.svg"
                                                            : "icon/checked-included.svg"
                                                        }
                                                        alt="personal-item-included"
                                                        width={25}
                                                        height={23}
                                                      />
                                                    </div>
                                                    <div className="desk-hide">
                                                      <Image
                                                        className=""
                                                        loader={trvLoader}
                                                        src="icon/bag-icon-mobile.svg"
                                                        alt="bag-icon-mobile"
                                                        width={25}
                                                        height={23}
                                                      />
                                                    </div>
                                                  </button>
                                                  <ul className="dropdown-menu">
                                                    <li>
                                                      <div className="air-flight-bag-details d-flex align-items-center">
                                                        <Image
                                                          className=""
                                                          loader={trvLoader}
                                                          src="icon/personal-item-included.svg"
                                                          alt="personal-item-included"
                                                          width={25}
                                                          height={23}
                                                        />
                                                        <h5 className="mb-0">
                                                          Personal Item
                                                        </h5>
                                                        <h6 className="mb-0">
                                                          {
                                                            baggageOptions.personalItem
                                                          }
                                                        </h6>
                                                      </div>
                                                    </li>
                                                    <li>
                                                      <div className="air-flight-bag-details d-flex align-items-center">
                                                        <Image
                                                          className=""
                                                          loader={trvLoader}
                                                          src={
                                                            baggageOptions.carryOnBag ==
                                                            "Chargeable"
                                                              ? "icon/carry-on-chargeable.svg"
                                                              : "icon/carry-on-included.svg"
                                                          }
                                                          alt="carry-on-included"
                                                          width={25}
                                                          height={23}
                                                        />
                                                        <h5 className="mb-0">
                                                          Carry-on Bag
                                                        </h5>
                                                        <h6 className="mb-0">
                                                          {
                                                            baggageOptions.carryOnBag
                                                          }
                                                        </h6>
                                                      </div>
                                                    </li>
                                                    <li>
                                                      <div className="air-flight-bag-details d-flex align-items-center">
                                                        <Image
                                                          className=""
                                                          loader={trvLoader}
                                                          src={
                                                            baggageOptions.checkedBag ==
                                                            "Chargeable"
                                                              ? "icon/checked-chargeable.svg"
                                                              : "icon/checked-included.svg"
                                                          }
                                                          alt="checked-included"
                                                          width={25}
                                                          height={23}
                                                        />
                                                        <h5 className="mb-0">
                                                          Checked Bag
                                                        </h5>
                                                        <h6 className="mb-0">
                                                          {
                                                            baggageOptions.checkedBag
                                                          }
                                                        </h6>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              {currentFilters &&
                                currentFilters.segments &&
                                currentFilters.segments.length == 1 && (
                                  <div className="regular-one-trip listing-com">
                                    <div className="regular-flight-round-box mt-4 mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-sm-12">
                                          <div className="color-white gds-code">
                                            {flight.gdsHiddenId}
                                          </div>
                                        </div>
                                        <div className="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-9 col-xxl-9 both-flight-box">
                                          <div className="row align-items-center">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                              <div className="row">
                                                <div className="col-sm-12">
                                                  <h2 className="digination-sub-title mb-3 dgc">
                                                    Departure |{" "}
                                                    {getFormattedDate4(
                                                      flight.trips[0]
                                                        .listOfFlight[0]
                                                        .departeddate
                                                    )}
                                                  </h2>
                                                </div>
                                              </div>
                                              <div className="row align-items-center">
                                                <div className="col-2 col-sm-2 col-md-3 col-lg-4 col-xl-3 col-xxl-3">
                                                  <div className="air-flight-logo text-start">
                                                    <Image
                                                      className="mb-1 h-auto"
                                                      loader={airlineLogoLoader}
                                                      src={
                                                        "airline-logo/" +
                                                        flight.trips[0]
                                                          .validatingCarrier
                                                          .code +
                                                        ".webp"
                                                      }
                                                      alt="airplane-plus-icon"
                                                      width={35}
                                                      height={43}
                                                    />
                                                    {hasDeptMultipleAirlines && (
                                                      <Image
                                                        className="air-icon w-auto"
                                                        loader={trvLoader}
                                                        src="icon/airplane-plus-icon.png"
                                                        alt="airplane-plus-icon"
                                                        width={30}
                                                        height={20}
                                                      />
                                                    )}
                                                    <span>
                                                      {
                                                        flight.trips[0]
                                                          .validatingCarrier
                                                          .name
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="col-10 col-sm-10 col-md-9 col-lg-8 col-xl-9 col-xxl-9 pe-0 ps-0">
                                                  <div className="row align-items-center">
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                      <h6 className="flight-time mb-0">
                                                        <span>
                                                          {getFormattedTime(
                                                            flight.trips[0]
                                                              .listOfFlight[0]
                                                              .departureTime
                                                          )}
                                                        </span>
                                                        <span className="flight-plus-air"></span>
                                                      </h6>
                                                      <h4 className="airport-code mb-0">
                                                        <span className="flight-plus-air">
                                                          <span className="tooltip-box cursor-pointer">
                                                            {
                                                              flight.trips[0]
                                                                .listOfFlight[0]
                                                                .fromCode
                                                            }
                                                          </span>
                                                          <span className="tooltip-hover-top">
                                                            {
                                                              flight.trips[0]
                                                                .listOfFlight[0]
                                                                .fromAirportName
                                                            }
                                                          </span>
                                                        </span>
                                                      </h4>
                                                    </div>
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0">
                                                      <div className="from-to-from-digination">
                                                        <h6 className="text-center mb-0">
                                                          {getDiffFromMinutes(
                                                            flight.trips[0]
                                                              .totalTripTime
                                                          )}
                                                        </h6>
                                                        {flight.trips[0]
                                                          .listOfFlight
                                                          .length <= 3 && (
                                                          <h5 className="mb-0 text-center">
                                                            {flight.trips[0].listOfFlight.map(
                                                              (t, ix) => {
                                                                if (
                                                                  ix >=
                                                                  flight
                                                                    .trips[0]
                                                                    .listOfFlight
                                                                    .length -
                                                                    1
                                                                )
                                                                  return (
                                                                    <Fragment
                                                                      key={ix}
                                                                    ></Fragment>
                                                                  );
                                                                return (
                                                                  <>
                                                                    <span
                                                                      key={ix}
                                                                    ></span>
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                          </h5>
                                                        )}
                                                        <h6 className="airport-code mb-0 text-center">
                                                          <span className="flight-plus-air">
                                                            <span className="tooltip-box cursor-pointer">
                                                              {flight.trips[0]
                                                                .listOfFlight
                                                                .length == 1
                                                                ? "Non-Stop"
                                                                : flight
                                                                    .trips[0]
                                                                    .listOfFlight
                                                                    .length -
                                                                  1 +
                                                                  (flight
                                                                    .trips[0]
                                                                    .listOfFlight
                                                                    .length == 2
                                                                    ? " Stop"
                                                                    : " Stops")}
                                                            </span>
                                                            <span className="tooltip-hover-top">
                                                              <ul className="flight-duration-ovelry p-0 m-0 text-start">
                                                                <li>
                                                                  <strong>
                                                                    Flight
                                                                    Duration:
                                                                  </strong>{" "}
                                                                  {getDiffFromMinutes(
                                                                    flight
                                                                      .trips[0]
                                                                      .totalTripTime
                                                                  )}
                                                                </li>
                                                                {flight.trips[0].listOfFlight.map(
                                                                  (tf, ix) => {
                                                                    if (
                                                                      !!tf.displayLayOverTime
                                                                    )
                                                                      layoverCounter += 1;
                                                                    return (
                                                                      <Fragment
                                                                        key={ix}
                                                                      >
                                                                        {!!tf.displayLayOverTime && (
                                                                          <li>
                                                                            <strong>
                                                                              Layover{" "}
                                                                              {
                                                                                layoverCounter
                                                                              }
                                                                              :
                                                                            </strong>{" "}
                                                                            {
                                                                              tf.displayLayOverTime
                                                                            }
                                                                            ,{" "}
                                                                            {
                                                                              tf.airportToCity
                                                                            }
                                                                          </li>
                                                                        )}
                                                                      </Fragment>
                                                                    );
                                                                  }
                                                                )}
                                                              </ul>
                                                            </span>
                                                          </span>
                                                        </h6>
                                                      </div>
                                                    </div>
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                      <h6 className="flight-time mb-0 text-end">
                                                        <span>
                                                          {getFormattedTime(
                                                            flight.trips[0]
                                                              .listOfFlight[
                                                              flight.trips[0]
                                                                .listOfFlight
                                                                .length - 1
                                                            ].arrivalTime
                                                          )}
                                                        </span>
                                                        {departDays > 0 && (
                                                          <span className="flight-plus-air">
                                                            <span className="tooltip-box cursor-pointer color-red">
                                                              + {departDays}
                                                            </span>
                                                            <span className="tooltip-hover-top">
                                                              <strong>
                                                                Flight Arrival -
                                                              </strong>{" "}
                                                              {getFormattedDate(
                                                                flight.trips[0]
                                                                  .listOfFlight[
                                                                  flight
                                                                    .trips[0]
                                                                    .listOfFlight
                                                                    .length - 1
                                                                ].arrivalAt
                                                              )}
                                                            </span>
                                                          </span>
                                                        )}
                                                      </h6>
                                                      <h4 className="airport-code mb-0 dgc text-end">
                                                        <span className="flight-plus-air">
                                                          <span className="tooltip-box cursor-pointer">
                                                            {
                                                              flight.trips[0]
                                                                .listOfFlight[
                                                                flight.trips[0]
                                                                  .listOfFlight
                                                                  .length - 1
                                                              ].toCode
                                                            }
                                                          </span>
                                                          <span className="tooltip-hover-top">
                                                            {
                                                              flight.trips[0]
                                                                .listOfFlight[
                                                                flight.trips[0]
                                                                  .listOfFlight
                                                                  .length - 1
                                                              ].toAirportName
                                                            }
                                                          </span>
                                                        </span>
                                                      </h4>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {displayOperatedBy &&
                                                displayOperatedBy.length >
                                                  0 && (
                                                  <div className="row">
                                                    <div className="col-sm-12">
                                                      <h6 className="operated-by mb-2 mt-3">
                                                        Operated by:{" "}
                                                        {displayOperatedBy.join(
                                                          ", "
                                                        )}
                                                      </h6>
                                                    </div>
                                                  </div>
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-3 ps-0">
                                          <div className="air-flight-price text-end">
                                            <h2 className="mb-0 dgc">
                                              {
                                                aedNumberFormat(avgPrice).split(
                                                  "."
                                                )[0]
                                              }
                                            </h2>
                                            <h6 className="mb-2 mt-2">
                                              {totalPassangers > 1
                                                ? "Avg. Price Per Traveler"
                                                : "Per Adult"}
                                            </h6>
                                            {/* <button
                                              className="bg-orange color-white rounded-2 fs-12 py-2 px-3 border-0 float-end text-center"
                                              type="button"
                                              onClick={async () => {
                                                setShowSpinnerIndex(
                                                  flightIndex
                                                );
                                                let currentFlight = flight;
                                                await trackMixpanelEvent(
                                                  "Listing_Itineary_Select",
                                                  currentFlight
                                                );

                                                currentFlight.departDays =
                                                  departDays;
                                                currentFlight.baggageOptions =
                                                  baggageOptions;
                                                currentFlight.totalPassangers =
                                                  totalPax;
                                                currentFlight.displayCabin =
                                                  getDisplayCabin(
                                                    parseInt(
                                                      currentFilters.cabin
                                                    )
                                                  );
                                                currentFlight.avgPrice =
                                                  avgPrice;
                                                setSelectedFlight(
                                                  currentFlight
                                                );

                                                if (
                                                  flight.gdsName ==
                                                  GDSNames.Tbo.toString()
                                                ) {
                                                  localStorage.setItem(
                                                    "departFlight",
                                                    JSON.stringify(flight)
                                                  );
                                                } else {
                                                  window.localStorage.setItem(
                                                    "currentFlight",
                                                    CircularJSON.stringify(
                                                      flight
                                                    )
                                                  );
                                                }
                                                await checkPriceChangeInKiwi(
                                                  currentFlight
                                                ).then((flight) => {
                                                  if (!flight) {
                                                    setShowSpinnerIndex(null);
                                                    return;
                                                  }
                                                  setTimeout(() => {
                                                    setShowSpinnerIndex(null);
                                                    window.localStorage.setItem(
                                                      "currentFlight",
                                                      CircularJSON.stringify(
                                                        flight
                                                      )
                                                    );
                                                    gotoCheckoutPage(flight);
                                                  }, 1000);
                                                });

                                              }}
                                            >
                                              {showSpinnerIndex ===
                                              flightIndex ? (
                                                <span
                                                  className="spinner-border text-white"
                                                  role="status"
                                                ></span>
                                              ) : (
                                                <span>Book</span>
                                              )}{" "}
                                            </button> */}

                                            <button
                                              type="button"
                                              className="buttonStyle3 border-0 float-end fs-14"
                                              onClick={async () => {
                                                let currentFlight = flight;
                                                await trackMixpanelEvent(
                                                  "Listing_Itineary_Select",
                                                  currentFlight
                                                );

                                                currentFlight.departDays =
                                                  departDays;
                                                currentFlight.returnDays =
                                                  returnTotalDays;
                                                currentFlight.baggageOptions =
                                                  baggageOptions;
                                                currentFlight.totalPassangers =
                                                  totalPax;
                                                currentFlight.displayCabin =
                                                  getDisplayCabin(
                                                    parseInt(
                                                      currentFilters.cabin
                                                    )
                                                  );
                                                currentFlight.avgPrice =
                                                  avgPrice;
                                                setSelectedFlight(
                                                  currentFlight
                                                );

                                                if (
                                                  flight.gdsName ==
                                                  GDSNames.Tbo.toString()
                                                ) {
                                                  localStorage.setItem(
                                                    "departFlight",
                                                    JSON.stringify(flight)
                                                  );
                                                } else {
                                                  window.localStorage.setItem(
                                                    "currentFlight",
                                                    CircularJSON.stringify(
                                                      flight
                                                    )
                                                  );
                                                }

                                                setopenFlightEnquiryForm(true);
                                                setInquiryPkg(currentFlight);
                                              }}
                                            >
                                              Enquire
                                            </button>
                                            <div
                                              className="offcanvas offcanvas-end side-flap"
                                              tabIndex="-1"
                                              id="offcanvasRight"
                                              aria-labelledby="offcanvasRightLabel"
                                            >
                                              <div className="offcanvas-header border-bottom">
                                                <h5 id="offcanvasRightLabel">
                                                  Review Flight Details
                                                </h5>
                                                <button
                                                  type="button"
                                                  className="btn-close text-reset"
                                                  data-bs-dismiss="offcanvas"
                                                  aria-label="Close"
                                                ></button>
                                              </div>
                                              {selectedFlight &&
                                                selectedFlight.totalPrice >
                                                  0 && (
                                                  <FlightDetailFlap
                                                    setLoader={
                                                      setShowContentLoader
                                                    }
                                                    selectedFlight={
                                                      selectedFlight
                                                    }
                                                    gotoCheckoutPage={
                                                      gotoCheckoutPage
                                                    }
                                                    checkPriceChangeInKiwi={
                                                      checkPriceChangeInKiwi
                                                    }
                                                    selectedTabIndex={0}
                                                  />
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {baggageOptions && (
                                        <div className="air-flight-btn-and-bag mt-1 pt-2">
                                          <div className="row align-items-center">
                                            <div className="col-10 col-sm-10 col-md-8 col-lg-7 col-xl-8 col-xxl-8 pe-0"></div>
                                            <div className="col-2 col-sm-2 col-md-4 col-lg-5 col-xl-4 col-xxl-4">
                                              <div className="air-flight-bag text-end">
                                                <div className="dropdown dropdown-hover">
                                                  <button
                                                    type="button"
                                                    className="btn btn-primary dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                  >
                                                    <div className="mob-hide">
                                                      <Image
                                                        className=""
                                                        loader={trvLoader}
                                                        src="icon/personal-item-included.svg"
                                                        alt="personal-item-included"
                                                        width={25}
                                                        height={23}
                                                      />
                                                      <Image
                                                        className=""
                                                        loader={trvLoader}
                                                        src={
                                                          baggageOptions.carryOnBag ==
                                                          "Chargeable"
                                                            ? "icon/carry-on-chargeable.svg"
                                                            : "icon/carry-on-included.svg"
                                                        }
                                                        alt="carry-on-included"
                                                        width={25}
                                                        height={23}
                                                      />
                                                      <Image
                                                        className=""
                                                        loader={trvLoader}
                                                        src={
                                                          baggageOptions.checkedBag ==
                                                          "Chargeable"
                                                            ? "icon/checked-chargeable.svg"
                                                            : "icon/checked-included.svg"
                                                        }
                                                        alt="checked-included"
                                                        width={25}
                                                        height={23}
                                                      />
                                                    </div>
                                                    <div className="desk-hide">
                                                      <Image
                                                        className=""
                                                        loader={trvLoader}
                                                        src="icon/bag-icon-mobile.svg"
                                                        alt="bag-icon-mobile"
                                                        width={25}
                                                        height={23}
                                                      />
                                                    </div>
                                                  </button>
                                                  <ul className="dropdown-menu">
                                                    <li>
                                                      <div className="air-flight-bag-details d-flex align-items-center">
                                                        <Image
                                                          className=""
                                                          loader={trvLoader}
                                                          src="icon/personal-item-included.svg"
                                                          alt="personal-item-included"
                                                          width={25}
                                                          height={23}
                                                        />
                                                        <h5 className="mb-0">
                                                          Personal Item
                                                        </h5>
                                                        <h6 className="mb-0">
                                                          {
                                                            baggageOptions.personalItem
                                                          }
                                                        </h6>
                                                      </div>
                                                    </li>
                                                    <li>
                                                      <div className="air-flight-bag-details d-flex align-items-center">
                                                        <Image
                                                          className=""
                                                          loader={trvLoader}
                                                          src={
                                                            baggageOptions.carryOnBag ==
                                                            "Chargeable"
                                                              ? "icon/carry-on-chargeable.svg"
                                                              : "icon/carry-on-included.svg"
                                                          }
                                                          alt="payment sucess icon"
                                                          width={100}
                                                          height={43}
                                                        />
                                                        <h5 className="mb-0">
                                                          Carry-on Bag
                                                        </h5>
                                                        <h6 className="mb-0">
                                                          {
                                                            baggageOptions.carryOnBag
                                                          }
                                                        </h6>
                                                      </div>
                                                    </li>
                                                    <li>
                                                      <div className="air-flight-bag-details d-flex align-items-center">
                                                        <Image
                                                          className=""
                                                          loader={trvLoader}
                                                          src={
                                                            baggageOptions.checkedBag ==
                                                            "Chargeable"
                                                              ? "icon/checked-chargeable.svg"
                                                              : "icon/checked-included.svg"
                                                          }
                                                          alt="checked-included"
                                                          width={25}
                                                          height={23}
                                                        />
                                                        <h5 className="mb-0">
                                                          Checked Bag
                                                        </h5>
                                                        <h6 className="mb-0">
                                                          {
                                                            baggageOptions.checkedBag
                                                          }
                                                        </h6>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>
                          );
                        })}

                    {flights &&
                      flights.length > 0 &&
                      filteredFlights &&
                      filteredFlights.length == 0 && (
                        <div className="no-result-lising bg-white text-center ps-3 pt-3 pe-3 pb-3 mb-4">
                          <Image
                            className="w-auto h-auto"
                            loader={trvLoader}
                            src="icon/red-alert-icon.png"
                            alt="red alert icon"
                            width={20}
                            height={43}
                          />
                          <h4 className="mb-2 mt-2">No Result found</h4>
                          <p className="mb-0">
                            for selected criteria. Please apply or change more
                            filters.
                          </p>
                          <button
                            className="btn-style1 active mb-3 mt-3"
                            onClick={() => clearFilters()}
                          >
                            Reset all filters
                          </button>
                          <h6>or Call us at</h6>
                          <a
                            className="btn-style1 ps-3 pe-3"
                            href={"tel:" + displayContactNumber}
                          >
                            <Image
                              className="w-auto h-auto"
                              loader={trvLoader}
                              src="icon/call.svg"
                              alt="call icon"
                              width={50}
                              height={43}
                            />
                            <span>{displayContactNumber}</span>
                          </a>
                          <p className="mb-0 mt-2">we are available 24x7</p>
                        </div>
                      )}

                    <div className="flight-list-footer-breadcrumb">
                      <div className="row justify-content-end">
                        <div className="col-sm-12 text-end">
                          {filteredFlights &&
                            filteredFlights.length > 0 &&
                            itemsCounter <= filteredFlights.length && (
                              <button
                                className="transparent-btn active"
                                onClick={() => {
                                  let endValue = itemsCounter + 10;
                                  setItemsCounter(endValue);
                                }}
                              >
                                <span>Show More</span>
                                <i className="fa-solid fa-arrow-down ms-2"></i>
                              </button>
                            )}
                          <button
                            className="transparent-btn ms-2"
                            onClick={() => window.scroll(0, 0)}
                          >
                            <span>Back to Top</span>
                            <i className="fa-solid fa-arrow-up ms-2"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && tripType == 2 && (
        <div className="flight_search splash-ani">
          <ResultsSplashScreen
            data={{
              fromCode: fromCode,
              toCode: toCode,
              fromLabel: fromLabel,
              toLabel: toLabel,
              fromDate: fromDate,
              toDate: toDate,
              tripType: tripType,
              travelers: noOfPassengers,
            }}
          />
        </div>
      )}
      {isLoading && tripType == 1 && (
        <div className="flight_search splash-ani">
          <ResultsSplashScreen
            data={{
              fromCode: fromCode,
              toCode: toCode,
              fromLabel: fromLabel,
              toLabel: toLabel,
              fromDate: fromDate,
              toDate: toDate,
              tripType: tripType,
              travelers: noOfPassengers,
            }}
          />
        </div>
      )}
      {isLoading == false && (!flights || flights.length == 0) && (
        <div className="bannertemp">
          <div className="textcontent">
            <Image
              className="h-auto w-100 d-lg-none"
              loader={trvLoader}
              src="support2.png"
              alt="No Results Img"
              width={564}
              height={544}
            />
            <h3>Oops! Got No Results? No worries.</h3>
            <h4>
              Speak to our travel agents to catch the cheapest deals to your
              favorite destination.
            </h4>
            <div className="callus">
              <h5>Ring A Bell On</h5>
              <a href={"tel:" + displayContactNumber}>
                <Image
                  className="h-auto"
                  loader={trvLoader}
                  src="icon/phone-white-icon.png"
                  alt="Phone Icon"
                  width={22}
                  height={24}
                />
                {displayContactNumber}
              </a>
              <h5>we are available 24x7</h5>
            </div>
            <div className="uptooff">
              <h6>Up to</h6>
              <h2>
                <span>20%</span> Discount
              </h2>
              <h6 className="mt-0">on total value awaits!</h6>
            </div>
          </div>
        </div>
      )}

      {flights && flights.length > 0 && <InnerFooter></InnerFooter>}

      <Modal className="centred-modal" show={showContentLoader}>
        <Modal.Body>
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

      <Modal className="centred-modal" show={openNewPriceModal}>
        <Modal.Body>
          <ChangePrice
            isListinPage={true}
            setOpenNewPriceModal={setOpenNewPriceModal}
            newPrice={newPrice}
            flight={selectedFlight}
            gotoCheckoutPage={gotoCheckoutPage}
          ></ChangePrice>
        </Modal.Body>
      </Modal>

      <Modal
        className="FlightEnquiryForm centred-modal"
        show={openFlightEnquiryForm}
      >
        <Modal.Body>
          <Image
            className="CloseIcon h-auto cursor-pointer position-absolute end-0 me-3"
            loader={trvLoader}
            src="icon/close.svg"
            alt="close icon"
            width={25}
            height={20}
            onClick={() => {
              setopenFlightEnquiryForm(false);
            }}
          />
          <FlightInqueryForm
            data={{
              fromCode: fromCode,
              toCode: toCode,
              fromLabel: fromLabel,
              toLabel: toLabel,
              fromDate: fromDate,
              toDate: toDate,
              tripType: tripType,
              travelers: noOfPassengers,
            }}
            fromCity={fromCity}
            toCity={toCity}
            inquiryPkg={inquiryPkg}
            setopenFlightEnquiryForm={setopenFlightEnquiryForm}
          ></FlightInqueryForm>
        </Modal.Body>
      </Modal>
    </>
  );
}
