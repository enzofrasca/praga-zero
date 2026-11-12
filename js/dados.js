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
];

// encaminhar: true quando o caso sempre vai para o técnico (P05)
const PRAGAS = [
    {
        codigo: 'P01', nome: 'Mosca-branca', cientifico: 'Bemisia tabaci', tipo: 'Inseto',
        descricao: 'Inseto pequeno e branco que fica embaixo das folhas e voa quando a planta é mexida. Suga a seiva e pode transmitir viroses.',
        culturas: ['C01', 'C03'], sintomas: ['S04', 'S01', 'S14', 'S15'], ocasionais: ['S15'],
        manejos: [
            { tipo: 'Mecânico', descricao: 'Armadilha adesiva amarela' },
            { tipo: 'Cultural', descricao: 'Arrancar e destruir plantas com virose' },
            { tipo: 'Cultural', descricao: 'Eliminar restos da cultura anterior' }
        ]
    },
    {
        codigo: 'P02', nome: 'Traça-do-tomateiro', cientifico: 'Tuta absoluta', tipo: 'Inseto',
        descricao: 'Lagartinha que abre caminhos dentro das folhas e fura os frutos do tomate.',
        culturas: ['C01'], sintomas: ['S03', 'S13', 'S02'], ocasionais: ['S02'],
        manejos: [
            { tipo: 'Mecânico', descricao: 'Retirar e destruir folhas e frutos atacados' },
            { tipo: 'Mecânico', descricao: 'Armadilha de feromônio' },
            { tipo: 'Cultural', descricao: 'Rotação de culturas' }
        ]
    },
    {
        codigo: 'P03', nome: 'Requeima', cientifico: 'Phytophthora infestans', tipo: 'Doença',
        descricao: 'Doença que causa manchas escuras e encharcadas nas folhas e mofo branco por baixo. Aparece mais com tempo frio e úmido.',
        culturas: ['C01'], sintomas: ['S06', 'S16'], ocasionais: [],
        manejos: [
            { tipo: 'Cultural', descricao: 'Não molhar as folhas na irrigação' },
            { tipo: 'Cultural', descricao: 'Aumentar o espaçamento' },
            { tipo: 'Mecânico', descricao: 'Retirar partes atacadas' }
        ]
    },
    {
        codigo: 'P04', nome: 'Lagarta-do-cartucho', cientifico: 'Spodoptera frugiperda', tipo: 'Inseto',
        descricao: 'Lagarta que come o cartucho do milho, deixando serragem e folhas raspadas.',
        culturas: ['C02'], sintomas: ['S08', 'S17', 'S02'], ocasionais: ['S02'],
        manejos: [
            { tipo: 'Cultural', descricao: 'Vistoriar o cartucho toda semana' },
            { tipo: 'Biológico', descricao: 'Preservar inimigos naturais' },
            { tipo: 'Cultural', descricao: 'Destruir restos culturais' },
            { tipo: 'Biológico', descricao: 'Controle biológico com orientação técnica' }
        ]
    },
    {
        codigo: 'P05', nome: 'Cigarrinha-do-milho / enfezamentos', cientifico: 'Dalbulus maidis', tipo: 'Inseto',
        descricao: 'Inseto que transmite os enfezamentos, doenças que deixam o milho avermelhado, baixo e com espigas falhadas.',
        culturas: ['C02'], sintomas: ['S09', 'S18'], ocasionais: [],
        manejos: [
            { tipo: 'Cultural', descricao: 'Eliminar milho tiguera (nascido fora de época)' },
            { tipo: 'Cultural', descricao: 'Evitar plantios escalonados' }
        ],
        encaminhar: true
    },
    {
        codigo: 'P06', nome: 'Vaquinha (patriota)', cientifico: 'Diabrotica speciosa', tipo: 'Inseto',
        descricao: 'Besourinho verde com manchas amarelas que come as folhas do feijão e do milho.',
        culturas: ['C03', 'C02'], sintomas: ['S12', 'S02'], ocasionais: [],
        manejos: [
            { tipo: 'Cultural', descricao: 'Vistoriar com frequência' },
            { tipo: 'Cultural', descricao: 'Rotação de culturas' },
            { tipo: 'Cultural', descricao: 'Manter a área limpa de restos' }
        ]
    },
    {
        codigo: 'P07', nome: 'Ferrugem do feijoeiro', cientifico: 'Uromyces appendiculatus', tipo: 'Doença',
        descricao: 'Doença causada por fungo que deixa um pó marrom-avermelhado nas folhas.',
        culturas: ['C03'], sintomas: ['S07', 'S01'], ocasionais: ['S01'],
        manejos: [
            { tipo: 'Mecânico', descricao: 'Retirar folhas atacadas' },
            { tipo: 'Cultural', descricao: 'Usar variedades resistentes' },
            { tipo: 'Cultural', descricao: 'Rotação de culturas' }
        ]
    },
    {
        codigo: 'P08', nome: 'Pulgão', cientifico: 'Brevicoryne brassicae', tipo: 'Inseto',
        descricao: 'Bichinhos que vivem agrupados embaixo das folhas da couve, que ficam enroladas e meladas.',
        culturas: ['C04'], sintomas: ['S05', 'S19', 'S14'], ocasionais: ['S14'],
        manejos: [
            { tipo: 'Mecânico', descricao: 'Jato de água nas folhas' },
            { tipo: 'Biológico', descricao: 'Preservar joaninhas' },
            { tipo: 'Mecânico', descricao: 'Retirar folhas muito atacadas' }
        ]
    },
    {
        codigo: 'P09', nome: 'Traça-das-crucíferas', cientifico: 'Plutella xylostella', tipo: 'Inseto',
        descricao: 'Lagartinha que raspa as folhas da couve, deixando partes transparentes e furos.',
        culturas: ['C04'], sintomas: ['S17', 'S02'], ocasionais: [],
        manejos: [
            { tipo: 'Mecânico', descricao: 'Catação manual' },
            { tipo: 'Cultural', descricao: 'Rotação com culturas de outra família' },
            { tipo: 'Biológico', descricao: 'Controle biológico com orientação técnica' }
        ]
    },
    {
        codigo: 'P10', nome: 'Mandarová', cientifico: 'Erinnyis ello', tipo: 'Inseto',
        descricao: 'Lagarta grande que come as folhas da mandioca e pode desfolhar a planta rápido.',
        culturas: ['C05'], sintomas: ['S11', 'S20'], ocasionais: [],
        manejos: [
            { tipo: 'Mecânico', descricao: 'Catação manual em áreas pequenas' },
            { tipo: 'Biológico', descricao: 'Baculovírus, com assistência técnica' }
        ]
    },
    {
        codigo: 'P11', nome: 'Formiga cortadeira (saúva, quenquém)', cientifico: 'Atta spp. e Acromyrmex spp.', tipo: 'Inseto',
        descricao: 'Formigas que cortam as folhas em meia-lua e levam para o formigueiro. Atacam todas as culturas.',
        culturas: ['C01', 'C02', 'C03', 'C04', 'C05'], sintomas: ['S10', 'S21', 'S20'], ocasionais: ['S20'],
        manejos: [
            { tipo: 'Mecânico', descricao: 'Localizar o formigueiro seguindo as trilhas e chamar a assistência técnica para o tratamento' }
        ]
    }
];

const ATER = 'Casa da Agricultura de Ibiúna (FICTÍCIO), tel. (11) 0000-0000';

// Textos de segurança: iguais no site, no bot e no console
const RODAPE_MANEJO = 'Se o ataque estiver forte, procure a assistência técnica (Emater/ATER) da sua cidade. Não use veneno sem receita de um profissional habilitado.';
const MENSAGEM_INCERTEZA = 'Não foi possível sugerir uma hipótese confiável.';
