import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";
import { trvLoader } from "../helpers/imageKitLoader";

export default function ModifySearchFormDetail(props) {
    const [showTravelersCount, SetShowTravelersCount] = useState(false)
    const [isSearching, setIsSearching] = useState(false);
    const [menuAdults, setMenuAdults] = useState(props.adults);
    const [menuChildren, setMenuChildren] = useState(props.children);

    const modifySearch = () => {
        setIsSearching(true);
        setTimeout(() => {
            props.setAdults(menuAdults);
            props.setChildren(menuChildren);
            props.setTotalPax(menuAdults + menuChildren);
            props.modifyPackage(menuAdults + menuChildren);
            setIsSearching(false);
        }, 800);
    }

    return (

        <section className="py-0 bg-blue">
            <div className='container'>
                <div className="flightSearchWrp rounded-3">
                    <div className="mainFlightSearchBox py-2">
                        <div className="row align-items-center">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-4 py-2">
                                <div className="fromTofromBox">
                                    <div className="fromTofromBoxLabel fs-12 color-white">TO</div>
                                    <div className="dropdown cityBoxDropDown">
                                        <h6 className="dateLabel mt-1 mb-1 color-white">
                                            <span>{props.destination}</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-3 py-2">
                                <div className='trv-datepicker position-relative '>
                                    <div className="fromTofromBoxLabel fs-12 d-flex align-items-center">
                                        <span>
                                            <Image
                                                className="me-2"
                                                loader={trvLoader}
                                                src="icon/calendar-white-icon.svg"
                                                alt="calendar icon"
                                                width={15}
                                                height={15}
                                            />
                                        </span>
                                        <div className="pt-1 color-white">DEPART</div>
                                    </div>
                                    <h6 className="dateLabel mt-1 mb-1 color-white">
                                        <span className="me-2">{props.fromDate?.getDate()}</span>
                                        {props.fromDate.toLocaleDateString('en-IN', { month: 'long' }).substr(0, 3)}’{props.fromDate.getFullYear().toString().substr(2)}
                                    </h6>
                                    <div className="airPortName fs-12 color-white">{props.fromDate.toLocaleDateString('en-IN', { weekday: 'long' })}</div>
                                    <DatePicker
                                        selected={props.fromDate}
                                        showMonthSelect
                                        showYearSelect
                                        showMonthDropdown
                                        showYearDropdown
                                        onChange={(date) => props.setFromDate(date)}
                                        minDate={new Date()}
                                        dateFormat="dd/MMM/yy"
                                        className='form-control d-flex w-100 h-100 bg-transparent border border-0'
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-3 py-2">
                                <div className="fromTofromBoxLabel fs-12 d-flex align-items-center">
                                    <div>
                                        <Image
                                            className="me-2"
                                            loader={trvLoader}
                                            src="icon/user-white-icon.svg"
                                            alt="User Icon"
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                    <div className="pt-1 color-white">TRAVELERS</div>
                                </div>
                                <div className=" cityBoxDropDown position-relative">
                                    <button className="color-white w-100 text-start after-none p-0 btn border-0 dropdown-toggle" onClick={() => SetShowTravelersCount(true)}>
                                        <h6 className="dateLabel mt-1 mb-1"><span className="me-2">{menuAdults + menuChildren}</span>Travelers</h6>
                                    </button>
                                    <div className={showTravelersCount ? "p-0 rounded-0 p-3 bg-white position-absolute top-0 travelers-card border border-1" : "dropdown-menu p-0 rounded-0"}>
                                        <div className='row'>
                                            <div className='col-12 pb-3'>
                                                <div className='passenger-count'>
                                                    <div className='row d-flex align-items-center px-2 py-2'>
                                                        <div className='col-5 d-flex flex-column'>
                                                            <p className='mb-0 lh-1'>Adults</p>
                                                        </div>
                                                        <div className='col-7 passenger-count-btn'>
                                                            <NumericInput
                                                                strict
                                                                onKeyDown={(evt) => evt.preventDefault()}
                                                                className='custom-traveler-input border-0 border d-flex'
                                                                value={menuAdults}
                                                                min={1}
                                                                max={10}
                                                                onChange={(e) => setMenuAdults(e)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='row d-flex align-items-center px-2 py-2'>
                                                        <div className='col-5 d-flex flex-column'>
                                                            <p className='mb-0 lh-1'>Children</p>
                                                            <small className='fs-10'>2- 12 Years</small>
                                                        </div>
                                                        <div className='col-7 passenger-count-btn'>
                                                            <NumericInput
                                                                strict
                                                                onKeyDown={(evt) => evt.preventDefault()}
                                                                className='custom-traveler-input border-0 border d-flex'
                                                                value={menuChildren}
                                                                min={0}
                                                                max={10}
                                                                onChange={(e) => setMenuChildren(e)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className='col-12 d-flex justify-content-end'>
                                                <button type="button" className="text-capitalize bg-orange  border-0 color-white fs-12 px-2 pull-right py-2 rounded-3 h-auto" onClick={() => SetShowTravelersCount(false)}>Done</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-2 py-2">
                                <button className="buttonStyle1 border-0 color-white fs-14 px-2 w-100 py-3 rounded-3" disabled={isSearching} onClick={() => modifySearch()}>
                                    {isSearching
                                        ? <span className="spinner-border text-white" role="status"></span>
                                        : <span className="fw-bold">Modify</span>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}