import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {login} from "../../../ngrx/auth/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        updateOn: "blur"
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: "blur"
      }),
    })
  }

  ngOnInit(): void {
  }

  handleLogin(event: any) {
    event.preventDefault();

    this.store.dispatch(login({
      payload: {
        email: this.email?.getRawValue(),
        password: this.password?.getRawValue(),
      }
    }))

    this.loginForm.reset();
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
