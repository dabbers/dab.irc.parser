import * as Core from 'dab.irc.core/src';
import { ParserServer } from '../ParserServer';
export declare class ConversationMessage extends Core.Message {
    constructor(msg: Core.Message, server: ParserServer);
    private _destination;
    private _wall;
    private _ctcp;
    destination: Core.Target.ITarget;
    wall: string;
    ctcp: boolean;
}
