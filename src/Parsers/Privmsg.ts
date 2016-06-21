import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ConversationMessage} from '../MessageTypes/ConversationMessage';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';

export class Privmsg implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        callback(server, new ConversationMessage(message, server));
        return true;
    }

    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {
        if (context.constructor == DynamicParser) {
            var ctx = <DynamicParser>context;
            ctx.parserDictionary["PRIVMSG"] = this;
            
            return;
        }

        // Todo: make this more classy
        throw "Invalid context passed to PRIVMSG parser";
    }

    // We are resuming. No state required for a parser
    resume(state : any) : void {
    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        return null;
    }
}