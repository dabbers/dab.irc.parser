import * as Core from 'dab.irc.core/src';
export declare class PrivmsgMessage extends Core.Message {
    destination: Core.Target.ITarget;
    wall: string;
    ctcp: boolean;
    constructor(msg: Core.Message, serverAttributes: {
        [key: string]: string;
    });
}
