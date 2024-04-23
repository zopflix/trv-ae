import { appBaseURL } from "@/app/config";
import {  trackDummyPaymentFailure } from "@/app/services/bookingService";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(req, res) {
  // Do whatever you want
  let queryParm = req.url.substr(req.url.indexOf("?"));
  return NextResponse.redirect(`${appBaseURL}dummy-payment-failed` + queryParm, { status: 302 });

}

// To handle a POST request to /api
export async function POST(req, res) {
  let formData = await req.formData();
  let queryParm = req.url.substr(req.url.indexOf("?"));
  var params = new URLSearchParams(queryParm);
  trackDummyPaymentFailure(params.get("id"),formData.get("error_Message"));
  return NextResponse.redirect(`${appBaseURL}dummy-payment-failed` + queryParm, { status: 302 });
}
