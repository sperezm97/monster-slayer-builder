# Guía y Reglas para Modelos de IA (Gemini.md)

Este documento establece las reglas obligatorias de desarrollo y toma de decisiones arquitectónicas para cualquier modelo de inteligencia artificial que trabaje en el proyecto **Monster Slayer Builder**.

---

## 📋 Reglas Obligatorias antes de realizar cambios

### 1. Consultar el PRD (Product Requirements Document)
Antes de añadir nuevas características, interfaces, pantallas o modificar flujos de usuario, debes consultar el documento del PRD para verificar que el cambio esté alineado con el diseño del producto y los objetivos de la aplicación.
*   **Archivo:** [docs/prd_monster_slayer_builder.md](./docs/prd_monster_slayer_builder.md) (o [Copia en Artefactos](file:///Users/sebas/.gemini/antigravity/brain/fb478ee0-f39e-4cdc-a9d7-dabb5868f329/prd_monster_slayer_builder.md))

### 2. Consultar el TRD (Technical Requirements Document)
Antes de modificar tipos de TypeScript, cambiar fórmulas matemáticas de estadísticas, reestructurar directorios, o alterar el esquema de guardado en LocalStorage, debes leer y cumplir estrictamente el TRD para evitar romper los cálculos dinámicos.
*   **Archivo:** [docs/trd_monster_slayer_builder.md](./docs/trd_monster_slayer_builder.md) (o [Copia en Artefactos](file:///Users/sebas/.gemini/antigravity/brain/fb478ee0-f39e-4cdc-a9d7-dabb5868f329/trd_monster_slayer_builder.md))

### 3. Actualizar el ADR (Architectural Decision Record)
Si vas a realizar algún cambio que afecte la **arquitectura del sistema** (como migrar la persistencia de LocalStorage a una base de datos remota, integrar APIs de terceros, cambiar el framework de estilos o el gestor de estados globales), es **obligatorio** que documentes la decisión añadiendo un nuevo bloque numerado en el registro de decisiones arquitectónicas (ADR).
*   **Archivo:** [docs/adr_monster_slayer_builder.md](./docs/adr_monster_slayer_builder.md) (o [Copia en Artefactos](file:///Users/sebas/.gemini/antigravity/brain/fb478ee0-f39e-4cdc-a9d7-dabb5868f329/adr_monster_slayer_builder.md))
