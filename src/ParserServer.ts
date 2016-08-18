import * as Core from 'dab.irc.core/src';
import {Message} from 'dab.irc.core/src/Message';
import {EventEmitter} from 'events';
import {DynamicParser} from './DynamicParser';
import {getParserNames} from './Parsers';

export class ParserServer extends Core.BaseServer {
    attributes: {[key:string] : string } = {};

    connection: Core.Connection;

    constructor(host: string, connection: Core.Connection) {
        super(host);

        this.connection = connection;
        this.parser = new DynamicParser();
        let names = getParserNames();
        for(let i in names) {
            this.parser.load(names[i]);
        }

        this.events = new EventEmitter();

        this.on('PING', (s:ParserServer, m:Core.Message) => {
            s.connection.write("PONG " + m.tokenized[1]);
        });
    }

    dataReceived = (data: Core.Message) => {
        let cb = (s : ParserServer, m: Core.Message) => {
            this.emit(m.command, this, m);
        };

        if (!this.parser.parse(this, data, cb)) {
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
    eventNames() : string[] {
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

    private events : EventEmitter;
    private parser : DynamicParser;
}