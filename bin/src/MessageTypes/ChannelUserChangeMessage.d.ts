import * as Core from 'dab.irc.core/src';
export declare class ChannelUserChangeMessage extends Core.Message {
    destination: Core.Channel;
    constructor(msg: Core.Message);
    protected _destination: Core.Channel;
}
