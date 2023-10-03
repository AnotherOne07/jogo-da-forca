//As linhas de 2-8 nomeiam a seleção elementos HTML com base em seus IDs para manipular depois.
const playBtn = document.getElementById('play-btn');
const addBtn = document.getElementById('add-btn');
const addWordBtn = document.getElementById('add-word-btn');
const cancelBtn = document.getElementById('cancel-btn');
const giveUpBtn = document.getElementById('give-up-btn');
const selectThemeBtn = document.getElementById('select-theme-btn');
const themeSelect = document.getElementById('theme-select');

// As linhas de 11-16 são event listeners, funções que condicionais dependentes da ocorrÊncia de algo em um elemento html.
// As funções presentes em cada event listener serão melhor detalhadas depois, aqui irá apenas uma leve introdução.
playBtn.addEventListener('click', createGameBoard); //createGameBoard irá inicializar o jogo, criando o tabuleiro e definindo alguns de seus elementos.
addBtn.addEventListener('click', toggleAddSection); //toggleAddSection oculta e desoculta a tela de adicionar palavras ao clicar no botão com o mesmo nome.
addWordBtn.addEventListener('click', addNewWord); //addNewWord adiciona uma nova palavra a lista de palavras após a verificação de validade (tamanho e acentuação).
cancelBtn.addEventListener('click', toggleAddSection); // já explicado anteriormente
giveUpBtn.addEventListener('click', giveUpGame); //giveUpGame forma a desistência do jogo, redefinindo os elementos do jogo.
selectThemeBtn.addEventListener('click', toggleThemeSelection); //toggleThemeSelection funciona em suma da mesma forma que o toggleAddSection porém, agora, para ocultar
//e desocultar a tela de seleção de temas.
