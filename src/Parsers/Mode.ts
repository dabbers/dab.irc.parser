import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ModeChangeMessage} from '../MessageTypes/ModeChangeMessage';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';
import {Events} from '../EventList';
import {ExEvent} from '../EventList';
import * as path from 'path';

export class Mode implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        var attr = server.attributes;

        // If not set, you are expected to assume these are their values
        if (!attr["CHANTYPES"]) {
            attr["CHANTYPES"] = "#&";
        }

        let msg = new ModeChangeMessage(message, server);
        callback(server, msg);

        msg.updateCommandString(ExEvent.create("MODE", msg.destination.display));
        callback(server, msg);

        // DevNote: Is this a good idea? Will this cause performance issues?
        for(let i in msg.modes) {
            // Create an event in the form of MODE:<Channel Or Nickname>:<ModeCharacter>
            msg.updateCommandString(ExEvent.create("MODE", msg.destination.display, function(j:any) { return msg.modes[j].character; }(i) ));
            callback(server, msg);

            // Create an event in the form of MODE:<Channel Or Nickname>:<+ or -><ModeCharacter>
            msg.updateCommandString(ExEvent.create(
                "MODE", 
                msg.destination.display, 
                function(j:any) { return (msg.modes[j].change == Core.ModeChangeType.Adding ? "+" : "-") + msg.modes[j].character; }(i) 
            ));
            callback(server, msg);
        }
        
        return true;
    }

    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {
        if (context instanceof DynamicParser) {
            this.ctx = <DynamicParser>context;
            this.ctx.parserDictionary[Events.MODE] = this;
            
            return;
        }

        // Todo: make this more classy
        throw new Error("Invalid context passed to Mode parser");
    }

    // We are resuming. No state required for a parser
    resume(context : any, state : any) : void {
        throw new Error("Don't resume a parser. Please call init");
    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        delete this.ctx.parserDictionary[Events.MODE];

        let fullPath = path.join(__dirname, "..", "MessageTypes", "ModeChangeMessage.js");
        if (require.cache[fullPath]) delete require.cache[fullPath];
        return null;
    }
    private ctx:DynamicParser;
}