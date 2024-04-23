import PrivacyPolicy from './PrivacyPolicy'

export default function policyTravanyaPage() {

    return (
      <PrivacyPolicy/>
    )
}

export async function generateMetadata() {
    return {
        title: 'Privacy Policy - Travanya.ae',
        description: 'Explore Travanyas privacy policy here to learn how we manage your information. Discover our dedication to openness & safety. Your privacy is important to us!',
        keywords: ['privacy policy Travanya'],
        openGraph: {
            title: 'Privacy Policy - Travanya.ae',
            description: "Explore Travanya's privacy policy here to learn how we manage your information. Discover our dedication to openness & safety. Your privacy is important to us!",
            url: 'https://www.travanya.com/privacy-policy',
        },
    }
}