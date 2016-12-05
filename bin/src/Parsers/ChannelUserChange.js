"use strict";
const ChannelUserChangeMessage_1 = require('../MessageTypes/ChannelUserChangeMessage');
const DynamicParser_1 = require('../DynamicParser');
const EventList_1 = require('../EventList');
const EventList_2 = require('../EventList');
const path = require('path');
class ChannelUserChange {
    parse(server, message, callback) {
        let msg = new ChannelUserChangeMessage_1.ChannelUserChangeMessage(message);
        let original_command = msg.command;
        callback(server, msg);
        msg.updateCommandString(EventList_2.ExEvent.create(original_command, msg.destination.display));
        callback(server, msg);
        msg.updateCommandString(EventList_2.ExEvent.create(original_command, msg.from.nick));
        callback(server, msg);
        return true;
    }
    init(context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Events.JOIN] = this;
            this.ctx.parserDictionary[EventList_1.Events.PART] = this;
            return;
        }
        throw new Error("Invalid context passed to ChannelUserChange parser");
    }
    resume(context, state) {
        throw new Error("Don't resume a parser. Please call init");
    }
    uninit() {
        delete this.ctx.parserDictionary[EventList_1.Events.JOIN];
        delete this.ctx.parserDictionary[EventList_1.Events.PART];
        let fullPath = path.join(__dirname, "..", "MessageTypes", "ChannelUserChange.js");
        if (require.cache[fullPath])
            delete require.cache[fullPath];
        return null;
    }
}
exports.ChannelUserChange = ChannelUserChange;
//# sourceMappingURL=ChannelUserChange.js.map