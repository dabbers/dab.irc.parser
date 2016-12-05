"use strict";
const path = require('path');
class DynamicParser {
    constructor() {
        this.parserDictionary = {};
        this.parsers = {};
    }
    parse(server, message, callback) {
        if (this.parserDictionary[message.command]) {
            return this.parserDictionary[message.command].parse(server, message, callback);
        }
        return false;
    }
    load(name, noResume) {
        name = name.replace(".js", "").replace(".", "");
        let fullPath = path.join(__dirname, "Parsers", name);
        if (require.cache[fullPath + ".js"])
            delete require.cache[fullPath + ".js"];
        if (this.parsers[name])
            this.unload(name, false);
        let obj = require(fullPath);
        let indx = Object.keys(obj)[0];
        let fnc = obj[indx];
        if (!fnc)
            throw new Error("Could not load module because of no index with the same classname exists: " + name);
        let inst = new fnc();
        if (!inst.init)
            throw new Error("Could not load module because the class doesn't export an init function: " + name);
        inst.init(this);
        this.parsers[name] = inst;
        return this;
    }
    unload(name, persist) {
        if (this.parsers[name]) {
            this.parsers[name].uninit();
            delete this.parsers[name];
        }
        return this;
    }
    init(context) {
    }
    resume(state) {
    }
    uninit() {
        return null;
    }
}
exports.DynamicParser = DynamicParser;
//# sourceMappingURL=DynamicParser.js.map