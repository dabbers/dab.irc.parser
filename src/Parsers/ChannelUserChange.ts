import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ChannelUserChangeMessage} from '../MessageTypes/ChannelUserChangeMessage';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';
import {Events} from '../EventList';
import {ExEvent} from '../EventList';
import * as path from 'path';

export class ChannelUserChange implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        let msg = new ChannelUserChangeMessage(message);
        let original_command = msg.command;

        callback(server, msg);

        msg.updateCommandString(ExEvent.create(original_command, msg.destination.display));
        callback(server, msg);

        msg.updateCommandString(ExEvent.create(original_command, (<Core.User>msg.from).nick));
        callback(server, msg);

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
        throw new Error("Invalid context passed to ChannelUserChange parser");
    }

    // We are resuming. No state required for a parser
    resume(context : any, state : any) : void {
        throw new Error("Don't resume a parser. Please call init");
    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        delete this.ctx.parserDictionary[Events.JOIN];
        delete this.ctx.parserDictionary[Events.PART];

        let fullPath = path.join(__dirname, "..", "MessageTypes", "ChannelUserChange.js");
        if (require.cache[fullPath]) delete require.cache[fullPath];
        
        return null;
    }
    private ctx:DynamicParser;
}