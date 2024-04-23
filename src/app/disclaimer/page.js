import Disclaimer from './Disclaimer'
export default function disclaimerTravanyaPage() {

    return (
        <Disclaimer />
    )
}

export async function generateMetadata() {
    return {
        title: 'Disclaimer - Travanya.ae',
        description: 'Familiarise yourself with Travanyas terms and conditions to fully comprehend our policies. From booking procedures to travel details, youll find everything here.',
        keywords: ['Contact Travanya'],
        openGraph: {
            title: 'Disclaimer - Travanya.ae',
            description: "Familiarise yourself with Travanya's terms and conditions to fully comprehend our policies. From booking procedures to travel details, you'll find everything here.",
            url: 'https://www.travanya.com/disclaimer',
        },
    }
}