const fs = require('fs')

function math(options) {
    let log;

    this.add('role:math,cmd:sum', sum)
    this.add('role:math,cmd:product', product)

    this.add('init:math', init)

    function init(msg, respond) {
        fs.open(options.logfile, 'a', function (err, fd) {
            if (err) return respond(err)
            log = make_log(fd)
            respond()
        })
    }

    function sum(msg, respond) {
        const out = {answer: msg.left + msg.right}
        log('sum ' + msg.left + '+' + msg.right + '=' + out.answer + '\n')
        respond(null, out)
    }

    function product(msg, respond) {
        const out = {answer: msg.left * msg.right}
        log('product ' + msg.left + '*' + msg.right + '=' + out.answer + '\n')
        respond(null, out)
    }

    function make_log(fd) {
        return function (entry) {
            fs.write(fd, new Date().toString() + ' ' + entry, null, 'utf8', function (err) {
                if (err) return console.log(err)
                fs.fsync(fd, function (err) {
                    if (err) return console.log(err)
                })
            })
        }
    }
}

require('seneca')()
    .use(math, {logfile: './math.log'})
    .act('role:math,cmd:product,left:1,right:2', console.log)
