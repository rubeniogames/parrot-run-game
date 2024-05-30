document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    const playButton = document.getElementById('play-button');
    const settingsButton = document.getElementById('settings-button');
    const walletButton = document.getElementById('wallet-button');
    const backButton = document.getElementById('back-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainMenu = document.getElementById('main-menu');
    const underConstruction = document.getElementById('under-construction');

    startButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        if (username) {
            localStorage.setItem('username', username);
            showMainMenu();
        } else {
            alert('Пожалуйста, введите ваше имя.');
        }
    });

    playButton.addEventListener('click', showUnderConstruction);
    settingsButton.addEventListener('click', showUnderConstruction);
    walletButton.addEventListener('click', showUnderConstruction);
    backButton.addEventListener('click', showMainMenu);

    function showMainMenu() {
        welcomeScreen.classList.add('hidden');
        underConstruction.classList.add('hidden');
        mainMenu.classList.remove('hidden');
    }

    function showUnderConstruction() {
        mainMenu.classList.add('hidden');
        underConstruction.classList.remove('hidden');
    }

    function init() {
        const username = localStorage.getItem('username');
        if (username) {
            showMainMenu();
        }
    }

    init();
});
