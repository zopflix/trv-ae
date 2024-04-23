import { appBaseURL } from "@/app/config";
import { sendPendingEmail } from "@/app/services/bookingService";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(req, res) {
  // Do whatever you want
  let queryParm = req.url.substr(req.url.indexOf("?"));
  return NextResponse.redirect(`${appBaseURL}payment-failed-confirmation` + queryParm, { status: 302 });

}

// To handle a POST request to /api
export async function POST(req, res) {
  let queryParm = req.url.substr(req.url.indexOf("?"));
  var params = new URLSearchParams(queryParm);
  console.log(params);
  console.log(queryParm)
  return NextResponse.redirect(`${appBaseURL}payment-failed-confirmation` + queryParm, { status: 302 });
}
