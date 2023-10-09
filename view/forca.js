// Sessão de inicialização
// const selectedWord = myWord;
const menuUrl = 'projeto-jogo-da-forca\view\index.html'

// Obtendo elemento da forca
const drawForca = document.getElementById("forca").children
const arrayDrawForca = Array.from(drawForca)


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
  // escolhe aleatoriamente uma palavra com base no tema selecionado
  // Para essa função, era estritamente necessário que utiliza um comportamento randomico
  // A alternativa a isso seria utilizar um outro input, onde o formulario escolheria um numero e esse numero seria correspondente
  // a alguma palavra na lista de palavras
  function chooseRandomWord(theme) {
    const themeWords = themes[theme];
    if (themeWords && themeWords.length > 0) {
      return themeWords[Math.floor(Math.random() * themeWords.length)].toUpperCase();
    } else {
      return "";
    }
  }

// Variável que irá receber a palavra sorteada. Apesar de receber o statement LET, o valor de selectedWord só é atualizado uma vez
// portando, apesar de dar margem para edição, esse comportamento não ocorre durante uma mesma rodada do jogo
let selectedWord;

// Função que irá selecionar o tema antes de iniciar o jogo e irá selecionar a palavra sorteada
const startGame = () => {
    const container = document.getElementById('theme-select-container')
    const selectedTheme = document.getElementById('theme-select')
    const theme = selectedTheme.value
    const forca = document.getElementById('main')

    // Se o jogador tiver selecionado um tema, será exibida a forca ja com a palavra sorteada
    // Se o jogador nao selecionar um tema, sera exibida uma mensagem de erro
    if(theme !== ''){
        const randomSelectedWord = chooseRandomWord(theme)
        selectedWord = randomSelectedWord
        
        // Ocultando os termos que nao devem aparecer durante a execução do jogo
        // E renderizando elementos que devem ser exibidos
        container.classList.add('hide')
        forca.classList.remove('hide')
        
        // Renderizando a palavra na tela, inserindo o devido elemento HTML
        const currentWord = constructWord(selectedWord)
        renderWord(currentWord)
    }else{
        const errorMsg = document.getElementById('errorMsg')
        errorMsg.classList.remove('hide')
    }
    return 0
}


// Função que irá desativar o teclado a fim de evitar que o jogador pressione uma tecla após ter perdido a rodada
const disableKeyboard = () => {
    // Acessando o DOM para selecionar os elementos HTML que representam o teclado no layout
    const btKeyboard = document.getElementsByClassName('bt-keyboard')
    const arrayBtKeyboard = Array.from(btKeyboard)
    
    // Função que irá iterar através dos elementos obtidos no HTML para atribuir a propriedade disabled
    const iterateKeyboard = (keyList) => {
        if(keyList.length == 0)
            return 0

        const [head,...tail] = keyList
        // Atribuindo a propriedade disabled ao elemento HTML que representa a tecla 
        head.disabled = true
        return iterateKeyboard(tail)
    }
    // Chamada da função que irá iterar
    iterateKeyboard(arrayBtKeyboard)
}

// Função que irá renderizar na tela a caixa de texto informando que o usuário venceu a rodada e as opções que ele tem a seguir
const showSucessAlert = () => {
    const sucessAlert = document.getElementById('succesAlert')
    sucessAlert.classList.remove('hidden')

    // Chamada da função para desativar o teclado
    disableKeyboard()
}

// Função que irá renderizar elemento HTML que indica que o usuário perdeu a rodada
const showFailAlert = () => {
    const sucessAlert = document.getElementById('failAlert')
    sucessAlert.classList.remove('hidden')

    // Chamada da função para desativar o teclado
    disableKeyboard()
}

// Função que verifica se o jogador venceu a rodada, ou seja, se todos os campos foram devidademente preenchidos
const checkIfWin = () => {
    // Seleciona o elemento HTML
    const word = document.getElementById("word").children
    // Transforma em um array
    const arrayWord = Array.from(word)
    
    // Função que verifica se todos os campos estão preenchidos, caso tenha algum campo vazio retorna false
    const iterateWord = (list) => {
        if(list.length == 0)
            return true
        
        const [head,...tail] = list
        
        if(head.innerHTML !== "")
            return true && iterateWord(tail)
        
        return false 
    }

    // Chamada da função que irá iterar os campos da palavra para verificar se o usuário venceu a rodada
    return iterateWord(arrayWord)
}

const indef = x => typeof x == 'undefined';

// Função para obter o útimo elemento de uma lista
const returnLast = ([x,...xs]) => xs.length == 0 ? x : returnLast(xs)

// Função que gera o HTML que representa as "caixas" da palavra
const constructWord = (word, pos = null) => {
    if(pos == null)
        pos = 0; 
    return word.length == 0 ? '' : `<td class="border box txt-center" id=${pos}></td>\n` + constructWord(word.slice(1), pos+1);
}

// Função que renderiza o código HTML criado pela função constructWord
const renderWord = (elem) => {
    const container = document.querySelector('.text tr')
    container.innerHTML = elem
}

// Função que receb como parâmetro uma letra e verifica se ela existe em uma palavra, retornando uma lista com as posições onde a palavra foi encontrada
const verifyWord = (letra,[x,...xs],acc=0) => {
    if (indef(x)) return []
    else if (letra == x) return [acc,...verifyWord(letra,xs,acc+1)]
    else return [...verifyWord(letra,xs,acc+1)]
}

// Função que dada uma posicão(id) e uma string, irá renderizar na tela a string na posição indicada
const insertWord = (id, word) => {
    const box = document.getElementById(id)
    // console.log(box)
    box.innerHTML = word    
}

// Função para renderizar o desenho da forca
const renderDraw = (draw) => {
    
    const [head,...tail] = draw
    // Funçao que remove a classe hide do elemento
    const removeElement = head.classList.remove("hide")
    // Para esse método foi estritamente necessário alterar uma lista original pois é necessário que enquanto o programa estiver em execução
    // exista uma ideia de "vida" do jogador
    draw.shift()
    if(draw.length == 2){
        showFailAlert()
    }
}

// Função que verifica a existência da letra na palavra e realiza a devida ação para o caso de existir ou não existir
const verifyExistance = (word) => {
    // Verifica se dada a letra word, existe alguma posição na palavra da rodada que corresponda
    const currentPosition = verifyWord(word, selectedWord);

    // Função que dada uma lista, faz uma iteração para adicionar a letra às posições correspondentes
    const iteratePosition = (list) => {
        if(list.length == 0)  
            return []

        const currentWord = insertWord(list[0], word)

        return iteratePosition(list.slice(1))
    }

    if(currentPosition.length > 0){
        iteratePosition(currentPosition)
        if(checkIfWin())
            // console.log('true')
            // alert('Parabéns, você acertou a palavra!')
            showSucessAlert()
        // else
        //     console.log('false')
    }
    else
        renderDraw(arrayDrawForca)
}

// Renderizando a palavra na tela, inserindo o devido elemento HTML
// const currentWord = constructWord(selectedWord);
// renderWord(currentWord);