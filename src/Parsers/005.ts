import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';
import {Numerics} from '../EventList';

export class Do005 implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        
        for(var i = 3; i < message.tokenized.length; i++) {
            let key = "";
            let value = "";

            if (message.tokenized[i] == ":are") break;

            if (message.tokenized[i].indexOf("=") != -1) {
                let sep = message.tokenized[i].split("=");
                key = sep[0];
                value = sep[1];
            }
            else {
                key = value = message.tokenized[i];
            }

            server.attributes[key] = value;
        }

        if (server.attributes["PREFIX"]) {
            let tosplit = server.attributes["PREFIX"].substring(1);
            let split = tosplit.split(')');
            server.attributes["PREFIX_MODES"] = split[0];
            server.attributes["PREFIX_PREFIXES"] = split[1];
        }

        if (server.attributes["CHANMODES"]) {
            let chanmodes = server.attributes["CHANMODES"].split(',');

            // Mode that adds or removes nick or address to a list
            server.attributes["CHANMODES_A"] = chanmodes[0];
            // Changes a setting and always had a parameter
            server.attributes["CHANMODES_B"] = chanmodes[1];
            // Only has a parameter when set
            server.attributes["CHANMODES_C"] = chanmodes[2];
            // Never has a parameter
            server.attributes["CHANMODES_D"] = chanmodes[3];
        }

        // We don't actually create a new message for this, so pretend we didn't parse it...
        return false;
    }

    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {
        if (context instanceof DynamicParser) {
            this.ctx = <DynamicParser>context;
            this.ctx.parserDictionary[Numerics.ISUPPORT] = this;

            return;
        }

        // Todo: make this more classy
        throw new Error("Invalid context passed to 005 parser");
    }

    // We are resuming. No state required for a parser
    resume(state : any) : void {
        throw new Error("Don't resume a parser. Please call init");
    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        delete this.ctx.parserDictionary[Numerics.ISUPPORT];
        return null;
    }
    private ctx:DynamicParser;
}