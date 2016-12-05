import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ConversationMessage} from '../MessageTypes/ConversationMessage';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';
import {Events} from '../EventList';
import {ExEvent} from '../EventList';
import * as path from 'path';

export class Privmsg implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        let msg = new ConversationMessage(message, server);
        let original_command = msg.command;
        callback(server, msg);
        
        let from = (msg.from instanceof Core.User ? (<Core.User>msg.from).nick : msg.from.display);

        // Event of <PRIVMSG or NOTICE>:<#Channel or Nickname>
        msg.updateCommandString(ExEvent.create(original_command, msg.destination.display));
        callback(server, msg);
        
        // Event of <PRIVMSG or NOTICE>:<Server or Nickname source>:<#Channel or Nickname destination>
        msg.updateCommandString(ExEvent.create(original_command, from, msg.destination.display));
        callback(server, msg);

        if (msg.wall) {
            // Event of <PRIVMSG or NOTICE>:<Wall message type (~&@%+)>:<#Channel or Nickname destination>
            msg.updateCommandString(ExEvent.create(original_command, msg.wall, msg.destination.display));
            callback(server, msg);

            // Event of <PRIVMSG or NOTICE>:<Server or Nickname source>:<Wall message type (~&@%+)>:<#Channel or Nickname destination>
            msg.updateCommandString(ExEvent.create(original_command, from, msg.wall, msg.destination.display));
            callback(server, msg);
        }

        return true;
    }

    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {
        if (context instanceof DynamicParser) {
            this.ctx = <DynamicParser>context;
            this.ctx.parserDictionary[Events.PRIVMSG] = this;
            this.ctx.parserDictionary[Events.NOTICE] = this;
            
            return;
        }

        // Todo: make this more classy
        throw new Error("Invalid context passed to NOTICE/PRIVMSG parser");
    }

    // We are resuming. No state required for a parser
    resume(context : any, state : any) : void {
        throw new Error("Don't resume a parser. Please call init");
    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        delete this.ctx.parserDictionary[Events.PRIVMSG];
        delete this.ctx.parserDictionary[Events.NOTICE];

        let fullPath = path.join(__dirname, "..", "MessageTypes", "ConversationMessage.js");
        if (require.cache[fullPath]) delete require.cache[fullPath];
        return null;
    }
    private ctx:DynamicParser;
}