import * as Core from 'dab.irc.core/src';
import {ParserServer} from '../ParserServer';
export enum ChannelStatus {
    Secret,
    Private,
    Public
}

// ":servr 353 dabirc @ #test :dabirc &@dabirc2 ~@dabirc3\r\n"
export class NamesMessage extends Core.Message {
    // Make sure that CHANTYPES has data. A server isn't required to send it by default.
    // It defaults to value of ["&","#"]  used to be {[key:string] : string }
    constructor(msg : Core.Message, server:ParserServer) {
        super(msg);

        let prefixes = server.attributes["PREFIX_PREFIXES"];

        switch(this.tokenized[3]) {
            case '@':
                this._status = ChannelStatus.Secret;
                break;
            case '*':
                this._status = ChannelStatus.Private;
                break;
            case '=':
            default:
                this._status = ChannelStatus.Public;
                break;
        }

        let restore: boolean = this.tokenized[5][0] == ':' ? true : false;

        // remove leading :, just in case
        if (restore) this.tokenized[5] = this.tokenized[5].substr(1);

        for(let i = 5; i < this.tokenized.length; i++) {
            if (!this.tokenized[i]) throw new Error("Why is this item empty?"); // not sure why this is here?
            
            let user : Core.User;

            let entry = this.tokenized[i];
            let identIndx = entry.indexOf("!");

            if (identIndx != -1) {
                let nick = entry.substring(0, identIndx);
                let rest = entry.substr(identIndx);

                let hostIndx = rest.indexOf("@");

                let ident = rest.substring(0, hostIndx);
                let host = rest.substr(hostIndx);
                user = new Core.User(nick, ident, host);
            }
            else {
                user = new Core.User(entry, null, null);
            }

            while (prefixes.indexOf(user.nick[0].toString()) != -1) {
                let mode = new Core.Mode();

                mode.character = user.nick[0].toString();
                mode.argument = user.nick;
                mode.target = this.destination;
                mode.change = Core.ModeChangeType.Adding;
                mode.type = Core.ModeType.ChannelUser;

                user.modes.push( mode );
                user.nick = user.nick.substring(1);
            }

            user.modes.sort(function(s1, s2)
            {
                return prefixes.indexOf(s1.character) - prefixes.indexOf(s2.character);
            });

            this._users.push(user);
        }

        // restore leading : for anything else that is expecting it
        if (restore) this.tokenized[5] = ":" + this.tokenized[5]; 
    }

    private _destination : Core.Target.ITarget = null;
    private _status : ChannelStatus;
    private _users : Core.User[];

    get destination() : Core.Target.ITarget {
        return this._destination;
    }

    get status() : ChannelStatus {
        return this._status;
    }

    get users() : Core.User[] {
        return this._users;
    }
}