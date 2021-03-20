// Styles
import styles from '../styles/404.module.css'

export default function Page404() {
    return(
        <section className={styles.section}>
            <h1>404 - Página no encontrada</h1>
            <img alt="Página no encontrada" src="/let_it_burn.gif" />
            <h3 className={styles.h3}>you not supposed to be here...</h3>
        </section>
    );
}