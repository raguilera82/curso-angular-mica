import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthProxyService } from '../features/auth/auth-proxy.service';
import { AuthProxyServiceFake } from '../features/auth/auth-proxy.service.fake';
import { AuthStoreService } from '../features/auth/auth-store.service';
import { LoginComponent } from '../features/auth/login/login.component';
import { AuthGuard } from './auth.guard';


describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'login', component: LoginComponent
        }
      ])],
      providers: [
        { provide: AuthProxyService, useClass: AuthProxyServiceFake }
      ], schemas: [NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be true when exists token', () => {
    const authStore: AuthStoreService = TestBed.inject(AuthStoreService);
    authStore.setToken('xxxx');

    const result = guard.canActivate(null, null);
    expect(result).toBe(true);

  })

  it('should be false and redirect when not exists token', () => {

    const result = guard.canActivate(null, null);
    expect(result).toBe(false);

  })

});
