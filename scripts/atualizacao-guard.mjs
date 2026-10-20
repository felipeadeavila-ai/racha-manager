export function motivoBloqueioAtualizacao(s) {
  if (!s.conectado) return 'Aguarde a conexão com o servidor.';
  if (s.erro) return 'Resolva o erro de salvamento antes de atualizar.';
  if (s.salvando) return 'Aguarde terminar de salvar.';
  if (s.rascunho) return 'Conclua ou cancele a edição antes de atualizar.';
  return '';
}
