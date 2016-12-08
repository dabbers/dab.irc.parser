/// <reference types="node" />
import * as Core from 'dab.irc.core/src';
import { Message } from 'dab.irc.core/src/Message';
import { EventEmitter } from 'events';
import { DynamicParser } from './DynamicParser';
export declare class ParserServer extends Core.BaseServer {
    attributes: {
        [key: string]: string;
    };
    connection: Core.Connection;
    readonly parser: DynamicParser;
    constructor(context: Core.IConnectionContext, connection: Core.Connection, parser?: DynamicParser);
    dataReceived: (data: Message) => void;
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    emit(event: string, ...args: any[]): void;
    addListener(event: string, listener: Function): void;
    removeListener(event: string, listener: Function): void;
    removeAllListeners(event?: string): void;
    listeners(event: string): Function[];
    eventNames(): (string | symbol)[];
    toString(): string;
    isChannel(ch: string): boolean;
    protected events: EventEmitter;
    protected _parser: DynamicParser;
}
