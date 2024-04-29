import { displayAirlines } from "./display-airlines"
import moment from 'moment';
import mixpanel from 'mixpanel-browser';
import axios from "axios";
import { webCheckInAirlines } from "./web-checkin-airlines";
import CryptoJS from 'crypto-js'

export {
    generateId,
    isPureAirline,
    isADomesticFlight,
    getDisplayAirline,
    getFormattedTime,
    getFormattedTime1,
    getDiffFromMinutes,
    getFormattedDate,
    numberFormat,
    isExternalUTM,
    isWithinEarlyMorningRange,
    isWithinMorningRange,
    isWithinAfternoonRange,
    isWithinEveningRange,
    trackMixpanelEvent,
    getAdultYearOptions,
    getFirstAdultYearOptions,
    getChildYearOptions,
    getInfantsYearOptions,
    getCreditCardYearOptions,
    getFormattedDateTime,
    getFormattedDate1,
    getFormattedDate2,
    getFormattedDate3,
    getFormattedDate4,
    getFormattedDate5,
    getFormattedDate6,
    getFormattedDate7,
    getFormattedDate8,
    toPascalCase,
    isValidCardExpiry,
    getAge,
    isValidDayOfMonth,
    checkLeapYear,
    searchDeals,
    getDisplayClass,
    searchOnewayDeail,
    showIndiaFlightContact,
    getMaxDatePicker,
    checkMaxDateRange,
    isJsonString,
    isDomesticFlightWOCanada,
    getWebCheckInAirline,
    isWithinDateRange,
    getDatesAfterAddingDays,
    getDisplayCabin,
    cloneData,
    encodeData,
    getBrowser,
    getDeviceName,
    getTimeOfDay,
    capitalizeEachWord,
    Decrypt,
    getDaysAgo,
    getLastDateOfCurrentMonth,
    gtag_report_conversion,
    aedNumberFormat
}

const flightClassOptions = [{
    value: 1, label: "Economy",
},
{
    value: 2, label: "Premium",
}, {
    value: 3, label: "Business",
}, {
    value: 4, label: "First Class"
}];

const dec2hex = (dec) => {
    return dec.toString(16).padStart(2, "0")
}

const generateId = (len) => {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

const isPureAirline = (flights) => {
    if (flights.trips.length > 1) {
        return (flights.trips[0].listOfFlight.every(x => x.airlineName == flights.trips[0].validatingCarrier.name) && flights.trips[1].listOfFlight.every(x => x.airlineName == flights.trips[0].validatingCarrier.name))
    }
    return flights.trips[0].listOfFlight.every(x => x.airlineName == flights.trips[0].validatingCarrier.name);
}

const isADomesticFlight = (flight) => {
    if (flight.trips[0].listOfFlight[0].departCountryCode == "United States" && flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].arrivalCountryCode == "Canada") {
        return true;
    }
    return (flight.trips[0].listOfFlight[0].departCountryCode == flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].arrivalCountryCode);
}

const isDomesticFlightWOCanada = (flight) => {
    return (flight.trips[0].listOfFlight[0].departCountryCode == "United States" && flight.trips[0].listOfFlight[flight.trips[0].listOfFlight.length - 1].arrivalCountryCode == "United States");
}

const getDisplayAirline = (currentAirline, isDomestic) => {
    return displayAirlines.find(x => x.airline == currentAirline && (x.isDom == isDomestic || x.isDom == null));
}

const getWebCheckInAirline = (flight) => {
    if (flight.trips.length == 1) {
        return webCheckInAirlines.find(x => x.airlineName == flight.trips[0].validatingCarrier.name && (x.displayOn == "OW" || x.displayOn == "both"));
    }
    else {
        return webCheckInAirlines.find(x => x.airlineName == flight.trips[0].validatingCarrier.name && (x.displayOn == "RT" || x.displayOn == "both"));
    }
}

const getFormattedTime = (time) => {
    if (time?.indexOf(":") == -1)
        return time.substr(0, 2) + ":" + time.substr(2, 2)

    return time?.substr(0, 5);
    // let aa = moment(time, "hh:mm").format("HH:MM")
    // return aa;
}

const getFormattedTime1 = (time) => {
    return moment(time, "hh:mm").format("hh:mma");
}

const getDiffFromMinutes = (minutes) => {
    let difference = moment.duration(parseInt(minutes), 'minutes');
    let allHours = (difference.hours() + (24 * difference.days()));
    return (allHours > 9 ? (allHours + "h") : "0" + allHours + "h") + " " + (difference.minutes() > 9 ? difference.minutes() + "m" : "0" + difference.minutes() + "m");
}

const getFormattedDate = (date) => {
    var mdate = moment(date);
    if (mdate.isValid())
        return moment(date).format("ddd, MMM DD");
    else {
        var formattedDate = moment(date, "DD-MM-YY").format("ddd, MMM DD");
        return formattedDate;
    }
}

const aedNumberFormat = (value) =>
new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2
}).format(value);

    
    const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2

    }).format(value);


const isExternalUTM = () => {
    let paramsData = null;
    if (!!localStorage.getItem("currentSearchId")) {
        let searchId = localStorage.getItem("currentSearchId");
        let item = localStorage.getItem(searchId);
        if (isJsonString(atob(item))) {
            paramsData = JSON.parse(atob(item));
            return (paramsData && paramsData.utm_term == "cheapflights")
        }
    }
    else {
        let search = window.location.search;
        let params = new URLSearchParams(search);

        if (params && !!params.get("s")) {
            let item = localStorage.getItem(params.get("s"));
            if (isJsonString(atob(item))) {
                paramsData = JSON.parse(atob(item));
                return (paramsData && paramsData.utm_term == "cheapflights")
            }
        }
    }
    return false;
}

const isWithinEarlyMorningRange = (time) => {
    return Date.parse('01/01/2011 ' + time) >= Date.parse('01/01/2011 12:00 AM') && Date.parse('01/01/2011 ' + time) <= Date.parse('01/01/2011 04:59 AM');
}
const isWithinMorningRange = (time) => {
    let data = Date.parse('01/01/2011 ' + time) >= Date.parse('01/01/2011 05:00 AM') && Date.parse('01/01/2011 ' + time) <= Date.parse('01/01/2011 11:59 AM');
    return data;
}

const isWithinAfternoonRange = (time) => {
    let iswithinRange = Date.parse('01/01/2011 ' + time) >= Date.parse('01/01/2011 12:00 PM') && Date.parse('01/01/2011 ' + time) <= Date.parse('01/01/2011 06:59 PM');
    return iswithinRange;
}
const isWithinEveningRange = (time) => {
    return Date.parse('01/01/2011 ' + time) >= Date.parse('01/01/2011 07:00 PM') && Date.parse('01/01/2011 ' + time) <= Date.parse('01/01/2011 11:59 PM');
}

const generateRandomNumber = (n) => {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}

const calculateBannerPrice = (flightData) => {
    let adultsDetail = flightData.fareDetails.find(x => x.paxType == 1);
    let price = adultsDetail.totalFareAmount;

    if (adultsDetail && adultsDetail.noofPax > 1) {
        price = (adultsDetail.totalFareAmount / adultsDetail.noofPax);
    }

    return (price - ((price * 4) / 100))

}

const trackMixpanelEvent = async (eventName, currentFlight, isVerified = false, billingDetails = null, searchCriteria = null, deeplinkObj = null) => {

    mixpanel.init('23bddaada9c60d0c7b92fbc13ce9734a');

    if (eventName == "Deeplink_Listing_Load" && searchCriteria) {
        mixpanel.register({
            Utm_Source: searchCriteria.utm_source,
            Utm_Term: searchCriteria.utm_term,
            Referer: searchCriteria.referer
        });
    }
    if (eventName == "Go_Back"
        || eventName == "India_Call_Listing"
        || eventName == "Add_Manual_Address"
        || eventName == "UC_Listing_CallBanner"
        || eventName == "Make-Payment-Button-International"
        || eventName == "Make-Payment-Button-Domestic"
        || eventName == "Dummy_Ticket_Search"
        || eventName == "Dummy_Ticket_Download_Button"
        || eventName == "Dummy_Ticket_Load"
        || eventName == "View_Seat_Map") {
        mixpanel.track(eventName);
        return;
    }

    if ((eventName == "Holiday_Inquiry_Submitted" || eventName == 'Holiday_Inquiry_Popup') && searchCriteria != null) {
        mixpanel.track(eventName, {
            email: searchCriteria.email,
            mobile: searchCriteria.mobile,
            From: searchCriteria.placeFrom,
            adults: searchCriteria.adults,
            children: searchCriteria.children
        });

        return;
    }

    const res = await axios.get('https://geolocation-db.com/json/')

    if (eventName == "Go_to_Home" || eventName == "Bottom_Strip_Call") {
        mixpanel.track(eventName, {
            User_IP: res?.data.IPv4
        })
        return;
    }

    if (eventName == "Deeplink_Banner" && (deeplinkObj != null)) {
        mixpanel.track(eventName, {
            Origin: deeplinkObj.Origin,
            Destination: deeplinkObj.Destination,
            Departure_Date: deeplinkObj.Departure_Date,
            Return_Date: deeplinkObj.Return_Date,
            Trip_Type: deeplinkObj.Trip_Type,
            User_IP: res.data.IPv4,
            Email: deeplinkObj.Email,
            Phone: deeplinkObj.Phone
        })
        return;
    }

    if ((eventName == "Deeplink_Listing_Load" || eventName == "No_Result" || eventName == "Home_Widget_Search") && searchCriteria != null) {
        let formattedFromDate = moment(searchCriteria.segments[0].departureDate).format("YYYY-MM-DD").replace("/", "-").replace("/", "-") + "T12:34:56";
        let formattedToDate = "";
        if (searchCriteria.segments.length > 1)
            formattedToDate = moment(searchCriteria.segments[1].departureDate).format("YYYY-MM-DD").replace("/", "-").replace("/", "-") + "T12:34:56";

        mixpanel.track(eventName, {
            Origin: searchCriteria.segments[0].fromCode,
            Destination: searchCriteria.segments[0].toCode,
            Departure_Date: formattedFromDate,
            Return_Date: formattedToDate,
            Trip_Type: searchCriteria.tripType == 2 ? "RoundTrip" : "One Way",
            Adult: searchCriteria.noOfAdult,
            Child: searchCriteria.child,
            Inf: searchCriteria.noOfLapInfant,
            Class: getDisplayClass(searchCriteria.cabin),
            User_IP: res.data.IPv4,
            Search_ID: searchCriteria.searchId
        });
        return null;
    }

    let formattedFromDate = moment(currentFlight?.trips[0].listOfFlight[0].departeddate).format("YYYY-MM-DD").replace("/", "-").replace("/", "-") + "T12:34:56";
    let formattedToDate = "";
    if (currentFlight?.trips.length > 1)
        formattedToDate = moment(currentFlight?.trips[1].listOfFlight[0].departeddate).format("YYYY-MM-DD").replace("/", "-").replace("/", "-") + "T12:34:56";
    let segmentsAirlines = currentFlight?.trips[0].listOfFlight.map(x => x.marketingCarrier);
    if (currentFlight?.trips.length > 1) {
        let returnSegmentAirlineCodes = currentFlight?.trips[1].listOfFlight.map(x => x.marketingCarrier);
        segmentsAirlines.push(...returnSegmentAirlineCodes)
    }
    let noOfAdults = currentFlight?.fareDetails.find(x => x.paxType == 1).noofPax;
    let noOfChilds = 0;
    let noInfants = 0;

    let childPax = currentFlight?.fareDetails.find(x => x.paxType == 3);
    if (childPax)
        noOfChilds = childPax.noofPax;
    let infantPax = currentFlight?.fareDetails.find(x => x.paxType == 5);
    if (infantPax)
        noInfants = infantPax.noofPax;

    if (eventName == "Listing_Itineary_Select" || eventName == "FlightDetail_Continue" || eventName == "Payment_page_Load" || eventName == "Listing_Itineary_Select_Mobile" || eventName == "Flap_Close") {
        /* Track a Select button clicked */
        mixpanel.track(eventName, {
            Origin: currentFlight?.trips[0].listOfFlight[0].fromCode,
            Destination: currentFlight?.trips[0].listOfFlight[currentFlight?.trips[0].listOfFlight.length - 1].toCode,
            Departure_Date: formattedFromDate,
            Return_Date: formattedToDate,
            Trip_Type: currentFlight?.trips.length > 1 ? "RoundTrip" : "One Way",
            Adult: noOfAdults,
            Child: noOfChilds,
            Inf: noInfants,
            Class: getDisplayClass(currentFlight?.trips[0].listOfFlight[0].classOfService),
            User_IP: res.data.IPv4,
            Segment_Airline: segmentsAirlines.join(),
            Airline: segmentsAirlines.every(v => v === segmentsAirlines[0]) ? segmentsAirlines[0] : "MIX",
            Price: currentFlight?.totalPrice.toFixed(2),
            Departure_Flight_Time: getFormattedTime(currentFlight?.trips[0].listOfFlight[0].departureTime),
            Return_Flight_Time: currentFlight?.trips.length > 1 ? getFormattedTime(currentFlight?.trips[1].listOfFlight[0].departureTime) : "",
            Departure_Flight_No: currentFlight?.trips[0].listOfFlight.map(x => x.flightNumber).join(),
            Return_Flight_No: currentFlight?.trips.length > 1 ? currentFlight?.trips[1].listOfFlight.map(x => x.flightNumber).join() : ""
        });
    }
    else if ((eventName == "Book_Button_Success" || eventName == "Contact_Information") && billingDetails != null) {
        let returnObj = {
            Origin: currentFlight?.trips[0].listOfFlight[0].fromCode,
            Destination: currentFlight?.trips[0].listOfFlight[currentFlight?.trips[0].listOfFlight.length - 1].toCode,
            Departure_Date: formattedFromDate,
            Return_Date: formattedToDate,
            Trip_Type: currentFlight?.trips.length > 1 ? "RoundTrip" : "One Way",
            Adult: noOfAdults,
            Child: noOfChilds,
            Inf: noInfants,
            Class: getDisplayClass(currentFlight?.trips[0].listOfFlight[0].classOfService),
            User_IP: res.data.IPv4, //
            Segment_Airline: segmentsAirlines?.join(),
            Airline: segmentsAirlines?.every(v => v === segmentsAirlines[0]) ? segmentsAirlines[0] : "MIX",
            Price: currentFlight?.totalPrice.toFixed(2),
            Departure_Flight_Time: getFormattedTime(currentFlight?.trips[0].listOfFlight[0].departureTime),
            Return_Flight_Time: currentFlight?.trips.length > 1 ? getFormattedTime(currentFlight?.trips[1].listOfFlight[0].departureTime) : "",
            Departure_Flight_No: currentFlight?.trips[0].listOfFlight.map(x => x.flightNumber).join(),
            Return_Flight_No: currentFlight?.trips.length > 1 ? currentFlight?.trips[1].listOfFlight.map(x => x.flightNumber).join() : "",
            isVerified: isVerified,
            Contact_No: billingDetails?.contactDetail?.contactNo,
            Email: billingDetails?.contactDetail?.email
        }
        mixpanel.track(eventName, returnObj);
        return returnObj;
    }
    else if (eventName == "UC_Banner_Call" || eventName == "UC_Banner_Appear") {/* Track a call  button clicked and Popup appears */
        mixpanel.track(eventName, {
            Origin: currentFlight?.trips[0].listOfFlight[0].fromCode,
            Destination: currentFlight?.trips[0].listOfFlight[currentFlight?.trips[0].listOfFlight.length - 1].toCode,
            Departure_Date: formattedFromDate,
            Return_Date: formattedToDate,
            Trip_Type: currentFlight?.trips.length > 1 ? "RoundTrip" : "One Way",
            Adult: noOfAdults,
            Child: noOfChilds,
            Inf: noInfants,
            Class: getDisplayClass(currentFlight?.trips[0].listOfFlight[0].classOfService),
            User_IP: res.data.IPv4, //
            Unique_ID: parseInt(generateRandomNumber(6)),
            UC_Price_Display: calculateBannerPrice(currentFlight).toFixed(2),
            Segment_Airline: segmentsAirlines.join(),
            Airline: segmentsAirlines.every(v => v === segmentsAirlines[0]) ? segmentsAirlines[0] : "MIX",
            Departure_Flight_Time: getFormattedTime(currentFlight.trips[0].listOfFlight[0].departureTime),
            Return_Flight_Time: currentFlight.trips.length > 1 ? getFormattedTime(currentFlight.trips[1].listOfFlight[0].departureTime) : "",
            Departure_Flight_No: currentFlight.trips[0].listOfFlight.map(x => x.flightNumber).join(),
            Return_Flight_No: currentFlight.trips.length > 1 ? currentFlight.trips[1].listOfFlight.map(x => x.flightNumber).join() : ""
        });

    }
    else if (eventName == "CNF_Fired") {
        mixpanel.track(eventName, {
            Origin: currentFlight.trips[0].listOfFlight[0].fromCode,
            Destination: currentFlight.trips[0].listOfFlight[currentFlight.trips[0].listOfFlight.length - 1].toCode,
            Departure_Date: formattedFromDate,
            Return_Date: formattedToDate,
            Trip_Type: currentFlight.trips.length > 1 ? "RoundTrip" : "One Way",
            Adult: noOfAdults,
            Child: noOfChilds,
            Inf: noInfants,
            Class: getDisplayClass(currentFlight.trips[0].listOfFlight[0].classOfService),
            User_IP: res.data.IPv4, //
            Segment_Airline: segmentsAirlines.join(),
            Airline: segmentsAirlines.every(v => v === segmentsAirlines[0]) ? segmentsAirlines[0] : "MIX",
            Price: currentFlight.totalPrice.toFixed(2),
            Departure_Flight_Time: getFormattedTime(currentFlight.trips[0].listOfFlight[0].departureTime),
            Return_Flight_Time: currentFlight.trips.length > 1 ? getFormattedTime(currentFlight.trips[1].listOfFlight[0].departureTime) : "",
            Departure_Flight_No: currentFlight.trips[0].listOfFlight.map(x => x.flightNumber).join(),
            Return_Flight_No: currentFlight.trips.length > 1 ? currentFlight.trips[1].listOfFlight.map(x => x.flightNumber).join() : "",
            Payment: currentFlight.paymentStatus,
            BookingId: currentFlight.bookingId,
            PNR: currentFlight.pnr,
            Email: currentFlight.email,
            Phone: currentFlight.cellCountryCode + '-' + currentFlight.phone
        });
    }

}

const getAdultYearOptions = () => {
    let options = [];
    let currentYear = new Date().getFullYear();
    let startPoint = currentYear - 110;
    let endPoint = currentYear - 11;
    for (let i = startPoint; i <= endPoint; i++) {
        options.push({
            value: i, label: i.toString()
        })
    }
    return options;
}

const getFirstAdultYearOptions = () => {
    let options = [];
    let currentYear = new Date().getFullYear();
    let startPoint = currentYear - 110;
    let endPoint = currentYear - 18;
    for (let i = startPoint; i <= endPoint; i++) {
        options.push({
            value: i, label: i.toString()
        })
    }
    return options;
}

const getChildYearOptions = () => {
    let options = [];
    let currentYear = new Date().getFullYear();
    let startPoint = currentYear - 12;
    let endPoint = currentYear - 2;
    for (let i = startPoint; i <= endPoint; i++) {
        options.push({
            value: i, label: i.toString()
        })
    }
    return options;
}
const getInfantsYearOptions = () => {
    let options = [];
    let currentYear = new Date().getFullYear();
    let startPoint = currentYear - 2;
    let endPoint = currentYear;
    for (let i = startPoint; i <= endPoint; i++) {
        options.push({
            value: i, label: i.toString()
        })
    }
    return options;
}

const getCreditCardYearOptions = () => {
    let options = [];
    let currentYear = new Date().getFullYear();
    let startPoint = currentYear;
    let endPoint = currentYear + 10;
    for (let i = startPoint; i <= endPoint; i++) {
        options.push({
            value: i, label: i.toString()
        })
    }
    return options;
}

const getFormattedDateTime = (date) => {
    return moment.utc(date).format("MMM DD, yyyy | hh:mm A")
}

const getFormattedDate1 = (date) => {
    return moment(date).format("MMMM, DD yyyy")
}

const getFormattedDate2 = (date) => {
    return moment(date).format("MMM DD, yyyy")
}

const getFormattedDate3 = (date) => {
    return moment(date).format("ddd, MMMM DD, yyyy")
}

const getFormattedDate4 = (date) => {
    var mdate = moment(date);
    if (mdate.isValid())
        return moment(date).format("ddd, MM/DD");
    else {
        var formattedDate = moment(date, "DD-MM-YY").format("ddd, MM/DD");
        return formattedDate;
    }
}

const getFormattedDate5 = (date) => {
    return moment(date).format("ddd, MMMM DD")
}

const getFormattedDate6 = (date) => {
    return moment(date).format("DD MMM")
}

// CONVERT FROM dd/mm/yyyy to MMM DD, yyyy
const getFormattedDate7 = (date) => {
    const parts = date.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const monthAbbreviation = new Date(`${year}-${month}-${day}`).toLocaleString('default', { month: 'short' });
    return `${monthAbbreviation} ${day}, ${year}`;
}

const getFormattedDate8 = (date) => {
    return moment(date).format("DD MMM YYYY");
}

const toPascalCase = (string) => {
    return string
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
        .join('');
}

const isValidCardExpiry = (expMonth, expYear) => {
    let currentMonth = (new Date().getMonth()) + 1;
    let currentYear = new Date().getFullYear();
    if (expYear == currentYear && expMonth < currentMonth) {
        return false;
    }
    return true;
}

const getAge = (dateString, dateToCompare) => {
    var today = new Date(dateToCompare);
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const isValidDayOfMonth = (value, monthValue, yearValue) => {
    value = parseInt(value);
    monthValue = parseInt(monthValue);

    if ((monthValue == 4 || monthValue == 6 || monthValue == 9 || monthValue == 11) && value > 30) {
        return false
    }
    else if (!!yearValue && !checkLeapYear(yearValue.toString()) && (value > 28 && monthValue == 2)) {
        return false;
    }
    else if (!!yearValue && checkLeapYear(yearValue.toString()) && (value > 29 && monthValue == 2)) {
        return false;
    }

    return true;
}

function checkLeapYear(year) {
    return new Date(year, 1, 29).getDate() === 29;
}

const searchDeals = (fromCode, toCode, days, retDays, utm_source = null) => {
    let fromDate = moment().add(days, "days").format("MM/DD/YYYY");
    let toDate = moment().add(retDays, "days").format("MM/DD/YYYY");
    let segments = [
        {
            fromCode: fromCode,
            toCode: toCode,
            departureDate: fromDate,
            fromLabel: "",
            toLabel: ""
        },
        {
            fromCode: toCode,
            toCode: fromCode,
            departureDate: toDate,
            fromLabel: "",
            toLabel: ""
        },
    ];
    let data = {
        cabin: 1,
        child: 0,
        noOfAdult: 1,
        noOfLapInfant: 0,
        segments: segments,
        tripType: 2,
        utm_source: utm_source
    };
    let searchId = generateId(12);
    localStorage.setItem(searchId, btoa(JSON.stringify(data)));
    localStorage.setItem("mySearchID", searchId);
    return searchId;
}

const searchOnewayDeail = (fromCode, toCode, days, isFromIndiaFlightPage = false) => {
    let fromDate = moment().add(days, "days").format("MM/DD/YYYY");
    let segments = [
        {
            fromCode: fromCode,
            toCode: toCode,
            departureDate: fromDate,
            fromLabel: "",
            toLabel: ""
        }
    ];
    let data = {
        cabin: 1,
        child: 0,
        noOfAdult: 1,
        noOfLapInfant: 0,
        segments: segments,
        tripType: 2,
        isFromIndiaFlightPage: isFromIndiaFlightPage
    };
    let searchId = generateId(12);
    localStorage.setItem(searchId, btoa(JSON.stringify(data)));
    return searchId;
}

const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
const showIndiaFlightContact = () => {
    let showIndiaContact = false;
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let paramsData = null;
    if (params && !!params.get("s")) {
        let item = localStorage.getItem(params.get("s"));
        if (isJsonString(atob(item))) {
            paramsData = JSON.parse(atob(item));

            if (paramsData && paramsData.isFromIndiaFlightPage)
                showIndiaContact = true;
        }
    }
    return showIndiaContact;
}
const getMaxDatePicker = () => {
    let dt = new Date();
    dt = new Date(dt.setMonth(dt.getMonth() + 11));
    return new Date(dt.setDate(dt.getDate() + 15));

}
const getDisplayClass = (cls) => {

    if (cls == "Y" || cls == "W")
        return "Premium Economy";
    else if (cls == "F")
        return "First";
    else if (cls == "C")
        return "Business";
    else
        return "Economy";
}

const checkMaxDateRange = (maxDate, fromdate, diffDays) => {
    let max = moment(maxDate);
    let from = moment(fromdate);
    let diff = max.diff(from, 'days');
    return diff < diffDays
}

const isWithinDateRange = (date) => {
    let currentDate = new Date().setHours(0, 0, 0, 0);
    let departDate = new Date(date).setHours(0, 0, 0, 0);
    let diff = (departDate - currentDate) / (1000 * 3600 * 24);
    return diff > 1;
}

const getDatesAfterAddingDays = (days, retDays) => {
    let fromDate = moment().add(days, "days").format("MM/DD/YYYY");
    let toDate = moment().add(retDays, "days").format("MM/DD/YYYY");
    return getFormattedDate(fromDate) + " - " + getFormattedDate(toDate);
}

const getDisplayCabin = (cls) => {
    let cabinData = flightClassOptions.find(x => x.value == cls);
    if (cabinData)
        return cabinData.label;
    return flightClassOptions[0].label;
}

const cloneData = (data) => {
    return JSON.parse(JSON.stringify(data));
}

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
    const _keyStr = "abcdefghijklmnopqrstuvwxyz0123456789+/=ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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

const getBrowser = () => {
    let browserName = "";
    var browserList = [
        { name: "Firefox", value: "Firefox" },
        { name: "Opera", value: "OPR" },
        { name: "Edge", value: "Edg" },
        { name: "Chrome", value: "Chrome" },
        { name: "Safari", value: "Safari" },
    ];
    let userDetails = navigator.userAgent;
    for (let i in browserList) {
        if (userDetails.includes(browserList[i].value)) {
            browserName = browserList[i].name || "Unknown Browser";
            break;
        }
    }
    return browserName;
};

const getDeviceName = () => {
    let osName = "";
    var osList = [
        { name: "Android", value: "Android" },
        { name: "iPhone", value: "iPhone" },
        { name: "iPad", value: "Mac" },
        { name: "Macintosh", value: "Mac" },
        { name: "Linux", value: "Linux" },
        { name: "Windows", value: "Win" },
    ];
    let userDetails = navigator.userAgent;
    for (let i in osList) {
        if (userDetails.includes(osList[i].value)) {
            osName = osList[i].name;
            break;
        }
    }
    return osName;
};

const getTimeOfDay = (time) => {
    if (Date.parse('01/01/2011 ' + time) >= Date.parse('01/01/2011 05:00 AM')
        && Date.parse('01/01/2011 ' + time) <= Date.parse('01/01/2011 11:59 AM'))
        return 'Morning';
    else if (Date.parse('01/01/2011 ' + time) >= Date.parse('01/01/2011 12:00 PM')
        && Date.parse('01/01/2011 ' + time) <= Date.parse('01/01/2011 05:59 PM'))
        return 'Afternoon';
    else if (Date.parse('01/01/2011 ' + time) >= Date.parse('01/01/2011 06:00 PM')
        && Date.parse('01/01/2011 ' + time) <= Date.parse('01/01/2011 10:59 PM'))
        return 'Evening';
    else
        return 'Night';
}

const capitalizeEachWord = (str) => {
    return str.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
}

const Decrypt = (str) => {
    const key = CryptoJS.enc.Utf8.parse("12@22Sh!pra@@0#0");
    const iv = CryptoJS.enc.Utf8.parse("12@22Sh!pra@@0#0");
    var decrypt = CryptoJS.AES.decrypt(str, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
}

const getDaysAgo = (time) => {
    // Get the current Unix timestamp
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // Calculate the time difference in seconds
    const timeDifferenceSeconds = currentTimestamp - time;
    // Convert seconds to days
    const daysAgo = Math.floor(timeDifferenceSeconds / (60 * 60 * 24));
    let monthsAgo = Math.floor(daysAgo / 30);
    let yearsAgo = Math.floor(daysAgo / 365);

    if (yearsAgo > 0)
        return `${yearsAgo} year${yearsAgo === 1 ? '' : 's'} ago`;
    else if (monthsAgo > 0)
        return `${monthsAgo} month${monthsAgo === 1 ? '' : 's'} ago`;
    else
        return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
}

const getLastDateOfCurrentMonth = () => {
    // Get the current date
    var currentDate = new Date();
    // Get the current month
    var currentMonth = currentDate.getMonth();
    // Create a new date object for the first day of the next month
    var nextMonthDate = new Date(currentDate.getFullYear(), currentMonth + 1, 1);
    // Set the date to the last day of the current month by subtracting one day from the first day of the next month
    nextMonthDate.setDate(nextMonthDate.getDate() - 1);

    return nextMonthDate;
}

const gtag_report_conversion = () => {

    gtag('event', 'conversion', {
        'send_to': 'AW-11426739459/sFFCCK3U3YMZEIPq2Mgq',
        'value': 1.0,
        'currency': 'USD',
        'transaction_id': '',
    });
    return false;
}
