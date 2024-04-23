import CircularJSON from "circular-json";
import { getDiffFromMinutes, getFormattedDate, getFormattedDate5, getFormattedTime, numberFormat } from "../helpers/common";
import { useEffect, useState } from "react";
import { GDSNames } from "../helpers/constants";
import { airlineLogoLoader, trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";

export default function FlightDetailFlap(props) {
    const [_keyStr] = useState("abcdefghijklmnopqrstuvwxyz0123456789+/=ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const [selectedTab, setSelectedTab] = useState(0);
    const [isSelectClicked, setIsSelectClicked] = useState(false)

    useEffect(() => {
        setSelectedTab(props.selectedTabIndex);
    }, [props.selectedTabIndex]);

    const _utf8_encode = (e) => {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t +=
                    String.fromCharCode(r >> 6 | 192);
                t +=
                    String.fromCharCode(r & 63 | 128)
            } else {
                t +=
                    String.fromCharCode(r >> 12 | 224);
                t +=
                    String.fromCharCode(r >> 6 & 63 | 128);
                t +=
                    String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    }

    const encodeData = (e) => {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = _utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t +
                _keyStr.charAt(s) +
                _keyStr.charAt(o) +
                _keyStr.charAt(u) +
                _keyStr.charAt(a)
        }
        return t
    }


    return (
        <div className="offcanvas-body">
            <ul className="nav nav-pills mb-4" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className={selectedTab == 0 ? "nav-link active" : "nav-link"} id="departureFlight-tab" data-bs-toggle="pill" data-bs-target="#departureFlight" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => setSelectedTab(0)}>Departure Flight</button>
                </li>
                {
                    props.selectedFlight.trips.length > 1 &&
                    <li className="nav-item" role="presentation">
                        <button className={selectedTab == 1 ? "nav-link active" : "nav-link"} id="returnFlight-tab" data-bs-toggle="pill" data-bs-target="#returnFlight" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setSelectedTab(1)}>Return Flight</button>
                    </li>
                }
                {
                    props.selectedFlight.baggageOptions &&
                    <li className="nav-item" role="presentation">
                        <button className={selectedTab == 2 ? "nav-link active" : "nav-link"} id="baggageDetails-tab" data-bs-toggle="pill" data-bs-target="#baggageDetails" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={() => setSelectedTab(2)}>Baggage Details</button>
                    </li>
                }
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className={selectedTab == 0 ? "tab-pane fade show active" : "tab-pane fade"} id="departureFlight" role="tabpanel" aria-labelledby="departureFlight-tab">
                    <div className='flap-flight-details'>
                        <div className="row justify-content-between">
                            <div className="col-sm-12 col-md-8 col-lg-8 col-xl-9 col-xxl-9">
                                <h4 className='text-start'>{getFormattedTime(props.selectedFlight.trips[0].listOfFlight[0].departureTime)} - {getFormattedTime(props.selectedFlight.trips[0].listOfFlight[props.selectedFlight.trips[0].listOfFlight.length - 1].arrivalTime)} ({props.selectedFlight.trips[0].listOfFlight.length == 1 ? "Non-Stop" : (props.selectedFlight.trips[0].listOfFlight.length - 1 + (props.selectedFlight.trips[0].listOfFlight.length == 2 ? " Stop" : " Stops"))})<span className="orange-text">{props.selectedFlight.departDays > 0 ? "+" + props.selectedFlight.departDays : ""}</span></h4>
                            </div>
                            {
                                (props.selectedFlight.gdsName == GDSNames.Kiwi && props.selectedFlight.pnrCount > 1) &&
                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                                    <div className="dropdown d-table float-end dropdown-hover dual-tickets-tooltip right-0">
                                        <button className="dropdown-toggle after-none align-items-center " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                                            <span>Dual Tickets</span>
                                            <Image
                                                className="ms-2"
                                                loader={trvLoader}
                                                src="icon/info-icon.svg"
                                                alt="info-icon"
                                                width={25}
                                                height={25}
                                            />
                                        </button>
                                        <ul className="dropdown-menu p-3 bg-black" aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <p className='fw-bold fs-14 mb-2 color-white'>Dual Tickets (Multi-Tickets)</p>
                                                <ul className="m-0 ms-0 ps-3 color-white">
                                                    <li className='mb-1'>It combines two one-way tickets for a customized itinerary. </li>
                                                    <li className='mb-1'>Each ticket is subject to its own rules &amp; regulations.</li>
                                                    <li className='mb-1'>If one flight changes or gets canceled, the other remains unaffected.</li>
                                                    <li>Modifying the other flight in the itinerary will incur charges.</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }

                        </div>
                        {props.selectedFlight.returnDays > 0 && <h5 className='text-start pt-3'>Arrives {getFormattedDate5(props.selectedFlight.trips[0].listOfFlight[props.selectedFlight.trips[0].listOfFlight.length - 1].arrivalAt)}</h5>}



                        {
                            props.selectedFlight.trips[0].listOfFlight.map((fl, ix) => {
                                var difference = getDiffFromMinutes(fl.flightDuration);
                                return (
                                    <div className='flight-box-mainwrq' key={ix}>
                                        <div className="airlinelogo d-flex align-items-center mt-2 mb-3">
                                            <Image
                                                className="airline-logo h-auto"
                                                loader={airlineLogoLoader}
                                                src={`airline-logo/${fl.marketingCarrier}.webp?q=100`}
                                                alt="airplane-plus-icon"
                                                width={35}
                                                height={43}
                                            />
                                            <span className="ps-3">{fl.airlineName}  {getFormattedDate(fl?.departureDate)} </span>

                                        </div>
                                        <div className="row airbox-details align-items-center">
                                            {
                                                (fl.airlineName != fl.operatedBy && !!fl.operatedBy) &&
                                                <span className="ob float-start w-100 text-start orange-text">Operated By: {fl.operatedBy}</span>
                                            }
                                            <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 text-start pe-0">
                                                <h6 className='fw-bold mb-0'>{getFormattedTime(fl.departureTime)}</h6>
                                                <span className="mb-0">{fl?.fromAirportName} ({fl.fromCode})</span>
                                            </div>
                                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                <div className="d-flex align-items-center">
                                                    <div className="w-25 airbox-details-air-icon">
                                                        <Image
                                                            className="h-auto float-end me-2"
                                                            loader={trvLoader}
                                                            src="icon/depart-air-purple-icon.svg"
                                                            alt="Depart Air Icon"
                                                            width={25}
                                                            height={15}
                                                        />
                                                    </div>
                                                    <div className="w-50 airbox-details-dot-line text-center">
                                                        <span>{difference}</span>
                                                        <hr />
                                                        <span className="airline-code d-flex pt-1">{fl?.marketingCarrier}-{fl?.flightNumber} | Boeing {fl?.equipmentType} </span>
                                                    </div>
                                                    <div className="w-25 airbox-details-air-icon">
                                                        <Image
                                                            className="h-auto float-start ms-2"
                                                            loader={trvLoader}
                                                            src="icon/return-air-purple-icon.svg"
                                                            alt="Return Air Icon"
                                                            width={25}
                                                            height={15}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 ps-0">
                                                <h6 className='fw-bold mb-0'>{getFormattedTime(fl.arrivalTime)}</h6>
                                                <span className="mb-0">{fl?.toAirportName} ({fl.toCode})</span>
                                                {
                                                    (fl.departeddate != fl?.arrivalAt) &&
                                                    <div className="flight-time-alrt">
                                                        {/* <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> */}
                                                        <span className="orange-text">Arrives {getFormattedDate(fl.arrivalAt)}</span>
                                                    </div>
                                                }
                                            </div>

                                        </div>
                                        {
                                            !!fl.displayLayOverTime &&
                                            <div className='flight-lawover text-center mt-3 mb-3 pt-2 pb-2'>Layover: {fl.displayLayOverTime} in {fl.airportToCity}</div>
                                        }
                                    </div>
                                )
                            })
                        }
                        {/* {props.selectedFlight.departDays > 0 && <h5 className='text-start'>Arrives {getFormattedDate5(props.selectedFlight.trips[0].listOfFlight[props.selectedFlight.trips[0].listOfFlight.length - 1].arrivalAt)}</h5>} */}
                    </div>
                </div>
                {
                    props.selectedFlight.trips.length > 1 &&
                    <div className={selectedTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="returnFlight" role="tabpanel" aria-labelledby="returnFlight-tab">
                        <div className='flap-flight-details'>
                            <div className="row justify-content-between">
                                <div className="col-sm-12 col-md-8 col-lg-8 col-xl-9 col-xxl-9">
                                    <h4 className='text-start'>{getFormattedTime(props.selectedFlight.trips[1].listOfFlight[0].departureTime)} - {getFormattedTime(props.selectedFlight.trips[1].listOfFlight[props.selectedFlight.trips[1].listOfFlight.length - 1].arrivalTime)} ({props.selectedFlight.trips[1].listOfFlight.length == 1 ? "Non-Stop" : (props.selectedFlight.trips[1].listOfFlight.length - 1 + (props.selectedFlight.trips[1].listOfFlight.length == 2 ? " Stop" : " Stops"))})<span className="orange-text">{props.selectedFlight.returnDays > 0 ? "+" + props.selectedFlight.returnDays : ""}</span></h4>
                                </div>
                                {
                                    (props.selectedFlight.gdsName == GDSNames.Kiwi && props.selectedFlight.pnrCount > 1) &&
                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                                        <div className="dropdown d-table float-end dropdown-hover dual-tickets-tooltip right-0">
                                            <button className="dropdown-toggle after-none align-items-center " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                                                <span>Dual Tickets</span>
                                                <Image
                                                    className="ms-2"
                                                    loader={trvLoader}
                                                    src="icon/info-icon.svg"
                                                    alt="info-icon"
                                                    width={25}
                                                    height={25}
                                                />
                                            </button>
                                            <ul className="dropdown-menu p-3 bg-black" aria-labelledby="dropdownMenuButton1">
                                                <li>
                                                    <p className='fw-bold fs-14 mb-2 color-white'>Dual Tickets (Multi-Tickets)</p>
                                                    <ul className="m-0 ms-0 ps-3 color-white">
                                                        <li className='mb-1'>It combines two one-way tickets for a customized itinerary. </li>
                                                        <li className='mb-1'>Each ticket is subject to its own rules &amp; regulations.</li>
                                                        <li className='mb-1'>If one flight changes or gets canceled, the other remains unaffected.</li>
                                                        <li>Modifying the other flight in the itinerary will incur charges.</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                }

                            </div>
                            {props.selectedFlight.returnDays > 0 && <h5 className='text-start pt-3'>Arrives {getFormattedDate5(props.selectedFlight.trips[1].listOfFlight[props.selectedFlight.trips[1].listOfFlight.length - 1].arrivalAt)}</h5>}



                            {
                                props.selectedFlight.trips[1].listOfFlight.map((fl, index) => {
                                    var difference = getDiffFromMinutes(fl.flightDuration);
                                    return (
                                        <div className='flight-box-mainwrq' key={index}>
                                            <div className="airlinelogo d-flex align-items-center mt-4 mb-3">
                                                <Image
                                                    className="airline-logo h-auto"
                                                    loader={airlineLogoLoader}
                                                    src={`airline-logo/${fl.marketingCarrier}.webp?q=100`}
                                                    alt="airplane-plus-icon"
                                                    width={35}
                                                    height={43}
                                                />
                                                <span className="ps-3">{fl.airlineName}  {getFormattedDate(fl?.departureDate)}</span>
                                            </div>

                                            <div className="row airbox-details align-items-center">
                                                {
                                                    (fl.airlineName != fl.operatedBy && !!fl.operatedBy) &&
                                                    <span className="ob float-start w-100 text-start orange-text">Operated By: {fl.operatedBy}</span>
                                                }
                                                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 text-start pe-0">
                                                    <h6 className='fw-bold mb-0'>{getFormattedTime(fl.departureTime)}</h6>
                                                    <span className="mb-0">{fl?.fromAirportName} ({fl.fromCode})</span>
                                                </div>
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                    <div className="d-flex align-items-center">
                                                        <div className="w-25 airbox-details-air-icon">
                                                            <Image
                                                                className="h-auto float-end me-2"
                                                                loader={trvLoader}
                                                                src="icon/depart-air-purple-icon.svg"
                                                                alt="Depart Air Icon"
                                                                width={25}
                                                                height={15}
                                                            />
                                                        </div>
                                                        <div className="w-50 airbox-details-dot-line text-center">
                                                            <span>{difference}</span>
                                                            <hr />
                                                            <span>{fl?.marketingCarrier}-{fl?.flightNumber} | Boeing {fl?.equipmentType} </span>
                                                        </div>
                                                        <div className="w-25 airbox-details-air-icon">
                                                            <Image
                                                                className="h-auto float-start ms-2"
                                                                loader={trvLoader}
                                                                src="icon/return-air-purple-icon.svg"
                                                                alt="Return Air Icon"
                                                                width={25}
                                                                height={15}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 ps-0">
                                                    <h6 className='fw-bold mb-0'>{getFormattedTime(fl.arrivalTime)}</h6>
                                                    <span className="mb-0">{fl?.toAirportName} ({fl.toCode})</span>
                                                    {
                                                        (fl.departeddate != fl?.arrivalAt) &&
                                                        <div className="flight-time-alrt">
                                                            {/* <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> */}
                                                            <span className="orange-text">Arrives {getFormattedDate(fl.arrivalAt)}</span>
                                                        </div>
                                                    }
                                                </div>

                                            </div>
                                            {
                                                !!fl.displayLayOverTime &&
                                                <div className='flight-lawover text-center mt-3 mb-3 pt-2 pb-2'>Layover: {fl.displayLayOverTime} in {fl.airportToCity}</div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
                {
                    props.selectedFlight.baggageOptions &&
                    <div className={selectedTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="baggageDetails" role="tabpanel" aria-labelledby="baggageDetails-tab">
                        <div className='flap-flight-details'>
                            <h4 className='text-start'>Baggage per person</h4>
                            <div className='baggage-details mt-4'>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="departure-bag-tab" data-bs-toggle="tab" data-bs-target="#departure-bag" type="button" role="tab" aria-controls="departure-bag" aria-selected="true">Departure ({props.selectedFlight.trips[0].listOfFlight[0].fromCode} to {props.selectedFlight.trips[0].listOfFlight[props.selectedFlight.trips[0].listOfFlight.length - 1].toCode})</button>
                                    </li>
                                    {
                                        props.selectedFlight.trips.length > 1 &&
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="return-bag-tab" data-bs-toggle="tab" data-bs-target="#return-bag" type="button" role="tab" aria-controls="return-bag" aria-selected="false">Return ({props.selectedFlight.trips[0].listOfFlight[props.selectedFlight.trips[0].listOfFlight.length - 1].toCode} to {props.selectedFlight.trips[0].listOfFlight[0].fromCode})</button>
                                        </li>
                                    }
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="departure-bag" role="tabpanel" aria-labelledby="departure-bag-tab">
                                        <div className="add-baggage d-flex mt-4">
                                            <div className="add-baggage-icon">
                                                <Image
                                                    className="me-2"
                                                    loader={trvLoader}
                                                    src="icon/personal-item-icon.svg"
                                                    alt="personal item icon"
                                                    width={176}
                                                    height={43}
                                                />
                                            </div>
                                            <div className="add-baggage-title">
                                                <h5 className="mb-1 d-flex align-items-center">
                                                    <div className="add-baggage-heading">Personal Item</div>
                                                </h5>
                                                <h6 className="mb-1 d-flex align-items-center">
                                                    <span>Purse, small backpack, briefcase</span>
                                                </h6>
                                                <h6 className="mb-0 d-flex align-items-center">
                                                    <Image
                                                        className="h-auto"
                                                        loader={trvLoader}
                                                        src={props.selectedFlight.baggageOptions.personalItem == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                        alt="bag icon"
                                                        width={15}
                                                        height={43}
                                                    />
                                                    <span>{props.selectedFlight.baggageOptions.personalItem}</span>
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="add-baggage d-flex mt-4">
                                            <div className="add-baggage-icon">
                                                <Image
                                                    className="me-2"
                                                    loader={trvLoader}
                                                    src="icon/carry-on-bags-icon.svg"
                                                    alt="carry bag icon"
                                                    width={176}
                                                    height={43}
                                                />
                                            </div>
                                            <div className="add-baggage-title">
                                                <h5 className="mb-1 d-flex align-items-center">
                                                    <div className="add-baggage-heading">Carry on Bags</div>
                                                </h5>
                                                <h6 className="mb-1 d-flex align-items-center">
                                                    <span>Fits in overhead bin or under the seat</span>
                                                </h6>
                                                <h6 className="mb-0 d-flex align-items-center">
                                                    <Image
                                                        className="h-auto"
                                                        loader={trvLoader}
                                                        src={props.selectedFlight.baggageOptions.carryOnBag == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                        alt="bag icon"
                                                        width={15}
                                                        height={43}
                                                    />
                                                    <span>{props.selectedFlight.baggageOptions.carryOnBag}</span>
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="add-baggage d-flex mt-4">
                                            <div className="add-baggage-icon">
                                                <Image
                                                    className="me-2"
                                                    loader={trvLoader}
                                                    src="icon/checked-bag-icon.svg"
                                                    alt="checked bag icon"
                                                    width={176}
                                                    height={43}
                                                />
                                            </div>
                                            <div className="add-baggage-title">
                                                <h5 className="mb-1 d-flex align-items-center">
                                                    <div className="add-baggage-heading">Checked Bag</div>
                                                </h5>
                                                <h6 className="mb-1 d-flex align-items-center">
                                                    <span>Upto 50 lbs</span>
                                                </h6>
                                                <h6 className="mb-0 d-flex align-items-center">
                                                    <Image
                                                        className="h-auto"
                                                        loader={trvLoader}
                                                        src={props.selectedFlight.baggageOptions.checkedBag == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                        alt="bag icon"
                                                        width={15}
                                                        height={43}
                                                    />
                                                    <span>{props.selectedFlight.baggageOptions.checkedBag}</span>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="return-bag" role="tabpanel" aria-labelledby="return-bag-tab">
                                        <div className="add-baggage d-flex mt-4">
                                            <div className="add-baggage-icon">
                                                <Image
                                                    className="me-2"
                                                    loader={trvLoader}
                                                    src="icon/personal-item-icon.svg"
                                                    alt="personal item icon"
                                                    width={176}
                                                    height={43}
                                                />
                                            </div>
                                            <div className="add-baggage-title">
                                                <h5 className="mb-1 d-flex align-items-center">
                                                    <div className="add-baggage-heading">Personal Item</div>
                                                </h5>
                                                <h6 className="mb-1 d-flex align-items-center">
                                                    <span>Purse, small backpack, briefcase</span>
                                                </h6>
                                                <h6 className="mb-0 d-flex align-items-center">
                                                    <Image
                                                        className="h-auto"
                                                        loader={trvLoader}
                                                        src={props.selectedFlight.baggageOptions.personalItem == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                        alt="bag icon"
                                                        width={15}
                                                        height={43}
                                                    />
                                                    <span>{props.selectedFlight.baggageOptions.personalItem}</span>
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="add-baggage d-flex mt-4">
                                            <div className="add-baggage-icon">
                                                <Image
                                                    className="me-2"
                                                    loader={trvLoader}
                                                    src="icon/carry-on-bags-icon.svg"
                                                    alt="carry bag icon"
                                                    width={176}
                                                    height={43}
                                                />
                                            </div>
                                            <div className="add-baggage-title">
                                                <h5 className="mb-1 d-flex align-items-center">
                                                    <div className="add-baggage-heading">Carry on Bags</div>
                                                </h5>
                                                <h6 className="mb-1 d-flex align-items-center">
                                                    <span>Fits in overhead bin or under the seat</span>
                                                </h6>
                                                <h6 className="mb-0 d-flex align-items-center">
                                                    <Image
                                                        className="h-auto"
                                                        loader={trvLoader}
                                                        src={props.selectedFlight.baggageOptions.carryOnBag == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                        alt="bag icon"
                                                        width={15}
                                                        height={43}
                                                    />
                                                    <span>{props.selectedFlight.baggageOptions.carryOnBag}</span>
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="add-baggage d-flex mt-4">
                                            <div className="add-baggage-icon">
                                                <Image
                                                    className="me-2"
                                                    loader={trvLoader}
                                                    src="icon/checked-bag-icon.svg"
                                                    alt="checked bag icon"
                                                    width={176}
                                                    height={43}
                                                />
                                            </div>
                                            <div className="add-baggage-title">
                                                <h5 className="mb-1 d-flex align-items-center">
                                                    <div className="add-baggage-heading">Checked Bag</div>
                                                </h5>
                                                <h6 className="mb-1 d-flex align-items-center">
                                                    <span>Upto 50 lbs</span>
                                                </h6>
                                                <h6 className="mb-0 d-flex align-items-center">
                                                    <Image
                                                        className="h-auto"
                                                        loader={trvLoader}
                                                        src={props.selectedFlight.baggageOptions.checkedBag == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                        alt="bag icon"
                                                        width={15}
                                                        height={43}
                                                    />
                                                    <span>{props.selectedFlight.baggageOptions.checkedBag}</span>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className='position-absolute flap-total-price'>
                <div className='row align-items-center ms-0 me-0'>
                    <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-start'>
                        <h2 className='mb-0'>{(numberFormat(Number(props.selectedFlight.avgPrice) + Number(props?.superSaverService?.price ? (props?.sssPassangers * props?.superSaverService?.price) : 0))).split(".")[0]}.<sup>{(numberFormat(Number(props?.selectedFlight?.avgPrice) + Number(props?.superSaverService?.price ? (props?.sssPassangers * props?.superSaverService?.price) : 0))).split(".")[1]}</sup></h2>
                        {props.selectedFlight.totalPassangers > 1
                            ? <>
                                <p className='mb-0'>Price per Traveler</p>
                                <p className='mb-0'><strong>{numberFormat(props.selectedFlight.totalPrice).split(".")[0]}.<sup>{numberFormat(props.selectedFlight.totalPrice).split(".")[1]}</sup></strong> {props.selectedFlight.trips.length > 1 && "RoundTrip"} for {props.selectedFlight.totalPassangers} Travelers</p>
                            </>
                            : <p className="mb-0">Price {props.selectedFlight.trips.length > 1 ? "for Round Trip" : "per Adult"}</p>
                        }
                    </div>
                    <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-end'>
                        {/* <button className="buttonStyle3 border fs-14 next listing-cont-btn d-flex align-items-center float-end" onClick={async () => {
                            if (props.isCheckoutPage)
                                return;
                            props.setLoader(true);
                            setIsSelectClicked(true);

                            await props.checkPriceChangeInKiwi(props.selectedFlight).then((flight) => {
                                if (!flight) {
                                    setIsSelectClicked(false)
                                    props.setLoader(false);
                                    return;
                                }

                                setTimeout(() => {
                                    setIsSelectClicked(false)
                                    props.setLoader(false);
                                }, 2000);


                                window.localStorage.setItem("currentFlight", CircularJSON.stringify(flight));

                                props.gotoCheckoutPage(flight);

                            });
                        }}>
                            {isSelectClicked
                                && <div className="spinner-border me-2" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            }
                            <span className="">Select</span>
                        </button> */}
                        {/* <button type="button" className="next checkout-cont-btn" data-bs-dismiss="offcanvas" aria-label="Close">Continue</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}