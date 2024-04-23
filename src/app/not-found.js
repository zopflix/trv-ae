"use client"
import Image from "next/image";
import { trvLoader } from "./helpers/imageKitLoader";
import Layout from "./components/_layout";
import Footer from "./components/footer";

export default function Custom404() {
  return <Layout>
    <div className="NotFoundPage">
      <div className="row align-items-center">
        <div className="col-12 col-md-4 d-md-none">
          <Image
            className="h-auto w-100"
            loader={trvLoader}
            src="404.webp"
            alt="404 Image Error"
            width={20}
            height={20}
          />
        </div>
        <div className="col-12 col-md-6 py-3">
          <h1 className="fw-bold color-blue">Page Not Found</h1>
          <p className="fw-bold">Oops, Time For A U-Turn!</p>
          <p className="fs-14">Uh-oh! Looks like we took a wrong turn. No worries. Sometimes the best travel adventures happen when you're a bit "off-track".</p>
          <p className="fs-12"><i>Click below to return to the main page and continue your journey.</i></p>
          <a href="/" className="d-inline-block buttonStyle2 text-decoration-none py-2 px-3">
            <span className="fs-14">Back To Home</span>
          </a>
        </div>
        <div className="col-12 col-md-2"></div>
        <div className="col-12 col-md-4 d-none d-md-inline">
          <Image
            className="h-auto w-100"
            loader={trvLoader}
            src="404.webp"
            alt="404 Image Error"
            width={20}
            height={20}
          />
        </div>
      </div>

    </div>
    <Footer />
  </Layout>

}