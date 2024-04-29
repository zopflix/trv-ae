import { Modal } from "react-bootstrap";
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendHolidayInquiry } from "../services/holidayService";
import { getFormattedDate8, trackMixpanelEvent } from "../helpers/common";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function InquiryPopup(props) {
  const [packType, setPackType] = useState("Leisure");
  const [travelDate, setTravelDate] = useState();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setTravelDate(props.travelDate);
  }, [props.travelDate]);

  const submitInquiry = async () => {
    setIsSubmitting(true);
    setHasError(false);
    if (
      !!props.package?.Title &&
      travelDate &&
      !!mobile &&
      mobile.length == 10 &&
      !!email &&
      isValidEmail
    ) {
      const res = await axios.get("https://geolocation-db.com/json/");
      let payload = {
        name: "Traveller",
        packType: packType,
        packageName: props.package?.Title,
        travelDate: getFormattedDate8(travelDate),
        email: email,
        mobile: "91-" + mobile,
        price: props.totalPrice
          ? props.totalPrice
          : props.package?.StandardPrice,
        adults: props.adults ? props.adults : 1,
        children: props.children ? props.children : 0,
        placeFrom: 'NA',
        ip: !!res?.data?.IPv4 ? res?.data?.IPv4 : '',
        referer: searchParams?.get('utm_source') ? (searchParams?.get('utm_source') + ((searchParams?.get('utm_medium') ? (' | ' + searchParams?.get('utm_medium')) : '') + (searchParams?.get('utm_campaign') ? ' | ' + searchParams?.get('utm_campaign') : ''))) : '',
        location: props?.package?.isDomestic ? "Domestic" : props?.location
      }

      await trackMixpanelEvent("Holiday_Inquiry_Popup", null, false, null, payload);

      sendHolidayInquiry(payload).then(res => {
        if (res) {
          props.setOpenInquiryModal(false);
          setIsSubmitting(false);
          window.location.href = `/holidays/thank-you/?id=${res}`;
        } else {
          setHasError(true);
          setIsSubmitting(false);
        }
      });
    } else {
      setHasError(true);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      className="userLoginForms enquiryFormMainWrp"
      show={props.openInquiryModal}
      onHide={() => props.setOpenInquiryModal(false)}
    >
      <Modal.Body>
        <button
          type="button"
          className="btn-close end-0 float-end position-absolute top-0 right-0 mt-3 me-3"
          onClick={() => props.setOpenInquiryModal(false)}
        ></button>
        <div className="row align-items-center m-0">
          <div className="col-sm-12 col-md-6 d-none d-lg-inline inqueryFormTrvBox">
            <div className="inqueryFormTrv text-center py-4 w-75 m-auto">
              <Image
                className="mb-3 h-auto"
                loader={trvLoader}
                src="icon/travnya-white-logo.png"
                alt="Package Icon"
                width={150}
                height={25}
              />
              <h4 className="color-white">Why Travel With Us?</h4>
              <div>
                <Image
                  className="h-auto"
                  loader={trvLoader}
                  src="icon/best-pice-icon.svg"
                  alt="Package Icon"
                  width={50}
                  height={25}
                />
                <p className="fw-bold color-white fs-14 mb-0 mt-2">
                  Best Price
                </p>
                <p className="color-white mb-0 fs-12">
                  A marketplace of suppliers
                </p>
              </div>
              <div className="border-top border-bottom py-4 my-4">
                <Image
                  className="h-auto"
                  loader={trvLoader}
                  src="icon/customization-icon.svg"
                  alt="Package Icon"
                  width={50}
                  height={25}
                />
                <p className="fw-bold color-white fs-14 mb-0 mt-2">
                  Customization
                </p>
                <p className="color-white mb-0 fs-12">
                  Real time, end to end customization
                </p>
              </div>
              <div>
                <Image
                  className="h-auto"
                  loader={trvLoader}
                  src="icon/booking-with-ease-icon.svg"
                  alt="Package Icon"
                  width={50}
                  height={25}
                />
                <p className="fw-bold color-white fs-14 mb-0 mt-2">
                  Booking With Ease
                </p>
                <p className="color-white mb-0 fs-12">
                  Stay In Touch With Our Travel Experts
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 bg-white p-md-4 enquiryFormMainBox">
            <div className="loginForm">
              <h4 className="mb-0 fw-bold color-blue mb-2">
                Plan Your Package With Us!
              </h4>
              {/* <a href={"tel:" + contactNumber} className="d-flex align-items-center bg-grey justify-content-center py-2 my-3">
                <Image
                  className="h-auto me-2"
                  loader={trvLoader}
                  src="icon/phone-icon-orange.png"
                  alt="Package Icon"
                  width={30}
                  height={25}
                />
                <span className="color-orange fw-bold fs-18">{contactNumber}</span>
              </a> */}
              <form>
                {/* <div className="FormGroup mb-2">
                  <label className="mb-1">Full Name</label>
                  <div className="position-relative">
                    <div className="icon position-absolute top-50 bottom-50 m-auto">
                      <Image
                        className="h-auto"
                        loader={trvLoader}
                        src="icon/user-icon-grey.png"
                        alt="user Icon"
                        width={25}
                        height={25}
                      />
                    </div>
                    <input className={(hasError && !name) ? "form-control border-red" : "form-control"} type="text" placeholder="Full Name" value={name} onChange={(e) => {
                      setName(e.target.value);
                    }} />
                  </div>
                </div> */}
                <div className="FormGroup mb-2">
                  <label className="mb-1">Package type</label>
                  <div className="position-relative">
                    <div className="icon position-absolute top-50 bottom-50 m-auto">
                      <Image
                        className="h-auto"
                        loader={trvLoader}
                        src="icon/package-type-icon.svg"
                        alt="Package Icon"
                        width={25}
                        height={25}
                      />
                    </div>
                    <select
                      className="form-select"
                      value={packType}
                      onChange={(e) => setPackType(e.target.value)}
                    >
                      HI
                      <option value="Leisure">Leisure</option>
                      <option value="Honeymoon">Honeymoon</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Wildlife">Wildlife</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Safari">Safari</option>
                      <option value="Beach">Beach</option>
                      <option value="Hill Station">Hill Station</option>
                      <option value="Heritage">Heritage</option>
                      <option value="Pilgrimage">Pilgrimage</option>
                    </select>
                  </div>
                </div>
                <div className="FormGroup mb-2">
                  <label className="mb-1">Package</label>
                  <div className="position-relative">
                    <div className="icon position-absolute top-50 bottom-50 m-auto">
                      <Image
                        className="h-auto"
                        loader={trvLoader}
                        src="icon/Location-icon.svg"
                        alt="locaiton Icon"
                        width={25}
                        height={25}
                      />
                    </div>
                    <input
                      readOnly
                      className="form-control"
                      type="text"
                      value={props.package?.Title}
                      placeholder="Couple's Dream Singapore Sojourn"
                    />
                  </div>
                </div>
                <div className="FormGroup mb-2">
                  <label className="mb-1">Travel Date</label>
                  <div className="position-relative">
                    <div className="icon position-absolute top-50 bottom-50 m-auto">
                      <Image
                        className="h-auto"
                        loader={trvLoader}
                        src="icon/date-grey-icon.svg"
                        alt="Date Icon"
                        width={25}
                        height={25}
                      />
                    </div>
                    {/* <input className="form-control" type="text" placeholder="Tentative Travel Date" /> */}
                    <ReactDatePicker
                      placeholderText="Select Travel Date"
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      selected={travelDate}
                      showMonthSelect
                      showYearSelect
                      showMonthDropdown
                      showYearDropdown
                      onChange={(date) => setTravelDate(date)}
                      minDate={new Date()}
                      dateFormat="dd MMM yyyy"
                      className="form-control w-100"
                    />
                  </div>
                </div>

                <div className="FormGroup mb-2">
                  <label className="mb-1">Email</label>
                  <div className="position-relative">
                    <div className="icon position-absolute top-50 bottom-50 m-auto">
                      <Image
                        className="h-auto"
                        loader={trvLoader}
                        src="icon/email-grey-icon.svg"
                        alt="Email Icon"
                        width={25}
                        height={25}
                      />
                    </div>
                    <input
                      className={
                        (hasError && !email) || isValidEmail == false
                          ? "form-control border-red"
                          : "form-control"
                      }
                      type="text"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        var validRegex =
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (
                          e.target.value.match(validRegex) &&
                          e.target.value.match(validRegex).length > 0
                        )
                          setIsValidEmail(true);
                        else setIsValidEmail(null);
                      }}
                      onBlur={(e) => {
                        if (e.target.value.length > 0) {
                          var validRegex =
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                          setIsValidEmail(
                            (e.target.value.match(validRegex) &&
                              e.target.value.match(validRegex).length > 0) ==
                              true
                          );
                        }
                      }}
                      onFocus={(e) => {
                        if (e.target.value.length > 0) {
                          setIsValidEmail(null);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="FormGroup mb-2">
                  <label className="mb-1">Contact No.</label>
                  <div className="position-relative">
                    <div className="icon pt-2 position-absolute top-50 bottom-50 m-auto">
                      <span className="fs-14">+91</span>
                    </div>
                    <input
                      className={
                        hasError && mobile.length < 10
                          ? "form-control border-red"
                          : "form-control"
                      }
                      type="text"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      onPaste={(e) => e.preventDefault()}
                      maxLength={10}
                      placeholder="Contact Number"
                      value={mobile}
                      onChange={(e) => {
                        var allowedChars = "0123456789";
                        let cVal = e.target.value;
                        if (
                          allowedChars.indexOf(
                            e.target.value.substring(e.target.value.length - 1)
                          ) == -1
                        ) {
                          cVal = cVal.substring(0, cVal.length - 1);
                        }
                        setMobile(cVal);
                      }}
                    />
                  </div>
                </div>

                <div className="FormGroup mb-2">
                  <button
                    type="button"
                    className="enquireBtn rounded-3 border-0 color-white w-100 mt-2"
                    disabled={isSubmitting}
                    onClick={() => submitInquiry()}
                  >
                    {isSubmitting ? (
                      <div className="spinner-border" role="status"></div>
                    ) : (
                      <span>Enquire</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
