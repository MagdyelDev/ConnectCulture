// Gerador de QR Codes do Connect Culture
//
// Uso:  npm install   (só na primeira vez)
//       npm run qrcodes
//
// Cria um QR Code para cada ponto de src/dados/pontos.json em src/assets/img/qrcodes/:
//   https://connectculture-src.vercel.app/pontos/serra-do-giz  ->  qr-code-serra-do-giz.png
//
// Se o endereço do site mudar, troque o SITE abaixo e rode "npm run qrcodes" de novo.
// Também dá para passar o endereço na hora, sem editar o arquivo:
//   Linux/Mac:   BASE_URL=https://novo-endereco npm run qrcodes
//   PowerShell:  $env:BASE_URL="https://novo-endereco"; npm run qrcodes
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const SITE = 'https://connectculture-src.vercel.app';

const BASE_URL = (process.env.BASE_URL || SITE).replace(/\/$/, '');
const ARQUIVO_PONTOS = path.join(__dirname, 'src', 'dados', 'pontos.json');
const PASTA_SAIDA = path.join(__dirname, 'src', 'assets', 'img', 'qrcodes');
const ARQUIVO_LINKS = path.join(__dirname, 'links-qrcode.txt');

async function gerar() {
    const pontos = JSON.parse(fs.readFileSync(ARQUIVO_PONTOS, 'utf8'));
    fs.mkdirSync(PASTA_SAIDA, { recursive: true });

    const links = [];
    for (const ponto of pontos) {
        const link = `${BASE_URL}/pontos/${ponto.slug}`;
        const arquivo = path.join(PASTA_SAIDA, `qr-code-${ponto.slug}.png`);
        await QRCode.toFile(arquivo, link, {
            width: 600,
            margin: 2,
            color: { dark: '#173d63', light: '#ffffff' },
        });
        links.push(link);
        console.log(`${link}  ->  ${path.relative(__dirname, arquivo)}`);
    }

    fs.writeFileSync(ARQUIVO_LINKS, links.join('\n') + '\n', 'utf8');
    console.log(`\n${links.length} QR Codes gerados em src/assets/img/qrcodes/ (lista em links-qrcode.txt)`);
}

gerar().catch((erro) => {
    console.error('Erro ao gerar QR Codes:', erro.message);
    process.exit(1);
});
