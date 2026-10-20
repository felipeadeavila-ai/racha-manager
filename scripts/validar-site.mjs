import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const config=JSON.parse(fs.readFileSync('firebase.json','utf8'));
const project=JSON.parse(fs.readFileSync('.firebaserc','utf8'));
assert.equal(project.projects.default,'racha-manager-v1');
assert.equal(config.hosting.public,'public');
assert.equal(config.firestore.rules,'firestore.rules');
assert.ok(fs.existsSync('firestore.rules'),'Importe as regras junto com o site');
const html=fs.readFileSync('public/index.html','utf8');
const v=html.match(/versão\s+(\d+)\.(\d+)(?:\.(\d+))?/u);
assert.ok(v && (+v[1]>1 || +v[1]===1 && (+v[2]>5 || +v[2]===5 && +(v[3]||0)>=1)), 'Importe a base 1.5.1 ou posterior');
for(const f of ['firebase-config.js','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png']) assert.ok(fs.existsSync('public/'+f),'Arquivo ausente: '+f);
JSON.parse(fs.readFileSync('public/manifest.webmanifest','utf8'));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'racha-'));
let count=0;
try {
 for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
  if(/\bsrc\s*=/i.test(m[1])) continue;
  const f=path.join(tmp,`${++count}.js`);fs.writeFileSync(f,m[2]);
  const r=spawnSync(process.execPath,['--check',f],{encoding:'utf8'});
  assert.equal(r.status,0,r.stderr);
 }
 assert.ok(count>0);
} finally { fs.rmSync(tmp,{recursive:true,force:true}); }
console.log(`${count} blocos JavaScript conferidos. Testes funcionais e de permissões ainda são necessários.`);
