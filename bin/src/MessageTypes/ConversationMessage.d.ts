import * as Core from 'dab.irc.core/src';
import { ParserServer } from '../ParserServer';
export declare class ConversationMessage extends Core.Message {
    constructor(msg: Core.Message, server: ParserServer);
    private _destination;
    private _wall;
    private _ctcp;
    readonly destination: Core.Target.ITarget;
    readonly wall: string;
    readonly ctcp: boolean;
    toString(): string;
    updateDestinationReference(dest: Core.Target.ITarget): void;
}
