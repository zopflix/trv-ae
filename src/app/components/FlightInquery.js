"use client"

import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { checkMaxDateRange, getMaxDatePicker } from "../helpers/common";
import PhoneInput from "react-phone-input-2";




export default function FlightInqueryForm() {
    const [tripType, setTripType] = useState(1);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [phoneCode, setPhoneCode] = useState("1");
    const [contactNo, setContactNo] = useState("");
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const submitInquiry = async () => {
        setIsLoading(true);
        if (!email) {
            setIsValidEmail(false);
            setIsLoading(false);
        }

        if (!contactNo) {
            setIsValidPhoneNumber(false);
            setIsLoading(false);
        }

        if (!email || !contactNo)
            return;

        if (!isValidPhoneNumber || !isValidEmail) {
            setIsLoading(false);
            return;
        }

        let fromCountry = airportsData.find((z) => z.value == fromCode)?.country;
        let toCountry = airportsData.find((z) => z.value == toCode)?.country;

        let segments = [
            {
                fromCode: fromCode,
                toCode: toCode,
                departureDate: moment(fromDate).format("MM/DD/YYYY"),
                fromLabel: '',
                toLabel: '',
                fromCountry: fromCountry,
                toCountry: toCountry,
            },
        ];
        if (toDate && tripType == 2) {
            segments.push({
                fromCode: toCode,
                toCode: fromCode,
                departureDate: moment(toDate).format("MM/DD/YYYY"),
                fromLabel: '',
                toLabel: '',
                fromCountry: toCountry,
                toCountry: fromCountry,
            });
        } else {
            setTripType(1);
            setToDate("");
        }

        //reading UTM source from the sessionStorage
        let utmData = sessionStorage.getItem("utmData");
        let utmMedium = null;
        let utmTerm = null;
        let utmSource = null;
        if (!!utmData) {
            let parsedData = JSON.parse(utmData);
            utmMedium = parsedData.utm_medium;
            utmTerm = parsedData.utm_term;
            utmSource = parsedData.utm_source;
        }

        let data = {
            portalID: 105, // here 105 is the ID for the Portal Faremaze India
            firstName: "Traveller",
            email: email,
            contactNo: "+" + phoneCode + " " + contactNo,
            cabin: props.cabin ? props.cabin : 1,
            childs: 0,
            adults: 1,
            infants: 0,
            tripType: tripType,
            chargedCurrency: "USD",
            source: 4,
            from: fromCode,
            to: toCode,
            travelDate: moment(fromDate).format("MM/DD/YYYY").toString(),
            returnDate: tripType == 2 ? moment(toDate).format("MM/DD/YYYY").toString() : '',
            referer: 'faremaze.com/in',
            utm_term: utmTerm,
            utm_source: utmSource,
            utm_medium: utmMedium
        };

        await trackMixpanelEvent('Deal_Inquiry', null, false, null, data);

        saveInquiryOldCrm(data).then((res) => {
            if (!!res)
                localStorage.setItem('inquiryResponse', res);

            sessionStorage.setItem('inquiryContact', JSON.stringify({ email: data.email, phoneCode: phoneCode, contactNo: contactNo }));

            saveNewCrmInquiry(data);

            let searchData = {
                portalId: 105, // 105 for FM INDIA
                cabin: 1,
                child: 0,
                noOfAdult: 1,
                noOfLapInfant: 0,
                segments: segments,
                tripType: tripType
            };

            let searchId = generateId(12);
            searchData.searchId = searchId;
            dispatch({ type: "SETSEARCHCRITERIA", criteria: searchData });
            localStorage.setItem(searchId, btoa(JSON.stringify(searchData)));
            localStorage.setItem("mySearchID", searchId);
            window.location.href = "/in/listing?s=" + searchId;

            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        });
    };

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6 d-none d-md-inline-block"></div>
                <div className="col-12 col-md-6">
                    <div className="shadow p-4 my-2">
                        <h4 class="mb-0 fw-bold color-blue mb-2 text-center">Excellent Choice!</h4>
                        <p className="text-center fs-14">Please share the details so we can get back to you.</p>
                        <div className="row py-4 modal-form">
                            <div className="col-12">
                                <div className="d-flex">
                                    <div className="form-check me-3">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={tripType == 1} onChange={(e) => setTripType(1)} />
                                        <label className="form-check-label fs-14" htmlFor="flexRadioDefault1">Oneway</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={tripType == 2} onChange={() => {
                                            let currentDate = new Date(fromDate);
                                            setTripType(2);
                                            setToDate(currentDate.setDate(currentDate.getDate() + 3));
                                        }} />
                                        <label className="form-check-label fs-14" htmlFor="flexRadioDefault2">Round Trip</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 col-lg-6">From</div>
                                    <div className="col-12 col-lg-6">To</div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group mb-3 d-flex w-100 position-relative">
                                            <span className="input-group-text bg-transparent border-end-0">
                                                <img className="img-fluid" src="https://assets.faremaze.com/fm-bh/calender.svg" alt="calender" />
                                            </span>
                                            <DatePicker
                                                onKeyDown={(e) => e.preventDefault()}
                                                selected={fromDate}
                                                onFocus={(e) => e.target.blur()}
                                                onChange={(date) => {
                                                    setFromDate(date);
                                                    let maxDate = getMaxDatePicker();
                                                    let isMaxFromDate = checkMaxDateRange(maxDate, date, 3);
                                                    if (tripType == 2 && date != null) {
                                                        let departDate = new Date(date);
                                                        if (!isMaxFromDate) { setToDate(new Date(departDate.setDate(departDate.getDate() + 3))); }
                                                        else { setToDate(maxDate); }
                                                        document.getElementById("modalRtnDate").focus();
                                                    }
                                                }}
                                                isClearable={false}
                                                className="form-control"
                                                scrollableYearDropdown={true}
                                                minDate={new Date()}
                                                showYearDropdown={true}
                                                showMonthDropdown={true}
                                                yearDropdownItemNumber={100}
                                                maxDate={getMaxDatePicker()}
                                            />
                                        </div>
                                    </div>

                                    {tripType == 2 &&
                                        <div className="col-12">
                                            <div className="input-group mb-3 d-flex flex-nowrap w-100">
                                                <span className="input-group-text bg-transparent border-end-0">
                                                    <img className="img-fluid" src="https://assets.faremaze.com/fm-bh/calender.svg" alt="calender" />
                                                </span>
                                                <DatePicker
                                                    id="modalRtnDate"
                                                    onKeyDown={(e) => e.preventDefault()}
                                                    isClearable={false}
                                                    disabled={tripType == 1}
                                                    selected={toDate}
                                                    onFocus={(e) => e.target.blur()}
                                                    onChange={(date) => setToDate(date)}
                                                    className="form-control"
                                                    scrollableYearDropdown={true}
                                                    minDate={fromDate}
                                                    showYearDropdown={true}
                                                    showMonthDropdown={true}
                                                    yearDropdownItemNumber={100}
                                                    maxDate={getMaxDatePicker()}
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-transparent border-end-0">
                                        <img className="img-fluid" src="https://assets.faremaze.com/fm-bh/envelope.svg" alt="envelope" />
                                    </span>
                                    <input type="email" autoComplete='off' className="form-control" placeholder="Enter your Email*"
                                        value={email}
                                        onChange={(e) => {
                                            e.target.value = e.target.value.toLowerCase();
                                            setEmail(e.target.value);
                                            if (e.target.value.length > 0) {
                                                var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                if (
                                                    e.target.value.match(validRegex) &&
                                                    e.target.value.match(validRegex).length >
                                                    0
                                                ) {
                                                    setIsValidEmail(true);
                                                } else { setIsValidEmail(null); }
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (e.target.value.length > 0) {
                                                var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                setIsValidEmail((e.target.value.match(validRegex) && e.target.value.match(validRegex).length > 0) == true);
                                            }
                                        }}
                                        onFocus={(e) => { if (e.target.value.length > 0) { setIsValidEmail(null); } }} />
                                    {
                                        isValidEmail == true &&
                                        <img className="icon" src="https://assets.shipratravel.com/mticom/green-tick-icon.png" />
                                    }
                                    {
                                        isValidEmail == false &&
                                        <img className="icon" src="https://assets.shipratravel.com/mticom/red-alet-icon.png" />
                                    }
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input-group mb-3 contact-no-border">
                                    <div className='row'>
                                        <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 px-0'>
                                            <PhoneInput
                                                country={"us"}
                                                enableSearch={true}
                                                enableClickOutside={true}
                                                value={phoneCode}
                                                inputProps={{ readOnly: true }}
                                                onChange={(phone) => setPhoneCode(phone)}
                                            />
                                        </div>
                                        <div className='col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8 d-flex align-items-center bh-modal-contact-no ps-0'>
                                            <input placeholder="9999 999999" inputMode="numeric"
                                                pattern="[0-9]*"
                                                type="text"
                                                onPaste={(e) => e.preventDefault()}
                                                value={contactNo}
                                                maxLength={10}
                                                className="form-control w-100 border-0 px-0"
                                                onChange={(e) => {
                                                    var allowedChars = "0123456789";
                                                    let cVal = e.target.value;
                                                    if (allowedChars.indexOf(e.target.value.substring(e.target.value.length - 1)) == -1) {
                                                        cVal = cVal.substring(0, cVal.length - 1);
                                                    }
                                                    setContactNo(cVal);
                                                }}
                                                onBlur={(e) => { if (e.target.value.length > 0) { setIsValidPhoneNumber(e.target.value.length == 10); } }}
                                                onFocus={(e) => { if (e.target.value.length > 0) { setIsValidPhoneNumber(true); } }}>
                                            </input>
                                            {
                                                contactNo.length == 10 &&
                                                <img className="icon" src="https://assets.shipratravel.com/mticom/green-tick-icon.png" />
                                            }
                                            {
                                                isValidPhoneNumber == false &&
                                                <img className="icon" src="https://assets.shipratravel.com/mticom/red-alet-icon.png" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <button className="bg-orange w-100 color-white border-orange border py-2 rounded-2" onClick={() => submitInquiry()}>
                                    {isLoading && <div className="spinner-border" role="status"></div>}
                                    {!isLoading && <span>Let’s go!</span>}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

