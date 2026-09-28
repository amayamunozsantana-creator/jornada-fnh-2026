# 4ª Jornada de Cáncer Infantojuvenil · Fundación Nuestros Hijos

Sitio web del evento del lunes 30 de noviembre de 2026 (Auditorio COPEC, Santiago; presencial y online).

- **Sitio funcionando:** ver el enlace en *About*, a la derecha de esta página (GitHub Pages).
- **Código:** este repositorio. Botón verde **Code → Download ZIP** para descargarlo completo.

Es un sitio **estático**: HTML, CSS y JavaScript, sin base de datos, sin gestor de contenidos y sin dependencias que instalar. **No carga nada desde servidores externos**: la tipografía, las imágenes y los scripts están incluidos. Todas las rutas son relativas, así que funciona igual en una subcarpeta (`fnh.cl/jornada2026/`) o en un subdominio (`jornada.fnh.cl`). Para publicarlo basta con copiar la carpeta completa tal como está.

**Para actualizar contenidos** (Eventrid, fotos, auspiciadores, patrocinios, galería), ver [`COMO_ACTUALIZAR.md`](COMO_ACTUALIZAR.md): cada cambio es guardar un archivo en `img/` o agregar una línea.

## Estructura

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura y todos los textos del sitio, en el orden de la maqueta |
| `css/estilos.css` | Estilos y efectos. Los colores de marca están en las variables `:root` al inicio |
| `js/enlaces.js` | **Único lugar donde se editan los destinos de botones y enlaces** |
| `js/app.js` | Comportamiento: cursor, parallax, menú lateral, acordeón del programa, selector de huso horario, cuenta regresiva por tramos |
| `img/` | Logos, fotos (blanco y negro), patrocinios, textura del hero, franja del pie, cursor |
| `fonts/` | Tipografía Montserrat (licencia OFL), alojada en el propio sitio |
| `COMO_ACTUALIZAR.md` | Instrucciones paso a paso para cada tipo de cambio de contenido |
| `design-tokens.json` | Paleta, tipografía, espaciados y tiempos de animación; importable en Figma |

Tipografía: Montserrat, incluida en `fonts/` (licencia OFL).

## Enlaces pendientes

Todos los botones llevan un atributo `data-enlace` y toman su destino de `js/enlaces.js`. Un valor `null` deja el botón visible pero desactivado. Cuando llegue la URL, se escribe solo ahí:

| Identificador | Estado |
|---|---|
| `compra-entrada` | Pendiente: URL de Eventrid (área comercial). Mientras tanto, los botones de compra llevan a la sección Valores |
| `politica-datos` | Pendiente: página de política de datos personales en el sitio de FNH |

## Contenidos pendientes

- Expositores por confirmar: Módulo 1 (10:00) y ponencia CAR-T del Módulo 2 (12:05).
- Fotos de Dra. Milena Villarroel, PhD-PT. Lynn Tanner, Fgo-MsP. Pablo Vásquez, Dra. Claudia Paris y EU. Amaya Muñoz. Hoy se muestra un recuadro gris; la foto aparece sola al guardarla en `img/` con el nombre indicado en `COMO_ACTUALIZAR.md`.
- Logos de auspiciadores: cada nivel (Diamante, Oro, Plata, Bronce, Cooperador) ya está en `index.html` y aparece solo al recibir su primer logo, con el tamaño que le corresponde.
- Galería de ediciones anteriores (2023, 2024, 2025): ya está en `index.html`, oculta junto con su enlace en el menú; aparece sola con la primera foto. Solo fotos con consentimiento de uso de imagen.

## Comportamientos que no deben perderse

- La cuenta regresiva usa hora de Chile y cambia sola de tramo: cierre de preventa (18 oct, 23:59), cierre de tarifa regular (22 nov, 23:59) e inicio de la Jornada (30 nov, 08:30). La banda y la columna destacada de Valores cambian con ella.
- El programa convierte los horarios al huso del visitante y muestra la referencia «Hora de Chile: 08:30 – 18:00».
- El cursor personalizado y el parallax se desactivan en pantallas táctiles y con la preferencia «reducir movimiento».
- Los enlaces externos se abren en pestaña nueva.

## Antes de que sea el sitio oficial

En `index.html` hay una línea `<meta name="robots" content="noindex">` para que Google no indexe esta versión de revisión. Se borra cuando el sitio pase a ser el oficial.

## Contacto

Contenidos: EU. Amaya Muñoz, Coordinadora de Extensión y Vinculación con el Medio · amunoz@fnh.cl

La fuente oficial de programa, personas, patrocinios, valores y enlaces es el Excel de contenidos que mantiene Extensión (`Contenidos_sitio_web_4a_Jornada_TI`, versión vigente).
