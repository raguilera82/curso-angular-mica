import {
  HttpEvent, HttpHandler,

  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStoreService } from '../../features/auth/auth-store.service';
import { AuthToken } from '../model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authStore: AuthStoreService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/login')) {
      return next.handle(request);
    }

    const authToken: AuthToken = this.authStore.get();
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken?.token}`)
    })
    return next.handle(authReq).pipe();
  }
}
