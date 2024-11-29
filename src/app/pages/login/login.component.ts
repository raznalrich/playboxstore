import { Component } from '@angular/core';
import { FireauthService } from '../../fireauth.service';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: FireauthService,private router: Router) {}

  onLogin() {
    this.authService
      .login(this.email, this.password)
      .then(() => {
        console.log('Login successful');
        this.authService.listenToAuthStateChanges();
        if(this.email!='admin@playbox.com'){

          this.router.navigate(['/']);
        }
        else{
          this.router.navigate(['/admin/productlist']);

        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
