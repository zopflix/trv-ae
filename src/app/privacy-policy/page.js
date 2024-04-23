import PrivacyPolicy from './PrivacyPolicy'

export default function policyTravanyaPage() {

    return (
      <PrivacyPolicy/>
    )
}

export async function generateMetadata() {
    return {
        title: 'Privacy Policy - Travanya',
        description: 'Know Travanya privacy policy here to understand how we handle your information. Learn about our commitment to transparency and security. Your privacy matters to us',
        keywords: ['privacy policy Travanya'],
        openGraph: {
            title: 'Privacy Policy - Travanya',
            description: "Know Travanya privacy policy here to understand how we handle your information. Learn about our commitment to transparency and security. Your privacy matters to us",
            url: 'https://www.travanya.com/privacy-policy',
        },
    }
}