import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  register: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    name: new FormControl(''),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(
    private readonly router: Router,
    private readonly toast: ToastService
  ) {}

  registerToggle() {
    this.register = !this.register;
  }

  onConfirmLogin() {
    const formControl = this.loginForm.controls;

    if (this.register === true) {
      this.onConfirmRegister(formControl);
    } else {
      console.log('Login confirmado', this.loginForm.value);
    }
  }

  onForgotPassword() {
    console.log('Recuperação de senha');
  }

  onConfirmRegister(formControl: typeof this.loginForm.controls) {
    
    if (formControl.name?.value === '') {
      return this.toast.show('O campo nome é obrigatório para cadastro', 'danger');
    }

    console.log('Cadastro confirmado', this.loginForm.value);
  }

  validateFormControl(control: FormControl) {
    if (control.invalid && control.touched) {
      if (control.errors?.['required']) {
        return 'Campo obrigatório';
      }
    }
    return null;
  }

}
