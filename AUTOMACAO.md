# Automação — base 1.5.1

Rascunho na branch automacao-1.5.1. Não publica produção nesta branch.

PENDENTE: importar a pasta public e as regras exatas da 1.5.1. Os arquivos antigos da raiz não são usados no deploy. Configurar a autorização, revisar a migração e executar os testes antes de integrar em main.

O workflow confere arquivos e sintaxe e inicia o emulador Firestore com o projeto fictício demo-racha-manager para compilar regras. Não substitui testes de autorização, testes de jogo ou som no iPhone.

Publicação somente em main, após validar, com a variável FIREBASE_DEPLOY_ENABLED=true e o secret FIREBASE_SERVICE_ACCOUNT_RACHA_MANAGER_V1. Guardar a chave SOMENTE no GitHub Actions Secret; nunca no código ou na conversa. A conta de serviço precisa de permissões para Hosting e Security Rules. A integração oficial de Hosting, sozinha, não garante permissão de publicar regras.

O environment producao deve ser configurado com revisor, quando disponível no plano, e main deve ter proteção e revisão obrigatória. O YAML não cria essas proteções. Não habilitar deploy antes disso.

Após ativação, cada push aprovado em main publica Hosting e regras. Também é possível executar manualmente pelo Actions em main. Um deploy conjunto não é atômico entre os dois serviços: conferir compatibilidade antes de mudar regras.

A CLI usa a versão disponível no npm: fixar a versão após a primeira execução real validada. A automação não força recarga dos celulares. Não instalar scripts antigos por cima da fonte do GitHub.
