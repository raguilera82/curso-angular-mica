import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookDTO } from '../../shared/dto';
import { Libro } from '../../shared/model';
import { BooksRepository } from './books-repository';

@Injectable({
  providedIn: 'root'
})
export class BooksProxyService implements BooksRepository {

  BOOKS_URL = 'http://localhost:8080/books';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Libro[]> {
    return this.httpClient.get<BookDTO[]>(this.BOOKS_URL).pipe(
      map((books: BookDTO[]) => {
        return books.map(book => {
          return this.dtoToModel(book);
        })
      })
    );
  }

  add(libro: Libro): Observable<Libro> {
    const book: BookDTO = this.modelToDto(libro);
    return this.httpClient.post<BookDTO>(this.BOOKS_URL, book).pipe(
      map((bookDTO) => this.dtoToModel(bookDTO))
    );
  }

  update(libro: Libro): Observable<Libro> {
    const book: BookDTO = this.modelToDto(libro);
    return this.httpClient.put<BookDTO>(`${this.BOOKS_URL}/${book.id}`, book).pipe(
      map(this.dtoToModel)
    );
  }

  delete(libro: Libro): Observable<Libro> {
    const book: BookDTO = this.modelToDto(libro);
    return this.httpClient.delete<BookDTO>(`${this.BOOKS_URL}/${book.id}`).pipe(
      map(this.dtoToModel)
    );
  }

  private dtoToModel(dto: BookDTO): Libro {
    return {
      id: dto.id,
      sinopsis: dto.description,
      titulo: dto.title
    }
  }

  private modelToDto(model: Libro): BookDTO {
    return {
      description: model.sinopsis,
      id: model.id,
      title: model.titulo
    }
  }



}
