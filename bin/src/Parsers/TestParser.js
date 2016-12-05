"use strict";
const Core = require('dab.irc.core/src');
const DynamicParser_1 = require('../DynamicParser');
class TestParser {
    parse(server, message, callback) {
        callback(server, new Core.Message(":test.server.tld TEST AUTH :This is a test message"));
        return true;
    }
    init(context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary["TEST"] = this;
            return;
        }
    }
    resume(context, state) {
    }
    uninit() {
        delete this.ctx.parserDictionary["TEST"];
        return null;
    }
}
exports.TestParser = TestParser;
//# sourceMappingURL=TestParser.js.map