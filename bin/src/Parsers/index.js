"use strict";
var fs = require('fs');
function getParsers() {
    var paths = fs.readdirSync(__dirname);
    var parsers = [];
    for (var i in paths) {
        if (paths[i].indexOf("index") == 0)
            continue;
        if (paths[i].indexOf(".ts") > 0 || paths[i].indexOf(".map") > 0)
            continue;
        var tmp = require(__dirname + "/" + paths[i]);
        tmp = tmp[Object.keys(tmp)[0]];
        if (!tmp)
            continue;
        parsers.push(new tmp());
    }
    return parsers;
}
exports.getParsers = getParsers;
function getParserNames() {
    var paths = fs.readdirSync(__dirname);
    var parsers = [];
    for (var i in paths) {
        if (paths[i].indexOf("index") == 0)
            continue;
        if (paths[i].indexOf("TestParser") == 0)
            continue;
        if (paths[i].indexOf(".ts") > 0 || paths[i].indexOf(".map") > 0)
            continue;
        var tmp = require(__dirname + "/" + paths[i]);
        tmp = tmp[Object.keys(tmp)[0]];
        if (!tmp)
            continue;
        parsers.push(paths[i]);
    }
    return parsers;
}
exports.getParserNames = getParserNames;
