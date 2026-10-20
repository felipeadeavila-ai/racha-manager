/* RM_UPDATE_152: aviso voluntario; nunca recarrega sozinho. */
(() => {
  if (window.RM_UPDATES) return;
  const current = window.RM_RELEASE;
  let target = null, deferred = '', fetching = false, last = 0;
  try { deferred = sessionStorage.getItem('rm_update_later') || ''; } catch (_) {}
  function reason() {
    const name = document.getElementById('rm-login-name');
    return motivoBloqueioAtualizacao({
      conectado: navigator.onLine && stateReady && liveReady,
      erro: !!(errState || errLive || readErr),
      salvando: !!(busy || busyL || dirty || dirtyL || colorTimer),
      rascunho: !!(pend || dg || _dl || (me && can('jog') && appHash() !== appFingerprint) || (name && name.value.trim() !== rmOperator))
    });
  }
  function paint() {
    let box = document.getElementById('rm-update-banner');
    if (!target || target.build === deferred) { if (box) box.remove(); return; }
    if (!box) {
      box = document.createElement('section'); box.id = 'rm-update-banner';
      box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite');
      const text = document.createElement('span'); text.textContent = 'Nova atualização disponível';
      const now = document.createElement('button'); now.id = 'rm-update-now'; now.textContent = 'Atualizar agora'; now.onclick = apply;
      const later = document.createElement('button'); later.textContent = 'Depois'; later.onclick = hide;
      const status = document.createElement('small'); status.id = 'rm-update-reason';
      box.append(text, now, later, status); document.getElementById('app').before(box);
    }
    const why = reason();
    document.getElementById('rm-update-now').disabled = !!why;
    document.getElementById('rm-update-reason').textContent = why;
  }
  function hide() {
    if (target) { deferred = target.build; try { sessionStorage.setItem('rm_update_later', deferred); } catch (_) {} }
    paint();
  }
  async function check(force = false) {
    if (fetching || document.hidden || !navigator.onLine || (!force && Date.now() - last < 5000)) return false;
    fetching = true; last = Date.now();
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch('/version.json?check=' + Date.now(), {cache:'no-store',credentials:'same-origin',signal:controller.signal});
      if (!response.ok) return false;
      const next = await response.json();
      if (!next || typeof next.version !== 'string' || !/^\d+\.\d+\.\d+$/.test(next.version) || typeof next.build !== 'string' || !/^[a-f0-9]{16}$/.test(next.build)) return false;
      target = next.build !== current.build ? next : null; paint(); return true;
    } catch (_) { return false; }
    finally { clearTimeout(timeout); fetching = false; }
  }
  async function apply() {
    let why = reason(); if (why) { toast(why); return; }
    if (!await check(true)) { toast('Não foi possível conferir a atualização. Tente novamente.'); return; }
    if (!target) { toast('Este aparelho já está na versão publicada.'); return; }
    why = reason(); if (why) { toast(why); return; }
    if (G().run && !confirm('Há uma partida em andamento. Atualizar somente este aparelho agora?')) return;
    why = reason(); if (why) { toast(why); return; }
    const url = new URL(location.href); url.searchParams.set('rm-build', target.build);
    location.replace(url.href);
  }
  const css = document.createElement('style');
  css.textContent = '#rm-update-banner{max-width:956px;margin:6px auto;padding:8px 10px;border:1px solid #67b887;border-radius:8px;background:#e9fff0;color:#174b2b;display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:13px}#rm-update-banner>span{flex:1;min-width:150px}#rm-update-banner button{padding:6px 9px;min-height:36px}#rm-update-reason{flex-basis:100%}#rm-update-reason:empty{display:none}';
    document.head.append(css);
  window.RM_UPDATES = {check:() => check(true),apply,hide,current};
  window.addEventListener('focus', () => check()); window.addEventListener('online', () => check());
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  setInterval(() => check(), 60000); setInterval(() => { if (!document.hidden && target) paint(); }, 1000);
  check();
})();
