import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HelperService } from '../service/helper.service';

import { environment } from '../../environments/environment';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string;
  public password: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    public helper: HelperService,
    public menu: MenuController,
  ) { 
    this.menu.enable(false);
  }

  ngOnInit() {
  }

  login() {
    const email = this.email.trim();

    if (email === '' || email === undefined) {
      this.helper.showToast('Enter email address');
      return false;
    }
    if (this.password === '' || this.password === undefined) {
      this.helper.showToast('Enter password');
      return false;
    }
    this.helper.showLoader('');
    this.auth.login(email, this.password).then(
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
