"use client"

import { useState } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { makeCustomerPayment } from "../services/bookingService";
import { Decrypt } from "../helpers/common";


export default function MakePyament() {

    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const [email, setEMail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitted, setSubmitted] = useState(false);
    const [hasError, setError] = useState(false);


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
    const submitPayment = () => {
        setSubmitted(true);

        if ((!amount || parseFloat(amount) <= 0)
            || (!name || name.trim().length == 0)
            || (!email || email.trim().length == 0)
            || (!phone || phone.trim().length == 0)) {

            setError(true);
            return;
        }
        setError(false);
        let dataToSend = {
            amount: parseFloat(amount),
            name: name,
            phone: phone,
            email: email
        }

        makeCustomerPayment(dataToSend).then((res) => {
            createPaymentForm(res);
        })

    }

    return (
        <>
            <Header></Header>
            <section className="py-5 bg-grey mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-2 col-lg-3"></div>
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="MakePaymentForm bg-white p-4 rounded-2">
                                <h1 className="fw-bold mb-2 fs-24">Make Your Payment</h1>
                                <form>
                                    <div className="mb-3">
                                        <label for="Amount" className="form-label mb-0 fs-14">Amount<span className="color-red">*</span></label>
                                        <input min={1} type="number" value={amount} className="form-control" id="Amount" aria-describedby="Amount" onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="Name" className="form-label mb-0 fs-14">Name<span className="color-red">*</span></label>
                                        <input type="text" value={name} className="form-control" id="Name" aria-describedby="Name" onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="Phone" className="form-label mb-0 fs-14">Phone<span className="color-red">*</span></label>
                                        <input type="text" value={phone} className="form-control" id="Phone" aria-describedby="Phone" onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="Email" className="form-label mb-0 fs-14">Email<span className="color-red">*</span></label>
                                        <input type="email" value={email} className="form-control" id="Email" aria-describedby="Email" onChange={(e) => setEMail(e.target.value)} />
                                    </div>
                                    <div className="d-flex">
                                        <button type="button" className="buttonStyle3 border-0 px-5 me-4" onClick={() => {
                                            submitPayment()
                                        }}>Pay</button>
                                        <button type="button" className="buttonStyle2 border-0 px-5" onClick={() => {
                                            setName("");
                                            setEMail("")
                                            setPhone("")
                                            setAmount("")
                                        }}>Reset</button>
                                    </div>
                                    {
                                        hasError &&
                                        <div className="mb-3 d-flex">
                                            <span className="color-red fw-bold bg-grey">Please fill all the required fields.</span>
                                        </div>

                                    }

                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-md-2 col-lg-3"></div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

