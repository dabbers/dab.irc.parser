import * as Core from 'dab.irc.core/src';
import {ParserServer} from '../ParserServer';

export class ConversationMessage extends Core.Message {


    // Make sure that CHANTYPES has data. A server isn't required to send it by default.
    // It defaults to value of ["&","#"]  used to be {[key:string] : string }
    constructor(msg : Core.Message, server:ParserServer) {
        super(msg.raw);

        var dest = msg.tokenized[2];

        while(server.attributes["STATUSMSG"].indexOf(dest[0]) != -1) {
            this._wall += dest[0];
            dest = dest.substr(1);
        }

        if (server.isChannel(dest)) {
            this._destination = new Core.Channel(dest);
        }
        else {
            this._destination = new Core.User(dest, null, null);
        }

        if (this.firstWord[0] == "\u0001") {
            this._ctcp = true;
            this._firstWord = this.firstWord.substr(1);
        }

        // TODO: Validate this is the final intent for IRCV3.3
        if (this.messageTags["intent"].indexOf("action") != -1) {
            this._ctcp = true;
        }
    }

    private _destination : Core.Target.ITarget = null;
    private _wall : string = "";
    private _ctcp : boolean = false;
    
    get destination() : Core.Target.ITarget {
        return this._destination;
    }
    get wall() : string {
        return this._wall;
    }
    
    get ctcp(): boolean {
        return this._ctcp;
    }
}