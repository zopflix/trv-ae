import Image from "next/image";
import { sfLoader, trvLoader } from "../helpers/imageKitLoader";
import { tenantId } from "../config";
import { getAllHolidayPackages } from "../services/holidayService";
import { useEffect, useState } from "react";
import { aedNumberFormat } from "../helpers/common";

export default function HolidayCategories() {
    const [holidayPackages, setHolidayPackages] = useState([]);
    const [selectedDest, setSelectedDest] = useState('maldives');

    const getHolidaysByDest = (dest) => {
        getAllHolidayPackages(tenantId, dest).then(res => {
            if (res?.Success) {
                if (res.Data.length > 4)
                    setHolidayPackages(res.Data.slice(0, 4));
                else
                    setHolidayPackages(res?.Data);
                setSelectedDest(dest);
            }
        });
    }

    useEffect(() => {
        getHolidaysByDest('maldives');
    }, [])

    return (
        <>
            <section>
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="subHeading">
                                <h2 className="mb-0 fw-normal">Visa on <strong className="color-orange">Arrival Countries</strong></h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-lg-5 mb-4">
                            <div className="HolidayCategoriesNavTabs bg-grey p-4 rounded-3">
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                                    <span className={`p-0 my-2 bg-transparent w-100 nav-link d-inline-block text-center${selectedDest == 'maldives' && ' active'}`}>
                                        <div className="row align-items-center">
                                            <div className="col-2 pe-0 d-none d-lg-inline">
                                                <div className="HolidayThumImg">
                                                    <Image
                                                        className="w-100 h-auto"
                                                        loader={trvLoader}
                                                        src="Maldives.webp"
                                                        alt="maldives"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('maldives')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Maldives</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">₹ 48,800</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                    <span className={`p-0 my-2 bg-transparent w-100 nav-link d-inline-block text-center${selectedDest == 'mauritius' && ' active'}`}>
                                        <div className="row align-items-center">
                                            <div className="col-2 pe-0 d-none d-lg-inline">
                                                <div className="HolidayThumImg">
                                                    <Image
                                                        className="w-100 h-auto"
                                                        loader={trvLoader}
                                                        src="Mauritius.webp"
                                                        alt="Thailand Logo"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('mauritius')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Mauritius</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">₹ 34,360</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                    <span className={`p-0 my-2 bg-transparent w-100 nav-link d-inline-block text-center${selectedDest == 'indonesia' && ' active'}`}>
                                        <div className="row align-items-center">
                                            <div className="col-2 pe-0 d-none d-lg-inline">
                                                <div className="HolidayThumImg">
                                                    <Image
                                                        className="w-100 h-auto"
                                                        loader={trvLoader}
                                                        src="indonesia.webp"
                                                        alt="Armenia Logo"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('indonesia')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Indonesia</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">₹ 21,800</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                    <span className={`p-0 my-2 bg-transparent w-100 nav-link d-inline-block text-center${selectedDest == 'fiji' && ' active'}`}>
                                        <div className="row align-items-center">
                                            <div className="col-2 pe-0 d-none d-lg-inline">
                                                <div className="HolidayThumImg">
                                                    <Image
                                                        className="w-100 h-auto"
                                                        loader={trvLoader}
                                                        src="fiji.webp"
                                                        alt="Georgia Logo"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('fiji')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Fiji</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">₹ 110,000</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                    <span className={`p-0 my-2 bg-transparent w-100 nav-link d-inline-block text-center${selectedDest == 'seychelles' && ' active'}`}>
                                        <div className="row align-items-center">
                                            <div className="col-2 pe-0 d-none d-lg-inline">
                                                <div className="HolidayThumImg">
                                                    <Image
                                                        className="w-100 h-auto"
                                                        loader={trvLoader}
                                                        src="seychelles.webp"
                                                        alt="Hong Kong Logo"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('seychelles')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Seychelles</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">₹ 38,000</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                    <span className={`p-0 my-2 bg-transparent w-100 nav-link d-inline-block text-center${selectedDest == 'bhutan' && ' active'}`}>
                                        <div className="row align-items-center">
                                            <div className="col-2 pe-0 d-none d-lg-inline">
                                                <div className="HolidayThumImg">
                                                    <Image
                                                        className="w-100 h-auto"
                                                        loader={trvLoader}
                                                        src="bhutan.webp"
                                                        alt="Malaysia Logo"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('bhutan')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Bhutan</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">₹ 36,500</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                    <span className={`p-0 my-2 bg-transparent w-100 nav-link d-inline-block text-center${selectedDest == 'thailand' && ' active'}`}>
                                        <div className="row align-items-center">
                                            <div className="col-2 pe-0 d-none d-lg-inline">
                                                <div className="HolidayThumImg">
                                                    <Image
                                                        className="w-100 h-auto"
                                                        loader={trvLoader}
                                                        src="thailand.webp"
                                                        alt="Seychelles Logo"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('thailand')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Thailand</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">₹ 17,500</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                    <span className={`p-0 my-2 bg-transparent w-100 nav-link d-inline-block text-center${selectedDest == 'malaysia' && ' active'}`}>
                                        <div className="row align-items-center">
                                            <div className="col-2 pe-0 d-none d-lg-inline">
                                                <div className="HolidayThumImg">
                                                    <Image
                                                        className="w-100 h-auto"
                                                        loader={trvLoader}
                                                        src="Malaysia.webp"
                                                        alt="malaysia"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('malaysia')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Malaysia</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">₹ 16,000</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>

                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className="row">
                                {holidayPackages?.length > 0
                                    ? holidayPackages?.map((pkg, ix) => {
                                        return <div className="col-12 col-md-6 mb-3" key={ix} onClick={() => {
                                            let path = `${pkg.isDomestic ? '/india-tour-packages/' : '/international-tour-packages/'}${selectedDest}-tour-packages/${pkg.Slug}`;
                                            window.open(path, '_blank');
                                        }}>
                                            <span className="d-inline-block  w-100 VisaFreeBox position-relative cursor-pointer">
                                                <Image
                                                    className=" w-100 "
                                                    loader={sfLoader}
                                                    src={pkg.ImageUrl}
                                                    alt="pkg img"
                                                    width={100}
                                                    height={100}
                                                />
                                                <div className="VisaFreeBoxOverly position-absolute start-0 end-0"></div>
                                                <div className="packageTitleBox bg-white px-3 py-2 rounded-2 position-absolute start-0 end-0 m-auto">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            <p className="mb-0 fs-16 fw-bold color-black">{pkg.Title}</p>
                                                        </div>
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold color-black">From</p>
                                                            <p className="mb-0 fs-16 fw-bold color-orange">{pkg.StandardPrice ? aedNumberFormat(pkg.StandardPrice) : (pkg.DeluxePrice ? aedNumberFormat(pkg.DeluxePrice) : aedNumberFormat(pkg.PremiumPrice))}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    })
                                    : <span>No Packages Found</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}