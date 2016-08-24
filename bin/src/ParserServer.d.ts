import * as Core from 'dab.irc.core/src';
import { DynamicParser } from './DynamicParser';
export declare class ParserServer extends Core.BaseServer {
    attributes: {
        [key: string]: string;
    };
    connection: Core.Connection;
    parser: DynamicParser;
    constructor(host: string, connection: Core.Connection, parser?: DynamicParser);
    dataReceived: (data: any) => void;
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
    private _parser;
}
