import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private helper: HelperService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
    });
  }

  ngOnInit() {
  }

  join() {
    if (this.loginForm.valid) {

      this.helper.showLoader('');

      this.auth.signUpWithEmail(this.loginForm.get('email').value, this.loginForm.get('password').value).then(async (response) => {
        console.log(response.user.uid);

        const user = { ...this.loginForm.value, uid: response.user.uid };
        await this.auth.addUser(user);

        this.helper.hideLoader();

        this.router.navigateByUrl('/home');

      }).catch(error => {
        this.helper.hideLoader();
        this.helper.showToast(error.message);
        console.log(error)
      });
    }

  }
}
