import * as Core from 'dab.irc.core/src';
import {ParserServer} from '../ParserServer';

export class ConversationMessage extends Core.Message {


    // Make sure that CHANTYPES has data. A server isn't required to send it by default.
    // It defaults to value of ["&","#"]  used to be {[key:string] : string }
    constructor(msg : Core.Message, server:ParserServer) {
        super(msg.raw);

        let dest = msg.tokenized[2];

        while(server.attributes["STATUSMSG"] && server.attributes["STATUSMSG"].indexOf(dest[0]) != -1) {
            this._wall += dest[0];
            dest = dest.substr(1);
        }

        if (server.isChannel(dest)) {
            this._destination = new Core.Channel(dest);
        }
        else {
            this._destination = new Core.User(dest, null, null);
        }

        if (this.firstWord[0] == "\x01") {
            // Make CTCP behave more like IRCv3.3 intent. Modify message to appear more v3.3 like.
            // We remove the actual CTCP verb everywhere except the raw message. 
            this._ctcp = true;
            this._messageTags["intent"] = this._firstWord.substr(1);

            // Remove trailing \x0001
            var last = this.tokenized.length - 1;
            var last_tok = this.tokenized[last];

            this._tokenized[last] = last_tok.substr(0,last_tok.length - 1);

            this._message = this.tokenized.slice(4).join(" ");

            this._firstWord = this.tokenized[4];
            this._tokenized[4] = ":" + this.tokenized[4];

            this._tokenized.splice(3, 1);
        }

        // TODO: Validate this is the final intent for IRCV3.3
        if (this.messageTags["intent"]) {
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