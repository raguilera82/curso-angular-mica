import { BehaviorSubject, Observable } from "rxjs";

const win = window as any;

export class Store<T> {

    private state$: BehaviorSubject<T> = new BehaviorSubject(undefined);

    get = (): T => this.state$.getValue();

    get$ = (): Observable<T> => this.state$.asObservable();

    store = (type: string, nextState: T) => {
        if (win.devTools) {
            win.devTools.send(type, nextState);
        }
        return this.state$.next(nextState);
    }

    save = (nameItem: string) => {
        const state = this.get();
        if (state) {
            localStorage.setItem(nameItem, JSON.stringify(state));
        }
    }

    load = (nameItem: string) => {
        const stateSaved = localStorage.getItem(nameItem);
        if (stateSaved) {
            const state = JSON.parse(stateSaved);
            this.store(`${nameItem}_LOAD_STATE`, state);
            localStorage.removeItem(nameItem);
        }

    }



}