import { appBaseURL } from "@/app/config";
import { getFormattedDateTime } from "@/app/helpers/common";
import { confirmpaymentsubmission, saveTransaction, sendCustomerConfirmation, verifyPayuTransaction } from "@/app/services/bookingService";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(req, res) {
  // Do whatever you want
  let queryParm = req.url.substr(req.url.indexOf("?"));
  return NextResponse.redirect(`${appBaseURL}thank-you?id=` + params.get("txnId"), { status: 302 });

}

// To handle a POST request to /api
export async function POST(req, res) {
  let formData = await req.formData();
  let queryParm = req.url.substr(req.url.indexOf("?"));
  var params = new URLSearchParams(queryParm);

  console.log("Txn Id", formData.get("txnid"))
  let verifyPayment = await verifyPayuTransaction(formData.get("txnid"));
  if (verifyPayment.response 
    && verifyPayment.response.status == 400 
    ) {
    console.log("payment  not completed");
    return;
  }
  console.log("payment Completed", verifyPayment);


  if (!formData.get("bank_ref_num")
    || !formData.get("addedon")
    || !formData.get("net_amount_debit")
    || !formData.get("mihpayid")
    || !formData.get("txnid")
    || (params.get("txnId") != formData.get("txnid"))) {
    console.log("Actual Payment not found")
    console.log("Bank Reference Number", formData.get("bank_ref_num"));
    console.log("Added On", formData.get("addedon"));
    console.log("net_amount_debit", formData.get("net_amount_debit"));
    console.log("mihpayid", formData.get("mihpayid"));
    console.log("txnid", formData.get("txnid"));
    console.log("parms  txnid", params.get("txnId"));

    return;

  }
  saveTransaction({ txnId: params.get("txnId"), refNumber: formData.get("bank_ref_num"), gateway: "HDFC", amount: parseFloat(formData.get("amount")) })
  confirmpaymentsubmission(params.get("uid"), params.get("key"), params.get("txnId"), formData.get("bank_ref_num"));

  let dataToSend = {
    amount: formData.get("amount"),
    paymentDate: getFormattedDateTime(formData.get("addedon")),
    txnId: params.get("txnId"),
    refNumber: formData.get("bank_ref_num"),
    aPIValidationKey: "Shipra$$$##@@@@%$",
    portalId: 107,
    email: formData.get("email"),
    name: formData.get("firstname")
  }
  console.log(dataToSend);
  sendCustomerConfirmation(dataToSend);
  return NextResponse.redirect(`${appBaseURL}thank-you?id=` + params.get("txnId") + `&bRef=` + formData.get("bank_ref_num") + `&amt=` + formData.get("amount") + `&pd=` + formData.get("addedon"), { status: 302 });
}
