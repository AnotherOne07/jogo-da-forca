// nomeando o id do html pra facilitar a manipulação
const playBtn = document.getElementById('play-btn');
const addBtn = document.getElementById('add-btn');
const addWordBtn = document.getElementById('add-word-btn');
const cancelBtn = document.getElementById('cancel-btn');
const giveUpBtn = document.getElementById('give-up-btn');
const selectThemeBtn = document.getElementById('select-theme-btn');
const themeSelect = document.getElementById('theme-select');
const confirmBtn = document.getElementById('btn-confirmar');
const resultadoDiv = document.getElementById('resultado');


//função que é utilizada ao clicar no botão de iniciar, sorteando uma palavra com math.random
function playThemes() {
  const selectedTheme = themeSelect.value;
  const themesList = Object.keys(themes);
  if (selectedTheme === 'iniciar-jogo') {
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


// adiciona eventos, no caso a execução de funções ao clique
playBtn.addEventListener('click', () => createGameBoard());
addBtn.addEventListener('click', () => toggleAddSection());
addWordBtn.addEventListener('click', () => addNewWord());
cancelBtn.addEventListener('click', () => toggleAddSection());
giveUpBtn.addEventListener('click', () => giveUpGame());
selectThemeBtn.addEventListener('click', () => toggleThemeSection());
confirmBtn.addEventListener('click', () => playThemes());



// função que inicializa o jogo, "cria o tabuleiro"
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

//exclui qualquer texto de final de jogo, define a gameOver como false escolhe uma nova palavra com base no tema selecionado
//redefine a palavra correta, a lista de letras e as tentativas restantes. basicamente reseta o jogo
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

//mostra ou esconde a seção onde você pode adicionar novas palavras. Ela faz isso alternando a classe CSS 'hide' com classList.toggle ou .add ou .remove
function toggleAddSection() {
    const addSection = document.getElementById('add-section');
    addSection.classList.toggle('hide');
    playBtn.classList.add('hide');
    addBtn.classList.toggle('hide');
    selectThemeBtn.classList.toggle('hide');
}

//mesma coisa da função acima porém agora com a seção de seleção de temas
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

//pega o valor digitado no campo de entrada e verifica se o comprimento da palavra está entre 4 e 8 caracteres. 
//Se for uma palavra válida, ela verifica o tema selecionado no seletor e adiciona a palavra à lista de palavras desse tema
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

//oculta elementos que não são necessários durante o jogo
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

//exibe uma mensagem de notificação para informar ao jogador que a palavra que ele tentou adicionar é inválida
function notifyInvalidWordInput() {
    const notice = document.getElementById('notice');
    notice.classList.add('invalid');
    setTimeout(() => {
        notice.classList.remove('invalid');
    }, 2000);
}

//redefine o jogo, esconde o resultado do jogo anterior e exibe os botões da tela inicial
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

// elementos para "desenhar"
const canvas = document.querySelector('canvas');
const pencil = canvas.getContext("2d");
const keyboard = document.getElementById('keyboard'); //responsavel pelo teclado
const textStatus = document.getElementById("game-status"); // exibe vitória ou derrota

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

//é uma função que ajusta o tamanho do elemento <canvas> com base na largura da janela do navegador, para exibir corretamente em diferentes tamanhos de tela
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

//é uma função que desenha o enforcado na tela com base no número de tentativas restantes 
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

//desenha as linhas representando as letras da palavra
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

//desenha a letra corretamente advinhada na tela
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

//é uma função que exibe o resultado do jogo na tela, e exibe a palavra correta que o jogador deveria adivinhar caso ele perca
function showEndGameText(status, text, correctWord) {
    textStatus.classList.add(status);
    textStatus.textContent = text + (correctWord ? ` A palavra era: ${correctWord}` : "");
    textStatus.classList.add('end-game-text');
}

//remove o texto de resultado do jogo da tela
function deleteEndGameText() {
    textStatus.classList.remove('win');
    textStatus.classList.remove('lose');
    textStatus.textContent = "";
}

//cria o teclado virtual na tela com base nas letras definidas na matriz keys
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

// mexe no layout da página quando o jogo se inicia, escondendo botões como o de adicionar palavras e mostrando o de desistir
function rearrangeButtons() {
    const body = document.getElementsByTagName("body")[0];
    const btnContainer = document.querySelectorAll(".buttons-container")[1];
    body.classList.remove("initial");
    btnContainer.classList.remove("initial");
    addBtn.classList.add("hide");
    giveUpBtn.classList.remove("hide");
}

// a matriz words contém uma lista de palavras que podem ser usadas no jogo
let words = JSON.parse(localStorage.getItem('words')) || [
  'teclado', 'abacaxi', 'copo', 'caneta', 'bolo', 'quadrado', 'adesivo', 'marcador',
  'doce', 'folha', 'floresta', 'banco', 'cabelo', 'vermelho', 'desafio', 'porta',
  'tinta', 'roupa', 'planeta', 'cadeira', 'chave', 'pipoca', 'pedra', 'amarelo',
  'vento', 'sombra', 'morango', 'louco', 'sorvete', 'susto', 'cobra', 'estudo',
  'canela', 'rede', 'nuvem', 'caixa', 'dinheiro', 'produto', 'prego', 'perfume',
  'arroz', 'oceano'
];

// objeto themes contém temas e cada tema tem uma matriz de palavras associadas a ele
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

// variaveis usadas para entender o andamento do jogo
let chosenWord = ""; // armazena a palavra da vez
let correctWord = ""; // armazena as letras corretas
let letters = []; // armazena as letras já chutadas
let tries = 10; // número de tentativas
let gameOver = false; // indica se o jogo terminou

//escolhe aleatoriamente uma palavra com base no tema selecionado
function chooseRandomWord(theme) {
  const themeWords = themes[theme];
  if (themeWords && themeWords.length > 0) {
    return themeWords[Math.floor(Math.random() * themeWords.length)].toUpperCase();
  } else {
    return "";
  }
}

//verifica se o jogo não terminou, se a letra ainda não foi adivinhada
//e então atualiza o estado do jogo com base na adivinhação do jogador
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

//verifica as tentativas 
// se número de tentativas chegar a zero, o jogador perdeu o jogo, e a função showEndGameText() é chamada para exibir a mensagem de derrota
// se todas as letras corretas foram adivinhadas, o jogador venceu o jogo, e a função showEndGameText() é chamada para exibir a mensagem de vitória
function checkGameOver() {
    if (tries == 0) {

        showEndGameText("lose", "Fim de Jogo! Você perdeu!", chosenWord);
        gameOver = true;
    }
    if (correctWord.length === chosenWord.length) {

        showEndGameText("win", "Parabéns! Você venceu!");
        gameOver = true;
    }
}

function addCorrectLetter(i) {
    correctWord += chosenWord[i].toUpperCase();
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

// é usada para desativar visualmente uma tecla (botão) no teclado virtual
function disableKey(key, status) {
    const keysButtons = document.querySelectorAll('.letter');
    for (let i = 0; i < keysButtons.length; i++) {
        if (keysButtons[i].textContent === key) {
            keysButtons[i].classList.add(status);
            break;
        }
    }
}

// adiciona os eventos de clique ao teclado normal
function addListeners() {

    window.addEventListener('keydown', (e) => {
        let letter = e.key.toUpperCase();

        if (keys.toString().includes(letter)) {
            checkLetter(letter);
        }
    });

    // adiciona os eventos de clique ao teclado virtual
    const keysButtons = document.querySelectorAll('.letter');
    keysButtons.forEach(key => key.addEventListener('click', () => {
        let letter = key.textContent;
        checkLetter(letter);
    }));
}
