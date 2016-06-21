import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';

export class Do005 implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        console.log("Do005", server);
        for(var i = 3; i < message.tokenized.length; i++) {
            var key = "";
            var value = "";

            if (message.tokenized[i].indexOf("=") != -1) {
                var sep = message.tokenized[i].split("=");
                key = sep[0];
                value = sep[1];
            }
            else {
                key = value = message.tokenized[i];
            }

            server.attributes[key] = value;
        }

        if (server.attributes["PREFIX"]) {
            var tosplit = value.substring(1);
            var split = tosplit.split(')');
            server.attributes["PREFIX_MODES"] = split[0];
            server.attributes["PREFIX_PREFIXES"] = split[1];
        }

        if (server.attributes["CHANMODES"]) {
            var chanmodes = value.split(',');

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
        if (context.constructor == DynamicParser) {
            var ctx = <DynamicParser>context;
            ctx.parserDictionary["005"] = this;

            return;
        }

        // Todo: make this more classy
        throw "Invalid context passed to 005 parser";
    }

    // We are resuming. No state required for a parser
    resume(state : any) : void {

    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        return null;
    }
}