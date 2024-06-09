---
title: Cómo crear sliders con CSS Scroll Snap
date: '2021-04-25'
description: La mejor manera de presentar contenido en redes sociales es gracias a los thumbnails dinámicos, quedan mucho mejor al compartir contenido!
active: true
links:
- https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
- https://www.40defiebre.com/que-es/ctr
- https://ishadeed.com/article/css-scroll-snap/
- https://css-tricks.com/practical-css-scroll-snapping/
tags:
- CSS
---

## Los sliders...¡Ay, qué problema! ##

¿Recordáis hace unos años (aunque hoy en día se siguen utilizando) la cantidad librerías de slider que existían para JavaScript? Las más famosas eran [OwlCarousel](https://owlcarousel2.github.io/OwlCarousel2/) o [Flexslider](http://flexslider.woothemes.com/), pero las hay de más pequeñas como [Simple Slider](https://supersimpleslider.com/). Todas estas librerías ayudaban a estandarizar en todos los navegadores (sí, también en Internet Explorer...) los efectos de *slider* de elementos, que comenzaron a hacerse tan populares a principios de la década del 2010. Podían ser sliders de muchos elementos, o bien de un sólo elemento (los cuales se utilizaban mucho en las pantallas de *Home* de muchas webs para presentar contenido). Y si bien no en todas el rendimiento era el mismo, sí que había un impacto en la WebPerformance, que si bien hace unos cuantos años era mínimo, hoy en día gracias a los cambios en el algoritmo de Google y a la importancia de las [Web Vitals](https://web.dev/vitals/), este impacto se debe tener en cuenta.

A día de hoy, el algoritmo que utiliza Google para valorar cada página indexada en su buscador, pasa por la nota que tenga cada página de los Web Vitals. Los Web Vitals (ya hablaremos con detalle de estas métricas en otro artículo) se tratan de las puntuaciones del LCP (Largest Contentful Paint), FID (First Input Delay) y CLS (Cumulative Layout Shift). Esta última métrica, consiste en los "saltos" que da la página debido a la carga de contenido, y cuantos menos "saltos" realice, mejor. Estos "saltos" pueden venir por contenido cargado via JavaScript, imágenes sin tamaño predefinido, o lo que nos interesa, por los sliders de elementos. Por definición, los sliders de elementos (sobretodo los horizontales) contribuyen a aumentar el valor del CLS, lo cual no es bueno. Además, la mayoría de librerías que se utilizan para conseguir estos *sliders* aportan poco valor en relación a la carga en la WebPerformance. Es decir, hacen lo que deben hacer, pero tienen un impacto negativo demasiado alto en relación a lo que hacen. Como todo en programación, la situación ha mejorado hasta tal punto, que hoy se puede realizar un slider simplemente con HTML y CSS, sin necesidad de JavaScript (lo cual implica no tener impactos negativos en el LCP o FID), consiguiendo así reducir el tamaño de nuestro bundle al no tener que utilizar una librería específica para realizar esta funcionalidad.

## CSS Scroll Snap: our new very best friend ##

La propiedad CSS [Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) es ideal para solucionar todo esto de manera nativa. Es una propiedad que, en realidad, es bastante antigua. El primer draft es del año 2013, aunque con una especificación diferente. La especificación actual permite conseguir un slider de elementos HTML, y cuadrar su *width* con las dimensiones de la pantalla, sea en el eje vertical o horizontal. Se pueden conseguir sliders, antes únicamente disponibles con JavaScript, de manera nativa, como el siguiente ejemplo:

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS Scroll Snap - List of Items X" src="https://codepen.io/Xaconi/embed/oNBmMqQ?height=265&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/Xaconi/pen/oNBmMqQ'>CSS Scroll Snap - List of Items X</a> by Nicolas Giacconi
  (<a href='https://codepen.io/Xaconi'>@Xaconi</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Si intentas hacer scroll horizontal, verás que el contenido siempre se ajusta para que cuadre con los items del container. Esto se consigue gracias a la propiedad Scroll Snap. Esta propiedad hace que un contenedor cambie dinámicamente su scroll y que se alinee con el punto de ajuste de los items de su interior. El punto de ajuste, como verás más delante, se trata del punto con el cual queremos que se alinee el scroll del contenedor. Si investigas el contenido del siguiente CodePen verás como se consigue, pero a modo de explicación, aquí te dejo la *chuleta* de la propiedad `scroll-snap-type`, con el primer parámetro:

* `none`: el contenedor no tiene en cuenta ningún punto de ajuste de los items del interior.
* `x`: el contenedor calculará el punto de ajuste de los items de su interior en base al eje x.
* `y`: el contenedor calculará el punto de ajuste de los items de su interior en base al eje y.

Y también el segundo:

* `mandatory`: el contenedor estará obligado a cuadrar su scroll con el punto de ajuste de los items de su interior.
* `proximity`: el contenedor cuadrará su scroll con el punto de ajuste de los items de su interior, aunque no de manera obligatoria.

Según la especificación de la propiedad, la nomenclatura es la siguiente:

```css
scroll-snap-type: none | [ x | y | block | inline | both ] [ mandatory | proximity ];
```

Combinando estos parámetros, podemos crear sliders sencillos, tanto en el eje horizontal como en el vertical. A continuación puedes ver ejemplos de sliders de un único item, en horizontal y en vertical:

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS Scroll Snap - One Item X" src="https://codepen.io/Xaconi/embed/jOydedN?height=265&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/Xaconi/pen/jOydedN'>CSS Scroll Snap - One Item X</a> by Nicolas Giacconi
  (<a href='https://codepen.io/Xaconi'>@Xaconi</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS Scroll Snap - One Item Y" src="https://codepen.io/Xaconi/embed/YzNBJML?height=265&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/Xaconi/pen/YzNBJML'>CSS Scroll Snap - One Item Y</a> by Nicolas Giacconi
  (<a href='https://codepen.io/Xaconi'>@Xaconi</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Definiendo los puntos de ajuste y la parada ##

A pesar de que lo normal es querer enseñar los items del contenedor al 100%, pueden darse casos en que esto no sea posible. Por ejemplo, si los items ocupan el 75% de espacio de un contenedor, lo ideal es querer enseñar el item centrado y de manera completa, y los dos items adyacentes de manera parcial. Esto es posible con la propiedad `scroll-snap-align`.

* `none`: el comportamiento del scroll no tiene en cuenta ningún punto de ajuste.
* `start`: el comportamiento del scroll tiene en cuenta como punto de ajuste el inicio de cada item.
* `center`: el comportamiento del scroll tiene en cuenta como punto de ajuste el centro de cada item.
* `end`: el comportamiento del scroll tiene en cuenta como punto de ajuste el final de cada item.

Partiendo del ejemplo anteriormente explicado, quedaría así:

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS Scroll Snap - Scroll Snap Align Center" src="https://codepen.io/Xaconi/embed/MWJLzJb?height=265&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/Xaconi/pen/MWJLzJb'>CSS Scroll Snap - Scroll Snap Align Center</a> by Nicolas Giacconi
  (<a href='https://codepen.io/Xaconi'>@Xaconi</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Por último, y enfocándonos más en Mobile, siempre es posible que el usuario haga Scroll con mucha insistencia, haciendo un sólo *swipe* pero intentando llegar al final del slider de un sólo movimiento. Para los sliders en donde no se quiera que esto se aplique, o sea, los sliders donde se quieran enseñar todos sus items y que ninguno se pase por alto, hay que añadir la propiedad `scroll-snap-stop`. Esta propiedad define si el usuario, al hacer scroll, puede saltarse los items del slider.

* `normal`: al hacer scroll, el slider cuadrará su posición teniendo en cuenta la propiedad `scroll-snap-align` del item donde llegue el scroll.
* `always`: al hacer scroll, el slider cuadrará su posición teniendo en cuenta la propiedad `scroll-snap-align` del siguiente item donde empiece el scroll.

Esta propiedad su utiliza mucho para sliders de imágenes, donde se quiere dar importancia a todas y que ninguna se quede sin visualizar. A continuación un ejemplo:

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS Scroll Snap - Scroll Snap Stop" src="https://codepen.io/Xaconi/embed/KKaJrGW?height=265&theme-id=dark&default-tab=result" frameborder="no" loading="lazy"  allowfullscreen="true">
  See the Pen <a href='https://codepen.io/Xaconi/pen/KKaJrGW'>CSS Scroll Snap - Scroll Snap Stop</a> by Nicolas Giacconi
  (<a href='https://codepen.io/Xaconi'>@Xaconi</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Aplicando la solución... y entendiendo las limitaciones... ##

¡A partir de todo lo explicado, ya podemos montar sliders básicos con cualquier listado de elementos HTML! Pero...esta solución sirve sólo para sliders básicos. Si queremos algo más complejo, sí que hacen falta librerías que permitan añadir puntos de manejo (los típicos bullets) o puntos de control (las típicas flechas de navegación). Pero en este punto hace falta valorar si estos requisitos son estrictamente necesarios, o si bien podemos pasar sin añadir ninguna librería a nuestro bundle, minimizar su tamaño, y así conservar las métricas originales de Web Vitals.

Aparte de esto, hay que entender que esta propiedad puede no funcionar en todos los navegadores. Hay que tener esto en cuenta a pesar el 93% de aceptación que tiene esta propiedad en [CanIUse](https://caniuse.com/?search=scroll-snap-type). 

¡Nada más por ahora! ¡Si te ha gustado el artículo o tienes otras ideas para las imágenes que se utilizan para compartir links en redes sociales, [escríbeme por Twitter](https://twitter.com/Xaconi) o [comparte el artículo](https://twitter.com/intent/tweet?text=Cómo%20crear%20sliders%20con%20CSS%20Scroll%20Snap&url=https://xaconi.dev/como-crear-sliders-con-css-scroll-snap) para que llege a cuanta más gente mejor!