import axios from "axios";

const { cmsAPIURL, crmAPIURL } = require("../config");

export {
  getDurations,
  getAllHolidayPackages,
  getHolidayPackageById,
  getHolidayPackageBySlug,
  sendHolidayInquiry,
  getDestinationAndPackages,
  getAccommodationsByDestination,
  getDestinationByName
}

// DURATIONS APIS
const getDurations = async () => {
  return axios.get(cmsAPIURL + 'HolidayPackage/GetDurations').then(res => res).catch(err => err);
}

// HOLIDAY PACKAGE APIS
const getAllHolidayPackages = async (tenantId, destination) => {
  try {
    const response = await axios.get(cmsAPIURL + `HolidayPackage/GetAll?tenantId=${tenantId}&destination=${destination}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

const getHolidayPackageById = async (id) => {
  try {
    const response = await axios.get(cmsAPIURL + `HolidayPackage/Get?id=${id}`).then(res => res).catch(err => err);
    return response.data;
  } catch (error) {
    return [];
  }
}

const getHolidayPackageBySlug = async (slug, tenantId) => {
  try {
    const response = await axios.get(cmsAPIURL + `HolidayPackage/GetPackageBySlug?slug=${slug}&tenantId=${tenantId}`).then(res => res).catch(err => err);
    return response.data;
  } catch (error) {
    return [];
  }
}

const sendHolidayInquiry = async (data) => {
  try {
    let params = `?r[source]=3&r[ip]=${data.ip}&r[referer]=${data.referer}&r[pack_type]=${data.packType}&r[place_from]=${data.placeFrom}&r[place_to]=${data.packageName}&r[return_date]=${data.returnDate}&r[travel_date]=${data.travelDate}&r[site]=${'TRVAE'}&r[mode]=${data.mode ? 2 : 1}&r[adults]=${data.adults}&r[childs]=${data.children}&r[name]=${data.name}&r[email]=${data.email}&r[mobile]=${data.mobile}&r[currency]=INR&r[budget]=${data.price}&loc=${data.location}`;
    let dataToSend = { payload: params };
    const response = await axios.post(`${crmAPIURL}public/SubmitHolidayInquiry`, dataToSend);
    return response.data;
  } catch (error) {
    return [];
  }
};

const getDestinationAndPackages = async (data) => {
  try {
    const response = await axios.post(cmsAPIURL + `Public/GetDestinationAndPackages`, data).then(res => res).catch(err => err);
    return response.data;
  } catch (error) {
    return [];
  }
}

// ACCOMMODATIONS APIS
const getAccommodationsByDestination = async (destId, tenantId) => {
  try {
    const response = await axios.get(cmsAPIURL + `Accommodations?destinationId=${destId}&tenantId=${tenantId}`).then(res => res).catch(err => err);
    return response.data;
  } catch (error) {
    return [];
  }
}

// DESTINATION APIS
const getDestinationByName = async (name) => {
  try {
    const response = await axios.get(cmsAPIURL + `Destinations/GetByName?name=${name}`).then(res => res).catch(err => err);
    return response.data;
  } catch (error) {
    return [];
  }
}