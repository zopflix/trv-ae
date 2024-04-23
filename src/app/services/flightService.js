import axios from 'axios';
import { apiURL, cmsAPIURL, tenantId } from '../config';


export {
    getAirports,
    searchFlights,
    getAirlineBaggages,
    getPlaceDetail,
    subscribeNewsletter,
    getCityData,
    getCityWeather,
    getFareRules,
    searchDummyFlights,
    getFlightOffers,
    getFlightsPageData,
    getSitemapData,
    getGoogleReviews,
    getMostSearchFlights
}

const getAirports = async () => {
    try {
        const response = await axios.get(apiURL + "Flights/GetAirportsDataNew");
        return response.data;
    } catch (error) {
        return [];
    }
};

const searchFlights = async (data) => {
    //const res = await axios.get('https://geolocation-db.com/json/');

    let search = window.location.search;
    let params = new URLSearchParams(search);
    data.searchId = params.get("s");
    //data.userIpAddress = res.data.IPv4
    data.device = getDeviceName();
    data.userAgent = getBrowser();
    data.isDeepLinkSearch = !!data.utm_source ? true : false;
    data.utmSource = data.utm_source;
    data.utmTerm = data.utm_term;
    data.utmMedium = data.utm_medium;
    data.kayakClickId = data.kayakclickid;
    data.portalId = 50;

    try {
        const response = await axios.post(apiURL + "Flights/SearchFlights", data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const getMostSearchFlights = async (origin) => {
    try {
        const response = await axios.get(apiURL + "Flights/GetRecentDestinationSearches/" + origin);
        return response.data;
    } catch (error) {
        return [];
    }
};


const getAirlineBaggages = async () => {
    try {
        const response = await axios.get(apiURL + "BaggageAPI/GetAirlineBaggages");
        return response.data;
    } catch (error) {
        return [];
    }
};


const getPlaceDetail = async (pid) => {
    try {
        const response = await axios.get(apiURL + "Flights/GetPId/" + pid);
        return response.data;
    } catch (error) {
        return [];
    }
}

const getDeviceName = () => {
    let osName = ""
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
}

const getCityData = async () => {
    try {
        const response = await axios.get(apiURL + "Flights/GetCityPagesContent");
        return response.data;
    } catch (error) {
        return [];
    }
};

const getCityWeather = async (city) => {
    try {
        const response = await axios.get(apiURL + `weatherinformation/GetWeatherDetail/${city}/`);
        return response.data;
    } catch (error) {
        return [];
    }
};

const getFareRules = async (data) => {
    try {
        const response = await axios.post(apiURL + "Flights/GetFareRules", data);
        return response.data;
    } catch (error) {
        return [];
    }
}

const searchDummyFlights = async (data) => {
    try {
        const response = await axios.post(apiURL + "Flights/SearchDummyFlights", data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const getFlightOffers = async () => {
    try {
        const response = await axios.post(cmsAPIURL + `Public/GetOffersByTenant/${tenantId}`, {});
        return response.data;
    } catch (error) {
        return [];
    }
};

const getFlightsPageData = async (data) => {
    try {
        const response = await axios.post(cmsAPIURL + `Public/GetFlightPage`, data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const getSitemapData = async () => {
    try {
        const response = await axios.post(cmsAPIURL + `Public/GetSitemapLinks/${tenantId}`, {});
        return response.data;
    } catch (error) {
        return [];
    }
};

const getGoogleReviews = async () => {
    try {
        const response = await axios.post(`https://www.myticketstoindia.com.au/wp-content/themes/tickets/ajax.php?task=reviews`);
        return response.data;
    } catch (error) {
        return [];
    }
};

const subscribeNewsletter = async (email) => {
    try {
        const response = await axios.get(`https://travanya.com/crm/api.php?task=subscribeMe&email=${email}`);
        return response.data;
    } catch (error) {
        return [];
    }
};