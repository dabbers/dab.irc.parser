import * as Core from 'dab.irc.core/src';
import { ParserServer } from '../ParserServer';
export declare class ModeChangeMessage extends Core.Message {
    constructor(msg: Core.Message, server: ParserServer);
    modes: Core.Mode[];
    target: Core.Target.ITarget;
    protected _modes: Core.Mode[];
    protected _target: Core.Target.ITarget;
}
