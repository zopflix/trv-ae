import Image from "next/image";
import { trvLoader } from "../helpers/imageKitLoader";

export default function BookingFailed(props) {

    return (

        <div className="new-price-popup text-center">
            <div className="closepopbtn" onClick={() => props.setOpenBookingFailedModal(false)}>
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
            <p className="fs-14 mt-4 mb-4"> We regret to inform you that your booking couldn't be processed at this time due to technical reasons, network issues, or other unforeseen reasons. Our agents are actively working to resolve this issue and will provide you with updates shortly.</p>
            <p className="fs-14 mt-4 mb-4"> For immediate assistance, please call our experts at <a className="text-decoration-none color-blue" href="tel:9180-0235865">+918000235865</a>. They will guide you through the next steps.</p>
            <div className="row align-items-center justify-content-between">
                <div className="col-md-12">
                    <button className="btn bg-green color-white fs-14 py-2 px-4" onClick={() => {
                        window.history.back();
                        props.setOpenBookingFailedModal(false);
                    }}><span className="fs-14">Modify Search</span></button>
                </div>

            </div>
        </div>
    );
}