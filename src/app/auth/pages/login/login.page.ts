import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Criar Conta?'
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  //Metodos para validar entraa
  get email(): FormControl {
    return <FormControl>this.authForm.get('email')
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password')
  }

  get name(): FormControl {
    return <FormControl>this.authForm.get('name')
  }
  //FIM do Metodos para validar entrada
  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const {isSignIn} = this.configs
    this.configs.action = isSignIn ? 'Login' : 'Criar conta?';
    this.configs.actionChange = isSignIn ? 'Criar Conta?' : 'Já existe uma conta neste email!';
    !isSignIn
     ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    console.log(this.authForm.value);
  }

}
