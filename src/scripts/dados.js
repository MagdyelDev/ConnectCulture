const RAIZ = document.body.dataset.raiz || '.';

async function carregarDados() {
    const [cidades, pontos] = await Promise.all([
        fetch(RAIZ + '/dados/cidades.json').then((resposta) => resposta.json()),
        fetch(RAIZ + '/dados/pontos.json').then((resposta) => resposta.json()),
    ]);
    const porSlug = {};
    cidades.forEach((cidade) => {
        porSlug[cidade.slug] = cidade;
    });
    pontos.forEach((ponto) => {
        ponto.dadosCidade = porSlug[ponto.cidade];
    });
    return { cidades, pontos, porSlug };
}

function mostrarErro(elemento) {
    elemento.innerHTML = `<p class="aviso">${t('erroDados')}</p>`;
}

function escapar(texto) {
    return String(texto || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function semAcento(texto) {
    return String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function paragrafos(texto) {
    return String(texto || '')
        .split(/\n\s*\n/)
        .filter((parte) => parte.trim())
        .map((parte) => `<p>${escapar(parte)}</p>`)
        .join('');
}

function resumo(texto, limite = 130) {
    const limpo = String(texto || '').replace(/\s+/g, ' ').trim();
    if (limpo.length <= limite) return limpo;
    return limpo.slice(0, limite).replace(/\s+\S*$/, '') + '...';
}

function caminhoImagem(arquivo) {
    return RAIZ + '/assets/img/pontos/' + arquivo;
}

function linkPonto(slug) {
    return RAIZ + '/pages/ponto.html?id=' + slug;
}

function linkCidade(slug) {
    return RAIZ + '/pages/cidade.html?id=' + slug;
}

function nomeRegiao(regiao) {
    if (IDIOMA !== 'en') return regiao;
    if (regiao === 'Outras regiões') return 'Other regions';
    return regiao;
}

function cartaoPonto(ponto) {
    const foto = ponto.imagens[0];
    const imagem = foto
        ? `<img src="${caminhoImagem(foto.arquivo)}" alt="${escapar(ponto.nome)}" loading="lazy">`
        : `<span class="sem-foto">${t('semFoto')}</span>`;
    return `
        <article class="place-card">
            <a class="place-card-image" href="${linkPonto(ponto.slug)}" aria-label="${escapar(ponto.nome)}">${imagem}</a>
            <div class="place-card-content">
                <span class="place-category">${escapar(traduzir(ponto, 'categoria'))}</span>
                <h3>${escapar(ponto.nome)}</h3>
                <p class="place-location">${escapar(ponto.dadosCidade.nome)} - PE</p>
                <p>${escapar(resumo(traduzir(ponto, 'descricao')))}</p>
                <a class="place-explore" href="${linkPonto(ponto.slug)}">${t('explorar')} <span aria-hidden="true">↗</span></a>
            </div>
        </article>`;
}

function ordenarComFotoPrimeiro(lista) {
    return [...lista].sort((a, b) => (b.imagens.length > 0) - (a.imagens.length > 0) || a.nome.localeCompare(b.nome, 'pt'));
}
