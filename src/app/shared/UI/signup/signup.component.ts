import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/store/Models/User.model';
import { beginRegister, duplicateUser } from 'src/app/store/User/User.Action';
import { showalert } from 'src/app/store/App Actions/App.Action';
import { isDuplicateUser } from 'src/app/store/User/User.Selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private builder: FormBuilder, private store: Store) {}

  registerForm = this.builder.group({
    username: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    password: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    confirmpassword: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    name: this.builder.control('', Validators.required),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    phone: this.builder.control('', Validators.required),
    gender: this.builder.control('MALE'),
  });

  registerUser() {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.password ===
        this.registerForm.value.confirmpassword
      ) {
        const _userObj: Users = {
          username: this.registerForm.value.username as string,
          password: this.registerForm.value.password as string,
          name: this.registerForm.value.name as string,
          email: this.registerForm.value.email as string,
          phone: this.registerForm.value.phone as string,
          gender: this.registerForm.value.gender as string,
          role: 'user',
          status: true,
        };
        this.store.dispatch(beginRegister({ userdata: _userObj }));
      } else {
        this.store.dispatch(
          showalert({ message: 'Password Mismatch', resulttype: 'fail' })
        );
      }
    }
  }

  duplicateUser() {
    const username = this.registerForm.value.username as string;
    if (username != '') {
      this.store.dispatch(duplicateUser({ username: username }));
      this.store.select(isDuplicateUser).subscribe((item) => {
        const isExist = item;
        if(isExist){
          this.registerForm.controls['username'].reset();
        }
      });
    }
  }
}
