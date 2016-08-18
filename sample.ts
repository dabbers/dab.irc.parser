import net = require('net');
import tls = require('tls');

import {ParserServer} from './src/ParserServer';
import * as Core from 'dab.irc.core/src';
import {ConversationMessage} from './src/MessageTypes/ConversationMessage';

class SampleIRCContext implements Core.IConnectionContext {
    connection: Core.Connection;
    me: Core.User = new Core.User("dabirc", "dabitp", null);
    
    host: string = "irc.dab.biz";
    port: number = 6697;
    ssl: boolean = true;
    rejectUnauthedCerts: boolean = false;

    constructor() {
        this.me.name = "David";
    }

    dataCallback: (d: Core.Message) => any;
    
    createConnection(cb:() => any): Core.ISocket {
        if (this.ssl) {
            return new Core.NodeSocket(tls.connect(this.port, this.host, {rejectUnauthorized: this.rejectUnauthedCerts}, cb));
        }
        else {
            return new Core.NodeSocket(net.createConnection(this.port, this.host, cb));            
        }
    }

    connectionEstablishedCallback: (c:Core.Connection) => any = (c:Core.Connection) => {  
        c.write("NICK " + this.me.nick);
        c.write("USER " + this.me.ident + " 8 * :" + this.me.name);
    }

    logSentMessages: boolean = true;
    logReceivedMessages: boolean = true;
}

var ctx = new SampleIRCContext();

var con = new Core.Connection();
var server = new ParserServer(ctx.host, con);
server.on("PRIVMSG", (s:ParserServer, m:Core.Message) => {
    var msg = <ConversationMessage>m;
    console.log(msg);
    if (msg.firstWord == "test") {
        s.connection.write("PRIVMSG " + msg.destination.target + " :Found: From:" + msg.from.target);
    }
});

ctx.dataCallback = server.dataReceived;

con.init(ctx);
