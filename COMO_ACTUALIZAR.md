# Cómo actualizar el sitio · 4ª Jornada FNH

Cada cambio se hace en los archivos del sitio y después se suben al servidor los archivos modificados, reemplazando los anteriores. No hay que compilar ni reiniciar nada.

Las fotos de personas van en blanco y negro y los logos en escala de grises, en PNG o JPG. Los nombres de archivo van sin espacios, tildes ni ñ.

## 1. URL de compra en Eventrid

Archivo: `js/enlaces.js`

Cambiar `null` por la dirección, entre comillas:

```js
"compra-entrada": "https://www.eventrid.cl/…",
```

Todos los botones «Compra tu entrada» quedan activos. La política de datos personales se completa igual, en la línea `"politica-datos"`.

## 2. Foto de una persona que hoy aparece en gris

Solo hay que guardar la foto en la carpeta `img/` **con este nombre exacto**. No hay que tocar código.

| Persona | Nombre del archivo |
|---|---|
| Dra. Milena Villarroel | `img/foto_Villarroel_Milena.jpg` |
| EU. Amaya Muñoz | `img/foto_Munoz_Amaya.jpg` |
| PhD-PT. Lynn Tanner | `img/foto_Tanner_Lynn.jpg` |
| Fgo-MsP. Pablo Vásquez | `img/foto_Vasquez_Pablo.jpg` |
| Dra. Claudia Paris | `img/foto_Paris_Claudia.jpg` |

La foto debe ser cuadrada y centrada en el rostro. Aparece sola en el Comité y en Conferencistas; mientras no exista el archivo, se muestra el recuadro gris.

## 3. Expositor por confirmar (Módulo 1, 10:00 y Módulo 2, 12:05)

Archivo: `index.html`. Buscar el comentario `PENDIENTE` y reemplazar la línea

```html
<div class="sched-who sched-pending">Expositor — por confirmar</div>
```

por

```html
<div class="sched-who">Nombre — Cargo, Institución</div>
```

Para que la persona aparezca también en «Conferencistas y panelistas», se copia el bloque de otra persona en esa sección y se cambian la foto, el nombre y el cargo.

## 4. Nuevo auspiciador

Solo auspiciadores con acuerdo firmado.

1. Guardar el logo en `img/`, por ejemplo `img/auspicio_NombreEmpresa.png`.
2. En `index.html`, sección AUSPICIOS, buscar el comentario de su nivel (por ejemplo `<!-- logos Oro aquí -->`) y agregar debajo:

```html
<img src="img/auspicio_NombreEmpresa.png" alt="Nombre de la empresa">
```

El nivel aparece solo al tener su primer logo, y el tamaño lo pone el nivel: Diamante 120 px de alto, Oro 96, Plata 76, Bronce 60, Cooperador y Colaboran 56.

## 5. Nuevo patrocinio

1. Guardar el logo en `img/`, por ejemplo `img/patrocinio_NombreInstitucion.png`.
2. En `index.html`, sección PATROCINIOS, copiar una línea existente y cambiar el archivo y el nombre:

```html
<div class="patro-box"><img src="img/patrocinio_NombreInstitucion.png" alt="Nombre completo de la institución"></div>
```

Todos los patrocinios se muestran del mismo tamaño, sin jerarquía.

## 6. Fotos de ediciones anteriores (galería)

Solo fotos con consentimiento de uso de imagen.

1. Guardar la foto en `img/`, por ejemplo `img/galeria_2025_1.jpg`.
2. En `index.html`, sección EDICIONES ANTERIORES, debajo de `<!-- fotos 2025 aquí -->` (o del año que corresponda), agregar:

```html
<div class="gal-tile"><img src="img/galeria_2025_1.jpg" alt="Descripción breve de la foto"></div>
```

Lo ideal son 4 fotos por año. La sección y su enlace en el menú aparecen solos con la primera foto; se muestran en blanco y negro y pasan a color al pasar el cursor.

## 7. Cuando el sitio pase a ser el oficial

En `index.html`, borrar la línea:

```html
<meta name="robots" content="noindex">
```

Así Google puede mostrar el sitio en sus resultados.

## Otros cambios

- **Textos:** en `index.html`, buscando la frase y reemplazándola.
- **Colores de marca:** variables al inicio de `css/estilos.css`.
- **Fechas de la cuenta regresiva:** en `js/app.js`, bloque `phases`.

La fuente oficial de contenidos es el Excel de contenidos que mantiene Extensión (EU. Amaya Muñoz, amunoz@fnh.cl).
