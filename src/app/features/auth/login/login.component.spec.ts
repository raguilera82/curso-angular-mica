import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthProxyService } from '../auth-proxy.service';
import { AuthProxyServiceFake } from '../auth-proxy.service.fake';
import { AuthStoreService } from '../auth-store.service';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthProxyService, useClass: AuthProxyServiceFake }
      ],
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set token', waitForAsync(async () => {
    component.formLogin.get('username').setValue('test');
    component.formLogin.get('password').setValue('test');

    await component.send();

    const authStore = TestBed.inject(AuthStoreService);
    const authToken = authStore.get();

    expect(authToken.token).toEqual('xxxxx');
  }))


});
