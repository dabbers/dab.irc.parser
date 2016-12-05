"use strict";
const NickChangeMessage_1 = require('../MessageTypes/NickChangeMessage');
const DynamicParser_1 = require('../DynamicParser');
const EventList_1 = require('../EventList');
const EventList_2 = require('../EventList');
const path = require('path');
class NickChange {
    parse(server, message, callback) {
        let msg = new NickChangeMessage_1.NickChangeMessage(message);
        callback(server, msg);
        msg.updateCommandString(EventList_2.ExEvent.create(msg.command, msg.from.nick));
        callback(server, msg);
        return true;
    }
    init(context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Events.NICK] = this;
            return;
        }
        throw new Error("Invalid context passed to Nick parser");
    }
    resume(context, state) {
        throw new Error("Don't resume a parser. Please call init");
    }
    uninit() {
        delete this.ctx.parserDictionary[EventList_1.Events.NICK];
        let fullPath = path.join(__dirname, "..", "MessageTypes", "NickChangeMessage.js");
        if (require.cache[fullPath])
            delete require.cache[fullPath];
        return null;
    }
}
exports.NickChange = NickChange;
//# sourceMappingURL=Nick.js.map