"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tsUnit = require('tsunit.external/tsUnit');
var Parser = require('../../src/');
var Core = require('dab.irc.core/src');
var BasicTests = (function (_super) {
    __extends(BasicTests, _super);
    function BasicTests() {
        _super.call(this);
        this.servr = new Parser.ParserServer("a", null);
        this.servr.attributes["STATUSMSG"] = "~&@%+";
    }
    BasicTests.prototype.privmsgTest = function () {
        var m = new Parser.ConversationMessage(new Core.Message(":nick!ident@host PRIVMSG #channel :Hello world"), this.servr);
        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");
    };
    BasicTests.prototype.privmsgWallTest = function () {
        var m = new Parser.ConversationMessage(new Core.Message(":nick!ident@host PRIVMSG +#channel :Hello world"), this.servr);
        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");
        this.areIdentical("+", m.wall);
    };
    BasicTests.prototype.noticeWallTest = function () {
        var m = new Parser.ConversationMessage(new Core.Message(":nick!ident@host NOTICE +#channel :Hello world"), this.servr);
        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");
        this.areIdentical("+", m.wall);
    };
    BasicTests.prototype.privmsgMessageActionTest = function () {
        var m = new Parser.ConversationMessage(new Core.Message(":nick!ident@host NOTICE +#channel :" + "\x01" + "ACTION Hello world" + "\x01"), this.servr);
        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");
        this.areIdentical("+", m.wall);
        this.isTrue(m.ctcp, "Not CTCP");
        this.areIdentical("Hello", m.firstWord);
        this.areIdentical("ACTION", m.messageTags["intent"]);
        this.areIdentical("Hello world", m.message);
        this.areIdentical(":Hello", m.tokenized[3]);
        this.areIdentical("world", m.tokenized[4]);
    };
    BasicTests.prototype.privmsgMessageIntentActionTest = function () {
        var m = new Parser.ConversationMessage(new Core.Message("@intent=ACTION :nick!ident@host NOTICE +#channel :Hello world"), this.servr);
        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");
        this.areIdentical("+", m.wall);
        this.isTrue(m.ctcp, "Not CTCP");
        this.areIdentical("Hello", m.firstWord);
        this.areIdentical("ACTION", m.messageTags["intent"]);
        this.areIdentical("Hello world", m.message);
        this.areIdentical(":Hello", m.tokenized[3]);
        this.areIdentical("world", m.tokenized[4]);
    };
    return BasicTests;
}(tsUnit.TestClass));
exports.BasicTests = BasicTests;
