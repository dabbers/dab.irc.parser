"use strict";
var ParserServer_1 = require('./src/ParserServer');
var Core = require('dab.irc.core/src');
var SampleIRCContext = (function () {
    function SampleIRCContext() {
        this.me = new Core.User("dabirc", "dabitp", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.logSentMessages = true;
        this.logReceivedMessages = true;
        this.me.name = "David";
    }
    return SampleIRCContext;
}());
var ctx = new SampleIRCContext();
var con = new Core.Connection();
var server = new ParserServer_1.ParserServer(ctx.host, con);
server.on("PRIVMSG", function (s, m) {
    var msg = m;
    console.log(msg);
    if (msg.firstWord == "test") {
        s.connection.write("PRIVMSG " + msg.destination.target + " :Found: From:" + msg.from.target);
    }
});
ctx.dataCallback = server.dataReceived;
con.init(ctx);
//# sourceMappingURL=sample.js.map