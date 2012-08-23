widget-emz
==========

Widget de Eventos de Mendoza

[Descargar de aquí](https://github.com/Noviggo/widget-emz/zipball/master)

Instrucciones de uso:
---------------------

* Colocar el siguiente segmento de código en el área donde se desea colocar el widget:

```html
  <div>
    <!-- Script widget emz -->
    <link rel="stylesheet" href="https://raw.github.com/Noviggo/widget-emz/master/styles/emz_styles.css">
    <script  type="text/javascript">document.write('<script src="https://raw.github.com/Noviggo/widget-emz/master/scripts/emz_script.js"><\/script>')</script>
    <script type="text/javascript">
      EMZ.init({
        reparticion: 'Deportes',
        limite: '2'
      });
    </script>
 
    <div id="emz_widget"></div>
    <!-- FIN Script widget emz -->
  </div>
```

Insturcciones de uso si descarga el proyecto:
----------------------------------------------------

* Descargar el proyecto y colocarlo en una carpeta con acceso desde la web, por ejemplo __/widget-emz__
* Colocar el siguiente segmento de código en el área donde se desea colocar el widget:

```html
  <!-- Script widget emz -->
  <link rel="stylesheet" href="/widget-emz/styles/emz_styles.css">
  <script type="text/javascript">document.write('<script src="/widget-emz/scripts/emz_script.js"><\/script>')</script>
  <script type="text/javascript">
    EMZ.init({});
  </script>
 
  <div id="emz_widget"></div>
  <!-- FIN Script widget emz -->
```

* Recordar cambiar la sección _/widget-emz_ de la ruta tanto del script como de css si es necesario

Personalización:
----------------

__Reparticiones__

Si se desea obtener los resultados de alguna repartición en particular, colocarlo como parámetro _reparticion_ en _init()_, por ejemplo para "Deportes":

```html
  <!-- Script widget emz -->
  <link rel="stylesheet" href="/widget-emz/styles/emz_styles.css">
  <script  type="text/javascript">document.write('<script src="/widget-emz/scripts/emz_script.js"><\/script>')</script>
  <script type="text/javascript">
    EMZ.init({
      reparticion: 'Deportes'
    });
  </script>
 
  <div id="emz_widget"></div>
  <!-- FIN Script widget emz -->
```

Los valores permitidos son:

* Deportes
* Turismo
* Cultura

__Cantidad de eventos a mostrar__

El sistema permite también personalizar la cantidad de eventos a traer, utilizando el argumento _limite_, por ejemplo, para traer los próximos 5 eventos de Turismo:

```html
  <!-- Script widget emz -->
  <link rel="stylesheet" href="/widget-emz/styles/emz_styles.css">
  <script type="text/javascript">document.write('<script src="/widget-emz/scripts/emz_script.js"><\/script>')</script>
  <script type="text/javascript">
    EMZ.init({
      reparticion: 'Turismo',
      limite: '5'
    });
  </script>
 
  <div id="emz_widget"></div>
  <!-- FIN Script widget emz -->
```

__Personalización de estilos y dimensiones__

El elemento _#emz_widget_ puede ser estilado si se requiere, y es posible agregarle los nombres de clases que sean necesarios. Tenga en cuenta que los elementos del widget utilizan el prefijo emz_ para evitar conflictos con sus nombres actuales.

Existen dos formas de visualizar el widget dependiendo si se añade el nombre de clase _emz_tiny_ o no. El resultado es un listado de enventos sin el copete o descripcion:

<img src="https://raw.github.com/Noviggo/widget-emz/master/images/widget_tiny.jpg"/> o <img src="https://raw.github.com/Noviggo/widget-emz/master/images/widget_normal.jpg"/>

El widget ha sido diseñado para adaptarse al ancho del contenedor en que se lo posicione, con un mínimo de 250px. El alto dependerå de la cantidad de eventos solicitados o puede asignarsele (o utilizar los ya generados) un alto fijo teniendo en cuenta los siguientes requisitos:

* Debe estar dentro de un contenedor con alto y ancho asignado por css. Además, debe modificar el alto de la caja _emz_content_ de la siguiente manera:

```css
  .emz_content{
	height:00px; /*asigne el valor de su conveniencia*/
	overflow-x:hidden;
  }
```

* Si se muestran mas de elementos de los que entran en el tamaño especificado, se debe agregar a la caja contenedora la clase _emz_scroll_ para agregar la barra de desplazamiento.
* Tamaños predefinidos. Si desea utilizar estos tamaños solo agregue el nombre de clase en el contenedor _( ejemplo: emz_386x300 = width:386px; height:300px)_
 
 * emz_386x300
 * emz_300x250
 * emz_300x250
 * emz_300x300
 * emz_250x250
 * emz_290x200
 * emz_290x200
 * emz_270x200
 * emz_300x300
 * emz_300x250
 * emz_320x320
 * emz_290x300
 * emz_540x300

Ejemplo de uso:
---------------

```html
  <div class="emz_tiny emz_300x300">
    <!-- Script widget emz -->
    <link rel="stylesheet" href="https://raw.github.com/Noviggo/widget-emz/master/styles/emz_styles.css">
    <script  type="text/javascript">document.write('<script src="https://raw.github.com/Noviggo/widget-emz/master/scripts/emz_script.js"><\/script>')</script>
    <script type="text/javascript">
      EMZ.init({
        reparticion: 'Deportes',
        limite: '2'
      });
    </script>
 
    <div id="emz_widget"></div>
    <!-- FIN Script widget emz -->
  </div>
```

y se vera de la siguiente manera:

<img src="https://raw.github.com/Noviggo/widget-emz/master/images/widget_tiny.jpg"/>

* Cuando se utiliza un tamaño predefinido no es necesario utilizar la clase _emz_scroll_
