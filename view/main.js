//As linhas de 2-11 nomeiam a seleção elementos HTML com base em seus IDs para manipular depois.
const playBtn = document.getElementById('play-btn');
const addBtn = document.getElementById('add-btn');
const addWordBtn = document.getElementById('add-word-btn');
const cancelBtn = document.getElementById('cancel-btn');
const returnBtn = document.getElementById('reurtn-btn')
const giveUpBtn = document.getElementById('give-up-btn');
const selectThemeBtn = document.getElementById('select-theme-btn');
const themeSelect = document.getElementById('theme-select');
const confirmBtn = document.getElementById('btn-confirmar');
const resultadoDiv = document.getElementById('resultado');

// As linhas de 15-22 são event listeners, funções que condicionais dependentes da ocorrÊncia de algo em um elemento html.
// As funções presentes em cada event listener serão melhor detalhadas depois, aqui irá apenas uma leve introdução.
playBtn.addEventListener('click', createGameBoard); //createGameBoard irá inicializar o jogo, criando o tabuleiro e definindo alguns de seus elementos.
addBtn.addEventListener('click', toggleAddSection); //toggleAddSection oculta e desoculta a tela de adicionar palavras ao clicar no botão com o mesmo nome.
addWordBtn.addEventListener('click', addNewWord); //addNewWord adiciona uma nova palavra a lista de palavras após a verificação de validade (tamanho e acentuação).
cancelBtn.addEventListener('click', toggleAddSection); // já explicado anteriormente
giveUpBtn.addEventListener('click', giveUpGame); //giveUpGame forma a desistência do jogo, redefinindo os elementos do jogo.
selectThemeBtn.addEventListener('click', toggleThemeSelection); //toggleThemeSelection funciona em suma da mesma forma que o toggleAddSection porém, agora, para ocultar
//e desocultar a tela de seleção de temas.
confirmBtn.addEventListener('click', playThemes); //playThemes é a função que irá iniciar o jogo a depender do tema selecionado

//função que irá "alterar" a página, no caso ocultar alguns recursos visuais, para a página de adição de palavras
function toggleAddSection() {
    const addSection = document.getElementById('add-section'); //nomeia a seção html "add-section" assim facilitando com que em vez de ter que alterar o 'hide' de cada elemento possa alterar 
//diretamente o da seção completa
    addSection.classList.toggle('hide'); // pega a seção acima nomeada e altera com o .toggle agindo na sua class o estado do seu 'hide', como foi inicialmente definido como 'hide' em sua base o 
//altera agora deixando a seção visível
    playBtn.classList.add('hide'); // utiliza do mesmo recurso de usar o .classList para manipular a lista, e neste caso adicionar com .add o estado de 'hide' aoplayBtn
    addBtn.classList.toggle('hide'); // novamente utiliza de .classList com .toggle para alterar o estado naturalmente definido como 'hide'
    selectThemeBtn.classList.toggle('hide'); // mesma coisa do campo superior
}
//OBS.: essa lógica é bem interessante pois ao nomear a seção no html fica mais fácil alterar os estados de todos os elementos da seção, tendo apenas poucos para manipular por fora

//função que irá "alterar" a página, no caso ocultar alguns recursos visuais, para a página de seleção de tema e ínicio do jogo
function toggleThemeSection() {
    const addThemeSection = document.getElementById('add-theme-section'); //assim como a const addSection da linha 26 nomeia a seção "add-theme-section" do html
    const bomDiaText = document.getElementById('bom-dia'); // nomeia o id "bom-dia" porém isso é irrelevante o texto tá só pra teste
    
    addThemeSection.classList.toggle('hide'); // utiliza de .classList e .toggle para alterar o 'hide' originalmente estabelecido
    bomDiaText.classList.toggle('hide'); // mesma coisa de cima
    confirmBtn.classList.remove('hide'); // remove a classe 'hide' do confirmBtn assim mostrando-o na tela
    themeSelect.style.display = ('block'); // utiliza do .display com 'block' para mostrar a caixa de seleção de temas
    playBtn.classList.add('hide'); // esconde o playBtn
    addBtn.classList.add('hide'); // esconde o botão de adicionar palavras
    selectThemeBtn.classList.add('hide'); // esconde o botão que levou à atual página
}
