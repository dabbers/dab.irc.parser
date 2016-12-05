import * as Core from 'dab.irc.core/src';
import { IParser } from './IParser';
import { ParserServer } from './ParserServer';
export declare class DynamicParser implements IParser<any>, Core.IModuleHandler<DynamicParser> {
    parserDictionary: {
        [key: string]: IParser<any>;
    };
    constructor();
    parse(server: ParserServer, message: Core.Message, callback: (server: ParserServer, message: Core.Message) => any): boolean;
    load(name: string, noResume?: boolean): Core.IModuleHandler<DynamicParser>;
    unload(name: string, persist: boolean): Core.IModuleHandler<DynamicParser>;
    init(context: any): void;
    resume(state: any): void;
    uninit(): any;
    private parsers;
}
