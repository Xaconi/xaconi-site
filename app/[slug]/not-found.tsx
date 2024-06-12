
"use client"

import styles from '../../styles/404.module.css';

import { Metadata } from 'next';
import { getMetadata } from '@/services/metaData';

export const metadata: Metadata = getMetadata({
    title: "404 - Página no encontrada",
    description: "404 - Página no encontrada",
    image: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>",
    link: " ",
    type: "article",
    domain: " "
})

export default function Page404() {
    return (
        <>
            <h1>404 - Página no encontrada</h1>
            <img alt="Página no encontrada" src="/let_it_burn.gif" />
            <h3 className={styles.h3}>you not supposed to be here...</h3>
        </>
    );
}