import DummyTicketForm from './dummy-ticket'

export default function flightTicket() {

    return (
        <DummyTicketForm />
    )
}

export async function generateMetadata() {
    return {
        title: 'Book Dummy Flight Ticket - Without Buying A Real Ticket | Travanya',
        description: 'Enjoy hassle-free travel arrangements with our smooth Dummy flight ticket bookings - perfect for proof of travel/return without buying an actual ticket. Book now!',
        alternates: {
            canonical: 'https://www.travanya.ae/dummy-flight-ticket/',
        },
        keywords: ['dummy flight ticket', 'dummy ticket', 'dummy ticket for visa', 'dummy air ticket', 'cheap dummy ticket'],
        openGraph: {
            title: 'Book Dummy Flight Ticket - Without Buying A Real Ticket | Travanya',
            description: "Enjoy hassle-free travel arrangements with our smooth Dummy flight ticket bookings - perfect for proof of travel/return without buying an actual ticket. Book now!",
            url: 'https://www.travanya.ae/dummy-flight-ticket/',
        },
    }
}