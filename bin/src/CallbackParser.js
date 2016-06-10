"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Core = require('dab.irc.core/src');
var CallbackParser = (function (_super) {
    __extends(CallbackParser, _super);
    function CallbackParser() {
        _super.apply(this, arguments);
    }
    CallbackParser.prototype.parse = function (server, message) {
    };
    CallbackParser.prototype.init = function (context) {
    };
    CallbackParser.prototype.resume = function (state) {
    };
    CallbackParser.prototype.uninit = function () {
        return null;
    };
    return CallbackParser;
}(Core.IModuleHandler));
exports.CallbackParser = CallbackParser;
//# sourceMappingURL=CallbackParser.js.map