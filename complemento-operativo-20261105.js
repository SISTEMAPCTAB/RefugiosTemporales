/* Refugios Temporales IPCET · Complemento de claridad operativa.
   No reemplaza expedientes, verificación, acciones ni activación existentes.
   Los campos tienen id y son capturados automáticamente en formData por el núcleo de la app. */
(function () {
  'use strict';
  if (window.__rtComplemento20261105) return;
  window.__rtComplemento20261105 = true;
  const byId = id => document.getElementById(id);
  const html = (tag, cls, markup) => {
    const el = document.createElement(tag);
    el.className = cls;
    el.innerHTML = markup;
    return el;
  };
  function init() {
    const capacity = byId('capacidad');
    const prep = byId('preparacion');
    const verify = byId('verificacion');
    const activation = byId('activacion');
    if (!capacity || !prep || !verify || !activation) return;

    const label = capacity.closest('.field')?.querySelector('label');
    if (label && label.textContent.trim() === 'Capacidad registrada') {
      label.textContent = 'Capacidad física estimada (personas)';
    }
    if (!byId('rtCapacityOperational')) {
      const field = html('div','field','<label for="rtCapacityOperational">Capacidad operativa disponible (personas)</label><input id="rtCapacityOperational" type="number" min="0" step="1" placeholder="Según condiciones reales verificadas"/><small class="source">Considere sanitarios, agua, accesibilidad, seguridad, personal y servicios. No debe exceder la capacidad física estimada sin justificación técnica.</small>');
      capacity.closest('.field')?.insertAdjacentElement('afterend',field);
    }
    if (!byId('rtOperationalReason')) {
      const field = html('div','field','<label for="rtOperationalReason">Justificación de la capacidad operativa</label><textarea id="rtOperationalReason" placeholder="Limitaciones detectadas, necesidades de la población y condiciones de servicio"></textarea>');
      prep.querySelector('[data-save="expediente"]')?.closest('.actions')?.insertAdjacentElement('beforebegin',field);
    }
    if (!byId('rtStatusStages')) {
      const card = html('div','card','<h3>Situación del inmueble</h3><p class="source">Registrar el inmueble no significa que esté verificado ni autorizado para abrir. La verificación técnica y la decisión de activación son etapas diferentes.</p><div class="grid3"><div class="field"><label>Registro</label><strong id="rtStageRegistered">Pendiente</strong></div><div class="field"><label>Verificación</label><strong id="rtStageVerified">Pendiente</strong></div><div class="field"><label>Activación</label><strong id="rtStageActivated">Sin activar</strong></div></div>');
      prep.querySelector('.module-purpose')?.insertAdjacentElement('afterend',card);
      card.id = 'rtStatusStages';
    }
    if (!byId('rtVerificationReminder')) {
      const notice = html('div','notice','<strong>Aspectos de la verificación:</strong> seguridad y funcionalidad; agua, energía y saneamiento; accesibilidad; condiciones sanitarias; comunicaciones; rutas de acceso y evacuación; riesgos del entorno y responsable. Registre cada resultado en los criterios existentes y, si requiere atención, genere una acción correctiva con responsable y seguimiento.');
      notice.id = 'rtVerificationReminder';
      verify.querySelector('.module-purpose')?.insertAdjacentElement('afterend',notice);
    }
    if (!byId('rtActivationCaution')) {
      const notice = html('div','notice warn','<strong>Antes de activar:</strong> compruebe la revisión rápida, los pendientes prioritarios y la capacidad operativa disponible. La decisión de apertura corresponde a la autoridad competente y se documenta en el registro de activación existente.');
      notice.id = 'rtActivationCaution';
      activation.querySelector('.module-purpose')?.insertAdjacentElement('afterend',notice);
    }

    const operational = byId('rtCapacityOperational');
    const update = () => {
      const physical = Number(capacity.value);
      const current = Number(operational.value);
      operational.setCustomValidity(capacity.value !== '' && operational.value !== '' && current > physical ? 'La capacidad operativa no puede exceder la física sin evaluación y ajuste del dato de referencia.' : '');
      const name = (byId('inmueble')?.value || byId('verifyShelterName')?.value || '').trim();
      const selected = verify.querySelectorAll('input[type="radio"]:checked').length;
      const badge = (byId('activeBadge')?.textContent || '').trim();
      byId('rtStageRegistered').textContent = name ? 'Registrado' : 'Pendiente';
      byId('rtStageVerified').textContent = selected ? 'Revisión registrada (' + selected + ' respuestas)' : 'Pendiente';
      byId('rtStageActivated').textContent = badge || 'Sin activar';
    };
    document.addEventListener('input',update);
    document.addEventListener('change',update);
    // El núcleo restaura expedientes de forma asíncrona; actualizar solo las etiquetas,
    // sin modificar respuestas, estados ni los flujos de guardado existentes.
    window.addEventListener('hashchange',update);
    if (window.MutationObserver && byId('activeBadge')) {
      new MutationObserver(update).observe(byId('activeBadge'),{childList:true,characterData:true,subtree:true});
    }
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();