widget-emz
==========

Widget Eventos de Mendoza


Instrucciones de uso:
---------------------

* Descargar el proyecto y colocarlo en una carpeta con acceso desde la web, por ejemplo __/widget-emz__
* Colocar el siguiente segmento de código en el área donde se desea colocar el widget:

```html
  <!-- Script widget emz -->
  <link rel="stylesheet" href="/widget-emz/styles/emz_styles.css">
  <script>document.write('<script src="/widget-emz/scripts/emz_script.js"><\/script>')</script>
  <script>
    EMZ.init();
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
  <script>document.write('<script src="/widget-emz/scripts/emz_script.js"><\/script>')</script>
  <script>
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

El sistema permite también personalizar la cantidad de eventos a traer, utilizando el argumento _limite_, por ejemplo, para traer los próximos 5 eventos de Turismo:

```html
  <!-- Script widget emz -->
  <link rel="stylesheet" href="/widget-emz/styles/emz_styles.css">
  <script>document.write('<script src="/widget-emz/scripts/emz_script.js"><\/script>')</script>
  <script>
    EMZ.init({
      reparticion: 'Turismo',
      limite: '5'
    });
  </script>
 
  <div id="emz_widget"></div>
  <!-- FIN Script widget emz -->
```

El elemento #emz_widget puede ser estilado si se requiere, y es posible agregarle los nombres de clases que sean necesarios. Tenga en cuenta que los elementos del widget utilizan el prefijo emz_ para evitar conflictos con sus nombres actuales.
