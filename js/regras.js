// Regras de negócio (RN03 a RN07 e RN11), iguais às do Python e do Java

function buscarCultura(codigo) {
    return CULTURAS.find((cultura) => cultura.codigo === codigo);
}

function buscarSintoma(codigo) {
    return SINTOMAS.find((sintoma) => sintoma.codigo === codigo);
}

// RN04: sintomas em comum ÷ total de sintomas da praga × 100
function calcularCompatibilidade(sintomasPraga, sintomasInformados) {
    let emComum = 0;
    sintomasPraga.forEach((sintoma) => {
        if (sintomasInformados.includes(sintoma)) {
            emComum++;
        }
    });
    return emComum / sintomasPraga.length * 100;
}

// RN03 + RN04: só pragas que atacam a cultura e com índice de 50% ou mais,
// do maior para o menor. Lista vazia = nenhum candidato confiável (RN11)
function triar(cultura, sintomasInformados) {
    const candidatos = [];
    PRAGAS.forEach((praga) => {
        if (praga.culturas.includes(cultura)) {
            const indice = calcularCompatibilidade(praga.sintomas, sintomasInformados);
            if (indice >= 50) {
                candidatos.push({ praga: praga, indice: indice });
            }
        }
    });
    // Ordena do maior índice para o menor
    candidatos.sort((a, b) => b.indice - a.indice);
    return candidatos;
}

// RN05: devolve a mensagem de erro de cada campo ('' quando está certo)
function validarVistoria(vistoriadas, afetadas) {
    const erros = { vistoriadas: '', afetadas: '' };

    if (!Number.isInteger(vistoriadas) || vistoriadas <= 0) {
        erros.vistoriadas = 'Informe um número inteiro maior que zero.';
    }

    if (!Number.isInteger(afetadas) || afetadas < 0) {
        erros.afetadas = 'Informe um número inteiro, de 0 para cima.';
    } else if (afetadas > vistoriadas) {
        erros.afetadas = 'As plantas atacadas não podem ser mais que as olhadas.';
    }
    return erros;
}

// RN06: percentual de plantas atacadas
function calcularPercentual(vistoriadas, afetadas) {
    return afetadas / vistoriadas * 100;
}

// RN06: nível de atenção
function classificarNivel(percentual) {
    if (percentual < 10) {
        return 'BAIXO';
    } else if (percentual < 30) {
        return 'MEDIO';
    } else {
        return 'ALTO';
    }
}

// RN07: vai para o técnico se for ALTO, sem praga identificada ou P05
function definirStatus(nivel, praga) {
    if (nivel === 'ALTO' || praga === undefined || praga.encaminhar) {
        return 'AGUARDANDO_TECNICO';
    }
    return 'ABERTA';
}

// RN04: o índice aparece arredondado para inteiro (66,67 vira 67%)
function formatarIndice(indice) {
    return Math.round(indice) + '%';
}

// O % de plantas atacadas aparece com uma casa e vírgula (7,5%)
function formatarPercentual(valor) {
    const arredondado = Math.round(valor * 10) / 10;
    const texto = String(arredondado).replace('.', ',');
    return texto + '%';
}
