"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tsUnit = require('tsunit.external/tsUnit');
var Parser = require('../../src/');
var Core = require('dab.irc.core/src');
var testSocket = (function () {
    function testSocket(cb) {
        process.nextTick(cb);
    }
    testSocket.prototype.setEncoding = function (enc) {
    };
    testSocket.prototype.on = function (event, cb) {
        if (event == "data")
            this.callback = cb;
    };
    testSocket.prototype.write = function (data) {
        this.callback(":user WROTE " + data + "\r\n");
    };
    testSocket.prototype.disconnect = function () {
    };
    return testSocket;
}());
var SampleIRCContext = (function () {
    function SampleIRCContext() {
        var _this = this;
        this.me = new Core.User("dabirc", "testident", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.commandsFound = {};
        this.dataCallback = function (d) {
            _this.commandsFound[d.command] = (_this.commandsFound[d.command] || 0) + 1;
        };
        this.connectionEstablishedCallback = function (c) {
            c.write("NICK " + _this.me.nick);
            c.write("USER " + _this.me.ident + " 8 * :" + _this.me.name);
        };
        this.me.name = "Real Name";
    }
    SampleIRCContext.prototype.createConnection = function (cb) {
        this.socket = new testSocket(cb);
        return this.socket;
    };
    return SampleIRCContext;
}());
var FunctionalTests = (function (_super) {
    __extends(FunctionalTests, _super);
    function FunctionalTests() {
        _super.apply(this, arguments);
        this.endToEnd_001 = false;
        this.endToEnd_002 = false;
        this.endToEnd_003 = false;
        this.endToEnd_004 = false;
        this.endToEnd_005 = false;
        this.endToEnd_NoticeAuth = false;
        this.endToEnd_PRIVMSG_Chan = false;
        this.endToEnd_PRIVMSG_Chan_Wall = false;
        this.endToEnd_PRIVMSG_Chan_action = false;
        this.endToEnd_PrivmsgPM = false;
        this.endToEnd_ModeUser = false;
        this.endToEnd_ModeChannel_Add = false;
        this.endToEnd_ModeChannel_Remove = false;
        this.endToEnd_Join = false;
        this.endToEnd_Part = false;
        this.endToEnd_Motd = false;
    }
    FunctionalTests.prototype.endToEndTest = function () {
        var _this = this;
        var data = ":kira.orbital.link NOTICE AUTH :*** Looking up your hostname...\r\n" +
            ":servr 001 dabirc :Welcome to the Orbital Link IRC Network dabirc!baditp@127.0.0.0\r\n" +
            ":servr 002 dabirc :Your host is servr, running version Unreal3.2.10.5\r\n" +
            ":servr 003 dabirc :This server was created Sat Sep 12 2015 at 04:46:47 EDT\r\n" +
            ":servr 004 dabirc navi.orbital.link Unreal3.2.10.5 iowghraAsORTVSxNCWqBzvdHtGpI lvhopsmntikrRcaqOALQbSeIKVfMCuzNTGjZ\r\n" +
            ":servr 005 dabirc CHANMODES=beI,kfL,lj,psmntirRcOAQKVCuzNSMTGZ STATUSMSG=~&@%+ :are supported by this server\r\n" +
            ":servr 005 dabirc CHANTYPES=# PREFIX=(qaohv)~&@%+ NETWORK=Orbital-Link CASEMAPPING=ascii EXTBAN=~,qjncrRa :are supported by this server\r\n" +
            ":servr 372 dabirc :-  Here is some generic MOTD message ok?\r\n" +
            ":servr 376 dabirc :End of /MOTD command.\r\n" +
            ":dabirc MODE dabirc :+iwxz\r\n" +
            ":dabirc!baditp@127.0.0.0 JOIN :#test\r\n" +
            ":servr 332 dabirc #test :channel topic would be here in a real channel maybe\r\n" +
            ":servr 333 dabirc #test dabirc2 1466217608\r\n" +
            ":servr 353 dabirc @ #test :dabirc &@dabirc2 ~@dabirc3\r\n" +
            ":servr 366 dabirc #test :End of /NAMES list.\r\n" +
            ":dabirc2!ident@host PRIVMSG #test :testing\r\n" +
            ":dabirc2!ident@host MODE #test +v dabirc\r\n" +
            ":dabirc2!ident@host PRIVMSG +#test :testing\r\n" +
            ":dabirc2!ident@host MODE #test -v dabirc\r\n" +
            ":dabirc2!ident@host PRIVMSG dabirc :test\r\n" +
            ":dabirc2!ident@host PRIVMSG #test :" + "\x01" + "ACTION tests" + "\x01" + "\r\n" +
            ":dabirc!baditp@127.0.0.0 PART #test :Goodbye message\r\n";
        var ctx = new SampleIRCContext();
        var connection = new Core.Connection();
        var svr = new Parser.ParserServer("", connection);
        svr.on("NOTICE", function (s, m) {
            var msg = m;
            _this.areIdentical("AUTH", msg.destination.display, "Destination should be AUTH");
            _this.endToEnd_NoticeAuth = true;
        });
        svr.on("005", function (s, m) {
            _this.isTrue(Object.keys(svr.attributes).length > 0);
            _this.endToEnd_005 = true;
        });
        svr.on("004", function (s, m) {
            _this.endToEnd_004 = true;
        });
        svr.on("003", function (s, m) {
            _this.endToEnd_003 = true;
        });
        svr.on("002", function (s, m) {
            _this.endToEnd_002 = true;
        });
        svr.on("001", function (s, m) {
            _this.endToEnd_001 = true;
        });
        svr.on("372", function (s, m) {
            _this.endToEnd_Motd = true;
        });
        svr.on("MODE", function (s, m) {
            var msg = m;
            if (msg.target instanceof Core.User) {
                _this.areIdentical("i", msg.modes[0].character);
                _this.areIdentical(Core.ModeChangeType.Adding, msg.modes[0].change);
                _this.areIdentical("w", msg.modes[1].character);
                _this.areIdentical(Core.ModeChangeType.Adding, msg.modes[1].change);
                _this.areIdentical("x", msg.modes[2].character);
                _this.areIdentical(Core.ModeChangeType.Adding, msg.modes[2].change);
                _this.areIdentical("z", msg.modes[3].character);
                _this.areIdentical(Core.ModeChangeType.Adding, msg.modes[3].change);
                _this.endToEnd_ModeUser = true;
            }
            else if (msg.target instanceof Core.Channel) {
                if (msg.modes.length == 1) {
                    if (msg.modes[0].change == Core.ModeChangeType.Adding) {
                        _this.areIdentical("v", msg.modes[0].character);
                        _this.areIdentical("dabirc", msg.modes[0].argument);
                        _this.endToEnd_ModeChannel_Add = true;
                    }
                    else {
                        _this.areIdentical("v", msg.modes[0].character);
                        _this.areIdentical("dabirc", msg.modes[0].argument);
                        _this.endToEnd_ModeChannel_Remove = true;
                    }
                }
            }
        });
        svr.on("PRIVMSG", function (s, m) {
            var msg = m;
            if (msg.messageTags["intent"] == "ACTION") {
                _this.areIdentical("tests", msg.message);
                _this.endToEnd_PRIVMSG_Chan_action = true;
            }
            else if (msg.wall == "+") {
                _this.endToEnd_PRIVMSG_Chan_Wall = true;
            }
            else if (msg.destination instanceof Core.User) {
                _this.endToEnd_PrivmsgPM = true;
            }
            else if (msg.destination.display == "#test") {
                _this.endToEnd_PRIVMSG_Chan = true;
            }
        });
        svr.on("372", function (s, m) {
            _this.endToEnd_Motd = true;
        });
        svr.on("JOIN", function (s, m) {
            var msg = m;
            _this.areIdentical("JOIN", msg.command);
            _this.areIdentical("dabirc!baditp@127.0.0.0", msg.from.display);
            _this.areIdentical("#test", msg.destination.display);
            _this.endToEnd_Join = true;
        });
        svr.on("PART", function (s, m) {
            var msg = m;
            _this.areIdentical("PART", msg.command);
            _this.areIdentical("dabirc!baditp@127.0.0.0", msg.from.display);
            _this.areIdentical("#test", msg.destination.display);
            _this.areIdentical("Goodbye message", msg.message);
            _this.endToEnd_Part = true;
        });
        ctx.dataCallback = svr.dataReceived;
        connection.init(ctx);
        ctx.socket.callback(data);
        this.isTrue(this.endToEnd_001, "001 error");
        this.isTrue(this.endToEnd_002, "002 error");
        this.isTrue(this.endToEnd_003, "003 error");
        this.isTrue(this.endToEnd_004, "004 error");
        this.isTrue(this.endToEnd_005, "005 error");
        this.isTrue(this.endToEnd_Join, "join error");
        this.isTrue(this.endToEnd_ModeChannel_Add, "mode channel add error");
        this.isTrue(this.endToEnd_ModeChannel_Remove, "mode channel remove error");
        this.isTrue(this.endToEnd_ModeUser, "mode user error");
        this.isTrue(this.endToEnd_Motd, "motd error");
        this.isTrue(this.endToEnd_NoticeAuth, "notice auth error");
        this.isTrue(this.endToEnd_Part, "part error");
        this.isTrue(this.endToEnd_PRIVMSG_Chan, "privmsg channel error");
        this.isTrue(this.endToEnd_PRIVMSG_Chan_action, "privmsg channel action error");
        this.isTrue(this.endToEnd_PRIVMSG_Chan_Wall, "privmsg channel wall error");
        this.isTrue(this.endToEnd_PrivmsgPM, "privmsg pm error");
    };
    return FunctionalTests;
}(tsUnit.TestClass));
exports.FunctionalTests = FunctionalTests;
