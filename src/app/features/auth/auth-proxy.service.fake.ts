import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthToken } from '../../shared/model';

@Injectable({
  providedIn: 'root'
})
export class AuthProxyServiceFake {

  constructor() { }

  login(username: string, password: string): Observable<AuthToken> {
    const authToken: AuthToken = {
      token: 'xxxxx'
    }
    return of(authToken);
  }
}
