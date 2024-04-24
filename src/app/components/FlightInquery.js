"use client"

export default function FlightInqueryForm() {

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6 d-none d-md-inline-block"></div>
                <div className="col-12 col-md-6">
                    <div className="shadow p-4 my-2">
                        <h4 class="mb-0 fw-bold color-blue mb-2 text-center">Excellent Choice!</h4>
                        <p className="text-center fs-14">Please share the details so we can get back to you.</p>
                        <form>
                            <div className="d-flex">
                                <div className="">
                                    <button className="bg-white border fs-14 py-1 px-3 rounded-pill">Oneway</button>
                                </div>
                                <div className="">
                                    <button className="ms-2 bg-orange border-orange color-white border fs-14 py-1 px-3 rounded-pill">RoundTrip</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-6 my-2">From</div>
                                <div className="col-12 col-lg-6 my-2">To</div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-6 my-2">Departure Date</div>
                                <div className="col-12 col-lg-6 my-2">Return Date</div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-6 my-2">Email</div>
                                <div className="col-12 col-lg-6 my-2">Phone</div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button className="w-100 bg-orange color-white border-0 py-2 rounded-2 fs-14">ENQUIRY NOW</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

