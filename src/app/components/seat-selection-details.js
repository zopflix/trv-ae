import Image from "next/image";
import { airlineLogoLoader, myCustomLoader, trvCustomLoader, trvLoader } from "../helpers/imageKitLoader";
import { useEffect, useState } from "react";

export default function SeatSelectionDetail(props) {

    const [segments, setSegments] = useState([]);
    const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
    const [departFlight, setDepartFlight] = useState(null);
    const [returnFlight, setReturnFlight] = useState(null);
    const [flightsData, setFlightsData] = useState([]);
    const [firstPageLoad, setFirstPageLoad] = useState(false); 1

    const departFlightSSRServices = props.departFlightSSRServices;
    const returnFlightSSRServices = props.returnFlightSSRServices;
    const setSeatSegment = props.setSeatSegment;//for seating component 
    const setSegmentsInDetail = props.setSegments;
    const segmentsInDetail = props.segments;
    const selectedSegmentIndexInDetail = props.setSelectedSegmentIndex;
    const setShowSeatSelectionModal = props.setShowSeatSelectionModal;
    const updatedSegments = props.updatedSegments;
    const setSeatingSelectionDone = props.setSeatingSelectionDone;
    const selectSeat = props.selectSeat;
    const segmentIndex = props.selectedSegmentIndex;
    const isAnySeatSelected = props.isAnySeatSelected;
    const getPassengers = props.getPassengers;

    //#region events

    useEffect(() => {

        if (updatedSegments && updatedSegments.length > 0) {
            setSegments(updatedSegments);
            setSeatSegment(updatedSegments[segmentIndex]);
        }
        else {
            setSegments(segmentsInDetail);
        }

    }, [segmentsInDetail])

    useEffect(() => {

        if (firstPageLoad) {
            return;
        }

        let seatSegments = [];

        setDepartFlightSegments(departFlightSSRServices, seatSegments);

        setReturnFlightSegments(returnFlightSSRServices, seatSegments);

        setSegments(seatSegments);
        setSegmentsInDetail(seatSegments);

        //update airline name
        let flightLists = getSetFlightsList();

        for (let i = 0; i < seatSegments.length; i++) {

            seatSegments[i].airlineName = flightLists[i].airlineName;
        }

        setSeatSegment(seatSegments[0]);

    }, [departFlightSSRServices, returnFlightSSRServices])

    useEffect(() => {

        if (firstPageLoad) {
            return;
        }

        setFirstPageLoad(true);

        getSetFlightsList();

    }, [])

    //#endregion

    const getSetFlightsList = () => {

        let departSegments = getDepartFlightSegments();

        let returnSegments = getReturnFlightSegments();

        if (returnSegments && returnSegments.length > 0) {

            returnSegments.forEach((segment) => {

                departSegments.push(segment);
            })
        }

        return departSegments;
    }

    const getReturnFlightSegments = () => {

        let getFlightLists = [];

        const returnItem = window.localStorage.getItem("returnFlight");

        const rtnFlight = returnItem ? JSON.parse(returnItem) : null;

        if (rtnFlight) {

            setReturnFlight(rtnFlight);

            let flightSegments = setListOfFlight(rtnFlight);

            return flightSegments;
        }

        return getFlightLists;
    }

    const getDepartFlightSegments = () => {

        let getFlightLists = [];

        const item = window.localStorage.getItem("departFlight");

        const flight = item ? JSON.parse(item) : null;

        if (flight) {

            setDepartFlight(flight);

            let flightSegments = setListOfFlight(flight);

            return flightSegments;
        }

        return getFlightLists;
    }


    const setListOfFlight = (flightData) => {

        let flightsList = [...flightsData];

        flightData.trips.forEach((trip) => {

            trip.listOfFlight.forEach((flight) => {

                flightsList.push(flight);
            })
        })

        setFlightsData(flightsList);

        return flightsList;
    }

    const setDepartFlightSegments = (flightSSR, seatSegments) => {

        if (flightSSR && flightSSR.seatDynamic && flightSSR.seatDynamic.length > 0) {

            for (let i = 0; i < flightSSR.seatDynamic[0].segmentSeat.length; i++) {

                let segment = flightSSR.seatDynamic[0].segmentSeat[i];

                let segmentWithType =
                {
                    segmentData: segment,
                    type: "depart",
                    passengers: getPassengers()
                };

                seatSegments.push(segmentWithType);
            }
        }
    }

    const setReturnFlightSegments = (flightSSR, seatSegments) => {

        if (flightSSR && flightSSR.seatDynamic && flightSSR.seatDynamic.length > 0) {

            for (let i = 0; i < flightSSR.seatDynamic[0].segmentSeat.length; i++) {

                let segment = flightSSR.seatDynamic[0].segmentSeat[i];

                let segmentWithType =
                {
                    segmentData: segment,
                    type: "return",
                    passengers: getPassengers()
                };

                seatSegments.push(segmentWithType);
            }
        }

    }



    return (

        <>
            <div className="">
                <div className="float-start w-100">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        {segments && segments.length > 0 &&
                            segments.map((segment, index) => {
                                return (
                                    <li className="nav-item pb-1" role="presentation">
                                        <button className={`${index == selectedSegmentIndex ? 'nav-link active' : 'nav-link'}`} 
                                        id="SeatTabOne-tab"
                                            data-bs-toggle="pill" data-bs-target={`#SeatTab_${index}`}
                                            type="button" role="tab" aria-controls="SeatTabOne" aria-selected="true"
                                            onClick={(e) => {
                                                setSelectedSegmentIndex(index);
                                                selectedSegmentIndexInDetail(index);
                                                setSeatSegment(segment);

                                            }}
                                        >{segment.segmentData.rowSeats[0].seats[0].origin}-{segment.segmentData.rowSeats[0].seats[0].destination}</button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        {segments && segments.length > 0 &&
                            segments.map((segment, index) => {
                                return (
                                    <div className={`tab-pane fade show ${index == selectedSegmentIndex ? 'active' : ''}`} id={`#SeatTab_${index}`} role="tabpanel" aria-labelledby="SeatTabOne-tab">
                                        <div className="d-flex">
                                            <div>
                                                <Image
                                                    className="mt-1"
                                                    loader={airlineLogoLoader}
                                                    src={`airline-logo/${segment.segmentData.rowSeats[0].seats[0].airlineCode}.webp`}
                                                    alt="Airline Icon"
                                                    width={30}
                                                    height={30}
                                                />
                                            </div>
                                            <div className="ms-2">
                                                <p className="mb-0 fw-bold color-black fs-14">{segment.airlineName}</p>
                                                <p className="mb-0 fs-12">{segment.segmentData.rowSeats[0].seats[0].craftType}</p>
                                            </div>
                                        </div>
                                        <div className="SelectSeatDetail border border-blue bg-light-blue rounded-3 w-100 float-start d-table mt-2 overflow-hidden">

                                            {segments && segments[selectedSegmentIndex] && segments[selectedSegmentIndex].passengers && segments[selectedSegmentIndex].passengers.length > 0 &&

                                                segments[selectedSegmentIndex].passengers.map((p, i) => {

                                                    return (
                                                        <div className="d-flex align-items-center justify-content-between py-2 px-3">
                                                            <div className="d-flex align-items-center">
                                                                <span className="fs-14 color-black">{p.name}</span>
                                                                {p.seat &&
                                                                    <span className="ms-2 position-relative SelectSeatDetail active">
                                                                        {p.seat.code}
                                                                        <i className="fs-14 cursor-pointer fa-solid fa-circle-xmark color-red position-absolute end-0 top-0"
                                                                            onClick={(e) => {
                                                                                selectSeat(i, p.seat, true);
                                                                            }}
                                                                        ></i>
                                                                    </span>
                                                                }
                                                            </div>
                                                            <div>
                                                                {p.seat &&
                                                                    <p className="mb-0 fs-14 color-black">₹ {p.seat.price}</p>
                                                                }
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }

                                            <div className="border-top border-blue bg-white d-flex align-items-center justify-content-between py-2 px-3">
                                                <div className="d-flex align-items-center">
                                                    <span className="fs-14 color-black fw-bold">Total Fare</span>
                                                </div>
                                                <div>
                                                    <p className="mb-0 fs-14 color-black fw-bold">₹ {segment.passengers.reduce((a, v) => a = a + (v.seat ? v.seat.price : 0), 0)} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="float-start w-100 mt-5 SeatTypeGuideLines">
                    <div className="d-flex align-items-center w-100 mb-1">
                        <div>
                            <Image
                                className="mt-0"
                                loader={trvLoader}
                                src="icon/seat-type-icon.svg"
                                alt="seat type Icon"
                                width={21}
                                height={25}
                            />
                        </div>
                        <div>
                            <p className="mb-0 color-black fw-bold ms-2 fs-14">Seat Type</p>
                        </div>
                    </div>
                    <div className="SeatTypeGuideLinesWrpaer float-start w-100 mt-1">
                        <div className="d-flex align-items-center float-start px-2 my-1">
                            <div>
                                <div className="SeatTypeColorBox greenSeat"></div>
                            </div>
                            <div>
                                <div className="fs-10 ps-2">Free</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center float-start px-2 my-1">
                            <div>
                                <div className="SeatTypeColorBox skyBlueSeat"></div>
                            </div>
                            <div>
                                <div className="fs-10 ps-2">₹ 0-200</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center float-start px-2 my-1">
                            <div>
                                <div className="SeatTypeColorBox BlueSeat"></div>
                            </div>
                            <div>
                                <div className="fs-10 ps-2">₹ 201-400</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center float-start px-2 my-1">
                            <div>
                                <div className="SeatTypeColorBox PinkSeat"></div>
                            </div>
                            <div>
                                <div className="fs-10 ps-2">₹ 401-500</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center float-start px-2 my-1">
                            <div>
                                <div className="SeatTypeColorBox GoldSeat"></div>
                            </div>
                            <div>
                                <div className="fs-10 ps-2">₹ 501-1200</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center float-start px-2 my-1">
                            <div>
                                <div className="SeatTypeColorBox FaceColorSeat"></div>
                            </div>
                            <div>
                                <div className="fs-10 ps-2">₹ 1201-1400</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center float-start px-2 my-1">
                            <div>
                                <div className="SeatTypeColorBox LightPurpleSeat"></div>
                            </div>
                            <div>
                                <div className="fs-10 ps-2">₹ 1401-1500</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center float-start px-2 my-1">
                            <div>
                                <div className="SeatTypeColorBox DarkPurpleSeat"></div>
                            </div>
                            <div>
                                <div className="fs-10 ps-2">₹ 1501-3000</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center float-start px-2 my-1">
                            <div>
                                <div className="SeatTypeColorBox LightPinkSeat"></div>
                            </div>
                            <div>
                                <div className="fs-10 ps-2">₹ Above-3000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="float-start w-100 position-absolute bottom-0 start-0 end-0 d-none d-lg-block">
                <button className="buttonStyle3 fs-14 mt-4 border-0 py-2 w-100"
                    onClick={(e) => {
                        setSeatingSelectionDone(isAnySeatSelected());
                        setShowSeatSelectionModal(false)
                    }}
                >Continue Booking</button>
            </div>
        </>
    );
}