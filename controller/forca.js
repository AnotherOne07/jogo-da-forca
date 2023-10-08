import {name} from "./main"

const selectedWord = name

console.log(selectedWord)

const indef = x => typeof x == 'undefined'

const constructWord = (word, pos = null) => {
    if(pos == null)
        pos = 0; 
    return word.length == 0 ? '' : `<td class="border box txt-center" id=${pos}></td>\n` + constructWord(word.slice(1), pos+1);
}

const renderWord = (elem) => {
    const container = document.querySelector('.text tr')
    container.innerHTML = elem
}

const verificarLetra = (letra,[x,...xs],acc=0) => {
    if (indef(x)) return []
    else if (letra == x) return [acc,...verificarLetra(letra,xs,acc+1)]
    else return [...verificarLetra(letra,xs,acc+1)]
}

const insertWord = (id, word) => {
    const box = document.getElementById(id)
    box.innerHTML = word
}

const verifyExistance = (word) => {
    const currentPosition = verificarLetra(word, selectedWord);

    const iteratePosition = (list) => {
        if(list.length == 0)  
            return []

        const currentWord = insertWord(list[0], word)

        return iteratePosition(list.slice(1))
    }


    iteratePosition(currentPosition)
    
}

const currentWord = constructWord(selectedWord)

renderWord(currentWord);

// Just a backup to recovery if something goes bad