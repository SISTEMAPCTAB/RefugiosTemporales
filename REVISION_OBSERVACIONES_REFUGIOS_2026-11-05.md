# Ajustes solicitados · Refugios Temporales · 5 noviembre 2026

**Estado:** propuesta de cambios pendiente de integración y pruebas. No altera la publicación ni el archivo principal.

## Objetivo
Incorporar observaciones institucionales sin cambiar diseño, navegación, almacenamiento ni flujos vigentes.

## Cambios puntuales previstos en index.html

1. Renombrar etiqueta **Capacidad registrada** a **Capacidad física estimada (personas)** conservando el id `capacidad` y añadir inmediatamente un campo numérico **Capacidad operativa disponible (personas)** con id `capacidadOperativa`.
2. Después de **Antecedentes**, añadir controles de la clase existente `field`: estado del inmueble `situacionInmueble` (Registrado pendiente de verificación; En verificación; Verificado sujeto a revisión preactivación; No disponible temporalmente; Requiere atención correctiva); fecha `fechaDisponibilidad`; y texto de observaciones `observacionesDisponibilidad`.
3. Incluir un aviso con clase existente `notice`: «Registro ≠ verificación ≠ activación. La inclusión en el sistema no autoriza la apertura».
4. Ampliar únicamente el texto introductorio de verificación para mencionar seguridad, funcionalidad, servicios básicos, accesibilidad, saneamiento, comunicaciones, rutas de acceso y evacuación, riesgos del entorno y responsable. Reutilizar los 76 criterios ya integrados.
5. En activación, precisar que el registro y la verificación no equivalen a autorización. Incluir un aviso para contrastar población prevista contra capacidad operativa, necesidades y condiciones actuales.
6. Emplear el módulo de acciones correctivas ya existente para seguimiento, responsables y evidencias; no duplicar subsistemas.

## Compatibilidad
La aplicación utiliza `captureForms()` y `restoreForms()` sobre `input,select,textarea`, por lo que los nuevos campos con `id` se pueden incorporar al estado `formData` sin cambiar su esquema ni borrar registros existentes. No cambiar claves de IndexedDB, claves de localStorage, nombres de campos vigentes, identificadores de secciones o lógica de activación.

## Validaciones requeridas antes de fusionar
- Abrir expediente antiguo y comprobar que conserva sus registros.
- Capturar y volver a abrir nuevos campos; respaldar/restaurar expediente.
- Verificar que las 76 preguntas, acciones correctivas y PDF continúan funcionando.
- Comprobar navegación móvil y escritorio sin cambios de diseño.
- Confirmar que los avisos no constituyen automáticamente un bloqueo o autorización de apertura.

**Nota técnica:** El archivo index.html tiene aproximadamente 6 MB y la escritura remota devolvió un error de transporte. Esta rama no se considera una implementación terminada.
