import Image from "next/image";
import { myCustomLoader, trvCustomLoader, trvLoader } from "../helpers/imageKitLoader";
import SeatSelectionDetail from "./seat-selection-details";
import SeatDetail from "./seat-detail";
import { use, useEffect, useState } from "react";
// import { debug } from "memory-cache";
import { numberFormat } from '../helpers/common';

export default function SeatSelection(props) {


    const [segment, setSegment] = useState(null);
    const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
    const [segments, setSegments] = useState(null);
    const [totalSeatPrice, setAllSeatsPrcie] = useState(0);

    const departFlightSSRServices = props.departFlightSSRServices;
    const returnFlightSSRServices = props.returnFlightSSRServices;
    const seatSelection = props.seatSelection;
    const setDepartSeats = props.setDepartSeats;
    const setReturnSeats = props.setReturnSeats;
    const setTotalSeatPrice = props.setTotalSeatPrice;
    const setShowSeatSelectionModal = props.setShowSeatSelectionModal;
    const updateSegmentsData = props.setSegments;
    const updatedSegments = props.segments;
    const setSeatingSelectionDone = props.setSeatingSelectionDone;
    const getPassengers = props.getPassengers;

    //#region Helpers
    const getColorByPrice = (seat) => {

        if (!isSeatAvailabe(seat.availablityType)) {
            return '';
        }

        let price = seat.price;

        if (price <= 0)
            return 'greenSeat';
        if (price > 0 && price <= 200)
            return 'skyBlueSeat';
        if (price > 200 && price <= 400)
            return 'BlueSeat';
        if (price > 400 && price <= 500)
            return 'PinkSeat';
        if (price > 500 && price <= 1200)
            return 'GoldSeat';
        if (price > 1200 && price <= 1400)
            return 'FaceColorSeat';
        if (price > 1400 && price <= 1500)
            return 'LightPurpleSeat';
        if (price > 1500 && price <= 3000)
            return 'DarkPurpleSeat';
        if (price > 3000)
            return 'LightPinkSeat';

        return '';

    }

    const getAvailability = (availabilityType) => {

        switch (availabilityType) {

            case 0:
                return 'not available';
            case 1:
                return 'Open';
            case 3:
                return 'reserved';
            default:
                return 'not available';

        }
    }

    const isSeatAvailabe = (availabilityType) => {
        return availabilityType == 1;
    }
    //#endregion

    const setSeatSegment = (seatsSegment) => {
        setSegment(seatsSegment);
    }

    const selectSeat = (paxIndex, seat, isCancelled) => {

        if (!isSeatAvailabe(seat.availablityType)) {
            alert(`This seat is ${getAvailability(seat.availablityType)}`);
            return '';
        }

        let allSegments = updatedSegments.length > 0 ? [...updatedSegments] : [...segments];
        let selectedSegment = allSegments[selectedSegmentIndex];
        let allPassengers = [...selectedSegment.passengers];
        let selectedPax = allPassengers[paxIndex];

        let isAssignedToAnotherPax = selectedSegment.passengers.some((p, i) => {
            return p.seat && p.seat.code == seat.code && i != paxIndex;
        });

        if (!isCancelled && isAssignedToAnotherPax) {

            alert(`This seat is booked for another person.`);
            return '';
        }


        if (isCancelled && selectedPax.seat && selectedPax.seat.code == seat.code) {
            selectedPax.seat = null;
        }
        else if (!isCancelled) {
            selectedPax.seat = seat
        }


        //set seats for booking request
        let departSeats = [];
        let returnSeats = [];
        let totalSeatPrice = 0;

        allSegments.forEach((segment) => {

            segment.passengers.forEach((passenger) => {

                if (passenger.seat) {

                    if (segment.type == 'depart') {
                        departSeats.push(passenger.seat);
                    }

                    if (segment.type == 'return') {
                        returnSeats.push(passenger.seat);
                    }

                    totalSeatPrice += passenger.seat.price;
                }

            })

        })

        setDepartSeats(departSeats);

        setReturnSeats(returnSeats);

        setTotalSeatPrice(totalSeatPrice);

        setAllSeatsPrcie(totalSeatPrice);

        setSegments(allSegments);

        updateSegmentsData(allSegments);

        //update index
        setSelectedSegmentIndex(selectedSegmentIndex);
    }


    const getSelectedSeatColor = (seat) => {

        let isSeatAssignedToPax = segment.passengers.some((p, i) => {
            return p.seat && seat.code == p.seat.code;
        });

        return isSeatAssignedToPax ? 'bg-green' : '';

    }

    const isAnySeatSelected = () => {

        let isAssignedToAnotherPax = false;

        let allSegments = updatedSegments.length > 0 ? [...updatedSegments] : [...segments];

        for (let i = 0; i < allSegments.length; i++) {

            let segment = allSegments[i];

            isAssignedToAnotherPax = segment.passengers.some((p, i) => {
                return p.seat;
            });

            if (isAssignedToAnotherPax) {
                break;
            }
        }

        return isAssignedToAnotherPax;

    }

    useEffect(() => {
        setAllSeatsPrcie(props.totalSeatPrice)
    }, [])


    return (

        <>
            <div className="row">
                <div className="col-12 col-lg-4 d-none d-lg-inline-block position-relative">
                    <SeatSelectionDetail getPassengers={getPassengers} isAnySeatSelected={isAnySeatSelected} selectedSegmentIndex={selectedSegmentIndex} selectSeat={selectSeat} setSeatingSelectionDone={setSeatingSelectionDone} updatedSegments={updatedSegments} setShowSeatSelectionModal={setShowSeatSelectionModal} setSelectedSegmentIndex={setSelectedSegmentIndex} segments={segments} setSegments={setSegments} setSeatSegment={setSeatSegment} departFlightSSRServices={departFlightSSRServices} returnFlightSSRServices={returnFlightSSRServices}></SeatSelectionDetail>
                </div>
                <div className="col-12 col-lg-8">
                    <div className="d-lg-none">
                        <div className="offcanvas offcanvas-start border-0" tabindex="-1" id="SeatDetailFlap" aria-labelledby="SeatDetailFlapLabel">
                            <div className="offcanvas-body">
                                <button type="button" className="btn-close text-reset position-absolute end-0 me-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                <SeatSelectionDetail getPassengers={getPassengers} isAnySeatSelected={isAnySeatSelected} selectedSegmentIndex={selectedSegmentIndex} selectSeat={selectSeat} setSeatingSelectionDone={setSeatingSelectionDone} updatedSegments={updatedSegments} setShowSeatSelectionModal={setShowSeatSelectionModal} setSelectedSegmentIndex={setSelectedSegmentIndex} segments={segments} setSegments={setSegments} setSeatSegment={setSeatSegment} departFlightSSRServices={departFlightSSRServices} returnFlightSSRServices={returnFlightSSRServices}></SeatSelectionDetail>
                            </div>
                        </div>
                    </div>
                    <div className="AirlineSeatBox d-flex bg-blue rounded-3 p-3 text-center position-relative">
                        <div className="AirplaneLeftPart">
                            <Image
                                className="position-absolute"
                                loader={trvLoader}
                                src="icon/airplane-part-left.png"
                                alt="Airline parts"
                                width={569}
                                height={278}
                            />
                        </div>
                        <div className="AirlineSeatMainBox">
                            <Image
                                className="h-auto w-100"
                                loader={trvLoader}
                                src="icon/airplane-part-Top.png"
                                alt="Airline parts"
                                width={176}
                                height={43}
                            />
                            <div className="bg-white border fs-14">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="SeatSelectBox bg-white">A</div>
                                    <div className="SeatSelectBox bg-white">B</div>
                                    <div className="SeatSelectBox bg-white">C</div>
                                    <div className="SeatNumberBox opacity-0">0</div>
                                    <div className="SeatSelectBox bg-white">D</div>
                                    <div className="SeatSelectBox bg-white">E</div>
                                    <div className="SeatSelectBox bg-white">F</div>
                                </div>
                                {segment && segment.segmentData.rowSeats.length > 0 &&

                                    segment.segmentData.rowSeats.map((row, i) => {

                                        return (
                                            <div>
                                                {row.seats.length < 6 &&
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <div className="SeatSelectBox"></div>
                                                        <div className="SeatSelectBox"></div>
                                                        <div className="SeatSelectBox"></div>
                                                        <div className="SeatNumberBox"></div>
                                                        <div className="SeatSelectBox"></div>
                                                        <div className="SeatSelectBox"></div>
                                                        <div className="SeatSelectBox"></div>
                                                    </div>
                                                }

                                                {row.seats.length == 6 &&
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <div className={`SeatSelectBox  ${getColorByPrice(row.seats[0])} ${getSelectedSeatColor(row.seats[0])}`}>
                                                            <SeatDetail selectSeat={selectSeat} segment={segment} seat={row.seats[0]}></SeatDetail>
                                                        </div>
                                                        <div className={`SeatSelectBox  ${getColorByPrice(row.seats[1])} ${getSelectedSeatColor(row.seats[1])}`}>
                                                            <SeatDetail selectSeat={selectSeat} segment={segment} seat={row.seats[1]}></SeatDetail>
                                                        </div>
                                                        <div className={`SeatSelectBox ${getColorByPrice(row.seats[2])} ${getSelectedSeatColor(row.seats[2])}`}>
                                                            <SeatDetail selectSeat={selectSeat} segment={segment} seat={row.seats[2]}></SeatDetail>
                                                        </div>
                                                        <div className="SeatNumberBox">{row.seats[0].rowNo}</div>
                                                        <div className={`SeatSelectBox ${getColorByPrice(row.seats[3])} ${getSelectedSeatColor(row.seats[3])}`}>
                                                            <SeatDetail selectSeat={selectSeat} segment={segment} seat={row.seats[3]}></SeatDetail>
                                                        </div>
                                                        <div className={`SeatSelectBox ${getColorByPrice(row.seats[4])} ${getSelectedSeatColor(row.seats[4])}`}>
                                                            <SeatDetail selectSeat={selectSeat} segment={segment} seat={row.seats[4]}></SeatDetail>
                                                        </div>
                                                        <div className={`SeatSelectBox ${getColorByPrice(row.seats[5])} ${getSelectedSeatColor(row.seats[5])}`}>
                                                            <SeatDetail selectSeat={selectSeat} segment={segment} seat={row.seats[5]}></SeatDetail>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        );
                                    })


                                }



                            </div>
                            <div className="AirplaneBottomPart">
                                <Image
                                    className="h-auto"
                                    loader={trvLoader}
                                    src="icon/airplane-part-bottom.png"
                                    alt="Airline parts"
                                    width={569}
                                    height={278}
                                />
                            </div>
                        </div>
                        <div className="AirplaneRightPart">
                            <Image
                                className="position-absolute"
                                loader={trvLoader}
                                src="icon/airplane-part-right.png"
                                alt="Airline parts"
                                width={569}
                                height={278}
                            />
                        </div>
                        <div className="position-fixed SeatSelectionMobileFlap bottom-0 start-0 end-0 w-100 bg-white py-3 d-lg-none">
                            <div className="row m-0 align-items-center">
                                <div className="col-6 text-start">
                                    <h5 className="mb-0 fw-bold"><span className="fw-normal fs-14 opacity-75">Total Seat Fare:</span><br /> {numberFormat(Math.round(totalSeatPrice)).split(".")[0]}<sup>.{numberFormat(Math.round(totalSeatPrice)).split(".")[1]}</sup></h5>
                                    <button className="SeatDetailFlapbtn float-start p-0 mt-0 btn color-blue" type="button" data-bs-toggle="offcanvas" data-bs-target="#SeatDetailFlap" aria-controls="SeatDetailFlap">
                                        <span className="fs-12 fw-bold ">Seat Details</span>
                                    </button>
                                </div>
                                <div className="col-6"


                                >
                                    <button className="bg-orange color-white fs-14 px-3 rounded-2 border-0 py-2"

                                        onClick={(e) => {
                                            setSeatingSelectionDone(isAnySeatSelected());
                                            setShowSeatSelectionModal(false)
                                        }}

                                    >Continue Booking</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}