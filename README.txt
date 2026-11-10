SINTONIA - projeto do APK (Capacitor)

Este projeto empacota o app Sintonia (src/index.html) como um app Android.
O projeto Android em si NAO vem pronto: ele e gerado pelo comando "npx cap add android".

=========================================================
CAMINHO 1 - GitHub Actions (sem instalar nada no PC)
=========================================================
1. Crie uma conta no GitHub e um repositorio novo (pode ser privado).
2. Envie TODO o conteudo desta pasta para o repositorio, incluindo a pasta
   oculta ".github" (arraste as pastas para a pagina "Add file > Upload files").
3. No repositorio, abra a aba "Actions", escolha "Gerar APK" e clique em
   "Run workflow". (Ele tambem roda sozinho a cada envio.)
4. Quando terminar (alguns minutos), abra a execucao, desca ate "Artifacts" e
   baixe "sintonia-apk". Dentro do zip esta o app-debug.apk.
5. No celular, instale o APK. O Android vai pedir para permitir instalar apps
   de fontes desconhecidas para o navegador/gerenciador de arquivos usado.

Se a execucao falhar, abra o passo em vermelho, copie as ultimas linhas do
log e me envie.

=========================================================
CAMINHO 2 - no seu PC
=========================================================
Requisitos: Node.js 22 (ou 20+), JDK 21 e Android SDK (vem com o Android Studio).
Defina ANDROID_HOME (ou crie android/local.properties com sdk.dir=...).

  npm install
  node scripts/prepare-www.js
  npx cap add android
  node scripts/patch-android.js
  npx cap sync android
  cd android
  ./gradlew assembleDebug        (no Windows: gradlew.bat assembleDebug)

O APK fica em: android/app/build/outputs/apk/debug/app-debug.apk

=========================================================
Depois de mudar o app
=========================================================
Substitua src/index.html pela versao nova e rode de novo o Caminho 1 ou 2.
Para atualizar um APK ja instalado, o novo precisa ter o mesmo applicationId
(com.sintonia.player) e ser assinado com a mesma chave de depuracao.
