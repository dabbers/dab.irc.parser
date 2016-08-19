import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ChannelUserChangeMessage} from '../MessageTypes/ChannelUserChangeMessage';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';
import {Events} from '../EventList';

export class ChannelUserChange implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        callback(server, new ChannelUserChangeMessage(message));
        return true;
    }

    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {

        if (context instanceof DynamicParser) {
            this.ctx = <DynamicParser>context;
            this.ctx.parserDictionary[Events.JOIN] = this;
            this.ctx.parserDictionary[Events.PART] = this;
            
            return;
        }

        // Todo: make this more classy
        throw "Invalid context passed to ChannelUserChange parser";
    }

    // We are resuming. No state required for a parser
    resume(state : any) : void {
        throw "Don't resume a parser. Please call init";
    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        delete this.ctx.parserDictionary["JOIN"];
        delete this.ctx.parserDictionary["PART"];
        return null;
    }
    private ctx:DynamicParser;
}