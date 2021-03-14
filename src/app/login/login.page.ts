import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HelperService } from '../service/helper.service';

import { environment } from '../../environments/environment';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public helper: HelperService,
    public menu: MenuController,
  ) { 
    this.menu.enable(false);

    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

  }


  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
  }

  login() {

    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.helper.showLoader('');

      const email = this.email.value.trim();

      this.auth.login(email, this.password.value).then(
        async res => {
          this.helper.hideLoader();
          console.log('rea', res);
  
          environment.admin === email ? this.router.navigateByUrl('/admin') : this.router.navigateByUrl('/home');
        },
        error => {
          this.helper.hideLoader();
          this.helper.showToast(error.message);
          console.log(error);
        }
      );
    }
    
  }

}
