import { usePathname } from "next/navigation";
import { trvLoader } from "../helpers/imageKitLoader";
import Image from "next/image";
import { useEffect,useState } from "react";
import { getDestinationAndPackages } from "../services/holidayService";

export default function MainMenu() {
    const pathname = usePathname();
    const [packagesMenu, setpackagesMenu] = useState([]);

    useEffect(() => {
        getDestinationAndPackages({ TenantId: 7, IsDomestic: false }).then(res => {
            if (res && res.length > 0)
                setpackagesMenu(res);

        });
    }, []);
    

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-1">
                <a className={pathname == '/deals' ? "nav-link active" : 'nav-link'} href="/deals">Offers</a>
            </li>
            <li className="nav-item mx-1">
                <a className={pathname == '/cheap-flights' ? "nav-link active" : 'nav-link'} href="/cheap-flights">Flights</a>
            </li>
            <li className="nav-item mx-1 dropdown">
                <a className="nav-link dropdown-toggle" href="/holidays" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Holiday</a>
                <ul className="dropdown-menu rounded-0 border-0" aria-labelledby="navbarDropdown">
                    <li>
                        <div className="row m-0 px-2">
                            <div className="col-md-12 col-lg-6 py-2">
                                <div className="row">
                                    <div className="col-12">
                                        <a href="/india-tour-packages/" className="title d-flex text-decoration-none">
                                            <Image
                                                className="h-auto"
                                                loader={trvLoader}
                                                src="icon/international-menu-icon.svg"
                                                alt="umbrella icon"
                                                width={20}
                                                height={20}
                                            />
                                            <span className="fw-bold ps-2">Holiday Packages</span>
                                        </a>
                                    </div>
                                    <div className="col-12 pt-2">
                                        <div className="row">
                                            {
                                                packagesMenu.length > 0 && packagesMenu.map((obj, index)=>(
                                                    <div key={index} className="col-12 col-sm-12 col-lg-6 py-1">
                                                    <a className="text-decoration-none d-flex align-items-center" href={`/holidays/${obj.slug}-tour-packages/`}>
                                                        <Image
                                                            className="h-auto me-2"
                                                            loader={trvLoader}
                                                            src="icon/umbrella-beach.png"
                                                            alt="umbrella icon"
                                                            width={15}
                                                            height={20}
                                                        />
                                                        <span>{obj.name +" " +"Tour Package"} </span>
                                                    </a>
                                                </div>
                                             
                                                ))
                                            }
                                           
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-12 col-lg-6 py-2">
                                <div className="row">
                                    <div className="col-12">
                                        <a href="/international-tour-packages/" className="title d-flex text-decoration-none">
                                            <Image
                                                className="h-auto"
                                                loader={trvLoader}
                                                src="icon/international-menu-icon.svg"
                                                alt="umbrella icon"
                                                width={20}
                                                height={20}
                                            />
                                            <span className="fw-bold ps-2">International Package</span>
                                        </a>
                                    </div>
                                    <div className="col-12 pt-2">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/bhutan-tour-packages/">
                                                    <Image
                                                        className="h-auto me-2"
                                                        loader={trvLoader}
                                                        src="icon/umbrella-beach.png"
                                                        alt="umbrella icon"
                                                        width={15}
                                                        height={20}
                                                    />
                                                    <span>Bhutan Tour Package</span>
                                                </a>
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/nepal-tour-packages/">
                                                    <Image
                                                        className="h-auto me-2"
                                                        loader={trvLoader}
                                                        src="icon/umbrella-beach.png"
                                                        alt="umbrella icon"
                                                        width={15}
                                                        height={20}
                                                    />
                                                    <span>Nepal Tour Package</span>
                                                </a>
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/dubai-tour-packages/">
                                                    <Image
                                                        className="h-auto me-2"
                                                        loader={trvLoader}
                                                        src="icon/umbrella-beach.png"
                                                        alt="umbrella icon"
                                                        width={15}
                                                        height={20}
                                                    />
                                                    <span>Dubai Tour Package</span>
                                                </a>
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/baku-tour-packages/">
                                                    <Image
                                                        className="h-auto me-2"
                                                        loader={trvLoader}
                                                        src="icon/umbrella-beach.png"
                                                        alt="umbrella icon"
                                                        width={15}
                                                        height={20}
                                                    />
                                                    <span>Baku Tour Package</span>
                                                </a>
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/singapore-tour-packages/">
                                                    <Image
                                                        className="h-auto me-2"
                                                        loader={trvLoader}
                                                        src="icon/umbrella-beach.png"
                                                        alt="umbrella icon"
                                                        width={15}
                                                        height={20}
                                                    />
                                                    <span>Singapore Tour Package</span>
                                                </a>
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/malaysia-tour-packages/">
                                                    <Image
                                                        className="h-auto me-2"
                                                        loader={trvLoader}
                                                        src="icon/umbrella-beach.png"
                                                        alt="umbrella icon"
                                                        width={15}
                                                        height={20}
                                                    />
                                                    <span>Malaysia Tour Package</span>
                                                </a>
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/maldives-tour-packages/">
                                                    <Image
                                                        className="h-auto me-2"
                                                        loader={trvLoader}
                                                        src="icon/umbrella-beach.png"
                                                        alt="umbrella icon"
                                                        width={15}
                                                        height={20}
                                                    />
                                                    <span>Maldives Tour Package</span>
                                                </a>
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/thailand-tour-packages/">
                                                    <Image
                                                        className="h-auto me-2"
                                                        loader={trvLoader}
                                                        src="icon/umbrella-beach.png"
                                                        alt="umbrella icon"
                                                        width={15}
                                                        height={20}
                                                    />
                                                    <span>Thailand Tour Package</span>
                                                </a>
                                            </div>
                                            <div className="col-12 d-lg-none">
                                                <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                    <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/mauritius-tour-packages/">
                                                        <Image
                                                            className="h-auto me-2"
                                                            loader={trvLoader}
                                                            src="icon/umbrella-beach.png"
                                                            alt="umbrella icon"
                                                            width={15}
                                                            height={20}
                                                        />
                                                        <span>Mauritius Tour Package</span>
                                                    </a>
                                                </div>
                                                <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                    <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/sri-lanka-tour-packages/">
                                                        <Image
                                                            className="h-auto me-2"
                                                            loader={trvLoader}
                                                            src="icon/umbrella-beach.png"
                                                            alt="umbrella icon"
                                                            width={15}
                                                            height={20}
                                                        />
                                                        <span>Sri Lanka Tour Package</span>
                                                    </a>
                                                </div>
                                                <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                    <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/bali-tour-packages/">
                                                        <Image
                                                            className="h-auto me-2"
                                                            loader={trvLoader}
                                                            src="icon/umbrella-beach.png"
                                                            alt="umbrella icon"
                                                            width={15}
                                                            height={20}
                                                        />
                                                        <span>Bali Tour Package</span>
                                                    </a>
                                                </div>
                                                <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                    <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/vietnam-tour-packages/">
                                                        <Image
                                                            className="h-auto me-2"
                                                            loader={trvLoader}
                                                            src="icon/umbrella-beach.png"
                                                            alt="umbrella icon"
                                                            width={15}
                                                            height={20}
                                                        />
                                                        <span>Vietnam Tour Package</span>
                                                    </a>
                                                </div>
                                                <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                    <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/turkey-tour-packages/">
                                                        <Image
                                                            className="h-auto me-2"
                                                            loader={trvLoader}
                                                            src="icon/umbrella-beach.png"
                                                            alt="umbrella icon"
                                                            width={15}
                                                            height={20}
                                                        />
                                                        <span>Turkey Tour Package</span>
                                                    </a>
                                                </div>
                                                <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                    <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/georgia-tour-packages/">
                                                        <Image
                                                            className="h-auto me-2"
                                                            loader={trvLoader}
                                                            src="icon/umbrella-beach.png"
                                                            alt="umbrella icon"
                                                            width={15}
                                                            height={20}
                                                        />
                                                        <span>Georgia Tour Package</span>
                                                    </a>
                                                </div>
                                                <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                    <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/europe-tour-packages/">
                                                        <Image
                                                            className="h-auto me-2"
                                                            loader={trvLoader}
                                                            src="icon/umbrella-beach.png"
                                                            alt="umbrella icon"
                                                            width={15}
                                                            height={20}
                                                        />
                                                        <span>Europe Tour Package</span>
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="col-12 d-none d-lg-block">
                                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                                    <div className="accordion-item">
                                                        <div id="flush-International-Package" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                            <div className="accordion-body p-0">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                                        <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/mauritius-tour-packages/">
                                                                            <Image
                                                                                className="h-auto me-2"
                                                                                loader={trvLoader}
                                                                                src="icon/umbrella-beach.png"
                                                                                alt="umbrella icon"
                                                                                width={15}
                                                                                height={20}
                                                                            />
                                                                            <span>Mauritius Tour Package</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                                        <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/sri-lanka-tour-packages/">
                                                                            <Image
                                                                                className="h-auto me-2"
                                                                                loader={trvLoader}
                                                                                src="icon/umbrella-beach.png"
                                                                                alt="umbrella icon"
                                                                                width={15}
                                                                                height={20}
                                                                            />
                                                                            <span>Sri Lanka Tour Package</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                                        <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/bali-tour-packages/">
                                                                            <Image
                                                                                className="h-auto me-2"
                                                                                loader={trvLoader}
                                                                                src="icon/umbrella-beach.png"
                                                                                alt="umbrella icon"
                                                                                width={15}
                                                                                height={20}
                                                                            />
                                                                            <span>Bali Tour Package</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                                        <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/vietnam-tour-packages/">
                                                                            <Image
                                                                                className="h-auto me-2"
                                                                                loader={trvLoader}
                                                                                src="icon/umbrella-beach.png"
                                                                                alt="umbrella icon"
                                                                                width={15}
                                                                                height={20}
                                                                            />
                                                                            <span>Vietnam Tour Package</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                                        <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/turkey-tour-packages/">
                                                                            <Image
                                                                                className="h-auto me-2"
                                                                                loader={trvLoader}
                                                                                src="icon/umbrella-beach.png"
                                                                                alt="umbrella icon"
                                                                                width={15}
                                                                                height={20}
                                                                            />
                                                                            <span>Turkey Tour Package</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                                        <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/georgia-tour-packages/">
                                                                            <Image
                                                                                className="h-auto me-2"
                                                                                loader={trvLoader}
                                                                                src="icon/umbrella-beach.png"
                                                                                alt="umbrella icon"
                                                                                width={15}
                                                                                height={20}
                                                                            />
                                                                            <span>Georgia Tour Package</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="col-12 col-sm-12 col-lg-6 py-1">
                                                                        <a className="text-decoration-none d-flex align-items-center" href="/international-tour-packages/europe-tour-packages/">
                                                                            <Image
                                                                                className="h-auto me-2"
                                                                                loader={trvLoader}
                                                                                src="icon/umbrella-beach.png"
                                                                                alt="umbrella icon"
                                                                                width={15}
                                                                                height={20}
                                                                            />
                                                                            <span>Europe Tour Package</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 d-none d-lg-block">
                                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="flush-headingOne">
                                                            <button className="accordion-button collapsed p-0 w-auto bg-white pt-2" type="button" data-bs-toggle="collapse" data-bs-target="#flush-International-Package" aria-expanded="false" aria-controls="flush-International-Package">
                                                                <span className="fs-14 color-orange text-decoration-underline">
                                                                    <div className="readMorebtn">Read More</div>
                                                                    <div className="showLessbtn">Show Less</div>
                                                                </span>
                                                            </button>
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    )
}