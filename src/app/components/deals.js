import Image from "next/image";
import { sfLoader } from "../helpers/imageKitLoader";
import { useEffect, useState } from "react";
import { getFlightOffers } from "../services/flightService";
import { getFormattedDate8, getLastDateOfCurrentMonth } from "../helpers/common";
import CopyToClipboard from "react-copy-to-clipboard";
import PartnerLogo from "./partner-logo";

export default function DealsOffers() {
    const [offers, setOffers] = useState([]);
    const [copiedOffer, setCopiedOffer] = useState('');

    useEffect(() => {
        getFlightOffers().then(res => {
            setOffers(res);
        })
    }, []);

    const handleCopy = (text) => {
        setCopiedOffer(text);
    };


    return (
        <>
            <PartnerLogo></PartnerLogo>
            <section className="pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="color-orange mb-0 fw-bold fs-20"><i>Lets Fly & Save Big!</i></p>
                            <h1 className="color-blue mb-0 fw-bold fs-24">Get Exclusive Deals on All Flight & Holiday Package Bookings</h1>
                        </div>
                    </div>
                    {offers.length > 0 &&
                        <div className="row">
                            {
                                offers.map((offer, ix) => {
                                    return <div className="col-12 col-md-6 col-lg-4 py-3" key={ix}>
                                        <div className="DealsOfferBox p-2 rounded-3">
                                            <a href={offer.offerURL}>
                                                <Image
                                                    className="h-auto w-100"
                                                    loader={sfLoader}
                                                    src={offer.image}
                                                    alt="Deals Image"
                                                    width={20}
                                                    height={20}
                                                />
                                            </a>
                                            <div className="d-flex align-items-center justify-content-between pt-3">
                                                <div className="pe-2">
                                                    <h2 className="mb-0 color-blue fs-12 fw-bold">Booking Period</h2>
                                                    <p className="mb-0 color-black fs-10">Valid till: {getFormattedDate8(getLastDateOfCurrentMonth())}</p>
                                                </div>
                                                <div>

                                                    <CopyToClipboard text={offer.name} onCopy={handleCopy}>
                                                        {copiedOffer != offer.name
                                                            ? <div className="PromoCode d-flex align-items-center p-2 rounded-2 ">
                                                                <p className="mb-0 color-black fs-10 fw-bold me-1">USE CODE:</p>
                                                                <p className="mb-0 color-black fs-10 fw-bold">{offer.name}</p>
                                                                <p className="opacity-75 mb-0 color-black fs-12 mx-2">|</p>
                                                                <i className="opacity-75 mb-0 color-black fs-16 fa-regular fa-copy"></i>
                                                            </div>
                                                            : <div className="PromoCode d-flex align-items-center p-2 rounded-2 ">
                                                                <p className="mb-0 fs-10 fw-bold me-1 color-green">Copied</p>
                                                                <p className="opacity-75 mb-0 color-black fs-12 mx-2">|</p>
                                                                <p className="mb-0 color-green fs-10 fw-bold">{offer.name}</p>
                                                                <p className="opacity-75 mb-0 color-black fs-12 mx-2">|</p>
                                                                <i className="fa-solid fa-check fs-16 color-green"></i>
                                                            </div>
                                                        }
                                                    </CopyToClipboard>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    }
                </div>
            </section>
        </>
    )
}