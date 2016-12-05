"use strict";
const NamesMessage_1 = require('../MessageTypes/NamesMessage');
const DynamicParser_1 = require('../DynamicParser');
const EventList_1 = require('../EventList');
const EventList_2 = require('../EventList');
const path = require('path');
class Names {
    parse(server, message, callback) {
        if (!server.attributes["PREFIX"]) {
            server.attributes["PREFIX"] = "(ov)@+";
            server.attributes["PREFIX_MODES"] = "ov";
            server.attributes["PREFIX_PREFIXES"] = "@+";
        }
        let msg = new NamesMessage_1.NamesMessage(message, server);
        callback(server, msg);
        msg.updateCommandString(EventList_2.ExEvent.create(EventList_1.Numerics.NAMREPLY, msg.destination.display));
        callback(server, msg);
        return true;
    }
    init(context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Numerics.NAMREPLY] = this;
            return;
        }
        throw new Error("Invalid context passed to NAMES parser");
    }
    resume(context, state) {
        throw new Error("Don't resume a parser. Please call init");
    }
    uninit() {
        delete this.ctx.parserDictionary[EventList_1.Numerics.NAMREPLY];
        let fullPath = path.join(__dirname, "..", "MessageTypes", "NamesMessage.js");
        if (require.cache[fullPath])
            delete require.cache[fullPath];
        return null;
    }
}
exports.Names = Names;
//# sourceMappingURL=Names.js.map