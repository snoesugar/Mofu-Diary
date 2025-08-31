import './assets/scss/all.scss';
<<<<<<< HEAD
=======
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/js/air-datepicker-setting';

console.log('Hello world');
>>>>>>> main

const logo = document.getElementById('logo');
const loginPage = document.getElementById('loginPage');

// 先停留3秒
setTimeout(() => {
    // logo 開始淡出
    logo.style.opacity = 0;

    // 3秒淡出完成後
    setTimeout(() => {
        logo.style.display = 'none'; // 完全消失

        // 顯示 loginPage 並淡入
        loginPage.style.display = 'flex';

        // 確保 transition 生效
        setTimeout(() => {
            loginPage.style.opacity = 1;
        }, 50);

    }, 3000); // logo淡出時間
}, 3000); // logo停留時間

// 密碼設定 密碼切換顯示
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const toggleIcon = document.querySelector('#toggleIcon');

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // 切換 icon
    toggleIcon.classList.toggle('bi-eye');
    toggleIcon.classList.toggle('bi-eye-slash');
});



