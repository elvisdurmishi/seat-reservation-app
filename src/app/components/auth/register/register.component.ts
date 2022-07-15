import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {register} from "../../../ngrx/auth/auth.actions";
import {User} from "../../../model/User";
import {ActivatedRoute} from "@angular/router";
import {getAuthError, getAuthStatus} from "../../../ngrx/auth/auth.selectors";
import {AppState} from "../../../ngrx/app.state";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isManagerRegister: boolean = false;
  public registerStatus$ = this.store.select(getAuthStatus);
  public registerError$ = this.store.select(getAuthError);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.formBuilder.group({
      role: ['booker'],
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: "change"
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        updateOn: "change"
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: "change"
      }),
      bookings: [[]]
    })
  }

  ngOnInit(): void {
    this.isManagerRegister = !!this.route?.routeConfig?.path?.includes("manager");
    this.registerForm.get("role")?.setValue(this.isManagerRegister ? 'manager' : 'booker');
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
