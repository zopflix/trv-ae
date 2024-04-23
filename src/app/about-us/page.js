import AboutUs from './AboutUs'
export default function aboutTravanyaPage() {

    return (
       <AboutUs/>
    )
}

export async function generateMetadata() {
    return {
        title: 'About Us - Travanya.ae | Your Best Travel Partner',
        description: 'Get familiar with Travanya, your trusted partner in travel adventures. Know about our purpose, principles & commitment to curating seamless travel encounters.',
        keywords: ['About Travanya'],
        openGraph: {
            title: 'About Us - Travanya.ae | Your Best Travel Partner',
            description: "Get familiar with Travanya, your trusted partner in travel adventures. Know about our purpose, principles & commitment to curating seamless travel encounters.",
            url: 'https://www.travanya.com/about-us',
        },
    }
}