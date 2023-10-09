const list = [1,2,3,4]

const returnLast = ([x,...xs]) => xs.length == 0 ? x : returnLast(xs)

const last = returnLast(list)


console.log(list)
console.log(last)

// branch de segurança para caso algo dê errado