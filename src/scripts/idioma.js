const TEXTOS = {
    pt: {
        menuInicio: 'Início',
        menuPontos: 'Pontos Turísticos',
        menuSobre: 'Sobre',
        trocarIdioma: 'EN',
        trocarIdiomaTitulo: 'Read in English',
        heroTexto: 'Integrando tecnologia, educação e cultura para valorizar a história local e ampliar a experiência dos visitantes.',
        saibaMais: 'Saiba Mais',
        culturaSemFronteiras: 'Cultura sem fronteiras',
        introducao: 'Introdução',
        regiao: 'Sertão do Pajeú e do Moxotó',
        pontosTuristicos: 'Pontos Turísticos',
        pontosTexto: 'Explore os pontos turísticos e culturais do Sertão do Pajeú e do Sertão do Moxotó.',
        conhecaDestaque: 'Conheça um dos destaques',
        explorar: 'Explorar',
        verTodos: 'Ver todos os pontos',
        numPontos: 'pontos turísticos',
        numCidades: 'cidades',
        numIdiomas: 'idiomas',
        cidadesTitulo: 'Cidades',
        cidadesEyebrow: 'Por região',
        calloutEyebrow: 'Tecnologia, educação e cultura',
        calloutTitulo: 'Uma nova forma de conhecer a história local.',
        conhecaProjeto: 'Conheça o projeto',
        pontosBannerTexto: 'Explore lugares, paisagens e histórias do Sertão pernambucano.',
        descubra: 'Descubra cada lugar',
        descubraEyebrow: 'Uma região cheia de histórias',
        descubraTexto: 'Use a busca e os filtros para encontrar um ponto.',
        busca: 'Buscar',
        buscaPlaceholder: 'Nome, cidade ou assunto',
        filtroRegiao: 'Região',
        filtroCidade: 'Cidade',
        filtroCategoria: 'Categoria',
        todas: 'Todas',
        limpar: 'Limpar filtros',
        encontrados: 'pontos encontrados',
        encontrado: 'ponto encontrado',
        nenhum: 'Nenhum ponto encontrado. Tente outra busca.',
        semFoto: 'Foto em breve',
        curiosidades: 'Curiosidades',
        localizacao: 'Localização',
        comoChegar: 'Como chegar',
        qrTitulo: 'QR Code',
        qrTexto: 'Aponte a câmera do celular para abrir esta página.',
        qrBaixar: 'Baixar QR Code',
        fonte: 'Fonte',
        outrosPontos: 'Outros pontos em',
        verCidade: 'Ver a cidade',
        destaquesCidade: 'Destaques da cidade',
        pontosNaCidade: 'Pontos turísticos',
        naoEncontrado: 'Página não encontrada.',
        voltarPontos: 'Voltar para os pontos turísticos',
        anterior: 'Foto anterior',
        proxima: 'Próxima foto',
        ampliar: 'Ampliar foto',
        fechar: 'Fechar',
        erroDados: 'Não foi possível carregar os dados. Abra o site com o Live Server do VS Code (não basta dar dois cliques no arquivo).',
        rodapeTexto: 'Projeto desenvolvido pelos alunos do curso MEDIOTEC – Técnico em Desenvolvimento de Sistemas do Senac Serra Talhada.',
        contato: 'Contato',
        direitos: '© 2026 Connect Culture. Todos os direitos reservados.',
        sobreEyebrow: 'Conheça a iniciativa',
        sobreTitulo: 'Sobre o Projeto',
    },
    en: {
        menuInicio: 'Home',
        menuPontos: 'Places',
        menuSobre: 'About',
        trocarIdioma: 'PT',
        trocarIdiomaTitulo: 'Ler em português',
        heroTexto: 'Bringing together technology, education and culture to value local history and enrich the visitor experience.',
        saibaMais: 'Learn More',
        culturaSemFronteiras: 'Culture without borders',
        introducao: 'Introduction',
        regiao: 'Sertão do Pajeú and Moxotó',
        pontosTuristicos: 'Places to Visit',
        pontosTexto: 'Explore the tourist and cultural sites of the Sertão do Pajeú and the Sertão do Moxotó.',
        conhecaDestaque: 'A highlight',
        explorar: 'Explore',
        verTodos: 'See all places',
        numPontos: 'places to visit',
        numCidades: 'towns',
        numIdiomas: 'languages',
        cidadesTitulo: 'Towns',
        cidadesEyebrow: 'By region',
        calloutEyebrow: 'Technology, education and culture',
        calloutTitulo: 'A new way to discover local history.',
        conhecaProjeto: 'About the project',
        pontosBannerTexto: 'Explore the places, landscapes and stories of the Pernambuco sertão.',
        descubra: 'Discover each place',
        descubraEyebrow: 'A region full of stories',
        descubraTexto: 'Use the search and filters to find a place.',
        busca: 'Search',
        buscaPlaceholder: 'Name, town or topic',
        filtroRegiao: 'Region',
        filtroCidade: 'Town',
        filtroCategoria: 'Category',
        todas: 'All',
        limpar: 'Clear filters',
        encontrados: 'places found',
        encontrado: 'place found',
        nenhum: 'No places found. Try another search.',
        semFoto: 'Photo coming soon',
        curiosidades: 'Fun facts',
        localizacao: 'Location',
        comoChegar: 'Get directions',
        qrTitulo: 'QR Code',
        qrTexto: 'Point your phone camera here to open this page.',
        qrBaixar: 'Download QR Code',
        fonte: 'Source',
        outrosPontos: 'More places in',
        verCidade: 'See the town',
        destaquesCidade: 'Town highlights',
        pontosNaCidade: 'Places to visit',
        naoEncontrado: 'Page not found.',
        voltarPontos: 'Back to places',
        anterior: 'Previous photo',
        proxima: 'Next photo',
        ampliar: 'Enlarge photo',
        fechar: 'Close',
        erroDados: 'The data could not be loaded. Open the site with VS Code Live Server.',
        rodapeTexto: 'Project developed by students of the MEDIOTEC Systems Development technical course at Senac Serra Talhada.',
        contato: 'Contact',
        direitos: '© 2026 Connect Culture. All rights reserved.',
        sobreEyebrow: 'Meet the initiative',
        sobreTitulo: 'About the Project',
    },
};

function lerIdioma() {
    const daUrl = new URLSearchParams(location.search).get('lang');
    if (daUrl === 'pt' || daUrl === 'en') {
        salvarIdioma(daUrl);
        return daUrl;
    }
    try {
        return localStorage.getItem('idioma') || 'pt';
    } catch (erro) {
        return 'pt';
    }
}

function salvarIdioma(valor) {
    try {
        localStorage.setItem('idioma', valor);
    } catch (erro) {}
}

let IDIOMA = lerIdioma();

function t(chave) {
    return TEXTOS[IDIOMA][chave] || TEXTOS.pt[chave] || chave;
}

function traduzir(objeto, campo) {
    if (IDIOMA === 'en' && objeto[campo + '_en']) {
        return objeto[campo + '_en'];
    }
    return objeto[campo];
}

function aplicarIdioma() {
    document.documentElement.lang = IDIOMA === 'en' ? 'en' : 'pt-BR';
    document.documentElement.dataset.idioma = IDIOMA;
    document.querySelectorAll('[data-t]').forEach((elemento) => {
        elemento.textContent = t(elemento.dataset.t);
    });
    document.querySelectorAll('[data-t-placeholder]').forEach((elemento) => {
        elemento.placeholder = t(elemento.dataset.tPlaceholder);
    });
    document.querySelectorAll('.lang-toggle').forEach((botao) => {
        botao.title = t('trocarIdiomaTitulo');
        botao.onclick = () => {
            salvarIdioma(IDIOMA === 'en' ? 'pt' : 'en');
            const url = new URL(location.href);
            url.searchParams.delete('lang');
            location.href = url.toString();
        };
    });
}

aplicarIdioma();
