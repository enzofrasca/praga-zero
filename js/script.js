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