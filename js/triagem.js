// Página da solução 1: triagem (cultura → sinais → problemas compatíveis → nível → próximo passo)

const formTriagem = document.querySelector('#form-triagem');
const formNivel = document.querySelector('#form-nivel');
const secaoResultado = document.querySelector('#resultado');
const secaoNivel = document.querySelector('#etapa-nivel');
const secaoPasso = document.querySelector('#proximo-passo');
const campoVistoriadas = document.querySelector('#vistoriadas');
const campoAfetadas = document.querySelector('#afetadas');

// Problema considerado no nível de atenção: o de maior índice (undefined = nenhum)
let pragaEscolhida;

// Passo 1: opções de cultura
let htmlCulturas = '';
CULTURAS.forEach((cultura) => {
    htmlCulturas += `
        <label class="opcao">
            <input type="radio" name="cultura" value="${cultura.codigo}">
            <span>${cultura.nome}</span>
        </label>`;
});
document.querySelector('#lista-culturas').innerHTML = htmlCulturas;

// Passo 2: os 21 sintomas.
// Não filtramos pela cultura, senão o caso sem candidato (RN11) nunca aconteceria
let htmlSintomas = '';
SINTOMAS.forEach((sintoma) => {
    htmlSintomas += `
        <label class="opcao">
            <input type="checkbox" name="sintoma" value="${sintoma.codigo}">
            <span>${sintoma.descricao}</span>
        </label>`;
});
document.querySelector('#lista-sintomas').innerHTML = htmlSintomas;

// Passo 3: problemas compatíveis
formTriagem.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const culturaMarcada = document.querySelector('input[name="cultura"]:checked');
    const sintomasEscolhidos = [];
    document.querySelectorAll('input[name="sintoma"]:checked').forEach((caixa) => {
        sintomasEscolhidos.push(caixa.value);
    });

    // Sem cultura ou sem sinal, mostra o erro e para aqui
    const erroCultura = document.querySelector('#erro-cultura');
    const erroSintomas = document.querySelector('#erro-sintomas');
    erroCultura.hidden = true;
    erroSintomas.hidden = true;

    if (culturaMarcada === null) {
        erroCultura.hidden = false;
    }
    if (sintomasEscolhidos.length === 0) {
        erroSintomas.hidden = false;
    }
    if (culturaMarcada === null || sintomasEscolhidos.length === 0) {
        // Leva o foco para o primeiro grupo com problema
        if (culturaMarcada === null) {
            document.querySelector('input[name="cultura"]').focus();
        } else {
            document.querySelector('input[name="sintoma"]').focus();
        }
        return;
    }

    const cultura = buscarCultura(culturaMarcada.value);
    const candidatos = triar(cultura.codigo, sintomasEscolhidos);

    mostrarCandidatos(cultura, sintomasEscolhidos, candidatos);
    pragaEscolhida = undefined;
    if (candidatos.length > 0) {
        pragaEscolhida = candidatos[0].praga;
    }
    secaoPasso.hidden = true;
    secaoResultado.hidden = false;
    secaoNivel.hidden = false;
    secaoResultado.scrollIntoView();
});

function mostrarCandidatos(cultura, sintomasEscolhidos, candidatos) {
    const nomes = [];
    sintomasEscolhidos.forEach((codigo) => {
        nomes.push(buscarSintoma(codigo).descricao.toLowerCase());
    });
    document.querySelector('#resumo-escolha').textContent = cultura.nome + ': ' + nomes.join(', ') + '.';

    let html = '';

    // RN11: nenhum candidato confiável
    if (candidatos.length === 0) {
        html = `<div class="aviso aviso--alerta">
            <strong>${MENSAGEM_INCERTEZA}</strong>
            <p>Nenhum problema cadastrado para ${cultura.nome} chegou a 50% de compatibilidade com esses sinais. Isso não quer dizer que a planta está sadia.</p>
            <p>Procure a assistência técnica: ${ATER}.</p>
        </div>`;
    }

    candidatos.forEach((candidato) => {
        const praga = candidato.praga;

        html += `<article class="card">
            <h3>${praga.nome} <span class="tag">${praga.tipo}</span></h3>
            <p class="cientifico">${praga.cientifico}</p>
            <p><strong>Índice de compatibilidade: ${formatarIndice(candidato.indice)}</strong></p>`;

        if (praga.encaminhar) {
            html += '<p class="aviso aviso--alerta">Esses sinais não confirmam a causa. Este caso sempre deve ser visto pelo técnico.</p>';
        }

        html += '</article>';
    });

    document.querySelector('#candidatos').innerHTML = html;
}

// Passos 4 e 5: nível de atenção, status e próximo passo
formNivel.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Campo vazio vira NaN (e não 0) para cair na validação
    const vistoriadas = campoVistoriadas.value.trim() === '' ? NaN : Number(campoVistoriadas.value);
    const afetadas = campoAfetadas.value.trim() === '' ? NaN : Number(campoAfetadas.value);

    // RN05: com erro, nada é calculado
    const erros = validarVistoria(vistoriadas, afetadas);
    mostrarErro(campoVistoriadas, erros.vistoriadas);
    mostrarErro(campoAfetadas, erros.afetadas);
    if (erros.vistoriadas !== '' || erros.afetadas !== '') {
        secaoPasso.hidden = true;
        (erros.vistoriadas !== '' ? campoVistoriadas : campoAfetadas).focus();
        return;
    }

    const praga = pragaEscolhida;
    const percentual = calcularPercentual(vistoriadas, afetadas);
    const nivel = classificarNivel(percentual);
    const status = definirStatus(nivel, praga);

    mostrarNivel(vistoriadas, afetadas, percentual, nivel, status, praga);
    mostrarManejo(praga);

    secaoPasso.hidden = false;
    secaoPasso.scrollIntoView();
});

function mostrarNivel(vistoriadas, afetadas, percentual, nivel, status, praga) {
    // Texto que aparece embaixo do nível
    let nomeNivel = 'BAIXO';
    let acao = 'Continue olhando as plantas toda semana.';
    if (nivel === 'MEDIO') {
        nomeNivel = 'MÉDIO';
        acao = 'Faça os cuidados sem veneno indicados abaixo.';
    } else if (nivel === 'ALTO') {
        nomeNivel = 'ALTO';
        acao = 'Faça os cuidados e procure a assistência técnica.';
    }

    let html = `<div class="grade grade--3">
        <div class="card indicador">
            <p>Plantas atacadas</p>
            <strong>${formatarPercentual(percentual)}</strong>
            <p>${afetadas} de ${vistoriadas} plantas</p>
        </div>
        <div class="card indicador nivel-${nivel.toLowerCase()}">
            <p>Nível de atenção</p>
            <strong>${nomeNivel}</strong>
            <p>${acao}</p>
        </div>
        <div class="card indicador">
            <p>Status da ocorrência</p>
            <strong class="status">${status}</strong>
        </div>
    </div>
    <p class="nota">Faixas do protótipo: menos de 10% = BAIXO, de 10% a menos de 30% = MÉDIO, 30% ou mais = ALTO.</p>`;

    // RN07: explica por que o caso vai para o técnico
    if (status === 'AGUARDANDO_TECNICO') {
        let motivo = 'Os sinais de enfezamento não confirmam a causa.';
        if (nivel === 'ALTO') {
            motivo = '30% ou mais das plantas estão atacadas.';
        } else if (praga === undefined) {
            motivo = 'Nenhum problema foi identificado com segurança.';
        }

        html += `<div class="aviso aviso--alerta">
            <strong>Procure a assistência técnica</strong>
            <p>${motivo} Contato: ${ATER}.</p>
            <p>Este site não abre chamado: mostre esta tela ao técnico.</p>
        </div>`;
    }

    document.querySelector('#resultado-nivel').innerHTML = html;
}

function mostrarManejo(praga) {
    let html = '';
    if (praga === undefined) {
        html = `<h3>Enquanto espera o técnico</h3>
            <p>Como nenhum problema foi identificado com segurança, não indicamos um cuidado específico. Continue observando as plantas.</p>
            <p class="aviso aviso--terra">${RODAPE_MANEJO}</p>`;
    } else {
        let itens = '';
        praga.manejos.forEach((manejo) => {
            itens += `<li>${manejo.descricao} <span class="tag">${manejo.tipo}</span></li>`;
        });
        html = `<h3>Cuidados sem veneno para ${praga.nome}</h3>
            <ol class="manejos">${itens}</ol>
            <p class="aviso aviso--terra">${RODAPE_MANEJO}</p>`;
    }
    document.querySelector('#manejo').innerHTML = html;
}
