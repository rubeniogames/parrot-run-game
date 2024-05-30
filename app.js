document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    const playButton = document.getElementById('play-button');
    const settingsButton = document.getElementById('settings-button');
    const walletButton = document.getElementById('wallet-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainMenu = document.getElementById('main-menu');

    startButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        if (username) {
            localStorage.setItem('username', username);
            showMainMenu();
        } else {
            alert('Пожалуйста, введите ваше имя.');
        }
    });

    function showMainMenu() {
        welcomeScreen.classList.add('hidden');
        mainMenu.classList.remove('hidden');
    }

    function init() {
        const username = localStorage.getItem('username');
        if (username) {
            showMainMenu();
        }
    }

    init();
});
