import DummyPaymentFailed from './dummy-payment-failed'

export default function flightTicket() {

    return (
        <DummyPaymentFailed />
    )
}

export async function generateMetadata() {
    return {
        title: 'Discover the Essence of Travanya - Dummy Flight Ticket | Your Travel Companion',
        description: 'Uncover the story behind Travanya, your trusted travel companion. Learn about our mission, values, and commitment to providing seamless travel experiences. Explore the heart of NeoFares and join us on the journey.',
        keywords: ['About Travanya', 'Travel Company Story', 'Our Mission and Vision'],
        openGraph: {
            title: 'Discover the Essence of Travanya - About Us | Your Travel Companion',
            description: "Uncover the story behind Travanya, your trusted travel companion. Learn about our mission, values, and commitment to providing seamless travel experiences. Explore the heart of NeoFares and join us on the journey.",
            url: 'https://www.travanya.ae/flight-dummy-ticket',
        },
    }
}