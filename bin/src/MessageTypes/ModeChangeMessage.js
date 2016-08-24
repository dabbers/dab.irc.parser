"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Core = require('dab.irc.core/src');
var ModeChangeMessage = (function (_super) {
    __extends(ModeChangeMessage, _super);
    function ModeChangeMessage(msg, server) {
        _super.call(this, msg);
        this._modes = [];
        this._target = null;
        if (msg.command != "MODE")
            throw new Error("Invalid message to parse, " + msg.command);
        if (!server.attributes["CHANMODES_A"] || !server.attributes["CHANMODES_B"] || !server.attributes["CHANMODES_C"])
            throw new Error("CHANMODES_* haven't been setup yet. Is this expected?");
        if (!server.attributes["PREFIX_PREFIXES"] || !server.attributes["PREFIX_MODES"])
            throw new Error("PREFIX_* haven't been setup yet. Is this expected?");
        var modesstring = msg.tokenized[3];
        var paramsindex = 4;
        var adding = true;
        var isChannel = server.isChannel(msg.tokenized[2]);
        var prefixz = server.attributes["PREFIX_PREFIXES"];
        var start = modesstring[0] == ':' ? 1 : 0;
        for (var i = start; i < modesstring.length; i++) {
            if (modesstring[i] == '+') {
                adding = true;
                continue;
            }
            else if (modesstring[i] == '-') {
                adding = false;
                continue;
            }
            var mode = new Core.Mode();
            mode.character = modesstring[i];
            mode.change = adding ? Core.ModeChangeType.Adding : Core.ModeChangeType.Removing;
            if (server.attributes["CHANMODES_A"].indexOf(modesstring[i].toString()) > -1 ||
                server.attributes["CHANMODES_B"].indexOf(modesstring[i].toString()) > -1 ||
                server.attributes["CHANMODES_C"].indexOf(modesstring[i].toString()) > -1) {
                mode.type = Core.ModeType.Channel;
                mode.argument = msg.tokenized[paramsindex];
                paramsindex++;
            }
            else if (isChannel && server.attributes["PREFIX_MODES"].indexOf(modesstring[i].toString()) != -1) {
                mode.type = Core.ModeType.ChannelUser;
                mode.argument = msg.tokenized[paramsindex];
                paramsindex++;
            }
            else if (!isChannel) {
                mode.type = Core.ModeType.UMode;
            }
            this._modes.push(mode);
        }
        this._target = (isChannel ? new Core.Channel(msg.tokenized[2]) : new Core.User(msg.tokenized[2], null, null));
    }
    Object.defineProperty(ModeChangeMessage.prototype, "modes", {
        get: function () {
            return this._modes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModeChangeMessage.prototype, "target", {
        get: function () {
            return this._target;
        },
        enumerable: true,
        configurable: true
    });
    return ModeChangeMessage;
}(Core.Message));
exports.ModeChangeMessage = ModeChangeMessage;
