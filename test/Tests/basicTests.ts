import tsUnit = require('tsunit.external/tsUnit');
import * as Parser from '../../src/';
import * as Core from 'dab.irc.core/src';
import * as fs from 'fs';
import * as path from 'path';
export class BasicTests extends tsUnit.TestClass {
    private servr : Parser.ParserServer = new Parser.ParserServer("a", null);
    constructor() {
        super();

        this.servr.attributes["STATUSMSG"] = "~&@%+";
        this.servr.attributes["CHANMODES_A"] = "'beI";
        this.servr.attributes["CHANMODES_B"] = "kfL";
        this.servr.attributes["CHANMODES_C"] = "lj";
        this.servr.attributes["CHANMODES_D"] = "psmntirRcOAQKVCuzNSMTGZ";
        this.servr.attributes["PREFIX_MODES"] = "qaohv";
        this.servr.attributes["PREFIX_PREFIXES"] = "~&@%+";
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

    nickMessageTest() {
        let m = new Parser.NickChangeMessage(new Core.Message(":dabirc!ident@host NICK dabirc2"));
        this.areIdentical("dabirc2", m.destination.display);
        
        m = new Parser.NickChangeMessage(new Core.Message(":dabirc!ident@host NICK :dabirc2"));
        this.areIdentical("dabirc2", m.destination.display);
    }

    modeMessageTest() {
        let m = new Parser.ModeChangeMessage(new Core.Message(":dabirc2!ident@host MODE #test -Mv+hN dabirc dabirc"), this.servr);

        this.areIdentical("M", m.modes[0].character);
        this.areIdentical(Core.ModeChangeType.Removing, m.modes[0].change);
        this.areIdentical(undefined, m.modes[0].argument);
        this.areIdentical("-M", m.modes[0].display);
        
        this.areIdentical("v", m.modes[1].character);
        this.areIdentical(Core.ModeChangeType.Removing, m.modes[1].change);
        this.areIdentical("dabirc", m.modes[1].argument);
        this.areIdentical("-v dabirc", m.modes[1].display);
        
        this.areIdentical("h", m.modes[2].character);
        this.areIdentical(Core.ModeChangeType.Adding, m.modes[2].change);
        this.areIdentical("dabirc", m.modes[2].argument);
        this.areIdentical("+h dabirc", m.modes[2].display);
        
        this.areIdentical("N", m.modes[3].character);
        this.areIdentical(Core.ModeChangeType.Adding, m.modes[3].change);
        this.areIdentical(undefined, m.modes[3].argument);
        this.areIdentical("+N", m.modes[3].display);
    }

    channelUserChangeTest() {
        let m = new Parser.ChannelUserChangeMessage(new Core.Message(":dabirc!baditp@127.0.0.0 JOIN :#test"));
        this.areIdentical("#test", m.destination.display);

        m = new Parser.ChannelUserChangeMessage(new Core.Message(":dabirc!baditp@127.0.0.0 JOIN #test"));
        this.areIdentical("#test", m.destination.display);

        m = new Parser.ChannelUserChangeMessage(new Core.Message(":dabirc!baditp@127.0.0.0 PART #test"));
        this.areIdentical("#test", m.destination.display);
        this.areIdentical("", m.message);
        
        m = new Parser.ChannelUserChangeMessage(new Core.Message(":dabirc!baditp@127.0.0.0 PART #test :Part message"));
        this.areIdentical("#test", m.destination.display);
        this.areIdentical("Part message", m.message);
    }

    dynamicParserLoadUnloadTest() {
        let msg = new Core.Message(":nick!ident@host PRIVMSG #channel :Hello world");
        let parser = new Parser.DynamicParser();
        
        this.isFalse(parser.parse(this.servr, msg, (s, m) => {}), "Shouldn't have a parser for PRIVMSG yet");
        parser.load("Privmsg");
        this.isTrue(parser.parse(this.servr, msg, (s, m) => {}), "There should have been a PRIVMSG event handled");
        parser.unload("Privmsg", false);
        this.isFalse(parser.parse(this.servr, msg, (s, m) => {}), "Shouldn't have a parser for PRIVMSG yet");
    }

    dynamicParserLoadReloadTest() {
        let msg = new Core.Message(":nick!ident@host TEST #channel :Hello world");
        let parser = new Parser.DynamicParser();
        
        this.isFalse(parser.parse(this.servr, msg, (s, m) => {}), "Shouldn't have a parser for TEST yet");

        parser.load("TestParser");
        this.isTrue(parser.parse(this.servr, msg, (s, m) => { this.areIdentical("This is a test message", m.message); }), "There should have been a TEST event handled");
        
        // Update file
        let file = path.join(__dirname,  "..", "..", "src", "Parsers", "TestParser.js");

        let str = fs.readFileSync(file, "utf8");
        let str2 = str.replace("This is a test message", "This is not a test message");
        fs.writeFileSync(file, str2);
        parser.load("TestParser");
        this.isTrue(parser.parse(this.servr, msg, (s, m) => { this.areIdentical("This is not a test message", m.message, "Incorrect message might mean reload didn't work"); }), "There should have been a TEST event handled");

        // restore file
        fs.writeFile(file, str);
    }

    dynamicParserUnloadNonLoaded() {
        let parser = new Parser.DynamicParser();
        this.isTrue( parser.unload("InvalidName", false) instanceof Parser.DynamicParser );
    }

    dynamicParserLoadInvalidFiles() {
        let parser = new Parser.DynamicParser();
        try {
            parser.load("InvalidName");
        }
        catch (ex) {            
            this.isTruthy(ex.code, "Expected an error code for this exception, " + JSON.stringify(ex));
            this.areIdentical("MODULE_NOT_FOUND", ex.code, "Invalid error code for this exception, " + JSON.stringify(ex));
        }

        try {
            parser.load("index");
        }
        catch (ex) {
            this.areIdentical(0, ex.message.indexOf("Could not load module"), "Unexpected error. " + ex.message);
        }
    }
}