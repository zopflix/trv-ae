import axios from 'axios';
import { bookingAPIURL, crmAPIURL, cmsAPIURL } from '../config';
import axiosRetry from 'axios-retry';
export {
    bookTBOFlight,
    bookFlight,
    generateTicket,
    generateCRMData,
    saveInquiryOldCrm,
    saveInquiryNewCrm,
    bookKiwiFlight,
    fetchBookingData,
    paymentAuthorized,
    getSSR,
    dummyTicketPayment,
    processDummyTicket,
    generateTBOTicket,
    makePayment,
    sendPendingEmail,
    confirmpaymentsubmission,
    subscribeUser,
    makeCustomerPayment,
    sendCustomerConfirmation,
    trackPaymentFailure,
    saveTransaction,
    getPaymentIntent,
    getPaymentDetails,
    verifyPayuTransaction,
    trackDummyPaymentFailure,
    decryptPaymentResponse
}
const bookTBOFlight = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + "booking/BookTBOFlight", data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const bookFlight = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + "booking/BookFlightAndPayment", data);
        return response.data;
    } catch (error) {
        return [];
    }
};
const generateTicket = async (transactionId) => {
    try {
        const response = await axios.post(bookingAPIURL + "booking/process-ticketing?id=" + transactionId);
        return response.data;
    } catch (error) {
        return [];
    }
}

const generateCRMData = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + "booking/Generate-CrmId", data);
        return response.data;
    } catch (error) {
        return [];
    }
}


const saveInquiryOldCrm = async (data) => {
    try {
        const response = await axios.post(crmAPIURL + "Public/SaveOldCRMInqiry", data);
        return response.data;
    } catch (error) {
        return [];
    }
}

//save inquiry for new crm
const saveInquiryNewCrm = async (data) => {
    try {
        const response = await axios.post(crmAPIURL + "Public/SaveInquiry", data);
        return response.data;
    } catch (error) {
        return [];
    }
}
const bookKiwiFlight = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + "booking/buy", data);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};


const fetchBookingData = async (id) => {
    try {
        const response = await axios.get(bookingAPIURL + `booking/fetch-booking-detail/${id}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

const paymentAuthorized = async (payload) => {
    return axios.post(cmsAPIURL + `Public/PaymentAuthorization`, payload).then((res) => {
        return res
    }).catch(err => err)
}

const getSSR = async (payload) => {
    axiosRetry(axios, {
        retries: 3, // Number of retries
        onRetry: (retryCount, error, requestConfig) => {
            console.log(`retry count: `, retryCount);

        },
        retryCondition(error) {
            // Conditional check the error status code
            switch (error?.response?.status) {
                case 404:
                case 400:
                case 500:
                case 429:
                    return true; // Retry request with response status code 404 or 429
                default:
                    return false; // Do not retry the others
            }
        },
    });
    return axios.post(bookingAPIURL + `booking/getssr`, payload).then((res) => {
        return res.data
    }).catch(err => {
        err
    })
}

const dummyTicketPayment = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + "booking/DummyTicketPayment", data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const processDummyTicket = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + "booking/ProcessDummyTicket?id=" + data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const generateTBOTicket = async (transactionId, bRef, bid) => {
    try {
        const response = await axios.post(bookingAPIURL + "booking/process-tbo-ticketing?id=" + transactionId + "&refNumber=" + bRef + "&bid=" + bid);
        return response.data;
    } catch (error) {
        return [];
    }
}

const makePayment = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + "payment/make-payment/" + data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const makeCustomerPayment = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + "payment/make-customer-payment/", data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const sendPendingEmail = async (id) => {
    try {
        const response = await axios.post(bookingAPIURL + `booking/send-pending-email/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
const trackDummyPaymentFailure = async (id, error) => {
    try {
        const response = await axios.post(bookingAPIURL + `booking/TrackDummyPaymentFailure?id=${id}&error=${error}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
const confirmpaymentsubmission = async (id, key, txnId, refNumber) => {
    try {
        const response = await axios.post(bookingAPIURL + `payment/confirm-payment-submission?id=${id}&key=${key}&txnId=${txnId}&refNumber=` + refNumber);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const trackPaymentFailure = async (id, error) => {
    try {
        const response = await axios.post(bookingAPIURL + `booking/TrackPaymentFailure?id=${id}&error=${error}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const sendCustomerConfirmation = async (data) => {
    try {
        const response = await axios.post(crmAPIURL + `public/SendCustomerPaymentRecieveConfirmation`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const subscribeUser = async (email) => {
    try {
        const response = await axios.post(crmAPIURL + `Public/UserSubscription/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};


const verifyPayuTransaction = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + `payment/VerifyPayment/${data}`, {});
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
const saveTransaction = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + `payment/SavePaymentTransaction/${data.txnId}/${data.amount}/${data.refNumber}/${data.gateway}/TRV`, {});
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const getPaymentIntent = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + "payment/GetPaymentIntent", data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const getPaymentDetails = async (paymentIntent) => {
    try {
        const response = await axios.post(bookingAPIURL + `payment/GetPaymentDetail/${paymentIntent}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

const encryptPaymentRequest = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + `payment/EncryptRequest`, data);
        return response.data;
    } catch (error) {
        return [];
    }
}

const decryptPaymentResponse = async (data) => {
    try {
        const response = await axios.post(bookingAPIURL + `payment/DecryptResponse?id=` + data);
        return response.data;
    } catch (error) {
        return [];
    }
}