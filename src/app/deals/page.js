"use client"

import Layout from "../components/_layout"
import DealsOffers from "../components/deals"
import Footer from "../components/footer"
import Header from "../components/header"
import SearchSection from "../components/search-section"
import SubscribeNewsletter from "../components/subscribe-newsletter"
import { useEffect, useState } from 'react'



export default function Deals() {

    const [noOfPassengers, setNoOfPassengers] = useState({ adults: 0, children: 0, infants: 0, cabin: '' });


    useEffect(() => {

    }, [noOfPassengers])


    return (
        <Layout>
            <Header></Header>
            <SearchSection setNoOfPassengers={setNoOfPassengers} selectedTab={0}></SearchSection>
            <DealsOffers></DealsOffers>
            <SubscribeNewsletter></SubscribeNewsletter>
            <Footer></Footer>

        </Layout>
    )
}

