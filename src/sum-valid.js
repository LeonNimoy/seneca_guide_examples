const seneca = require('seneca')()

seneca
    .add('role:math, cmd:sum', function (msg, respond) {
        const sum = msg.left + msg.right
        respond(null, {answer: sum})
    })

    .add('role:math, cmd:sum', function (msg, respond) {
        if (!Number.isFinite(msg.left) || !Number.isFinite(msg.right)) {
            return respond(new Error('Expected left and right to be finite numbers'))
        }
        this.prior({
            role: 'math',
            cmd: 'sum',
            left: msg.left,
            right: msg.right,
        }, function (err, result) {
            if (err) return respond(err)
            result.info = msg.left + '+' + msg.right
            respond(null, result)
        })
    })
    .act('role:math, cmd:sum, left:4.5, right:4.5', console.log)
