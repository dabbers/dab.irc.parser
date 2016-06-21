import * as Core from 'dab.irc.core/src';

export class ChannelUserChangeMessage extends Core.Message {


    // Make sure that CHANTYPES has data. A server isn't required to send it by default.
    // It defaults to value of ["&","#"]
    constructor(msg : Core.Message) {
        super(msg.raw);

        this._destination = new Core.Channel(msg.tokenized[2]);
    }

    protected _destination : Core.Channel = null;
}