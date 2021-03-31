import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../../shared/model';
import { AuthStoreService } from '../auth-store.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});

  constructor(private authStore: AuthStoreService) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  async send() {
    const credentials: Credentials = {
      username: this.formLogin.get('username').value,
      password: this.formLogin.get('password').value
    }
    await this.authStore.gainToken(credentials);
  }

}
