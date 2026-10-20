import test from 'node:test';
import assert from 'node:assert/strict';
import {motivoBloqueioAtualizacao as why} from './atualizacao-guard.mjs';
const ready={conectado:true,erro:false,salvando:false,rascunho:false};
test('atualizar permitido sem pendências',()=>assert.equal(why(ready),''));
test('bloqueia offline',()=>assert.match(why({...ready,conectado:false}),/conexão/));
test('bloqueia erro de salvamento',()=>assert.match(why({...ready,erro:true}),/erro/));
test('bloqueia gravação pendente',()=>assert.match(why({...ready,salvando:true}),/salvar/));
test('bloqueia lance ou formulário em edição',()=>assert.match(why({...ready,rascunho:true}),/edição/));
