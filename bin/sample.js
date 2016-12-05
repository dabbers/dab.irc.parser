"use strict";
const net = require('net');
const tls = require('tls');
const ParserServer_1 = require('./src/ParserServer');
const Core = require('dab.irc.core/src');
class SampleIRCContext {
    constructor() {
        this.me = new Core.User("dabirc", "dabitp", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.connectionEstablishedCallback = (c) => {
            c.write("NICK " + this.me.nick);
            c.write("USER " + this.me.ident + " 8 * :" + this.me.name);
        };
        this.logSentMessages = true;
        this.logReceivedMessages = true;
        this.me.name = "David";
    }
    createConnection(cb) {
        if (this.ssl) {
            return new Core.NodeSocket(tls.connect(this.port, this.host, { rejectUnauthorized: this.rejectUnauthedCerts }, cb));
        }
        else {
            return new Core.NodeSocket(net.createConnection(this.port, this.host, cb));
        }
    }
}
var ctx = new SampleIRCContext();
var con = new Core.Connection();
var server = new ParserServer_1.ParserServer(ctx, con);
server.on("PRIVMSG", (s, m) => {
    var msg = m;
    console.log(msg);
    if (msg.firstWord == "test") {
        s.connection.write("PRIVMSG " + msg.destination.target + " :Found: From:" + msg.from.target);
    }
});
ctx.dataCallback = server.dataReceived;
con.init(ctx);
//# sourceMappingURL=sample.js.map