var ejs = require('ejs'),
    through = require('through')

var filenamePattern = /\.(html|ejs)$/

module.exports = function(file) {
    if (!filenamePattern.test(file)) return through()

    var template = ''
    var write = function(buffer) {
        template += buffer
    }

    var end = function() {
        this.queue('module.exports=' + ejs.compile(template, {client: true}))
        this.queue(null)
    }

    return through(write, end)
}
