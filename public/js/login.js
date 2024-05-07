let showPassword = document.querySelector('#showPassword');

showPassword.addEventListener('click', () => {
    let passwordInput = document.querySelector('#password');
    if (passwordInput.getAttribute('type') == 'password')  {
        passwordInput.setAttribute('type', 'text');
    } else {
        passwordInput.setAttribute('type', 'password');
    }
});