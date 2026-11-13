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