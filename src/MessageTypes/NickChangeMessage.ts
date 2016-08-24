import * as Core from 'dab.irc.core/src';

export class NickChangeMessage extends Core.Message {

    get destination() : Core.User {

        return this._to;
    }

    constructor(msg : Core.Message) {
        super(msg);

        if (msg.command != "NICK") throw new Error("Invalid message to parse, " + msg.command);
        
        this._to = new Core.User( (this._tokenized[2][0] == ':' ? this._tokenized[2].substr(1) : this._tokenized[2]), null, null );
    }

    private _to:Core.User;
}