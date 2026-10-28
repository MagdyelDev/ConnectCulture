const campoBusca = document.querySelector('#busca');
const campoRegiao = document.querySelector('#filtro-regiao');
const campoCidade = document.querySelector('#filtro-cidade');
const campoCategoria = document.querySelector('#filtro-categoria');
const areaLista = document.querySelector('#lista-pontos');
const areaTotal = document.querySelector('#total-pontos');

let TODOS_OS_PONTOS = [];
let TODAS_AS_CIDADES = [];

function opcoes(lista, primeira) {
    return `<option value="">${primeira}</option>` + lista.map(([valor, texto]) => `<option value="${escapar(valor)}">${escapar(texto)}</option>`).join('');
}

function preencherCidades() {
    const regiao = campoRegiao.value;
    const atual = campoCidade.value;
    const cidades = TODAS_AS_CIDADES.filter((cidade) => !regiao || cidade.microrregiao === regiao);
    campoCidade.innerHTML = opcoes(cidades.map((cidade) => [cidade.slug, cidade.nome]), t('todas'));
    if (cidades.some((cidade) => cidade.slug === atual)) campoCidade.value = atual;
}

function filtrar() {
    const termo = semAcento(campoBusca.value.trim());
    const resultado = TODOS_OS_PONTOS.filter((ponto) => {
        if (campoRegiao.value && ponto.dadosCidade.microrregiao !== campoRegiao.value) return false;
        if (campoCidade.value && ponto.cidade !== campoCidade.value) return false;
        if (campoCategoria.value && ponto.categoria !== campoCategoria.value) return false;
        if (!termo) return true;
        const texto = semAcento([ponto.nome, ponto.dadosCidade.nome, ponto.categoria, traduzir(ponto, 'descricao')].join(' '));
        return texto.includes(termo);
    });

    areaTotal.textContent = `${resultado.length} ${resultado.length === 1 ? t('encontrado') : t('encontrados')}`;
    areaLista.innerHTML = resultado.length
        ? ordenarComFotoPrimeiro(resultado).map(cartaoPonto).join('')
        : `<p class="aviso">${t('nenhum')}</p>`;
}

function limpar() {
    campoBusca.value = '';
    campoRegiao.value = '';
    campoCategoria.value = '';
    preencherCidades();
    campoCidade.value = '';
    filtrar();
}

async function montarPontos() {
    try {
        const { cidades, pontos } = await carregarDados();
        TODOS_OS_PONTOS = pontos;
        TODAS_AS_CIDADES = [...cidades].sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));

        const regioes = [...new Set(cidades.map((cidade) => cidade.microrregiao))];
        campoRegiao.innerHTML = opcoes(regioes.map((regiao) => [regiao, nomeRegiao(regiao)]), t('todas'));

        const categorias = {};
        pontos.forEach((ponto) => {
            categorias[ponto.categoria] = traduzir(ponto, 'categoria');
        });
        campoCategoria.innerHTML = opcoes(Object.entries(categorias).sort((a, b) => a[1].localeCompare(b[1])), t('todas'));

        const parametros = new URLSearchParams(location.search);
        campoRegiao.value = parametros.get('regiao') || '';
        preencherCidades();
        campoCidade.value = parametros.get('cidade') || '';
        campoCategoria.value = parametros.get('categoria') || '';
        campoBusca.value = parametros.get('busca') || '';

        campoBusca.addEventListener('input', filtrar);
        campoRegiao.addEventListener('change', () => {
            preencherCidades();
            filtrar();
        });
        campoCidade.addEventListener('change', filtrar);
        campoCategoria.addEventListener('change', filtrar);
        document.querySelector('#limpar-filtros').addEventListener('click', limpar);

        filtrar();
    } catch (erro) {
        mostrarErro(areaLista);
    }
}

montarPontos();
