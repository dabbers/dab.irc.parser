import * as Core from 'dab.irc.core/src';

export class ChannelUserChangeMessage extends Core.Message {

    get destination() : Core.Channel {
        return this._destination;
    }

    // Make sure that CHANTYPES has data. A server isn't required to send it by default.
    // It defaults to value of ["&","#"]
    constructor(msg : Core.Message) {
        super(msg);

        if (msg.command != "JOIN" && msg.command != "PART") throw new Error("Invalid message to parse, " + msg.command);
        
        this._destination = new Core.Channel(msg.tokenized[2]);
    }

    toString(): string {
        return "[ChannelUserChangeMessage " + this.from.display + " " + this.command + " " + this.destination.display + "]";
    }

    protected _destination : Core.Channel = null;
}