import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthTokenDTO } from '../../shared/dto';
import { AuthToken } from '../../shared/model';

@Injectable({
  providedIn: 'root'
})
export class AuthProxyService {

  LOGIN_URL = 'http://localhost:8080/login'

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<AuthToken> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));

    return this.httpClient.post<AuthTokenDTO>(this.LOGIN_URL, null, { headers })
      .pipe(map(authTokenDto => {
        const authToken: AuthToken = {
          token: authTokenDto.token
        }
        return authToken;
      }))
  }
}
