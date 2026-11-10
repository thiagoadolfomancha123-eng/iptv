// Monta a pasta www/: copia o app e troca as bibliotecas da internet pelas locais.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const www = path.join(root, 'www');
const lib = path.join(www, 'lib');

fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(lib, { recursive: true });

const files = [
  [path.join(root, 'node_modules', 'hls.js', 'dist', 'hls.min.js'), path.join(lib, 'hls.min.js')],
  [path.join(root, 'node_modules', 'mpegts.js', 'dist', 'mpegts.js'), path.join(lib, 'mpegts.js')]
];
for (const [from, to] of files) {
  if (!fs.existsSync(from)) throw new Error('Arquivo não encontrado: ' + from + ' (rode "npm install" antes)');
  fs.copyFileSync(from, to);
}

let html = fs.readFileSync(path.join(root, 'src', 'index.html'), 'utf8');
html = html.replace(/<script src="https:\/\/[^"]*hls[^"]*"><\/script>/, '<script src="lib/hls.min.js"></script>');
html = html.replace(/<script src="https:\/\/[^"]*mpegts[^"]*"><\/script>/, '<script src="lib/mpegts.js"></script>');
if (!html.includes('lib/hls.min.js') || !html.includes('lib/mpegts.js')) {
  throw new Error('Não consegui trocar as tags de script das bibliotecas em src/index.html');
}
fs.writeFileSync(path.join(www, 'index.html'), html);
console.log('www/ pronta.');
