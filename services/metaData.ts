import { Metadata } from "next"

type CustomMetadata = {
    title: string,
    description: string,
    image: string,
    type: string,
    link: string,
    domain: string,
    date?: string
}
/* title="Xaconi.dev 👨‍💻"
description="Posts sobre desarrollo web, FrontEnd (Angular, React, Vue, etc.), BackEnd (JavaScript, PHP, etc.) y buenas prácticas."
image="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>"
link={baseURL}
type="web"
domain={baseURL} */
export function getMetadata(metadata: CustomMetadata) {
    const newMetadata: Metadata = {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            images: metadata.image,
            locale: 'es_ES',
            type: 'website',
            siteName: 'xaconi.dev'
        },
        twitter: {
            images: metadata.image,
            card: 'summary_large_image',
            creator: '@xaconi',
            site: '@xaconi'
        },
        manifest: 'manifest.json',
    }

    return newMetadata;
}