import { Observable } from "rxjs";

export interface Base {
    id?: string;
}

export interface CrudState<T extends Base> {
    elems?: T[];
    selectedElem?: T
}

export interface CrudRepository<T> {

    getAll(): Observable<T[]>;

    add(elem: T): Observable<T>;

    update(elem: T): Observable<T>;

    delete(elem: T): Observable<T>;

}
