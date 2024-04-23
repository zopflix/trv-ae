import { appBaseURL } from "@/app/config";
import { verifyPayuTransaction } from "@/app/services/bookingService";
import { NextResponse } from "next/server";


// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  let queryParm = request.url.substr(request.url.indexOf("?"));
  return NextResponse.redirect(`${appBaseURL}payment-success` + queryParm, { status: 302 })
}

// To handle a POST request to /api
export async function POST(req, res) {
  let formData = await req.formData();
  let queryParm = req.url.substr(req.url.indexOf("?"));
  
  let verifyPayment = await verifyPayuTransaction(formData.get("txnid"));
  if (verifyPayment.response 
    && verifyPayment.response.status == 400 
    ) {
    console.log("payment  not completed");
    return;
  }

  return NextResponse.redirect(`${appBaseURL}payment-success` + queryParm + `&bref=` + formData.get("bank_ref_num"), { status: 302 });
}
