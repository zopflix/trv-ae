import TermsCondition from './TermsCondition'

export default function conditionsTravanyaPage() {

    return (
      <TermsCondition/>
    )
}

export async function generateMetadata() {
    return {
        title: 'Terms & Conditions - Travanya',
        description: 'Learn Travanya terms and conditions for a comprehensive understanding of our policies. From booking to travel essentials, find all the information you need here.',
        keywords: ['terms conditions Travanya'],
        openGraph: {
            title: 'Terms & Conditions - Travanya',
            description: "Learn Travanya terms and conditions for a comprehensive understanding of our policies. From booking to travel essentials, find all the information you need here.",
            url: 'https://www.travanya.com/terms-conditions',
        },
    }
}