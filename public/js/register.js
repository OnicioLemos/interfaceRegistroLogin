//Icone a exibição do valor da senha e da confirmação:
let showPassword = document.querySelector('#showPassword');
let showConfirmPassword = document.querySelector('#showConfirmPassword');

//Input e label do campo nome:
let name = document.querySelector('#name');
let labelName = document.querySelector('label[for="name"]');
let validName = false; //Status do nome

//Input e label do campo username:
let username = document.querySelector('#username');
let labelUsername = document.querySelector('label[for="username"]');
let validUsername = false; //Status do nome de usuário

//Input e label do campo senha:
let password = document.querySelector('#password');
let labelPassword = document.querySelector('label[for="password"]');
let validPassword = false; //Status da senha

//Input e label do campo confirmar senha:
let confirmPassword = document.querySelector('#confirmPassword');
let labelConfirmPassword = document.querySelector('label[for="confirmPassword"]');
let validConfirmPassword = false; //Status da confirmação de senha

//Div reservada para mensagem de erro ou sucesso:
let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

//Função que exibe o valor da senha:
showPassword.addEventListener('click', () => {

    if (password.getAttribute('type') == 'password') {
        password.setAttribute('type', 'text');
    } else {
        password.setAttribute('type', 'password');
    }

});

//Função que exibe o valor da senha:
showConfirmPassword.addEventListener('click', () => {

    if (confirmPassword.getAttribute('type') == 'password') {
        confirmPassword.setAttribute('type', 'text');
    } else {
        confirmPassword.setAttribute('type', 'password');
    }
});

//Função que valida o nome no registro:
name.addEventListener('keyup', () => {

    if (name.value.length == 0) {

        name.setAttribute('style', 'border-color: #0d009c');
        labelName.setAttribute('style', 'color: #0d009c');
        labelName.innerHTML = 'Nome';
        validName = false;

    } else {

        if (name.value.length <= 5) {
            name.setAttribute('style', 'border-color: red');
            labelName.setAttribute('style', 'color: red');
            labelName.innerHTML = 'Nome (Insira no minimo 5 caracteres)';
            validName = false;
        } else {
            name.setAttribute('style', 'border-color: green');
            labelName.setAttribute('style', 'color: green');
            labelName.innerHTML = 'Nome';
            validName = true;
        }
    }
});


//Função que valida o nome de usuário:
username.addEventListener('keyup', () => {

    if (username.value.length == 0) {

        username.setAttribute('style', 'border-color: #0d009c');
        labelUsername.setAttribute('style', 'color: #0d009c');
        labelUsername.innerHTML = 'Usuario';
        validUsername = false;

    } else {

        if (username.value.length <= 5) {
            username.setAttribute('style', 'border-color: red');
            labelUsername.setAttribute('style', 'color: red');
            labelUsername.innerHTML = 'Usuario (Insira no minimo 5 caracteres)';
            validUsername = false;
        } else {
            username.setAttribute('style', 'border-color: green');
            labelUsername.setAttribute('style', 'color: green');
            labelUsername.innerHTML = 'Usuario';
            validUsername = true;
        }
    }
});

//Função que confirma se o campo possui valores:
password.addEventListener('keyup', () => {

    if (password.value.length == 0) {

        password.setAttribute('style', 'border-color: #0d009c');
        labelPassword.setAttribute('style', 'color: #0d009c');
        labelPassword.innerHTML = 'senha';
        validPassword = false;

    } else {

        checkPass()
    }
});

//Função que confirma se o campo possui valores:
confirmPassword.addEventListener('keyup', () => {

    if (confirmPassword.value.length == 0) {

        confirmPassword.setAttribute('style', 'border-color: #0d009c');
        labelConfirmPassword.setAttribute('style', 'color: #0d009c');
        labelConfirmPassword.innerHTML = 'Confirmar Senha';
        validConfirmPassword = false;

    } else {

        checkPass()
    }
});

//Função que executa a logica de validação da senha:
function checkPass() {
    var passwordValue = password.value;
    var confirmPasswordValue = confirmPassword.value;

    // Verifica se a senha tem pelo menos 8 caracteres
    if (passwordValue.length < 8) {
        password.setAttribute('style', 'border-color: red');
        labelPassword.setAttribute('style', 'color: red');
        labelPassword.innerHTML = 'Senha (Insira pelo menos 8 caracteres)';
        validPassword = false;
    } else {
        // Verifica se a senha contém pelo menos uma letra e um caractere especial
        var letterRegex = /[a-zA-Z]/;
        var specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!letterRegex.test(passwordValue) || !specialCharRegex.test(passwordValue)) {
            password.setAttribute('style', 'border-color: red');
            labelPassword.setAttribute('style', 'color: red');
            labelPassword.innerHTML = 'Senha (Deve conter pelo menos uma letra e um caractere especial)';
            validPassword = false;
        } else {
            password.setAttribute('style', 'border-color: green');
            labelPassword.setAttribute('style', 'color: green');
            labelPassword.innerHTML = 'Senha';
            validPassword = true;
            
        }
    }

    // Verifica se as senhas são iguais
    if (confirmPasswordValue !== passwordValue) {
        confirmPassword.setAttribute('style', 'border-color: red');
        labelConfirmPassword.setAttribute('style', 'color: red');
        labelConfirmPassword.innerHTML = 'Confirmar Senha (As senhas não são iguais!)';
        validConfirmPassword = false;
    } else {
        confirmPassword.setAttribute('style', 'border-color: green');
        labelConfirmPassword.setAttribute('style', 'color: green');
        labelConfirmPassword.innerHTML = 'Confirmar Senha';
        validConfirmPassword = true;
    }

}

//Botão que submete o formulario
let submitButton = document.querySelector('#submitButton');

//Evento que checa validação de nome, usuario, senha e confirmação de senha e submete o form pela rota ('register' POST)
submitButton.addEventListener('click', (e) => {
    if (!(validName && validUsername && validPassword && validConfirmPassword)) {
        e.preventDefault()
    }
});
