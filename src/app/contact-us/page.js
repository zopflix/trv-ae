import ContactUs from './contact-us'
export default function contactTravanyaPage() {

    return (
        <ContactUs />
    )
}

export async function generateMetadata() {
    return {
        title: 'Contact Us - Travanya',
        description: 'Have questions or need assistance? Get in touch with our dedicated team at Travanya through the provided contact details. Begin your Travanya experience with a conversation.',
        keywords: ['Contact Travanya'],
        openGraph: {
            title: 'Contact Us - Travanya',
            description: "Have questions or need assistance? Get in touch with our dedicated team at Travanya through the provided contact details. Begin your Travanya experience with a conversation.",
            url: 'https://www.travanya.com/contact-us',
        },
    }
}