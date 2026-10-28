const DESTAQUE = 'museu-do-cangaco';
const PONTOS_DA_HOME = ['pico-do-papagaio', 'serra-do-giz', 'cinema-rio-branco', 'theatro-cinema-guarany', 'acude-poco-da-cruz', 'castelo-armorial'];

async function montarInicio() {
    const areaPontos = document.querySelector('#destaques');
    try {
        const { cidades, pontos } = await carregarDados();

        document.querySelector('#num-pontos').textContent = pontos.length;
        document.querySelector('#num-cidades').textContent = cidades.length;

        const destaque = pontos.find((ponto) => ponto.slug === DESTAQUE);
        const link = document.querySelector('#destaque-link');
        link.href = linkPonto(destaque.slug);
        link.querySelector('img').src = caminhoImagem(destaque.imagens[0].arquivo);
        link.querySelector('img').alt = destaque.nome;
        link.querySelector('strong').textContent = `${destaque.nome} · ${destaque.dadosCidade.nome}`;

        const escolhidos = PONTOS_DA_HOME.map((slug) => pontos.find((ponto) => ponto.slug === slug)).filter(Boolean);
        areaPontos.innerHTML = escolhidos.map(cartaoPonto).join('');

        const regioes = {};
        cidades.forEach((cidade) => {
            regioes[cidade.microrregiao] = regioes[cidade.microrregiao] || [];
            regioes[cidade.microrregiao].push(cidade);
        });
        document.querySelector('#cidades').innerHTML = Object.entries(regioes).map(([regiao, lista]) => `
            <div class="regiao">
                <h3>${escapar(nomeRegiao(regiao))}</h3>
                <div class="lista-cidades">
                    ${lista.map((cidade) => `<a href="${linkCidade(cidade.slug)}">${escapar(cidade.nome)}</a>`).join('')}
                </div>
            </div>`).join('');
    } catch (erro) {
        mostrarErro(areaPontos);
    }
}

montarInicio();
