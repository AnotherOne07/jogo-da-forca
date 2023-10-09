// elements
const playBtn = document.getElementById('play-btn');
const addBtn = document.getElementById('add-btn');
const addWordBtn = document.getElementById('add-word-btn');
const cancelBtn = document.getElementById('cancel-btn');
const giveUpBtn = document.getElementById('give-up-btn');
const selectThemeBtn = document.getElementById('select-theme-btn');
const themeSelect = document.getElementById('theme-select');
const confirmBtn = document.getElementById('btn-confirmar');
const resultadoDiv = document.getElementById('resultado');



function playThemes() {
  const selectedTheme = themeSelect.value;
  const themesList = Object.keys(themes);
  if (selectedTheme === 'iniciar-jogo') {
    // Escolher uma palavra aleatória com base no tema selecionado
    chosenWord = chooseRandomWord(themesList[Math.floor(Math.random() * themesList.length)]);
    resetGame();
    hideNonGameplayElements();
    createGameBoard();
  } else if (themes[selectedTheme]) {
    // Escolher uma palavra aleatória com base no tema selecionado
    chosenWord = chooseRandomWord(selectedTheme);
    resetGame();
    hideNonGameplayElements();
    createGameBoard();
  }
}


// events listeners
playBtn.addEventListener('click', () => createGameBoard());
addBtn.addEventListener('click', () => toggleAddSection());
addWordBtn.addEventListener('click', () => addNewWord());
cancelBtn.addEventListener('click', () => toggleAddSection());
giveUpBtn.addEventListener('click', () => giveUpGame());
selectThemeBtn.addEventListener('click', () => toggleThemeSection());
confirmBtn.addEventListener('click', () => playThemes());




function createGameBoard() {
    if (gameOver) keyboard.innerHTML = '';
    resetGame();
    resizeCanvas();
    createVirtualKeyboard();
    addListeners();
    chooseRandomWord();
    rearrangeButtons();
    drawLines();
}

function resetGame() {
    deleteEndGameText();
    gameOver = false;
    const selectedTheme = themeSelect.value;
    const themesList = Object.keys(themes);
      if (themes[selectedTheme]) {
        chosenWord = chooseRandomWord(selectedTheme);
    }
    correctWord = "";
    letters = [];
    tries = 10;
}

function toggleAddSection() {
    const addSection = document.getElementById('add-section');
    addSection.classList.toggle('hide');
    playBtn.classList.add('hide');
    addBtn.classList.toggle('hide');
    selectThemeBtn.classList.toggle('hide');
}

function toggleThemeSection() {
    const addThemeSection = document.getElementById('add-theme-section');
    const bomDiaText = document.getElementById('bom-dia');
    
    addThemeSection.classList.toggle('hide');
    bomDiaText.classList.toggle('hide');
    confirmBtn.classList.remove('hide');
    themeSelect.style.display = ('block');
    playBtn.classList.add('hide');
    addBtn.classList.add('hide');
    selectThemeBtn.classList.add('hide');
}


function addNewWord() {
    const input = document.getElementById('new-word');
    const themeSelector = document.getElementById('theme-selector');
    const selectorTheme = themeSelector.value;
    // validation if length is valid
    if (input.value.length >= 4 &&
        input.value.length <= 8) {
      if (selectorTheme === 'all') {
        themes.all.push(input.value);
      } else if (themes[selectorTheme]) {
        themes[selectorTheme].push(input.value);
      }
        input.value = '';
      localStorage.setItem('themes', JSON.stringify(themes));
      
//         createGameBoard();
//         toggleAddSection();
//         addBtn.classList.add('hide');
//         selectThemeBtn.classList.add('hide');
//         playBtn.classList.toggle('hide');
        console.log(themes)
    } else notifyInvalidWordInput();
}

function hideNonGameplayElements() {
    const addBtn = document.getElementById('add-btn');
    const selectThemeBtn = document.getElementById('select-theme-btn');
    const themeSelect = document.getElementById('theme-select');
    const confirmBtn = document.getElementById('btn-confirmar');
    const bomDiaText = document.getElementById('bom-dia');
    const playBtn = document.getElementById('play-btn');
    const addThemeSection = document.getElementById('add-theme-section');
  
    addThemeSection.classList.toggle('hide')
    playBtn.classList.toggle('hide');
}

function notifyInvalidWordInput() {
    const notice = document.getElementById('notice');
    notice.classList.add('invalid');
    setTimeout(() => {
        notice.classList.remove('invalid');
    }, 2000);
}

function giveUpGame() {
    const body = document.getElementsByTagName("body")[0];
    const btnContainer = document.querySelectorAll(".buttons-container")[1];
    body.classList.add("initial");
    btnContainer.classList.add("initial");
    addBtn.classList.remove("hide");
    playBtn.classList.add("hide");
    selectThemeBtn.classList.toggle("hide");
    giveUpBtn.classList.add("hide");
    resultadoDiv.classList.add("hide");
    canvas.width = 0;
    canvas.height = 0;
    keyboard.innerHTML = '';
    resetGame();
    themeSelect.selectedIndex = 0;
}

// elements
const canvas = document.querySelector('canvas');
const pencil = canvas.getContext("2d");
const keyboard = document.getElementById('keyboard');
const textStatus = document.getElementById("game-status");
// variables
const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

function resizeCanvas() {
    if (window.innerWidth > 1366) {
        canvas.width = 1200;
        canvas.height = 500;
    } else if (window.innerWidth > 800 && window.innerWidth <= 1366) {
        canvas.width = 800;
        canvas.height = 300;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 1.8;
    }
    pencil.lineWidth = 5;
    pencil.lineCap = "round";
    pencil.lineJoin = "round";
    pencil.strokeStyle = "#dcdcdc";
}

function drawHangman() {
    switch (tries) {
        case 9:
            pencil.beginPath();
            pencil.moveTo((canvas.width / 3) + canvas.width / 3, canvas.height / 2);
            pencil.lineTo(canvas.width / 3, canvas.height / 2);
            pencil.stroke();
            break;
        case 8:
            pencil.moveTo(canvas.width / 2.5, canvas.height / 2);
            pencil.lineTo(canvas.width / 2.5, canvas.height / 10);
            pencil.stroke();
            break;
        case 7:
            pencil.lineTo(canvas.width / 1.8, canvas.height / 10);
            pencil.stroke();
            break;
        case 6:
            pencil.lineTo(canvas.width / 1.8, canvas.height / 6);
            pencil.stroke();
            break;
        case 5:
            pencil.beginPath();
            pencil.arc(canvas.width / 1.8, canvas.height / 4.5, 15, 0, 2 * Math.PI);
            pencil.stroke();
            break;
        case 4:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 3.5)
            pencil.lineTo(canvas.width / 1.8, canvas.height / 2.5);
            pencil.stroke();
            break;
        case 3:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 3.3);
            pencil.lineTo(canvas.width / 1.7, canvas.height / 3)
            pencil.stroke();
            break;
        case 2:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 3.3);
            pencil.lineTo(canvas.width / 1.9, canvas.height / 3)
            pencil.stroke();
            break;
        case 1:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 2.5);
            pencil.lineTo(canvas.width / 1.7, canvas.height / 2.2)
            pencil.stroke();
            break;
        case 0:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 2.5);
            pencil.lineTo(canvas.width / 1.9, canvas.height / 2.2)
            pencil.stroke();
            pencil.closePath();
            break;
    }
}

function drawLines() {
    let axis = (canvas.width / 2) / chosenWord.length;
    let xPosition = (canvas.width / 2) - ((chosenWord.length / 2) * axis);
    let lineWidth = axis / 1.5;

    pencil.clearRect(0, canvas.height - 40, canvas.width, 40); // Limpar a área das linhas

    pencil.beginPath();
    for (let i = 0; i < chosenWord.length; i++) {
        pencil.moveTo(xPosition + (axis * i), canvas.height - 20);
        pencil.lineTo(xPosition + lineWidth + (axis * i), canvas.height - 20);
    }
    pencil.stroke();
    pencil.closePath();
}

function drawCorrectLetter(i) {
    pencil.fillStyle = "#dcdcdc";
    pencil.font = "bold 2rem Poppins";
    let axis = (canvas.width / 2) / chosenWord.length;
    let xPosition = (canvas.width / 2) - ((chosenWord.length / 2) * axis);
    let text = chosenWord[i].toUpperCase();
    xPosition += i * axis + (axis - pencil.measureText(text).width) / 2 - 7;
    pencil.fillText(text, xPosition, canvas.height - 30);
    pencil.stroke();
}


function showEndGameText(status, text, correctWord) {
    textStatus.classList.add(status);
    textStatus.textContent = text + (correctWord ? ` A palavra era: ${correctWord}` : "");
    textStatus.classList.add('end-game-text');
}

function deleteEndGameText() {
    textStatus.classList.remove('win');
    textStatus.classList.remove('lose');
    textStatus.textContent = "";
}

function createVirtualKeyboard() {
    if (keyboard.innerHTML === '') {
        for (let i = 0; i < keys.length; i++) {
            let row = document.createElement('div');
            keyboard.appendChild(row);
            for (let j = 0; j < keys[i].length; j++) {
                let button = document.createElement('button');
                row.appendChild(button);
                button.classList.add('letter');
                button.textContent = keys[i][j];
            }
        }
    }
}

function rearrangeButtons() {
    const body = document.getElementsByTagName("body")[0];
    const btnContainer = document.querySelectorAll(".buttons-container")[1];
    body.classList.remove("initial");
    btnContainer.classList.remove("initial");
    addBtn.classList.add("hide");
    giveUpBtn.classList.remove("hide");
}

let words = JSON.parse(localStorage.getItem('words')) || [
  'teclado', 'abacaxi', 'copo', 'caneta', 'bolo', 'quadrado', 'adesivo', 'marcador',
  'doce', 'folha', 'floresta', 'banco', 'cabelo', 'vermelho', 'desafio', 'porta',
  'tinta', 'roupa', 'planeta', 'cadeira', 'chave', 'pipoca', 'pedra', 'amarelo',
  'vento', 'sombra', 'morango', 'louco', 'sorvete', 'susto', 'cobra', 'estudo',
  'canela', 'rede', 'nuvem', 'caixa', 'dinheiro', 'produto', 'prego', 'perfume',
  'arroz', 'oceano'
];

const themes = JSON.parse(localStorage.getItem('themes')) || {
  esporte: ['futebol', 'basquete', 'natacao', 'volei', 'corrida'],
  audiovisual: ['filme', 'série', 'atores', 'diretor', 'cinema'],
  natureza: ['floresta', 'rio', 'montanha', 'foz', 'praia'],
  all: ['teclado', 'abacaxi', 'copo', 'caneta', 'bolo', 'quadrado', 'adesivo', 'marcador',
  'doce', 'folha', 'floresta', 'banco', 'cabelo', 'vermelho', 'desafio', 'porta',
  'tinta', 'roupa', 'planeta', 'cadeira', 'chave', 'pipoca', 'pedra', 'amarelo',
  'vento', 'sombra', 'morango', 'louco', 'sorvete', 'susto', 'cobra', 'estudo',
  'canela', 'rede', 'nuvem', 'caixa', 'dinheiro', 'produto', 'prego', 'perfume',
  'arroz', 'oceano'
],
};


let chosenWord = "";
let correctWord = "";
let letters = [];
let tries = 10;
let gameOver = false;

function chooseRandomWord(theme) {
  const themeWords = themes[theme];
  if (themeWords && themeWords.length > 0) {
    return themeWords[Math.floor(Math.random() * themeWords.length)].toUpperCase();
  } else {
    return "";
  }
}

function checkLetter(letter) {
    if (!gameOver) {
        if (!letters.includes(letter)) {
            letters.push(letter);
            let letterFound = false;
            for (let i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === letter) {
                    drawCorrectLetter(i);
                    addCorrectLetter(i);
                    letterFound = true;
                }
            }
            if (!letterFound) {
                tries--;
                drawHangman();
                disableKey(letter, "incorrect");
            }
            checkGameOver(); // Verifique o fim do jogo após todas as verificações
        }
    }
}


function checkGameOver() {
    if (tries == 0) {
        // gameover
        showEndGameText("lose", "Fim de Jogo! Você perdeu!", chosenWord);
        gameOver = true;
    }
    if (correctWord.length === chosenWord.length) {
        // gamewin
        showEndGameText("win", "Parabéns! Você venceu!");
        gameOver = true;
    }
}

function addCorrectLetter(i) {
    correctWord += chosenWord[i].toUpperCase();
    // Adicione uma classe CSS para indicar que a letra foi adivinhada corretamente
    const keysButtons = document.querySelectorAll('.letter');
    for (let j = 0; j < keysButtons.length; j++) {
        if (keysButtons[j].textContent === chosenWord[i].toUpperCase()) {
            keysButtons[j].classList.add('correct');
            keysButtons[j].style.color = 'green'; // Altera a cor do texto para verde
            keysButtons[j].disabled = true; // Desabilita o botão para evitar cliques adicionais
            break;
        }
    }
}


function disableKey(key, status) {
    //Add respective class to visually disable key
    const keysButtons = document.querySelectorAll('.letter');
    for (let i = 0; i < keysButtons.length; i++) {
        if (keysButtons[i].textContent === key) {
            keysButtons[i].classList.add(status);
            break;
        }
    }
}

function addListeners() {
    //Adds event listeners to keyboard
    window.addEventListener('keydown', (e) => {
        let letter = e.key.toUpperCase();
        // validation if it's a letter
        if (keys.toString().includes(letter)) {
            checkLetter(letter);
        }
    });

    //Adds events listeners to virtual keyboard
    const keysButtons = document.querySelectorAll('.letter');
    keysButtons.forEach(key => key.addEventListener('click', () => {
        let letter = key.textContent;
        checkLetter(letter);
    }));
}
