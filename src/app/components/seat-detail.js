import { useEffect, useState } from "react";

export default function SeatDetail(props) {

    const [passenger, setPassenger] = useState(null);
    const [selectedPaxIndex, setSelectedPaxIndex] = useState(0);

    const seat = props.seat;
    const segment = props.segment;
    const selectSeat = props.selectSeat;

    useEffect(() => {

        getSetPaxInex();

    }, [segment, selectSeat])

    const getSetPaxInex = () => {

        if (!segment || !segment.passengers) {
            return;
        }

        let pIndex = -1;

        for (let p = 0; p < segment.passengers.length; p++) {

            if (!segment.passengers[p].seat) {

                setPassenger(segment.passengers[p]);

                setSelectedPaxIndex(p);

                pIndex = p

                break;
            }
        }

        if (pIndex == -1) {

            if (selectedPaxIndex >= segment.passengers.length - 1) {
                pIndex = 0;
            }
            else {
                pIndex = selectedPaxIndex + 1;
            }

            setPassenger(segment.passengers[pIndex]);

            setSelectedPaxIndex(pIndex);
        }

        return pIndex;
    }

    const getSeatType = (seat) => {

        if (!seat || !seat.seatType) {
            return '';
        }
        switch (seat.seatType) {
            case 1:
                return 'Window';
            case 2:
                return 'Aisle';
            case 3:
                return 'Middle';
            default:
                return 'Window';//TODO:: we have more options to confirm
        }

    }

    const getSeatSymbol = (seat) => {

        let isSeatAssignedToPax = segment.passengers.some((p, i) => {
            return p.seat && seat.code == p.seat.code;
        });

        if (isSeatAssignedToPax) {

            let pIndex = segment.passengers.findIndex(x => x.seat && seat.code == x.seat.code);
            return segment.passengers[pIndex].label;
        }

        if (seat.availablityType == 1) {
            return '₹';
        }

        return '';
    }

    const getSelectedPax = (seat) => {

        let isSeatAssignedToPax = segment.passengers.some((p, i) => {
            return p.seat && seat.code == p.seat.code;
        });

        if (isSeatAssignedToPax) {

            let pIndex = segment.passengers.findIndex(x => x.seat && seat.code == x.seat.code);
            return segment.passengers[pIndex];
        }

        return passenger;
    }

    const getSelectedPaxIndex = (seat) => {

        let isSeatAssignedToPax = segment.passengers.some((p, i) => {
            return p.seat && seat.code == p.seat.code;
        });

        if (isSeatAssignedToPax) {

            let pIndex = segment.passengers.findIndex(x => x.seat && seat.code == x.seat.code);
            return pIndex;
        }

        return selectedPaxIndex;
    }

    return (

        <>
            <div className="dropdown">
                <button className="p-0 border-0 bg-transparent w-100 after-none dropdown-toggle"
                    type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                    onClick={() => {

                    }}
                >
                    <span className="fs-16 color-white">{`${getSeatSymbol(seat)}`}</span>
                </button>
                <ul className="dropdown-menu border-0 rounded-0 shadow p-2 SeatSelectionDetailDropDown" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="mb-0 fs-12">Select Seat For</p>
                            </div>
                            <div>
                                {segment &&
                                    <p className="mb-0 fs-12 fw-bold">{segment.segmentData.rowSeats[0].seats[0].origin}-{segment.segmentData.rowSeats[0].seats[0].destination}</p>
                                }
                            </div>
                        </div>
                        <div className="fs-16 fw-bold mb-1">{`${getSelectedPax(seat)?.name}`}</div>
                        <div className="border">
                            <div className="d-flex justify-content-between bg-light-blue p-2">
                                <div>
                                    <p className="mb-0 fs-14 fw-bold">{seat?.code} ({getSeatType(seat)})</p>
                                </div>
                                <div>
                                    <p className="mb-0 fs-14 fw-bold">₹ {seat?.price}</p>
                                </div>
                            </div>
                            <p className="mb-0 fs-12 p-2">If the pre-booked seat is unavailable due to operational reasons, you will be eligible for a refund of the seat fee.</p>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">
                                <button className="bg-grey color-blue w-100 fs-14 py-2 border border-blue"
                                >Cancel</button>
                            </div>
                            <div className="col-6">
                                <button className="bg-blue color-white w-100 fs-14 py-2 border border-blue"
                                    onClick={(e) => {
                                        selectSeat(getSelectedPaxIndex(seat), seat, false);
                                    }}
                                >Book</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}