"use client"
import Layout from '@/app/components/inner-layout';
import { useEffect, useState } from 'react';
import { getDisplayAirline, isADomesticFlight, isPureAirline, numberFormat, trackMixpanelEvent } from '../../helpers/common'
import { toPascalCase } from '../../helpers/common';
import { getFormattedDate1, getFormattedDate3, getDiffFromMinutes, getFormattedTime, getFormattedDateTime } from '../../helpers/common';
import { useRouter } from 'next/navigation';
import { fetchBookingData } from '@/app/services/bookingService';
import { airlineLogoLoader, trvLoader } from '@/app/helpers/imageKitLoader';
import Image from 'next/image';
import InnterFooter from '@/app/components/inner-footer';

export default function PaymentFailed() {
    const [bookingData, setBookingData] = useState(null);
    const [showBagDetails, setShowBagDetails] = useState(false);
    const [showDepartBag, setShowDepartBag] = useState(false);
    const [showReturnBag, setShowReturnBag] = useState(false);
    const router = useRouter()

    function setMyPath() {
        return window.location.href;
    }

    useEffect(() => {

        (async function () {

            const item = window.localStorage.getItem("bookingInformation");

            let bookingInfo = item ? JSON.parse(item) : null;

            if (!!window.location.search) {

                let params = new URLSearchParams(window.location.search);

                //dummy flight tickets
                if (!bookingInfo) {
                    bookingInfo = await fetchBookingData(params.get("id"));
                }

            }

            window.localStorage.removeItem("booking_data");

            const bookData = JSON.parse(localStorage.getItem("bookingSessionData"));
            if (bookingInfo) {
                bookingInfo.showBaggageOptions = isPureAirline(bookingInfo.contract);
                bookingInfo.isDomestic = isADomesticFlight(bookingInfo.contract);
                bookingInfo.isBaggageClassMatching = bookingInfo.contract.trips[0].listOfFlight[0].classOfService == "M"
                if (bookingInfo.showBaggageOptions && bookingInfo.isBaggageClassMatching) {
                    bookingInfo.baggageOptions = getDisplayAirline(bookingInfo.contract.trips[0].validatingCarrier.name, bookingInfo.isDomestic);
                }
                if (bookData?.bookingId != bookingInfo.bookingId) {
                    await trackCNFFired(bookingInfo);
                }
            }

            const currentTime = new Date();
            if (bookData?.bookingId != bookingInfo?.bookingId) {
                localStorage.setItem('bookingSessionData', JSON.stringify({ "bookingId": bookingInfo?.bookingId, "bookingTime": currentTime.getTime() }));
            };

            if ((currentTime.getTime() - Number(bookData?.bookingTime)) > 1800000) {
                localStorage.clear();
                router.push("/");
            }

            setBookingData(bookingInfo);

            localStorage.setItem("fpendingPath", setMyPath())
            localStorage.removeItem("fsuccessPath")
        })();



    }, [])

    const trackCNFFired = async (bookingData) => {
        let data = bookingData.contract;
        data.bookingId = bookingData.bookingId;
        data.paymentStatus = "Failed";
        data.pnr = bookingData.pnr;
        data.email = bookingData.email;
        data.phone = bookingData.contactNumber;
        data.cellCountryCode = bookingData.cellCountryCode;
        await trackMixpanelEvent("CNF_Fired", data);
    }

    function getPaxType(paxType) {
        if (paxType == 1) {
            return "Adult"
        }
        else if (paxType == 3) {
            return "Child"
        }
        else if (paxType == 5) {
            return "Lap Infant"
        }
    }

    function getGender(gender) {
        if (gender == 1) {
            return "Male"
        }
        else if (gender == 2) {
            return "Female"
        }
    }

    const getDisplayClass = (cls) => {
        if (cls == "Y")
            return "Premium Economy";
        else if (cls == "F")
            return "First";
        else if (cls == "C")
            return "Business";
        else
            return "Economy";
    }

    const getFormattedEmail = (email) => {
        let hiddenChars = email.substr(0, email.indexOf("@") - 3)
        return email.replace(hiddenChars, "x".repeat(hiddenChars.length))
    }

    const getFormattedContactNo = (mobile) => {
        return 'XXX-XXX-' + mobile.substr(6)
    }

    const handleBags = () => {
        if (showBagDetails) {
            setShowBagDetails(false)
            setShowDepartBag(false)
            setShowReturnBag(false)
        }
    }

    const getBaggagePrice = () => {
        let totalPrice = 0;
        if (bookingData?.selectedDepartBaggage)
            totalPrice += bookingData?.selectedDepartBaggage.price;
        if (bookingData?.selectedDepartCarryOnBaggage)
            totalPrice += bookingData?.selectedDepartCarryOnBaggage.price;
        if (bookingData?.selectedReturnBaggage)
            totalPrice += bookingData?.selectedReturnBaggage.price;
        if (bookingData?.selectedReturnCarryOnBaggage)
            totalPrice += bookingData?.selectedReturnCarryOnBaggage.price;

        return totalPrice;
    }


    return (
        <>
            <Layout>
                {
                    bookingData &&
                    <>
                        <section id="confirmation-banner" className='pt-5 pb-5'>
                            <div className="container">
                                <div className="row">
                                    <div className="confirmation-baner-content text-center">
                                        <h3 className='mb-4'>Booking Pending!!</h3>
                                        <p className='mb-4'>A confirmation email has been sent to <a href="javascript:void(0)"> {getFormattedEmail(bookingData.email)}</a></p>
                                        <Image
                                            className="pending-booking-img"
                                            loader={trvLoader}
                                            src="icon/pending-img.png"
                                            alt="pending img"
                                            width={176}
                                            height={43}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 co-sm-12 co-md-12 co-lg-12 co-xl-12 co-xxl-12">
                                        <div className="confirmation-booking-date-time">
                                            Booking Date & Time: <span>{getFormattedDateTime(bookingData.bookingDateTime)} IST</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="confirmation-booking-code">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 co-sm-12 co-md-12 co-lg-12 co-xl-12 co-xxl-12">
                                        <div className="confirmation-booking-number text-center">
                                            <Image
                                                className="air-ticket panding-erro-icon"
                                                loader={trvLoader}
                                                src="icon/panding-warning-icon.png"
                                                alt="panding warning icon"
                                                width={176}
                                                height={43}
                                            /><br />
                                            <Image
                                                className="air-ticket"
                                                loader={trvLoader}
                                                src="icon/success-booking-ticket-img.svg"
                                                alt="success booking ticket icon"
                                                width={176}
                                                height={43}
                                            />
                                            <Image
                                                className="air-ticket-down-img"
                                                loader={trvLoader}
                                                src="icon/pending.png"
                                                alt="pending icon"
                                                width={176}
                                                height={43}
                                            />
                                            <p>Your Booking Reference Number is</p>
                                            <h4>{bookingData.bookingId}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 co-sm-12 co-md-12 co-lg-12 co-xl-12 co-xxl-12">
                                        <div className="confirmation-note-text">
                                            <p><b>Note:</b> Please don’t panic. This happens due to last-minute seat unavailability or other glitches. There is nothing to worry about since no amount has been deducted from your card. In case of urgent bookings, kindly give us a call or share your details to request a callback. Please note that a purchase is considered complete only when the ticket is issued. Furthermore, fares aren’t guaranteed until ticketed. In the rare event of a fare increase, you may choose to cancel your booking by contacting our customer support.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id='itinerary-details' className='mt-5'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <div className="tables-sub-heading fw-bold text-center pt-3 pb-3">Itinerary Details</div>
                                    </div>
                                </div>
                                <div className='itinerary-details-box border p-3'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <h5 className='text-start bg-grey p-3 fw-bold'>Departure</h5>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-8'>
                                            {
                                                bookingData.baggageOptions &&
                                                <div className='row'>
                                                    <div className='col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10'>
                                                        <div className='row mb-4'>
                                                            <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                                <div className="add-baggage d-flex mt-2">
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
                                                                        <h6 className="mb-0 d-flex align-items-center">
                                                                            <Image
                                                                                className="h-auto w-100"
                                                                                loader={trvLoader}
                                                                                src={bookingData.baggageOptions.personalItem == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                                                alt="bag icon"
                                                                                width={176}
                                                                                height={43}
                                                                            />
                                                                            <span>{bookingData.baggageOptions.personalItem}</span>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                                <div className="add-baggage d-flex mt-2">
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
                                                                        <h6 className="mb-0 d-flex align-items-center">
                                                                            <Image
                                                                                className="h-auto w-100"
                                                                                loader={trvLoader}
                                                                                src={bookingData.baggageOptions.carryOnBag == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                                                alt="bag icon"
                                                                                width={176}
                                                                                height={43}
                                                                            />
                                                                            <span>{bookingData.baggageOptions.carryOnBag}</span>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                                <div className="add-baggage d-flex mt-2">
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
                                                                        <h6 className="mb-0 d-flex align-items-center">
                                                                            <Image
                                                                                className="h-auto w-100"
                                                                                loader={trvLoader}
                                                                                src={bookingData.baggageOptions.checkedBag == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                                                alt="bag icon"
                                                                                width={176}
                                                                                height={43}
                                                                            />
                                                                            <span>{bookingData.baggageOptions.checkedBag}</span>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            {
                                                bookingData.contract.trips[0].listOfFlight.map((fl, index) => {
                                                    var difference = getDiffFromMinutes(fl.flightDuration);
                                                    return (
                                                        <div className='flight-ticket-details' key={index}>
                                                            <div className='flap-flight-details'>
                                                                <div className='flight-box-mainwrq'>

                                                                    {
                                                                        (fl.airlineName != fl.operatedBy && !!fl.operatedBy) &&
                                                                        <h5 className="ob pt-1 pb-1 ps-2 pe-2 d-table opteratedby">Operated By: <span>{fl.operatedBy}</span></h5>
                                                                    }
                                                                    <div className="airbox-details align-items-center ps-0 pe-0">
                                                                        <div className='row align-items-center '>
                                                                            <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2'>
                                                                                <div className="airlinelogo">
                                                                                    <Image
                                                                                        className="airline-logo h-auto"
                                                                                        loader={airlineLogoLoader}
                                                                                        src={`airline-logo/${fl.marketingCarrier}.webp?q=100`}
                                                                                        alt="airplane-plus-icon"
                                                                                        width={35}
                                                                                        height={43}
                                                                                    />
                                                                                    <h6 className="mb-0">{fl.airlineName}</h6>
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10'>
                                                                                <div className='row'>
                                                                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-center ">
                                                                                        <h6 className='fw-bold mb-0'>{getFormattedTime(fl.departureTime)} | {getFormattedDate3(fl.departeddate)}</h6>
                                                                                        <span className="mb-0">{fl.fromCode}</span>
                                                                                        <h5>
                                                                                            <span>{fl.fromAirportName}</span><br />
                                                                                            <span> {fl.marketingCarrier}-{fl.flightNumber}</span> | <span>{getDisplayClass(fl.classOfService)}</span> | <span>Boeing {fl.equipmentType}</span><br />
                                                                                            {
                                                                                                (fl.airlineName != fl.operatedBy && !!fl.operatedBy) &&
                                                                                                <span>Operated By: {fl.operatedBy}</span>
                                                                                            }
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0 air-icon-time">
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="w-25 airbox-details-air-icon">
                                                                                                <Image
                                                                                                    className="h-auto float-end me-2"
                                                                                                    loader={trvLoader}
                                                                                                    src="icon/depart-air-purple-icon.svg"
                                                                                                    alt="Depart Air Icon"
                                                                                                    width={30}
                                                                                                    height={15}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="w-50 airbox-details-dot-line text-center">
                                                                                                <span>{difference}</span>
                                                                                                <hr />
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
                                                                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-center">
                                                                                        <h6 className='fw-bold mb-0'>{getFormattedTime(fl.arrivalTime)} | {getFormattedDate3(fl.arrivalAt)}</h6>
                                                                                        <span className="mb-0">{fl.toCode}</span>
                                                                                        <h5><span>{fl.toAirportName}</span></h5>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    {
                                                                        !!fl.displayLayOverTime &&
                                                                        <div className='flight-lawover text-center mt-3 mb-3 pt-2 pb-2'>Layover: {fl.displayLayOverTime} in {fl.airportToCity}</div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            {
                                                bookingData.contract.trips.length > 1 &&
                                                <div className='return-flight-ticket border-top mt-3 pt-3'>
                                                    <h5 className='text-start bg-grey p-3 fw-bold'>Return</h5>
                                                    {
                                                        <div className='row'>
                                                            <div className='col-sm-8'>
                                                                {
                                                                    bookingData.baggageOptions &&
                                                                    <div className='container'>
                                                                        <div className='row'>
                                                                            <div className='col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10'>
                                                                                <div className='row mb-4'>
                                                                                    <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                                                        <div className="add-baggage d-flex mt-2">
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
                                                                                                <h6 className="mb-0 d-flex align-items-center">
                                                                                                    <Image
                                                                                                        className="h-auto w-100"
                                                                                                        loader={trvLoader}
                                                                                                        src={bookingData.baggageOptions.personalItem == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                                                                        alt="bag icon"
                                                                                                        width={176}
                                                                                                        height={43}
                                                                                                    />
                                                                                                    <span>{bookingData.baggageOptions.personalItem}</span>
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                                                        <div className="add-baggage d-flex mt-2">
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
                                                                                                <h6 className="mb-0 d-flex align-items-center">
                                                                                                    <Image
                                                                                                        className="h-auto w-100"
                                                                                                        loader={trvLoader}
                                                                                                        src={bookingData.baggageOptions.carryOnBag == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                                                                        alt="bag icon"
                                                                                                        width={176}
                                                                                                        height={43}
                                                                                                    />
                                                                                                    <span>{bookingData.baggageOptions.carryOnBag}</span>
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                                                                                        <div className="add-baggage d-flex mt-2">
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
                                                                                                <h6 className="mb-0 d-flex align-items-center">
                                                                                                    <Image
                                                                                                        className="h-auto w-100"
                                                                                                        loader={trvLoader}
                                                                                                        src={bookingData.baggageOptions.checkedBag == 'Included' ? "/icon/included-icon.svg" : "/icon/chargeable-icon.svg"}
                                                                                                        alt="bag icon"
                                                                                                        width={176}
                                                                                                        height={43}
                                                                                                    />
                                                                                                    <span>{bookingData.baggageOptions.checkedBag}</span>
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
                                                        </div>
                                                    }
                                                    {
                                                        bookingData.contract.trips[1].listOfFlight.map((fl, index) => {
                                                            var difference = getDiffFromMinutes(fl.flightDuration);
                                                            return (
                                                                <div className='flap-flight-details' key={index}>
                                                                    <div className='flight-box-mainwrq'>

                                                                        {
                                                                            (fl.airlineName != fl.operatedBy && !!fl.operatedBy) &&
                                                                            <h5 className="ob pt-1 pb-1 ps-2 pe-2 d-table opteratedby">Operated By: <span>{fl.operatedBy}</span></h5>
                                                                        }
                                                                        <div className="airbox-details align-items-center ps-0 pe-0">
                                                                            <div className='row align-items-center'>
                                                                                <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2'>
                                                                                    <div className="airlinelogo">
                                                                                        <Image
                                                                                            className="airline-logo h-auto"
                                                                                            loader={airlineLogoLoader}
                                                                                            src={`airline-logo/${fl.marketingCarrier}.webp?q=100`}
                                                                                            alt="airplane-plus-icon"
                                                                                            width={35}
                                                                                            height={43}
                                                                                        />
                                                                                        <h6 className="mb-0">{fl.airlineName}</h6>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10'>
                                                                                    <div className='row'>
                                                                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-center">
                                                                                            <h6 className='fw-bold mb-0'>{getFormattedTime(fl.departureTime)} | {getFormattedDate3(fl.departeddate)}</h6>
                                                                                            <span className="mb-0">{fl.fromCode}</span>
                                                                                            <h5>
                                                                                                <span>{fl.fromAirportName}</span><br />
                                                                                                <span> {fl.marketingCarrier}-{fl.flightNumber}</span> | <span>{getDisplayClass(fl.classOfService)}</span> | <span>Boeing {fl.equipmentType}</span><br />
                                                                                                {
                                                                                                    (fl.airlineName != fl.operatedBy && !!fl.operatedBy) &&
                                                                                                    <span>Operated By: {fl.operatedBy}</span>
                                                                                                }
                                                                                            </h5>
                                                                                        </div>
                                                                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pe-0 ps-0 air-icon-time">
                                                                                            <div className="d-flex align-items-center">
                                                                                                <div className="w-25 airbox-details-air-icon">
                                                                                                    <Image
                                                                                                        className="h-auto float-end me-2"
                                                                                                        loader={trvLoader}
                                                                                                        src="icon/depart-air-purple-icon.svg"
                                                                                                        alt="Depart Air Icon"
                                                                                                        width={30}
                                                                                                        height={15}
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="w-50 airbox-details-dot-line text-center">
                                                                                                    <span>{difference}</span>
                                                                                                    <hr />
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
                                                                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-center">
                                                                                            <h6 className='fw-bold mb-0'>{getFormattedTime(fl.arrivalTime)} | {getFormattedDate3(fl.arrivalAt)}</h6>
                                                                                            <span className="mb-0">{fl.toCode}</span>
                                                                                            <h5><span>{fl.toAirportName}</span></h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        {
                                                                            !!fl.displayLayOverTime &&
                                                                            <div className='flight-lawover text-center mt-3 mb-3 pt-2 pb-2'>Layover: {fl.displayLayOverTime} in {fl.airportToCity}</div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="details-table" className='mt-5 mb-5'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="tables-sub-heading fw-bold text-center pt-3 pb-3">Primary Contact Information</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-sm-12'>
                                        <div className='table-responsive'>
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Phone Number</th>
                                                        <th>Email Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{bookingData.cellCountryCode + '-' + getFormattedContactNo(bookingData.contactNumber)}</td>
                                                        <td>{getFormattedEmail(bookingData.email)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container mt-4">
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <div className='tables-sub-heading fw-bold text-center pt-3 pb-3'>Travelers Details</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-sm-12'>
                                        <div className='table-responsive'>
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    {bookingData.dummyTravellers &&
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Traveler</th>
                                                            <th>Name</th>
                                                        </tr>
                                                    }
                                                    {!bookingData.dummyTravellers &&
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Traveler</th>
                                                            <th>Name</th>
                                                            <th>Gender</th>
                                                            <th>Date of Birth</th>
                                                        </tr>
                                                    }

                                                </thead>
                                                {bookingData.dummyTravellers &&
                                                    <tbody>
                                                        {
                                                            bookingData.passangers.map((pax, index) => {
                                                                const paxType = getPaxType(pax.paxType)
                                                                return <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{paxType}</td>
                                                                    <td>{pax.firstName} {pax.lastName}</td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                }
                                                {!bookingData.dummyTravellers &&
                                                    <tbody>
                                                        {
                                                            bookingData.passangers.map((pax, index) => {
                                                                const paxType = getPaxType(pax.paxType)
                                                                const gender = getGender(pax.gender)
                                                                const dob = getFormattedDate1(pax.dob)
                                                                return <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{paxType}</td>
                                                                    <td>{pax.firstName} {pax.lastName}</td>
                                                                    <td>{gender}</td>
                                                                    <td>{dob}</td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                }
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                ((bookingData?.selectedDepartBaggage && bookingData?.selectedDepartBaggage?.price > 0) || (bookingData?.selectedDepartCarryOnBaggage && bookingData?.selectedDepartCarryOnBaggage?.price > 0) || (bookingData?.selectedReturnBaggage && bookingData?.selectedReturnBaggage?.price > 0) || (bookingData?.selectedReturnCarryOnBaggage && bookingData?.selectedReturnCarryOnBaggage?.price > 0)) &&
                                <div className="container mt-4">
                                    <div className="booking-detail-table-wrp">
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <div className='tables-sub-heading fw-bold text-center pt-3 pb-3'>Baggage Information</div>
                                            </div>
                                        </div>
                                        <div className='table-responsive'>
                                            <table className="table table-bordered text-center">
                                                <tbody>
                                                    {
                                                        (bookingData?.selectedDepartBaggage && bookingData?.selectedDepartBaggage?.price > 0) &&
                                                        <tr>
                                                            <td>Departure ({bookingData?.contract.trips[0].listOfFlight[0].fromCode} to {bookingData.contract.trips[0].listOfFlight[bookingData.contract.trips[0].listOfFlight.length - 1].toCode})</td>
                                                            <td>{bookingData?.selectedDepartBaggage?.text}</td>
                                                            <td>${(bookingData?.selectedDepartBaggage?.price).toFixed(2)}</td>
                                                        </tr>
                                                    }
                                                    {
                                                        (bookingData?.selectedDepartCarryOnBaggage && bookingData?.selectedDepartCarryOnBaggage?.price > 0) &&
                                                        <tr>
                                                            <td>Departure ({bookingData?.contract.trips[0].listOfFlight[0].fromCode} to {bookingData.contract.trips[0].listOfFlight[bookingData.contract.trips[0].listOfFlight.length - 1].toCode})</td>
                                                            <td>{bookingData?.selectedDepartCarryOnBaggage?.text}</td>
                                                            <td>${(bookingData?.selectedDepartCarryOnBaggage?.price).toFixed(2)}</td>
                                                        </tr>
                                                    }
                                                    {
                                                        (bookingData?.selectedReturnBaggage && bookingData?.selectedReturnBaggage?.price > 0) &&
                                                        <tr>
                                                            <td>Return ({bookingData.contract.trips[1].listOfFlight[0].fromCode} to {bookingData.contract.trips[1].listOfFlight[bookingData.contract.trips[1].listOfFlight.length - 1].toCode})</td>
                                                            <td>{bookingData?.selectedReturnBaggage?.text}</td>
                                                            <td>${(bookingData?.selectedReturnBaggage?.price).toFixed(2)}</td>
                                                        </tr>
                                                    }
                                                    {
                                                        (bookingData?.selectedReturnCarryOnBaggage && bookingData?.selectedReturnCarryOnBaggage?.price > 0) &&
                                                        <tr>
                                                            <td>Return ({bookingData.contract.trips[1].listOfFlight[0].fromCode} to {bookingData.contract.trips[1].listOfFlight[bookingData.contract.trips[1].listOfFlight.length - 1].toCode})</td>
                                                            <td>{bookingData?.selectedReturnCarryOnBaggage?.text}</td>
                                                            <td>${(bookingData?.selectedReturnCarryOnBaggage?.price).toFixed(2)}</td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <td align='right' valign='middle' colspan="2"><h5 className='mb-0 fw-bold'>Grand Total</h5></td>
                                                        <td valign='middle'><h5 className='mb-0 fw-bold'>${getBaggagePrice().toFixed(2)}</h5></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className='container mt-4'>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <div className='tables-sub-heading fw-bold text-center pt-3 pb-3'>Price Details</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <div className='table-responsive'>
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Traveler</th>
                                                        <th>Flight Price (INR)</th>
                                                        <th>Taxes & Fees (INR)</th>
                                                        <th>Total Price (INR)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        bookingData.contract.fareDetails.map((fare, index) => {

                                                            return <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{fare.paxType == 5 ? "Lap Infant" : toPascalCase(fare.displayPaxType)}</td>
                                                                <td>({fare.noofPax} X {numberFormat(Math.round(fare.totalFareAmount / fare.noofPax) - Math.round(fare.totalTaxAmount / fare.noofPax)).split('.')[0]})</td>
                                                                <td>({fare.noofPax} X {numberFormat(Math.round(fare.totalTaxAmount / fare.noofPax)).split('.')[0]})</td>
                                                                <td>{numberFormat(Math.round(fare.totalFareAmount)).split('.')[0]}</td>
                                                            </tr>
                                                        })
                                                    }
                                                    {
                                                        bookingData?.saverService?.name &&
                                                        <tr>
                                                            <td align='right' colSpan="4"> Super Saver Service (SSS) - <span>{bookingData?.saverService?.name} </span> <span className='sss-price-division'>({bookingData?.passangers?.length} X {numberFormat(Math.round(bookingData?.saverService?.price))})</span></td>
                                                            <td>{numberFormat((bookingData?.passangers?.length) * Math.round(bookingData?.saverService?.price)).split('.')[0]}</td>
                                                        </tr>
                                                    }
                                                    {
                                                        bookingData?.contract?.otherTaxes?.map((tax, index) => {
                                                            return <tr>
                                                                <td colSpan="4"> <h6 className="text-end mb-0 superss-table-text">{tax.name} </h6></td>
                                                                <td>{numberFormat(tax.amount)}</td>
                                                            </tr>

                                                        })
                                                    }
                                                    {
                                                        bookingData?.webCheckIn?.price &&
                                                        <tr>
                                                            <td align='right' colSpan="4"> Auto Web Check-In <span className='sss-price-division'>({bookingData?.passangers?.length} X ${(bookingData?.contract?.trips?.length > 1 ? (bookingData?.webCheckIn?.price * 2) : (bookingData?.webCheckIn?.price))})</span></td>
                                                            <td>{numberFormat((bookingData?.passangers?.length) * (bookingData?.contract?.trips?.length > 1 ? (bookingData?.webCheckIn?.price * 2) : (bookingData?.webCheckIn?.price)))}</td>
                                                        </tr>
                                                    }
                                                    {
                                                        ((bookingData?.selectedDepartBaggage && bookingData?.selectedDepartBaggage?.price > 0) || (bookingData?.selectedDepartCarryOnBaggage && bookingData?.selectedDepartCarryOnBaggage?.price > 0) || (bookingData?.selectedReturnBaggage && bookingData?.selectedReturnBaggage?.price > 0) || (bookingData?.selectedReturnCarryOnBaggage && bookingData?.selectedReturnCarryOnBaggage?.price > 0)) &&
                                                        <tr>
                                                            <td align='right' colSpan="4"> Baggage Fees</td>
                                                            <td>{numberFormat(getBaggagePrice().toFixed(2))}</td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <td align='right' colSpan="4">Service Fees</td>
                                                        <td>{numberFormat(Math.round(bookingData?.contract?.serviceFee)).split('.')[0]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td align='right' colSpan="4"><h5 className='mb-0 fw-bold'>Total Price</h5></td>
                                                        <td><h5 className='mb-0 fw-bold'>{numberFormat(Math.round(bookingData.contract.totalPrice)).split('.')[0]}</h5></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section >

                        <section className='mb-5'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="booking-detail-dec-list">
                                            <h3>Flight Booking Terms & Conditions</h3>
                                            <ul className='p-0'>
                                                <li>Total Charge as mentioned above may reflect as multiple charges of smaller amount on your statement however the sum of all shall not exceed the Total as specified above. (Different Gateway names may reflect)</li>
                                                <li>In case of Card Denial fare difference shall be charged if any.</li>
                                                <li>Name Change is strictly not permitted hence we request you to double check spellings and report to us within 24 hrs. of booking for any discrepancies.</li>
                                                <li>Re-routing and change of date are strictly subject to availability and airline approval.</li>
                                                <li>Passenger must be holding a minimum 6 months valid passport from the date of return. (arrival incase on One Way ticket.)</li>
                                                <li>Miles are not guaranteed.</li>
                                                <li>Seat and Meal request may be placed and will be subject to approval as per availability with airline.</li>
                                                <li>Ticket will have ZERO VALUE in case of NO SHOW. We advise reaching Airport at least 3-4 hours before departure.</li>
                                                <li>We request you to reach out to us at least 72 hours prior to departure for all changes and refund requests/cancellations to avoid No Show Charges.</li>
                                                <li>Passenger is wholly responsible to fulfil the Visa requirements of Destination/Transit country hence we request you to kindly check the same with respective country’s the consulate before travel.</li>
                                                <li>You may like to visit <a href="https://www.iatatravelcentre.com" target="_blank">www.iatatravelcentre.com</a> to check the visa requirements.</li>
                                                <li>Disclaimer: This link is just for your convenience and Travanya does not take responsibility of authenticity of information provided.</li>
                                                <li>By acknowledging this attachment, you are agreeing to above Terms of Service.</li>
                                                <li>Kindly refer <a href="https://www.travanya.ae/terms-conditions/" target="_blank">terms and conditions</a> for detailed information about our booking policies.</li>
                                                <li>In Case of any Visa restriction imposed by government of transiting countries, we do not hold responsibility of refund and cancellation of booking. Any additional expenses in such case are to be borne by the traveler.</li>
                                                <li>Additional <a href="https://www.travanya.ae/baggage-fees" target="_blank"><u>Baggage Fees</u></a> may apply as per the airline(s) policies.</li>
                                                <li>For baggage (free/paid luggage allowance, excess baggage fee, etc.), check the details here. <a href="https://www.travanya.ae/baggage-fees" target="_blank">Learn More</a></li>
                                                <li>For seat reservations, kindly visit the online <a href="https://www.travanya.ae/check-in" target="_blank">check-in</a> page of the concerned airline.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 thanku-msg mt-5  border-bottom pb-5">
                                        <h6>Thank you for choosing <a href="https://www.travanya.ae" target="_blank">Travanya.ae</a> for your upcoming travel plan.<br />
                                            Wishing you a Safe Journey!!</h6>
                                    </div>

                                    <div id="short-review-widget-container"></div>
                                </div>
                            </div>
                        </section>
                        <InnterFooter></InnterFooter>
                    </>
                }
            </Layout >
        </>
    )
}