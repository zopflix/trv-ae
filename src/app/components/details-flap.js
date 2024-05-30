import { useEffect, useState } from "react";
import { encodeData, getDiffFromMinutes, getFormattedDate, getFormattedDate5, getFormattedTime, aedNumberFormat } from "../helpers/common";
import { getFareRules } from "../services/flightService";
import { airlineLogoLoader, trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";

export default function DetailsFlap(props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [fareRules, setFareRules] = useState('');
  const [flights, setFlights] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const getRulesByFlight = (res) => {

    if (!res) {
      return;
    }

    let rules = [];
    res.forEach(element => {
      let currRule = rules.find(x => x.fareBasisCode == element.fareBasisCode);
      if (currRule)
        element.fareRuleDetail = currRule.fareRuleDetail;
      rules.push(element);
    });
    return rules;
  }

  useEffect(() => {
    setSelectedTab(props.selectedTabIndex);

    if (props.selectedFlight)
      setFlights(props.selectedFlight.trips[0].listOfFlight);
    if (props.selectedRtnFlight) {
      let fl = [...(props.selectedFlight.trips[0].listOfFlight)];
      fl.push(...props.selectedRtnFlight.trips[0].listOfFlight);
      setFlights(fl);
    }

    getFareRules({ traceId: props.selectedFlight.traceId, resultIndex: props.selectedFlight.resultIndex }).then(res => {
      let rules = getRulesByFlight(res?.response?.fareRules);
      setFareRules(rules);
      if (props.selectedRtnFlight) {
        getFareRules({ traceId: props.selectedRtnFlight.traceId, resultIndex: props.selectedRtnFlight.resultIndex }).then(resss => {
          let rtnRules = getRulesByFlight(resss?.response?.fareRules);
          rules?.push(...rtnRules);
          setFareRules(rules);
        })
      }
    })
  }, [props]);

  return (
    <div className="offcanvas-body">
      <ul className="nav nav-pills mb-4" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className={selectedTab == 0 ? "nav-link active" : "nav-link"} id="departureFlight-tab" data-bs-toggle="pill" data-bs-target="#departureFlight" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => setSelectedTab(0)}>{props.selectedFlight.trips[0].listOfFlight[0].fromCode}-{props.selectedFlight.trips[0].listOfFlight[props.selectedFlight.trips[0].listOfFlight.length - 1].toCode}</button>
        </li>
        {
          props.selectedRtnFlight &&
          <li className="nav-item" role="presentation">
            <button className={selectedTab == 1 ? "nav-link active" : "nav-link"} id="returnFlight-tab" data-bs-toggle="pill" data-bs-target="#rtnFlight" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => setSelectedTab(1)}>{props.selectedRtnFlight.trips[0].listOfFlight[0].fromCode}-{props.selectedRtnFlight.trips[0].listOfFlight[props.selectedRtnFlight.trips[0].listOfFlight.length - 1].toCode}</button>
          </li>
        }
        <li className="nav-item" role="presentation">
          <button className={selectedTab == 2 ? "nav-link active" : "nav-link"} id="fare-rules-tab" data-bs-toggle="pill" data-bs-target="#fare-rules" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => setSelectedTab(2)}>Fare Rules</button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className={selectedTab == 0 ? "tab-pane fade show active" : "tab-pane fade"} id="departureFlight" role="tabpanel" aria-labelledby="departureFlight-tab">
          <div className='flap-flight-details'>
            <h4 className='text-start'>{getFormattedTime(props.selectedFlight.trips[0].listOfFlight[0].departureTime)} - {getFormattedTime(props.selectedFlight.trips[0].listOfFlight[props.selectedFlight.trips[0].listOfFlight.length - 1].arrivalTime)} ({props.selectedFlight.trips[0].listOfFlight.length == 1 ? "Non-Stop" : (props.selectedFlight.trips[0].listOfFlight.length - 1 + (props.selectedFlight.trips[0].listOfFlight.length == 2 ? " Stop" : " Stops"))})<span className="orange-text">{props.selectedFlight.departDays > 0 ? "+" + props.selectedFlight.departDays : ""}</span></h4>
            {props.selectedFlight.returnDays > 0 && <h5 className='text-start'>Arrives {getFormattedDate5(props.selectedFlight.trips[0].listOfFlight[props.selectedFlight.trips[0].listOfFlight.length - 1].arrivalAt)}</h5>}
            <div className="w-100 d-inline-block operatedby"></div>
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
                        <span className="ob float-start w-100 text-start color-orange mb-2">Operated By: {fl.operatedBy}</span>
                      }
                      <div className="col-3 text-start pe-0">
                        <h6 className='fw-bold mb-0'>{getFormattedTime(fl.departureTime)}</h6>
                        <span className="mb-0">{fl?.fromAirportName} ({fl.fromCode})</span>
                      </div>
                      <div className="col-6">
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
                            <span className="airline-code d-flex pt-1 justify-content-center">{fl?.marketingCarrier}-{fl?.flightNumber} | Boeing {fl?.equipmentType} </span>
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
                      <div className="col-3 ps-0">
                        <h6 className='fw-bold mb-0'>{getFormattedTime(fl.arrivalTime)}</h6>
                        <span className="mb-0">{fl?.toAirportName} ({fl.toCode})</span>
                        {
                          (fl.departeddate != fl?.arrivalAt) &&
                          <div className="flight-time-alrt">
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
        {
          props.selectedRtnFlight &&
          <div className={selectedTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="rtnFlight" role="tabpanel" aria-labelledby="returnFlight-tab">
            <div className='flap-flight-details'>
              <h4 className='text-start'>{getFormattedTime(props.selectedRtnFlight.trips[0].listOfFlight[0].departureTime)} - {getFormattedTime(props.selectedRtnFlight.trips[0].listOfFlight[props.selectedRtnFlight.trips[0].listOfFlight.length - 1].arrivalTime)} ({props.selectedRtnFlight.trips[0].listOfFlight.length == 1 ? "Non-Stop" : (props.selectedRtnFlight.trips[0].listOfFlight.length - 1 + (props.selectedRtnFlight.trips[0].listOfFlight.length == 2 ? " Stop" : " Stops"))})<span className="orange-text">{props.selectedRtnFlight.departDays > 0 ? "+" + props.selectedRtnFlight.departDays : ""}</span></h4>
              {props.selectedRtnFlight.returnDays > 0 && <h5 className='text-start'>Arrives {getFormattedDate5(props.selectedRtnFlight.trips[0].listOfFlight[props.selectedRtnFlight.trips[0].listOfFlight.length - 1].arrivalAt)}</h5>}
              <div className="w-100 d-inline-block operatedby"></div>
              {
                props.selectedRtnFlight.trips[0].listOfFlight.map((fl, ix) => {
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
                          <span className="ob float-start w-100 text-start color-orange mb-2">Operated By: {fl.operatedBy}</span>
                        }
                        <div className="col-3 text-start pe-0">
                          <h6 className='fw-bold mb-0'>{getFormattedTime(fl.departureTime)}</h6>
                          <span className="mb-0">{fl?.fromAirportName} ({fl.fromCode})</span>
                        </div>
                        <div className="col-6">
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
                              <span className="airline-code d-flex pt-1 justify-content-center">{fl?.marketingCarrier}-{fl?.flightNumber} | Boeing {fl?.equipmentType} </span>
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
                        <div className="col-3 ps-0">
                          <h6 className='fw-bold mb-0'>{getFormattedTime(fl.arrivalTime)}</h6>
                          <span className="mb-0">{fl?.toAirportName} ({fl.toCode})</span>
                          {
                            (fl.departeddate != fl?.arrivalAt) &&
                            <div className="flight-time-alrt">
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
        <div id="fare-rules-tab" className={selectedTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} role="tabpanel" aria-labelledby="fare-rules-tab">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {(fareRules?.length > 0 && fareRules?.length == flights.length) &&
              fareRules.map((rule, ix) => {
                return <li className="nav-item" role="presentation" key={ix}>
                  <button className={ix == 0 ? "nav-link active" : "nav-link"} id={`fare-rule-tab${ix}`} data-bs-toggle="tab" data-bs-target={`#fare-rule${ix}`} type="button" role="tab" aria-controls={`fare-rule${ix}`} aria-selected="true">{flights[ix].fromCode} to {flights[ix].toCode}</button>
                </li>
              })}
          </ul>
          <div className="tab-content" id="fareRuleContent">
            {(fareRules?.length > 0 && fareRules?.length == flights.length) &&
              fareRules.map((rule, ix) => {
                return <div className={ix == 0 ? "tab-pane fade show active" : "tab-pane fade"} id={`fare-rule${ix}`} role="tabpanel" aria-labelledby={`fare-rule-tab${ix}`} key={ix}>
                  <div dangerouslySetInnerHTML={{ __html: rule.fareRuleDetail }} />
                </div>
              })}
          </div>
        </div>
      </div>

      <div className='position-absolute flap-total-price'>
        <div className='row align-items-center ms-0 me-0'>
          <div className='col-6 text-start'>
            <h2 className='mb-0'>{(aedNumberFormat(
              Number(props.selectedFlight.avgPrice)
              + Number(props?.superSaverService?.price
                ? (props?.sssPassangers * props?.superSaverService?.price)
                : 0)
              + (props.selectedRtnFlight
                ? (Number(props.selectedRtnFlight.avgPrice)
                  + Number(props?.superSaverService?.price
                    ? (props?.sssPassangers * props?.superSaverService?.price)
                    : 0))
                : 0)
            )).split(".")[0]}</h2>
            <p className='mb-0'>Price per Traveler</p>
            <p className='mb-0'>for {props.selectedFlight.trips[0].listOfFlight[0].fromCode} to {props.selectedFlight.trips[0].listOfFlight[props.selectedFlight.trips[0].listOfFlight.length - 1].toCode} {props.selectedRtnFlight && 'and ' + props.selectedRtnFlight.trips[0].listOfFlight[0].fromCode + ' to ' + props.selectedRtnFlight.trips[0].listOfFlight[props.selectedRtnFlight.trips[0].listOfFlight.length - 1].toCode}</p>

          </div>
          <div className='col-6 text-end'>
            {
              props.showContinueBtn
                ? <button className="buttonStyle3 border fs-14 next listing-cont-btn" onClick={() => {
                  setShowSpinner(true);
                  localStorage.setItem("departFlight", JSON.stringify(props.selectedFlight));
                  if (props.selectedRtnFlight)
                    localStorage.setItem("returnFlight", JSON.stringify(props.selectedRtnFlight));
                  const parm = new URLSearchParams(window.location.search);
                  let parms = "?amt=" + (props.selectedFlight.totalPrice + (props.selectedRtnFlight ? props.selectedRtnFlight.totalPrice : 0));
                  let encodedParams = encodeData(parms);
                  localStorage.setItem("currentSearchId", parm.get("s"));
                  //window.location.href = "/book-flight/?token=" + encodedParams.replace('+', '-');
                  setTimeout(() => {
                    setShowSpinner(false);
                    window.location.href = "/book-flight/?token=" + encodedParams.replace('+', '-');
                  }, 1000)
                }}>
                  {!showSpinner &&
                    <span>Continue</span>
                  }
                  {
                    showSpinner &&
                    <span className="spinner-border text-white" role="status"></span>
                  }
                </button>
                : <button className="buttonStyle3 border fs-14 next listing-cont-btn" data-bs-dismiss="offcanvas" aria-label="Close"><span>Back to Flight Results</span>
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}