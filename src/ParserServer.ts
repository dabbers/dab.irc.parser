import * as Core from 'dab.irc.core/src';
import {Message} from 'dab.irc.core/src/Message';
import {EventEmitter} from 'events';
import {DynamicParser} from './DynamicParser';
import {getParserNames} from './Parsers';
import * as EventList from './EventList';
export class ParserServer extends Core.BaseServer {
    attributes: {[key:string] : string } = {};

    connection: Core.Connection;

    get parser() : DynamicParser {
        return this._parser;
    }
    constructor(context : Core.IConnectionContext, connection: Core.Connection, parser:DynamicParser = new DynamicParser()) {
        super(context.host);
        
        context.dataCallback = this.dataReceived;
        this.connection = connection;
        this._parser = parser;
        let names = getParserNames();
        for(let i in names) {
            this._parser.load(names[i]);
        }

        this.events = new EventEmitter();
        
        this.on(EventList.Events.PING, (s:ParserServer, m:Core.Message) => {
            // We could leave this to the context implementation to do, but 
            // in the instnace of a bot with a message queue, we'd want to send PONG
            // responses asap to prevent a timeout.
            this.connection.write("PONG " + m.tokenized[1]);
        });
    }

    dataReceived = (data: Core.Message) => {
        let cb = (s : ParserServer, m: Core.Message) => {
            this.emit(m.command, this, m);
        };

        if (!this._parser.parse(this, data, cb)) {
            let cmd = data.command;
            
            this.emit(data.command, this, data);   
        }
    }
    ///
    /// Recreating the event listener methods
    ///
    on(event : string, listener: Function ) {
        this.events.on(event, listener);
    }
    once(event: string, listener: Function) {
        this.events.once(event, listener);
    }
    emit(event: string, ...args:any[]) {
        args.splice(0, 0, event);

        this.events.emit.apply(this.events, args);
    }
    addListener(event: string, listener: Function) {
        this.on(event, listener);
    }
    removeListener(event: string, listener: Function) {
        this.events.removeListener(event, listener);
    }
    removeAllListeners(event?: string) {
        this.events.removeAllListeners(event);
    }
    listeners(event: string) : Function[] {
        return this.events.listeners(event);
    }
    eventNames() : (string|symbol)[] {
        return this.events.eventNames();
    }
    ///
    /// End recreating event listener methods
    ///

    toString() :string {
        return "[" + this.display + " ParserServer]";
    }

    isChannel(ch : string) : boolean {
        // If not set, you are expected to assume these are their values
        if (!this.attributes["CHANTYPES"]) {
            this.attributes["CHANTYPES"] = "#&";
        }

        return (this.attributes["CHANTYPES"].indexOf(ch[0]) != -1); 
    }

    protected events : EventEmitter;
    protected _parser : DynamicParser;
}