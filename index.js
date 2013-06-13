var ejs = require('ejs'),
    through = require('through')

var filenamePattern = /\.(html|ejs)$/

var wrap = function(template) {
    return 'module.exports=(function() {var t = ' + template + '; return function(l) { return t(l) }}())'
}

module.exports = function(file) {
    if (!filenamePattern.test(file)) return through()

    var input = ''
    var write = function(buffer) {
        input += buffer
    }

    var end = function() {
        this.queue(wrap(ejs.compile(input, {client: true, compileDebug: false})))
        this.queue(null)
    }

    return through(write, end)
}
