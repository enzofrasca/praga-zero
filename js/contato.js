// Validação do formulário de contato

const formContato = document.querySelector('#form-contato');
const campos = document.querySelectorAll('#form-contato input, #form-contato select, #form-contato textarea');
const sucesso = document.querySelector('#sucesso');

// Devolve a mensagem de erro do campo ('' quando está certo)
function validar(campo) {
    const valor = campo.value.trim();

    if (valor === '') {
        return 'Preencha este campo.';
    }
    // E-mail no formato nome@dominio.com: texto antes do @, depois do @ e depois do ponto
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (campo.id === 'email' && !formatoEmail.test(valor)) {
        return 'Digite um e-mail válido, por exemplo: nome@email.com';
    }
    return '';
}

formContato.addEventListener('submit', (evento) => {
    evento.preventDefault();
    sucesso.hidden = true;

    let temErro = false;
    campos.forEach((campo) => {
        const mensagem = validar(campo);
        mostrarErro(campo, mensagem);
        if (mensagem !== '') {
            temErro = true;
        }
    });