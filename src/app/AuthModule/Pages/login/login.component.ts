import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSubmitting = false;

  loginForm = this.fb.group({
    documento: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  login(){
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const credentials = {documento:this.loginForm.get('documento').value, password:this.loginForm.get('password').value}
    this.authService.login(credentials).subscribe(
      (response)=>{
        console.log(response);
        this.router.navigate(['dashboard']);
        alert('ingreso exitoso')
      },
      (error)=>{
        console.log('Login fallido', error);
        this.isSubmitting = false;
      }
    )
    
  }

  goBack(){
    this.router.navigate(['home']);
  }
}
