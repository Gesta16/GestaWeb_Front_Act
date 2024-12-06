import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    private router: Router,
    private alertService: AlertService
  ) {}

  login() {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const credentials = { 
      documento: this.loginForm.get('documento').value, 
      password: this.loginForm.get('password').value 
    };

    this.authService.login(credentials).subscribe(
      (response) => {
        // Después de un login exitoso, obtenemos el rol y redirigimos
        const userRole = this.authService.currentUserValue?.rol.nombre_rol;
        
        // Redirigir dependiendo del rol
        if (userRole === 'usuario') {
          // Si el rol es 'usuario', redirigir al dashboard de gestante
          this.router.navigate(['dashboard-gestante']);
        } else {
          // Si el rol no es 'usuario', redirigir al dashboard general
          this.router.navigate(['/dashboard']);
        }

        // Mostrar mensaje de éxito
        this.alertService.successAlert('Éxito', response.message);
      },
      (error) => {
        // Mostrar mensaje de error
        this.alertService.errorAlert('Error', error.error.message);
        console.log('Login fallido', error);
        this.isSubmitting = false;
      }
    );
  }

  goBack() {
    this.router.navigate(['home']);
  }
}
