import * as Core from 'dab.irc.core/src';
import {getParsers} from './Parsers';
import {IParser} from './IParser';
import {ParserServer} from './ParserServer';

export class DynamicParser implements IParser<any> {
    parserDictionary : {[key:string] : IParser<any>} = {};

    constructor() {

        this.parsers = getParsers();
        for(var i in this.parsers) {
            this.parsers[i].init(this);
        }
    }

    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        if (this.parserDictionary[message.command]) {
            return this.parserDictionary[message.command].parse(server, message, callback);
        }

        return false;
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

    private parsers : IParser<any>[] = [];
}