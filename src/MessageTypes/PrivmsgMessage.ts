import * as Core from 'dab.irc.core/src';

export class PrivmsgMessage extends Core.Message {
    destination : Core.Target.ITarget = null;
    wall : string = "";
    ctcp: boolean = false;

    constructor(msg : Core.Message, serverAttributes:{[key:string] : string }) {
        super(msg.raw);

        var dest = msg.tokenized[2];

        while(serverAttributes["STATUSMSG"].indexOf(dest[0]) != -1) {
            this.wall += dest[0];
            dest = dest.substr(1);
        }

        if (serverAttributes["CHANTYPES"].indexOf(msg.tokenized[2][0]) != -1) {
            this.destination = new Core.Channel(msg.tokenized[2]);
        }
        else {
            this.destination = new Core.User(msg.tokenized[2], null, null);
        }

        if (this.firstWord[0] == "\u0001") {
            this.ctcp = true;
            this.firstWord = this.firstWord.substr(1);
        }
    }
}