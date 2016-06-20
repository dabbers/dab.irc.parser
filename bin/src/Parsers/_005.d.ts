import { IParser } from '../IParser';
import * as Core from 'dab.irc.core/src';
import { ParserServer } from '../ParserServer';
export declare class Do005 implements IParser<any> {
    parse(server: ParserServer, message: Core.Message, callback: (server: ParserServer, message: Core.Message) => any): boolean;
    init(context: any): void;
    resume(state: any): void;
    uninit(): any;
}
