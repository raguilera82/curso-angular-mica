import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthProxyService } from '../../features/auth/auth-proxy.service';
import { AuthStoreService } from '../../features/auth/auth-store.service';
import { BooksProxyService } from '../../features/books/books-proxy.service';
import { AuthInterceptor } from './auth.interceptor';


describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {
        provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
      }
    ]
  }));

  it('should set authorization header with basic', () => {
    const authProxy = TestBed.inject(AuthProxyService);
    authProxy.login('test', 'test').subscribe(
      response => {
        expect(response).toBeTruthy();
      }
    )
    const httpMock = TestBed.inject(HttpTestingController);
    const httpRequest = httpMock.expectOne('http://localhost:8080/login');
    expect(httpRequest.request.headers.has('Authorization')).toBe(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual('Basic dGVzdDp0ZXN0');

  })

  it('should set authorization header', () => {
    const authStore = TestBed.inject(AuthStoreService);
    authStore.setToken('tokentest');

    const booksProxy = TestBed.inject(BooksProxyService);
    booksProxy.getAll().subscribe(
      response => {
        expect(response).toBeTruthy();
      }
    )

    const httpMock = TestBed.inject(HttpTestingController);
    const httpRequest = httpMock.expectOne('http://localhost:8080/books');
    expect(httpRequest.request.headers.has('Authorization')).toBe(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer tokentest`);
    httpMock.verify();
  })

});
