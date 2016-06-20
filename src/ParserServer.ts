import * as Core from 'dab.irc.core/src';
import {Message} from 'dab.irc.core/src/Message';
import {EventEmitter} from 'events';
import {DynamicParser} from './DynamicParser';

export class ParserServer extends Core.BaseServer {
    attributes: {[key:string] : string } = {};

    connection: Core.Connection;

    constructor(host: string, connection: Core.Connection) {
        super(host);

        this.connection = connection;
        this.parser = new DynamicParser();
        this.events = new EventEmitter();

        this.on('PING', (s:ParserServer, m:Core.Message) => {
            s.connection.write("PONG " + m.tokenized[1]);
        });
    }


    dataReceived = (data: Core.Message) => {
        this.parser.parse(this, data, (s, m) => {
            this.emit(m.command, this, m);
        });
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

    private events : EventEmitter;
    private parser : DynamicParser;
}