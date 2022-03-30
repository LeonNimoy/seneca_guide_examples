const seneca = require('seneca')()

seneca.add('role:math, cmd:sum', (msg, respond) => {
    const sum = msg.left + msg.right
    respond(null, {answer: sum})
})

seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, function (err, result) {
    if (err) return console.error(err)
    console.log(result)
})
