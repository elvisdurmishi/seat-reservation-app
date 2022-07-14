import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {register} from "../../../ngrx/auth/auth.actions";
import {User} from "../../../model/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.registerForm = this.formBuilder.group({
      role: ['booker'],
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: "blur"
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        updateOn: "blur"
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: "blur"
      }),
      bookings: [[]]
    })
  }

  ngOnInit(): void {
  }

  handleRegister(event: any) {
    event.preventDefault();
    let user: User = {
      role: this.role?.getRawValue(),
      name: this.name?.getRawValue(),
      email: this.email?.getRawValue(),
      password: this.password?.getRawValue(),
      bookings: this.bookings?.getRawValue()
    }

    this.store.dispatch(register({
      payload: {
        user: user
      }
    }))

    this.registerForm.reset();
  }

  get name() {
    return this.registerForm.get("name");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get role() {
    return this.registerForm.get("role");
  }

  get bookings() {
    return this.registerForm.get("bookings");
  }
}
