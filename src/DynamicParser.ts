import * as Core from 'dab.irc.core/src';
import {getParsers} from './Parsers';
import {IParser} from './IParser';
import {ParserServer} from './ParserServer';
import * as path from 'path';

export class DynamicParser implements IParser<any>, Core.IModuleHandler<DynamicParser> {
    parserDictionary : {[key:string] : IParser<any>} = {};

    constructor() {
    }

    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        if (this.parserDictionary[message.command]) {
            return this.parserDictionary[message.command].parse(server, message, callback);
        }

        return false;
    }

    load(name: string, noResume?:boolean) : Core.IModuleHandler<DynamicParser> {
        name = name.replace(".js", "").replace(".", "");

        let fullPath = path.join(__dirname, "Parsers", name);
        
        if (require.cache[fullPath + ".js"]) delete require.cache[fullPath + ".js"];
        if (this.parsers[name]) this.unload(name, false);

        let obj = require(fullPath);
        let indx = Object.keys(obj)[0]; // the obj will have obj.FunctionName since we export classes in the modules.

        let fnc = obj[indx];

        if (!fnc) throw new Error("Could not load module because of no index with the same classname exists: " + name);

        let inst: IParser<any> = new fnc();

        if (! inst.init) throw new Error("Could not load module because the class doesn't export an init function: " + name);

        inst.init(this);
        
        this.parsers[name] = inst;

        return this;
    }

    unload(name: string, persist: boolean) : Core.IModuleHandler<DynamicParser> {
        if (this.parsers[name]) {
            this.parsers[name].uninit();
            delete this.parsers[name];
        }
        return this;
    }
    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {

    }

    // We are resuming. No state required for a parser
    resume(state : any) : void {

    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        return null;
    }

    private parsers : {[key:string] : IParser<any>} = {};
}