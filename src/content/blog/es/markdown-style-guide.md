---
title: 'Guía de estilo de Markdown'
description: 'Esta es una muestra de la sintaxis básica de Markdown que puedes usar al escribir contenido Markdown en Astro.'
pubDate: 'Jun 19 2024'
heroImage: '../../../assets/blog-placeholder-1.jpg'
---

Esta es una muestra de la sintaxis básica de Markdown que puedes usar al escribir contenido Markdown en Astro.

## Encabezados

Los siguientes elementos HTML `<h1>`—`<h6>` representan seis niveles de encabezado de sección. `<h1>` es el nivel más alto, mientras que `<h6>` es el más bajo.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Párrafo

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Imágenes

### Sintaxis

```markdown
![Texto alternativo](./ruta/completa/o/relativa/de/la/imagen)
```

### Resultado

![marcador de posición del blog](../../../assets/blog-placeholder-about.jpg)

## Citas

El elemento blockquote representa contenido citado de otra fuente, opcionalmente con una atribución que debe estar dentro de un elemento `footer` o `cite`, y opcionalmente con cambios en línea como anotaciones y abreviaturas.

### Cita sin atribución

#### Sintaxis

```markdown
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Nota**: puedes usar _sintaxis de Markdown_ dentro de una cita.
```

#### Resultado

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Nota**: puedes usar _sintaxis de Markdown_ dentro de una cita.

### Cita con atribución

#### Sintaxis

```markdown
> No te comuniques compartiendo memoria; comparte memoria comunicándote.<br>
> — <cite>Rob Pike[^1]</cite>
```

#### Resultado

> No te comuniques compartiendo memoria; comparte memoria comunicándote.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: La cita anterior es un extracto de la [charla](https://www.youtube.com/watch?v=PAAkCSZUG1c) de Rob Pike durante el Gopherfest, el 18 de noviembre de 2015.

## Tablas

### Sintaxis

```markdown
| Cursiva    | Negrita      | Código   |
| ---------- | ------------ | -------- |
| _cursiva_  | **negrita**  | `código` |
```

### Resultado

| Cursiva    | Negrita      | Código   |
| ---------- | ------------ | -------- |
| _cursiva_  | **negrita**  | `código` |

## Bloques de código

### Sintaxis

Podemos usar 3 acentos graves ``` en una línea nueva, escribir el fragmento y cerrar con 3 acentos graves en otra línea nueva. Para resaltar la sintaxis de un lenguaje concreto, escribe el nombre del lenguaje justo después de los primeros 3 acentos graves; por ejemplo: html, javascript, css, markdown, typescript, txt, bash.

````markdown
```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Documento HTML5 de ejemplo</title>
  </head>
  <body>
    <p>Prueba</p>
  </body>
</html>
```
````

### Resultado

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Documento HTML5 de ejemplo</title>
  </head>
  <body>
    <p>Prueba</p>
  </body>
</html>
```

## Tipos de listas

### Lista ordenada

#### Sintaxis

```markdown
1. Primer elemento
2. Segundo elemento
3. Tercer elemento
```

#### Resultado

1. Primer elemento
2. Segundo elemento
3. Tercer elemento

### Lista sin ordenar

#### Sintaxis

```markdown
- Elemento de lista
- Otro elemento
- Y otro elemento más
```

#### Resultado

- Elemento de lista
- Otro elemento
- Y otro elemento más

### Lista anidada

#### Sintaxis

```markdown
- Fruta
  - Manzana
  - Naranja
  - Plátano
- Lácteos
  - Leche
  - Queso
```

#### Resultado

- Fruta
  - Manzana
  - Naranja
  - Plátano
- Lácteos
  - Leche
  - Queso

## Otros elementos — abbr, sub, sup, kbd, mark

### Sintaxis

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> es un formato de imagen de mapa de bits.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Pulsa <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Supr</kbd> para cerrar la sesión.

La mayoría de las <mark>salamandras</mark> son nocturnas y cazan insectos, gusanos y otras criaturas pequeñas.
```

### Resultado

<abbr title="Graphics Interchange Format">GIF</abbr> es un formato de imagen de mapa de bits.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Pulsa <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Supr</kbd> para cerrar la sesión.

La mayoría de las <mark>salamandras</mark> son nocturnas y cazan insectos, gusanos y otras criaturas pequeñas.
