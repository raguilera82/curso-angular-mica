import {
    HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { BookDTO } from '../../shared/dto';
import { Libro } from '../../shared/model';
import { BooksProxyService } from "./books-proxy.service";

describe('BooksProxyService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BooksProxyService]
        })
    })

    it('should be created', () => {
        const service = TestBed.inject(BooksProxyService);
        expect(service).toBeTruthy();
    })

    it('should get books from server', () => {
        const service = TestBed.inject(BooksProxyService);
        const httpMock = TestBed.inject(HttpTestingController);

        service.getAll().subscribe(
            (books: Libro[]) => {
                expect(books[0].id).toBe(BOOKS_DTO_FAKE[0].id)
                expect(books[0].sinopsis).toBe(BOOKS_DTO_FAKE[0].description)
                expect(books[0].titulo).toBe(BOOKS_DTO_FAKE[0].title)
            });

        const request = httpMock.expectOne('http://localhost:8080/books');
        expect(request.request.method).toEqual('GET');
        request.flush(BOOKS_DTO_FAKE);
        httpMock.verify();
    })

    it('should add book to server', () => {
        const service = TestBed.inject(BooksProxyService);
        const httpMock = TestBed.inject(HttpTestingController);
        const libro: Libro = BOOKS_FAKE[0];
        service.add(libro).subscribe((book: Libro) => {
            expect(book.id).toBe(BOOKS_DTO_FAKE[0].id)
            expect(book.sinopsis).toBe(BOOKS_DTO_FAKE[0].description)
            expect(book.titulo).toBe(BOOKS_DTO_FAKE[0].title)
        });

        const request = httpMock.expectOne('http://localhost:8080/books');
        expect(request.request.method).toEqual('POST');
        request.flush(BOOKS_DTO_FAKE[0]);
        httpMock.verify();
    })

    it('should update book to server', () => {
        const service = TestBed.inject(BooksProxyService);
        const httpMock = TestBed.inject(HttpTestingController);
        const libro: Libro = BOOKS_FAKE[0];
        service.update(libro).subscribe((book: Libro) => {
            expect(book.id).toBe(BOOKS_DTO_FAKE[0].id)
            expect(book.sinopsis).toBe(BOOKS_DTO_FAKE[0].description)
            expect(book.titulo).toBe(BOOKS_DTO_FAKE[0].title)
        });

        const request = httpMock.expectOne('http://localhost:8080/books/1');
        expect(request.request.method).toEqual('PUT');
        request.flush(BOOKS_DTO_FAKE[0]);
        httpMock.verify();
    })

    it('should delete book to server', () => {
        const service = TestBed.inject(BooksProxyService);
        const httpMock = TestBed.inject(HttpTestingController);
        const libro: Libro = BOOKS_FAKE[0];
        service.delete(libro).subscribe((book: Libro) => {
            expect(book.id).toBe(BOOKS_DTO_FAKE[0].id)
            expect(book.sinopsis).toBe(BOOKS_DTO_FAKE[0].description)
            expect(book.titulo).toBe(BOOKS_DTO_FAKE[0].title)
        });

        const request = httpMock.expectOne('http://localhost:8080/books/1');
        expect(request.request.method).toEqual('DELETE');
        request.flush(BOOKS_DTO_FAKE[0]);
        httpMock.verify();
    })

})

const BOOKS_DTO_FAKE: BookDTO[] = [
    {
        id: '1',
        description: 'description1',
        title: 'test1'
    },
    {
        id: '2',
        description: 'description2',
        title: 'test2'
    }
]

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