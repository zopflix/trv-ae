import Disclaimer from './Disclaimer'
export default function disclaimerTravanyaPage() {

    return (
       <Disclaimer/>
    )
}

export async function generateMetadata() {
    return {
        title: 'Disclaimer - Travanya',
        description: 'By visiting our site, you agree to our disclaimer terms. Should we update, amend or make changes, they’ll be updated here. Your continued use implies consent to all the updates.',
        keywords: ['Contact Travanya'],
        openGraph: {
            title: 'Disclaimer - Travanya',
            description: "By visiting our site, you agree to our disclaimer terms. Should we update, amend or make changes, they’ll be updated here. Your continued use implies consent to all the updates.",
            url: 'https://www.travanya.com/disclaimer',
        },
    }
}