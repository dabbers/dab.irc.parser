import * as Core from 'dab.irc.core/src';
import {ParserServer} from '../ParserServer';

export class ModeChangeMessage extends Core.Message {
    // Make sure that CHANTYPES has data. A server isn't required to send it by default.
    // It defaults to value of ["&","#"]
    constructor(msg : Core.Message, server:ParserServer) {
        super(msg.raw);

        let modesstring = msg.tokenized[3];
        let paramsindex = 4;
        let adding = true;
        let isChannel = server.isChannel(msg.tokenized[2]);

        let prefixz = server.attributes["PREFIX_PREFIXES"];
        let start = modesstring[0] == ':' ? 1 : 0;
        for (let i = start; i < modesstring.length; i++)
        {
            if (modesstring[i] == '+')
            {
                adding = true;
                continue;
            }
            else if (modesstring[i] == '-')
            {
                adding = false;
                continue;
            }

            let mode = new Core.Mode();
            mode.character = modesstring[i];
            mode.change = adding ? Core.ModeChangeType.Adding : Core.ModeChangeType.Removing;

            if (server.attributes["CHANMODES_A"].indexOf(modesstring[i].toString()) > -1 ||
                server.attributes["CHANMODES_B"].indexOf(modesstring[i].toString()) > -1 ||
                server.attributes["CHANMODES_C"].indexOf(modesstring[i].toString()) > -1)
            {
                mode.type = Core.ModeType.Channel;
                mode.argument = msg.tokenized[paramsindex];
                paramsindex++;
            }
            // If this isn't a user mode, and this IS a channel prefix mode, ie: ~&@%+
            else if (isChannel && server.attributes["PREFIX_MODES"].indexOf(modesstring[i].toString()) != -1)
            {
                mode.type = Core.ModeType.ChannelUser;
                mode.argument = msg.tokenized[paramsindex];
                paramsindex++;
            }
            else if (!isChannel) // else if (msg.Parts[2] == self.Me.Nick)
            {
                mode.type = Core.ModeType.UMode;
            }

            this._modes.push(mode);
        }

        this._target = (isChannel ? new Core.Channel(msg.tokenized[2]) : new Core.User(msg.tokenized[2], null, null));
    }

    get modes() : Core.Mode[] {
        return this._modes;
    }

    get target() : Core.Target.ITarget {
        return this._target;
    }

    protected _modes : Core.Mode[] = [];
    protected _target : Core.Target.ITarget = null;
}