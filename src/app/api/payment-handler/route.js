import { appBaseURL } from "@/app/config";
import { decryptPaymentResponse } from "@/app/services/bookingService";
import { NextResponse } from "next/server";


// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  // let queryParm = request.url.substr(request.url.indexOf("?"));
  // return NextResponse.redirect(`${appBaseURL}payment-success` + queryParm, { status: 302 })
}

// To handle a POST request to /api
export async function POST(req, res) {
  let formData = await req.formData();
  let response = await decryptPaymentResponse(formData.get("encResp"));
  let queryParm = req.url.substr(req.url.indexOf("?"));
  console.log("SSssssss" + JSON.stringify(response))

  if (response.isError
    || !response.refnumber
    || !response.txnId

  ) {
    console.log("payment  not completed custom hdfc");
    return NextResponse.redirect(`${appBaseURL}payment-failed?id=` + response.txnId, { status: 302 });;
  }

  console.log("EncodedResponse =>" + formData.get("encResp"))

  console.log("Query Params data =>" + queryParm)
  return NextResponse.redirect(`${appBaseURL}payment-success` + queryParm + `&txnId=${response.txnId}&bref=${response.trackingId}&bid=${response.bid}&amt=${response.amount}`, { status: 302 });
}
