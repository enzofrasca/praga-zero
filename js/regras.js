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