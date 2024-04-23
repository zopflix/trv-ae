import InnerHeader from "./inner-header"
import '../globals.css'
import '../variable-style.css'
import '../search-form-style.css'
import '../listing-style.css'
import '../holiday-listing.css'
import '../splash-style.css'
import '../user-style.css'
import Head from "next/head";
import Script from "next/script";

export default function Layout({ children }) {
    return (
        <section>
            <Head>
                {/* Bootstrap */}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
                <Script strategy='lazyOnload' src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" />
            </Head>
            <InnerHeader></InnerHeader>
            <div className="open-flight-detail-overly"></div>
            <main>{children}</main>
        </section>
    )
}
