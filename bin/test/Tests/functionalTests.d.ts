import tsUnit = require('tsunit.external/tsUnit');
export declare class FunctionalTests extends tsUnit.TestClass {
    endToEnd_001: boolean;
    endToEnd_002: boolean;
    endToEnd_003: boolean;
    endToEnd_004: boolean;
    endToEnd_005: boolean;
    endToEnd_NoticeAuth: boolean;
    endToEnd_PRIVMSG_Chan: boolean;
    endToEnd_PRIVMSG_Chan_Wall: boolean;
    endToEnd_PRIVMSG_Chan_action: boolean;
    endToEnd_PrivmsgPM: boolean;
    endToEnd_ModeUser: boolean;
    endToEnd_ModeChannel_Add: boolean;
    endToEnd_ModeChannel_Remove: boolean;
    endToEnd_Join: boolean;
    endToEnd_Part: boolean;
    endToEnd_Motd: boolean;
    endToEndTest(): void;
}
