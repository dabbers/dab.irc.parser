import tsUnit = require('tsunit.external/tsUnit');
import * as Parser from '../../src/';
import * as Core from 'dab.irc.core/src';


class testSocket implements Core.ISocket {
    constructor(cb:() => any) {
        process.nextTick(cb);
    }
    setEncoding(enc: string) : void {

    }

    on(event: string, cb : Function) : void {
        if (event == "data")
            this.callback = cb;
    }

    write(data:  string) : void {
        this.callback(":user WROTE " + data + "\r\n");
    }
    
    disconnect() : void {

    }

    callback : Function;
}



class SampleIRCContext implements Core.IConnectionContext {
    connection: Core.Connection;
    me: Core.User = new Core.User("dabirc", "testident", null);
    
    host: string = "irc.dab.biz";
    port: number = 6697;
    ssl: boolean = true;
    rejectUnauthedCerts: boolean = false;

    socket : testSocket;

    onConnect : () => any;

    constructor() {
        this.me.name = "Real Name";
    }

    commandsFound : {[cmd: string ] :  number} = {};

    dataCallback: (d: Core.Message) => any = (d:Core.Message) => {
        this.commandsFound[d.command] = (this.commandsFound[d.command] || 0) + 1; 
    };

    createConnection(cb:() => any): Core.ISocket {
        this.socket = new testSocket(cb);
        //this.onConnect = cb;
        return this.socket;
    }

    connectionEstablishedCallback: (c:Core.Connection) => any = (c:Core.Connection) => {  
        c.write("NICK " + this.me.nick);
        c.write("USER " + this.me.ident + " 8 * :" + this.me.name);
    }

    logSentMessages: boolean;
    logReceivedMessages: boolean;
}


export class FunctionalTests extends tsUnit.TestClass {

    endToEnd_001: boolean = false;
    endToEnd_002 :boolean = false;
    endToEnd_003 :boolean = false;
    endToEnd_004 :boolean = false;
    endToEnd_005 :boolean = false;

    endToEnd_NoticeAuth: boolean = false;

    endToEnd_PRIVMSG_Chan :boolean = false;
    endToEnd_PRIVMSG_Chan_Wall :boolean = false;
    endToEnd_PRIVMSG_Chan_action :boolean = false;
    endToEnd_PrivmsgPM :boolean = false;

    endToEnd_ModeUser :boolean = false;
    endToEnd_ModeChannel_Add :boolean = false;
    endToEnd_ModeChannel_Remove :boolean = false;

    endToEnd_Join :boolean = false;
    endToEnd_Part :boolean = false;
    endToEnd_Motd :boolean = false;

    endToEndTest() : void {
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
            ":servr 333 dabirc #test dabirc2 1466217608\r\n" + // Timestamp for channel topic set and who set it
            ":servr 353 dabirc @ #test :dabirc &@dabirc2 ~@dabirc3\r\n" + // normally we'd need to enable multi prefix, but for the test pretend it was
            ":servr 366 dabirc #test :End of /NAMES list.\r\n" +
            ":dabirc2!ident@host PRIVMSG #test :testing\r\n" +
            ":dabirc2!ident@host MODE #test +v dabirc\r\n" +
            ":dabirc2!ident@host PRIVMSG +#test :testing\r\n" +
            ":dabirc2!ident@host MODE #test -v dabirc\r\n" +
            ":dabirc2!ident@host PRIVMSG dabirc :test\r\n" +
            ":dabirc2!ident@host PRIVMSG #test :" + "\x01" + "ACTION tests" + "\x01" + "\r\n" +
            ":dabirc!baditp@127.0.0.0 PART #test :Goodbye message\r\n" /*+
            "\r\n" +
            "\r\n" +
            "\r\n" +
            "\r\n" +
            "\r\n" +
            "\r\n" +
            "\r\n" +
            "\r\n"*/ 
            ;

        let ctx = new SampleIRCContext();
        let connection = new Core.Connection();
        let svr = new Parser.ParserServer("", connection);

        svr.on(Parser.Events.NOTICE, (s:Parser.ParserServer, m:Core.Message) => {
            let msg = <Parser.ConversationMessage>m;
            this.areIdentical("AUTH", msg.destination.display, "Destination should be AUTH");
            this.endToEnd_NoticeAuth = true; 
        });
        svr.on(Parser.Numerics.ISUPPORT, (s:Parser.ParserServer, m:Core.Message) => {
            this.isTrue(Object.keys(svr.attributes).length > 0);
            this.endToEnd_005 = true;
        });
        svr.on(Parser.Numerics.MYINFO, (s:Parser.ParserServer, m:Core.Message) => {
            this.endToEnd_004 = true;
        });
        svr.on(Parser.Numerics.CREATED, (s:Parser.ParserServer, m:Core.Message) => {
            this.endToEnd_003 = true;
        });
        svr.on(Parser.Numerics.YOURHOST, (s:Parser.ParserServer, m:Core.Message) => {
            this.endToEnd_002 = true;
        });
        svr.on(Parser.Numerics.WELCOME, (s:Parser.ParserServer, m:Core.Message) => {
            this.endToEnd_001 = true;
        });
        svr.on(Parser.Numerics.MOTD, (s:Parser.ParserServer, m:Core.Message) => {
            this.endToEnd_Motd = true;
        });
        svr.on(Parser.Events.MODE, (s:Parser.ParserServer, m:Core.Message) => {
            let msg = <Parser.ModeChangeMessage>m;

            if (msg.target instanceof Core.User) {
                this.areIdentical("i", msg.modes[0].character) 
                this.areIdentical(Core.ModeChangeType.Adding, msg.modes[0].change);
                this.areIdentical("w", msg.modes[1].character) 
                this.areIdentical(Core.ModeChangeType.Adding, msg.modes[1].change);
                this.areIdentical("x", msg.modes[2].character) 
                this.areIdentical(Core.ModeChangeType.Adding, msg.modes[2].change);
                this.areIdentical("z", msg.modes[3].character) 
                this.areIdentical(Core.ModeChangeType.Adding, msg.modes[3].change);

                this.endToEnd_ModeUser = true;
            }
            else if (msg.target instanceof Core.Channel) {
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
        svr.on(Parser.Events.PRIVMSG, (s:Parser.ParserServer, m:Core.Message) => {
            let msg = <Parser.ConversationMessage>m;
            
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
            else if (msg.destination.display == "#test" ) {
                this.endToEnd_PRIVMSG_Chan = true;
            }
        });
        svr.on(Parser.Events.JOIN, (s:Parser.ParserServer, m:Core.Message) => {
            let msg = <Parser.ChannelUserChangeMessage>m;
            this.areIdentical("JOIN", msg.command);
            this.areIdentical("dabirc!baditp@127.0.0.0", msg.from.display);
            this.areIdentical("#test", msg.destination.display);
            this.endToEnd_Join = true;
        });
        svr.on(Parser.Events.PART, (s:Parser.ParserServer, m:Core.Message) => {
            let msg = <Parser.ChannelUserChangeMessage>m;
            this.areIdentical("PART", msg.command);
            this.areIdentical("dabirc!baditp@127.0.0.0", msg.from.display);
            this.areIdentical("#test", msg.destination.display);
            this.areIdentical("Goodbye message", msg.message);
            this.endToEnd_Part = true;
        });
        
        ctx.dataCallback = svr.dataReceived;

        connection.init(ctx); 

        // send data to "socket"
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
    }

}