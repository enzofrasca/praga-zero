// FAQ em acordeão: clicar na pergunta abre ou fecha a resposta
const perguntas = document.querySelectorAll('.faq__pergunta');

perguntas.forEach((botao) => {
    botao.addEventListener('click', () => {
        // O botão tem aria-controls="resposta-1", que é o id da resposta dele
        const resposta = document.querySelector('#' + botao.getAttribute('aria-controls'));

        if (resposta.hidden) {
            resposta.hidden = false;
            botao.setAttribute('aria-expanded', 'true');
        } else {
            resposta.hidden = true;
            botao.setAttribute('aria-expanded', 'false');
        }
    });
});
