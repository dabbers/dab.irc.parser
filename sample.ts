import {ParserServer} from './src/ParserServer';
import * as Core from 'dab.irc.core/src';
import {PrivmsgMessage} from './src/MessageTypes/PrivmsgMessage';

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
    

    logSentMessages: boolean = true;
    logReceivedMessages: boolean = true;
}

var ctx = new SampleIRCContext();

var con = new Core.Connection();
var server = new ParserServer(ctx.host, con);
server.on("PRIVMSG", (s:ParserServer, m:Core.Message) => {
    var msg = <PrivmsgMessage>m;
    console.log(msg);
    if (msg.firstWord == "test") {
        s.connection.write("PRIVMSG " + msg.destination.target + " :Found: From:" + msg.from.target);
    }
});

ctx.dataCallback = server.dataReceived;

con.init(ctx);
