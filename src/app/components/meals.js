"use client";

import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";
import { useEffect, useState, useCallback } from "react";
import { numberFormat } from "../helpers/common";
import NumericInput from "react-numeric-input";

export default function Meals(props) {
  // const flightSSR = props.departFlightSSRServices || props.returnFlightSSRServices;
  const setMealSegments = props.setMealSegments;
  const mealSegments = props.mealSegments;
  // const segments = props.segments;
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const setTotalMealPrice = props.setTotalMealPrice;
  const getPassengers = props.getPassengers;

  const [segments, setSegments] = useState([]);

  const departFlightSSRServices = props.departFlightSSRServices;
  const returnFlightSSRServices = props.returnFlightSSRServices;

  let lastId = 0;

  useEffect(() => {
    if (departFlightSSRServices || returnFlightSSRServices) {
      let meals = [];
      setFlightMeals(departFlightSSRServices, meals, "depart");
      setFlightMeals(returnFlightSSRServices, meals, "return");
      setMealSegments(meals);
    }
  }, [departFlightSSRServices, returnFlightSSRServices]);

  const setFlightMeals = (flightSSR, meals, type) => {
    if (
      flightSSR &&
      flightSSR.mealDynamic &&
      flightSSR.mealDynamic[0].length > 0
    ) {
      for (let i = 0; i < flightSSR.mealDynamic[0].length; i++) {
        const mealItem = flightSSR.mealDynamic[0][i];
        const newMealItem = {
          ...mealItem,
          type: type,
          quantity: 0,
          id: lastId + 1,
        };
        meals.push(newMealItem);
        lastId++;
      }
    }
  };

 
  useEffect(() => {
    if (departFlightSSRServices || returnFlightSSRServices) {
      let seatSegments = [];
      setFlightSegments(departFlightSSRServices, seatSegments ,"depart");
      setFlightSegments(returnFlightSSRServices, seatSegments,"return");
      setSegments(seatSegments);
    }
    
  }, [departFlightSSRServices, returnFlightSSRServices]);

  const setFlightSegments = (flightSSR, seatSegments, type) => {
    if (
      flightSSR &&
      flightSSR.seatDynamic &&
      flightSSR.seatDynamic.length > 0
    ) {
      for (let i = 0; i < flightSSR.seatDynamic[0].segmentSeat.length; i++) {
        let segment = flightSSR.seatDynamic[0].segmentSeat[i];
        let segmentWithType = {
          segmentData: segment,
          type: type,
          passengers: getPassengers(),
        };
        seatSegments.push(segmentWithType);
      }
    }
  };



  useEffect(() => {
    const totalPrice = mealSegments.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setTotalMealPrice(totalPrice);
  }, [mealSegments]);

  const handleTabClick = (index) => {
    setSelectedSegmentIndex(index);
  
    const updatedMealSegments = mealSegments.map(mealItem => ({
      ...mealItem,
      selectedSegmentIndex: index
    }));
  
    setMealSegments(updatedMealSegments);
  };

  const handleQuantityChange = (mealId, value, segmentIndex) => {
    setMealSegments((prevSegments) =>
      prevSegments.map((segment) =>
       segment.id === mealId   ? { ...segment, quantity: value } : segment
      )
    );
  };

  const mealOrigin = segments[selectedSegmentIndex]?.segmentData?.rowSeats[0]?.seats[0] ?.origin;
  const mealDestination =segments[selectedSegmentIndex]?.segmentData?.rowSeats[0]?.seats[0] ?.destination;
  const flightType =segments[selectedSegmentIndex]?.type;

  const filteredMealSegments = mealSegments.filter((item) => {
    return mealOrigin === item.origin && mealDestination === item.destination;
  });

  const filteredAllSegments = mealSegments.filter((item) => {
    return flightType === item.type ;
  });



  return (
    <div className="MealsWrp mt-3">
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {segments &&
          segments.length > 0 &&
          segments.map((segment, index) => {
            return (
              <li className="nav-item" role="presentation" key={index}>
                <button
                  className={`${
                    index === selectedSegmentIndex
                      ? "nav-link active"
                      : "nav-link"
                  }`}
                  id={`SeatDetailTab${index}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#SeatDetailTab_${index}`}
                  type="button"
                  role="tab"
                  aria-controls={`SeatDetailTab${index}`}
                  aria-selected={index === selectedSegmentIndex}
                  onClick={() => handleTabClick(index)}
                >
                  {segment.segmentData.rowSeats[0].seats[0].origin}-
                  {segment.segmentData.rowSeats[0].seats[0].destination}
                </button>
              </li>
            );
          })}
      </ul>
      <div className="tab-content">
        {segments.length > 0 &&
          segments.map((segment, index) => (
            <div
              key={index}
              className={`tab-pane fade ${
                index === selectedSegmentIndex ? "show active" : ""
              }`}
              id={`SeatDetailTab_${index}`}
              role="tabpanel"
              aria-labelledby={`SeatDetailTab${index}-tab`}
            >
              <div className="row">
                {filteredMealSegments && filteredMealSegments.length > 0
                  ? filteredMealSegments.map((item, mealIndex) => {
                      return (
                        <div key={mealIndex} className="col-sm-12 col-md-6">
                          <div className="MealBox">
                            <div className="row">
                              <div className="col-lg-3 col-xl-2">
                                <Image
                                  className="h-auto"
                                  loader={trvLoader}
                                  src="icon/mealFood.png"
                                  alt="Meal icon"
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <div className="col-lg-5 col-xl-7">
                                <div className="color-black fs-14">
                                  {item.airlineDescription}
                                </div>
                                <div className="fw-bold">
                                  {
                                    numberFormat(Math.round(item.price)).split(
                                      "."
                                    )[0]
                                  }
                                </div>
                              </div>
                              <div className="col-lg-4 col-xl-3">
                                <div className="col-7 passenger-count-btn">
                                  <NumericInput
                                    className="custom-traveler-input border-0 border d-flex"
                                    min={0}
                                    defaultValue={item.quantity}
                                    onChange={(value) =>
                                      handleQuantityChange(item.id, value,item.selectedSegmentIndex)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : filteredAllSegments &&
                  filteredAllSegments.length > 0 &&
                  filteredAllSegments.map((item, mealIndex) => {
                      return (
                        <div key={mealIndex} className="col-sm-12 col-md-6">
                          <div className="MealBox">
                            <div className="row">
                              <div className="col-lg-3 col-xl-2">
                                <Image
                                  className="h-auto"
                                  loader={trvLoader}
                                  src="icon/mealFood.png"
                                  alt="Meal icon"
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <div className="col-lg-5 col-xl-7">
                                <div className="color-black fs-14">
                                  {item.airlineDescription}
                                </div>
                                <div className="fw-bold">
                                  {
                                    numberFormat(Math.round(item.price)).split(
                                      "."
                                    )[0]
                                  }
                                </div>
                              </div>
                              <div className="col-lg-4 col-xl-3">
                                <div className="col-7 passenger-count-btn">
                                  <NumericInput
                                    className="custom-traveler-input border-0 border d-flex"
                                    min={0}
                                    defaultValue={item.quantity}
                                    onChange={(value) =>
                                      handleQuantityChange(item.id, value,item.selectedSegmentIndex)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
