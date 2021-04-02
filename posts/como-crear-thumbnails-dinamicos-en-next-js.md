---
title: Cómo crear thumbnails dinámicos en NextJS
date: '2021-03-24'
description: La mejor manera de presentar contenido en redes sociales es gracias a los thumbnails dinámicos, quedan mucho mejor al compartir contenido!
active: true
links:
- https://www.40defiebre.com/que-es/ctr
- https://css-tricks.com/microbrowsers-are-everywhere/
- https://uxdesign.cc/do-you-know-what-a-microbrowser-is-a555f15f6cc8
tags:
- NextJS
- Vercel
---

## ¿Cómo destacar tus posts en redes sociales? ##

Dicen que una imagen vale más que mil palabras...y eso a la hora de compartir contenido en redes sociales es vital! Me pasa mucho cuando navego en Twitter y veo gente compartiendo links. Estos links, tienen imágenes destacadas que pueden aumentar mucho el **CTR** (*Click Through Rate*) y generar así más porcentaje de conversión. Obviamente, la imagen debe ser explicativa del contenido, debe ser de buena calidad, debe adaptarse a las diferentes redes sociales pero...¿qué pasa con los links de posts o contenido que no tienen o no pueden tener imagen destacada? 🤔

Estos links son más complicados de "vender" en redes sociales y la larga, lo que se acaba haciendo es asignarle una imagen más genérica, o bien el logo de la web a la cual pertenece el link. Pero desde hace tiempo me he fijado en un caso concreto de web que ha conseguido resolver esto de una manera más original, consiguiendo que (al menos yo) preste más atención a sus posts compartidos en redes sociales. Y esto no sólo ayuda (y queda bien) en redes sociales, sino también en cualquier *microbrowser* que se utilize. Pero...¿qué es un **microbrowser**?

## Utilizas microbrowsers cada día... pero aún no lo sabes... ##

Los microbrowsers se utilizan todos los días, por casi todo el mundo que tenga un móvil/tablet/PC. Cada vez que se comparte un enlace por una red social como Facebook o Twitter, cuando se comparte un link por plataformas como Slack, Microsoft Teams, o directamente en servicios de mensajería como WhatsApp, Skype o Telegram. Siempre que se comparte un enlace en alguna de estas plataformas, la propia plataforma hace un *fetch* del enlace haciendo una query GET, y obteniendo resultados limitados para enseñarlos de forma más o menos elegante al usuario de la plataforma. Por eso, en vez de un texto solo con todo el link, la plataforma te enseña la imagen destacada que ha obtenido de la query GET al enlace, el *title* y la meta descripción. Esto es lo que hace un microbrowser, y se utilizan para formatear contenido de manera resumida en la plataforma donde se comparta el link.

<img loading="lazy" src="/posts/microbrowsers-post.png" alt="Compartir links con imágenes destacadas VS compartir links sin imágenes destacadas" width="650" height="350" />

A pesar de que se realice una query GET, esto no quiere decir que la plataforma reciba toda la página del link como si fuera una visita más a ese link. Los microbrowsers tienen las siguientes limitaciones:

* El parsing que se hace del HTML es limitado, y se realiza un filtro de algunas etiquetas.
* No tienen en cuenta *cookies*
* No ejecutan JavaScript
* Algunos no se llevan bien con redirecciones 301 o 302
* Hacen constar la visita a los trackers (Google Analytics, Facebook Pixel, etc.) como tráfico directo, no como *referral*. 

En resumen, los microbrowsers hacen fetch de la información básica del link compartido, y esta información es la siguiente:

* Título del link, que puede venir por las etiquetas *title* o bien por las etiquetas de meta datos *og:title*, siempre dentro de la etiqueta *head*.
* Descripción del link, que debe venir por el valor de la etiqueta *og:description*, siempre dentro de la etiqueta *head*.
* Imagen destacada del link, que puede venir por el valor de las etiquetas *og:image*, *og:image:secure_url* o *twitter:image:src*. Para el caso de link compartido en Twitter, también se puede especificar la etiqueta *twitter:card* para que Twitter sepa el formato visual que tendrá el link cuando se comparta. 

En este blog, ya se habían integrado estas etiquetas para que cuando se compartan links en redes sociales, el contenido sea visualmente atractivo. Pero volviendo al principio de este post, ¿qué pasa con los links que no tengan imagen destacada? ¿De qué manera se pueden destacar en redes sociales?

## DEV.to lo ha clavado ##

La web [DEV.to](https://dev.to) es una plataforma de referencia para la publicación de contenido técnico relacionado con el desarrollo y la programación. Es una web que recomiendo mucho ya que ha conseguido una comunidad muy fiel y sobretodo muy pacífica con todo tipo de contenidos (algo complicado hoy en día en internet).

Casi siempre encuentro contenido de esta web compartido en mi timeline de Twitter, y muchas veces me he fijado en que, si bien algunos links disponen de una imagen destacada (subida por el propio autor del post), otras veces la imagen destacada que aparece es una donde sale el título del post, el autor, la fecha de publicación y algunas etiquetas donde salen logos del lenguaje de programación del que se habla en el post. Desde que la vi por primera vez, pensé que se trataba de una solución muy ingeniosa y que conseguia destacar los posts de una manera sencilla y efectiva. Pero...¿cómo lo hacen?

<img loading="lazy" src="/posts/microbrowsers_dev_to.png" alt="Así se comparte el contenido en DEV.to...y mola un montón" width="585" height="540" />

## Generando thumbnails dinámicos con Node y NextJS ##

Inspeccionando el código de DEV.to (tanto con el Developer Tools de Chrome, como su código fuente disponible en [GitHub](https://github.com/forem/forem)) he visto que se utiliza una función específica para generar la imagen del thumbnail. Adaptarlo a un stack JavaScript como el que utiliza este blog no parece un problema. La funcionalidad básica a cumplir es la siguiente: conseguir una URL donde, al hacer una query GET, se nos devuelva una imagen PNG con el título del Post que se quiere compartir, el nombre del blog, mi imagen personal y la fecha de publicación. Para realizar todo esto, decido tirar por la funciones serverless que ofrece NextJS, que se adaptan perfectamente para casos como éste. Tan sólo tengo que crear una función en JavaScript dentro de `/pages/api/` para que la función pase a ser tratada como una función serverless (o Lambda en Amazon Web Services), y que así pueda obtener resultados de devolución diferentes al de los típicos componentes de React o páginas de NextJS. Además, la función deberá tener en cuenta que tendrá como parámetro de entrada, el slug del Post cuya imagen querramos devolver, así sabremos el Post que debemos buscar dentro de la función. El planteamiento básico es el siguiente:

```javascript
export default async (req, res) => {
    const postSlug = req.query.post;
    const post = searchPostBySlug(postSlug);

    const postThumbnail = generateThumbnail(post);
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": Buffer.byteLength(screenShotBuffer),
    });
}
```

* Buscamos el post del slug que recibimos
* Generamos el thumbnail que querramos enseñar al compartir el link
* Devolvemos el thumbnail con las cabeceras de imagen correspondientes

¿Easy-peasy no? Pues no corramos tanto. Para que podamos estilar la imagen al compartir el link y que ésta quede con unos estilos similares a DEV.to, hay que tener en cuenta que esta función no trabaja sobre el navegador, sino directamente sobre el servidor, sólo con Node, y que ya podemos olvidarnos de parsear HTML y ya no digamos CSS. Aunque... hay una alternativa. La mejor manera de maquetar y estilar la imagen tal y como la queremos, es con HTML y CSS, por lo tanto, hay que conseguir que desde el servidor y con Node, tengamos una herramienta para parsear e interpretar todo este contenido. Esa harramienta sería básicamente, tener un navegador como Chrome pero directamente incrustado en el servidor, listo para parsear el HTML y CSS que le pasemos. Lo que necesitamos es el paquete ```chrome-aws-lambda``` y la versión *headless* del Chrome, el paquete ```puppeteer-core```. Con estos dos paquetes de NPM podremos pasar contenido HTML y CSS y obtener el resultado como si un navegador fuera... pero directamente des del servidor. Por eso, nuestra función serverless pasaría a ser la siguiente para obtener la imagen que queremos:

```javascript
import fs from 'fs';
import path from 'path';

import { getPostBySlug } from '../../services/postsService';

import chromium from 'chrome-aws-lambda';

export default async (req, res) => {
    const postSlug = req.query.post.replace('.jpg', '');
    const post = await getPostBySlug(postSlug);

    const imageAvatar = fs.readFileSync('./public/xaconi.jpg');
    const base64Image = new Buffer.from(imageAvatar).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image;
    const originalDate = new Date(post.attributes.date);
    const formattedDate = `${originalDate.getDate()}/${('0' + (originalDate.getMonth()+1)).slice(-2)}/${originalDate.getFullYear()}`;

    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });

    const tags = post.attributes.tags?.map((tag) => {
        return `#${tag}`
    }).join(' | ') || "";

    const page = await browser.newPage();
    page.setViewport({ width: 1128, height: 600 });
    page.setContent(`<html>
        <!-- HTML del thumbnail a compartir -->
    </html>`);
    const screenShotBuffer = await page.screenshot();
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": Buffer.byteLength(screenShotBuffer),
    })
    res.end(screenShotBuffer);
}
```

Cargamos directamente las imágenes que nos hacen falta dentro de la estructura HTML (la imagen de mi avatar solamente) y cargamos el navegador headless que hará de intérprete para el código HTML y CSS que le pasemos. Ajustamos las variables que vamos a utilizar en la estructura HTML, y se la pasamos al navegador para que la interprete. Al final, el código HTML es lo de menos (y muy personal al final), lo que importa es que lo que le pasemos al navegador headless, se maquete tal y como se haría en un navegador normal. El código HTML que he utilizado yo es el siguiente, pero vosotros podéis maquetar la imagen a compartir como queráis:

```javascript
// ...

page.setContent(`<html>
    <body>
        <div class="social-image-content">
            <h1>
                ${ post.attributes.title }
            </h1>
            <div class="social-image-footer">
                <div class="social-image-footer-left">
                    <img src="${ dataURI }" />
                    <span>Xaconi.dev · ${ formattedDate } </span>
                </div>
                <div class="social-image-footer-right">
                    ${tags}
                </div>
            </div>
        </div>
    </body>
    <style>
        html, body {
            height : 100%;
        }
        body {
            align-items : center;
            display : flex;
            height : 600px;
            justify-content : center;
            margin: 0;
            width : 1128px;
            background-color: #e2e2e2;
        }
        .social-image-content {
            border : 2px solid black;
            border-radius : 5px;
            box-sizing: border-box;
            display : flex;
            flex-direction : column;
            height : calc(100% - 80px);
            margin : 40px;
            padding : 20px;
            width : calc(100% - 80px);
            position: relative;
            background-color: white;
        }
        .social-image-content::after {
            content: ' ';
            position: absolute;
            top: 7px;
            left: 7px;
            width: 100%;
            background-color: black;
            height: 100%;
            z-index: -1;
            border-radius: 5px;
        }
        .social-image-content h1 {
            font-size: 72px;
            margin-top: 90px;
        }
        .social-image-footer {
            display : flex;
            flex-direction : row;
            margin-top : auto;
        }
        .social-image-footer-left {
            align-items: center;
            display: flex;
            flex-direction: row;
            font-size : 28px;
            font-weight : 600;
            justify-content: center;
            line-height: 40px;
        }
        .social-image-footer-left img {
            border : 2px solid black;
            border-radius : 50%;
            height : 40px;
            margin-right : 10px;
            width : 40px;
        }
        .social-image-footer-right {
            align-items: center;
            display: flex;
            flex-direction: row;
            height : 40px;
            justify-content: center;
            margin-left : auto;
            font-size : 28px;
        }
        * {
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-weight : 600;
        }
    </style>
</html>`);

// ...
```

Finalmente, tendremos que colocar la llamada a esta función serverless en las etiquetas correspondientes del HTML para que los microbrowsers, al leer la información básica del post, reciban esta imagen.

```html
<html>
    <head>
        <!-- ... -->
        <meta property="og:image" content="https://xaconi.dev/api/social-image/como-crear-thumbnails-dinamicos-en-next-js.jpg">
        <meta property="og:image:secure_url" content="https://xaconi.dev/api/social-image/como-crear-thumbnails-dinamicos-en-next-js.jpg">
        <meta name="twitter:image:src" content="https://xaconi.dev/api/social-image/como-crear-thumbnails-dinamicos-en-next-js.jpg">
        <!-- ... -->
        </head>
        <body>
            <!-- ... -->
        </body>
</html>
```

**¿Pues con esto ya estaríamos no?** Ya tenemos el código de generación del thumbnail en una función serverless, y esta función puede ser llamada haciendo una query GET desde cualquier navegador. Tan sólo hay que llamarla en las etiquetas metas descritas anteriormente para que conste como imagen destacada de los links compartidos en redes sociales. Ajustando esto en el componente que haga el render de la etiqueta head en nuestra web, y ya lo tendremos...no? Pues no, queda por arreglar alguna que otra cosilla...

## Haciendo Deploy, bugs en Vercel... y cuidando el tamaño de nuestro bundle... ##

Éste blog está alojado en [Vercel](https://vercel.com/), que es un servicio de alojamiento para páginas estáticas, que utilicen frameworks como React, NextJS, Angular, Vue, etc. o bien SSG como Gatsby o Jekyll. Es un servicio ideal para blogs como éste ya que ofrece una free-tier muy interesante, además de obtener a cambio Analytics, ayudar con la performance, CDN, y sobretodo... permitir funciones serverless. El equipo de Vercel (antes Zeit) son los creadores del framework NextJS, por lo que si tenéis una aplicación web basada en NextJS, Vercel es un servicio que recomiendo totalmente. 

Pero haciendo deploy de este proyecto, en concreto de la funcionalidad que genera thumbnails dinámicos, me encontré bastantes problemas. Por un lado, Vercel impone un tamaño máximo de 50MB para las funciones serverless. Es mucho, pero teniendo en cuenta que cargamos todo un Chrome (por mucho que sea headless) en una sola función, vamos muy justos. Aunque no nos pasamos, me encontré con lo que parece ser un bug de Vercel. Al hacer Deploy, Vercel me devolvía un mensaje de error avisándome de que la función serverless encargada de generar el thumbnail que hemos implementado, se pasaba del límite de 50MB establecido. A pesar de que revisé que todo el bundle no pasaba de 50MB, el error persistía.

Al final, consultando un hilo de una issue de [GitHub](https://github.com/vercel/vercel/issues/4739), vi que a otra gente le pasaba exactamente lo mismo, a pesar de que no se pasaban del dicho límite. ¿La solución? Pasar la carpeta de /api, desde dentro de /pages a la raíz del proyecto. Esto hacía que las funciones serverless que tuviéramos hasta ese momento, pasasen de ser funciones serverless de NextJS, a funciones serverless normales. Y haciendo este cambio, el Deploy en Vercel era posible. Para probarlo en mi entorno de desarrollo local, tuve que cambiar el comando de ejecución, pasando de `npm run dev` a `vercel dev` del Vercel CLI. Más allá de esto no había ningún otro cambio a realizar en el proyecto, todo seguía igual. Y así conseguí poder hacer Deploy de esta funcionalidad en Vercel.

## Código de ejemplo y demo ##

En el repositorio de este blog podéis encontrar el ejemplo del código final, o bien podéis consultar directamente [el link del thumbnail de mi primer post](https://xaconi.dev/api/social-image/bienvenidos-a-mi-blog.jpg). También os dejo en un CodePen un ejemplo de maquetación editable para que podáis jugar con la maquetación final del thumbnail. La gracia de poder editar la maquetación es que al final, como es parseada e interpretada por un Chrome headless, el resultado final de la imagen es el mismo.

<iframe height="265" style="width: 100%;" scrolling="no" title="Thumbnail dinámico" src="https://codepen.io/Xaconi/embed/preview/xxgEWwW?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy">
  See the Pen <a href='https://codepen.io/Xaconi/pen/xxgEWwW'>Thumbnail dinámico</a> by Nicolas Giacconi
  (<a href='https://codepen.io/Xaconi'>@Xaconi</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Y poco más que decir... Con poco código se pueden conseguir cosas bastante chulas, y en este caso, se nota la diferencia entre compartir un link sin un thumbnail que sirva de imagen destacada, en comparacíón con otros como los de DEV.to, donde siempre se nota el contenido a compartir en redes sociales. Podéis jugar con la maquetación final para que tenga el aspecto que vosotros queráis. Otro caso es el de hacer una captura de pantalla del post del link directamente con el Chrome headless y guardar la imagen para ofrecerla como imagen destacada en redes sociales. Personalmente me gusta más una maquetación única, pero está claro que requiere más trabajo.

¡Nada más por ahora! ¡Si te ha gustado el artículo o tienes otras ideas para las imágenes que se utilizan para compartir links en redes sociales, [escríbeme por Twitter](https://twitter.com/Xaconi) o [comparte el artículo](https://twitter.com/intent/tweet?text=C%C3%B3mo%20crear%20thumbnails%20din%C3%A1micos%20en%20NextJS&url=https://xaconi.dev/como-crear-thumbnails-dinamicos-en-next-js) para que llege a cuanta más gente mejor!
