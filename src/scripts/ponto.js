function slugDaPagina() {
    const daUrl = new URLSearchParams(location.search).get('id');
    if (daUrl) return daUrl;
    const partes = location.pathname.split('/').filter(Boolean);
    return (partes.pop() || '').replace(/\.html$/, '');
}

function montarCarrossel(imagens, nome) {
    if (!imagens.length) {
        return `<div class="carrossel carrossel-vazio"><span class="sem-foto">${t('semFoto')}</span></div>`;
    }
    const slides = imagens.map((imagem, indice) => {
        const credito = [imagem.legenda, imagem.fonte ? `${t('fonte')}: ${imagem.fonte}` : ''].filter(Boolean).join(' · ');
        return `
            <figure class="carrossel-slide${indice === 0 ? ' ativo' : ''}">
                <img src="${caminhoImagem(imagem.arquivo)}" alt="${escapar(nome)}">
                ${credito ? `<figcaption>${escapar(credito)}</figcaption>` : ''}
            </figure>`;
    }).join('');
    const controles = imagens.length > 1 ? `
        <button class="carrossel-seta anterior" type="button" aria-label="${t('anterior')}">‹</button>
        <button class="carrossel-seta proxima" type="button" aria-label="${t('proxima')}">›</button>
        <div class="carrossel-pontos">
            ${imagens.map((_, indice) => `<button type="button" class="${indice === 0 ? 'ativo' : ''}" aria-label="${indice + 1}"></button>`).join('')}
        </div>` : '';
    return `
        <div class="carrossel">
            ${slides}
            ${controles}
            <button class="carrossel-ampliar" type="button">${t('ampliar')}</button>
        </div>`;
}

function ativarCarrossel() {
    const carrossel = document.querySelector('.carrossel');
    if (!carrossel || carrossel.classList.contains('carrossel-vazio')) return;
    const slides = [...carrossel.querySelectorAll('.carrossel-slide')];
    const bolinhas = [...carrossel.querySelectorAll('.carrossel-pontos button')];
    let atual = 0;
    let inicioToque = null;

    function mostrar(indice) {
        atual = (indice + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle('ativo', i === atual));
        bolinhas.forEach((bolinha, i) => bolinha.classList.toggle('ativo', i === atual));
    }

    if (slides.length > 1) {
        carrossel.querySelector('.anterior').addEventListener('click', () => mostrar(atual - 1));
        carrossel.querySelector('.proxima').addEventListener('click', () => mostrar(atual + 1));
        bolinhas.forEach((bolinha, i) => bolinha.addEventListener('click', () => mostrar(i)));
        carrossel.addEventListener('touchstart', (evento) => {
            inicioToque = evento.touches[0].clientX;
        });
        carrossel.addEventListener('touchend', (evento) => {
            if (inicioToque === null) return;
            const distancia = evento.changedTouches[0].clientX - inicioToque;
            if (Math.abs(distancia) > 40) mostrar(distancia < 0 ? atual + 1 : atual - 1);
            inicioToque = null;
        });
    }

    const janela = document.querySelector('#foto-ampliada');
    carrossel.querySelector('.carrossel-ampliar').addEventListener('click', () => {
        janela.querySelector('img').src = slides[atual].querySelector('img').src;
        janela.classList.add('aberta');
    });
    janela.addEventListener('click', () => janela.classList.remove('aberta'));
}

function blocoCuriosidades(ponto) {
    if (!ponto.curiosidades.length) return '';
    return `
        <h3>${t('curiosidades')}</h3>
        <ul class="curiosidades">
            ${ponto.curiosidades.map((item) => `<li>${escapar(traduzir(item, 'texto'))}</li>`).join('')}
        </ul>`;
}

function blocoMapa(ponto) {
    const lat = Number(ponto.latitude);
    const lon = Number(ponto.longitude);
    if (!lat || !lon) return '';
    const caixa = [lon - 0.01, lat - 0.007, lon + 0.01, lat + 0.007].join(',');
    return `
        <article class="ponto-caixa">
            <h3>${t('localizacao')}</h3>
            ${ponto.endereco ? `<p>${escapar(ponto.endereco)}</p>` : ''}
            <iframe class="mapa" title="${t('localizacao')}" loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=${caixa}&layer=mapnik&marker=${lat},${lon}"></iframe>
            <a class="hero-button" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}">${t('comoChegar')}</a>
        </article>`;
}

function blocoQrCode(ponto) {
    const arquivo = `${RAIZ}/assets/img/qrcodes/qr-code-${ponto.slug}.png`;
    return `
        <article class="ponto-caixa qrcode">
            <h3>${t('qrTitulo')}</h3>
            <img src="${arquivo}" alt="QR Code - ${escapar(ponto.nome)}">
            <p>${t('qrTexto')}</p>
            <a class="botao-contorno" href="${arquivo}" download>${t('qrBaixar')}</a>
        </article>`;
}

async function montarPonto() {
    const area = document.querySelector('#conteudo-ponto');
    try {
        const { pontos } = await carregarDados();
        const ponto = pontos.find((item) => item.slug === slugDaPagina());
        if (!ponto) {
            area.innerHTML = `
                <section class="content-section"><div class="section-inner">
                    <p class="aviso">${t('naoEncontrado')}</p>
                    <a class="hero-button" href="${RAIZ}/pages/pontos.html">${t('voltarPontos')}</a>
                </div></section>`;
            return;
        }
        const cidade = ponto.dadosCidade;
        const vizinhos = ordenarComFotoPrimeiro(pontos.filter((item) => item.cidade === ponto.cidade && item.slug !== ponto.slug)).slice(0, 3);
        document.title = `${ponto.nome} | Connect Culture`;

        area.innerHTML = `
            <section class="page-banner places-banner ponto-banner">
                <div class="section-inner page-banner-content">
                    <span class="eyebrow">${escapar(nomeRegiao(cidade.microrregiao))} · <a href="${linkCidade(cidade.slug)}">${escapar(cidade.nome)}</a></span>
                    <h1>${escapar(ponto.nome)}</h1>
                    <p>${escapar(traduzir(ponto, 'categoria'))}</p>
                </div>
            </section>

            <section class="content-section point-section">
                <div class="section-inner point-feature">
                    ${montarCarrossel(ponto.imagens, ponto.nome)}
                    <div class="point-copy">
                        <span class="place-category">${escapar(traduzir(ponto, 'categoria'))}</span>
                        <h2>${escapar(ponto.nome)}</h2>
                        <p class="place-location"><a href="${linkCidade(cidade.slug)}">${escapar(cidade.nome)} - PE</a></p>
                        <div class="point-language">
                            ${paragrafos(traduzir(ponto, 'descricao'))}
                            ${blocoCuriosidades(ponto)}
                        </div>
                    </div>
                </div>
            </section>

            <section class="content-section ponto-extras">
                <div class="section-inner ponto-extras-grid">
                    ${blocoMapa(ponto)}
                    ${blocoQrCode(ponto)}
                </div>
            </section>

            ${vizinhos.length ? `
            <section class="content-section places-section">
                <div class="section-inner">
                    <div class="section-heading section-heading-row">
                        <h2>${t('outrosPontos')} ${escapar(cidade.nome)}</h2>
                        <a class="text-link" href="${linkCidade(cidade.slug)}">${t('verCidade')} ↗</a>
                    </div>
                    <div class="places-grid">${vizinhos.map(cartaoPonto).join('')}</div>
                </div>
            </section>` : ''}`;
        ativarCarrossel();
    } catch (erro) {
        mostrarErro(area);
    }
}

montarPonto();
