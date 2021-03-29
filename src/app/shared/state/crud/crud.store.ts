import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '../store';
import { Base, CrudRepository, CrudState } from './model';

export class CrudStore<T extends Base> extends Store<CrudState<T>> {

    constructor(public repository: CrudRepository<T>, private clazz: string) {
        super();
        this.getElems();

        fromEvent(window, 'beforeunload').subscribe(
            () => this.save(`${this.clazz}_STATE`)
        );

        this.load(`${this.clazz}_STATE`);
    }

    getElems(): Promise<T[]> {
        return this.repository.getAll().pipe(
            tap(elems => {
                const state: CrudState<T> = {
                    elems: elems,
                    selectedElem: elems[0]
                }
                this.store(`${this.clazz}_GET_ALL`, state);
            })
        ).toPromise();
    }

    selectedElem(elem: T) {
        this.store(`${this.clazz}_SELECT_ITEM`, {
            elems: this.get()?.elems,
            selectedElem: elem
        })
    }

    addElem(elem: T): Promise<T> {
        return this.repository.add(elem).pipe(
            tap(el => {
                const elems = this.get().elems;
                const state: CrudState<T> = {
                    elems: [...elems, el],
                    selectedElem: el
                };
                this.store(`${this.clazz}_CREATE`, state);
            })
        ).toPromise();
    }

    updateElem(elem: T): Promise<T> {
        return this.repository.update(elem).pipe(
            tap(() => {
                const elems = this.get().elems;
                const e = Object.assign({}, elem);
                const index = elems.findIndex((el: T) => el.id === elem.id);
                const newElems = [...elems.slice(0, index), e, ...elems.slice(index + 1)];
                const state: CrudState<T> = {
                    elems: newElems,
                    selectedElem: elem
                };
                this.store(`${this.clazz}_UPDATE`, state);
            })
        ).toPromise();
    }

    deleteElem(elem: T): Promise<T> {
        return this.repository.delete(elem).pipe(
            tap((e) => {
                const elems = this.get().elems;
                const newElems = elems.filter(el => el.id !== elem.id);
                const state: CrudState<T> = {
                    elems: newElems,
                    selectedElem: e
                };
                this.store(`${this.clazz}_DELETE`, state);
            })
        ).toPromise();
    }

}