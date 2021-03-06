import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {NamesMessage} from '../MessageTypes/NamesMessage';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';
import {Numerics} from '../EventList';
import {ExEvent} from '../EventList';
import * as path from 'path';

export class Names implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        if (!server.attributes["PREFIX"]) {
            server.attributes["PREFIX"] = "(ov)@+";
            server.attributes["PREFIX_MODES"] = "ov";
            server.attributes["PREFIX_PREFIXES"] = "@+";
        }

        let msg = new NamesMessage(message, server);
        callback(server, msg);

        msg.updateCommandString( ExEvent.create(Numerics.NAMREPLY, msg.destination.display) );
        callback(server, msg);
        
        return true;
    }

    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {
        if (context instanceof DynamicParser) {
            this.ctx = <DynamicParser>context;
            this.ctx.parserDictionary[Numerics.NAMREPLY] = this;
            
            return;
        }

        // Todo: make this more classy
        throw new Error("Invalid context passed to NAMES parser");
    }

    // We are resuming. No state required for a parser
    resume(context : any, state : any) : void {
        throw new Error("Don't resume a parser. Please call init");
    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        delete this.ctx.parserDictionary[Numerics.NAMREPLY];

        let fullPath = path.join(__dirname, "..", "MessageTypes", "NamesMessage.js");
        if (require.cache[fullPath]) delete require.cache[fullPath];
        return null;
    }
    private ctx:DynamicParser;
}