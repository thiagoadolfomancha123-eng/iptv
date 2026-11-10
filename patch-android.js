// Ajusta o projeto Android gerado por "npx cap add android":
// libera tráfego http (links das listas), troca ícones e deixa a abertura preta.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const androidRes = path.join(root, 'android', 'app', 'src', 'main', 'res');
const manifestPath = path.join(root, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');

if (!fs.existsSync(manifestPath)) throw new Error('Projeto Android não encontrado. Rode "npx cap add android" antes.');

// 1) permitir http:// (as listas IPTV costumam usar http)
let manifest = fs.readFileSync(manifestPath, 'utf8');
if (!manifest.includes('usesCleartextTraffic')) {
  manifest = manifest.replace('<application', '<application android:usesCleartextTraffic="true"');
  fs.writeFileSync(manifestPath, manifest);
  console.log('AndroidManifest: usesCleartextTraffic ativado.');
}

// 2) ícones e cores (sobrescreve os padrões do Capacitor)
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}
copyDir(path.join(root, 'resources', 'res'), androidRes);

// 3) tela de abertura: troca qualquer splash.png por um PNG preto
const black = path.join(root, 'resources', 'black.png');
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'splash.png') fs.copyFileSync(black, p);
  }
})(androidRes);

console.log('Projeto Android ajustado.');
