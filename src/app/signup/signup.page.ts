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
      address: ["", [Validators.required]],
      area: ["Muncipalities", [Validators.required]],
      ward: ["", [Validators.required]],
      block: ["", []],
    });

    this.area.valueChanges.subscribe(value => {
      this.ward.setValue('');
      this.block.setValue('');
      
      if (value === 'Muncipalities') {
        this.ward.setValidators([Validators.required]);
        this.block.setValidators([]);
      } else {
        this.ward.setValidators([]);
        this.block.setValidators([Validators.required]);
      }

      this.ward.updateValueAndValidity();
      this.block.updateValueAndValidity();
    });

  }

  get name() {
    return this.loginForm.get('name');
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get mobile() {
    return this.loginForm.get('mobile');
  }
  get address() {
    return this.loginForm.get('address');
  }
  get area() {
    return this.loginForm.get('area');
  }
  get ward() {
    return this.loginForm.get('ward');
  }
  get block() {
    return this.loginForm.get('block');
  }

  ngOnInit() {
  }

  join() {

    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {

      this.helper.showLoader('');

      this.auth.signUpWithEmail(this.email.value, this.password.value).then(async (response) => {
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
