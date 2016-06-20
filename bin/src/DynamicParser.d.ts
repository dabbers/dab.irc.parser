import * as Core from 'dab.irc.core/src';
import { IParser } from './IParser';
import { ParserServer } from './ParserServer';
export declare class DynamicParser implements IParser<any> {
    parserDictionary: {
        [key: string]: IParser<any>;
    };
    constructor();
    parse(server: ParserServer, message: Core.Message, callback: (server: ParserServer, message: Core.Message) => any): boolean;
    init(context: any): void;
    resume(state: any): void;
    uninit(): any;
    private parsers;
}
