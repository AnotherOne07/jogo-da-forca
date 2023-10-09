document.addEventListener('DOMContentLoaded', function () {
    const addWordBtn = document.getElementById('add-word-btn');
    addWordBtn.addEventListener('click', () => addNewWord());
  
    const addNewWord = () => {
      const input = document.getElementById('new-word');
      const themeSelector = document.getElementById('theme-selector');
      const selectorTheme = themeSelector.value;
      const notice = document.getElementById('notice');
  
      
      notice.style.color = 'white';
  
      // Verifica se o localStorage já possui temas
      let themes = JSON.parse(localStorage.getItem('themes')) || {};
  
      // verifica o tamanho da palavra
      if (input.value.length >= 4 && input.value.length <= 8) {
        if (selectorTheme === 'geral') {
          // Verifica se a propriedade "all" existe em themes
          if (!themes.all) {
            themes.all = []; // Inicializa como uma matriz vazia se não existir
          }
          themes.all.push(input.value);
        } else if (!themes[selectorTheme]) {
          themes[selectorTheme] = []; // Inicializa como uma matriz vazia se o tema não existir
          themes[selectorTheme].push(input.value);
        } else {
          themes[selectorTheme].push(input.value);
        }
        input.value = '';
        localStorage.setItem('themes', JSON.stringify(themes));
  
        console.log(themes);
      } else {
    
        notifyInvalidWordInput();
        notice.style.color = 'red';
      }
    }
  //deixa o texto vermelho por 2 segundos
    const notifyInvalidWordInput = () => {
      setTimeout(() => {
        
        const notice = document.getElementById('notice');
        notice.style.color = 'white';
      }, 2000);
    }
  })
  
  
  // objeto themes contém temas e cada tema tem uma matriz de palavras associadas a ele
  let themes = JSON.parse(localStorage.getItem('themes')) || {
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
  
