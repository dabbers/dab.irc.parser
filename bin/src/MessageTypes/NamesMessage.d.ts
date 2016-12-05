import * as Core from 'dab.irc.core/src';
import { ParserServer } from '../ParserServer';
export declare enum ChannelStatus {
    Secret = 0,
    Private = 1,
    Public = 2,
}
export declare class NamesMessage extends Core.Message {
    constructor(msg: Core.Message, server: ParserServer);
    private _destination;
    private _status;
    private _users;
    readonly destination: Core.Target.ITarget;
    readonly status: ChannelStatus;
    readonly users: Core.User[];
    toString(): string;
    updateDestinationReference(dest: Core.Target.ITarget): void;
}
