/*Função para verificar a posição de uma letra na palavra */

const indef = x => typeof x == 'undefined'


const verificarLetra = (letra,[x,...xs],acc=0) => {
    if (indef(x)) return []
    else if (letra == x) return [acc,...verificarLetra(letra,xs,acc+1)]
    else return [...verificarLetra(letra,xs,acc+1)]
}



const listaPosicao = verificarLetra('s','pessoas')
console.log(listaPosicao)