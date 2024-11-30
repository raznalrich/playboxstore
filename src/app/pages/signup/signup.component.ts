import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FireauthService } from '../../fireauth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email = '';
  password = '';
  fullname = '';
  errorMessage = '';

  constructor(private authService: FireauthService,private router: Router) {}


  onSignup() {
    this.authService
      .signup(this.email, this.password,this.fullname)
      .then(() => {
        console.log('Signup successful');
        this.authService.listenToAuthStateChanges();
        localStorage.setItem('email', this.email);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
