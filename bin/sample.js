"use strict";
var net = require('net');
var tls = require('tls');
var ParserServer_1 = require('./src/ParserServer');
var Core = require('dab.irc.core/src');
var SampleIRCContext = (function () {
    function SampleIRCContext() {
        var _this = this;
        this.me = new Core.User("dabirc", "dabitp", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.connectionEstablishedCallback = function (c) {
            c.write("NICK " + _this.me.nick);
            c.write("USER " + _this.me.ident + " 8 * :" + _this.me.name);
        };
        this.logSentMessages = true;
        this.logReceivedMessages = true;
        this.me.name = "David";
    }
    SampleIRCContext.prototype.createConnection = function (cb) {
        if (this.ssl) {
            return new Core.NodeSocket(tls.connect(this.port, this.host, { rejectUnauthorized: this.rejectUnauthedCerts }, cb));
        }
        else {
            return new Core.NodeSocket(net.createConnection(this.port, this.host, cb));
        }
    };
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
