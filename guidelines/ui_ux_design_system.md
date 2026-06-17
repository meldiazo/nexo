# Documentación Técnica de Diseño UI/UX - Sistema de Diseño 

## 1. Sistema de Tipografía
El sistema hace uso de la fuente Sans-Serif nativa del sistema (System UI / Inter por convención de Tailwind), estructurada bajo parámetros semánticos estrictos.

**Títulos (Headings)**
*   **H1**: 24px (`1.5rem`), Peso: **Medium** (500), Line-Height: 1.5
*   **H2**: 20px (`1.25rem`), Peso: **Medium** (500), Line-Height: 1.5
*   **H3**: 18px (`1.125rem`), Peso: **Medium** (500), Line-Height: 1.5
*   **H4**: 16px (`1rem`), Peso: **Medium** (500), Line-Height: 1.5

**Cuerpo y Componentes (Body & UI Elements)**
*   **Cuerpo (p, div)**: 16px (`var(--font-size)` base), Peso: **Regular** (400), Line-Height: 1.5
*   **Etiquetas de Formularios (label)**: 16px, Peso: **Medium** (500)
*   **Campos de Entrada (input)**: 16px, Peso: **Regular** (400)
*   **Botones**: 14px (`text-sm` por sobre-escritura) y 16px base, Peso: **Medium** (500)

---

## 2. Paleta de Colores
Las variables de color están estructuradas principalmente en códigos Hexadecimales absolutos y variables OKLCH para cálculos dinámicos de contraste.

**Colores Neutros y Estructurales (Light Mode)**
*   **Fondo Base (Background)**: `#ffffff` (Blanco puro)
*   **Texto Principal (Foreground)**: `oklch(0.145 0 0)` (Gris Oscuro / Casi Negro)
*   **Fondos de Componentes (Muted)**: `#ececf0`
*   **Texto Secundario (Muted Foreground)**: `#717182`
*   **Bordes (Border)**: `rgba(0, 0, 0, 0.1)` 
*   **Fondo de Campos (Input Background)**: `#f3f3f5`

**Colores de Marca y Estados**
*   **Primario (Primary)**: `#030213` (Negro Naval / Medianoche)
*   **Acento (Accent)**: `#e9ebef` (Gris frío)
*   **Destructivo / Alerta / Error**: `#d4183d` (Rojo intenso)
*   **Texto sobre Destructivo**: `#ffffff`

---

## 3. Geometría UI
El diseño favorece un enfoque estilo "Flat/Lineal" limpio, priorizando bordes sobre sombras difuminadas, manteniendo la consistencia de redondeo a partir de una variable base (`var(--radius)` = 10px).

**Radio de Borde (Border Radius)**
*   **Base del Sistema**: `10px` (`0.625rem`)
*   **Botones e Inputs (md)**: `8px` (*Calculado: Base - 2px*)
*   **Tarjetas y Contenedores (xl)**: `14px` (*Calculado: Base + 4px*)

**Sombras (Box Shadow)**
*   **Elevación Standard**: No utiliza drop-shadows convencionales, optando por una delimitación a través de un borde sólido sutil (`border: 1px solid rgba(0, 0, 0, 0.1)`).
*   **Estados de Enfoque (Focus Rings)**: Anillos concéntricos semitransparentes de `3px` generados en el hover/focus de controles interactivos (calculados con la variable `--ring`).

---

## 4. Sistema de Espaciado
Basado en una grilla implícita (múltiplos de 4px), asegurando ritmo visual constante y jerarquía en la disposición de los datos.

**Contenedores principales (Cards)**
*   **Paddings (Interior)**: `24px` simétricos (Top, Left, Right, Bottom) en las secciones principales (Cabecera, Contenido y Pie). (`px-6`, `py-6`).
*   **Gap (Margen interno entre elementos)**: `24px` (`gap-6`) para separar verticalmente la estructura del contenedor.

**Botones (Buttons)**
*   **Estándar (Default)**: Padding Horizontal de `16px`, Padding Vertical de `8px`. Altura fija del bloque: `36px`. Brecha interactiva (Icono-Texto): `8px`.
*   **Pequeño (Small)**: Padding Horizontal de `12px`. Altura fija: `32px`.
*   **Grande (Large)**: Padding Horizontal de `24px`. Altura fija: `40px`.

**Campos de Entrada (Inputs / Formularios)**
*   **Padding**: Horizontal de `12px`, Vertical de `4px`.
*   **Altura (Height)**: Fija en `36px` para alineación perfecta con botones estándar adyacentes.
