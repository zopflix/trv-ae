"use client";
import Topsearch from "../components/topsearchbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactSlider from "react-slider";
import { searchFlights } from "../services/flightService";
import { Fragment, useEffect, useState } from "react";
import {
  cloneData,
  encodeData,
  getDiffFromMinutes,
  getDisplayAirline,
  getDisplayCabin,
  getFormattedDate,
  getFormattedDate4,
  getFormattedTime,
  getTimeOfDay,
  isADomesticFlight,
  isPureAirline,
  numberFormat,
} from "../helpers/common";
import { contactNumber } from "../config";
import { Modal } from "react-bootstrap";
import DetailsFlap from "../components/details-flap";
import ResultsSplashScreen from "../components/custom-splash-screen";
import Slider from "react-slick";
import { isBrowser } from "react-device-detect";
import {
  airlineLogoLoader,
  sfLoader,
  trvLoader,
} from "../helpers/imageKitLoader";
import Image from "next/image";
import InnterFooter from "../components/inner-footer";
import InnerHeader from "../components/inner-header";
import OffersMatrix from "../components/offer-matrix";

export default function Results() {
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
    // focusOnSelect: true
  };

  const [sessionTimer, setSessionTimer] = useState(null);
  const [defaultSortOption, setDefaultSortOption] = useState(sortByOptions[0]);
  const [rtnDefaultSortOption, setRtnDefaultSortOption] = useState(
    sortByOptions[0]
  );
  const [flights, setFlightsData] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [rtnFilteredFlights, setRtnFilteredFlights] = useState([]);
  const [currentFilters, setCurrentFilters] = useState(null);
  const [itemsCounter, setItemsCounter] = useState(10);
  const [validatingCarriers, setValidatingCarriers] = useState([]);
  const [pureValidatingCarriers, setPureValidatingCarriers] = useState([]);
  const [stopsFilters, setStopsFilters] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [priceFilterValues, setPriceFilterValues] = useState([]);
  const [selectedPureAirlines, setSelectedPureAirlines] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [priceFilterRange, setPriceFilterRange] = useState([]);
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [showContentLoader, setShowContentLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [mobSideFilterClicked, setMobSideFilterClicked] = useState(false);
  const [displayContactNumber, setDisplayContactNumber] =
    useState(contactNumber);
  const [departTBOFlights, setDepartTBOFlights] = useState([]);
  const [returnTBOFlights, setReturnTBOFlights] = useState([]);
  const [selectedDepartTBOFlight, setSelectedDepartTBOFlight] = useState(null);
  const [selectedReturnTBOFlight, setSelectedReturnTBOFlight] = useState(null);
  const [showPriceStrip, setShowPriceStrip] = useState(false);
  const [flightForFlap, setFlightForFlap] = useState(null);
  const [rtnFlightForFlap, setRtnFlightForFlap] = useState(null);
  const [showContinueBtn, setShowContinueBtn] = useState(true);
  const [openSessionIdleModal, setOpenSessionIdleModal] = useState(false);
  const [selectedDepartTimes, setSelectedDepartTimes] = useState([]);
  const [selectedReturnTimes, setSelectedReturnTimes] = useState([]);
  const [matrixAirlines, setMatrixAirlines] = useState([]);
  const [tripType, setTripType] = useState(1);
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
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
  const [fromLabel, setFromLabel] = useState(null);
  const [toLabel, setToLabel] = useState(null);
  const [isModifyInProgress, setIsModifyInProgress] = useState(false);
  const [showSpinnerIndex, setShowSpinnerIndex] = useState(null);

  const clearFilters = () => {
    setSelectedStops([]);
    setSelectedAirlines([]);
    setSelectedPureAirlines([]);
    setSelectedDepartTimes([]);
    setSelectedReturnTimes([]);
    setDefaultSortOption(sortByOptions[0]);
    setRtnDefaultSortOption(sortByOptions[0]);
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
    setFilteredFlights(departTBOFlights);
    if (currentFilters && currentFilters.segments.length > 1) {
      setRtnFilteredFlights(returnTBOFlights);
    }
    setFilters(flights);
  };

  useEffect(() => {
    return () => {
      setShowSpinnerIndex(null);
    };
  }, []);

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
        extendCarrier.connectingAirlines = !element.trips[0].listOfFlight
          .map((x) => x.marketingCarrier)
          .every((x) => x == element.trips[0].validatingCarrier.code);
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

  const applyFilters = (filterType, value, flights = []) => {
    setShowContentLoader(true);
    let noOfStops = [];
    let allFilteredFlights = [];
    let pureAirlines = [];
    let airlines = [];
    let departTimes = [];
    let returnTimes = [];

    if (filterType == "stops") {
      allFilteredFlights = flights;
      if (selectedStops.indexOf(parseInt(value)) > -1) {
        noOfStops = selectedStops.filter((x) => x != value);
        setSelectedStops(noOfStops);
      } else {
        noOfStops = selectedStops;
        noOfStops.push(parseInt(value));
        setSelectedStops(noOfStops);
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

      // FILTERING BY DEPARTURE TIME
      if (selectedDepartTimes.length > 0 || selectedReturnTimes.length > 0) {
        let fl = [];
        let departFlights = allFilteredFlights.filter(
          (x) =>
            x.trips[0].listOfFlight[0].fromCode ==
            currentFilters.segments[0].fromCode
        );
        let returnFlights = [];

        if (selectedDepartTimes.length > 0) {
          selectedDepartTimes.forEach((time) => {
            let ff1 = departFlights.filter(
              (x) =>
                getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
            );
            fl.push(...ff1);
          });
        }

        if (currentFilters?.segments.length > 1) {
          returnFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].listOfFlight[0].fromCode ==
              currentFilters.segments[0].toCode
          );
          if (selectedReturnTimes.length > 0) {
            selectedReturnTimes.forEach((time) => {
              let ff2 = returnFlights.filter(
                (x) =>
                  getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
              );
              fl.push(...ff2);
            });
          } else {
            fl.push(...returnFlights);
          }
        }
        allFilteredFlights = fl;
      }

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

      // FILTERING BY DEPARTURE TIME
      if (selectedDepartTimes.length > 0 || selectedReturnTimes.length > 0) {
        let fl = [];
        let departFlights = allFilteredFlights.filter(
          (x) =>
            x.trips[0].listOfFlight[0].fromCode ==
            currentFilters.segments[0].fromCode
        );
        let returnFlights = [];

        if (selectedDepartTimes.length > 0) {
          selectedDepartTimes.forEach((time) => {
            let ff1 = departFlights.filter(
              (x) =>
                getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
            );
            fl.push(...ff1);
          });
        }

        if (currentFilters?.segments.length > 1) {
          returnFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].listOfFlight[0].fromCode ==
              currentFilters.segments[0].toCode
          );
          if (selectedReturnTimes.length > 0) {
            selectedReturnTimes.forEach((time) => {
              let ff2 = returnFlights.filter(
                (x) =>
                  getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
              );
              fl.push(...ff2);
            });
          } else {
            fl.push(...returnFlights);
          }
        }
        allFilteredFlights = fl;
      }

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

      // FILTERING BY DEPARTURE TIME
      if (selectedDepartTimes.length > 0 || selectedReturnTimes.length > 0) {
        let fl = [];
        let departFlights = allFilteredFlights.filter(
          (x) =>
            x.trips[0].listOfFlight[0].fromCode ==
            currentFilters.segments[0].fromCode
        );
        let returnFlights = [];

        if (selectedDepartTimes.length > 0) {
          selectedDepartTimes.forEach((time) => {
            let ff1 = departFlights.filter(
              (x) =>
                getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
            );
            fl.push(...ff1);
          });
        }

        if (currentFilters?.segments.length > 1) {
          returnFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].listOfFlight[0].fromCode ==
              currentFilters.segments[0].toCode
          );
          if (selectedReturnTimes.length > 0) {
            selectedReturnTimes.forEach((time) => {
              let ff2 = returnFlights.filter(
                (x) =>
                  getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
              );
              fl.push(...ff2);
            });
          } else {
            fl.push(...returnFlights);
          }
        }
        allFilteredFlights = fl;
      }
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

      // FILTERING BY DEPARTURE TIME
      if (selectedDepartTimes.length > 0 || selectedReturnTimes.length > 0) {
        let fl = [];
        let departFlights = allFilteredFlights.filter(
          (x) =>
            x.trips[0].listOfFlight[0].fromCode ==
            currentFilters.segments[0].fromCode
        );
        let returnFlights = [];

        if (selectedDepartTimes.length > 0) {
          selectedDepartTimes.forEach((time) => {
            let ff1 = departFlights.filter(
              (x) =>
                getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
            );
            fl.push(...ff1);
          });
        }

        if (currentFilters?.segments.length > 1) {
          returnFlights = allFilteredFlights.filter(
            (x) =>
              x.trips[0].listOfFlight[0].fromCode ==
              currentFilters.segments[0].toCode
          );
          if (selectedReturnTimes.length > 0) {
            selectedReturnTimes.forEach((time) => {
              let ff2 = returnFlights.filter(
                (x) =>
                  getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
              );
              fl.push(...ff2);
            });
          } else {
            fl.push(...returnFlights);
          }
        }
        allFilteredFlights = fl;
      }
    } else if (filterType == "depart-time") {
      allFilteredFlights = flights;

      if (selectedDepartTimes.findIndex((x) => x == value) > -1) {
        departTimes = selectedDepartTimes.filter((x) => x != value);
        setSelectedDepartTimes(departTimes);
      } else {
        departTimes = selectedDepartTimes;
        departTimes.push(value);
        setSelectedDepartTimes(departTimes);
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

      let fl = [];
      if (departTimes.length > 0) {
        departTimes.forEach((time) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
          );
          fl.push(...fFlights);
        });
        allFilteredFlights = fl;
      }
    } else if (filterType == "return-time") {
      allFilteredFlights = flights;

      if (selectedReturnTimes.findIndex((x) => x == value) > -1) {
        returnTimes = selectedReturnTimes.filter((x) => x != value);
        setSelectedReturnTimes(returnTimes);
      } else {
        returnTimes = selectedReturnTimes;
        returnTimes.push(value);
        setSelectedReturnTimes(returnTimes);
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

      let fl = [];
      if (returnTimes.length > 0) {
        returnTimes.forEach((time) => {
          let fFlights = allFilteredFlights.filter(
            (x) =>
              getTimeOfDay(x.trips[0].listOfFlight[0].departureTime) == time
          );
          fl.push(...fFlights);
        });
        allFilteredFlights = fl;
      }
    }

    let departFlights = allFilteredFlights.filter(
      (x) =>
        x.gdsName == "TBO" &&
        x.trips[0].listOfFlight[0].fromCode ==
          currentFilters.segments[0].fromCode
    );
    let returnFlights = [];

    if (currentFilters?.segments.length > 1) {
      returnFlights = allFilteredFlights.filter(
        (x) =>
          x.gdsName == "TBO" &&
          x.trips[0].listOfFlight[0].fromCode ==
            currentFilters.segments[0].toCode
      );
    }
    if (filterType != "return-time") setFilteredFlights(departFlights);
    if (filterType != "depart-time") setRtnFilteredFlights(returnFlights);

    // setFilters(allFilteredFlights, filterType, airlines, pureAirlines, selectedStops);
    setTimeout(() => {
      setShowContentLoader(false);
    }, 600);
  };

  const sortResults = (
    results,
    sortValue = defaultSortOption ? defaultSortOption.value : 1
  ) => {
    if (sortValue == 1) {
      return results.sort(function (a, b) {
        return a.totalPrice - b.totalPrice;
      });
    } else if (sortValue == 2) {
      return results.sort(function (a, b) {
        return b.totalPrice - a.totalPrice;
      });
    } else if (sortValue == 3) {
      return results.sort(function (a, b) {
        return a.trips[0].totalTripTime - b.trips[0].totalTripTime;
      });
    } else if (sortValue == 4) {
      return results.sort(function (a, b) {
        return b.trips[0].totalTripTime - a.trips[0].totalTripTime;
      });
    }
  };

  const modifySearch = (data, searchSubmited = false) => {
    setMobSideFilterClicked(false);

    setIsModifyInProgress(true);

    clearFilters();
    setFlightsData([]);
    setIsLoading(true);
    if (sessionTimer) {
      clearTimeout(sessionTimer);
      setSessionTimer(null);
    }

    return searchFlights(data).then((res) => {
      setIsModifyInProgress(false);

      var amadeusResult = res;
      var sortedResults = amadeusResult.sort(function (a, b) {
        return a.totalPrice - b.totalPrice;
      });
      refreshData(sortedResults, data);
      setIsLoading(false);
    });
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
      setSessionTimer(setTimeout(() => setOpenSessionIdleModal(true), 1000000));
      let sortedResults = sortResults(res);
      setFlightsData(sortedResults);
      setFilters(sortedResults);
      let totalPassengers = 0;
      sortedResults[0]?.fareDetails.forEach((fare) => {
        if (fare.totalFareAmount > 0) {
          totalPassengers += fare.noofPax;
        }
      });
      setTotalPassengers(totalPassengers);
      let currentStoredFilters = localStorage.getItem("currentSelectedFilters");
      if (!!currentStoredFilters) {
        setCurrentFilters(JSON.parse(currentStoredFilters));
        let departFlights = sortedResults.filter(
          (x) =>
            x.gdsName == "TBO" &&
            x.trips[0].listOfFlight[0].fromCode ==
              JSON.parse(currentStoredFilters).segments[0].fromCode
        );
        setDepartTBOFlights(departFlights);
        setFilteredFlights(departFlights);

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

        if (departFlights.length > 0) {
          // setFilters(departFlights, "departFlights");
          // setPriceFilterRange([Math.min(...departFlights.map(flight => (flight.totalPrice / totalPassengers).toFixed(2))), Math.max(...departFlights.map(flight => (flight.totalPrice / totalPassengers).toFixed(2)))]);
          // setPriceFilterValues([Math.min(...departFlights.map(flight => (flight.totalPrice / totalPassengers).toFixed(2))), Math.max(...departFlights.map(flight => (flight.totalPrice / totalPassengers).toFixed(2)))]);
          let flightPrice = Math.round(departFlights[0].totalPrice);
          let totalPassangers = 0;
          let totalPax = 0;
          departFlights[0].fareDetails.forEach((fare) => {
            totalPax += fare.noofPax;
            if (fare.totalFareAmount > 0) {
              totalPassangers += fare.noofPax;
            }
          });
          let avgPrice = Math.round(flightPrice / totalPassangers);
          departFlights[0].avgPrice = avgPrice;
          departFlights[0].totalPassengers = totalPax;
          departFlights[0].displayCabin = getDisplayCabin(
            parseInt(currentFilters && currentFilters.cabin)
          );

          departFlights[0].timeOfDay = getTimeOfDay(
            departFlights[0].trips[0].listOfFlight[0].departureTime
          );
          if (departFlights[0].timeOfDay == "Morning")
            departFlights[0].timeIcon =
              "https://assets.neofares.com/all-icon/morning-icon.svg";
          else if (departFlights[0].timeOfDay == "Afternoon")
            departFlights[0].timeIcon =
              "https://assets.neofares.com/all-icon/afternoon-icon.svg";
          else if (departFlights[0].timeOfDay == "Evening")
            departFlights[0].timeIcon =
              "https://assets.neofares.com/all-icon/evening-icon.svg";
          else
            departFlights[0].timeIcon =
              "https://assets.neofares.com/all-icon/night-moon-icon.svg";

          setSelectedDepartTBOFlight(departFlights[0]);
        }

        if (JSON.parse(currentStoredFilters).segments.length == 2) {
          let returnFlights = sortedResults.filter(
            (x) =>
              x.gdsName == "TBO" &&
              x.trips[0].listOfFlight[0].fromCode ==
                JSON.parse(currentStoredFilters).segments[1].fromCode
          );
          setReturnTBOFlights(returnFlights);
          setRtnFilteredFlights(returnFlights);
          if (returnFlights.length > 0) {
            if (!document.body.classList.contains("custom-listing"))
              document.body.classList.add("custom-listing");
            // setReturnFilters(returnFlights, "returnFlights");
            let flightPrice = Math.round(returnFlights[0].totalPrice);
            let totalPassangers = 0;
            let totalPax = 0;
            returnFlights[0].fareDetails.forEach((fare) => {
              totalPax += fare.noofPax;
              if (fare.totalFareAmount > 0) {
                totalPassangers += fare.noofPax;
              }
            });
            let avgPrice = Math.round(flightPrice / totalPassangers);
            returnFlights[0].avgPrice = avgPrice;

            returnFlights[0].timeOfDay = getTimeOfDay(
              returnFlights[0].trips[0].listOfFlight[0].departureTime
            );
            if (returnFlights[0].timeOfDay == "Morning")
              returnFlights[0].timeIcon =
                "https://assets.neofares.com/all-icon/morning-icon.svg";
            else if (returnFlights[0].timeOfDay == "Afternoon")
              returnFlights[0].timeIcon =
                "https://assets.neofares.com/all-icon/afternoon-icon.svg";
            else if (returnFlights[0].timeOfDay == "Evening")
              returnFlights[0].timeIcon =
                "https://assets.neofares.com/all-icon/evening-icon.svg";
            else
              returnFlights[0].timeIcon =
                "https://assets.neofares.com/all-icon/night-moon-icon.svg";

            setSelectedReturnTBOFlight(returnFlights[0]);
          }
        } else {
          if (document.body.classList.contains("custom-listing"))
            document.body.classList.remove("custom-listing");
        }
      }
    } else {
      setFlightsData([]);
      setFilteredFlights([]);
      setPriceFilterValues([0, 100]);
      let currentStoredFilters = localStorage.getItem("currentSelectedFilters");
      if (!!currentStoredFilters)
        setCurrentFilters(JSON.parse(currentStoredFilters));
    }
  };

  const formatTime = (time) => {
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

  useEffect(() => {
    let flights = [...filteredFlights];
    let res = sortResults(flights);
    setFilteredFlights(res);

    if (rtnFilteredFlights.length > 0) {
      let fl = [...rtnFilteredFlights];
      let data = sortResults(fl);
      setRtnFilteredFlights(data);
    }
  }, [defaultSortOption]);

  useEffect(() => {
    let flights = [...rtnFilteredFlights];
    let res = sortResults(flights, rtnDefaultSortOption.value);
    setRtnFilteredFlights(res);
  }, [rtnDefaultSortOption]);

  useEffect(() => {
    if (showContentLoader) document.body.classList.add("filter-load");
    else {
      document.body.classList.remove("filter-load");
    }
  }, [showContentLoader]);

  useEffect(() => {
    let allAirlines = [];
    if (validatingCarriers && validatingCarriers.length > 0)
      allAirlines.push(...validatingCarriers);
    if (pureValidatingCarriers && pureValidatingCarriers.length > 0)
      allAirlines.push(...pureValidatingCarriers);

    if (allAirlines.length > 0) {
      allAirlines = allAirlines
        .filter((x) => x.price > 0)
        .sort(function (a, b) {
          return a.price - b.price;
        });
    }
    setMatrixAirlines(allAirlines);
  }, [validatingCarriers, pureValidatingCarriers]);

  useEffect(() => {
    let currentStoredFilters = localStorage.getItem("currentSelectedFilters");
    if (!!currentStoredFilters) {
      setCurrentFilters(JSON.parse(currentStoredFilters));
    }

    document.body.classList.add("listing-page");

    let filters = JSON.parse(currentStoredFilters);
    let pxs = { ...noOfPassengers };
    pxs.adults = filters.noOfAdult;
    pxs.children = filters.child;
    pxs.infants = filters.noOfLapInfant;
    pxs.cabin = getDisplayCabin(parseInt(filters.cabin));
    setNoOfPassengers(pxs);

    var formData = JSON.parse(localStorage.getItem("formData"));

    if (formData) {
      setFromCode(formData.fromAirport.value);
      setToCode(formData.toAirport.value);
      setFromLabel(formData.fromAirport.label);
      setToLabel(formData.toAirport.label);
    }

    return () => {
      if (sessionTimer) clearTimeout(sessionTimer);
      if (document.body.classList.contains("listing-page"))
        document.body.classList.remove("listing-page");
      if (document.body.classList.contains("custom-listing"))
        document.body.classList.remove("custom-listing");
    };
  }, []);

  useEffect(() => {
    if (flights && flights.length > 0) {
      let scrollCallBackkkk = null;
      if (
        selectedDepartTBOFlight &&
        selectedDepartTBOFlight.trips &&
        selectedDepartTBOFlight.trips.length > 0
      ) {
        const footer = document.getElementById("totalPriceStrip");
        const stickyyyy = footer?.offsetTop;
        scrollCallBackkkk = window.addEventListener("scroll", () => {
          if (window.pageYOffset > stickyyyy) setShowPriceStrip(true);
          else setShowPriceStrip(false);
        });
      }

      const header = document.getElementById("filterBySection");
      const sticky = header?.offsetTop;
      const scrollCallBack = window.addEventListener("scroll", () => {
        if (window.pageYOffset > sticky) {
          header?.classList?.add("sticky");
        } else {
          header?.classList?.remove("sticky");
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
        window.removeEventListener("scroll", scrollCallBackkkk);
      };
    }
  }, [flights]);

  const handleBookFlight = (index, flight, avgPrice, totalPax) => {
    setShowSpinnerIndex(index);

    let fl = cloneData(flight);
    fl.avgPrice = avgPrice;
    fl.totalPassengers = totalPax;
    fl.displayCabin = getDisplayCabin(parseInt(currentFilters.cabin));
    localStorage.setItem("departFlight", JSON.stringify(fl));
    const parm = new URLSearchParams(window.location.search);
    let parms =
      "?amt=" +
      (fl?.totalPrice + (rtnFlightForFlap ? rtnFlightForFlap?.totalPrice : 0));
    let encodedParams = encodeData(parms);
    localStorage.setItem("currentSearchId", parm.get("s"));
    setTimeout(() => {
      setShowSpinner(false);
      setShowSpinnerIndex(null);
      window.location.href =
        "/book-flight/?token=" + encodedParams.replace("+", "-");
    }, 1000);
  };

  return (
    <>
      <InnerHeader></InnerHeader>

      {!isLoading &&
        currentFilters &&
        currentFilters.segments &&
        currentFilters.segments.length > 0 && (
          <div className="modify-aiport-breadcrumb bg-grey pt-2 pb-2 border-bottom desk-hide d-lg-none color-blue">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                  <div className="d-flex align-items-center">
                    {currentFilters &&
                      currentFilters.segments &&
                      currentFilters.segments.length > 0 && (
                        <>
                          <h6 className="mb-0 fw-bolder">{fromCode}</h6>
                          {tripType == 1 && (
                            <i className="mx-1 fa-solid fa-arrow-right"></i>
                          )}
                          {tripType == 2 && (
                            <i className="fa-solid fa-arrow-right-arrow-left ms-2 me-2"></i>
                          )}
                          <h6 className="mb-0 fw-bolder">{toCode}</h6>
                        </>
                      )}
                  </div>
                </div>
                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5 border-start">
                  <span>
                    {getFormattedDate4(fromDate)}

                    {tripType == 2 && "- " + getFormattedDate4(toDate)}
                  </span>
                  {currentFilters && (
                    <>
                      <span>
                        {noOfPassengers.adults} Adult(s)
                        {noOfPassengers.children > 0 &&
                          ", " + noOfPassengers.children + " Child"}
                        {noOfPassengers.infants > 0 &&
                          ", " + noOfPassengers.infants + " Infants"}
                        , {noOfPassengers.cabin}
                      </span>
                      <span>{tripType == 2 ? "Round Trip" : "One Way"}</span>
                    </>
                  )}
                </div>
                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                  <i
                    className="cursor-pointer fa-solid fa-pen-to-square float-end h4 mb-0"
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
          isModifyInProgress={isModifyInProgress}
          setFromCode={setFromCode}
          setToCode={setToCode}
          setFromLabel={setFromLabel}
          setToLabel={setToLabel}
          setNoOfPassengers={setNoOfPassengers}
          setFromDate={setFromDate}
          setToDate={setToDate}
          modifySearch={modifySearch}
          setTripType={setTripType}
          closeMobFilter={closeMobileFilter}
          isFlightsLoading={isLoading}
          closeModifySearch={setMobSideFilterClicked}
          currentPage="listing"
          setFromCity={setFromCity}
          setToCity={setToCity}
        ></Topsearch>
      </div>
      {flights && flights.length > 0 && !isLoading && (
        <div className="flight-results bg-grey mb-0" id="totalPriceStrip">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3 col-xxl-3">
                <div className="sidebar-filter-btn mt-3 desk-hide">
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
                    <span className="sub-heading-title dgc.filter-sub-heading .icon span">
                      Filter By
                    </span>
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
                      <div className="tab-content" id="pills-tabContent">
                        <div id="departure-filter">
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
                                      applyFilters("stops", stop, flights);
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
                                        : stop +
                                          (stop == 1 ? " Stop" : " Stops")}
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
                                    applyFilters("price", e, flights);
                                  }}
                                />
                                <div className="row mt-3">
                                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <h6 className="mb-0 d-table">
                                      {" "}
                                      {
                                        numberFormat(
                                          Math.round(priceFilterValues[0])
                                        ).split(".")[0]
                                      }
                                    </h6>
                                  </div>
                                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-end">
                                    <h6 className="mb-0 d-table float-end">
                                      {" "}
                                      {
                                        numberFormat(
                                          Math.round(priceFilterValues[1])
                                        ).split(".")[0]
                                      }
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="filter-items py-3 ps-3 pe-3">
                              <h5 className="sub-title mb-2 dgc">
                                Depart Time from{" "}
                                {
                                  departTBOFlights[0]?.trips[0].listOfFlight[0]
                                    .airportFromCity
                                }
                              </h5>
                              <div className="row m-0">
                                <div
                                  className="col-3 px-1"
                                  onClick={() =>
                                    applyFilters(
                                      "depart-time",
                                      "Morning",
                                      departTBOFlights
                                    )
                                  }
                                >
                                  <div
                                    className={
                                      selectedDepartTimes.indexOf("Morning") !=
                                      -1
                                        ? "FlightTimes active text-center border py-0 px-1 br-5"
                                        : "FlightTimes text-center border py-0 px-1 br-5"
                                    }
                                  >
                                    <Image
                                      className="mt-2 mb-1 w-auto"
                                      loader={trvLoader}
                                      src="icon/morning-icon.svg"
                                      alt="morning icon"
                                      width={25}
                                      height={25}
                                    />
                                    <p className="mb-1 fs-12">05-12</p>
                                  </div>
                                </div>
                                <div
                                  className="col-3 px-1"
                                  onClick={() =>
                                    applyFilters(
                                      "depart-time",
                                      "Afternoon",
                                      departTBOFlights
                                    )
                                  }
                                >
                                  <div
                                    className={
                                      selectedDepartTimes.indexOf(
                                        "Afternoon"
                                      ) != -1
                                        ? "FlightTimes active text-center border py-0 px-1 br-5"
                                        : "FlightTimes text-center border py-0 px-1 br-5"
                                    }
                                  >
                                    <Image
                                      className="mt-2 mb-1 w-auto"
                                      loader={trvLoader}
                                      src="icon/afternoon-icon.svg"
                                      alt="afternoon icon"
                                      width={25}
                                      height={25}
                                    />
                                    <p className="mb-1 fs-12">12-18</p>
                                  </div>
                                </div>
                                <div
                                  className="col-3 px-1"
                                  onClick={() =>
                                    applyFilters(
                                      "depart-time",
                                      "Evening",
                                      departTBOFlights
                                    )
                                  }
                                >
                                  <div
                                    className={
                                      selectedDepartTimes.indexOf("Evening") !=
                                      -1
                                        ? "FlightTimes active text-center border py-0 px-1 br-5"
                                        : "FlightTimes text-center border py-0 px-1 br-5"
                                    }
                                  >
                                    <Image
                                      className="mt-2 mb-1 w-auto"
                                      loader={trvLoader}
                                      src="icon/evening-icon.svg"
                                      alt="evening icon"
                                      width={25}
                                      height={25}
                                    />
                                    <p className="mb-1 fs-12">18-23</p>
                                  </div>
                                </div>
                                <div
                                  className="col-3 px-1"
                                  onClick={() =>
                                    applyFilters(
                                      "depart-time",
                                      "Night",
                                      departTBOFlights
                                    )
                                  }
                                >
                                  <div
                                    className={
                                      selectedDepartTimes.indexOf("Night") != -1
                                        ? "FlightTimes active text-center border py-0 px-1 br-5"
                                        : "FlightTimes text-center border py-0 px-1 br-5"
                                    }
                                  >
                                    <Image
                                      className="mt-2 mb-1 w-auto"
                                      loader={trvLoader}
                                      src="icon/night-moon-icon.svg"
                                      alt="night-moon icon"
                                      width={25}
                                      height={25}
                                    />
                                    <p className="mb-1 fs-12">23-05</p>
                                  </div>
                                </div>
                              </div>

                              {/* <div className='price-slider pt-3'>
                                <ReactSlider
                                  className="horizontal-slider"
                                  thumbClassName="example-thumb"
                                  trackClassName="example-track"
                                  min={0}
                                  max={24}
                                  value={selectedTimeRange}
                                  onChange={(e) => setSelectedTimeRange(e)}
                                  onAfterChange={(e) => { applyFilters('depart-time', e, flights) }}
                                  step={1}
                                  minDistance={1}
                                />
                                <div className='row mt-3'>
                                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                    <h6 className='mb-0 d-table'>{formatTime(selectedTimeRange[0])}</h6>
                                  </div>
                                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-end'>
                                    <h6 className='mb-0 d-table float-end'>{selectedTimeRange[1] == 24 ? "23:59" : formatTime(selectedTimeRange[1])}</h6>
                                  </div>
                                </div>
                              </div> */}
                            </div>

                            {/* <div className='filter-items py-3 ps-3 pe-3'>
                              <h5 className='sub-title mb-0 dgc'>Return Time From {returnTBOFlights[0].trips[0].listOfFlight[0].airportFromCity}</h5>
                              <div className='price-slider pt-3'>
                                <ReactSlider
                                  className="horizontal-slider"
                                  thumbClassName="example-thumb"
                                  trackClassName="example-track"
                                  min={0}
                                  max={24}
                                  value={selectedReturnTimeRange}
                                  onChange={(e) => setSelectedReturnTimeRange(e)}
                                  // onAfterChange={(e) => { applyReturnFilters('depart-time', e, returnTBOFlights); }}
                                  step={1}
                                  minDistance={1}
                                />
                                <div className='row mt-3'>
                                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                    <h6 className='mb-0 d-table'>{formatTime(selectedReturnTimeRange[0])}</h6>
                                  </div>
                                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-end'>
                                    <h6 className='mb-0 d-table float-end'>{selectedReturnTimeRange[1] == 24 ? "23:59" : formatTime(selectedReturnTimeRange[1])}</h6>
                                  </div>
                                </div>
                              </div>
                            </div> */}

                            {returnTBOFlights.length > 0 && (
                              <div className="filter-items py-3 ps-3 pe-3">
                                <h5 className="sub-title mb-2 dgc">
                                  Return Time from{" "}
                                  {
                                    returnTBOFlights[0].trips[0].listOfFlight[0]
                                      .airportFromCity
                                  }
                                </h5>
                                <div className="row m-0">
                                  <div
                                    className="col-3 px-1"
                                    onClick={() =>
                                      applyFilters(
                                        "return-time",
                                        "Morning",
                                        returnTBOFlights
                                      )
                                    }
                                  >
                                    <div
                                      className={
                                        selectedReturnTimes.indexOf(
                                          "Morning"
                                        ) != -1
                                          ? "FlightTimes active text-center border py-0 px-1 br-5"
                                          : "FlightTimes text-center border py-0 px-1 br-5"
                                      }
                                    >
                                      <Image
                                        className="mt-2 mb-1 w-auto"
                                        loader={trvLoader}
                                        src="icon/morning-icon.svg"
                                        alt="morning icon"
                                        width={25}
                                        height={25}
                                      />
                                      <p className="mb-1 fs-12">05-12</p>
                                    </div>
                                  </div>
                                  <div
                                    className="col-3 px-1"
                                    onClick={() =>
                                      applyFilters(
                                        "return-time",
                                        "Afternoon",
                                        returnTBOFlights
                                      )
                                    }
                                  >
                                    <div
                                      className={
                                        selectedReturnTimes.indexOf(
                                          "Afternoon"
                                        ) != -1
                                          ? "FlightTimes active text-center border py-0 px-1 br-5"
                                          : "FlightTimes text-center border py-0 px-1 br-5"
                                      }
                                    >
                                      <Image
                                        className="mt-2 mb-1 w-auto"
                                        loader={trvLoader}
                                        src="icon/afternoon-icon.svg"
                                        alt="afternoon icon"
                                        width={25}
                                        height={25}
                                      />
                                      <p className="mb-1 fs-12">12-18</p>
                                    </div>
                                  </div>
                                  <div
                                    className="col-3 px-1"
                                    onClick={() =>
                                      applyFilters(
                                        "return-time",
                                        "Evening",
                                        returnTBOFlights
                                      )
                                    }
                                  >
                                    <div
                                      className={
                                        selectedReturnTimes.indexOf(
                                          "Evening"
                                        ) != -1
                                          ? "FlightTimes active text-center border py-0 px-1 br-5"
                                          : "FlightTimes text-center border py-0 px-1 br-5"
                                      }
                                    >
                                      <Image
                                        className="mt-2 mb-1 w-auto"
                                        loader={trvLoader}
                                        src="icon/evening-icon.svg"
                                        alt="evening icon"
                                        width={25}
                                        height={25}
                                      />
                                      <p className="mb-1 fs-12">18-23</p>
                                    </div>
                                  </div>
                                  <div
                                    className="col-3 px-1"
                                    onClick={() =>
                                      applyFilters(
                                        "return-time",
                                        "Night",
                                        returnTBOFlights
                                      )
                                    }
                                  >
                                    <div
                                      className={
                                        selectedReturnTimes.indexOf("Night") !=
                                        -1
                                          ? "FlightTimes active text-center border py-0 px-1 br-5"
                                          : "FlightTimes text-center border py-0 px-1 br-5"
                                      }
                                    >
                                      <Image
                                        className="mt-2 mb-1 w-auto"
                                        loader={trvLoader}
                                        src="icon/night-moon-icon.svg"
                                        alt="night-moon icon"
                                        width={25}
                                        height={25}
                                      />
                                      <p className="mb-1 fs-12">23-05</p>
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
                                            (x) =>
                                              x.value == parseInt(option.value)
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
                                          option.value ==
                                          defaultSortOption.value
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
                                  <h5 className="sub-title mb-2 dgc">
                                    Airlines
                                  </h5>
                                  <div className="form-check">
                                    {pureValidatingCarriers.map(
                                      (carrier, ix) => {
                                        return (
                                          <div
                                            key={ix}
                                            onClick={() => {
                                              applyFilters(
                                                "pure-airline",
                                                carrier,
                                                flights
                                              );
                                            }}
                                          >
                                            <input
                                              className="form-check-input cursor-pointer"
                                              type="checkbox"
                                              checked={
                                                selectedPureAirlines.length >
                                                  0 &&
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
                                      }
                                    )}
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
                                            applyFilters(
                                              "airline",
                                              carrier,
                                              flights
                                            );
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
                                            className="ms-1 w-auto air-icon"
                                            loader={trvLoader}
                                            src="icon/airplane-plus-icon.png"
                                            alt="airplane-plus-icon"
                                            width={176}
                                            height={20}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                          </div>
                          <div className="filter-items pt-3 pb-3 ps-3 pe-3 border-0 d-lg-none fixed-bottom">
                            <div className="row">
                              <div className="col-6 col-sm-6 col-md-6">
                                <button
                                  className="clear-filter btn-primary w-100 br-5 pt-2 pb-2 border-0"
                                  onClick={() => {
                                    setOpenFilters(false);
                                    document.body.classList.remove(
                                      "filter-open"
                                    );
                                    setShowContentLoader(true);
                                    setTimeout(() => {
                                      setShowContentLoader(false);
                                    }, 1000);
                                  }}
                                >
                                  Apply Filters
                                </button>
                              </div>
                              <div className="col-6 col-sm-6 col-md-6">
                                <button
                                  className="clear-filter bg-orange btn-primary w-100 br-5 pt-2 pb-2 border-0"
                                  onClick={() => {
                                    setOpenFilters(false);
                                    document.body.classList.remove(
                                      "filter-open"
                                    );
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
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 col-xxl-9">
                <div className="air-listing-results matrixSlider pt-3 mb-3 position-relative matrix-slider">
                  <div className="row mb-2">
                    <div className="col-9 col-sm-9 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      {flights.length > 0 && (
                        <p className="fs-14 fw-bold mb-2">
                          {flights[0].trips[0].listOfFlight[0].airportFromCity}{" "}
                          to{" "}
                          {
                            flights[0].trips[0].listOfFlight[
                              flights[0].trips[0].listOfFlight.length - 1
                            ].airportToCity
                          }{" "}
                          flights Starting @ Rs. {flights[0].totalPrice}
                        </p>
                      )}

                      {/* {
                        currentFilters && currentFilters.segments && currentFilters.segments.length > 0 &&
                        <div className="search-result-num">
                          {
                            currentFilters.segments.length > 1
                              ? <p className='mb-0 fw-bold'>Showing {filteredFlights.length} flights from {currentFilters.segments[0].fromCode} to {currentFilters.segments[0].toCode} {rtnFilteredFlights.length > 0 && 'and ' + rtnFilteredFlights.length + ' flights from ' + currentFilters.segments[1].fromCode + ' to ' + currentFilters.segments[1].toCode}</p>
                              : <p className='mb-0 fw-bold'>Showing {itemsCounter >= filteredFlights.length ? filteredFlights.length : itemsCounter} flights from {currentFilters.segments[0].fromCode} to {currentFilters.segments[0].toCode} out of {filteredFlights.length}</p>
                          }
                        </div>
                      } */}
                    </div>
                  </div>

                  {/* {
                    matrixAirlines && matrixAirlines.length > 0 &&
                    <Slider className='matrixSlider ' {...sliderSettings}>
                      {
                        matrixAirlines.map((carrier, indx) => {
                          return (
                            <div className={((selectedAirlines.findIndex(x => x.name == carrier.name && x.connectingAirlines == carrier.connectingAirlines) > -1) || (selectedPureAirlines.findIndex(x => x.name == carrier.name && x.connectingAirlines == carrier.connectingAirlines) > -1)) ? 'slider-items open-active' : 'slider-items'}
                              key={indx}
                              onClick={() => applyFilters(carrier.connectingAirlines ? 'airline' : 'pure-airline', carrier, flights)}>
                              <div className='d-flex bg-white p-2 align-items-center position-relative border'>
                                <div className='slide-img me-2'>
                                  <Image
                                    key={indx}
                                    loader={airlineLogoLoader}
                                    src={"airline-logo/" + (carrier.code) + ".webp"}
                                    height="40"
                                    width="40"
                                    objectFit='contain'
                                    quality={100}
                                    alt="airline logo"
                                  />
                                </div>
                                <div className='slide-cont '>
                                  <h6 className='mb-1 fs-14'>{carrier.name}</h6>
                                  {
                                    carrier.connectingAirlines == true &&
                                    <Image
                                      className="ms-1 w-auto air-icon position-absolute end-0 top-0 me-1 mt-1"
                                      loader={trvLoader}
                                      src="icon/airplane-plus-icon.png"
                                      alt="airplane-plus-icon"
                                      width={176}
                                      height={16}
                                    />
                                  }
                                  <h5 className='mb-0 fs-14 fw-bold color-blue'>{numberFormat(carrier.price).split(".")[0]}<sup>.{numberFormat(carrier.price).split(".")[1]}</sup></h5>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </Slider>
                  } */}
                  {/* <div className="metrix-clear-filter">
                    {
                      ((selectedAirlines && selectedAirlines.length > 0)
                        || (selectedPureAirlines && selectedPureAirlines.length > 0))
                      &&
                      <button className='bg-light-orange border-orange border rounded-2 py-2 px-3 fs-12 mb-3' onClick={() => clearFilters()}>Clear All Filters</button>
                    }
                  </div> */}
                  <div className="row">
                    <div className="col-12">
                      <OffersMatrix></OffersMatrix>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="note-bar br-5 ps-3 pt-3 pe-3 pb-3">
                        <p className="mb-0">
                          <strong>Note:</strong> * All the fares displayed are
                          for{" "}
                          {currentFilters &&
                          currentFilters.segments &&
                          currentFilters.segments.length > 1
                            ? "Round Trip"
                            : "One Way"}{" "}
                          and are in INR, inclusive of base fare, taxes and
                          service fees.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="air-flight-listing mt-3">
                    {currentFilters.segments.length == 1 &&
                      filteredFlights.length > 0 &&
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
                          let timeOfDay = getTimeOfDay(
                            flight.trips[0].listOfFlight[0].departureTime
                          );
                          let timeIcon = "";
                          if (timeOfDay == "Morning")
                            timeIcon =
                              "https://assets.neofares.com/all-icon/morning-icon.svg";
                          else if (timeOfDay == "Afternoon")
                            timeIcon =
                              "https://assets.neofares.com/all-icon/afternoon-icon.svg";
                          else if (timeOfDay == "Evening")
                            timeIcon =
                              "https://assets.neofares.com/all-icon/evening-icon.svg";
                          else
                            timeIcon =
                              "https://assets.neofares.com/all-icon/night-moon-icon.svg";

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
                                    x.airlineName.toLowerCase() !=
                                      x.operatedBy.toLowerCase() &&
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
                          return (
                            <div
                              className="regular-flight-wrp"
                              key={flightIndex}
                            >
                              {currentFilters &&
                                currentFilters.segments &&
                                currentFilters.segments.length == 1 && (
                                  <div className="regular-one-trip listing-com">
                                    <div className="regular-flight-round-box mt-4 mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 both-flight-box">
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
                                                        className="ms-1 w-auto air-icon"
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
                                                <div className="col-10 col-sm-10 col-md-9 col-lg-8 col-xl-9 col-xxl-9 pe-0 ps-0">
                                                  <div className="row align-items-center">
                                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                      <h4 className="airport-code mb-0 text-start w-100 dgc">
                                                        {getFormattedTime(
                                                          flight.trips[0]
                                                            .listOfFlight[0]
                                                            .departureTime
                                                        )}
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
                                                                    Duration:{" "}
                                                                  </strong>
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
                                                      <h4 className="airport-code mb-0 justify-content-end dgc position-relative d-flex">
                                                        <span className="flight-plus-air position-relative">
                                                          <span className="tooltip-box cursor-pointer float-end">
                                                            {getFormattedTime(
                                                              flight.trips[0]
                                                                .listOfFlight[
                                                                flight.trips[0]
                                                                  .listOfFlight
                                                                  .length - 1
                                                              ].arrivalTime
                                                            )}
                                                          </span>
                                                        </span>
                                                        {departDays > 0 && (
                                                          <span className="flight-plus-air plusone position-relative oneway-plus">
                                                            <span className="tooltip-box cursor-pointer fs-10 color-red">
                                                              +{departDays}
                                                            </span>
                                                            <span className="tooltip-hover-top">
                                                              <strong>
                                                                Flight Arrival -{" "}
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
                                                      </h4>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {/* {
                                          displayOperatedBy && displayOperatedBy.length > 0 &&
                                          <div className='row'>
                                            <div className='col-sm-12'>
                                              <h6 className='operated-by mb-0 mt-3'>Operated by: {displayOperatedBy.join(", ")}</h6>
                                            </div>
                                          </div>
                                        } */}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 ps-0">
                                          <div className="air-flight-price text-end">
                                            <h2 className="mb-0 dgc">
                                              {
                                                numberFormat(avgPrice).split(
                                                  "."
                                                )[0]
                                              }
                                            </h2>
                                            <h6 className="mb-2 mt-2">
                                              {totalPassangers > 1
                                                ? "Avg. Price Per Traveler"
                                                : "Per Adult"}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="air-flight-btn-and-bag mt-1 pt-2">
                                        <div className="row align-items-center">
                                          <div className="col-8 col-sm-8 col-md-5 col-lg-5 col-xl-5 col-xxl-5 pe-0">
                                            <div className="details-icon-btns d-flex">
                                              <div className="me-3 ">
                                                <div className="dropdown dropdown-hover">
                                                  <button
                                                    className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                    type="button"
                                                    id="carddetail-info"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="true"
                                                    onClick={(e) =>
                                                      e.stopPropagation()
                                                    }
                                                  >
                                                    <Image
                                                      className="h-auto"
                                                      loader={trvLoader}
                                                      src={
                                                        flight.isRefundable
                                                          ? "icon/refundable-icon.svg"
                                                          : "icon/non-refundable.svg"
                                                      }
                                                      alt="refundable icon"
                                                      width={20}
                                                      height={43}
                                                    />
                                                    <p
                                                      className={
                                                        flight.isRefundable
                                                          ? "mb-0 fs-12 fw-bold color-green ms-2"
                                                          : "mb-0 fs-12 fw-bold color-red ms-2"
                                                      }
                                                    >
                                                      {flight.isRefundable
                                                        ? "R"
                                                        : "N"}
                                                    </p>
                                                  </button>
                                                  <div
                                                    className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                    aria-labelledby="carddetail-info"
                                                    data-popper-placement="top-start"
                                                  >
                                                    <p className="mb-0 bg-black fs-12 color-white br-5 p-2">
                                                      {flight.isRefundable
                                                        ? "Partially Refundable"
                                                        : "Non-Refundable"}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="me-3">
                                                <div className="dropdown dropdown-hover">
                                                  <button
                                                    className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                    type="button"
                                                    id="carddetail-info"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="true"
                                                    onClick={(e) =>
                                                      e.stopPropagation()
                                                    }
                                                  >
                                                    <Image
                                                      className="h-auto"
                                                      loader={trvLoader}
                                                      src="icon/seat-red-icon.svg"
                                                      alt="seat icon"
                                                      width={20}
                                                      height={43}
                                                    />
                                                    <p className="mb-0 fs-12 fw-bold color-red ms-2">
                                                      {
                                                        flight.trips[0]
                                                          .listOfFlight[0].seats
                                                      }{" "}
                                                      Left
                                                    </p>
                                                  </button>
                                                  <div
                                                    className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                    aria-labelledby="carddetail-info"
                                                    data-popper-placement="top-start"
                                                  >
                                                    <p className="mb-0 bg-black fs-12 color-white br-5 p-2">
                                                      Hurry! Only{" "}
                                                      {
                                                        flight.trips[0]
                                                          .listOfFlight[0].seats
                                                      }{" "}
                                                      Seat(s) Left
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="me-0">
                                                <div className="dropdown dropdown-hover">
                                                  <button
                                                    className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                    type="button"
                                                    id="carddetail-info"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="true"
                                                    onClick={(e) =>
                                                      e.stopPropagation()
                                                    }
                                                  >
                                                    <Image
                                                      className="h-auto"
                                                      loader={sfLoader}
                                                      src={timeIcon}
                                                      height={20}
                                                      width={20}
                                                    />
                                                    <p className="mb-0 fs-12 fw-bold color-black ms-2">
                                                      {timeOfDay}
                                                    </p>
                                                  </button>
                                                  <div
                                                    className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                    aria-labelledby="carddetail-info"
                                                    data-popper-placement="top-start"
                                                  >
                                                    <p className="mb-0 bg-black fs-12 color-white br-5 p-2">
                                                      {timeOfDay} Flight
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-4 col-sm-4 col-md-7 col-lg-7 col-xl-7 col-xxl-7">
                                            <div className="air-flight-price text-end">
                                              <button
                                                className="bg-orange color-white rounded-2 fs-14 py-2 px-4 border-0 float-end text-center"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleBookFlight(
                                                    flightIndex,
                                                    flight,
                                                    avgPrice,
                                                    totalPax
                                                  );
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
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          );
                        })}
                    {currentFilters.segments.length == 1 &&
                      filteredFlights.length == 0 && (
                        <div className="noResultFound">
                          <div className="d-flex align-items-center bg-white p-3 br-10 mt-3">
                            <span>
                              <Image
                                className="w-auto h-auto"
                                loader={trvLoader}
                                src="icon/timer-icon.svg"
                                alt="timer icon"
                                width={100}
                                height={43}
                              />
                            </span>
                            <div className="ps-3">
                              <h6 className="fw-bold mb-0">No Result Found!</h6>
                              <p className="mb-0 fs-14">
                                Please try a different filtering combination!
                              </p>
                              <button
                                className="transparent-btn clear-filter-btn"
                                onClick={() => clearFilters()}
                              >
                                Reset Filters
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                    {currentFilters &&
                      currentFilters.segments &&
                      currentFilters.segments.length == 2 && (
                        <>
                          <div className="custom-flight-wrp d-lg-none">
                            <div className="custom-round-trip listing-com">
                              <div className="custom-view-round-trip-box">
                                <div className="custom-view-round-trip-box-main">
                                  <div className="row">
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 departCustomList">
                                      <div className="depart listing-banner p-3 br-10">
                                        <div className="row align-items-center">
                                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 pe-0">
                                            <h6 className="color-white mb-0">
                                              Depart |{" "}
                                              {getFormattedDate4(
                                                currentFilters.segments[0]
                                                  .departureDate
                                              )}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                      {filteredFlights.map(
                                        (flight, flightIndex) => {
                                          let deptDate = new Date(
                                            flight.trips[0].listOfFlight[0].departeddate
                                          );
                                          let arrDate = new Date(
                                            flight.trips[0].listOfFlight[
                                              flight.trips[0].listOfFlight
                                                .length - 1
                                            ].arrivalAt
                                          );
                                          let difference =
                                            arrDate.getTime() -
                                            deptDate.getTime();
                                          let departDays = Math.ceil(
                                            difference / (1000 * 3600 * 24)
                                          );
                                          let flightPrice = Math.round(
                                            flight.totalPrice
                                          );
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
                                                    x.airlineName.toLowerCase() !=
                                                      x.operatedBy.toLowerCase() &&
                                                    !!x.operatedBy
                                                )
                                                .map((x) => x.operatedBy)
                                            ),
                                          ];
                                          let timeOfDay = getTimeOfDay(
                                            flight.trips[0].listOfFlight[0]
                                              .departureTime
                                          );
                                          let timeIcon = "";
                                          if (timeOfDay == "Morning")
                                            timeIcon =
                                              "https://assets.neofares.com/all-icon/morning-icon.svg";
                                          else if (timeOfDay == "Afternoon")
                                            timeIcon =
                                              "https://assets.neofares.com/all-icon/afternoon-icon.svg";
                                          else if (timeOfDay == "Evening")
                                            timeIcon =
                                              "https://assets.neofares.com/all-icon/evening-icon.svg";
                                          else
                                            timeIcon =
                                              "https://assets.neofares.com/all-icon/night-moon-icon.svg";

                                          return (
                                            <div
                                              className={
                                                flight.resultIndex ==
                                                  selectedDepartTBOFlight.resultIndex &&
                                                flight.traceId ==
                                                  selectedDepartTBOFlight.traceId
                                                  ? "regular-flight-round-box mobile mt-4 mb-4 active-selected"
                                                  : "regular-flight-round-box mt-4 mb-4"
                                              }
                                              key={flightIndex}
                                              onClick={() => {
                                                let currentFlight =
                                                  cloneData(flight);
                                                currentFlight.departDays =
                                                  departDays;
                                                currentFlight.totalPassengers =
                                                  totalPax;
                                                currentFlight.displayCabin =
                                                  getDisplayCabin(
                                                    parseInt(
                                                      currentFilters.cabin
                                                    )
                                                  );
                                                currentFlight.avgPrice =
                                                  avgPrice;
                                                currentFlight.timeOfDay =
                                                  timeOfDay;
                                                currentFlight.timeIcon =
                                                  timeIcon;
                                                setSelectedDepartTBOFlight(
                                                  currentFlight
                                                );
                                              }}
                                            >
                                              <div className="row align-items-center">
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                  <div className="air-flight-logo text-start">
                                                    <Image
                                                      className="h-auto"
                                                      loader={airlineLogoLoader}
                                                      src={`airline-logo/${flight.trips[0].validatingCarrier.code}.webp`}
                                                      height={20}
                                                      width={20}
                                                    />
                                                    <span>
                                                      {
                                                        flight.trips[0]
                                                          .validatingCarrier
                                                          .name
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                                                  <div className="air-flight-price text-end">
                                                    <h2 className="mb-0 dgc">
                                                      {
                                                        numberFormat(
                                                          avgPrice
                                                        ).split(".")[0]
                                                      }
                                                    </h2>
                                                    <h6 className="mb-0 mt-1">
                                                      per Traveler
                                                    </h6>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row align-items-center">
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                  <h4 className="airport-code mb-0 text-start w-100 dgc">
                                                    {getFormattedTime(
                                                      flight.trips[0]
                                                        .listOfFlight[0]
                                                        .departureTime
                                                    )}
                                                  </h4>
                                                </div>
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0">
                                                  <div className="from-to-from-digination">
                                                    {flight.trips[0]
                                                      .listOfFlight.length <=
                                                      3 && (
                                                      <h5 className="mb-0 text-center">
                                                        {flight.trips[0].listOfFlight.map(
                                                          (t, ix) => {
                                                            if (
                                                              ix >=
                                                              flight.trips[0]
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
                                                  </div>
                                                </div>
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                  <h4 className="airport-code mb-0 text-end w-100 dgc position-relative">
                                                    {getFormattedTime(
                                                      flight.trips[0]
                                                        .listOfFlight[
                                                        flight.trips[0]
                                                          .listOfFlight.length -
                                                          1
                                                      ].arrivalTime
                                                    )}
                                                    {departDays > 0 && (
                                                      <span className="flight-plus-air position-absolute end-0 pt-md-3 pt-lg-0">
                                                        <span className="tooltip-box cursor-pointer color-red fs-10 plusone">
                                                          +{departDays}
                                                        </span>
                                                      </span>
                                                    )}
                                                  </h4>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col-sm-12">
                                                  <div className="from-to-from-digination">
                                                    <h6 className="text-start mb-0 mt-2">
                                                      {getDiffFromMinutes(
                                                        flight.trips[0]
                                                          .totalTripTime
                                                      )}
                                                      ,{" "}
                                                      {flight.trips[0]
                                                        .listOfFlight.length ==
                                                      1
                                                        ? "Non-Stop"
                                                        : flight.trips[0]
                                                            .listOfFlight
                                                            .length -
                                                          1 +
                                                          (flight.trips[0]
                                                            .listOfFlight
                                                            .length == 2
                                                            ? " Stop"
                                                            : " Stops")}
                                                    </h6>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row align-items-center">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                  {/* {
                                                displayOperatedBy && displayOperatedBy.length > 0 &&
                                                <div className='row'>
                                                  <div className='col-sm-12'>
                                                    <h6 className='operated-by mb-0 mt-3'>Operated by: {displayOperatedBy.join(", ")}</h6>
                                                  </div>
                                                </div>
                                              } */}
                                                </div>
                                              </div>
                                              <div className="air-flight-btn-and-bag mt-1 pt-2">
                                                <div className="row align-items-center">
                                                  <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5 pe-0">
                                                    <div className="details-icon-btns d-flex">
                                                      <div className="me-3 ">
                                                        <div className="dropdown dropdown-hover">
                                                          <button
                                                            className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                            type="button"
                                                            id="carddetail-info"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="true"
                                                            onClick={(e) =>
                                                              e.stopPropagation()
                                                            }
                                                          >
                                                            <Image
                                                              className="h-auto"
                                                              loader={trvLoader}
                                                              src={
                                                                flight.isRefundable
                                                                  ? "icon/refundable-icon.svg"
                                                                  : "icon/non-refundable.svg"
                                                              }
                                                              alt="payment sucess icon"
                                                              width={20}
                                                              height={43}
                                                            />
                                                          </button>
                                                          <div
                                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                            aria-labelledby="carddetail-info"
                                                            data-popper-placement="top-start"
                                                          >
                                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                                              {flight.isRefundable
                                                                ? "Partially Refundable"
                                                                : "Non-Refundable"}
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="me-3">
                                                        <div className="dropdown dropdown-hover">
                                                          <button
                                                            className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                            type="button"
                                                            id="carddetail-info"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="true"
                                                            onClick={(e) =>
                                                              e.stopPropagation()
                                                            }
                                                          >
                                                            <Image
                                                              className="h-auto"
                                                              loader={trvLoader}
                                                              src="icon/seat-red-icon.svg"
                                                              alt="seat icon"
                                                              width={20}
                                                              height={43}
                                                            />
                                                          </button>
                                                          <div
                                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                            aria-labelledby="carddetail-info"
                                                            data-popper-placement="top-start"
                                                          >
                                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                                              Hurry! Only{" "}
                                                              {
                                                                flight.trips[0]
                                                                  .listOfFlight[0]
                                                                  .seats
                                                              }{" "}
                                                              Seat(s) Left
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="me-0">
                                                        <div className="dropdown dropdown-hover">
                                                          <button
                                                            className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                            type="button"
                                                            id="carddetail-info"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="true"
                                                            onClick={(e) =>
                                                              e.stopPropagation()
                                                            }
                                                          >
                                                            <Image
                                                              className="h-auto"
                                                              loader={sfLoader}
                                                              src={timeIcon}
                                                              height={20}
                                                              width={20}
                                                            />
                                                          </button>
                                                          <div
                                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                            aria-labelledby="carddetail-info"
                                                            data-popper-placement="top-start"
                                                          >
                                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                                              {timeOfDay} Flight
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-7">
                                                    <div className="air-flight-price text-end">
                                                      <button
                                                        className="btn-style1 border-0 p-0 float-end text-end"
                                                        data-bs-toggle="offcanvas"
                                                        data-bs-target="#offcanvasRight"
                                                        aria-controls="offcanvasRight"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          let fl =
                                                            cloneData(flight);
                                                          fl.avgPrice =
                                                            avgPrice;
                                                          setFlightForFlap(fl);
                                                          setRtnFlightForFlap(
                                                            null
                                                          );
                                                          setShowContinueBtn(
                                                            false
                                                          );
                                                        }}
                                                      >
                                                        Details
                                                        <i className="fa-solid fa-chevron-right"></i>
                                                      </button>
                                                    </div>
                                                  </div> */}
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 returnCustomList">
                                      <div className="return listing-banner p-3 br-10">
                                        <div className="row align-items-center">
                                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 pe-0">
                                            <h6 className="color-white mb-0">
                                              Return |{" "}
                                              {getFormattedDate4(
                                                currentFilters.segments[1]
                                                  .departureDate
                                              )}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                      {rtnFilteredFlights.map(
                                        (flight, flightIndex) => {
                                          let deptDate = new Date(
                                            flight.trips[0].listOfFlight[0].departeddate
                                          );
                                          let arrDate = new Date(
                                            flight.trips[0].listOfFlight[
                                              flight.trips[0].listOfFlight
                                                .length - 1
                                            ].arrivalAt
                                          );
                                          let difference =
                                            arrDate.getTime() -
                                            deptDate.getTime();
                                          let departDays = Math.ceil(
                                            difference / (1000 * 3600 * 24)
                                          );
                                          let flightPrice = Math.round(
                                            flight.totalPrice
                                          );
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
                                                    x.airlineName.toLowerCase() !=
                                                      x.operatedBy.toLowerCase() &&
                                                    !!x.operatedBy
                                                )
                                                .map((x) => x.operatedBy)
                                            ),
                                          ];
                                          let timeOfDay = getTimeOfDay(
                                            flight.trips[0].listOfFlight[0]
                                              .departureTime
                                          );
                                          let timeIcon = "";
                                          if (timeOfDay == "Morning")
                                            timeIcon =
                                              "https://assets.neofares.com/all-icon/morning-icon.svg";
                                          else if (timeOfDay == "Afternoon")
                                            timeIcon =
                                              "https://assets.neofares.com/all-icon/afternoon-icon.svg";
                                          else if (timeOfDay == "Evening")
                                            timeIcon =
                                              "https://assets.neofares.com/all-icon/evening-icon.svg";
                                          else
                                            timeIcon =
                                              "https://assets.neofares.com/all-icon/night-moon-icon.svg";

                                          return (
                                            <div
                                              className={
                                                flight.resultIndex ==
                                                  selectedReturnTBOFlight.resultIndex &&
                                                flight.traceId ==
                                                  selectedReturnTBOFlight.traceId
                                                  ? "regular-flight-round-box mobile mt-4 mb-4 active-selected"
                                                  : "regular-flight-round-box mt-4 mb-4"
                                              }
                                              key={flightIndex}
                                              onClick={() => {
                                                let currentFlight =
                                                  cloneData(flight);
                                                currentFlight.departDays =
                                                  departDays;
                                                currentFlight.totalPassengers =
                                                  totalPax;
                                                currentFlight.displayCabin =
                                                  getDisplayCabin(
                                                    parseInt(
                                                      currentFilters.cabin
                                                    )
                                                  );
                                                currentFlight.avgPrice =
                                                  avgPrice;
                                                currentFlight.timeOfDay =
                                                  timeOfDay;
                                                currentFlight.timeIcon =
                                                  timeIcon;
                                                setSelectedReturnTBOFlight(
                                                  currentFlight
                                                );
                                              }}
                                            >
                                              <div className="row align-items-center">
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                  <div className="air-flight-logo text-start">
                                                    <Image
                                                      className="h-auto"
                                                      loader={airlineLogoLoader}
                                                      src={`airline-logo/${flight.trips[0].validatingCarrier.code}.webp`}
                                                      height={20}
                                                      width={20}
                                                    />
                                                    <span>
                                                      {
                                                        flight.trips[0]
                                                          .validatingCarrier
                                                          .name
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                                                  <div className="air-flight-price text-end">
                                                    <h2 className="mb-0 dgc">
                                                      {
                                                        numberFormat(
                                                          avgPrice
                                                        ).split(".")[0]
                                                      }
                                                    </h2>
                                                    <h6 className="mb-0 mt-1">
                                                      per Traveler
                                                    </h6>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row align-items-center">
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                  <h4 className="airport-code mb-0 text-start w-100 dgc">
                                                    {getFormattedTime(
                                                      flight.trips[0]
                                                        .listOfFlight[0]
                                                        .departureTime
                                                    )}
                                                  </h4>
                                                </div>
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0">
                                                  <div className="from-to-from-digination">
                                                    {flight.trips[0]
                                                      .listOfFlight.length <=
                                                      3 && (
                                                      <h5 className="mb-0 text-center">
                                                        {flight.trips[0].listOfFlight.map(
                                                          (t, ix) => {
                                                            if (
                                                              ix >=
                                                              flight.trips[0]
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
                                                  </div>
                                                </div>
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                  <h4 className="airport-code mb-0 text-end w-100 dgc position-relative">
                                                    {getFormattedTime(
                                                      flight.trips[0]
                                                        .listOfFlight[
                                                        flight.trips[0]
                                                          .listOfFlight.length -
                                                          1
                                                      ].arrivalTime
                                                    )}
                                                    {departDays > 0 && (
                                                      <span className="flight-plus-air position-absolute end-0 pt-md-3 pt-lg-0">
                                                        <span className="tooltip-box cursor-pointer color-red fs-10 plusone">
                                                          +{departDays}
                                                        </span>
                                                      </span>
                                                    )}
                                                  </h4>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col-sm-12">
                                                  <div className="from-to-from-digination">
                                                    <h6 className="text-start mb-0 mt-2">
                                                      {getDiffFromMinutes(
                                                        flight.trips[0]
                                                          .totalTripTime
                                                      )}
                                                      ,{" "}
                                                      {flight.trips[0]
                                                        .listOfFlight.length ==
                                                      1
                                                        ? "Non-Stop"
                                                        : flight.trips[0]
                                                            .listOfFlight
                                                            .length -
                                                          1 +
                                                          (flight.trips[0]
                                                            .listOfFlight
                                                            .length == 2
                                                            ? " Stop"
                                                            : " Stops")}
                                                    </h6>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row align-items-center">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                  {/* {
                                                displayOperatedBy && displayOperatedBy.length > 0 &&
                                                <div className='row'>
                                                  <div className='col-sm-12'>
                                                    <h6 className='operated-by mb-0 mt-3'>Operated by: {displayOperatedBy.join(", ")}</h6>
                                                  </div>
                                                </div>
                                              } */}
                                                </div>
                                              </div>
                                              <div className="air-flight-btn-and-bag mt-1 pt-2">
                                                <div className="row align-items-center">
                                                  <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5 pe-0">
                                                    <div className="details-icon-btns d-flex">
                                                      <div className="me-3 ">
                                                        <div className="dropdown dropdown-hover">
                                                          <button
                                                            className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                            type="button"
                                                            id="carddetail-info"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="true"
                                                            onClick={(e) =>
                                                              e.stopPropagation()
                                                            }
                                                          >
                                                            <Image
                                                              className="h-auto"
                                                              loader={trvLoader}
                                                              src={
                                                                flight.isRefundable
                                                                  ? "icon/refundable-icon.svg"
                                                                  : "icon/non-refundable.svg"
                                                              }
                                                              alt="payment sucess icon"
                                                              width={20}
                                                              height={43}
                                                            />
                                                          </button>
                                                          <div
                                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                            aria-labelledby="carddetail-info"
                                                            data-popper-placement="top-start"
                                                          >
                                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                                              {flight.isRefundable
                                                                ? "Partially Refundable"
                                                                : "Non-Refundable"}
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="me-3">
                                                        <div className="dropdown dropdown-hover">
                                                          <button
                                                            className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                            type="button"
                                                            id="carddetail-info"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="true"
                                                            onClick={(e) =>
                                                              e.stopPropagation()
                                                            }
                                                          >
                                                            <Image
                                                              className="h-auto"
                                                              loader={trvLoader}
                                                              src="icon/seat-red-icon.svg"
                                                              alt="seat icon"
                                                              width={20}
                                                              height={43}
                                                            />
                                                          </button>
                                                          <div
                                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                            aria-labelledby="carddetail-info"
                                                            data-popper-placement="top-start"
                                                          >
                                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                                              Hurry! Only{" "}
                                                              {
                                                                flight.trips[0]
                                                                  .listOfFlight[0]
                                                                  .seats
                                                              }{" "}
                                                              Seat(s) Left
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="me-0">
                                                        <div className="dropdown dropdown-hover">
                                                          <button
                                                            className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                            type="button"
                                                            id="carddetail-info"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="true"
                                                            onClick={(e) =>
                                                              e.stopPropagation()
                                                            }
                                                          >
                                                            <Image
                                                              className="h-auto"
                                                              loader={sfLoader}
                                                              src={timeIcon}
                                                              height={20}
                                                              width={20}
                                                            />
                                                          </button>
                                                          <div
                                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                            aria-labelledby="carddetail-info"
                                                            data-popper-placement="top-start"
                                                          >
                                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                                              {timeOfDay} Flight
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* <div className='col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-7'>
                                                <div className='air-flight-price text-end'>
                                                  <button className='btn-style1 border-0 p-0 float-end text-end' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={(e) => {
                                                    e.stopPropagation();
                                                    let fl = cloneData(flight);
                                                    fl.avgPrice = avgPrice;
                                                    setFlightForFlap(fl);
                                                    setRtnFlightForFlap(null);
                                                    setShowContinueBtn(false);
                                                  }}>Details <i className="fa-solid fa-chevron-right"></i></button>
                                                </div>
                                              </div> */}
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="custom-flight-wrp d-none d-lg-inline">
                            <div className="custom-round-trip listing-com">
                              <div className="custom-view-round-trip-box">
                                <div className="custom-view-round-trip-box-main">
                                  <div className="row">
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                      <div className="depart listing-banner p-2 rounded-2">
                                        <div className="row align-items-center">
                                          <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-7 pe-0">
                                            <h6 className="color-white">
                                              Depart |{" "}
                                              {getFormattedDate4(
                                                currentFilters.segments[0]
                                                  .departureDate
                                              )}
                                            </h6>
                                            <h5 className="color-white mb-0">
                                              {departTBOFlights.length > 0 &&
                                                departTBOFlights[0].trips[0]
                                                  .listOfFlight[0]
                                                  .airportFromCity}{" "}
                                              -{" "}
                                              {departTBOFlights.length > 0 &&
                                                departTBOFlights[0].trips[0]
                                                  .listOfFlight[
                                                  departTBOFlights[0].trips[0]
                                                    .listOfFlight.length - 1
                                                ].airportToCity}
                                            </h5>
                                          </div>
                                          <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                            <Image
                                              className="w-100"
                                              loader={trvLoader}
                                              src="icon/depart-flight-img.svg"
                                              alt="depart-flight-img"
                                              width={162}
                                              height={50}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-12"></div>
                                      </div>
                                      {filteredFlights.length > 0 ? (
                                        filteredFlights.map(
                                          (flight, flightIndex) => {
                                            let deptDate = new Date(
                                              flight.trips[0].listOfFlight[0].departeddate
                                            );
                                            let arrDate = new Date(
                                              flight.trips[0].listOfFlight[
                                                flight.trips[0].listOfFlight
                                                  .length - 1
                                              ].arrivalAt
                                            );
                                            let difference =
                                              arrDate.getTime() -
                                              deptDate.getTime();
                                            let departDays = Math.ceil(
                                              difference / (1000 * 3600 * 24)
                                            );
                                            let flightPrice = Math.round(
                                              flight.totalPrice
                                            );
                                            let layoverCounter = 0;
                                            let totalPassangers = 0;
                                            let totalPax = 0;
                                            flight.fareDetails.forEach(
                                              (fare) => {
                                                totalPax += fare.noofPax;
                                                if (fare.totalFareAmount > 0) {
                                                  totalPassangers +=
                                                    fare.noofPax;
                                                }
                                              }
                                            );
                                            let avgPrice = Math.round(
                                              flightPrice / totalPassangers
                                            );
                                            var displayOperatedBy = [
                                              ...new Set(
                                                flight.trips[0].listOfFlight
                                                  .filter(
                                                    (x) =>
                                                      x.airlineName.toLowerCase() !=
                                                        x.operatedBy.toLowerCase() &&
                                                      !!x.operatedBy
                                                  )
                                                  .map((x) => x.operatedBy)
                                              ),
                                            ];
                                            let timeOfDay = getTimeOfDay(
                                              flight.trips[0].listOfFlight[0]
                                                .departureTime
                                            );
                                            let timeIcon = "";
                                            if (timeOfDay == "Morning")
                                              timeIcon =
                                                "https://assets.neofares.com/all-icon/morning-icon.svg";
                                            else if (timeOfDay == "Afternoon")
                                              timeIcon =
                                                "https://assets.neofares.com/all-icon/afternoon-icon.svg";
                                            else if (timeOfDay == "Evening")
                                              timeIcon =
                                                "https://assets.neofares.com/all-icon/evening-icon.svg";
                                            else
                                              timeIcon =
                                                "https://assets.neofares.com/all-icon/night-moon-icon.svg";

                                            return (
                                              <div
                                                className={
                                                  flight.resultIndex ==
                                                    selectedDepartTBOFlight.resultIndex &&
                                                  flight.traceId ==
                                                    selectedDepartTBOFlight.traceId
                                                    ? "regular-flight-round-box mt-4 mb-4 active-selected"
                                                    : "regular-flight-round-box mt-4 mb-4"
                                                }
                                                key={flightIndex}
                                                onClick={() => {
                                                  let currentFlight =
                                                    cloneData(flight);
                                                  currentFlight.departDays =
                                                    departDays;
                                                  currentFlight.totalPassengers =
                                                    totalPax;
                                                  currentFlight.displayCabin =
                                                    getDisplayCabin(
                                                      parseInt(
                                                        currentFilters.cabin
                                                      )
                                                    );
                                                  currentFlight.avgPrice =
                                                    avgPrice;
                                                  currentFlight.timeOfDay =
                                                    timeOfDay;
                                                  currentFlight.timeIcon =
                                                    timeIcon;
                                                  setSelectedDepartTBOFlight(
                                                    currentFlight
                                                  );
                                                }}
                                              >
                                                <div className="color-white gds-code">
                                                  {flight.gdsHiddenId}
                                                </div>

                                                <div className="row align-items-center">
                                                  <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 both-flight-box">
                                                    <div className="row align-items-center">
                                                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <div className="row align-items-center">
                                                          <div className="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                            <div className="air-flight-logo text-start">
                                                              <Image
                                                                className="h-auto"
                                                                loader={
                                                                  airlineLogoLoader
                                                                }
                                                                src={`airline-logo/${flight.trips[0].validatingCarrier.code}.webp`}
                                                                alt="payment sucess icon"
                                                                width={20}
                                                                height={43}
                                                              />

                                                              <span>
                                                                {
                                                                  flight
                                                                    .trips[0]
                                                                    .validatingCarrier
                                                                    .name
                                                                }
                                                              </span>
                                                            </div>
                                                          </div>
                                                          <div className="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-9 col-xxl-9 pe-0 ps-0">
                                                            <div className="row align-items-center">
                                                              <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                                <h4 className="airport-code mb-0 dgc position-relative">
                                                                  <span className="flight-plus-air">
                                                                    <span className="tooltip-box cursor-pointer">
                                                                      {getFormattedTime(
                                                                        flight
                                                                          .trips[0]
                                                                          .listOfFlight[0]
                                                                          .departureTime
                                                                      )}
                                                                    </span>
                                                                  </span>
                                                                </h4>
                                                              </div>
                                                              <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0">
                                                                <div className="from-to-from-digination ">
                                                                  <div className="dropdown dropdown-hover">
                                                                    <button
                                                                      className="btn btn-secondary dropdown-toggle after-none bg-transparent border-0 p-0 w-100"
                                                                      type="button"
                                                                      id="dropdownMenuButton1"
                                                                      data-bs-toggle=""
                                                                      aria-expanded=""
                                                                    >
                                                                      <h6 className="text-center mb-0">
                                                                        {getDiffFromMinutes(
                                                                          flight
                                                                            .trips[0]
                                                                            .totalTripTime
                                                                        )}
                                                                      </h6>
                                                                      {flight
                                                                        .trips[0]
                                                                        .listOfFlight
                                                                        .length <=
                                                                        3 && (
                                                                        <h5 className="mb-0 text-center">
                                                                          {flight.trips[0].listOfFlight.map(
                                                                            (
                                                                              t,
                                                                              ix
                                                                            ) => {
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
                                                                                    key={
                                                                                      ix
                                                                                    }
                                                                                  ></Fragment>
                                                                                );
                                                                              return (
                                                                                <span
                                                                                  key={
                                                                                    ix
                                                                                  }
                                                                                ></span>
                                                                              );
                                                                            }
                                                                          )}
                                                                        </h5>
                                                                      )}
                                                                      <h6 className="text-center mb-0">
                                                                        {flight
                                                                          .trips[0]
                                                                          .listOfFlight
                                                                          .length ==
                                                                        1
                                                                          ? "Non-Stop"
                                                                          : flight
                                                                              .trips[0]
                                                                              .listOfFlight
                                                                              .length -
                                                                            1 +
                                                                            (flight
                                                                              .trips[0]
                                                                              .listOfFlight
                                                                              .length ==
                                                                            2
                                                                              ? " Stop"
                                                                              : " Stops")}
                                                                      </h6>
                                                                    </button>
                                                                    <ul
                                                                      className="dropdown-menu bg-black border-0 color-white fs-12"
                                                                      aria-labelledby="dropdownMenuButton1"
                                                                    >
                                                                      <li className="ps-2 pe-2 fs-12">
                                                                        <strong>
                                                                          Flight
                                                                          Duration:{" "}
                                                                        </strong>
                                                                        {getDiffFromMinutes(
                                                                          flight
                                                                            .trips[0]
                                                                            .totalTripTime
                                                                        )}
                                                                      </li>
                                                                      {flight.trips[0].listOfFlight.map(
                                                                        (
                                                                          tf,
                                                                          ix
                                                                        ) => {
                                                                          if (
                                                                            !!tf.displayLayOverTime
                                                                          )
                                                                            layoverCounter += 1;
                                                                          return (
                                                                            <Fragment
                                                                              key={
                                                                                ix
                                                                              }
                                                                            >
                                                                              {!!tf.displayLayOverTime && (
                                                                                <li className="ps-2 pe-2 fs-12">
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
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                                <h4 className="airport-code mb-0 dgc position-relative d-flex">
                                                                  <span className="flight-plus-air position-relative">
                                                                    <span className="tooltip-box cursor-pointer float-end">
                                                                      {getFormattedTime(
                                                                        flight
                                                                          .trips[0]
                                                                          .listOfFlight[
                                                                          flight
                                                                            .trips[0]
                                                                            .listOfFlight
                                                                            .length -
                                                                            1
                                                                        ]
                                                                          .arrivalTime
                                                                      )}
                                                                    </span>
                                                                  </span>
                                                                  {departDays >
                                                                    0 && (
                                                                    <span className="flight-plus-air plusone position-relative">
                                                                      <span className="tooltip-box cursor-pointer fs-10 color-red">
                                                                        +
                                                                        {
                                                                          departDays
                                                                        }
                                                                      </span>
                                                                      <span className="tooltip-hover-top">
                                                                        <strong>
                                                                          Flight
                                                                          Arrival
                                                                          -{" "}
                                                                        </strong>{" "}
                                                                        {getFormattedDate(
                                                                          flight
                                                                            .trips[0]
                                                                            .listOfFlight[
                                                                            flight
                                                                              .trips[0]
                                                                              .listOfFlight
                                                                              .length -
                                                                              1
                                                                          ]
                                                                            .arrivalAt
                                                                        )}
                                                                      </span>
                                                                    </span>
                                                                  )}
                                                                </h4>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        {/* {
                                                    displayOperatedBy && displayOperatedBy.length > 0 &&
                                                    <div className='row'>
                                                      <div className='col-sm-12'>
                                                        <h6 className='operated-by mb-0 mt-3'>Operated by: {displayOperatedBy.join(", ")}</h6>
                                                      </div>
                                                    </div>
                                                  } */}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <div className="air-flight-price text-end">
                                                      <div
                                                        className={
                                                          flight.resultIndex ==
                                                            selectedDepartTBOFlight.resultIndex &&
                                                          flight.traceId ==
                                                            selectedDepartTBOFlight.traceId
                                                            ? "selected-flight active"
                                                            : "selected-flight"
                                                        }
                                                      ></div>
                                                      <h2 className="mb-0 dgc">
                                                        {
                                                          numberFormat(
                                                            avgPrice
                                                          ).split(".")[0]
                                                        }
                                                      </h2>
                                                      <h6 className="mb-2 mt-1">
                                                        per Traveler
                                                      </h6>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="air-flight-btn-and-bag mt-1 pt-2">
                                                  <div className="row align-items-center">
                                                    <div className="col-10 col-sm-10 col-md-8 col-lg-7 col-xl-8 col-xxl-8 pe-0">
                                                      <div className="details-icon-btns d-flex">
                                                        <div className="me-3 ">
                                                          <div className="dropdown dropdown-hover">
                                                            <button
                                                              className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                              type="button"
                                                              id="carddetail-info"
                                                              data-bs-toggle=""
                                                              aria-expanded=""
                                                              onClick={(e) =>
                                                                e.stopPropagation()
                                                              }
                                                            >
                                                              <Image
                                                                className="h-auto"
                                                                loader={
                                                                  trvLoader
                                                                }
                                                                src={
                                                                  flight.isRefundable
                                                                    ? "icon/refundable-icon.svg"
                                                                    : "icon/non-refundable.svg"
                                                                }
                                                                alt="payment sucess icon"
                                                                width={20}
                                                                height={43}
                                                              />
                                                              <p
                                                                className={
                                                                  flight.isRefundable
                                                                    ? "mb-0 fs-12 fw-bold color-green ms-2"
                                                                    : "mb-0 fs-12 fw-bold color-red ms-2"
                                                                }
                                                              >
                                                                {flight.isRefundable
                                                                  ? "R"
                                                                  : "N"}
                                                              </p>
                                                            </button>
                                                            <div
                                                              className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                              aria-labelledby="carddetail-info"
                                                              data-popper-placement="top-start"
                                                            >
                                                              <p className="mb-0 bg-black fs-12 color-white br-5 p-2">
                                                                {flight.isRefundable
                                                                  ? "Partially Refundable"
                                                                  : "Non-Refundable"}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="me-3">
                                                          <div className="dropdown dropdown-hover">
                                                            <button
                                                              className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                              type="button"
                                                              id="carddetail-info"
                                                              data-bs-toggle=""
                                                              aria-expanded=""
                                                              onClick={(e) =>
                                                                e.stopPropagation()
                                                              }
                                                            >
                                                              <Image
                                                                className="h-auto"
                                                                loader={
                                                                  trvLoader
                                                                }
                                                                src="icon/seat-red-icon.svg"
                                                                alt="seat icon"
                                                                width={20}
                                                                height={43}
                                                              />
                                                              <p className="mb-0 fs-12 fw-bold color-red ms-2">
                                                                {
                                                                  flight
                                                                    .trips[0]
                                                                    .listOfFlight[0]
                                                                    .seats
                                                                }{" "}
                                                                Left
                                                              </p>
                                                            </button>
                                                            <div
                                                              className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                              aria-labelledby="carddetail-info"
                                                              data-popper-placement="top-start"
                                                            >
                                                              <p className="mb-0 bg-black fs-12 color-white br-5 p-2">
                                                                Hurry! Only{" "}
                                                                {
                                                                  flight
                                                                    .trips[0]
                                                                    .listOfFlight[0]
                                                                    .seats
                                                                }{" "}
                                                                Seat(s) Left
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="me-0">
                                                          <div className="dropdown dropdown-hover">
                                                            <button
                                                              className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                              type="button"
                                                              id="carddetail-info"
                                                              data-bs-toggle=""
                                                              aria-expanded=""
                                                              onClick={(e) =>
                                                                e.stopPropagation()
                                                              }
                                                            >
                                                              <Image
                                                                className="h-auto"
                                                                loader={
                                                                  sfLoader
                                                                }
                                                                src={timeIcon}
                                                                height={20}
                                                                width={20}
                                                              />
                                                              <p className="mb-0 fs-12 fw-bold color-black ms-2">
                                                                {timeOfDay}
                                                              </p>
                                                            </button>
                                                            <div
                                                              className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                              aria-labelledby="carddetail-info"
                                                              data-popper-placement="top-start"
                                                            >
                                                              <p className="mb-0 bg-black fs-12 color-white br-5 p-2">
                                                                {timeOfDay}{" "}
                                                                Flight
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {/* <div className='col-2 col-sm-2 col-md-4 col-lg-5 col-xl-4 col-xxl-4'>
                                                  <div className='air-flight-price text-end'>
                                                    <button className='p-0 bg-white border-0 fs-14 color-blue fw-bold' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={(e) => {
                                                      e.stopPropagation();
                                                      let fl = cloneData(flight);
                                                      fl.avgPrice = avgPrice;
                                                      setFlightForFlap(fl);
                                                      setShowContinueBtn(false);
                                                      setRtnFlightForFlap(null);
                                                    }}>Details</button>
                                                  </div>
                                                </div> */}
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )
                                      ) : (
                                        <div className="noResultFound">
                                          <div className="d-flex align-items-center bg-white p-3 br-10 mt-3">
                                            <span>
                                              <Image
                                                className="w-auto h-auto"
                                                loader={trvLoader}
                                                src="icon/timer-icon.svg"
                                                alt="timer icon"
                                                width={100}
                                                height={43}
                                              />
                                            </span>
                                            <div className="ps-3">
                                              <h6 className="fw-bold mb-0">
                                                No Result Found!
                                              </h6>
                                              <p className="mb-0 fs-14">
                                                Please try a different filtering
                                                combination!
                                              </p>
                                              <button
                                                className="transparent-btn clear-filter-btn"
                                                onClick={() => clearFilters()}
                                              >
                                                Reset Filters
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                      <div className="return listing-banner p-2 rounded-2">
                                        <div className="row align-items-center">
                                          <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-7 pe-0">
                                            <h6 className="color-white">
                                              Return |{" "}
                                              {getFormattedDate4(
                                                currentFilters.segments[1]
                                                  .departureDate
                                              )}
                                            </h6>
                                            <h5 className="color-white mb-0">
                                              {returnTBOFlights.length > 0 &&
                                                returnTBOFlights[0].trips[0]
                                                  .listOfFlight[0]
                                                  .airportFromCity}{" "}
                                              -{" "}
                                              {returnTBOFlights.length > 0 &&
                                                returnTBOFlights[0].trips[0]
                                                  .listOfFlight[
                                                  returnTBOFlights[0].trips[0]
                                                    .listOfFlight.length - 1
                                                ].airportToCity}
                                            </h5>
                                          </div>
                                          <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                            <Image
                                              className="w-100"
                                              loader={trvLoader}
                                              src="icon/return-flight-img.svg"
                                              alt="return-flight-img"
                                              width={162}
                                              height={50}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-12"></div>
                                      </div>
                                      {rtnFilteredFlights.length > 0 ? (
                                        rtnFilteredFlights.map(
                                          (flight, flightIndex) => {
                                            let deptDate = new Date(
                                              flight.trips[0].listOfFlight[0].departeddate
                                            );
                                            let arrDate = new Date(
                                              flight.trips[0].listOfFlight[
                                                flight.trips[0].listOfFlight
                                                  .length - 1
                                              ].arrivalAt
                                            );
                                            let difference =
                                              arrDate.getTime() -
                                              deptDate.getTime();
                                            let departDays = Math.ceil(
                                              difference / (1000 * 3600 * 24)
                                            );
                                            let flightPrice = Math.round(
                                              flight.totalPrice
                                            );
                                            let layoverCounter = 0;
                                            let totalPassangers = 0;
                                            let totalPax = 0;
                                            flight.fareDetails.forEach(
                                              (fare) => {
                                                totalPax += fare.noofPax;
                                                if (fare.totalFareAmount > 0) {
                                                  totalPassangers +=
                                                    fare.noofPax;
                                                }
                                              }
                                            );
                                            let avgPrice = Math.round(
                                              flightPrice / totalPassangers
                                            );
                                            // var displayOperatedBy = [...new Set(flight.trips[0].listOfFlight.filter(x => ((x.airlineName).toLowerCase() != (x.operatedBy).toLowerCase()) && !!x.operatedBy).map(x => x.operatedBy))];
                                            let timeOfDay = getTimeOfDay(
                                              flight.trips[0].listOfFlight[0]
                                                .departureTime
                                            );
                                            let timeIcon = "";
                                            if (timeOfDay == "Morning")
                                              timeIcon =
                                                "https://assets.neofares.com/all-icon/morning-icon.svg";
                                            else if (timeOfDay == "Afternoon")
                                              timeIcon =
                                                "https://assets.neofares.com/all-icon/afternoon-icon.svg";
                                            else if (timeOfDay == "Evening")
                                              timeIcon =
                                                "https://assets.neofares.com/all-icon/evening-icon.svg";
                                            else
                                              timeIcon =
                                                "https://assets.neofares.com/all-icon/night-moon-icon.svg";

                                            return (
                                              <div
                                                className={
                                                  flight.resultIndex ==
                                                    selectedReturnTBOFlight.resultIndex &&
                                                  flight.traceId ==
                                                    selectedReturnTBOFlight.traceId
                                                    ? "regular-flight-round-box mt-4 mb-4 active-selected"
                                                    : "regular-flight-round-box mt-4 mb-4"
                                                }
                                                key={flightIndex}
                                                onClick={() => {
                                                  let currentFlight =
                                                    cloneData(flight);
                                                  currentFlight.departDays =
                                                    departDays;
                                                  currentFlight.totalPassengers =
                                                    totalPax;
                                                  currentFlight.displayCabin =
                                                    getDisplayCabin(
                                                      parseInt(
                                                        currentFilters.cabin
                                                      )
                                                    );
                                                  currentFlight.avgPrice =
                                                    avgPrice;
                                                  currentFlight.timeOfDay =
                                                    timeOfDay;
                                                  currentFlight.timeIcon =
                                                    timeIcon;
                                                  setSelectedReturnTBOFlight(
                                                    currentFlight
                                                  );
                                                }}
                                              >
                                                <div className="row align-items-center">
                                                  <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 both-flight-box">
                                                    <div className="row align-items-center">
                                                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <div className="row align-items-center">
                                                          <div className="1 col-2 col-sm-2 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                            <div className="air-flight-logo text-start">
                                                              <Image
                                                                className="h-auto"
                                                                loader={
                                                                  airlineLogoLoader
                                                                }
                                                                src={`airline-logo/${flight.trips[0].validatingCarrier.code}.webp`}
                                                                height={20}
                                                                width={20}
                                                              />
                                                              <span>
                                                                {
                                                                  flight
                                                                    .trips[0]
                                                                    .validatingCarrier
                                                                    .name
                                                                }
                                                              </span>
                                                            </div>
                                                          </div>
                                                          <div className="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-9 col-xxl-9 pe-0 ps-0">
                                                            <div className="row align-items-center">
                                                              <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                                <h4 className="airport-code mb-0 dgc position-relative">
                                                                  <span className="flight-plus-air">
                                                                    <span className="tooltip-box cursor-pointer">
                                                                      {getFormattedTime(
                                                                        flight
                                                                          .trips[0]
                                                                          .listOfFlight[0]
                                                                          .departureTime
                                                                      )}
                                                                    </span>
                                                                  </span>
                                                                </h4>
                                                              </div>
                                                              <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0">
                                                                <div className="from-to-from-digination ">
                                                                  <div className="dropdown dropdown-hover">
                                                                    <button
                                                                      className="btn btn-secondary dropdown-toggle after-none bg-transparent border-0 p-0 w-100"
                                                                      type="button"
                                                                      id="dropdownMenuButton1"
                                                                      data-bs-toggle=""
                                                                      aria-expanded=""
                                                                    >
                                                                      <h6 className="text-center mb-0">
                                                                        {getDiffFromMinutes(
                                                                          flight
                                                                            .trips[0]
                                                                            .totalTripTime
                                                                        )}
                                                                      </h6>
                                                                      {flight
                                                                        .trips[0]
                                                                        .listOfFlight
                                                                        .length <=
                                                                        3 && (
                                                                        <h5 className="mb-0 text-center">
                                                                          {flight.trips[0].listOfFlight.map(
                                                                            (
                                                                              t,
                                                                              ix
                                                                            ) => {
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
                                                                                    key={
                                                                                      ix
                                                                                    }
                                                                                  ></Fragment>
                                                                                );
                                                                              return (
                                                                                <span
                                                                                  key={
                                                                                    ix
                                                                                  }
                                                                                ></span>
                                                                              );
                                                                            }
                                                                          )}
                                                                        </h5>
                                                                      )}
                                                                      <h6 className="text-center mb-0">
                                                                        {flight
                                                                          .trips[0]
                                                                          .listOfFlight
                                                                          .length ==
                                                                        1
                                                                          ? "Non-Stop"
                                                                          : flight
                                                                              .trips[0]
                                                                              .listOfFlight
                                                                              .length -
                                                                            1 +
                                                                            (flight
                                                                              .trips[0]
                                                                              .listOfFlight
                                                                              .length ==
                                                                            2
                                                                              ? " Stop"
                                                                              : " Stops")}
                                                                      </h6>
                                                                    </button>
                                                                    <ul
                                                                      className="dropdown-menu bg-black border-0 color-white fs-12"
                                                                      aria-labelledby="dropdownMenuButton1"
                                                                    >
                                                                      <li className="ps-2 pe-2 fs-12">
                                                                        <strong>
                                                                          Flight
                                                                          Duration:{" "}
                                                                        </strong>
                                                                        {getDiffFromMinutes(
                                                                          flight
                                                                            .trips[0]
                                                                            .totalTripTime
                                                                        )}
                                                                      </li>
                                                                      {flight.trips[0].listOfFlight.map(
                                                                        (
                                                                          tf,
                                                                          ix
                                                                        ) => {
                                                                          if (
                                                                            !!tf.displayLayOverTime
                                                                          )
                                                                            layoverCounter += 1;
                                                                          return (
                                                                            <Fragment
                                                                              key={
                                                                                ix
                                                                              }
                                                                            >
                                                                              {!!tf.displayLayOverTime && (
                                                                                <li className="ps-2 pe-2 fs-12">
                                                                                  {" "}
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
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                                <h4 className="airport-code mb-0 dgc position-relative d-flex">
                                                                  <span className="flight-plus-air position-relative">
                                                                    <span className="tooltip-box cursor-pointer float-end">
                                                                      {getFormattedTime(
                                                                        flight
                                                                          .trips[0]
                                                                          .listOfFlight[
                                                                          flight
                                                                            .trips[0]
                                                                            .listOfFlight
                                                                            .length -
                                                                            1
                                                                        ]
                                                                          .arrivalTime
                                                                      )}
                                                                    </span>
                                                                  </span>
                                                                  {departDays >
                                                                    0 && (
                                                                    <span className="flight-plus-air plusone position-relative">
                                                                      <span className="tooltip-box cursor-pointer fs-10 color-red">
                                                                        +
                                                                        {
                                                                          departDays
                                                                        }
                                                                      </span>
                                                                      <span className="tooltip-hover-top">
                                                                        <strong>
                                                                          Flight
                                                                          Arrival
                                                                          -{" "}
                                                                        </strong>{" "}
                                                                        {getFormattedDate(
                                                                          flight
                                                                            .trips[0]
                                                                            .listOfFlight[
                                                                            flight
                                                                              .trips[0]
                                                                              .listOfFlight
                                                                              .length -
                                                                              1
                                                                          ]
                                                                            .arrivalAt
                                                                        )}
                                                                      </span>
                                                                    </span>
                                                                  )}
                                                                </h4>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        {/* {
                                                    displayOperatedBy && displayOperatedBy.length > 0 &&
                                                    <div className='row'>
                                                      <div className='col-sm-12'>
                                                        <h6 className='operated-by mb-0 mt-3'>Operated by: {displayOperatedBy.join(", ")}</h6>
                                                      </div>
                                                    </div>
                                                  } */}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <div className="air-flight-price text-end">
                                                      <div
                                                        className={
                                                          flight.resultIndex ==
                                                            selectedReturnTBOFlight.resultIndex &&
                                                          flight.traceId ==
                                                            selectedReturnTBOFlight.traceId
                                                            ? "selected-flight active"
                                                            : "selected-flight"
                                                        }
                                                      ></div>
                                                      <h2 className="mb-0 dgc">
                                                        {
                                                          numberFormat(
                                                            avgPrice
                                                          ).split(".")[0]
                                                        }
                                                      </h2>
                                                      <h6 className="mb-2 mt-1">
                                                        per Traveler
                                                      </h6>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="air-flight-btn-and-bag mt-1 pt-2">
                                                  <div className="row align-items-center">
                                                    <div className="col-10 col-sm-10 col-md-8 col-lg-7 col-xl-8 col-xxl-8 pe-0">
                                                      <div className="details-icon-btns d-flex">
                                                        <div className="me-3 ">
                                                          <div className="dropdown dropdown-hover">
                                                            <button
                                                              className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                              type="button"
                                                              id="carddetail-info"
                                                              data-bs-toggle=""
                                                              aria-expanded=""
                                                              onClick={(e) =>
                                                                e.stopPropagation()
                                                              }
                                                            >
                                                              <Image
                                                                className="h-auto"
                                                                loader={
                                                                  trvLoader
                                                                }
                                                                src={
                                                                  flight.isRefundable
                                                                    ? "icon/refundable-icon.svg"
                                                                    : "icon/non-refundable.svg"
                                                                }
                                                                alt="payment sucess icon"
                                                                width={20}
                                                                height={43}
                                                              />
                                                              <p
                                                                className={
                                                                  flight.isRefundable
                                                                    ? "mb-0 fs-12 fw-bold color-green ms-2"
                                                                    : "mb-0 fs-12 fw-bold color-red ms-2"
                                                                }
                                                              >
                                                                {flight.isRefundable
                                                                  ? "R"
                                                                  : "N"}
                                                              </p>
                                                            </button>
                                                            <div
                                                              className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                              aria-labelledby="carddetail-info"
                                                              data-popper-placement="top-start"
                                                            >
                                                              <p className="mb-0 bg-black fs-12 color-white br-5 p-2">
                                                                {flight.isRefundable
                                                                  ? "Partially Refundable"
                                                                  : "Non-Refundable"}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="me-3">
                                                          <div className="dropdown dropdown-hover">
                                                            <button
                                                              className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                              type="button"
                                                              id="carddetail-info"
                                                              data-bs-toggle=""
                                                              aria-expanded=""
                                                              onClick={(e) =>
                                                                e.stopPropagation()
                                                              }
                                                            >
                                                              <Image
                                                                className="h-auto"
                                                                loader={
                                                                  trvLoader
                                                                }
                                                                src="icon/seat-red-icon.svg"
                                                                alt="seat icon"
                                                                width={20}
                                                                height={43}
                                                              />
                                                              <p className="mb-0 fs-12 fw-bold color-red ms-2">
                                                                {
                                                                  flight
                                                                    .trips[0]
                                                                    .listOfFlight[0]
                                                                    .seats
                                                                }{" "}
                                                                Left
                                                              </p>
                                                            </button>
                                                            <div
                                                              className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                              aria-labelledby="carddetail-info"
                                                              data-popper-placement="top-start"
                                                            >
                                                              <p className="mb-0 bg-black fs-12 color-white br-5 p-2">
                                                                Hurry! Only{" "}
                                                                {
                                                                  flight
                                                                    .trips[0]
                                                                    .listOfFlight[0]
                                                                    .seats
                                                                }{" "}
                                                                Seat(s) Left
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="me-0">
                                                          <div className="dropdown dropdown-hover">
                                                            <button
                                                              className="text-start align-items-center after-none d-flex ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                                              type="button"
                                                              id="carddetail-info"
                                                              data-bs-toggle=""
                                                              aria-expanded=""
                                                              onClick={(e) =>
                                                                e.stopPropagation()
                                                              }
                                                            >
                                                              <Image
                                                                className="h-auto"
                                                                loader={
                                                                  sfLoader
                                                                }
                                                                src={timeIcon}
                                                                height={20}
                                                                width={20}
                                                              />
                                                              <p className="mb-0 fs-12 fw-bold color-black ms-2">
                                                                {timeOfDay}
                                                              </p>
                                                            </button>
                                                            <div
                                                              className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                                              aria-labelledby="carddetail-info"
                                                              data-popper-placement="top-start"
                                                            >
                                                              <p className="mb-0 bg-black fs-12 color-white br-5 p-2">
                                                                {timeOfDay}{" "}
                                                                Flight
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {/* <div className='col-2 col-sm-2 col-md-4 col-lg-5 col-xl-4 col-xxl-4'>
                                                  <div className='air-flight-price text-end'>
                                                    <button className='p-0 bg-white border-0 fs-14 color-blue fw-bold' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={(e) => {
                                                      e.stopPropagation();
                                                      let fl = cloneData(flight);
                                                      fl.avgPrice = avgPrice;
                                                      setFlightForFlap(fl);
                                                      setShowContinueBtn(false);
                                                      setRtnFlightForFlap(null);
                                                    }}>Details</button>
                                                  </div>
                                                </div> */}
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )
                                      ) : (
                                        <div className="noResultFound">
                                          <div className="d-flex align-items-center bg-white p-3 br-10 mt-3">
                                            <span>
                                              <Image
                                                className="w-auto h-auto"
                                                loader={trvLoader}
                                                src="icon/timer-icon.svg"
                                                alt="timer icon"
                                                width={100}
                                                height={43}
                                              />
                                            </span>
                                            <div className="ps-3">
                                              <h6 className="fw-bold mb-0">
                                                No Result Found!
                                              </h6>
                                              <p className="mb-0 fs-14">
                                                Please try a different filtering
                                                combination!
                                              </p>
                                              <button
                                                className="transparent-btn clear-filter-btn"
                                                onClick={() => clearFilters()}
                                              >
                                                Reset Filters
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                    <div className="flight-list-footer-breadcrumb">
                      <div className="row justify-content-end">
                        <div className="col-sm-12 text-end">
                          {filteredFlights &&
                            filteredFlights.length > 0 &&
                            itemsCounter <= filteredFlights.length &&
                            returnTBOFlights.length == 0 && (
                              <button
                                className="transparent-btn active"
                                onClick={() => {
                                  let endValue = itemsCounter + 10;
                                  setItemsCounter(endValue);
                                }}
                              >
                                <span>Show More Flights</span>
                                <i className="fa-solid fa-arrow-down ms-2"></i>
                              </button>
                            )}
                          {(filteredFlights.length > 0 ||
                            rtnFilteredFlights.length > 0) && (
                            <button
                              className="transparent-btn ms-2"
                              onClick={() => window.scroll(0, 0)}
                            >
                              <span>Back to Top</span>
                              <i className="fa-solid fa-arrow-up ms-2"></i>
                            </button>
                          )}
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
      {!!(isLoading == false && (!flights || flights.length == 0)) && (
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

      {currentFilters &&
        currentFilters.segments.length > 1 &&
        !isLoading &&
        selectedDepartTBOFlight &&
        selectedDepartTBOFlight.trips &&
        selectedDepartTBOFlight.trips.length > 0 &&
        selectedReturnTBOFlight &&
        selectedReturnTBOFlight.trips &&
        selectedReturnTBOFlight.trips.length > 0 && (
          <section
            className={
              showPriceStrip ? "total-price-strip active" : "total-price-strip"
            }
          >
            <div className="d-none d-lg-inline">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                    <div className="regular-flight-round-box my-2">
                      <div className="row align-items-center">
                        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 both-flight-box">
                          <div className="row align-items-center">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <div className="row align-items-center">
                                <div className="col-2 col-sm-2 col-md-3 col-lg-4 col-xl-3 col-xxl-3">
                                  <div className="air-flight-logo text-start">
                                    <Image
                                      className="h-auto"
                                      loader={airlineLogoLoader}
                                      src={`airline-logo/${selectedDepartTBOFlight.trips[0].validatingCarrier.code}.webp`}
                                      alt="left arrow icon"
                                      width={30}
                                      height={45}
                                    />
                                    <span>
                                      {
                                        selectedDepartTBOFlight.trips[0]
                                          .validatingCarrier.name
                                      }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-10 col-sm-10 col-md-9 col-lg-8 col-xl-9 col-xxl-9 pe-0 ps-0">
                                  <div className="row">
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                      <h6 className="flight-time mb-0">
                                        <span>
                                          {getFormattedTime(
                                            selectedDepartTBOFlight.trips[0]
                                              .listOfFlight[0].departureTime
                                          )}
                                        </span>
                                        <span className="flight-plus-air"></span>
                                      </h6>
                                      <h4 className="airport-code mb-0 dgc">
                                        <div className="dropdown dropdown-hover">
                                          <button
                                            className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                            type="button"
                                            id="carddetail-info"
                                            data-bs-toggle=""
                                            aria-expanded=""
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <span className="fw-bold fs-20">
                                              {
                                                selectedDepartTBOFlight.trips[0]
                                                  .listOfFlight[0].fromCode
                                              }
                                            </span>
                                          </button>
                                          <div
                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                            aria-labelledby="carddetail-info"
                                            data-popper-placement="top-start"
                                          >
                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                              {
                                                selectedDepartTBOFlight.trips[0]
                                                  .listOfFlight[0]
                                                  .fromAirportName
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      </h4>
                                    </div>
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0">
                                      <div className="from-to-from-digination">
                                        <h6 className="text-center mb-0">
                                          {getDiffFromMinutes(
                                            selectedDepartTBOFlight.trips[0]
                                              .totalTripTime
                                          )}
                                        </h6>
                                        {selectedDepartTBOFlight.trips[0]
                                          .listOfFlight.length <= 3 && (
                                          <h5 className="mb-0 text-center">
                                            {selectedDepartTBOFlight.trips[0].listOfFlight.map(
                                              (t, ix) => {
                                                if (
                                                  ix >=
                                                  selectedDepartTBOFlight
                                                    .trips[0].listOfFlight
                                                    .length -
                                                    1
                                                )
                                                  return (
                                                    <Fragment
                                                      key={ix}
                                                    ></Fragment>
                                                  );
                                                return <span key={ix}></span>;
                                              }
                                            )}
                                          </h5>
                                        )}
                                        <h6 className="text-center mb-0">
                                          {selectedDepartTBOFlight.trips[0]
                                            .listOfFlight.length == 1
                                            ? "Non-Stop"
                                            : selectedDepartTBOFlight.trips[0]
                                                .listOfFlight.length -
                                              1 +
                                              (selectedDepartTBOFlight.trips[0]
                                                .listOfFlight.length == 2
                                                ? " Stop"
                                                : " Stops")}
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                      <h6 className="flight-time mb-0">
                                        <span>
                                          {getFormattedTime(
                                            selectedDepartTBOFlight.trips[0]
                                              .listOfFlight[
                                              selectedDepartTBOFlight.trips[0]
                                                .listOfFlight.length - 1
                                            ].arrivalTime
                                          )}
                                        </span>
                                        {selectedDepartTBOFlight.departDays >
                                          0 && (
                                          <span className="flight-plus-air">
                                            <span className="tooltip-box cursor-pointer">
                                              +
                                              {
                                                selectedDepartTBOFlight.departDays
                                              }
                                            </span>
                                            <span className="tooltip-hover-top">
                                              <strong>Flight Arrival - </strong>{" "}
                                              {getFormattedDate(
                                                selectedDepartTBOFlight.trips[0]
                                                  .listOfFlight[
                                                  selectedDepartTBOFlight
                                                    .trips[0].listOfFlight
                                                    .length - 1
                                                ].arrivalAt
                                              )}
                                            </span>
                                          </span>
                                        )}
                                      </h6>
                                      <h4 className="airport-code mb-0 dgc">
                                        <div className="dropdown dropdown-hover">
                                          <button
                                            className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                            type="button"
                                            id="carddetail-info"
                                            data-bs-toggle=""
                                            aria-expanded=""
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <span className="fw-bold fs-20">
                                              {
                                                selectedDepartTBOFlight.trips[0]
                                                  .listOfFlight[
                                                  selectedDepartTBOFlight
                                                    .trips[0].listOfFlight
                                                    .length - 1
                                                ].toCode
                                              }
                                            </span>
                                          </button>
                                          <div
                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                            aria-labelledby="carddetail-info"
                                            data-popper-placement="top-start"
                                          >
                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                              {
                                                selectedDepartTBOFlight.trips[0]
                                                  .listOfFlight[
                                                  selectedDepartTBOFlight
                                                    .trips[0].listOfFlight
                                                    .length - 1
                                                ].toAirportName
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                          <div className="air-flight-price text-end">
                            <h2 className="mb-0 dgc">
                              {
                                numberFormat(
                                  selectedDepartTBOFlight.avgPrice
                                ).split(".")[0]
                              }
                            </h2>
                            <h6 className="mb-2 mt-2">per Traveler</h6>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="air-flight-btn-and-bag mt-3 pt-2">
                            <div className="row align-items-center">
                              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 pe-0">
                                <div className="details-icon-btns d-flex">
                                  <div className="me-3 ">
                                    <div className="dropdown dropdown-hover">
                                      <button
                                        className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                        type="button"
                                        id="carddetail-info"
                                        data-bs-toggle=""
                                        aria-expanded=""
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Image
                                          className="h-auto"
                                          loader={trvLoader}
                                          src={
                                            selectedDepartTBOFlight.isRefundable
                                              ? "icon/refundable-icon.svg"
                                              : "icon/non-refundable.svg"
                                          }
                                          alt="refundable icon"
                                          width={20}
                                          height={43}
                                        />
                                        <p
                                          className={
                                            selectedDepartTBOFlight.isRefundable
                                              ? "mb-0 fs-12 fw-bold color-green ms-2"
                                              : "mb-0 fs-12 fw-bold color-red ms-2"
                                          }
                                        >
                                          {selectedDepartTBOFlight.isRefundable
                                            ? "R"
                                            : "N"}
                                        </p>
                                      </button>
                                      <div
                                        className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                        aria-labelledby="carddetail-info"
                                        data-popper-placement="top-start"
                                      >
                                        <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                          {selectedDepartTBOFlight.isRefundable
                                            ? "Partially Refundable"
                                            : "Non-Refundable"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="me-3">
                                    <div className="dropdown dropdown-hover">
                                      <button
                                        className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                        type="button"
                                        id="carddetail-info"
                                        data-bs-toggle=""
                                        aria-expanded=""
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Image
                                          className="h-auto"
                                          loader={trvLoader}
                                          src="icon/seat-red-icon.svg"
                                          alt="seat icon"
                                          width={20}
                                          height={43}
                                        />
                                        <p className="mb-0 fs-12 fw-bold color-red ms-2">
                                          {
                                            selectedDepartTBOFlight.trips[0]
                                              .listOfFlight[0].seats
                                          }{" "}
                                          Left
                                        </p>
                                      </button>
                                      <div
                                        className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                        aria-labelledby="carddetail-info"
                                        data-popper-placement="top-start"
                                      >
                                        <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                          Hurry! Only{" "}
                                          {
                                            selectedDepartTBOFlight.trips[0]
                                              .listOfFlight[0].seats
                                          }{" "}
                                          Seat(s) Left
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="me-0">
                                    <div className="dropdown dropdown-hover">
                                      <button
                                        className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                        type="button"
                                        id="carddetail-info"
                                        data-bs-toggle=""
                                        aria-expanded=""
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Image
                                          className="h-auto"
                                          loader={sfLoader}
                                          src={selectedDepartTBOFlight.timeIcon}
                                          height={20}
                                          width={20}
                                        />
                                        <p className="mb-0 fs-12 fw-bold color-black ms-2">
                                          {selectedDepartTBOFlight.timeOfDay}
                                        </p>
                                      </button>
                                      <div
                                        className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                        aria-labelledby="carddetail-info"
                                        data-popper-placement="top-start"
                                      >
                                        <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                          {selectedDepartTBOFlight.timeOfDay}{" "}
                                          Flight
                                        </p>
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
                  </div>
                  <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5 border-start">
                    <div className="regular-flight-round-box my-2 ">
                      <div className="row align-items-center">
                        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 both-flight-box">
                          <div className="row align-items-center">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <div className="row align-items-center">
                                <div className="col-2 col-sm-2 col-md-3 col-lg-4 col-xl-3 col-xxl-3">
                                  <div className="air-flight-logo text-start">
                                    <Image
                                      className="h-auto "
                                      loader={airlineLogoLoader}
                                      src={`airline-logo/${selectedReturnTBOFlight.trips[0].validatingCarrier.code}.webp`}
                                      alt="left arrow icon"
                                      width={30}
                                      height={45}
                                    />
                                    <span>
                                      {
                                        selectedReturnTBOFlight.trips[0]
                                          .validatingCarrier.name
                                      }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-10 col-sm-10 col-md-9 col-lg-8 col-xl-9 col-xxl-9 pe-0 ps-0">
                                  <div className="row">
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                      <h6 className="flight-time mb-0">
                                        <span>
                                          {getFormattedTime(
                                            selectedReturnTBOFlight.trips[0]
                                              .listOfFlight[0].departureTime
                                          )}
                                        </span>
                                        <span className="flight-plus-air"></span>
                                      </h6>
                                      <h4 className="airport-code mb-0 dgc">
                                        <div className="dropdown dropdown-hover">
                                          <button
                                            className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                            type="button"
                                            id="carddetail-info"
                                            data-bs-toggle=""
                                            aria-expanded=""
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <span className="fw-bold fs-20">
                                              {
                                                selectedReturnTBOFlight.trips[0]
                                                  .listOfFlight[0].fromCode
                                              }
                                            </span>
                                          </button>
                                          <div
                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                            aria-labelledby="carddetail-info"
                                            data-popper-placement="top-start"
                                          >
                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                              {
                                                selectedReturnTBOFlight.trips[0]
                                                  .listOfFlight[0]
                                                  .fromAirportName
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      </h4>
                                    </div>
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0">
                                      <div className="from-to-from-digination">
                                        <h6 className="text-center mb-0">
                                          {getDiffFromMinutes(
                                            selectedReturnTBOFlight.trips[0]
                                              .totalTripTime
                                          )}
                                        </h6>
                                        {selectedReturnTBOFlight.trips[0]
                                          .listOfFlight.length <= 3 && (
                                          <h5 className="mb-0 text-center">
                                            {selectedReturnTBOFlight.trips[0].listOfFlight.map(
                                              (t, ix) => {
                                                if (
                                                  ix >=
                                                  selectedReturnTBOFlight
                                                    .trips[0].listOfFlight
                                                    .length -
                                                    1
                                                )
                                                  return (
                                                    <Fragment
                                                      key={ix}
                                                    ></Fragment>
                                                  );
                                                return <span key={ix}></span>;
                                              }
                                            )}
                                          </h5>
                                        )}
                                        <h6 className="text-center mb-0">
                                          {selectedReturnTBOFlight.trips[0]
                                            .listOfFlight.length == 1
                                            ? "Non-Stop"
                                            : selectedReturnTBOFlight.trips[0]
                                                .listOfFlight.length -
                                              1 +
                                              (selectedReturnTBOFlight.trips[0]
                                                .listOfFlight.length == 2
                                                ? " Stop"
                                                : " Stops")}
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                      <h6 className="flight-time mb-0">
                                        <span>
                                          {getFormattedTime(
                                            selectedReturnTBOFlight.trips[0]
                                              .listOfFlight[
                                              selectedReturnTBOFlight.trips[0]
                                                .listOfFlight.length - 1
                                            ].arrivalTime
                                          )}
                                        </span>
                                        {selectedReturnTBOFlight.departDays >
                                          0 && (
                                          <span className="flight-plus-air">
                                            <span className="tooltip-box cursor-pointer">
                                              +
                                              {
                                                selectedReturnTBOFlight.departDays
                                              }
                                            </span>
                                            <span className="tooltip-hover-top">
                                              <strong>Flight Arrival - </strong>{" "}
                                              {getFormattedDate(
                                                selectedReturnTBOFlight.trips[0]
                                                  .listOfFlight[
                                                  selectedReturnTBOFlight
                                                    .trips[0].listOfFlight
                                                    .length - 1
                                                ].arrivalAt
                                              )}
                                            </span>
                                          </span>
                                        )}
                                      </h6>
                                      <h4 className="airport-code mb-0 dgc">
                                        <div className="dropdown dropdown-hover">
                                          <button
                                            className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                            type="button"
                                            id="carddetail-info"
                                            data-bs-toggle=""
                                            aria-expanded=""
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <span className="fw-bold fs-20">
                                              {
                                                selectedReturnTBOFlight.trips[0]
                                                  .listOfFlight[
                                                  selectedReturnTBOFlight
                                                    .trips[0].listOfFlight
                                                    .length - 1
                                                ].toCode
                                              }
                                            </span>
                                          </button>
                                          <div
                                            className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                            aria-labelledby="carddetail-info"
                                            data-popper-placement="top-start"
                                          >
                                            <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                              {
                                                selectedReturnTBOFlight.trips[0]
                                                  .listOfFlight[
                                                  selectedReturnTBOFlight
                                                    .trips[0].listOfFlight
                                                    .length - 1
                                                ].toAirportName
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                          <div className="air-flight-price text-end">
                            <h2 className="mb-0 dgc">
                              {
                                numberFormat(
                                  selectedReturnTBOFlight.avgPrice
                                ).split(".")[0]
                              }
                            </h2>
                            <h6 className="mb-2 mt-2">per Traveler</h6>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="air-flight-btn-and-bag mt-3 pt-2">
                            <div className="row align-items-center">
                              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 pe-0">
                                <div className="details-icon-btns d-flex">
                                  <div className="me-3 ">
                                    <div className="dropdown dropdown-hover">
                                      <button
                                        className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                        type="button"
                                        id="carddetail-info"
                                        data-bs-toggle=""
                                        aria-expanded=""
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Image
                                          className="h-auto"
                                          loader={trvLoader}
                                          src={
                                            selectedReturnTBOFlight.isRefundable
                                              ? "icon/refundable-icon.svg"
                                              : "icon/non-refundable.svg"
                                          }
                                          alt="payment sucess icon"
                                          width={20}
                                          height={43}
                                        />
                                        <p
                                          className={
                                            selectedReturnTBOFlight.isRefundable
                                              ? "mb-0 fs-12 fw-bold color-green ms-2"
                                              : "mb-0 fs-12 fw-bold color-red ms-2"
                                          }
                                        >
                                          {selectedReturnTBOFlight.isRefundable
                                            ? "R"
                                            : "N"}
                                        </p>
                                      </button>
                                      <div
                                        className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                        aria-labelledby="carddetail-info"
                                        data-popper-placement="top-start"
                                      >
                                        <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                          {selectedReturnTBOFlight.isRefundable
                                            ? "Partially Refundable"
                                            : "Non-Refundable"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="me-3">
                                    <div className="dropdown dropdown-hover">
                                      <button
                                        className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                        type="button"
                                        id="carddetail-info"
                                        data-bs-toggle="drodown"
                                        aria-expanded=""
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Image
                                          className="h-auto"
                                          loader={trvLoader}
                                          src="icon/seat-red-icon.svg"
                                          alt="seat icon"
                                          width={20}
                                          height={43}
                                        />
                                        <p className="mb-0 fs-12 fw-bold color-red ms-2">
                                          {
                                            selectedReturnTBOFlight.trips[0]
                                              .listOfFlight[0].seats
                                          }{" "}
                                          Left
                                        </p>
                                      </button>
                                      <div
                                        className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                        aria-labelledby="carddetail-info"
                                        data-popper-placement="top-start"
                                      >
                                        <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                          Hurry! Only{" "}
                                          {
                                            selectedReturnTBOFlight.trips[0]
                                              .listOfFlight[0].seats
                                          }{" "}
                                          Seat(s) Left
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="me-0">
                                    <div className="dropdown dropdown-hover">
                                      <button
                                        className="text-start align-items-center d-flex after-none ps-0 pt-0 pe-0 pb-0 btn transparent-btn dropdown-toggle border-0"
                                        type="button"
                                        id="carddetail-info"
                                        data-bs-toggle=""
                                        aria-expanded=""
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Image
                                          className="h-auto"
                                          loader={sfLoader}
                                          src={selectedReturnTBOFlight.timeIcon}
                                          height={20}
                                          width={20}
                                        />
                                        <p className="mb-0 fs-12 fw-bold color-black ms-2">
                                          {selectedReturnTBOFlight.timeOfDay}
                                        </p>
                                      </button>
                                      <div
                                        className="dropdown-menu p-0 pt-2 bg-transpartent border-0"
                                        aria-labelledby="carddetail-info"
                                        data-popper-placement="top-start"
                                      >
                                        <p className="mb-0 bg-black fs-10 color-white br-5 p-2">
                                          {selectedReturnTBOFlight.timeOfDay}{" "}
                                          Flight
                                        </p>
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
                  </div>
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                    <div className="air-flight-price text-end">
                      {/* <button className='btn-style1 border-0 px-2 py-0 float-end' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={(e) => {
                      e.stopPropagation();
                      let fl = cloneData(selectedDepartTBOFlight);
                      setFlightForFlap(fl);
                      if (selectedReturnTBOFlight) {
                        let rtnFl = cloneData(selectedReturnTBOFlight)
                        setRtnFlightForFlap(rtnFl);
                      }
                      setShowContinueBtn(true);
                    }}>Details<i className="fa-solid fa-chevron-right"></i></button> */}
                      <h2 className="my-2 dgc">
                        {
                          numberFormat(
                            selectedDepartTBOFlight.totalPrice +
                              selectedReturnTBOFlight.totalPrice
                          ).split(".")[0]
                        }
                      </h2>
                      <button
                        className="btn-style1 active float-end"
                        onClick={() => {
                          setShowSpinner(true);
                          localStorage.setItem(
                            "departFlight",
                            JSON.stringify(selectedDepartTBOFlight)
                          );
                          localStorage.setItem(
                            "returnFlight",
                            JSON.stringify(selectedReturnTBOFlight)
                          );
                          const parm = new URLSearchParams(
                            window.location.search
                          );
                          let parms =
                            "?amt=" +
                            (selectedDepartTBOFlight.totalPrice +
                              selectedReturnTBOFlight.totalPrice);
                          let encodedParams = encodeData(parms);
                          localStorage.setItem(
                            "currentSearchId",
                            parm.get("s")
                          );
                          setTimeout(() => {
                            setShowSpinner(false);
                          }, 500);
                          window.location.href =
                            "/book-flight/?token=" +
                            encodedParams.replace("+", "-");
                        }}
                      >
                        {!showSpinner && <span>Book</span>}
                        {showSpinner && (
                          <span
                            className="spinner-border text-white"
                            role="status"
                          ></span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-lg-none py-2 bg-blue">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-8 col-sm-8 col-md-8">
                    <h2 className="mb-1 color-white">
                      {
                        numberFormat(
                          selectedDepartTBOFlight.avgPrice +
                            selectedReturnTBOFlight.avgPrice
                        ).split(".")[0]
                      }
                    </h2>
                    <p className="mb-0 fs-12 color-white">
                      {totalPassengers > 1
                        ? numberFormat(
                            selectedDepartTBOFlight.totalPrice +
                              selectedReturnTBOFlight.totalPrice
                          ).split(".")[0] + ` for ${totalPassengers} Travelers`
                        : "per Adult"}{" "}
                    </p>
                    <div className="air-flight-price text-start">
                      <button
                        className="bg-blue fs-12 color-white border-0 p-0 float-start text-start mob-details"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                        onClick={(e) => {
                          e.stopPropagation();
                          let fl = cloneData(selectedDepartTBOFlight);
                          setFlightForFlap(fl);
                          if (selectedReturnTBOFlight) {
                            let rtnFl = cloneData(selectedReturnTBOFlight);
                            setRtnFlightForFlap(rtnFl);
                          }
                          setShowContinueBtn(true);
                        }}
                      >
                        Details{" "}
                        <i className="fs-12 ms-1 fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-4 col-sm-4 col-md-4">
                    <div className="air-flight-price text-end">
                      <button
                        className="bg-orange color-white border-0 fs-14 py-2 px-3 rounded-1  active float-end"
                        onClick={() => {
                          setShowSpinner(true);
                          localStorage.setItem(
                            "departFlight",
                            JSON.stringify(selectedDepartTBOFlight)
                          );
                          localStorage.setItem(
                            "returnFlight",
                            JSON.stringify(selectedReturnTBOFlight)
                          );
                          const parm = new URLSearchParams(
                            window.location.search
                          );
                          let parms =
                            "?amt=" +
                            (selectedDepartTBOFlight.totalPrice +
                              selectedReturnTBOFlight.totalPrice);
                          let encodedParams = encodeData(parms);
                          localStorage.setItem(
                            "currentSearchId",
                            parm.get("s")
                          );
                          setTimeout(() => {
                            setShowSpinner(false);
                          }, 500);
                          window.location.href =
                            "/book-flight/?token=" +
                            encodedParams.replace("+", "-");
                        }}
                      >
                        {showSpinner ? (
                          <span
                            className="spinner-border text-white"
                            role="status"
                          ></span>
                        ) : (
                          <span>Book</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      <div className="air-flight-price">
        <div
          className="offcanvas offcanvas-end side-flap"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header border-bottom">
            <h5 id="offcanvasRightLabel">Review Flight Details</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          {flightForFlap && flightForFlap.totalPrice > 0 && (
            <DetailsFlap
              setLoader={setShowContentLoader}
              selectedFlight={flightForFlap}
              selectedRtnFlight={rtnFlightForFlap}
              showContinueBtn={showContinueBtn}
              selectedTabIndex={0}
            />
          )}
        </div>
      </div>

      {flights && flights.length > 0 && (
        <div className="pt-5">
          <InnterFooter></InnterFooter>
        </div>
      )}

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

      <Modal
        className="session-expired-popup "
        show={openSessionIdleModal}
        onHide={() => {
          setOpenSessionIdleModal(false);
          let previousAppliedFilters = localStorage.getItem(
            "currentSelectedFilters"
          );
          let parsedFilters = JSON.parse(previousAppliedFilters, true);
          modifySearch(parsedFilters);
        }}
        id="idle_timeout_modal"
      >
        <Modal.Body className="">
          <div className="session-expired-wrp">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h5 className="text-center mt-4">Session Expired!</h5>
                <Image
                  className="text-center align-center mb-3 mt-3 w-50 h-auto"
                  loader={trvLoader}
                  src="icon/session-expired-vector.svg"
                  alt="session-expired-vector"
                  width={300}
                  height={43}
                />
                <h5 className="w-75 m-auto mb-2">
                  Kindly refresh your searches for updated flight prices.
                </h5>
                <p className="fs-12 m-auto mb-4 w-75">
                  Since flight prices are volatile, we want to ensure you see
                  the latest fares. Here's hoping you get the best prices for
                  the flights you're looking for!
                </p>
              </div>
            </div>
            <div className="row session-btns">
              <div className="col-6 col-sm-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6">
                <a
                  className="border border-green color-green w-100 p-2 d-inline-block text-center br-5 text-none text-decoration-none"
                  href="javascript:void(0);"
                  onClick={() => {
                    setOpenSessionIdleModal(false);
                    let previousAppliedFilters = localStorage.getItem(
                      "currentSelectedFilters"
                    );
                    let parsedFilters = JSON.parse(previousAppliedFilters);
                    modifySearch(parsedFilters, true);
                  }}
                >
                  Refresh
                </a>
              </div>
              <div className="col-6 col-sm-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6">
                <a
                  className="bg-green color-white w-100 p-2 d-inline-block text-center br-5 text-none text-decoration-none"
                  href="/"
                >
                  Home
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
