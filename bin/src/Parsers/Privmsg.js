"use strict";
const Core = require('dab.irc.core/src');
const ConversationMessage_1 = require('../MessageTypes/ConversationMessage');
const DynamicParser_1 = require('../DynamicParser');
const EventList_1 = require('../EventList');
const EventList_2 = require('../EventList');
const path = require('path');
class Privmsg {
    parse(server, message, callback) {
        let msg = new ConversationMessage_1.ConversationMessage(message, server);
        let original_command = msg.command;
        callback(server, msg);
        let from = (msg.from instanceof Core.User ? msg.from.nick : msg.from.display);
        msg.updateCommandString(EventList_2.ExEvent.create(original_command, msg.destination.display));
        callback(server, msg);
        msg.updateCommandString(EventList_2.ExEvent.create(original_command, from, msg.destination.display));
        callback(server, msg);
        if (msg.wall) {
            msg.updateCommandString(EventList_2.ExEvent.create(original_command, msg.wall, msg.destination.display));
            callback(server, msg);
            msg.updateCommandString(EventList_2.ExEvent.create(original_command, from, msg.wall, msg.destination.display));
            callback(server, msg);
        }
        return true;
    }
    init(context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Events.PRIVMSG] = this;
            this.ctx.parserDictionary[EventList_1.Events.NOTICE] = this;
            return;
        }
        throw new Error("Invalid context passed to NOTICE/PRIVMSG parser");
    }
    resume(context, state) {
        throw new Error("Don't resume a parser. Please call init");
    }
    uninit() {
        delete this.ctx.parserDictionary[EventList_1.Events.PRIVMSG];
        delete this.ctx.parserDictionary[EventList_1.Events.NOTICE];
        let fullPath = path.join(__dirname, "..", "MessageTypes", "ConversationMessage.js");
        if (require.cache[fullPath])
            delete require.cache[fullPath];
        return null;
    }
}
exports.Privmsg = Privmsg;
//# sourceMappingURL=Privmsg.js.map