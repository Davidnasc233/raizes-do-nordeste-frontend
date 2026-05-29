import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { UserStorageService } from '../../services/user-storage.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  register: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    name: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private readonly router: Router,
    private readonly userStorage: UserStorageService,
    private readonly toast: ToastService,
  ) {}

  registerToggle() {
    this.register = !this.register;

    const nameControl = this.loginForm.controls.name;
    if (this.register) {
      nameControl.addValidators(Validators.required);
    } else {
      nameControl.clearValidators();
      nameControl.setValue('');
      nameControl.markAsPristine();
      nameControl.markAsUntouched();
    }
    nameControl.updateValueAndValidity();
  }

  onConfirmLogin() {
    const formControl = this.loginForm.controls;

    if (this.register === true) {
      this.loginForm.markAllAsTouched();
      if (this.loginForm.invalid) {
        return;
      }
      this.onRegister(formControl);
    } else {
      this.onLogin();
    }
  }

  onForgotPassword() {}

  onLogin() {
    const user = this.userStorage.getCurrentUser();

    if (this.loginForm.valid && !user) {
      return this.toast.show('Usuário não encontrado.', 'danger');
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return this.toast.show('Por favor, preencha todos os campos corretamente.', 'danger');
    }

    if (
      user?.email === this.loginForm.controls.email.value &&
      user?.password === this.loginForm.controls.password.value
    ) {
      this.router.navigate(['/home']);
    } else {
      this.toast.show('Email ou senha incorretos. Tente novamente.', 'danger');
    }
  }

  onRegister(formControl: typeof this.loginForm.controls) {
    if (formControl.name?.value === '') {
      return this.toast.show('O campo nome é obrigatório para cadastro', 'danger');
    }

    this.userStorage.saveUser({
      id: crypto.randomUUID(),
      name: formControl.name.value,
      email: formControl.email.value,
      password: formControl.password.value,
      points: 0,
      ordersCount: 0,
      updatedAt: new Date().toISOString(),
    });
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
