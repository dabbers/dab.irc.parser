import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ModeChangeMessage} from '../MessageTypes/ModeChangeMessage';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';
import {Events} from '../EventList';

export class TestParser implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        callback(server, new Core.Message(":test.server.tld TEST AUTH :This is a test message"));
        return true;
    }

    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {
        if (context instanceof DynamicParser) {
            this.ctx = <DynamicParser>context;
            this.ctx.parserDictionary["TEST"] = this;
            
            return;
        }
    }
    resume(state : any) : void {
    }

    uninit() : any {
        delete this.ctx.parserDictionary["TEST"];
        return null;
    }
    private ctx:DynamicParser;
}