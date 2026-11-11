// Dados do Praga Zero: os mesmos códigos e valores do Python, do Java, do banco e do bot
// Base simplificada para fins acadêmicos, conferida em publicações da Embrapa

const CULTURAS = [
    { codigo: 'C01', nome: 'Tomate' },
    { codigo: 'C02', nome: 'Milho' },
    { codigo: 'C03', nome: 'Feijão' },
    { codigo: 'C04', nome: 'Couve' },
    { codigo: 'C05', nome: 'Mandioca' }
];

const SINTOMAS = [
    { codigo: 'S01', descricao: 'Folhas amareladas' },
    { codigo: 'S02', descricao: 'Furos nas folhas' },
    { codigo: 'S03', descricao: 'Caminhos (galerias) dentro das folhas' },
    { codigo: 'S04', descricao: 'Mosquinhas brancas que voam ao mexer na planta' },
    { codigo: 'S05', descricao: 'Bichinhos agrupados embaixo das folhas' },
    { codigo: 'S06', descricao: 'Manchas escuras com aspecto encharcado' },
    { codigo: 'S07', descricao: 'Pó marrom-avermelhado nas folhas' },
    { codigo: 'S08', descricao: 'Serragem/sujeira no cartucho do milho' },
    { codigo: 'S09', descricao: 'Planta avermelhada e baixa (não cresce)' },
    { codigo: 'S10', descricao: 'Folhas cortadas em meia-lua' },
    { codigo: 'S11', descricao: 'Lagarta grande comendo as folhas' },
    { codigo: 'S12', descricao: 'Besourinho verde com manchas amarelas' },
    { codigo: 'S13', descricao: 'Furos nos frutos' },
    { codigo: 'S14', descricao: 'Melado pegajoso ou mofo preto nas folhas' },
    { codigo: 'S15', descricao: 'Folhas com mosaico amarelo ou deformadas' },
    { codigo: 'S16', descricao: 'Mofo esbranquiçado embaixo das folhas' },
    { codigo: 'S17', descricao: 'Folhas raspadas (ficam transparentes)' },
    { codigo: 'S18', descricao: 'Espigas pequenas ou falhadas' },
    { codigo: 'S19', descricao: 'Folhas enroladas ou encarquilhadas' },
    { codigo: 'S20', descricao: 'Planta desfolhada rapidamente' },
    { codigo: 'S21', descricao: 'Trilhas de formigas ou monte de terra solta' }