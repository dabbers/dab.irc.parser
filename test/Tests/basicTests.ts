import tsUnit = require('tsunit.external/tsUnit');
import * as Parser from '../../src/';
import * as Core from 'dab.irc.core/src';

export class BasicTests extends tsUnit.TestClass {
    private servr : Parser.ParserServer = new Parser.ParserServer("a", null);
    constructor() {
        super();

        this.servr.attributes["STATUSMSG"] = "~&@%+";
    }

    privmsgTest() {
        let m = new Parser.ConversationMessage(new Core.Message(":nick!ident@host PRIVMSG #channel :Hello world"), this.servr);

        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");
    }

    privmsgWallTest() {
        let m = new Parser.ConversationMessage(new Core.Message(":nick!ident@host PRIVMSG +#channel :Hello world"), this.servr);

        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");

        this.areIdentical("+", m.wall);
    }

    noticeWallTest() {
        let m = new Parser.ConversationMessage(new Core.Message(":nick!ident@host NOTICE +#channel :Hello world"), this.servr);

        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");

        this.areIdentical("+", m.wall);
    }

    privmsgMessageActionTest() {
        let m = new Parser.ConversationMessage(new Core.Message(":nick!ident@host NOTICE +#channel :" + "\x01" + "ACTION Hello world" + "\x01"), this.servr);

        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");

        this.areIdentical("+", m.wall);
        this.isTrue(m.ctcp, "Not CTCP");

        this.areIdentical("Hello", m.firstWord);
        this.areIdentical("ACTION", m.messageTags["intent"]);
        this.areIdentical("Hello world", m.message);
        this.areIdentical(":Hello", m.tokenized[3]);
        this.areIdentical("world", m.tokenized[4]);
    }

    privmsgMessageIntentActionTest() {
        let m = new Parser.ConversationMessage(new Core.Message("@intent=ACTION :nick!ident@host NOTICE +#channel :Hello world"), this.servr);

        this.areIdentical("#channel", m.destination.target);
        this.isTrue(m.destination instanceof Core.Channel, "Not instance of Channel");

        this.areIdentical("+", m.wall);
        this.isTrue(m.ctcp, "Not CTCP");

        this.areIdentical("Hello", m.firstWord);
        this.areIdentical("ACTION", m.messageTags["intent"]);
        this.areIdentical("Hello world", m.message);
        this.areIdentical(":Hello", m.tokenized[3]);
        this.areIdentical("world", m.tokenized[4]);
    }
}