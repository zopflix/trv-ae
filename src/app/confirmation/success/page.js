"use client"
import Layout from '@/app/components/inner-layout';
import { useEffect, useState } from 'react';
import { getDisplayAirline, isADomesticFlight, isPureAirline, aedNumberFormat, trackMixpanelEvent } from '../../helpers/common'
import { toPascalCase } from '../../helpers/common';
import { getFormattedDate1, getFormattedDate3, getDiffFromMinutes, getFormattedTime, getFormattedDateTime } from '../../helpers/common';
import { useRouter } from 'next/navigation';
import InnerFooter from '@/app/components/inner-footer';
import { airlineLogoLoader, trvLoader } from '@/app/helpers/imageKitLoader';
import Image from 'next/image';
import { contactNumber, externalContactNumber, uaeContact,flightContactNumber } from "../../config";
import { usePathname } from "next/navigation";

export default function Confirmation() {
    const [bookingData, setBookingData] = useState(null);
    const [avgTax, setAverageTax] = useState(0);
    const [segments, setSegments] = useState([]);
    const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const path = usePathname();
    const [displayContactNumber, setDisplayContactNumber] = useState(contactNumber);

    const router = useRouter()

    useEffect(() => {
        const keywords = ['listing', 'checkout', 'flights', '/results', 'flight', 'confirmation'];
        if (keywords.some(keyword => path.includes(keyword))) {
            setDisplayContactNumber(flightContactNumber);
        }
    }, [path, flightContactNumber]);
    

    useEffect(() => {
        loadSeats();
        document.body.classList.add("flight-ticket");
        window.localStorage.removeItem("booking_data");
        const item = window.localStorage.getItem("bookingInformation");
        const bookingInfo = item ? JSON.parse(item) : null;
        const bookData = JSON.parse(localStorage.getItem("bookingSessionData"));

        (async function () {
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
        })();

        const currentTime = new Date();
        if (bookData?.bookingId != bookingInfo?.bookingId) {
            localStorage.setItem('bookingSessionData', JSON.stringify({ "bookingId": bookingInfo?.bookingId, "bookingTime": currentTime.getTime() }));
        };

        if ((currentTime.getTime() - Number(bookData?.bookingTime)) > 1800000) {
            localStorage.clear();
            router.push("/");
        }



        localStorage.setItem('fsuccessPath', setMyPath())
        localStorage.removeItem("fpendingPath")

        setBookingData(bookingInfo);

        if (bookingInfo && bookingInfo.contract) {
            var totalPsgs = bookingInfo.contract.fareDetails.filter(x => x.paxType != 5).map(x => x.noofPax).reduce((a, b) => { return a + b })
            setAverageTax(Math.round(bookingInfo.serviceFee / totalPsgs));

            var flightPrice = bookingInfo.contract.fareDetails.map(x => x.totalFareAmount).reduce((a, b) => { return a + b });
            flightPrice += bookingInfo.serviceFee;

            if (bookingInfo?.discount > 0)
                flightPrice = flightPrice - bookingInfo?.discount;

            if (bookingInfo.contract.otherTaxes && bookingInfo.contract.otherTaxes.length > 0) {
                flightPrice += bookingInfo.contract.otherTaxes.map(x => x.amount).reduce((a, b) => { return a + b });
            }

            setTotalPrice(flightPrice);
        }

        return () => {
            if (document.body.classList.contains("flight-ticket"))
                document.body.classList.remove("flight-ticket")
        }

    }, [])


    const loadSeats = () => {

        let storedSegments = localStorage.getItem("seatSegments");

        if (storedSegments) {

            let segments = JSON.parse(storedSegments);

            setSegments(segments);
        }

    }

    const trackCNFFired = async (bookingData) => {
        let data = bookingData.contract;
        data.bookingId = bookingData.bookingId;
        data.paymentStatus = "Pass";
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

    function setMyPath() {
        return window.location.href;
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
                <div id="siteJbrContainer"></div>
                {
                    bookingData &&
                    <>
                        <section id="confirmation-banner" className='pt-5 pb-5'>
                            <div className="container">
                                <div className="row">
                                    <div className="confirmation-baner-content text-center">
                                        <h3 className='mb-4'>Booking Successful!!</h3>
                                        <p className='mb-4'>A confirmation email has been sent to <a href="javascript:void(0)"> {getFormattedEmail(bookingData.email)}</a></p>
                                        <Image
                                            className="mb-0 h-auto"
                                            loader={trvLoader}
                                            src="girl-im.png"
                                            alt="airplane-plus-icon"
                                            width={35}
                                            height={43}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className='mt-0'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="confirmation-booking-date-time">
                                            Booking Date & Time: <span>{getFormattedDateTime(bookingData.bookingDateTime)} IST</span>
                                        </div>
                                        <div className="confirmation-booking-number text-center">
                                            <Image
                                                className="air-ticket"
                                                loader={trvLoader}
                                                src="icon/success-booking-ticket-img.svg"
                                                alt="success-booking-ticket-img"
                                                width={100}
                                                height={43}
                                            />
                                            <Image
                                                className="air-ticket-down-img"
                                                loader={trvLoader}
                                                src="icon/tick-new.png"
                                                alt="ticket check icon"
                                                width={100}
                                                height={43}
                                            />
                                            <p>Your Booking Reference Number is</p>
                                            <h4>{bookingData.bookingId}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-sm-12">
                                        <div className="confirmation-note-text border-top border-bottom pt-3 pb-3">
                                            <p className='mb-0'><b>Note:</b> While your booking is successful, a confirmation mail along with your e-tickets will reach you shortly (within 4 hours or so). Please note that your purchase will be considered “complete” only when the ticket is issued. Until ticketed, the fares aren’t guaranteed. In the rare event of a fare increase, you may choose to cancel your booking by contacting our customer support.</p>
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
                                                                            src='icon/personal-item-icon.svg'
                                                                            alt="personal-item-icon"
                                                                            width={25}
                                                                            height={25}
                                                                        />
                                                                    </div>
                                                                    <div className="add-baggage-title">
                                                                        <h5 className="mb-1 d-flex align-items-center">
                                                                            <div className="add-baggage-heading">Personal Item</div>
                                                                        </h5>
                                                                        <h6 className="mb-0 d-flex align-items-center">
                                                                            <Image
                                                                                className=""
                                                                                loader={trvLoader}
                                                                                src={bookingData.baggageOptions.personalItem == 'Included'
                                                                                    ? "icon/included-icon.svg"
                                                                                    : "icon/chargeable-icon.svg"}
                                                                                alt="Allowed - Not Allowed Img"
                                                                                width={16}
                                                                                height={16}
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
                                                                            src='icon/carry-on-bags-icon.svg'
                                                                            alt="carry-on-bags-icon"
                                                                            width={25}
                                                                            height={25}
                                                                        />
                                                                    </div>
                                                                    <div className="add-baggage-title">
                                                                        <h5 className="mb-1 d-flex align-items-center">
                                                                            <div className="add-baggage-heading">Carry on Bags</div>
                                                                        </h5>
                                                                        <h6 className="mb-0 d-flex align-items-center">
                                                                            <Image
                                                                                className=""
                                                                                loader={trvLoader}
                                                                                src={bookingData.baggageOptions.carryOnBag == 'Included' ? "icon/included-icon.svg" : "icon/chargeable-icon.svg"}
                                                                                alt="Allowed - Not Allowed Img"
                                                                                width={16}
                                                                                height={16}
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
                                                                            src='icon/checked-bag-icon.svg'
                                                                            alt="checked-bag-icon"
                                                                            width={25}
                                                                            height={25}
                                                                        />
                                                                    </div>
                                                                    <div className="add-baggage-title">
                                                                        <h5 className="mb-1 d-flex align-items-center">
                                                                            <div className="add-baggage-heading">Checked Bag</div>
                                                                        </h5>
                                                                        <h6 className="mb-0 d-flex align-items-center">
                                                                            <Image
                                                                                className=""
                                                                                loader={trvLoader}
                                                                                src={bookingData.baggageOptions.checkedBag == 'Included' ? "icon/included-icon.svg" : "icon/chargeable-icon.svg"}
                                                                                alt="Allowed - Not Allowed Img"
                                                                                width={16}
                                                                                height={16}
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
                                                                                            <span> {fl.marketingCarrier}-{fl.flightNumber}</span> | <span>{bookingData?.contract.supplier == "TBO" ? fl.classOfService : getDisplayClass(fl.classOfService)}</span> | <span>Boeing {fl.equipmentType}</span><br />
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
                                                                                                    width={25}
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
                                                                                                    src='icon/personal-item-icon.svg'
                                                                                                    alt="personal-item-icon"
                                                                                                    width={25}
                                                                                                    height={25}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="add-baggage-title">
                                                                                                <h5 className="mb-1 d-flex align-items-center">
                                                                                                    <div className="add-baggage-heading">Personal Item</div>
                                                                                                </h5>
                                                                                                <h6 className="mb-0 d-flex align-items-center">
                                                                                                    <Image
                                                                                                        className=""
                                                                                                        loader={trvLoader}
                                                                                                        src={bookingData.baggageOptions.personalItem == 'Included'
                                                                                                            ? "icon/included-icon.svg"
                                                                                                            : "icon/chargeable-icon.svg"}
                                                                                                        alt="Allowed - Not Allowed Img"
                                                                                                        width={16}
                                                                                                        height={16}
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
                                                                                                    src='icon/carry-on-bags-icon.svg'
                                                                                                    alt="carry-on-bags-icon"
                                                                                                    width={25}
                                                                                                    height={25}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="add-baggage-title">
                                                                                                <h5 className="mb-1 d-flex align-items-center">
                                                                                                    <div className="add-baggage-heading">Carry on Bags</div>
                                                                                                </h5>
                                                                                                <h6 className="mb-0 d-flex align-items-center">
                                                                                                    <Image
                                                                                                        className=""
                                                                                                        loader={trvLoader}
                                                                                                        src={bookingData.baggageOptions.carryOnBag == 'Included'
                                                                                                            ? "icon/included-icon.svg"
                                                                                                            : "icon/chargeable-icon.svg"}
                                                                                                        alt="Allowed - Not Allowed Img"
                                                                                                        width={16}
                                                                                                        height={16}
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
                                                                                                    src='icon/checked-bag-icon.svg'
                                                                                                    alt="checked-bag-icon"
                                                                                                    width={25}
                                                                                                    height={25}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="add-baggage-title">
                                                                                                <h5 className="mb-1 d-flex align-items-center">
                                                                                                    <div className="add-baggage-heading">Checked Bag</div>
                                                                                                </h5>
                                                                                                <h6 className="mb-0 d-flex align-items-center">
                                                                                                    <Image
                                                                                                        className=""
                                                                                                        loader={trvLoader}
                                                                                                        src={bookingData.baggageOptions.checkedBag == 'Included'
                                                                                                            ? "icon/included-icon.svg"
                                                                                                            : "icon/chargeable-icon.svg"}
                                                                                                        alt="Allowed - Not Allowed Img"
                                                                                                        width={16}
                                                                                                        height={16}
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
                                                                                                <span> {fl.marketingCarrier}-{fl.flightNumber}</span> | <span>{bookingData?.contract.supplier == "TBO" ? fl.classOfService : getDisplayClass(fl.classOfService)}</span> | <span>Boeing {fl.equipmentType}</span><br />
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
                                                                                                        width={25}
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

                            {segments && segments.length > 0 &&
                                < div className='container mt-4'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className='tables-sub-heading fw-bold text-center pt-3 pb-3'>Seats Details</div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className='SeatSelectionDetailsTable mt-4'>
                                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    {segments && segments.length > 0 &&
                                                        segments.map((segment, index) => {
                                                            return (
                                                                <li className="nav-item" role="presentation">
                                                                    <button className={`${index == selectedSegmentIndex ? 'nav-link active' : 'nav-link'}`} id="SeatDetailTab1-tab" data-bs-toggle="pill" data-bs-target={`#SeatDetailTab_${index}`} type="button" role="tab" aria-controls="SeatDetailTab1" aria-selected="true"
                                                                        onClick={(e) => {
                                                                            setSelectedSegmentIndex(index);
                                                                        }}
                                                                    >
                                                                        {segment.segmentData.rowSeats[0].seats[0].origin}-{segment.segmentData.rowSeats[0].seats[0].destination}
                                                                    </button>
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                                <div className="tab-content" id="pills-tabContent">
                                                    <div className="tab-pane fade show active" id={`#SeatDetailTab_${selectedSegmentIndex}`} role="tabpanel" aria-labelledby="SeatDetailTab1-tab">
                                                        <table className="table color-black fw-bold fs-12">
                                                            <thead className="bg-light-blue">
                                                                <tr>
                                                                    <td>Traveler</td>
                                                                    <td>Seat Number</td>
                                                                    <td>Fare Price</td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {segments && segments[selectedSegmentIndex] && segments[selectedSegmentIndex].passengers && segments[selectedSegmentIndex].passengers.length > 0 &&

                                                                    segments[selectedSegmentIndex].passengers.map((p, i) => {
                                                                        return (
                                                                            <tr valign="middle">
                                                                                <td>{p?.name}</td>
                                                                                <td>
                                                                                    <div className="SelectSeatDetail active">{p?.seat?.code}</div>
                                                                                </td>
                                                                                <td>
                                                                                    {p && p.seat && p.seat.price &&
                                                                                        <div className='w-bold'>₹ {p?.seat?.price}</div>
                                                                                    }
                                                                                    {(!p || !p.seat) &&
                                                                                        <div className='w-bold'>₹ 0</div>
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                            </div>
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
                                                            return fare.paxType == 5 ? <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{fare.paxType == 5 ? "Lap Infant" : toPascalCase(fare.displayPaxType)}</td>
                                                                <td>({fare.noofPax} X {aedNumberFormat(Math.round((fare.totalFareAmount) / fare.noofPax) - Math.round(((fare.totalTaxAmount) / fare.noofPax))).split('.')[0]})</td>
                                                                <td>({fare.noofPax} X {aedNumberFormat(Math.round(((fare.totalTaxAmount) / fare.noofPax))).split('.')[0]})</td>
                                                                <td>{aedNumberFormat(Math.round(fare.totalFareAmount)).split('.')[0]}</td>
                                                            </tr> : <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{fare.paxType == 5 ? "Lap Infant" : toPascalCase(fare.displayPaxType)}</td>
                                                                <td>({fare.noofPax} X {aedNumberFormat(Math.round((fare.totalFareAmount + (fare.noofPax > 1 ? (avgTax * fare.noofPax) : 0)) / fare.noofPax) - Math.round(((fare.totalTaxAmount + (fare.noofPax > 1 ? (avgTax * fare.noofPax) : 0)) / fare.noofPax))).split('.')[0]})</td>
                                                                <td>({fare.noofPax} X {aedNumberFormat(Math.round(((fare.totalTaxAmount + (avgTax * fare.noofPax)) / fare.noofPax))).split('.')[0]})</td>
                                                                <td>{aedNumberFormat(Math.round(fare.totalFareAmount + (avgTax * fare.noofPax))).split('.')[0]}</td>
                                                            </tr>
                                                        })
                                                    }
                                                    {
                                                        bookingData?.saverService?.name &&
                                                        <tr>
                                                            <td align='right' colSpan="4"> Super Saver Service (SSS) - <span>{bookingData?.saverService?.name} </span> <span className='sss-price-division'>({bookingData?.passangers?.length} X {aedNumberFormat(Math.round(bookingData?.saverService?.price))})</span></td>
                                                            <td>{aedNumberFormat((bookingData?.passangers?.length) * Math.round(bookingData?.saverService?.price)).split('.')[0]}</td>
                                                        </tr>
                                                    }
                                                    {
                                                        bookingData?.contract?.otherTaxes?.map((tax, index) => {
                                                            return <tr>
                                                                <td colSpan="4"> <h6 className="text-end mb-0 superss-table-text">{tax.name} </h6></td>
                                                                <td>{aedNumberFormat(tax.amount)}</td>
                                                            </tr>

                                                        })
                                                    }
                                                    {
                                                        bookingData?.webCheckIn?.price &&
                                                        <tr>
                                                            <td align='right' colSpan="4"> Auto Web Check-In <span className='sss-price-division'>({bookingData?.passangers?.length} X ${(bookingData?.contract?.trips?.length > 1 ? (bookingData?.webCheckIn?.price * 2) : (bookingData?.webCheckIn?.price))})</span></td>
                                                            <td>{aedNumberFormat((bookingData?.passangers?.length) * (bookingData?.contract?.trips?.length > 1 ? (bookingData?.webCheckIn?.price * 2) : (bookingData?.webCheckIn?.price)))}</td>
                                                        </tr>
                                                    }
                                                    {
                                                        ((bookingData?.selectedDepartBaggage && bookingData?.selectedDepartBaggage?.price > 0) || (bookingData?.selectedDepartCarryOnBaggage && bookingData?.selectedDepartCarryOnBaggage?.price > 0) || (bookingData?.selectedReturnBaggage && bookingData?.selectedReturnBaggage?.price > 0) || (bookingData?.selectedReturnCarryOnBaggage && bookingData?.selectedReturnCarryOnBaggage?.price > 0)) &&
                                                        <tr>
                                                            <td align='right' colSpan="4"> Baggage Fees</td>
                                                            <td>{aedNumberFormat(getBaggagePrice().toFixed(2))}</td>
                                                        </tr>
                                                    }
                                                    {
                                                        (bookingData?.discount > 0) &&
                                                        <tr>
                                                            <td className='color-green fw-bold' align='right' colSpan="4"> Discount</td>
                                                            <td>{aedNumberFormat(bookingData?.discount)}</td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <td align='right' colSpan="4"><h5 className='mb-0 fw-bold'>Total Price</h5></td>
                                                        <td><h5 className='mb-0 fw-bold'>{aedNumberFormat(Math.round(totalPrice)).split('.')[0]}</h5></td>
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
                                                <li>Every passenger (including children and infants) must provide a valid ID when checking-in.</li>
                                                <li>We suggest checking in at least 3 hours before your domestic flight and 4 hours before your international flight departure.</li>
                                                <li>The carrier's carriage services and other facilities are governed by their own Terms and Conditions. We are not responsible if you miss any of the carrier's facilities.</li>
                                                <li>If you need to cancel tickets within 6 hours of departure, please reach out to the airlines directly. We are not responsible for any losses incurred upon receiving such requests.</li>
                                                <li>Before you travel, make sure to double-check your baggage with your airline to ensure a smooth and stress-free experience.</li>
                                                <li>You'll be charged at the airport during check-in if your baggage exceeds the specified limit. (Different baggage allowances apply for infants.)</li>
                                                <li>You can’t make partial cancellations for Round-trip fares.</li>
                                                <li>You can't make partial cancellations for tickets booked under Friends & Family fares.</li>
                                                <li>No-show refunds* must be collected within 90 days from departure. If there are 9 or more passengers, Group Booking Rules apply. The company is not responsible for any delays or cancellations by the airline.</li>
                                                <li>Please contact the airline at least 24 hours before your flight to confirm the details, mentioning your Airline PNR Number for reference.</li>
                                                <li>Reservations made on our website follow the terms & conditions of the respective airlines. Any changes, cancellations, or refunds for airline tickets strictly adhere to the policies of the airlines, and we disclaim all liability in this regard.</li>
                                                <li>Children under the age of 12 (unaccompanied children) will be accepted for carriage only when accompanied by an individual who is at least 18 years old. The adult accompanying the child is solely responsible for their well-being throughout the journey. It also includes ensuring that seats are booked together to guarantee that both the child and the accompanying adult sit next to each other during the travel.</li>
                                                <li>Check with the airline well in advance of your flight to confirm your baggage allowance.</li>
                                                <li>The times shown are in the local 24-hour format at the respective airport.</li>
                                                <li>The company is not accountable for delays or cancellations by the airline.</li>
                                                <li>Cancellation and date change fees apply before departure on a per-passenger basis. If you make amendments, you will need to pay the airline and EMT fees, along with any fare difference.</li>
                                                <li>Please make sure you have the necessary visa, transit visa (if needed), immigration clearance, and travel with a passport valid for at least 6 months from the travel date for international trips.</li>
                                                <li>Certain airports have different terminals for domestic and international flights. Before heading to the airport, please verify your flight's departure/arrival terminal with the airline.</li>
                                                <li>The convenience fee cannot be refunded if you cancel your ticket or if the airline cancels the flight.</li>
                                                <li>The fee paid for cancellation protection is non-refundable under any circumstances as part of this offer.</li>
                                                <li>Certain countries have specific limitations for arriving passengers, including those in transit or making stopovers. Please check the country and airline regulatory websites for any entry or transit restrictions to your destination. It is the traveller's sole responsibility to ensure eligibility for entry or transit to the destination. If a passenger is denied boarding by the airline or entry to a country by the airport, Travanya is not liable for any consequences. Additionally, any associated penalties must be borne by the passenger in such cases.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='col-12'>

                                        <p>Travanya Support Center: <a className='color-blue fw-bold text-decoration-none' href={'tel:' + displayContactNumber}>{displayContactNumber}</a></p>
                                        <p>Please reference the Airline PNR Number when communicating with the airline regarding this booking.</p>
                                    </div>
                                    <div className='col-12'>
                                        <Image
                                            className="mt-3 h-auto w-100"
                                            loader={trvLoader}
                                            src="allowed-not-allowed.webp"
                                            alt="Allowed - Not Allowed Img"
                                            width={183}
                                            height={50}
                                            priority
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 thanku-msg mt-5  border-bottom pb-5">
                                        <h6>Thank you for choosing <a href="https://www.travanya.com" target="_blank">Travanya.com</a> for your upcoming travel plan.<br /> Wishing you a Safe Journey!!</h6>
                                    </div>

                                    <div id="short-review-widget-container"></div>
                                </div>
                            </div>
                        </section>
                        <InnerFooter></InnerFooter>
                    </>
                }
            </Layout >
        </>
    )
}