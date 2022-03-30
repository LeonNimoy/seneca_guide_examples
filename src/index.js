const seneca = require('seneca')()

seneca.add('role:math, cmd:sum', (msg, respond) => {
    const sum = msg.left + msg.right
    respond(null, {answer: sum})
})

seneca.add('role:math, cmd:sum, integer:true', (msg, respond) => {
    const sum = Math.floor(msg.left) + Math.floor(msg.right)
    respond(null, {answer: sum})
})

seneca.add('role:math, cmd:product', (msg, respond) => {
    const product = msg.left * msg.right
    respond(null, {answer: product})
})

seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, console.log)
    .act({role: 'math', cmd: 'product', left: 2, right: 3}, console.log)
    .act({role: 'math', cmd: 'sum', left: 4.5, right: 4.5, integer: true}, console.log)
