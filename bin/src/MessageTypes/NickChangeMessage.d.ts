import * as Core from 'dab.irc.core/src';
export declare class NickChangeMessage extends Core.Message {
    destination: Core.User;
    constructor(msg: Core.Message);
    private _to;
}
