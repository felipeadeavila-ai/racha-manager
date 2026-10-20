/* RM_UI_152: interface compacta; estatisticas apenas da partida atual. */
(() => {
  const renderJogo = rmGameView;
  rmGameView = function() {
    const box = document.createElement('div');
    box.innerHTML = renderJogo();
    box.querySelectorAll('button.gp[onclick^="goal("]').forEach(button => {
      const match = button.getAttribute('onclick').match(/^goal\('[ab]','([^']+)'\)/);
      const p = match && P(match[1]);
      if (!p) return;
      const n = estatisticasJogo(G().ev, p);
      let label = button.querySelector('small');
      if (!label) { label = document.createElement('small'); button.append(label); }
      label.className = 'rm-stats152';
      label.innerHTML = '<span aria-hidden="true">⚽ '+n.gols+'</span><span aria-hidden="true">👟 '+n.assistencias+'</span>';
      label.setAttribute('aria-label', n.gols+' '+(n.gols===1?'gol':'gols')+' e '+n.assistencias+' '+(n.assistencias===1?'assistência':'assistências')+' nesta partida');
      label.title = n.gols+' gols · '+n.assistencias+' assistências nesta partida';
    });
    return box.innerHTML;
  };
  TABS[0][2] = rmGameView;
  assist = rmWrapAction(function(aid) {
    const g = G(), p = pend && P(pend.id), a = aid ? P(aid) : null;
    if (!p || !pend) { toast('Selecione novamente quem marcou o gol'); return; }
    g.ev.push({side:pend.side,s:p.name,sId:p.id,a:a?a.name:null,aId:a?a.id:null,t:fmt(g.dur-g.left),ts:Date.now()});
    sv('Gol de '+p.name+' ('+tn(g[pend.side])+')'+(a?', assistência de '+a.name:', sem assistência'));
    pend = null;
    toast('⚽ Gol de '+p.name+(a?' · assist. '+a.name:''));
    R();
  });
  const css = document.createElement('style');
  css.textContent = '.rm-stats152{display:inline-flex;gap:7px;white-space:nowrap;flex-shrink:0;font-variant-numeric:tabular-nums}.rm-stats152 span{display:inline-flex;align-items:center;gap:2px}';
  document.head.append(css);
  R();
})();
