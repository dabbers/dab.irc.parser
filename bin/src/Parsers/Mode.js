"use strict";
const Core = require('dab.irc.core/src');
const ModeChangeMessage_1 = require('../MessageTypes/ModeChangeMessage');
const DynamicParser_1 = require('../DynamicParser');
const EventList_1 = require('../EventList');
const EventList_2 = require('../EventList');
const path = require('path');
class Mode {
    parse(server, message, callback) {
        var attr = server.attributes;
        if (!attr["CHANTYPES"]) {
            attr["CHANTYPES"] = "#&";
        }
        let msg = new ModeChangeMessage_1.ModeChangeMessage(message, server);
        callback(server, msg);
        msg.updateCommandString(EventList_2.ExEvent.create("MODE", msg.destination.display));
        callback(server, msg);
        for (let i in msg.modes) {
            msg.updateCommandString(EventList_2.ExEvent.create("MODE", msg.destination.display, function (j) { return msg.modes[j].character; }(i)));
            callback(server, msg);
            msg.updateCommandString(EventList_2.ExEvent.create("MODE", msg.destination.display, function (j) { return (msg.modes[j].change == Core.ModeChangeType.Adding ? "+" : "-") + msg.modes[j].character; }(i)));
            callback(server, msg);
        }
        return true;
    }
    init(context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Events.MODE] = this;
            return;
        }
        throw new Error("Invalid context passed to Mode parser");
    }
    resume(context, state) {
        throw new Error("Don't resume a parser. Please call init");
    }
    uninit() {
        delete this.ctx.parserDictionary[EventList_1.Events.MODE];
        let fullPath = path.join(__dirname, "..", "MessageTypes", "ModeChangeMessage.js");
        if (require.cache[fullPath])
            delete require.cache[fullPath];
        return null;
    }
}
exports.Mode = Mode;
//# sourceMappingURL=Mode.js.map