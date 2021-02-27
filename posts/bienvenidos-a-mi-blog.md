---
title: Bienvenidos a mi blog!
date: '2021-02-24'
image: '/js_image.png'
description: Bienvenida a mi blog y explicación del tech-stack que lleva.
tags:
- blog
links:
- https://es.reactjs.org/
- https://nextjs.org/
---

## Bienvenido! ##

**Bienvenido/a a mi humilde blog!** Si estás aquí es porque mi continuo Spam en Twitter ha surtido efecto 😅!. Desde hace tiempo que sopeso la idea de crear un blog para obligarme a aprender nuevas cosas acerca del desarrollo web, que es mi profesión. Hoy en día lo que se lleva es todo lo relacionado con el desarrollo FrontEnd (con React dominando el mercado, pero también con Vue, Angular y Svelte) pero más allá de eso, quiero aprender las buenas prácticas en proyectos con estas tecnologías, así como también aspectos que sean más de BackEnd (con microservicios/functions) y también sobre paradigmas de programación y metodologías de trabajo. Quizás intente abarcar demasiado, pero mi objetivo es ese.

Y como me pasaba cuando estaba cursando la carrera, no hay mejor manera de aprender algo que *tener que explicarlo a otra persona*. De esta manera espero expandir mi base de conocimiento hacia tecnologías que no utilizo en mi trabajo del día a día. Espero poder mantener una periodicidad adecuada y quiero empezar siendo realista, con un artículo al més, siempre en castellano en el blog, y una versión en inglés en [Dev.to](https://dev.to/), y ver cómo es el recibimiento.

Con esta entradilla, quería aprovechar también para comentar el primer artículo y como tengo a mano todo lo realizado para poner en marcha este blog, os comento qué hay detrás y cómo pretendo mejorarlo.

Mi intención era poder tener un blog pequeño y lo más simple posible en poco tiempo. Después de valorar opciones de SSG (Static Site Generator) como [Gatsby](https://www.gatsbyjs.com/) o [11ty](https://www.11ty.dev/) me dí cuenta que en realidad no era eso lo que quería, sino que al final si me esforzaba un poco más en desarrollarlo yo mismo me serviría como un campo de pruebas para probar pequeños experimentos con la tecnología FrontEnd que escogiese. No quería que un entorno SSG *out-of-the-box* me limitara en lo que quería hacer a nivel técnico, así que al final me decanté por utilizar [React](https://es.reactjs.org/) con [NextJS](https://nextjs.org/), **EL framework de React**. Da herramientas para simplificar aspectos como SSR (Server Side Rendering), SSG (Static Site Generation) y ISG (Incremental Static Generation) con sólo un par de funciones. Por ejemplo, con el siguiente código tenemos suficiente para que NextJS haga una build de una página y genere un estático para que el TTFB (Time to First Byte) sea increíblemente bajo.

```javascript
export async function getStaticProps() {
    const posts = getAllPosts();
    return {
        props: {
            posts
        },
    }
}
```

En otro artículo explicaré las bondades de NextJS con profundidad, ya que lo merece.

A partir de ése stack y un poco de maquetación (que irá mejorando poco a poco lo prometo 🙏), ya tenía la base para mi blog. El sistema de posts es lo más simple del mundo. Una colección de ficheros Markdown en la carpeta `/posts` de mi repo los cuales tienen el contenido de los articulos, y los meta datos de estos con el formato Front-Matter que utilizan SSG como Hugo, 11y, Jekyll, etc. Los artículos los proceso con el paquete [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx), aunque en el futuro podría cambiar (dependiendo de la cantidad de bloques que tenga que personalizar, que ya tengo pensados unos cuantos). Un poco de CSS, un poco de fixes para a11y (accesibilidad) y SEO, y ya lo tenemos 🎉🎉🎉!

Intentaré dejar repositorios dedicados para cada artículo, ya que con ejemplos de código se ven mejor los conceptos. Pero además, el propio blog es open-source y el código está disponible para todo aquel que quiera revisarlo y modificarlo. De hecho, si encontráis alguna errata en algún artículo, podéis hacer una `Pull Request` en el repo público del blog y así me ayudáis a que el contenido sea de más calidad.

Nada más por ahora, espero seguir escribiendo y que os vaya gustando todo lo que publique! 👋