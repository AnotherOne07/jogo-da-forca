# Projeto Jogo Da Forca
O jogo da forca se trata de um clássico jogo de adivinhação de palavras. Onde um jogador escolhe letras a fim de completar uma palavra. Caso o jogador selecione uma palavra que não pertence a palavra da rodada, ele perde uma vida. O número de vida não possui um número fixo e pode ser escolhido arbitrariamente.
## Proposta
O projeto consiste em desenvolver uma versão do jogos da velha utilizando as tecnologias CSS, HTML e JavaScript.
Outra característica do projeto é que as funções desenvolvidas devem obedecer ao que define o paradigma da programação funcional.

## Descrição do projeto
### Funcionalidades básicas (Descritas no menu inicial)
    - Iniciar Jogo
    - Gerenciar Temas (Adicionar ou remover palavras)

### Funcionamento
    - Ao iniciar o jogo, o sistema irá exibir uma lista de temas disponíveis.
    - O usuário irá selecionar um tema, então o jogo inicia.
    - O sistema irá selecionar aleatoriamente uma palavra associada ao tema 
    selecionado pelo usuário.
    - O sistema irá exibir uma nova tela, que contém um "teclado virtual", 
    um conjunto de linhas "em branco"(quantidade de linhas será igual ao 
    número de caracteres da palavras selecionada pelo sistema) e um desenho 
    de uma forca.
    - Se o usuário clicar em uma letra do teclado virtual que pertence ao 
    conjunto de caracteres da palavra selecionada aleatoriamente pelo sistema, 
    o sistema irá substituir a linha em branco por uma linha contendo a palavra 
    selecionada pelo usuário.
    - Se o usuário clicar em uma letra que não pertence ao conjunto de caracteres, 
    ele terá sua vida reduzida em uma unidade.
    - Ao final será possível reiniciar o jogo no mesmo tema ou desistir e alterá-lo.

## Padrões adotados
    - Declaração de constantes e funções: camelCase
    - Comentários em português.
    - Linguagem durante a criação a escolha do programador. 
## Equipe de desenvolvimento
- Francisco Almir dos Santos Junior
- Diego Carvalho Cavalcante
- Gabriel
- Yasmim

deploy: https://www.netlify.com/
