import * as Core from 'dab.irc.core/src';
import { Message } from 'dab.irc.core/src/Message';
export declare class ParserServer extends Core.BaseServer {
    attributes: {
        [key: string]: string;
    };
    connection: Core.Connection;
    constructor(host: string, connection: Core.Connection);
    dataReceived: (data: Message) => void;
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    emit(event: string, ...args: any[]): void;
    addListener(event: string, listener: Function): void;
    removeListener(event: string, listener: Function): void;
    removeAllListeners(event?: string): void;
    listeners(event: string): Function[];
    eventNames(): string[];
    toString(): string;
    isChannel(ch: string): boolean;
    private events;
    private parser;
}
