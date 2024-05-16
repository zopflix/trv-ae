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
                                                        src="Sri-Lanka.webp"
                                                        alt="Sri-Lanka"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('srilanka')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Sri Lanka</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">AED 1099*</p>
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
                                                        src="seychelles.webp"
                                                        alt="seychelles img"
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
                                                            <p className="mb-0 fs-16 fw-bold">AED 5199*</p>
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
                                                        src="Georgia.webp"
                                                        alt="Georgia img"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('georgia')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Georgia</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">AED 1199*</p>
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
                                                        src="Maldives.webp"
                                                        alt="Maldives"
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
                                                            <p className="mb-0 fs-16 fw-bold">AED 4299*</p>
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
                                                        src="Mauritius.webp"
                                                        alt="Mauritius img"
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
                                                            <p className="mb-0 fs-16 fw-bold">AED 3199*</p>
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
                                                        src="armenia.webp"
                                                        alt="armenia img"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('armenia')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Armenia</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">AED 999*</p>
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
                                                        src="azerbaijan.webp"
                                                        alt="azerbaijan img"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10" onClick={() => getHolidaysByDest('azerbaijan')}>
                                                <div className="d-flex HolidayTitle align-items-center justify-content-between cursor-pointer">
                                                    <div>
                                                        <div>Azerbaijan</div>
                                                    </div>
                                                    <div className="d-none d-lg-block">
                                                        <div className="text-end">
                                                            <p className="mb-0 fs-12 fw-bold">From</p>
                                                            <p className="mb-0 fs-16 fw-bold">AED 1099*</p>
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
                                                        src="thailand.webp"
                                                        alt="thailand img"
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
                                                            <p className="mb-0 fs-16 fw-bold">AED 799*</p>
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