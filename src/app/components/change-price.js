import Image from "next/image";
import { aedNumberFormat } from "../helpers/common";
import CircularJSON from 'circular-json';
import { trvLoader } from "../helpers/imageKitLoader";

export default function ChangePrice(props) {
    return (

        <div className="new-price-popup text-center">
            <div className="closepopbtn" onClick={() => props.setOpenNewPriceModal(false)}>
                <Image
                    className="h-auto w-100"
                    loader={trvLoader}
                    src="icon/close-icon-filter.png"
                    alt="close icon"
                    width={20}
                    height={20}
                />
            </div>
            <Image
                className="w-75 mb-4 h-auto"
                loader={trvLoader}
                src="icon/new-price-popup-img.png"
                alt="payment sucess icon"
                width={100}
                height={43}
            />
            <h3 className="fs-18 mt-4 mb-4 fw-bold"> Your flight price has
                {
                    props.newPrice - (props.oldPrice) > 0 &&
                    <span>increased</span>} by <span>{aedNumberFormat(props.newPrice - (props.oldPrice)).split(".")[0]}<sup>.{aedNumberFormat(props.newPrice - (props.oldPrice)).split(".")[1]}</sup> </span> , The updated price is {aedNumberFormat(props.newPrice).split(".")[0]}<sup>.{aedNumberFormat(props.newPrice).split(".")[1]}</sup>

            </h3>
            <h5 className="fs-14 mb-0"><span>Old Price - {aedNumberFormat(props?.oldPrice).split(".")[0]} <sup>.{aedNumberFormat(props?.oldPrice).split(".")[1]}</sup> </span> | <span>New Price - $ {props.newPrice} </span></h5>
            <br />
            <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                    <button className="w-100 btn bg-blue color-white fs-14 ps-4 pe-4 pt-2 pb-2 mt-3" onClick={async () => { props.setOpenNewPriceModal(false); window.history.back(); }}>Go To Listing</button>
                </div>
                <div className="col-md-6">
                    <button className="mt-3 btn-hover-orange w-100 border border-color-orange btn bg-white color-orange fs-14 ps-4 pe-4 pt-2 pb-2"
                        onClick={async () => {
                            props.setOpenNewPriceModal(false);

                            if (props.isListinPage) {

                                window.localStorage.setItem("currentFlight", CircularJSON.stringify(props.flight));

                                props.gotoCheckoutPage(props.flight);
                            }
                            else {
                                props.confirmBooking();
                            }
                        }}

                    >Continue with New Price</button>
                </div>


            </div>
        </div>
    );
}