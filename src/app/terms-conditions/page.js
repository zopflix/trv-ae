import TermsCondition from './TermsCondition'

export default function conditionsTravanyaPage() {

    return (
        <TermsCondition />
    )
}

export async function generateMetadata() {
    return {
        title: 'Terms & Conditions - Travanya.ae',
        description: 'Familiarise yourself with Travanyas terms and conditions to fully comprehend our policies. From booking procedures to travel details, youll find everything here.',
        keywords: ['terms conditions Travanya'],
        openGraph: {
            title: 'Terms & Conditions - Travanya.ae',
            description: "Learn Travanya terms and conditions for a comprehensive understanding of our policies. From booking to travel essentials, find all the information you need here.",
            url: 'https://www.travanya.ae/terms-conditions',
        },
    }
}