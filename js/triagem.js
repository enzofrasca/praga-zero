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