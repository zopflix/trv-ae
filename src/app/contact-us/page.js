import ContactUs from './contact-us'
export default function contactTravanyaPage() {

    return (
        <ContactUs />
    )
}

export async function generateMetadata() {
    return {
        title: 'Contact Us - Travanya.ae',
        description: 'Need assistance for flight and holiday booking? Contact our dedicated team at Travanya through the mentioned contact details. Begin your Travanya experience today.',
        keywords: ['Contact Travanya'],
        openGraph: {
            title: 'Contact Us - Travanya.ae',
            description: "Need assistance for flight and holiday booking? Contact our dedicated team at Travanya through the mentioned contact details. Begin your Travanya experience today.",
            url: 'https://www.travanya.ae/contact-us',
        },
    }
}