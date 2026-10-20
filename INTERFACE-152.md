# Interface 1.5.2

A fonte public/index.html continua sendo a base 1.5.1 importada. Antes de validar e publicar, scripts/preparar-152.mjs gera a versão 1.5.2 no workspace do GitHub Actions, usando src/ui-152.js e scripts/estatisticas-jogo.mjs. Não editar ou publicar o HTML base sozinho como se fosse o resultado final.

Preservados da 1.5.1: tela separada de entrada, opção só acompanhar, ícone de identidade, operação anônima com substituição/desfazer/finalizar, ausência do painel permanente de áudio e teste de som no menu do ícone. A rotina de áudio não é alterada.

Novo: indicadores por jogador na partida atual: ⚽ gols e 👟 assistências. Desfazer e finalizar atualizam as contagens. Novos lances guardam IDs de autor/assistente. Lances antigos sem IDs continuam usando nomes; homônimos nesses lances antigos não podem ser desambiguados automaticamente.

Executar: node --test scripts/testar-152.mjs; node scripts/preparar-152.mjs; node scripts/validar-site.mjs. Testes de interface locais usam persistência simulada; não comprovam permissões reais nem áudio físico. As regras Firestore não mudam nesta atualização.

Deploy permanece bloqueado por FIREBASE_DEPLOY_ENABLED=false. Configurações de ambiente e proteção foram informadas pelo proprietário; autorização efetiva de publicação ainda precisa ser testada. Não integrar nem publicar automaticamente esta revisão.
