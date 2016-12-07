"use strict";
const Core = require('dab.irc.core/src');
const events_1 = require('events');
const DynamicParser_1 = require('./DynamicParser');
const Parsers_1 = require('./Parsers');
const EventList = require('./EventList');
class ParserServer extends Core.BaseServer {
    constructor(context, connection, parser = new DynamicParser_1.DynamicParser()) {
        super(context.host);
        this.attributes = {};
        this.dataReceived = (data) => {
            let cb = (s, m) => {
                this.emit(m.command, this, m);
            };
            if (!this._parser.parse(this, data, cb)) {
                let cmd = data.command;
                this.emit(data.command, this, data);
            }
        };
        context.dataCallback = this.dataReceived;
        this.connection = connection;
        this._parser = parser;
        let names = Parsers_1.getParserNames();
        for (let i in names) {
            this._parser.load(names[i]);
        }
        this.events = new events_1.EventEmitter();
        this.on(EventList.Events.PING, (s, m) => {
            s.connection.write("PONG " + m.tokenized[1]);
        });
    }
    get parser() {
        return this._parser;
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    emit(event, ...args) {
        args.splice(0, 0, event);
        this.events.emit.apply(this.events, args);
    }
    addListener(event, listener) {
        this.on(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    removeAllListeners(event) {
        this.events.removeAllListeners(event);
    }
    listeners(event) {
        return this.events.listeners(event);
    }
    eventNames() {
        return this.events.eventNames();
    }
    toString() {
        return "[" + this.display + " ParserServer]";
    }
    isChannel(ch) {
        if (!this.attributes["CHANTYPES"]) {
            this.attributes["CHANTYPES"] = "#&";
        }
        return (this.attributes["CHANTYPES"].indexOf(ch[0]) != -1);
    }
}
exports.ParserServer = ParserServer;
//# sourceMappingURL=ParserServer.js.map