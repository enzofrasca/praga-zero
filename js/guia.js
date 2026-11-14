// Página da solução 2: guia de pragas com filtro por cultura

const listaPragas = document.querySelector('#lista-pragas');
const filtro = document.querySelector('#filtro');

// "Tomate, Feijão" ou "Todas as culturas"
function nomesCulturas(codigos) {
    if (codigos.length === CULTURAS.length) {
        return 'Todas as culturas';
    }
    const nomes = [];
    codigos.forEach((codigo) => {
        nomes.push(buscarCultura(codigo).nome);
    });
    return nomes.join(', ');
}

// Cards das 11 pragas
let htmlCards = '';
PRAGAS.forEach((praga) => {
    let sinais = '';
    praga.sintomas.forEach((codigoSintoma) => {
        sinais += '<li>' + buscarSintoma(codigoSintoma).descricao;
        if (praga.ocasionais.includes(codigoSintoma)) {
            sinais += ' (às vezes)';
        }
        sinais += '</li>';
    });

    let manejos = '';
    praga.manejos.forEach((manejo) => {
        manejos += `<li>${manejo.descricao} <span class="tag">${manejo.tipo}</span></li>`;
    });

    let aviso = '';
    if (praga.encaminhar) {
        aviso = '<p class="aviso aviso--alerta">Os sinais de enfezamento não confirmam a causa. Sempre procure a assistência técnica.</p>';
    }

    htmlCards += `
        <li class="card card-praga" data-culturas="${praga.culturas.join(' ')}">
            <p><span class="tag">${praga.tipo}</span></p>
            <h3>${praga.nome}</h3>
            <p class="cientifico">${praga.cientifico}</p>
            <p>${praga.descricao}</p>
            <p><strong>Ataca:</strong> ${nomesCulturas(praga.culturas)}</p>
            ${aviso}
            <h4>Sinais</h4>
            <ul>${sinais}</ul>
            <h4>Cuidados sem veneno</h4>
            <ol class="manejos">${manejos}</ol>
        </li>`;
});
listaPragas.innerHTML = htmlCards;

// Botões do filtro: "Todas" + uma por cultura
let htmlFiltro = '<button class="filtro__botao" type="button" data-cultura="" aria-pressed="true">Todas</button>';
CULTURAS.forEach((cultura) => {
    htmlFiltro += `<button class="filtro__botao" type="button" data-cultura="${cultura.codigo}" aria-pressed="false">${cultura.nome}</button>`;
});
filtro.innerHTML = htmlFiltro;

const botoesFiltro = document.querySelectorAll('.filtro__botao');

// RN03: mostra só as pragas que atacam a cultura escolhida
function filtrar(cultura) {
    document.querySelectorAll('.card-praga').forEach((card) => {
        if (cultura === '' || card.dataset.culturas.includes(cultura)) {
            card.hidden = false;
        } else {
            card.hidden = true;
        }
    });

    // Deixa marcado só o botão que foi clicado
    botoesFiltro.forEach((botao) => {
        if (botao.dataset.cultura === cultura) {
            botao.setAttribute('aria-pressed', 'true');
        } else {
            botao.setAttribute('aria-pressed', 'false');
        }
    });
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => filtrar(botao.dataset.cultura));
});
