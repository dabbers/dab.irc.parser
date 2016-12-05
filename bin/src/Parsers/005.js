"use strict";
const DynamicParser_1 = require('../DynamicParser');
const EventList_1 = require('../EventList');
class Do005 {
    parse(server, message, callback) {
        for (var i = 3; i < message.tokenized.length; i++) {
            let key = "";
            let value = "";
            if (message.tokenized[i] == ":are")
                break;
            if (message.tokenized[i].indexOf("=") != -1) {
                let sep = message.tokenized[i].split("=");
                key = sep[0];
                value = sep[1];
            }
            else {
                key = value = message.tokenized[i];
            }
            server.attributes[key] = value;
        }
        if (server.attributes["PREFIX"]) {
            let tosplit = server.attributes["PREFIX"].substring(1);
            let split = tosplit.split(')');
            server.attributes["PREFIX_MODES"] = split[0];
            server.attributes["PREFIX_PREFIXES"] = split[1];
        }
        if (server.attributes["CHANMODES"]) {
            let chanmodes = server.attributes["CHANMODES"].split(',');
            server.attributes["CHANMODES_A"] = chanmodes[0];
            server.attributes["CHANMODES_B"] = chanmodes[1];
            server.attributes["CHANMODES_C"] = chanmodes[2];
            server.attributes["CHANMODES_D"] = chanmodes[3];
        }
        return false;
    }
    init(context, noResume) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Numerics.ISUPPORT] = this;
            return;
        }
        throw new Error("Invalid context passed to 005 parser");
    }
    resume(context, state) {
        throw new Error("Don't resume a parser. Please call init");
    }
    uninit() {
        delete this.ctx.parserDictionary[EventList_1.Numerics.ISUPPORT];
        return null;
    }
}
exports.Do005 = Do005;
//# sourceMappingURL=005.js.map