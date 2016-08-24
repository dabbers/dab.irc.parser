"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Core = require('dab.irc.core/src');
var events_1 = require('events');
var DynamicParser_1 = require('./DynamicParser');
var Parsers_1 = require('./Parsers');
var EventList = require('./EventList');
var ParserServer = (function (_super) {
    __extends(ParserServer, _super);
    function ParserServer(host, connection, parser) {
        var _this = this;
        if (parser === void 0) { parser = new DynamicParser_1.DynamicParser(); }
        _super.call(this, host);
        this.attributes = {};
        this.dataReceived = function (data) {
            var cb = function (s, m) {
                _this.emit(m.command, _this, m);
            };
            if (!_this._parser.parse(_this, data, cb)) {
                var cmd = data.command;
                _this.emit(data.command, _this, data);
            }
        };
        this.connection = connection;
        this._parser = parser;
        var names = Parsers_1.getParserNames();
        for (var i in names) {
            this._parser.load(names[i]);
        }
        this.events = new events_1.EventEmitter();
        this.on(EventList.Events.PING, function (s, m) {
            s.connection.write("PONG " + m.tokenized[1]);
        });
    }
    Object.defineProperty(ParserServer.prototype, "parser", {
        get: function () {
            return this._parser;
        },
        enumerable: true,
        configurable: true
    });
    ParserServer.prototype.on = function (event, listener) {
        this.events.on(event, listener);
    };
    ParserServer.prototype.once = function (event, listener) {
        this.events.once(event, listener);
    };
    ParserServer.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        args.splice(0, 0, event);
        this.events.emit.apply(this.events, args);
    };
    ParserServer.prototype.addListener = function (event, listener) {
        this.on(event, listener);
    };
    ParserServer.prototype.removeListener = function (event, listener) {
        this.events.removeListener(event, listener);
    };
    ParserServer.prototype.removeAllListeners = function (event) {
        this.events.removeAllListeners(event);
    };
    ParserServer.prototype.listeners = function (event) {
        return this.events.listeners(event);
    };
    ParserServer.prototype.eventNames = function () {
        return this.events.eventNames();
    };
    ParserServer.prototype.toString = function () {
        return "[" + this.display + " ParserServer]";
    };
    ParserServer.prototype.isChannel = function (ch) {
        if (!this.attributes["CHANTYPES"]) {
            this.attributes["CHANTYPES"] = "#&";
        }
        return (this.attributes["CHANTYPES"].indexOf(ch[0]) != -1);
    };
    return ParserServer;
}(Core.BaseServer));
exports.ParserServer = ParserServer;
