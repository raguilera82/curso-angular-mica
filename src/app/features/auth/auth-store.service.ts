import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthToken, Credentials } from '../../shared/model';
import { Store } from '../../shared/state/store';
import { AuthProxyService } from './auth-proxy.service';

export interface AuthState {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService extends Store<AuthState>{

  constructor(private authProxy: AuthProxyService) {
    super('AUTH');
  }

  init() {
    this.store('AUTH_STORE_INIT', null);
  }

  gainToken(credentials: Credentials): Promise<AuthToken> {
    return this.authProxy.login(credentials.username, credentials.password).pipe(
      tap((authToken: AuthToken) => {
        this.store('GAIN_TOKEN', { token: authToken.token })
      })
    ).toPromise();
  }

  setToken(token: string) {
    const authToken: AuthToken = {
      token: token
    }
    this.store('SET_TOKEN', authToken);
  }

}
