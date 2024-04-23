"use client"
import React, { useEffect } from 'react'
import { makePayment } from '../services/bookingService';
import { Decrypt } from '../helpers/common';
import { useRouter } from "next/navigation";
import Header from '../components/header';
import { trvLoader } from '../helpers/imageKitLoader';
import Image from 'next/image';

export default function page() {
    const router = useRouter();

    const createPaymentForm = (values) => {
        var objValues = Decrypt(values);
        var obj = JSON.parse(objValues)
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "https://secure.payu.in/_payment");
        Object.keys(obj).forEach(function (key) {
            // Create an input element for emailID
            var ID = document.createElement("input");
            ID.setAttribute("type", "hidden");
            ID.setAttribute("name", key);

            if (key == "optionalparam1" || key == "optionalparam2") {
                ID.setAttribute("value", Decrypt(obj[key]));
                ID.setAttribute("name", key == "optionalparam1" ? "surl" : "furl");
            }
            else
                ID.setAttribute("value", obj[key]);
            form.append(ID);
        });
        document.getElementsByTagName("body")[0]
            .appendChild(form).submit();

    }

    useEffect(() => {

        if (!!window.location.search) {
            let params = new URLSearchParams(window.location.search);
            if (params) {
                makePayment(params.get("id")).then((res) => {
                    if (typeof (res) == "object" && !res.canProceed) {

                        if (res.alreadySent) {
                            router.push(`/payment-submitted?id=${params.get("id")}`)
                        }
                        if (res.isExpired) {
                            router.push(`/time-out`)
                        }

                    }
                    else if (!!res) {
                        createPaymentForm(res);
                    }
                });

            }
        }
    }, []);

    return (
        <div>
            <Header></Header>

            <div className='container'>
                <Image
                    className="position-absolute top-50 bottom-50 start-0 end-0 m-auto"
                    loader={trvLoader}
                    src="loader.gif"
                    alt="Travanya Logo"
                    width={250}
                    height={250}
                />
            </div>

        </div>
    )
}
