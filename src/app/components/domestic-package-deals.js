import InternationalTourPackages from "./International-Tour-Packages";
import DomesticTourPackages from "./Domestic-Tour-Packages";


export default function DomesticPackageDeals() {

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="subHeading">
                            <h2 className="mb-0 fw-normal">Top Holiday <strong className="color-blue">Packages</strong></h2>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <ul className="nav nav-pills mb-3 DealsTabs justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link color-black bg-white rounded-0 active" id="package1-tab" data-bs-toggle="pill" data-bs-target="#package1" type="button" role="tab" aria-controls="package1" aria-selected="true">Domestic</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link color-black bg-white rounded-0" id="package2-tab" data-bs-toggle="pill" data-bs-target="#package2" type="button" role="tab" aria-controls="package2" aria-selected="false">International</button>
                        </li>
                    </ul>
                    <div className="tab-content bg-grey py-4 px-2 position-relative" id="pills-tabContent">
                        <div className="px-3 tab-pane fade show active" id="package1" role="tabpanel" aria-labelledby="package1-tab">
                            <DomesticTourPackages />
                        </div>
                        <div className="px-3 tab-pane fade" id="package2" role="package2" aria-labelledby="package2-tab">
                            <InternationalTourPackages />
                        </div>
                    </div> */}
                    <div className="tab-content bg-grey py-4 px-2 position-relative" id="pills-tabContent">
                            <InternationalTourPackages />
                        </div>
                </div>
            </div>
        </section>
    )
}