import { Injectable } from '@angular/core';
import { Libro } from '../../shared/model';
import { CrudStore } from '../../shared/state/crud/crud.store';
import { BooksProxyService } from './books-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class BooksStoreService extends CrudStore<Libro>{

    constructor(public repository: BooksProxyService) {
        super(repository, 'BOOKS');
    }

}