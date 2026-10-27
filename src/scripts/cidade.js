async function montarCidade() {
    const area = document.querySelector('#conteudo-cidade');
    try {
        const { porSlug, pontos } = await carregarDados();
        const slug = new URLSearchParams(location.search).get('id');
        const cidade = porSlug[slug];
        if (!cidade) {
            area.innerHTML = `
                <section class="content-section"><div class="section-inner">
                    <p class="aviso">${t('naoEncontrado')}</p>
                    <a class="hero-button" href="${RAIZ}/pages/pontos.html">${t('voltarPontos')}</a>
                </div></section>`;
            return;
        }
        const daCidade = ordenarComFotoPrimeiro(pontos.filter((ponto) => ponto.cidade === cidade.slug));
        const destaques = IDIOMA === 'en' && cidade.destaques_en.length ? cidade.destaques_en : cidade.destaques;
        const foto = cidade.imagem ? `style="--foto-banner: url('${caminhoImagem(cidade.imagem.arquivo)}')"` : '';
        document.title = `${cidade.nome} | Connect Culture`;

        area.innerHTML = `
            <section class="page-banner places-banner cidade-banner" ${foto}>
                <div class="section-inner page-banner-content">
                    <span class="eyebrow">${escapar(nomeRegiao(cidade.microrregiao))}</span>
                    <h1>${escapar(cidade.nome)}</h1>
                </div>
            </section>

            <section class="content-section intro-section">
                <div class="section-inner narrow-inner prose-section">
                    <p class="lead-copy">${escapar(traduzir(cidade, 'descricao'))}</p>
                    ${destaques.length ? `
                        <h3 class="subtitulo">${t('destaquesCidade')}</h3>
                        <ul class="check-list">${destaques.map((item) => `<li>${escapar(item)}</li>`).join('')}</ul>` : ''}
                </div>
            </section>

            <section class="places-gallery">
                <div class="section-inner">
                    <div class="gallery-heading">
                        <div>
                            <span class="eyebrow">${escapar(cidade.nome)}</span>
                            <h2>${t('pontosNaCidade')}</h2>
                        </div>
                        <p>${daCidade.length} ${daCidade.length === 1 ? t('encontrado') : t('encontrados')}</p>
                    </div>
                    <div class="places-grid">${daCidade.map(cartaoPonto).join('')}</div>
                </div>
            </section>`;
    } catch (erro) {
        mostrarErro(area);
    }
}

montarCidade();
