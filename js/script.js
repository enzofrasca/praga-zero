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
        botaoMenu.focus();
    }
});

