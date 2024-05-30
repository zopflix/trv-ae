import { useState } from "react";
import ReactSlider from "react-slider";
import { aedNumberFormat } from "../helpers/common";

export default function SideFilters(props) {
    // PASSENGERS DYNAMIC KARO
    const totalPassengers = 1;
    const priceFilterRange = [Math.min(...props.holidayPackages.map(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2))), Math.max(...props.holidayPackages.map(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2)))];
    const allCities = Array.from(new Set(props.holidayPackages.flatMap(pkg => pkg.Cities || [])));
    const allRecFor = Array.from(new Set(props.holidayPackages.flatMap(pkg => pkg.Recommendations || [])));
    const allDurations = Array.from(new Set(props.holidayPackages.flatMap(pkg => pkg.Duration || [])));

    const [priceFilterValues, setPriceFilterValues] = useState([Math.min(...props.holidayPackages.map(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2))), Math.max(...props.holidayPackages.map(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2)))]);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedRecommendations, setSelectedRecommendations] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);

    const clearFilters = () => {
        props.setIsContentLoading(true);
        setPriceFilterValues([Math.min(...props.holidayPackages.map(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2))), Math.max(...props.holidayPackages.map(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2)))])
        setSelectedDurations([]);
        setSelectedRecommendations([]);
        setSelectedCities([]);
        setTimeout(() => {
            props.setFilteredPackages(props.holidayPackages);
            props.setIsContentLoading(false);
        }, 500);

    }

    const applyFilters = (filterType, value) => {
        let filteredPkgs = props.holidayPackages;
        let durs = [];
        let recoms = [];
        let cities = [];

        props.setIsContentLoading(true);
        switch (filterType) {
            case 'price':
                if (selectedDurations.length > 0) {
                    let durData = [];
                    selectedDurations.forEach(dur => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Duration == dur);
                        durData.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(durData));
                }

                if (selectedRecommendations.length > 0) {
                    let recdata = [];
                    selectedRecommendations.forEach(rec => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Recommendations.includes(rec));
                        recdata.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(recdata));
                }

                if (selectedCities.length > 0) {
                    let cityData = [];
                    selectedCities.forEach(rec => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Cities?.includes(rec));
                        cityData.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(cityData));
                }
                filteredPkgs = filteredPkgs.filter(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2) >= value[0] && ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2) <= value[1]);
                break;

            case 'duration':
                if (selectedDurations.indexOf(parseInt(value)) > -1) {
                    durs = selectedDurations.filter(x => x != value);
                    setSelectedDurations(durs);
                }
                else {
                    durs = selectedDurations;
                    durs.push(parseInt(value));
                    setSelectedDurations(durs);
                }

                filteredPkgs = filteredPkgs.filter(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2) >= priceFilterValues[0] && ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2) <= priceFilterValues[1]);

                if (selectedRecommendations.length > 0) {
                    let recdata = [];
                    selectedRecommendations.forEach(rec => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Recommendations.includes(rec));
                        recdata.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(recdata));
                }

                if (selectedCities.length > 0) {
                    let cityData = [];
                    selectedCities.forEach(rec => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Cities?.includes(rec));
                        cityData.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(cityData));
                }

                if (durs.length > 0) {
                    let data = [];
                    durs.forEach(dur => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Duration == dur);
                        data.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(data));
                }
                else {
                    filteredPkgs = props.holidayPackages;
                }
                break;

            case 'recommendedFor':
                if (selectedRecommendations.indexOf(value) > -1) {
                    recoms = selectedRecommendations.filter(x => x != value);
                    setSelectedRecommendations(recoms);
                }
                else {
                    recoms = selectedRecommendations;
                    recoms.push(value);
                    setSelectedRecommendations(recoms);
                }

                filteredPkgs = filteredPkgs.filter(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2) >= priceFilterValues[0] && ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2) <= priceFilterValues[1]);

                if (selectedDurations.length > 0) {
                    let durData = [];
                    selectedDurations.forEach(dur => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Duration == dur);
                        durData.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(durData));
                }

                if (selectedCities.length > 0) {
                    let cityData = [];
                    selectedCities.forEach(rec => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Cities?.includes(rec));
                        cityData.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(cityData));
                }

                if (recoms.length > 0) {
                    let data = [];
                    recoms.forEach(rec => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Recommendations.includes(rec));
                        data.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(data));
                }
                else {
                    filteredPkgs = props.holidayPackages;
                }
                break;

            case 'city':
                if (selectedCities.indexOf(value) > -1) {
                    cities = selectedCities.filter(x => x != value);
                    setSelectedCities(cities);
                }
                else {
                    cities = selectedCities;
                    cities.push(value);
                    setSelectedCities(cities);
                }

                filteredPkgs = filteredPkgs.filter(holiday => ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2) >= priceFilterValues[0] && ((holiday.StandardPrice ? holiday.StandardPrice : (holiday.DeluxePrice ? holiday.DeluxePrice : holiday.PremiumPrice)) / totalPassengers).toFixed(2) <= priceFilterValues[1]);

                if (selectedDurations.length > 0) {
                    let durData = [];
                    selectedDurations.forEach(dur => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Duration == dur);
                        durData.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(durData));
                }

                if (selectedRecommendations.length > 0) {
                    let recdata = [];
                    selectedRecommendations.forEach(rec => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Recommendations.includes(rec));
                        recdata.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(recdata));
                }

                if (cities.length > 0) {
                    let data = [];
                    cities.forEach(rec => {
                        let fpkg = filteredPkgs.filter(holiday => holiday.Cities?.includes(rec));
                        data.push(...fpkg);
                    });
                    filteredPkgs = Array.from(new Set(data));
                }
                else {
                    filteredPkgs = props.holidayPackages;
                }
                break;

            default:
                break;
        }
        setTimeout(() => {
            props.setFilteredPackages(filteredPkgs);
            props.setIsContentLoading(false);
        }, 500);
    }

    return (

        <div className="SideFilter">
            <div className="SideFilterTitle">
                <div className="d-flex justify-content-between bg-blue p-3 rounded-top-3">
                    <div>
                        <p className="mb-0 color-white fw-bold fs-18">Filters</p>
                    </div>
                    <div>
                        <button className="bg-transparent color-white border-0 p-0 fs-14" onClick={() => clearFilters()}>Reset</button>
                    </div>
                </div>
                <div className="bg-white px-3 py-2">
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        {/* <div className="accordion-item py-3">
                            <h2 className="accordion-header" id="panelsStayOpen-filter">
                                <button className="accordion-button bg-white p-0" type="button" data-bs-toggle="collapse" data-bs-target="#filterTab" aria-expanded="true" aria-controls="filterTab">
                                    <span className="fw-bold">Flights</span>
                                </button>
                            </h2>
                            <div id="filterTab" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-filter">
                                <div className="accordion-body pb-0 border-0 px-0">
                                    <div className="d-lg-flex">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label fs-14" htmlFor="flexRadioDefault1">With Flight</label>
                                        </div>
                                        <div className="form-check ps-5">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                            <label className="form-check-label fs-14" htmlFor="flexRadioDefault2">Without Flight</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {props.holidayPackages.length > 1 &&
                            <div className="accordion-item py-3">
                                <h2 className="accordion-header" id="panelsStayOpen-budget">
                                    <button className="accordion-button bg-white p-0" type="button" data-bs-toggle="collapse" data-bs-target="#budgetTab" aria-expanded="true" aria-controls="budgetTab">
                                        <span className="fw-bold">Price Filter</span>
                                    </button>
                                </h2>
                                <div id="budgetTab" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-budget">
                                    <div className="accordion-body pb-0 border-0 px-0">
                                        {/* <span className="fs-14 fw-bold">Price Filter</span> */}
                                        <div className='price-slider pt-3'>
                                            <ReactSlider
                                                className="horizontal-slider"
                                                thumbClassName="example-thumb"
                                                trackClassName="example-track"
                                                min={priceFilterRange[0]}
                                                max={priceFilterRange[1]}
                                                value={priceFilterValues}
                                                minDistance={1}
                                                step={1}
                                                onChange={(e) => {
                                                    setPriceFilterValues(e);
                                                }}
                                                onAfterChange={(e) => {
                                                    applyFilters('price', e);
                                                }}
                                            />
                                            <div className='row mt-3'>
                                                <div className='col-6'>
                                                    <h6 className='mb-0 d-table'> {aedNumberFormat(Math.round(priceFilterValues[0])).split('.')[0]}</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className='mb-0 d-table float-end'> {aedNumberFormat(Math.round(priceFilterValues[1])).split('.')[0]}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {allDurations.length > 0 &&
                            <div className="accordion-item py-3">
                                <h2 className="accordion-header" id="panelsStayOpen-duration">
                                    <button className="accordion-button bg-white p-0" type="button" data-bs-toggle="collapse" data-bs-target="#durationTab" aria-expanded="true" aria-controls="durationTab">
                                        <span className="fw-bold">Package Duration</span>
                                    </button>
                                </h2>
                                <div id="durationTab" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-duration">
                                    <div className="accordion-body pb-0 border-0 px-0">
                                        {allDurations?.map((dur, ix) => {
                                            return <div key={ix} className="form-check fs-14" onClick={() => { applyFilters("duration", dur); }}>
                                                <input className="form-check-input" type="checkbox" value={dur} id={"durationCheck" + ix} readOnly checked={selectedDurations.indexOf(dur) > -1} />
                                                <label className="form-check-label" htmlFor={"durationCheck" + ix}>
                                                    {props.durations.find(x => x.Id == dur)?.Value}
                                                </label>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        }

                        {/* <div className="accordion-item py-3">
                            <h2 className="accordion-header" id="panelsStayOpen-hotelRating">
                                <button className="accordion-button bg-white p-0" type="button" data-bs-toggle="collapse" data-bs-target="#hotelRatingTab" aria-expanded="true" aria-controls="hotelRatingTab">
                                    <span className="fw-bold">Hotel Rating</span>
                                </button>
                            </h2>
                            <div id="hotelRatingTab" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-hotelRating">
                                <div className="accordion-body pb-0 border-0 px-0">
                                    Hotel Rating
                                </div>
                            </div>
                        </div> */}

                        {allRecFor.length > 0 &&
                            <div className="accordion-item py-3">
                                <h2 className="accordion-header" id="panelsStayOpen-recommended">
                                    <button className="accordion-button bg-white p-0" type="button" data-bs-toggle="collapse" data-bs-target="#recommendedTab" aria-expanded="true" aria-controls="recommendedTab">
                                        <span className="fw-bold">Recommended for</span>
                                    </button>
                                </h2>
                                <div id="recommendedTab" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-recommended">
                                    <div className="accordion-body pb-0 border-0 px-0">
                                        {allRecFor?.map((rec, ix) => {
                                            return <div key={ix} className="form-check fs-14" onClick={() => { applyFilters("recommendedFor", rec); }}>
                                                <input className="form-check-input" type="checkbox" value={rec} id={"recCheck" + ix} readOnly checked={selectedRecommendations.indexOf(rec) > -1} />
                                                <label className="form-check-label" htmlFor={"recCheck" + ix}>
                                                    {rec}
                                                </label>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        }

                        {/* <div className="accordion-item py-3">
                            <h2 className="accordion-header" id="panelsStayOpen-country">
                                <button className="accordion-button bg-white p-0" type="button" data-bs-toggle="collapse" data-bs-target="#countryTab" aria-expanded="true" aria-controls="countryTab">
                                    <span className="fw-bold">Country</span>
                                </button>
                            </h2>
                            <div id="countryTab" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-country">
                                <div className="accordion-body pb-0 border-0 px-0">
                                    Country
                                </div>
                            </div>
                        </div> */}

                        {allCities.length > 0 &&
                            <div className="accordion-item py-3">
                                <h2 className="accordion-header" id="panelsStayOpen-city">
                                    <button className="accordion-button bg-white p-0" type="button" data-bs-toggle="collapse" data-bs-target="#cityTab" aria-expanded="true" aria-controls="cityTab">
                                        <span className="fw-bold">Cities</span>
                                    </button>
                                </h2>
                                <div id="cityTab" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-city">
                                    <div className="accordion-body pb-0 border-0 px-0">
                                        {allCities?.map((city, ix) => {
                                            return <div key={ix} className="form-check fs-14" onClick={() => { applyFilters("city", city); }}>
                                                <input className="form-check-input" type="checkbox" value={city} id={"citiesCheck" + ix} readOnly checked={selectedCities.indexOf(city) > -1} />
                                                <label className="form-check-label" htmlFor={"citiesCheck" + ix}>
                                                    {city}
                                                </label>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}