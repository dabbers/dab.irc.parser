export class Numerics {
    public static WELCOME = "001";
    public static YOURHOST = "002";
    public static CREATED = "003";
    public static MYINFO = "004";
    public static ISUPPORT = "005";
    public static MAP_UNREAL = "006";
    public static MAPEND_UNREAL = "007";
    public static BOUNCE = "010";
    public static TRACELINK = "200";
    public static TRACECONNECTING = "201";
    public static TRACEHANDSHAKE = "202";
    public static TRACEUNKNOWN = "203";
    public static TRACEOPERATOR = "204";
    public static TRACEUSER = "205";
    public static TRACESERVER = "206";
    public static TRACESERVICE = "207";
    public static TRACENEWTYPE = "208";
    public static TRACECLASS = "209";
    public static TRACERECONNECT = "210";
    public static STATSLINKINFO = "211";
    public static STATSCOMMANDS = "212";
    public static STATSCLINE = "213";
    public static STATSNLINE = "214";
    public static STATSILINE = "215";
    public static STATSKLINE = "216";
    public static STATSQLINE = "217";
    public static STATSYLINE = "218";
    public static ENDOFSTATS = "219";
    public static UMODEIS = "221";
    public static MODLIST = "222";
    public static SQLINE_NICK_UNREAL = "222";
    public static STATSGLINE_UNREAL = "223";
    public static STATSTLINE_UNREAL = "224";
    public static STATSELINE_UNREAL = "225";
    public static STATSNLINE_UNREAL = "226";
    public static STATSVLINE_UNREAL = "227";
    public static SERVICEINFO = "231";
    public static ENDOFSERVICES = "232";
    public static RULES_UNREAL = "232";
    public static SERVICE = "233";
    public static SERVLIST = "234";
    public static SERVLISTEND = "235";
    public static STATSVLINE = "240";
    public static STATSLLINE = "241";
    public static STATSUPTIME = "242";
    public static STATSOLINE = "243";
    public static STATSHLINE = "244";
    public static STATSPING = "246";
    public static STATSBLINE = "247";
    public static STATSULINE = "249";
    public static STATSDLINE = "250";
    public static STATSCONN_UNREAL = "250";
    public static LUSERCLIENT = "251";
    public static LUSEROP = "252";
    public static LUSERUNKNOWN = "253";
    public static LUSERCHANNELS = "254";
    public static LUSERME = "255";
    public static ADMINME = "256";
    public static ADMINLOC1 = "257";
    public static ADMINLOC2 = "258";
    public static ADMINEMAIL = "259";
    public static TRACELOG = "261";
    public static TRACEPING = "262";
    public static TRACEEND = "262";
    public static TRYAGAIN = "263";
    public static VCHANEXIST = "276";
    public static VCHANLIST = "277";
    public static VCHANHELP = "278";
    public static ACCEPTLIST = "281";
    public static ENDOFACCEPT = "282";
    public static ALIST = "283";
    public static ENDOFALIST = "284";
    public static GLIST_HASH = "285";
    public static HELPHDR_UNREAL = "290";
    public static HELPOP_UNREAL = "291";
    public static HELPTLR_UNREAL = "292";
    public static HELPHLP_UNREAL = "293";
    public static HELPFWD_UNREAL = "294";
    public static HELPIGN_UNREAL = "295";
    public static NONE = "300";
    public static AWAY = "301";
    public static USERHOST = "302";
    public static ISON = "303";
    public static TEXT = "304";
    public static UNAWAY = "305";
    public static NOWAWAY = "306";
    public static USERIP = "307";
    public static RULESSTART_UNREAL = "308";
    public static ENDOFRULES_UNREAL = "309";
    public static WHOISHELPOP_UNREAL = "310";
    public static WHOISUSER = "311";
    public static WHOISSERVER = "312";
    public static WHOISOPERATOR = "313";
    public static WHOWASUSER = "314";
    public static ENDOFWHO = "315";
    public static WHOISCHANOP = "316";
    public static WHOISIDLE = "317";
    public static ENDOFWHOIS = "318";
    public static WHOISCHANNELS = "319";
    public static WHOISSPECIAL_UNREAL = "320";
    public static LISTSTART = "321";
    public static LIST = "322";
    public static LISTEND = "323";
    public static CHANNELMODEIS = "324";
    public static UNIQOPIS = "325";
    public static CHANNELPASSIS = "325";
    public static NOCHANPASS = "326";
    public static CHPASSUNKNOWN = "327";
    public static WHOWAS_TIME = "330";
    public static NOTOPIC = "331";
    public static TOPIC = "332";
    public static LISTSYNTAX_UNREAL = "334";
    public static WHOISBOT_UNREAL = "335";
    public static CHANPASSOK = "338";
    public static BADCHANPASS = "339";
    public static INVITING = "341";
    public static SUMMONING = "342";
    public static INVITELIST = "346";
    public static ENDOFINVITELIST = "347";
    public static EXCEPTLIST = "348";
    public static ENDOFEXCEPTLIST = "349";
    public static VERSION = "351";
    public static WHOREPLY = "352";
    public static NAMREPLY = "353";
    public static KILLDONE = "361";
    public static CLOSING = "362";
    public static CLOSEEND = "363";
    public static LINKS = "364";
    public static ENDOFLINKS = "365";
    public static ENDOFNAMES = "366";
    public static BANLIST = "367";
    public static ENDOFBANLIST = "368";
    public static ENDOFWHOWAS = "369";
    public static INFO = "371";
    public static MOTD = "372";
    public static INFOSTART = "373";
    public static ENDOFINFO = "374";
    public static MOTDSTART = "375";
    public static ENDOFMOTD = "376";
    public static WHOISHOST_UNREAL = "378";
    public static WHOISMODES_UNREAL = "379";
    public static YOUREOPER = "381";
    public static REHASHING = "382";
    public static YOURESERVICE = "383";
    public static MYPORTIS = "384";
    public static QLIST_UNREAL = "386";
    public static ENDOFQLIST_UNREAL = "387";
    public static ALIST_UNREAL = "388";
    public static ENDOFALIST_UNREAL = "389";
    public static TIME = "391";
    public static USERSSTART = "392";
    public static USERS = "393";
    public static ENDOFUSERS = "394";
    public static NOUSERS = "395";
    public static ERR_UNKNOWNERROR = "400";
    public static ERR_NOSUCHNICK = "401";
    public static ERR_NOSUCHSERVER = "402";
    public static ERR_NOSUCHCHANNEL = "403";
    public static ERR_CANNOTSENDTOCHAN = "404";
    public static ERR_TOOMANYCHANNELS = "405";
    public static ERR_WASNOSUCHNICK = "406";
    public static ERR_TOOMANYTARGETS = "407";
    public static ERR_NOSUCHSERVICE = "408";
    public static ERR_NOORIGIN = "409";
    public static ERR_NORECIPIENT = "411";
    public static ERR_NOTEXTTOSEND = "412";
    public static ERR_NOTOPLEVEL = "413";
    public static ERR_WILDTOPLEVEL = "414";
    public static ERR_BADMASK = "415";
    public static ERR_UNKNOWNCOMMAND = "421";
    public static ERR_NOMOTD = "422";
    public static ERR_NOADMININFO = "423";
    public static ERR_FILEERROR = "424";
    public static ERR_NOOPERMOTD_UNREAL = "425";
    public static ERR_NONICKNAMEGIVEN = "431";
    public static ERR_ERRONEUSNICKNAME = "432";
    public static ERR_NICKNAMEINUSE = "433";
    public static ERR_NORULES_UNREAL = "434";
    public static ERR_SERVICECONFUSED_UNREAL = "435";
    public static ERR_NICKCOLLISION = "436";
    public static ERR_UNAVAILRESOURCE = "437";
    public static ERR_USERNOTINCHANNEL = "441";
    public static ERR_NOTONCHANNEL = "442";
    public static ERR_USERONCHANNEL = "443";
    public static ERR_NOLOGIN = "444";
    public static ERR_SUMMONDISABLED = "445";
    public static ERR_USERSDISABLED = "446";
    public static ERR_NONICKCHANGE_UNREAL = "447";
    public static ERR_NOTREGISTERED = "451";
    public static ERR_IDCOLLISION = "452";
    public static ERR_NICKLOST = "453";
    public static ERR_HOSTILENAME_UNREAL = "455";
    public static ERR_ACCEPTFULL = "456";
    public static ERR_ACCEPTEXIST = "457";
    public static ERR_ACCEPTNOT = "458";
    public static ERR_NOHIDING_UNREAL = "459";
    public static ERR_NOTFORHALFOPS_UNREAL = "460";
    public static ERR_NEEDMOREPARAMS = "461";
    public static ERR_ALREADYREGISTERED = "462";
    public static ERR_NOPERMFORHOST = "463";
    public static ERR_PASSWDMISMATCH = "464";
    public static ERR_YOUREBANNEDCREEP = "465";
    public static ERR_YOUWILLBEBANNED = "466";
    public static ERR_KEYSET = "467";
    public static ERR_LINKSET_UNREAL = "469";
    public static ERR_LINKCHANNEL_UNREAL = "470";
    public static ERR_CHANNELISFULL = "471";
    public static ERR_UNKNOWNMODE = "472";
    public static ERR_INVITEONLYCHAN = "473";
    public static ERR_BANNEDFROMCHAN = "474";
    public static ERR_BADCHANNELKEY = "475";
    public static ERR_BADCHANMASK = "476";
    public static ERR_NOCHANMODES = "477";
    public static ERR_BANLISTFULL = "478";
    public static ERR_LINKFAIL_UNREAL = "479";
    public static ERR_CANNOTKNOCK_UNREAL = "480";
    public static ERR_NOPRIVILEGES = "481";
    public static ERR_CHANOPRIVSNEEDED = "482";
    public static ERR_CANTKILLSERVER = "483";
    public static ERR_RESTRICTED = "484";
    public static ERR_ATTACKDENY_UNREAL = "484";
    public static ERR_UNIQOPRIVSNEEDED = "485";
    public static ERR_KILLDENY_UNREAL = "485";
    public static ERR_NONONREG = "486";
    public static ERR_HTMDISABLED_UNREAL = "486";
    public static ERR_SECUREONLYCHAN_UNREAL = "489";
    public static ERR_NOOPERHOST = "491";
    public static ERR_NOSERVICEHOST = "492";
    public static ERR_CHANOWNPRIVNEEDED_UNREAL = "499";
    public static ERR_UMODEUNKNOWNFLAG = "501";
    public static ERR_USERSDONTMATCH = "502";
    public static ERR_USERNOTONSERV = "504";
    public static ERR_NOINVITE_UNREAL = "518";
    public static ERR_ADMONLY_UNREAL = "519";
    public static ERR_OPERONLY_UNREAL = "520";
    public static ERR_OPERSPVERIFY_UNREAL = "524";
    public static MAPMORE_UNREAL = "610";
    public static DUMPING_UNREAL = "640";
    public static DUMPUNREAL = "641";
    public static EODUMP_UNREAL = "642";
    public static ERR_CANNOTDOCOMMAND_UNREAL = "972";
}

export class Events {
    public static PRIVMSG = "PRIVMSG";
    public static NOTICE = "NOTICE";
    public static JOIN = "JOIN";
    public static PART = "PART";
    public static MODE = "MODE";
    public static QUIT = "QUIT";
    public static KICK = "KICK";
    public static INVITE = "INVITE";
    public static PING = "PING";
    public static PONG = "PONG";
}