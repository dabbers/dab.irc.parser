import * as Core from 'dab.irc.core/src';
import { ParserServer } from './ParserServer';
export interface IParser<Ctx> extends Core.IModule<Ctx> {
    parse(server: ParserServer, message: Core.Message, callback: (server: ParserServer, message: Core.Message) => any): boolean;
}
