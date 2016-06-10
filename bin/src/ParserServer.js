"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Core = require('dab.irc.core/src');
var events_1 = require('events');
var DynamicParser_1 = require('./DynamicParser');
var ParserServer = (function (_super) {
    __extends(ParserServer, _super);
    function ParserServer(host, connection) {
        var _this = this;
        _super.call(this, host);
        this.attributes = {};
        this.dataReceived = function (data) {
            _this.parser.parse(_this, data, function (s, m) {
                _this.emit(m.command, _this, m);
            });
        };
        this.connection = connection;
        this.parser = new DynamicParser_1.DynamicParser();
        this.events = new events_1.EventEmitter();
        this.on('PING', function (s, m) {
            s.connection.write("PONG " + m.tokenized[1]);
        });
    }
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
    return ParserServer;
}(Core.BaseServer));
exports.ParserServer = ParserServer;
//# sourceMappingURL=ParserServer.js.map