import * as Core from 'dab.irc.core/src';
export declare class ChannelUserChangeMessage extends Core.Message {
    readonly destination: Core.Channel;
    constructor(msg: Core.Message);
    toString(): string;
    updateDestinationReference(dest: Core.Channel): void;
    protected _destination: Core.Channel;
}
