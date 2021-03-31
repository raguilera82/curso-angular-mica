import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthTokenDTO } from '../../shared/dto';
import { Credentials } from '../../shared/model';
import { AuthProxyService } from './auth-proxy.service';


describe('AuthProxyService', () => {
  let service: AuthProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login with credentials', waitForAsync(() => {
    const credentials: Credentials = {
      username: 'test',
      password: 'test'
    }
    const httpMock = TestBed.inject(HttpTestingController);

    service.login(credentials.username, credentials.password).subscribe(
      authToken => {
        expect(authToken.token).toEqual(FAKE_AUTH_TOKEN.token)
      }
    );

    const request = httpMock.expectOne('http://localhost:8080/login');
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_AUTH_TOKEN);
    httpMock.verify();
  }))

});

const FAKE_AUTH_TOKEN: AuthTokenDTO = {
  token: 'xxxx'
};
