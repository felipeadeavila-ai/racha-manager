export function estatisticasJogo(eventos, jogador) {
  const total = {gols: 0, assistencias: 0};
  for (const e of eventos || []) {
    if (e.sId ? e.sId === jogador.id : e.s === jogador.name) total.gols++;
    if (e.aId ? e.aId === jogador.id : e.a && e.a === jogador.name) total.assistencias++;
  }
  return total;
}
