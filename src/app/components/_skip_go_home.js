"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { Modal } from "react-bootstrap";
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';

export default function SkipNGoToHome(props) {

    const setOpenBackModal = props.setOpenBackModal;
    const openBackModal = props.openBackModal;
    const setIsBackLoading = props.setIsBackLoading;
    const isBackLoading = props.isBackLoading;
    const goHomeText = props.goHomeText;
    const router = useRouter();

    return (

        <Modal className="gohome-confirm-popup" show={openBackModal} onHide={() => setOpenBackModal(false)}>
            <Modal.Body>
                <div className="row go-home-confirm-popup align-items-center">
                    <div className="col-12 text-center">
                        <Image
                            className="w-50 h-auto mb-3 go-home-confirm-popup-img"
                            loader={trvLoader}
                            src="icon/session-expired.png"
                            alt="session-expired"
                            width={176}
                            height={43}
                        />
                    </div>
                    <div className="col-12 go-home-confirm-popup-cont text-center">
                        <p className="mb-0"><strong>Are you sure you want to leave?</strong></p>
                        <p className="mb-4">It looks like you are still in the middle of making a booking!</p>
                    </div>
                </div>
                <div className="row go-home-confirm-popup-btn">
                    <div className="col-6">
                        <div className="cursor-pointer border-0 w-100 bg-orange color-white text-center fs-14 py-2 rounded-2" onClick={() => {
                            setIsBackLoading(true);
                            //await trackMixpanelEvent("Go_Back");
                            if (goHomeText == "Go To Home") {
                                window.open("/", "_self");
                            }
                            else {
                                console.log("taking back to home page");
                                window.history.back();
                            }

                        }}>
                            {
                                isBackLoading ? <div className="spinner-border" role="status"><span className="sr-only"></span></div> : <span>{goHomeText}</span>
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="cursor-pointer border-0 w-100 bg-blue color-white text-center fs-14 py-2 rounded-2" href="javascript:void(0)" onClick={() => setOpenBackModal(false)} >No, I want to stay</div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}