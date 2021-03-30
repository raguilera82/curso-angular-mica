import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Libro } from '../../shared/model';
import { BooksRepository } from './books-repository';

@Injectable({
  providedIn: 'root'
})
export class BooksProxyServiceFake implements BooksRepository {

  constructor() { }

  getAll(): Observable<Libro[]> {
    return of(BOOKS_FAKE);
  }

  add(book: Libro): Observable<Libro> {
    book.id = '1';
    return of(book);
  }

  update(libro: Libro): Observable<Libro> {
    return of(libro);
  }

  delete(libro: Libro): Observable<Libro> {
    return of(libro);
  }

}

const BOOKS_FAKE: Libro[] = [
  {
    id: '1',
    sinopsis: 'description1',
    titulo: 'test1'
  },
  {
    id: '2',
    sinopsis: 'description2',
    titulo: 'test2'
  }
]
