import * as Core from 'dab.irc.core/src';
export declare class NickChangeMessage extends Core.Message {
    readonly destination: Core.User;
    constructor(msg: Core.Message);
    toString(): string;
    private _to;
    updateDestinationReference(dest: Core.User): void;
}
