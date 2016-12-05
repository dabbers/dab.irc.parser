"use strict";
const tsUnit = require('tsunit.external/tsUnit');
const Parser = require('../../src/');
const Core = require('dab.irc.core/src');
class testSocket {
    constructor(cb) {
        process.nextTick(cb);
    }
    setEncoding(enc) {
    }
    on(event, cb) {
        if (event == "data")
            this.callback = cb;
    }
    write(data) {
        this.callback(":user WROTE " + data + "\r\n");
    }
    disconnect() {
    }
}
class SampleIRCContext {
    constructor() {
        this.me = new Core.User("dabirc", "testident", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.commandsFound = {};
        this.dataCallback = (d) => {
            this.commandsFound[d.command] = (this.commandsFound[d.command] || 0) + 1;
        };
        this.connectionEstablishedCallback = (c) => {
            c.write("NICK " + this.me.nick);
            c.write("USER " + this.me.ident + " 8 * :" + this.me.name);
        };
        this.me.name = "Real Name";
    }
    createConnection(cb) {
        this.socket = new testSocket(cb);
        return this.socket;
    }
}
class FunctionalTests extends tsUnit.TestClass {
    constructor() {
        super(...arguments);
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
        this.endToEnd_Names = false;
    }
    endToEndTest() {
        let data = ":kira.orbital.link NOTICE AUTH :*** Looking up your hostname...\r\n" +
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
            ":servr 353 dabirc @ #test :dabirc &dabirc2 ~@dabirc3 dabirc4 &@dabirc5!ident@host dabirc6!ident@host\r\n" +
            ":servr 366 dabirc #test :End of /NAMES list.\r\n" +
            ":dabirc2!ident@host PRIVMSG #test :testing\r\n" +
            ":dabirc2!ident@host MODE #test +v dabirc\r\n" +
            ":dabirc2!ident@host PRIVMSG +#test :testing\r\n" +
            ":dabirc2!ident@host MODE #test -v dabirc\r\n" +
            ":dabirc2!ident@host PRIVMSG dabirc :test\r\n" +
            ":dabirc2!ident@host PRIVMSG #test :" + "\x01" + "ACTION tests" + "\x01" + "\r\n" +
            ":dabirc!baditp@127.0.0.0 PART #test :Goodbye message\r\n";
        let ctx = new SampleIRCContext();
        let connection = new Core.Connection();
        let svr = new Parser.ParserServer(ctx, connection);
        svr.on(Parser.Events.NOTICE, (s, m) => {
            let msg = m;
            this.areIdentical("AUTH", msg.destination.display, "Destination should be AUTH");
            this.endToEnd_NoticeAuth = true;
        });
        svr.on(Parser.Numerics.ISUPPORT, (s, m) => {
            this.isTrue(Object.keys(svr.attributes).length > 0);
            this.endToEnd_005 = true;
        });
        svr.on(Parser.Numerics.MYINFO, (s, m) => {
            this.endToEnd_004 = true;
        });
        svr.on(Parser.Numerics.CREATED, (s, m) => {
            this.endToEnd_003 = true;
        });
        svr.on(Parser.Numerics.YOURHOST, (s, m) => {
            this.endToEnd_002 = true;
        });
        svr.on(Parser.Numerics.WELCOME, (s, m) => {
            this.endToEnd_001 = true;
        });
        svr.on(Parser.Numerics.MOTD, (s, m) => {
            this.endToEnd_Motd = true;
        });
        svr.on(Parser.Events.MODE, (s, m) => {
            let msg = m;
            if (msg.destination instanceof Core.User) {
                this.areIdentical("i", msg.modes[0].character);
                this.areIdentical(Core.ModeChangeType.Adding, msg.modes[0].change);
                this.areIdentical("w", msg.modes[1].character);
                this.areIdentical(Core.ModeChangeType.Adding, msg.modes[1].change);
                this.areIdentical("x", msg.modes[2].character);
                this.areIdentical(Core.ModeChangeType.Adding, msg.modes[2].change);
                this.areIdentical("z", msg.modes[3].character);
                this.areIdentical(Core.ModeChangeType.Adding, msg.modes[3].change);
                this.endToEnd_ModeUser = true;
            }
            else if (msg.destination instanceof Core.Channel) {
                if (msg.modes.length == 1) {
                    if (msg.modes[0].change == Core.ModeChangeType.Adding) {
                        this.areIdentical("v", msg.modes[0].character);
                        this.areIdentical("dabirc", msg.modes[0].argument);
                        this.endToEnd_ModeChannel_Add = true;
                    }
                    else {
                        this.areIdentical("v", msg.modes[0].character);
                        this.areIdentical("dabirc", msg.modes[0].argument);
                        this.endToEnd_ModeChannel_Remove = true;
                    }
                }
            }
        });
        svr.on(Parser.Events.PRIVMSG, (s, m) => {
            let msg = m;
            if (msg.messageTags["intent"] == "ACTION") {
                this.areIdentical("tests", msg.message);
                this.endToEnd_PRIVMSG_Chan_action = true;
            }
            else if (msg.wall == "+") {
                this.endToEnd_PRIVMSG_Chan_Wall = true;
            }
            else if (msg.destination instanceof Core.User) {
                this.endToEnd_PrivmsgPM = true;
            }
            else if (msg.destination.display == "#test") {
                this.endToEnd_PRIVMSG_Chan = true;
            }
        });
        svr.on(Parser.Events.JOIN, (s, m) => {
            let msg = m;
            this.areIdentical("JOIN", msg.command);
            this.areIdentical("dabirc!baditp@127.0.0.0", msg.from.display);
            this.areIdentical("#test", msg.destination.display);
            this.endToEnd_Join = true;
        });
        svr.on(Parser.Events.PART, (s, m) => {
            let msg = m;
            this.areIdentical("PART", msg.command);
            this.areIdentical("dabirc!baditp@127.0.0.0", msg.from.display);
            this.areIdentical("#test", msg.destination.display);
            this.areIdentical("Goodbye message", msg.message);
            this.endToEnd_Part = true;
        });
        svr.on(Parser.Numerics.NAMREPLY, (s, m) => {
            let msg = m;
            this.areIdentical(Parser.ChannelStatus.Secret, msg.status, "Channel status was incorrectly parsed");
            this.areIdentical("dabirc", msg.users[0].nick, "dabirc nick doesn't match");
            this.areIdentical("dabirc2", msg.users[1].nick, "dabirc2 nick doesn't match");
            this.areIdentical("dabirc3", msg.users[2].nick, "dabirc3 nick doesn't match");
            this.areIdentical("dabirc4", msg.users[3].nick, "dabirc4 nick doesn't match");
            this.areIdentical("dabirc5", msg.users[4].nick, "dabirc5 nick doesn't match");
            this.areIdentical("dabirc6", msg.users[5].nick, "dabirc6 nick doesn't match");
            this.isFalsey(msg.users[0].ident, "dabirc ident doesn't match");
            this.isFalsey(msg.users[1].ident, "dabirc2 ident doesn't match");
            this.isFalsey(msg.users[2].ident, "dabirc3 ident doesn't match");
            this.isFalsey(msg.users[3].ident, "dabirc4 ident doesn't match");
            this.areIdentical("ident", msg.users[4].ident, "dabirc5 ident doesn't match");
            this.areIdentical("ident", msg.users[5].ident, "dabirc6 ident doesn't match");
            this.isFalsey(msg.users[0].host, "dabirc ident doesn't match");
            this.isFalsey(msg.users[1].host, "dabirc2 ident doesn't match");
            this.isFalsey(msg.users[2].host, "dabirc3 ident doesn't match");
            this.isFalsey(msg.users[3].host, "dabirc4 ident doesn't match");
            this.areIdentical("host", msg.users[4].host, "dabirc5 ident doesn't match");
            this.areIdentical("host", msg.users[5].host, "dabirc6 ident doesn't match");
            this.areIdentical(0, msg.users[0].modes.length, "dabirc has too many mode");
            this.areIdentical(1, msg.users[1].modes.length, "dabirc has too many mode");
            this.areIdentical(2, msg.users[2].modes.length, "dabirc has too many mode");
            this.areIdentical(0, msg.users[3].modes.length, "dabirc has too many mode");
            this.areIdentical(2, msg.users[4].modes.length, "dabirc has too many mode");
            this.areIdentical(0, msg.users[5].modes.length, "dabirc has too many mode");
            this.areIdentical("&", msg.users[1].modes[0].character, "dabirc2 first perm doesn't match");
            this.areIdentical("~", msg.users[2].modes[0].character, "dabirc3 first perm doesn't match");
            this.areIdentical("@", msg.users[2].modes[1].character, "dabirc3 second perm doesn't match");
            this.areIdentical("&", msg.users[4].modes[0].character, "dabirc5 second perm doesn't match");
            this.areIdentical("@", msg.users[4].modes[1].character, "dabirc5 second perm doesn't match");
            this.endToEnd_Names = true;
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
        this.isTrue(this.endToEnd_Names, "Names error");
    }
}
exports.FunctionalTests = FunctionalTests;
//# sourceMappingURL=functionalTests.js.map