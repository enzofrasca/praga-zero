// Script usado em todas as páginas: menu e funções comuns

// Menu hambúrguer (celular e tablet)
const botaoMenu = document.querySelector('.menu-botao');
const menu = document.querySelector('#menu-principal');

botaoMenu.addEventListener('click', () => {
    if (menu.classList.contains('menu--aberto')) {
        menu.classList.remove('menu--aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
    } else {
        menu.classList.add('menu--aberto');
        botaoMenu.setAttribute('aria-expanded', 'true');
    }
});

// Fecha o menu depois de escolher um link
menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a') !== null) {
        menu.classList.remove('menu--aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
    }
});

// Esc fecha o menu e devolve o foco ao botão
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menu.classList.contains('menu--aberto')) {
        menu.classList.remove('menu--aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
        // No desktop o botão do menu fica escondido: o foco só volta se ele estiver visível
        if (botaoMenu.offsetParent !== null) {
            botaoMenu.focus();
        }
    }
});

// Preferências de acessibilidade: fonte maior e alto contraste
const CLASSES_ACESSIBILIDADE = { fonte: 'fonte-maior', contraste: 'alto-contraste' };

function guardar(chave, valor) {
    try {
        localStorage.setItem(chave, valor);
    } catch (erro) {
        // Modo restrito pode bloquear o localStorage: a preferência vale só nesta página
    }
}

function aplicarPreferencia(nome, ativo) {
    const botao = document.querySelector('[data-acessibilidade="' + nome + '"]');
    document.documentElement.classList.toggle(CLASSES_ACESSIBILIDADE[nome], ativo);
    botao.setAttribute('aria-pressed', String(ativo));
    guardar('praga-zero-' + nome, ativo ? '1' : '0');
}

document.querySelectorAll('[data-acessibilidade]').forEach((botao) => {
    const nome = botao.dataset.acessibilidade;
    let salvo = '0';
    try {
        salvo = localStorage.getItem('praga-zero-' + nome) || '0';
    } catch (erro) {
        salvo = '0';
    }
    botao.setAttribute('aria-pressed', String(salvo === '1'));
    document.documentElement.classList.toggle(CLASSES_ACESSIBILIDADE[nome], salvo === '1');

    botao.addEventListener('click', () => {
        aplicarPreferencia(nome, botao.getAttribute('aria-pressed') !== 'true');
    });
});

// Mostra a mensagem de erro embaixo de um campo (mensagem vazia = sem erro)
function mostrarErro(campo, mensagem) {
    const erro = document.querySelector('#erro-' + campo.id);
    erro.textContent = mensagem;

    if (mensagem === '') {
        erro.hidden = true;
        campo.classList.remove('campo-erro');
    } else {
        erro.hidden = false;
        campo.classList.add('campo-erro');
    }
}
