import tsUnit = require('tsunit.external/tsUnit');
export declare class BasicTests extends tsUnit.TestClass {
    private servr;
    constructor();
    privmsgTest(): void;
    privmsgWallTest(): void;
    noticeWallTest(): void;
    privmsgMessageActionTest(): void;
    privmsgMessageIntentActionTest(): void;
    nickMessageTest(): void;
    modeMessageTest(): void;
    channelUserChangeTest(): void;
    dynamicParserLoadUnloadTest(): void;
    dynamicParserLoadReloadTest(): void;
    dynamicParserUnloadNonLoaded(): void;
    dynamicParserLoadInvalidFiles(): void;
}
