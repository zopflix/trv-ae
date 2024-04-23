import AboutUs from './AboutUs'
export default function aboutTravanyaPage() {

    return (
       <AboutUs/>
    )
}

export async function generateMetadata() {
    return {
        title: 'About Us - Travanya | Your Travel Companion',
        description: 'Know about Travanya, your cherished travel companion. Delve into our mission, values, and dedication to crafting effortless travel experiences. Come, join the journey with us.',
        keywords: ['About Travanya'],
        openGraph: {
            title: 'About Us - Travanya | Your Travel Companion',
            description: "Know about Travanya, your cherished travel companion. Delve into our mission, values, and dedication to crafting effortless travel experiences. Come, join the journey with us.",
            url: 'https://www.travanya.com/about-us',
        },
    }
}