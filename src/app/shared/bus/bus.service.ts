import { Injectable } from "@angular/core";
import { MessageState } from "../model";
import { Store } from "../state/store";

@Injectable({
    providedIn: 'root'
})
export class BusService extends Store<MessageState>{

    constructor() {
        super('BUS');
    }

    init() {
        this.store('BUS_INIT', {
            msg: ''
        })
    }

    send(msg: string) {
        this.store('BUS_SEND', {
            msg
        })
    }

}