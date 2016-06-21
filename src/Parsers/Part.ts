import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ChannelUserChangeMessage} from '../MessageTypes/ChannelUserChangeMessage';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';

export class Part implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        callback(server, new ChannelUserChangeMessage(message));
        return true;
    }

    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {
        if (context.constructor == DynamicParser) {
            var ctx = <DynamicParser>context;
            ctx.parserDictionary["PART"] = this;
            
            return;
        }

        // Todo: make this more classy
        throw "Invalid context passed to PART parser";
    }

    // We are resuming. No state required for a parser
    resume(state : any) : void {
    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        return null;
    }
}